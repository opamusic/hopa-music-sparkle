interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface Env {
  AIRTABLE_TOKEN: string;
  AIRTABLE_BASE_ID: string;
  AIRTABLE_TABLE_ID: string;
  ALLOWED_ORIGINS: string;
  RATE_LIMIT: RateLimit;
}

interface LeadPayload {
  fullName?: string;
  phone?: string;
  email?: string;
  dj?: string;
  notes?: string;
  lang?: string;
}

const JSON_HEADERS = { "content-type": "application/json" };

const FIELD_GROOM = "שם חתן";
const FIELD_PHONE = "מספר פלאפון";
const FIELD_EMAIL = "אימייל";
const FIELD_DJ = "די ג׳י מבוקש";
const FIELD_STATUS = "סטטוס";
const FIELD_NOTES = "? משהו שתרצו להוסיף ";
const FIELD_RONA = "? ליד רונה ";

const STATUS_NEW_LEAD = "פנייה ראשונית";
const RONA_YES = "כן";

const DJ_OPTION_BY_FORM_VALUE: Record<string, string> = {
  "ILAY ATTIAS": "עילאי אטיאס",
  "ORI HOLLANDER": "הולנדר",
  "ITAY ROZENGART": "רוזי",
};

const RONA_FORM_VALUES = new Set(["Rona", "רונה | Rona", "רונה"]);

function corsHeaders(origin: string | null, allowed: string[]): Record<string, string> {
  const allowOrigin = origin && allowed.includes(origin) ? origin : allowed[0] ?? "*";
  return {
    "access-control-allow-origin": allowOrigin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "origin",
  };
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("origin");
    const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean);
    const cors = corsHeaders(origin, allowed);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/lead") {
      return new Response("Not found", { status: 404, headers: cors });
    }

    const clientIp = request.headers.get("cf-connecting-ip") ?? "unknown";
    const { success: withinLimit } = await env.RATE_LIMIT.limit({ key: clientIp });
    if (!withinLimit) {
      return new Response(JSON.stringify({ error: "rate_limited" }), {
        status: 429,
        headers: { ...cors, ...JSON_HEADERS, "retry-after": "60" },
      });
    }

    let body: LeadPayload;
    try {
      body = (await request.json()) as LeadPayload;
    } catch {
      return new Response(JSON.stringify({ error: "invalid json" }), {
        status: 400,
        headers: { ...cors, ...JSON_HEADERS },
      });
    }

    if (!isNonEmptyString(body.fullName) || !isNonEmptyString(body.phone)) {
      return new Response(JSON.stringify({ error: "fullName and phone are required" }), {
        status: 400,
        headers: { ...cors, ...JSON_HEADERS },
      });
    }

    const fields: Record<string, unknown> = {
      [FIELD_GROOM]: body.fullName.trim(),
      [FIELD_PHONE]: body.phone.trim(),
      [FIELD_STATUS]: STATUS_NEW_LEAD,
    };
    if (isNonEmptyString(body.email)) fields[FIELD_EMAIL] = body.email.trim();
    if (isNonEmptyString(body.notes)) fields[FIELD_NOTES] = body.notes.trim();

    if (isNonEmptyString(body.dj)) {
      const djValue = body.dj.trim();
      if (RONA_FORM_VALUES.has(djValue)) {
        fields[FIELD_RONA] = RONA_YES;
      } else {
        const mapped = DJ_OPTION_BY_FORM_VALUE[djValue];
        if (mapped) fields[FIELD_DJ] = [mapped];
      }
    }

    const airtableUrl = `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${env.AIRTABLE_TABLE_ID}`;
    const airtableRes = await fetch(airtableUrl, {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.AIRTABLE_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
    });

    if (!airtableRes.ok) {
      const errText = await airtableRes.text();
      console.error("airtable error", airtableRes.status, errText);
      return new Response(JSON.stringify({ error: "upstream failed" }), {
        status: 502,
        headers: { ...cors, ...JSON_HEADERS },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...cors, ...JSON_HEADERS },
    });
  },
};
