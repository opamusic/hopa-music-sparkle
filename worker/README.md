# OPA Airtable Proxy (Cloudflare Worker)

Hides the Airtable personal access token so the static GitHub Pages site can safely submit contact form leads.

## Endpoints

- `POST /lead` — JSON body `{ fullName, phone, email?, dj?, notes?, lang? }`. Creates an Airtable record.

## Setup

```bash
cd worker
npm install
npx wrangler login                           # one-time
npx wrangler secret put AIRTABLE_TOKEN       # paste your Airtable personal access token
npx wrangler deploy
```

Deploy prints a `https://opa-airtable-proxy.<you>.workers.dev` URL. Put that in the frontend `.env.production` as `VITE_API_BASE_URL`.

## Airtable table fields

The worker writes these field names in table `tblKyjUANobKqOa9C`:

- `Name` (single line text, required)
- `Phone` (phone or single line text, required)
- `Email` (email)
- `DJ` (single select or single line text)
- `Notes` (long text)
- `Language` (single line text, `"he"` / `"en"`)

`typecast: true` is enabled, so Airtable will coerce values and auto-create missing single-select options. Rename the fields in `src/index.ts` if your table uses different names.

## Allowed origins

Edit `ALLOWED_ORIGINS` in `wrangler.toml` to match your production + dev URLs. CORS requests from other origins are rejected.

## Personal access token scopes

Create the token at https://airtable.com/create/tokens with:
- Scope: `data.records:write`
- Access: the base `appEZlJMMqIFotqrE`
