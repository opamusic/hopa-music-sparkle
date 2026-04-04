import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DJsSection from "@/components/DJsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import RonaSection from "@/components/RonaSection";
import ParallaxTicker from "@/components/ParallaxTicker";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityStatement from "@/components/AccessibilityStatement";

export type SiteLanguage = "he" | "en";

const Index = () => {
  const [lang, setLang] = useState<SiteLanguage>("he");
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  return (
    <div className="overflow-x-hidden">
      <Header lang={lang} onToggleLanguage={() => setLang((prev) => (prev === "he" ? "en" : "he"))} />
      <HeroSection lang={lang} />
      <AboutSection lang={lang} />
      <DJsSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <RonaSection lang={lang} />
      <ParallaxTicker />
      <ContactSection lang={lang} />
      <FAQSection lang={lang} />
      <Footer lang={lang} onAccessibilityClick={() => setAccessibilityOpen(true)} />
      <WhatsAppButton />
      <AccessibilityStatement open={accessibilityOpen} onClose={() => setAccessibilityOpen(false)} />
    </div>
  );
};

export default Index;
