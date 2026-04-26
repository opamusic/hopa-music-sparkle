export type PackageOption = "full" | "second";

export interface LeadPayload {
  groomName: string;
  brideName?: string;
  weddingDate?: string;
  venue?: string;
  phone: string;
  email?: string;
  dj?: string[];
  packages?: PackageOption[];
  notes?: string;
  lang: "he" | "en";
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

export async function submitLead(payload: LeadPayload): Promise<void> {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not configured");
  }

  const res = await fetch(`${API_BASE_URL}/lead`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Lead submission failed: ${res.status}`);
  }
}
