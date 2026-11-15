# Rona site → Airtable leads: implementation spec

Send the contact form on the **Rona** site to Airtable so each lead appears in the view **"לידים לרונה מחתונות"**. The form uses the **existing** Cloudflare Worker `opa-airtable-proxy` and its existing `/lead` endpoint.

- Airtable target: base `appEZlJMMqIFotqrE` ("OPA DJs"), table `ליד חדש` (`tblKyjUANobKqOa9C`), view `לידים לרונה מחתונות` (`viw8w8jrzYvXwgYht`).
- Proxy: `https://opa-airtable-proxy.hadarhubara10.workers.dev`. No new Worker, route or token.
- Worker change: allow the Rona site's origins in `ALLOWED_ORIGINS`. **Already deployed** (§3).

For how the Worker, authentication and field mapping work in general, see `docs/opa-music-group-airtable.md` §1 and `worker/README.md`.

---

## 1. Form UI

**Copy the contact form (`#contact`) from the OPA Music Group site** (`https://opa-music-copy.ilaiattias.chatgpt.site`). You're authorized to reuse its UI as is: layout, styling, copy (Hebrew and English), validation, error banner, loading state and thank-you state.

Then cut it down to the fields Rona needs:

| Keep | Payload key | Required |
|---|---|---|
| Groom's name (שם החתן) | `groomName` | yes |
| Bride's name (שם הכלה) | `brideName` | yes |
| Wedding date (תאריך החתונה) | `weddingDate` (`YYYY-MM-DD`) | no |
| Venue (אולם / מקום החתונה) | `venue` | no |
| Phone (טלפון) | `phone` | yes |
| Email (אימייל) | `email` | no |
| Notes (משהו שתרצו להוסיף?), with the 500-character limit and counter | `notes` | no |

From the "ההעדפות שלכם / Your preferences" block, keep only the notes textarea and **remove**:

- **DJ picker.** The lead is always Rona's. Don't render a DJ choice. Always send `dj: ["Rona"]`.
- **Package choice** (חתונה מלאה / סבב שני). Don't send `packages`.

Also **remove the contact links column** next to the form (phone / email / Instagram). The Rona form is only the form itself.

Also drop anything tied to those fields, for example selecting the page's DJ on mount, and the DJ value in the `opa_lead_success` analytics event.

Keep the validation as it is in the original: phone required and matching `/^[+\d][\d\s\-()]{8,}$/`; email optional, but if filled it must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.

---

## 2. Client implementation

### 2.1 Request

The OPA Music Group form already posts to this Worker. Keep its submit call, but send this payload:

```ts
const LEAD_ENDPOINT = "https://opa-airtable-proxy.hadarhubara10.workers.dev/lead";

interface RonaLeadPayload {
  groomName: string;
  brideName: string;
  phone: string;
  weddingDate?: string; // YYYY-MM-DD
  venue?: string;
  email?: string;
  notes?: string; // max 500 chars
  dj: ["Rona"];
  lang: "he" | "en";
}

export async function submitRonaLead(payload: RonaLeadPayload): Promise<void> {
  const res = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Lead submission failed: ${res.status}`);
}
```

- Send optional fields as `undefined` (omitted from the JSON) when empty, not as `""`.
- Trim every string before sending.
- Don't add an `Authorization` header or any key. The browser holds no credentials. The Worker's only gates are CORS and the rate limit.

### 2.2 Responses

| Status | Body | Meaning | Form behavior |
|---|---|---|---|
| 200 | `{ "ok": true }` | Record created | Thank-you state (as in the original) |
| 400 | `{ "error": "…" }` | Invalid JSON or missing groom/bride/phone | Generic error banner |
| 429 | `{ "error": "rate_limited" }` | More than 5 submissions per IP in 60s | Generic error banner. Don't auto-retry |
| 502 | `{ "error": "upstream failed" }` | Airtable rejected the write | Generic error banner |
| network / CORS error | — | Origin not allowed, or offline | Generic error banner |

---

## 3. Worker change (this repo): done

`worker/wrangler.toml` `ALLOWED_ORIGINS` now includes both Rona origins. Deployed 2026-11-15, version `a2eda255-f856-4614-bcd4-fe9392e74df9`.

```toml
ALLOWED_ORIGINS = "https://opamusic.co.il,https://opamusic.github.io,https://opa-music-copy.ilaiattias.chatgpt.site,https://rona-exact-copy.ilaiattias.chatgpt.site,https://ronaweddings.co.il,http://localhost:8080,http://localhost:5173"
```

- `https://ronaweddings.co.il` is the **production** origin. `www.ronaweddings.co.il` doesn't resolve (checked 2026-11-15), so it isn't listed.
- `https://rona-exact-copy.ilaiattias.chatgpt.site` is **temporary**. It will be removed once the site is fully live on ronaweddings.co.il.
- `worker/src/index.ts` needs no change: `"Rona"` is already in `RONA_FORM_VALUES`.

---

## 4. Resulting Airtable record

| Airtable field (`ליד חדש`) | Value |
|---|---|
| `שם חתן` | `groomName` |
| `שם כלה` | `brideName` |
| `מספר פלאפון` | `phone` |
| `תאריך חתונה` | `weddingDate`, if sent |
| `שם אולם` | `venue`, if sent |
| `אימייל` | `email`, if sent |
| `? משהו שתרצו להוסיף ` | `notes`, if sent |
| `? ליד רונה ` | `כן` |
| `סטטוס` | `פנייה ראשונית` |
| `די ג׳י מבוקש` | empty |

---

## 5. Verification

1. Preflight from the Rona origin echoes it back:
   ```bash
   curl -sS -o /dev/null -D - -X OPTIONS https://opa-airtable-proxy.hadarhubara10.workers.dev/lead \
     -H "Origin: https://ronaweddings.co.il" -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: content-type" | grep -i access-control-allow-origin
   # expect: access-control-allow-origin: https://ronaweddings.co.il
   ```
2. Submit the live form on https://ronaweddings.co.il once with test names (e.g. `בדיקה רונה`). Expect the thank-you state.
3. In Airtable, the record shows in the view **"לידים לרונה מחתונות"** with `? ליד רונה ` = `כן`, `סטטוס` = `פנייה ראשונית`, and no DJ.
4. Delete the test record.

---

## 6. Out of scope

- DJ or package fields.
- Contact links next to the form.
- Tagging leads by source site.
