# OPA Airtable Proxy (Cloudflare Worker)

Tiny HTTP proxy that accepts contact-form submissions from the OPA websites and writes them to Airtable. The Airtable Personal Access Token lives only as a Cloudflare Worker secret — it never touches the frontend bundle or git.

Two sites post to this Worker: this repo's app (opamusic.co.il) and the OPA Music Group rebrand (`opa-music-copy.ilaiattias.chatgpt.site`, moving to opamusic.co.il). See `docs/opa-music-group-airtable.md`.

## Architecture

```
Browser (opamusic.co.il / OPA Music Group form)
        │  POST /lead  (JSON)
        ▼
Cloudflare Worker  ── verifies CORS
                   ── rate-limits by IP (5 req / 60s)
                   ── validates groomName + brideName + phone
                   ── maps form fields → Hebrew Airtable fields
                   ── forwards to Airtable
        │
        ▼
Airtable base `appEZlJMMqIFotqrE`, table `ליד חדש` (`tblKyjUANobKqOa9C`)
```

## When it runs

The worker runs **on every HTTP request** to its URL — it's serverless, there is no "it's up / it's down". Cloudflare auto-scales across ~300 edge PoPs. Cold starts are milliseconds (V8 isolates, not containers).

- Public URL: `https://opa-airtable-proxy.hadarhubara10.workers.dev`
- Free-tier quota: 100k requests/day. A contact form will never approach this.
- Observability is enabled in `wrangler.toml`, so logs are viewable in the Cloudflare dashboard under **Workers & Pages → opa-airtable-proxy → Logs**.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/lead` | Create a new lead in Airtable. Body: `{ groomName, brideName, phone, weddingDate?, venue?, email?, dj?, packages?, notes?, lang? }`. Returns `{ ok: true }` on success, `400` on invalid JSON or missing required fields, `429` when rate-limited, `502` when Airtable rejects the write. |
| `OPTIONS` | `/lead` | CORS preflight. |

Any other path or method returns 404.

## One-time setup

Run wrangler through the local binary (`./node_modules/.bin/wrangler`). `npx wrangler` fails in this folder with `Missing script: "wrangler"`.

```bash
cd worker
npm install
./node_modules/.bin/wrangler login                       # opens browser, authenticates your Cloudflare account
./node_modules/.bin/wrangler secret put AIRTABLE_TOKEN   # paste the Airtable PAT when prompted
./node_modules/.bin/wrangler deploy                      # first deploy
```

The Airtable PAT needs these scopes on base `appEZlJMMqIFotqrE`:
- `data.records:write` (required to create leads)
- `schema.bases:read` (only needed if you want to re-run the inspection script)

Create the token at <https://airtable.com/create/tokens>.

## Deploy updates

Any time `src/index.ts` or `wrangler.toml` changes:

```bash
cd worker
./node_modules/.bin/wrangler deploy
```

This bundles the worker, uploads it, and atomically swaps it in. Takes ~10 seconds. The URL stays the same.

To roll back:
```bash
./node_modules/.bin/wrangler rollback                    # revert to the previous version
```

## Local development

Run the worker locally against real Airtable:

```bash
cd worker
./node_modules/.bin/wrangler dev                         # http://localhost:8787
```

`wrangler dev` uses the secrets already stored in Cloudflare (remote mode by default) or reads `worker/.dev.vars` (local mode). To test POST:

```bash
curl -sS -X POST http://localhost:8787/lead \
  -H "content-type: application/json" \
  -d '{"fullName":"Local Test","phone":"0500000000","lang":"he"}'
```

## Tailing live logs

```bash
cd worker
./node_modules/.bin/wrangler tail                        # streams requests + console.error output
```

Useful when debugging a 502 from Airtable — the real Airtable error message is printed via `console.error` in `src/index.ts`.

## Inspecting Airtable from the CLI

Two helper scripts use the same `AIRTABLE_TOKEN` env var (loaded from `worker/.env` via Node 20.6+'s `--env-file` flag).

```bash
cd worker
node --env-file=.env scripts/inspect-airtable.mjs   # dump base schema to /tmp/at_summary.json
node --env-file=.env scripts/fetch-leads.mjs        # fetch 5 newest leads to /tmp/at_leads.json
```

Both write non-sensitive summaries — the token never appears in their output.

`worker/.env` must contain `AIRTABLE_TOKEN=pat...`. The file is gitignored.

## Configuration (`wrangler.toml`)

| Setting | Purpose |
|---|---|
| `AIRTABLE_BASE_ID` | Airtable base. Change only if the base itself is replaced. |
| `AIRTABLE_TABLE_ID` | Leads table. |
| `ALLOWED_ORIGINS` | Comma-separated CORS whitelist. Must include every domain the site is served from. |
| `[[unsafe.bindings]]` (`RATE_LIMIT`) | 5 submissions per IP per 60 seconds. Raise the `limit` if you expect bursts. |

Changes to `wrangler.toml` take effect on the next `wrangler deploy`.

## Field mapping (worker → Airtable)

| Form payload | Airtable field (`ליד חדש`) | Notes |
|---|---|---|
| `groomName` | `שם חתן` | Required. |
| `brideName` | `שם כלה` | Required. |
| `phone` | `מספר פלאפון` | Required. |
| `weddingDate` | `תאריך חתונה` | Optional. `YYYY-MM-DD`. |
| `venue` | `שם אולם` | Optional. |
| `email` | `אימייל` | Optional. |
| `dj` = `"ILAY ATTIAS"` | `די ג׳י מבוקש` = `["עילאי אטיאס"]` | Multi-select. |
| `dj` = `"ORI HOLLANDER"` | `די ג׳י מבוקש` = `["הולנדר"]` | |
| `dj` = `"ITAY ROZENGART"` | `די ג׳י מבוקש` = `["רוזי"]` | |
| `dj` = `"DORON MAYO"` | `די ג׳י מבוקש` = `["דורון מאיו"]` | Sent by the OPA Music Group site only. |
| `packages` = `["full"]` / `["second"]` | `סוג שירות` = `"חתונה מלאה "` / `"סבב שני "` | Choice names have a trailing space. |
| `dj` = `"Rona"` / `"רונה | Rona"` | `? ליד רונה ` = `"כן"` (no multi-select) | Flags the lead as Rona's. |
| `dj` = anything else | (no DJ field written) | Covers "haven't decided". |
| `notes` | `? משהו שתרצו להוסיף ` | Optional. |
| (always) | `סטטוס` = `"פנייה ראשונית"` | Hard-coded default status. |

All mappings live at the top of `src/index.ts` as named constants — edit there if a field name changes in Airtable.

## Frontend integration

The frontend expects `VITE_API_BASE_URL` to be set to the worker URL at build time.

- **Local dev**: set in `.env.local` (gitignored).
- **Production**: set as a GitHub Actions repository variable named `VITE_API_BASE_URL`. The `deploy.yml` workflow reads it into the build environment.

If that variable is missing, `submitLead()` throws synchronously before any network call — the form shows the generic error message and DevTools Network tab stays empty. That's the signature of a missing build-time env var.
