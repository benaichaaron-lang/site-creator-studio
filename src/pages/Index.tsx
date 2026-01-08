import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LazySection from "@/components/LazySection";

// Lazy load des sections non-critiques
const LogosSection = lazy(() => import("@/components/LogosSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const PacksSection = lazy(() => import("@/components/PacksSection"));
const CryptoSection = lazy(() => import("@/components/CryptoSection"));
const CustomSection = lazy(() => import("@/components/CustomSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <LogosSection />
        </Suspense>
      </LazySection>
      
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>
      </LazySection>
      
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <HowItWorksSection />
        </Suspense>
      </LazySection>
      
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <PacksSection />
        </Suspense>
      </LazySection>
      
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <CryptoSection />
        </Suspense>
      </LazySection>
      
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <CustomSection />
        </Suspense>
      </LazySection>
      
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <FAQSection />
        </Suspense>
      </LazySection>
      
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </LazySection>
      
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </LazySection>
    </main>
  );
};

export default Index;
