import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogosSection from "@/components/LogosSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import ExamplesSection from "@/components/ExamplesSection";
import PacksSection from "@/components/PacksSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CryptoSection from "@/components/CryptoSection";
import CustomSection from "@/components/CustomSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <LogosSection />
      <StatsSection />
      <ServicesSection />
      <ExamplesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PacksSection />
      <CryptoSection />
      <CustomSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
