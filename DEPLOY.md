# Deploy & Custom Domain

## האתר
- **URL נוכחי (GitHub Pages):** https://opamusic.github.io/hopa-music-sparkle/
- **URL מתוכנן (Custom domain):** https://opamusic.co.il
- **Repo:** opamusic/hopa-music-sparkle (branch `main`)

Deploy אוטומטי בכל push ל-`main` דרך `.github/workflows/deploy.yml`.
אפשר גם לדפלוי ידנית: Actions → "Deploy static content to Pages" → Run workflow.

---

## הגדרת Custom Domain: opamusic.co.il

### חלק 1 — DNS אצל ה-Registrar (Galcomm / Communigal)

בממשק ניהול DNS של `opamusic.co.il`, הוסף **4 רשומות A**:

| שם שרת מארח | סוג רשומה | כתובת | עדיפות |
|---|---|---|---|
| (ריק) | א (כתובת) | `185.199.108.153` | (ריק) |
| (ריק) | א (כתובת) | `185.199.109.153` | (ריק) |
| (ריק) | א (כתובת) | `185.199.110.153` | (ריק) |
| (ריק) | א (כתובת) | `185.199.111.153` | (ריק) |

**הערות:**
- "שם שרת מארח" ריק = הדומיין עצמו (apex). חלק מהממשקים משתמשים ב-`@` במקום ריק.
- עדיפות רלוונטית רק ל-MX — להשאיר ריק.
- אם רוצים גם `www.opamusic.co.il` → הוסף CNAME: host `www` → `opamusic.github.io`.

### חלק 2 — GitHub

1. Settings → Pages → **Custom domain** → הכנס `opamusic.co.il` → Save.
2. חכה שהבדיקה תעבור (5–30 דקות אחרי שה-DNS התעדכן).
3. כשירוק ✅ → סמן **Enforce HTTPS**.

### חלק 3 — קוד (חובה, אחרת האתר יישבר)

כש-custom domain פעיל, האתר יוגש מ-`/` ולא מ-`/hopa-music-sparkle/`. לכן:

**`vite.config.ts`** — מחק את השורה:
```ts
base: "/hopa-music-sparkle/",
```

**צור `public/CNAME`** עם שורה אחת בלבד:
```
opamusic.co.il
```

Commit + push → ה-workflow ידפלוי אוטומטית.

---

## בדיקה

### האם DNS התעדכן?
```bash
dig @8.8.8.8 opamusic.co.il A +short
```
צריך להחזיר את 4 ה-IPs של GitHub. אם ריק — ה-DNS עדיין לא התפשט, חכה.

### האם האתר עולה?
- http://opamusic.co.il → אמור להפנות ל-https
- https://opamusic.co.il → האתר

### בעיות נפוצות
- **"DNS Check in Progress" לא מסתיים** → ה-DNS לא מוגדר נכון. בדוק עם `dig` (למעלה).
- **404 או white screen אחרי החלפה לדומיין** → שכחת למחוק `base` מ-vite.config.ts. Push fix והרץ workflow.
- **HTTPS לא זמין** → GitHub צריך ~15 דקות אחרי שה-DNS מאושר כדי להנפיק תעודה. חכה ונסה שוב.

---

## IPs של GitHub Pages (למקרה של שינוי עתידי)

Apex (רשומות A):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Subdomain (CNAME):
```
opamusic.github.io
```

תמיד לאשש מול: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
