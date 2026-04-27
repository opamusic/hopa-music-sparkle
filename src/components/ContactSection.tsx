import { useEffect, useMemo, useState } from "react";
import { useScrollReveal } from "./useScrollReveal";
import {
  Phone,
  Mail,
  Instagram,
  Calendar,
  MapPin,
  Headphones,
  Loader2,
  Check,
  HelpCircle,
} from "lucide-react";
import { submitLead, type PackageOption } from "@/lib/airtable";
import dj1 from "@/assets/dj1.jpg";
import dj2 from "@/assets/dj2.jpg";
import dj3 from "@/assets/dj3.jpg";
import ronaHero from "@/assets/rona-hero.png";

interface ContactSectionProps {
  lang: "he" | "en";
}

const NOTES_MAX = 500;

const DJ_OPTIONS: { id: string; he: string; en: string; image: string | null }[] = [
  { id: "ilay", he: "ILAY ATTIAS", en: "ILAY ATTIAS", image: dj1 },
  { id: "ori", he: "ORI HOLLANDER", en: "ORI HOLLANDER", image: dj2 },
  { id: "itay", he: "ITAY ROZENGART", en: "ITAY ROZENGART", image: dj3 },
  { id: "rona", he: "רונה | Rona", en: "Rona", image: ronaHero },
  { id: "undecided", he: "עדיין לא בחרתי", en: "Haven't decided yet", image: null },
];

const copy = {
  he: {
    title: "צור קשר",
    subtitle: "השאירו פרטים ונחזור אליכם בהקדם",
    thankYou: "יאללה, מתחילים לחגוג! 🎉",
    thankYouText: "קיבלנו את הפרטים שלך, ניצור קשר ממש בקרוב כדי להפוך את היום הגדול שלכם לבלתי נשכח!",
    sectionCouple: "החתן והכלה",
    sectionDay: "היום הגדול",
    sectionContact: "איך נחזור אליכם",
    sectionPrefs: "ההעדפות שלכם",
    groomName: "שם החתן",
    brideName: "שם הכלה",
    weddingDate: "תאריך החתונה",
    venue: "אולם / מקום החתונה",
    phone: "טלפון",
    email: "אימייל",
    djSelect: "מי הדי-ג'יי שמעניין אותכם?",
    packagesLabel: "סוג חבילה שמעוניינים לשמוע",
    packageFull: "חתונה מלאה",
    packageSecond: "סבב שני",
    notes: "משהו שתרצו להוסיף?",
    notesPlaceholder: "כל פרט שיעזור לנו להבין את הוויב שלכם...",
    submit: "שליחת הפרטים",
    sending: "שולח...",
    errorMessage: "משהו השתבש, נסו שוב או צרו קשר בטלפון.",
    invalidPhone: "אנא הזינו מספר טלפון תקין",
    invalidEmail: "אנא הזינו כתובת אימייל תקינה",
    notSure: "עדיין לא בחרתי",
  },
  en: {
    title: "Contact",
    subtitle: "Leave your details and we will get back to you soon",
    thankYou: "Thank you!",
    thankYouText: "We received your details and will contact you very soon.",
    sectionCouple: "The Couple",
    sectionDay: "The Big Day",
    sectionContact: "How can we reach you",
    sectionPrefs: "Your preferences",
    groomName: "Groom's name",
    brideName: "Bride's name",
    weddingDate: "Wedding date",
    venue: "Venue",
    phone: "Phone",
    email: "Email",
    djSelect: "Which DJ are you interested in?",
    packagesLabel: "Which package are you considering?",
    packageFull: "Full wedding",
    packageSecond: "Second round",
    notes: "Anything you'd like to add?",
    notesPlaceholder: "Any detail that helps us understand your vibe...",
    submit: "Send details",
    sending: "Sending...",
    errorMessage: "Something went wrong. Please try again or call us.",
    invalidPhone: "Please enter a valid phone number",
    invalidEmail: "Please enter a valid email address",
    notSure: "Not sure yet",
  },
};

const PACKAGE_OPTIONS: { value: PackageOption; labelKey: "packageFull" | "packageSecond" }[] = [
  { value: "full", labelKey: "packageFull" },
  { value: "second", labelKey: "packageSecond" },
];

const PHONE_PATTERN = /^[+\d][\d\s\-()]{8,}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactSection = ({ lang }: ContactSectionProps) => {
  const { ref, isVisible } = useScrollReveal();
  const labels = copy[lang];
  const isRtl = lang === "he";

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageOption | null>(null);
  const [selectedDjs, setSelectedDjs] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    if (submitted) {
      document.getElementById("contact-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [submitted]);

  const validatePhone = (v: string) =>
    v.trim().length === 0 ? labels.invalidPhone : PHONE_PATTERN.test(v.trim()) ? null : labels.invalidPhone;
  const validateEmail = (v: string) =>
    v.trim().length === 0 ? null : EMAIL_PATTERN.test(v.trim()) ? null : labels.invalidEmail;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const phoneErr = validatePhone(phone);
    const emailErr = validateEmail(email);
    setPhoneError(phoneErr);
    setEmailError(emailErr);
    if (phoneErr || emailErr) return;

    setErrorMessage(null);
    setSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    try {
      await submitLead({
        groomName: (formData.get("groomName") as string) || "",
        brideName: (formData.get("brideName") as string) || "",
        weddingDate: (formData.get("weddingDate") as string) || undefined,
        venue: (formData.get("venue") as string) || undefined,
        phone: phone.trim(),
        email: email.trim() || undefined,
        dj: selectedDjs.length > 0 ? selectedDjs : undefined,
        packages: selectedPackage ? [selectedPackage] : undefined,
        notes: notes.trim() || undefined,
        lang,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMessage(labels.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const sectionCardClass = "py-5 first:pt-0 last:pb-0";
  const sectionHeaderClass =
    "flex items-center gap-2 mb-3 font-body text-base font-semibold tracking-wide text-foreground/75";
  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all";
  const labelClass =
    "block font-body text-base font-medium text-foreground mb-1.5";
  const requiredMark = (
    <span aria-hidden="true" className="text-primary">
      {" "}*
    </span>
  );

  return (
    <section id="contact" dir={isRtl ? "rtl" : "ltr"} className="section-padding bg-primary-foreground">
      <div ref={ref} className="text-center max-w-6xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}>
          <h2 id="contact-title" className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">
            {labels.title}
          </h2>
          <p className="text-muted-foreground text-lg font-body">{labels.subtitle}</p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div
          className={`space-y-8 md:space-y-0 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 lg:gap-8 md:items-start transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}
          style={{ animationDelay: "200ms" }}
        >
          <div className="hidden md:block" aria-hidden="true" />
          <div className="w-full max-w-xl mx-auto">
            {submitted ? (
              <div className="bg-secondary rounded-2xl p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{labels.thankYou}</h3>
                <p className="text-muted-foreground font-body">{labels.thankYouText}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-start" aria-labelledby="contact-title" noValidate>
                <div className="bg-card rounded-2xl border border-border/60 p-5 sm:p-7 shadow-sm divide-y divide-border/50">
                  <div className={sectionCardClass}>
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-3 sm:gap-5 items-end">
                      <div className="text-start min-w-0">
                        <label htmlFor="contact-groomName" className={labelClass}>
                          {labels.groomName}
                          {requiredMark}
                        </label>
                        <input
                          id="contact-groomName"
                          type="text"
                          name="groomName"
                          placeholder={labels.groomName}
                          required
                          aria-required="true"
                          autoComplete="given-name"
                          className={inputClass}
                        />
                      </div>

                      <span
                        aria-hidden="true"
                        className="font-heading text-3xl sm:text-4xl text-primary/70 italic font-light leading-none pb-3 select-none"
                      >
                        &amp;
                      </span>

                      <div className="text-start min-w-0">
                        <label htmlFor="contact-brideName" className={labelClass}>
                          {labels.brideName}
                          {requiredMark}
                        </label>
                        <input
                          id="contact-brideName"
                          type="text"
                          name="brideName"
                          placeholder={labels.brideName}
                          required
                          aria-required="true"
                          autoComplete="given-name"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* The Big Day */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>
                      <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
                      {labels.sectionDay}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-weddingDate" className={labelClass}>
                          {labels.weddingDate}
                        </label>
                        <input
                          id="contact-weddingDate"
                          type="date"
                          name="weddingDate"
                          min={today}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-venue" className={labelClass}>
                          <MapPin
                            className="inline-block align-middle w-3.5 h-3.5 text-muted-foreground me-1.5 -mt-0.5"
                            aria-hidden="true"
                          />
                          {labels.venue}
                        </label>
                        <input
                          id="contact-venue"
                          type="text"
                          name="venue"
                          placeholder={labels.venue}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>
                      <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
                      {labels.sectionContact}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-phone" className={labelClass}>
                          {labels.phone}
                          {requiredMark}
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          placeholder="050-123-4567"
                          required
                          aria-required="true"
                          aria-invalid={!!phoneError}
                          aria-describedby={phoneError ? "contact-phone-error" : undefined}
                          autoComplete="tel"
                          dir="ltr"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (phoneError) setPhoneError(validatePhone(e.target.value));
                          }}
                          onBlur={() => setPhoneError(validatePhone(phone))}
                          className={`${inputClass} ${phoneError ? "border-destructive focus:ring-destructive/40 focus:border-destructive" : ""} ${isRtl ? "text-right" : ""}`}
                        />
                        {phoneError && (
                          <p id="contact-phone-error" role="alert" className="mt-1.5 text-sm text-destructive font-body">
                            {phoneError}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="contact-email" className={labelClass}>
                          {labels.email}
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          placeholder="name@example.com"
                          autoComplete="email"
                          dir="ltr"
                          aria-invalid={!!emailError}
                          aria-describedby={emailError ? "contact-email-error" : undefined}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError(validateEmail(e.target.value));
                          }}
                          onBlur={() => setEmailError(validateEmail(email))}
                          className={`${inputClass} ${emailError ? "border-destructive focus:ring-destructive/40 focus:border-destructive" : ""} ${isRtl ? "text-right" : ""}`}
                        />
                        {emailError && (
                          <p id="contact-email-error" role="alert" className="mt-1.5 text-sm text-destructive font-body">
                            {emailError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Preferences: DJ + packages + notes */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>
                      <Headphones className="w-4 h-4 text-primary" aria-hidden="true" />
                      {labels.sectionPrefs}
                    </h3>

                    <fieldset>
                      <legend className={labelClass}>{labels.djSelect}</legend>
                      <div
                        role="group"
                        aria-label={labels.djSelect}
                        className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3"
                      >
                        {DJ_OPTIONS.map((dj) => {
                          const value = dj[lang];
                          const checked = selectedDjs.includes(value);
                          const isUndecided = dj.id === "undecided";
                          const undecidedValue = DJ_OPTIONS.find((d) => d.id === "undecided")![lang];
                          const displayName = isUndecided ? labels.notSure : value;
                          const splittable = dj.id !== "undecided" && dj.id !== "rona";
                          const [firstName, ...rest] = displayName.split(" ");
                          const lastName = splittable ? rest.join(" ") : "";
                          return (
                            <button
                              key={dj.id}
                              type="button"
                              role="checkbox"
                              aria-checked={checked}
                              onClick={() =>
                                setSelectedDjs((prev) => {
                                  if (isUndecided) {
                                    return checked ? [] : [value];
                                  }
                                  const withoutUndecided = prev.filter((v) => v !== undecidedValue);
                                  return checked
                                    ? withoutUndecided.filter((v) => v !== value)
                                    : [...withoutUndecided, value];
                                })
                              }
                              className={`group relative aspect-[3/4] overflow-hidden rounded-xl border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${checked
                                ? "border-primary ring-2 ring-primary/40 shadow-md scale-[1.02]"
                                : "border-border hover:border-primary/40"
                                }`}
                            >
                              {dj.image ? (
                                <>
                                  <img
                                    src={dj.image}
                                    alt=""
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                </>
                              ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                                  <HelpCircle className="w-8 h-8 text-primary/60" aria-hidden="true" />
                                </div>
                              )}
                              {checked && (
                                <div className="absolute top-1.5 end-1.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow">
                                  <Check className="w-3.5 h-3.5 text-primary-foreground" aria-hidden="true" />
                                </div>
                              )}
                              <span
                                className={`absolute bottom-0 inset-x-0 px-1 pb-2 font-heading text-sm sm:text-[11px] font-bold leading-[1.15] text-center ${dj.image ? "text-white" : "text-foreground"
                                  }`}
                              >
                                {lastName ? (
                                  <>
                                    <span className="block">{firstName}</span>
                                    <span className="block">{lastName}</span>
                                  </>
                                ) : (
                                  displayName
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    <fieldset className="mt-5">
                      <legend className={labelClass}>{labels.packagesLabel}</legend>
                      <div role="radiogroup" aria-label={labels.packagesLabel} className="flex flex-wrap gap-2.5">
                        {PACKAGE_OPTIONS.map(({ value, labelKey }) => {
                          const checked = selectedPackage === value;
                          return (
                            <label
                              key={value}
                              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-body text-base cursor-pointer transition-all ${checked
                                ? "bg-primary/10 border-primary text-foreground"
                                : "bg-background border-border text-foreground hover:border-primary/40"
                                }`}
                            >
                              <input
                                type="radio"
                                name="package"
                                value={value}
                                checked={checked}
                                onChange={() => setSelectedPackage(value)}
                                className="sr-only"
                              />
                              <span
                                aria-hidden="true"
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${checked ? "border-primary" : "border-border"
                                  }`}
                              >
                                {checked && <span className="w-2 h-2 rounded-full bg-primary" />}
                              </span>
                              {labels[labelKey]}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div className="mt-5">
                      <label htmlFor="contact-notes" className={labelClass}>
                        {labels.notes}
                      </label>
                      <textarea
                        id="contact-notes"
                        name="notes"
                        placeholder={labels.notesPlaceholder}
                        rows={4}
                        maxLength={NOTES_MAX}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className={`${inputClass} resize-none`}
                      />
                      <div className="mt-1 text-xs text-muted-foreground font-body text-end" aria-live="polite">
                        {notes.length} / {NOTES_MAX}
                      </div>
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div role="alert" className="rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive font-body text-start">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-lg md:text-xl hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 inline-flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      {labels.sending}
                    </>
                  ) : (
                    labels.submit
                  )}
                </button>

              </form>
            )}
          </div>

          <div className="flex flex-col gap-6 md:justify-self-end md:pt-2">
            <a
              href="tel:+972559899791"
              aria-label={lang === "he" ? "חיוג למספר 055-989-9791" : "Call +972 55-989-9791"}
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-body text-lg" dir="ltr">
                ‪+972 55-989-9791
              </span>
            </a>
            <a
              href="mailto:info@opamusic.co.il"
              aria-label={lang === "he" ? "שליחת אימייל ל-info@opamusic.co.il" : "Email info@opamusic.co.il"}
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-body text-lg">opadjs.il@gmail.com</span>
            </a>
            <a
              href="https://www.instagram.com/opamusic.co.il/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={lang === "he" ? "הפרופיל שלנו באינסטגרם — נפתח בכרטיסייה חדשה" : "Our Instagram profile — opens in new tab"}
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="font-body text-lg">@opamusic.co.il</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
