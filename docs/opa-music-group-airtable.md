# OPA Music Group site → Airtable leads: implementation spec

Connect the contact form on the **OPA Music Group** site to the same Airtable leads table that `opamusic.co.il` uses, through the **existing** Cloudflare Worker `opa-airtable-proxy`.

- Airtable target: base `appEZlJMMqIFotqrE`, table `ליד חדש` (`tblKyjUANobKqOa9C`). Same base, same table.
- Proxy: the existing Worker at `https://opa-airtable-proxy.hadarhubara10.workers.dev`. No new Worker, no new token.
- Lead-source tagging: **not wanted**. Leads from both sites look the same in Airtable.

---

## 1. How the existing integration works (reference)

### 1.1 Flow

```
Browser form (ContactSection)
   │  submitLead(payload)  →  POST {VITE_API_BASE_URL}/lead   (JSON, no auth header)
   ▼
Cloudflare Worker  opa-airtable-proxy  (worker/src/index.ts)
   1. CORS: echoes Origin only if listed in ALLOWED_ORIGINS
   2. Rate limit: 5 requests / 60s per cf-connecting-ip  → 429
   3. Parse JSON                                          → 400 "invalid json"
   4. Require groomName, brideName, phone (non-empty)     → 400
   5. Map English payload keys → Hebrew Airtable fields
   6. POST https://api.airtable.com/v0/{BASE}/{TABLE}
        Authorization: Bearer AIRTABLE_TOKEN
        { records: [{ fields }], typecast: true }
      Airtable error → logged with console.error, client gets 502
   ▼
Airtable  ליד חדש
```

### 1.2 Sending the data (client)

`src/lib/airtable.ts`, called from `src/components/ContactSection.tsx`:

```ts
fetch(`${API_BASE_URL}/lead`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(payload),
});
// any non-2xx → throw → the form shows labels.errorMessage
```

Payload contract (`LeadPayload`):

| Key | Type | Required by Worker | Source in form |
|---|---|---|---|
| `groomName` | string | yes | `name="groomName"` |
| `brideName` | string | yes | `name="brideName"` |
| `phone` | string | yes | controlled input, client-validated |
| `weddingDate` | string (`YYYY-MM-DD`) | no | `name="weddingDate"` |
| `venue` | string | no | `name="venue"` |
| `email` | string | no | controlled input, client-validated |
| `dj` | string[] | no | DJ tiles: the `he`/`en` label of each selected option |
| `packages` | `("full" \| "second")[]` | no | one package radio, sent as a 1-item array |
| `notes` | string | no | textarea |
| `lang` | `"he" \| "en"` | no (not stored) | page language |

`API_BASE_URL` comes from `VITE_API_BASE_URL` at build time (GitHub Actions repo variable → `deploy.yml`).

### 1.3 Authentication

- The browser sends **no credentials**. The only gates are CORS (`ALLOWED_ORIGINS`) and the per-IP rate limit.
- The Airtable Personal Access Token lives only as a Worker secret, `AIRTABLE_TOKEN` (`wrangler secret put AIRTABLE_TOKEN`), and is sent as `Authorization: Bearer …`. It never appears in a frontend bundle or in git.
- Required PAT scope: `data.records:write` on base `appEZlJMMqIFotqrE`.
- `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_ID` and `ALLOWED_ORIGINS` are plain `[vars]` in `worker/wrangler.toml`.

### 1.4 Field mapping (Worker → Airtable)

All mappings are named constants at the top of `worker/src/index.ts`.

| Payload | Airtable field | Notes |
|---|---|---|
| `groomName` | `שם חתן` | trimmed |
| `brideName` | `שם כלה` | trimmed |
| `phone` | `מספר פלאפון` | trimmed |
| `venue` | `שם אולם` | if non-empty |
| `weddingDate` | `תאריך חתונה` | if non-empty; date field |
| `email` | `אימייל` | if non-empty |
| `notes` | `? משהו שתרצו להוסיף ` | if non-empty (field name has a leading `?` and a trailing space) |
| `dj` contains `ILAY ATTIAS` | `די ג׳י מבוקש` += `עילאי אטיאס` | multi-select, de-duplicated |
| `dj` contains `ORI HOLLANDER` | `די ג׳י מבוקש` += `הולנדר` | |
| `dj` contains `ITAY ROZENGART` | `די ג׳י מבוקש` += `רוזי` | |
| `dj` contains `Rona` / `רונה \| Rona` / `רונה` | `? ליד רונה ` = `כן` | not added to the DJ multi-select |
| `dj` contains anything else | ignored | e.g. "undecided" (`עדיין לא בחרתי` / `Haven't decided yet`) |
| `packages` contains `full` | `סוג שירות` += `חתונה מלאה ` | choice name has a trailing space |
| `packages` contains `second` | `סוג שירות` += `סבב שני ` | |
| (always) | `סטטוס` = `פנייה ראשונית` | |

---

## 2. What the OPA Music Group site already does

The site has no separate source app. It is **this app's compiled production bundle** (`src/original-app.js`), patched by `src/build-brand.py` with string replacements, plus injected components from `src/brand-components.js`. Output goes to `dist/`, which is hosted at `https://opa-music-copy.ilaiattias.chatgpt.site`.

So the form, and its Airtable submission, are **already there**:

- The bundle hard-codes the Worker URL (`u5="https://opa-airtable-proxy.hadarhubara10.workers.dev"`) and POSTs exactly the payload in §1.2 (minified `c5()` = `submitLead()`, calling `u5 + "/lead"`).
- The contact form (`m5`) is the same `ContactSection`, with these patches from `build-brand.py`:
  - A new DJ option is inserted before Rona: `{id:"doron", he:"DORON MAYO", en:"DORON MAYO"}`.
  - On `/djs/:slug/` pages the form takes `selectedDj` and **pre-selects that DJ**, showing only that DJ plus Rona. So `/djs/doron/` sends `dj: ["DORON MAYO"]` by default.
  - After a successful submit it pushes `opa_lead_success` to `dataLayer` (no personal data).

**No client-side code changes are needed on the new site.** The gaps are all on the Worker and Airtable side.

---

## 3. Gaps (current behavior if nothing changes)

| # | Problem | Effect |
|---|---|---|
| G1 | The new site's origin(s) are not in `ALLOWED_ORIGINS` | The JSON POST triggers a CORS preflight. The Worker answers with `access-control-allow-origin: https://opamusic.co.il`, the browser blocks the request, **no record is created**, and the user sees the form's generic error. Applies to every submission. |
| G2 | `DORON MAYO` has no entry in `DJ_OPTION_BY_FORM_VALUE` | The record is created, but **the Doron selection is silently dropped**. Every lead from `/djs/doron/` arrives with an empty `די ג׳י מבוקש`. |
| G3 | `worker/README.md` is stale (documents a `fullName` payload and says only fullName + phone are required) | Misleads whoever maintains this next. |

---

## 4. Required changes

### 4.1 Airtable: no changes needed

Checked against the live schema on 2026-11-12: the option **`דורון מאיו`** already exists in `די ג׳י מבוקש`, `שליחת הצעת מחיר של` and `די ג׳י בפועל בחתונה`. Every field name the Worker writes to still exists. (`worker/airtable-schema.json` is an older copy without Doron. Refresh it with `scripts/dump-table-schema.mjs` if you rely on it.)

### 4.2 `worker/wrangler.toml`: allow the new origins (fixes G1)

```toml
ALLOWED_ORIGINS = "https://opamusic.co.il,https://opamusic.github.io,https://opa-music-copy.ilaiattias.chatgpt.site,http://localhost:8080,http://localhost:5173"
```

- The new site is served from `https://opa-music-copy.ilaiattias.chatgpt.site` (added here) and will move to `https://opamusic.co.il`, which is already allowed. Origins must match exactly: scheme, host, no trailing slash.
- `https://www.opamusic.co.il` is not in the list. If the site is ever served from `www.` without redirecting to the bare domain, add it.
- Keep `https://opamusic.co.il` **first**. `corsHeaders()` falls back to `allowed[0]` for unknown origins.

### 4.3 `worker/src/index.ts`: map Doron (fixes G2)

```ts
const DJ_OPTION_BY_FORM_VALUE: Record<string, string> = {
  "ILAY ATTIAS": "עילאי אטיאס",
  "ORI HOLLANDER": "הולנדר",
  "ITAY ROZENGART": "רוזי",
  "DORON MAYO": "דורון מאיו",
};
```

Nothing else in the Worker changes. Validation, the rate limit, the token, base and table all stay as they are. Both sites share the 5-requests-per-60s per-IP limit, which is fine for a contact form.

### 4.4 `worker/README.md`: bring docs in line with the code (fixes G3)

- Endpoint body: `{ groomName, brideName, phone, weddingDate?, venue?, email?, dj?, packages?, notes?, lang? }`.
- Validation: `groomName`, `brideName`, `phone` are required.
- Field-mapping table: replace it with §1.4 of this document, including the Doron row.
- Note in the Architecture section that two sites (opamusic.co.il and OPA Music Group) post to this Worker.

### 4.5 Deploy

```bash
cd worker
./node_modules/.bin/wrangler deploy
```

Use the local binary: in this repo `npx wrangler …` fails with `Missing script: "wrangler"`. Also update the README's `npx wrangler` commands as part of §4.4.

No new secrets. `AIRTABLE_TOKEN` was rotated on 2026-11-12 after the old token was revoked. It needs `data.records:write` (used by the Worker) and `schema.bases:read` (used by the helper scripts) on this base.

---

## 5. Verification

1. **Preflight from the new origin** must echo that origin:
   ```bash
   curl -sS -i -X OPTIONS https://opa-airtable-proxy.hadarhubara10.workers.dev/lead \
     -H "Origin: https://opa-music-copy.ilaiattias.chatgpt.site" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: content-type" | grep -i access-control-allow-origin
   # expect: access-control-allow-origin: https://opa-music-copy.ilaiattias.chatgpt.site
   ```
   Repeat with `Origin: https://opamusic.co.il` to confirm there's no regression.
2. **Doron mapping** (creates a real record; delete it afterwards):
   ```bash
   curl -sS -X POST https://opa-airtable-proxy.hadarhubara10.workers.dev/lead \
     -H "content-type: application/json" \
     -H "Origin: https://opa-music-copy.ilaiattias.chatgpt.site" \
     -d '{"groomName":"TEST","brideName":"TEST","phone":"0500000000","dj":["DORON MAYO","Rona"],"packages":["full"],"lang":"he"}'
   # expect {"ok":true}; in Airtable: די ג׳י מבוקש = דורון מאיו, ? ליד רונה = כן, סוג שירות = חתונה מלאה
   ```
3. **Real browser**, on the deployed new site:
   - Home page `#contact`: submit with no DJ → record created, no DJ field.
   - `/djs/doron/`: submit with the pre-selected DJ → record has `דורון מאיו`.
   - `/djs/ilay/`: submit → record has `עילאי אטיאס`.
   - DevTools Network: the `OPTIONS` and `POST /lead` requests both return 2xx with no CORS error in the console.
4. `./node_modules/.bin/wrangler tail --format pretty` during the tests shows no `airtable error` lines.
5. Delete the test records from `ליד חדש`.

---

## 6. Open items

None. Doron's label was confirmed against the live schema, and the domains are set in §4.2.

## 7. Out of scope

- Tagging leads by source site (explicitly not wanted).
- Any change to the new site's bundle or `build-brand.py`.
- Behavior for Rona and "undecided" (unchanged).
