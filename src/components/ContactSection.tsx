import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";
import { Phone, Mail, Instagram } from "lucide-react";

const djs = ["ILAY ATTIAS", "ORI HOLLANDER", "ITAY ROZENGART", "עדיין לא בחרתי"];

const ContactSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div ref={ref} className={`max-w-5xl mx-auto ${isVisible ? "" : "opacity-0"}`}>
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">צור קשר</h2>
          <p className="text-muted-foreground text-lg font-body">השאירו פרטים ונחזור אליכם בהקדם</p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className={`grid md:grid-cols-5 gap-10 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`} style={{ animationDelay: "200ms" }}>
          {/* Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="bg-secondary rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">תודה!</h3>
                <p className="text-muted-foreground font-body">קיבלנו את הפרטים שלך, ניצור קשר ממש בקרוב.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="שם מלא"
                  required
                  className="w-full px-5 py-3.5 rounded-xl bg-muted border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
                <input
                  type="tel"
                  placeholder="טלפון"
                  required
                  className="w-full px-5 py-3.5 rounded-xl bg-muted border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
                <input
                  type="email"
                  placeholder="אימייל"
                  className="w-full px-5 py-3.5 rounded-xl bg-muted border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
                <select
                  className="w-full px-5 py-3.5 rounded-xl bg-muted border border-border text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>מי הדי-ג'יי שמעניין אותך?</option>
                  {djs.map((dj) => (
                    <option key={dj} value={dj}>{dj}</option>
                  ))}
                </select>
                <textarea
                  placeholder="ספרו לנו על האירוע שלכם..."
                  rows={4}
                  className="w-full px-5 py-3.5 rounded-xl bg-muted border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg"
                >
                  שליחה
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="md:col-span-2 flex flex-col justify-center gap-6">
            <a href="tel:0501234567" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-body text-lg" dir="ltr">050-123-4567</span>
            </a>
            <a href="mailto:info@opamusic.co.il" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-body text-lg">info@opamusic.co.il</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="font-body text-lg">@opamusic</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
