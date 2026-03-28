import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";
import { Phone, Mail, Instagram } from "lucide-react";

interface ContactSectionProps {
  lang: "he" | "en";
}

const djsByLang = {
  he: ["ILAY ATTIAS", "ORI HOLLANDER", "ITAY ROZENGART", "עדיין לא בחרתי"],
  en: ["ILAY ATTIAS", "ORI HOLLANDER", "ITAY ROZENGART", "Haven't decided yet"]
};

const copy = {
  he: {
    title: "צור קשר",
    subtitle: "השאירו פרטים ונחזור אליכם בהקדם",
    thankYou: "תודה!",
    thankYouText: "קיבלנו את הפרטים שלך, ניצור קשר ממש בקרוב.",
    fullName: "שם מלא",
    phone: "טלפון",
    email: "אימייל",
    djSelect: "מי הדי-ג'יי שמעניין אותך?",
    notes: "ספרו לנו על האירוע שלכם...",
    submit: "שליחה"
  },
  en: {
    title: "Contact",
    subtitle: "Leave your details and we will get back to you soon",
    thankYou: "Thank you!",
    thankYouText: "We received your details and will contact you very soon.",
    fullName: "Full name",
    phone: "Phone",
    email: "Email",
    djSelect: "Which DJ are you interested in?",
    notes: "Tell us about your event...",
    submit: "Send"
  }
};

const ContactSection = ({ lang }: ContactSectionProps) => {
  const { ref, isVisible } = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const labels = copy[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-primary-foreground">
      <div ref={ref} className="text-center">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">{labels.title}</h2>
          <p className="text-muted-foreground text-lg font-body">{labels.subtitle}</p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className={`grid md:grid-cols-5 gap-10 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`} style={{ animationDelay: "200ms" }}>
          <div className="md:col-span-3">
            {submitted ?
            <div className="bg-secondary rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{labels.thankYou}</h3>
                <p className="text-muted-foreground font-body">{labels.thankYouText}</p>
              </div> :

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                type="text"
                placeholder={labels.fullName}
                required
                className="w-full px-5 py-3.5 rounded-xl bg-muted border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-right" />
              

                <input
                type="tel"
                placeholder={labels.phone}
                required
                dir="ltr"
                className="w-full px-5 py-3.5 rounded-xl bg-muted border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-right" />
              

                <input
                type="email"
                placeholder={labels.email}
                className="w-full px-5 py-3.5 rounded-xl bg-muted border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-right" />
              

                <select
                className="w-full px-5 py-3.5 rounded-xl bg-muted border border-border text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all appearance-none text-right"
                defaultValue="">
                
                  <option value="" disabled>{labels.djSelect}</option>
                  {djsByLang[lang].map((dj) =>
                <option key={dj} value={dj}>{dj}</option>
                )}
                </select>

                <textarea
                placeholder={labels.notes}
                rows={4}
                className="w-full px-5 py-3.5 rounded-xl bg-muted border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none text-right" />
              

                <button
                type="submit"
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg">
                
                  {labels.submit}
                </button>
              </form>
            }
          </div>

          <div className="md:col-span-2 flex flex-col justify-center gap-6">
            <a href="tel:0501234567" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-body text-sm text-muted-foreground">{lang === "he" ? "טלפון" : "Phone"}</span>
                <span className="font-body text-lg" dir="ltr">‪+972 52‑205‑1273‬</span>
              </div>
            </a>
            <a href="mailto:info@opamusic.co.il" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-body text-lg">opadjs.il@gmail.com
</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="font-body text-lg">@opamusic.co.il</span>
            </a>
          </div>
        </div>
      </div>
    </section>);
};

export default ContactSection;