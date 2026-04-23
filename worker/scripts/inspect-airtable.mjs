#!/usr/bin/env node
// Fetches the Airtable base schema + linked-table sample records and writes
// a non-sensitive summary to /tmp/at_summary.json.
//
// Run: `node --env-file=.env scripts/inspect-airtable.mjs`  (Node 20.6+)
//  or: `AIRTABLE_TOKEN=pat... node scripts/inspect-airtable.mjs`

import { writeFileSync } from "node:fs";

const BASE_ID = "appEZlJMMqIFotqrE";
const LEADS_TABLE_ID = "tblKyjUANobKqOa9C";

const token = process.env.AIRTABLE_TOKEN;
if (!token) {
  console.error("AIRTABLE_TOKEN is not set in env.");
  process.exit(1);
}

const authHeader = { Authorization: `Bearer ${token}` };

async function getJson(url) {
  const res = await fetch(url, { headers: authHeader });
  const body = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${url}\n${body}`);
  return JSON.parse(body);
}

const schema = await getJson(`https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`);
const leads = schema.tables.find((t) => t.id === LEADS_TABLE_ID);
if (!leads) throw new Error(`leads table ${LEADS_TABLE_ID} not in base`);

const leadsFields = leads.fields.map((f) => ({
  name: f.name,
  type: f.type,
  options: f.options
    ? {
        linkedTableId: f.options.linkedTableId,
        choices: f.options.choices?.map((c) => c.name),
      }
    : undefined,
}));

const djField = leads.fields.find((f) => f.name === "די ג׳י מבוקש");
let djs = null;
if (djField?.type === "multipleRecordLinks" && djField.options?.linkedTableId) {
  const djTable = schema.tables.find((t) => t.id === djField.options.linkedTableId);
  const djRecords = await getJson(
    `https://api.airtable.com/v0/${BASE_ID}/${djField.options.linkedTableId}?maxRecords=50`,
  );
  const primaryFieldId = djTable.primaryFieldId;
  const primaryField = djTable.fields.find((f) => f.id === primaryFieldId);
  djs = {
    tableId: djField.options.linkedTableId,
    tableName: djTable.name,
    primaryFieldName: primaryField?.name,
    records: djRecords.records.map((r) => ({
      id: r.id,
      primary: r.fields[primaryField?.name ?? ""],
    })),
  };
}

const summary = {
  leadsTable: { id: leads.id, name: leads.name, fields: leadsFields },
  djs,
  allTables: schema.tables.map((t) => ({ id: t.id, name: t.name })),
};

writeFileSync("/tmp/at_summary.json", JSON.stringify(summary, null, 2));
console.log("wrote /tmp/at_summary.json — tables:", schema.tables.length, "dj records:", djs?.records.length ?? 0);
