#!/usr/bin/env node
// Dumps the full schema (all fields, types, options) of the leads table
// to worker/airtable-schema.json, so new fields can be planned/added.
//
// Run: `node --env-file=.env scripts/dump-table-schema.mjs`  (Node 20.6+)

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// BASE_ID/TABLE_ID match the [vars] section in wrangler.toml; override via env if needed.
const token = process.env.AIRTABLE_TOKEN;
const baseId = process.env.AIRTABLE_BASE_ID ?? "appEZlJMMqIFotqrE";
const tableId = process.env.AIRTABLE_TABLE_ID ?? "tblKyjUANobKqOa9C";

if (!token) {
  console.error("Missing env: AIRTABLE_TOKEN (set it in worker/.env)");
  process.exit(1);
}

const res = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
  headers: { Authorization: `Bearer ${token}` },
});
const text = await res.text();
if (!res.ok) {
  console.error(`Airtable error ${res.status}:`, text);
  process.exit(1);
}

const schema = JSON.parse(text);
const table = schema.tables.find((t) => t.id === tableId);
if (!table) {
  console.error(`Table ${tableId} not found in base ${baseId}`);
  process.exit(1);
}

const out = {
  fetchedAt: new Date().toISOString(),
  baseId,
  table: {
    id: table.id,
    name: table.name,
    primaryFieldId: table.primaryFieldId,
    description: table.description,
    fields: table.fields.map((f) => ({
      id: f.id,
      name: f.name,
      type: f.type,
      description: f.description,
      options: f.options,
    })),
  },
};

const outPath = resolve(dirname(fileURLToPath(import.meta.url)), "..", "airtable-schema.json");
writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`wrote ${outPath} — ${out.table.fields.length} fields`);
