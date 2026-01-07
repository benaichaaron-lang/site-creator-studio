import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PacksSection from "@/components/PacksSection";
import CustomSection from "@/components/CustomSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ServiceDemoSection from "@/components/ServiceDemoSection";
import CryptoSection from "@/components/CryptoSection";
import ExamplesSection from "@/components/ExamplesSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ExamplesSection />
      <ServiceDemoSection />
      <HowItWorksSection />
      <CustomSection />
      <CryptoSection />
      <PacksSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
