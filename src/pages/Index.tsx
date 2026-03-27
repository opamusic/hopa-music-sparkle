import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DJsSection from "@/components/DJsSection";
import ParallaxTicker from "@/components/ParallaxTicker";
import RonaSection from "@/components/RonaSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export type SiteLanguage = "he" | "en";

const Index = () => {
  const [lang, setLang] = useState<SiteLanguage>("he");

  return (
    <div className="overflow-hidden">
      <Header lang={lang} onToggleLanguage={() => setLang((prev) => (prev === "he" ? "en" : "he"))} />
      <HeroSection lang={lang} />
      <AboutSection lang={lang} />
      <DJsSection lang={lang} />
      <ParallaxTicker />
      <RonaSection lang={lang} />
      <ContactSection lang={lang} />
      <FAQSection lang={lang} />
      <Footer lang={lang} />
      <WhatsAppButton />
    </div>
  );
};

export default Index;

