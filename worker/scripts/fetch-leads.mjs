#!/usr/bin/env node
// Fetches recent records from the leads table. Writes a summary to /tmp/at_leads.json.
// Run: node --env-file=.env scripts/fetch-leads.mjs

import { writeFileSync } from "node:fs";

const BASE_ID = "appEZlJMMqIFotqrE";
const LEADS_TABLE_ID = "tblKyjUANobKqOa9C";

const token = process.env.AIRTABLE_TOKEN;
if (!token) {
  console.error("AIRTABLE_TOKEN is not set in env.");
  process.exit(1);
}

const url = `https://api.airtable.com/v0/${BASE_ID}/${LEADS_TABLE_ID}?pageSize=5&sort%5B0%5D%5Bfield%5D=%D7%AA%D7%90%D7%A8%D7%99%D7%9A%20%D7%9B%D7%A0%D7%99%D7%A1%D7%AA%20%D7%9C%D7%99%D7%93&sort%5B0%5D%5Bdirection%5D=desc`;
const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
if (!res.ok) {
  console.error(res.status, await res.text());
  process.exit(1);
}
const data = await res.json();

const KEEP = [
  "שם חתן",
  "שם כלה",
  "מספר פלאפון",
  "אימייל",
  "די ג׳י מבוקש",
  "? ליד רונה ",
  "סטטוס",
  "? משהו שתרצו להוסיף ",
  "תאריך כניסת ליד",
];

const summary = data.records.map((r) => {
  const picked = {};
  for (const k of KEEP) if (k in r.fields) picked[k] = r.fields[k];
  return { id: r.id, createdTime: r.createdTime, fields: picked };
});

writeFileSync("/tmp/at_leads.json", JSON.stringify(summary, null, 2));
console.log("wrote /tmp/at_leads.json — records:", summary.length);
