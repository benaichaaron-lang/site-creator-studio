import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LazySection from "@/components/LazySection";

// Lazy load des sections non-critiques
const TrustSection = lazy(() => import("@/components/TrustSection"));
const DemoTabsSection = lazy(() => import("@/components/DemoTabsSection"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const PacksSection = lazy(() => import("@/components/PacksSection"));
const CryptoSection = lazy(() => import("@/components/CryptoSection"));
const CustomSection = lazy(() => import("@/components/CustomSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionLoader = () => (
  <div className="min-h-[150px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      
      {/* Trust section - stats + client logos */}
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <TrustSection />
        </Suspense>
      </LazySection>
      
      {/* Demo tabs - Shopify style */}
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <DemoTabsSection />
        </Suspense>
      </LazySection>
      
      {/* How it works */}
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <HowItWorksSection />
        </Suspense>
      </LazySection>
      
      {/* Pricing packs */}
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <PacksSection />
        </Suspense>
      </LazySection>
      
      {/* Crypto payment */}
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <CryptoSection />
        </Suspense>
      </LazySection>
      
      {/* Custom projects */}
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <CustomSection />
        </Suspense>
      </LazySection>
      
      {/* FAQ */}
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <FAQSection />
        </Suspense>
      </LazySection>
      
      {/* Contact */}
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </LazySection>
      
      {/* Footer */}
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </LazySection>
    </main>
  );
};

export default Index;
