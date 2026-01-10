import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LazySection from "@/components/LazySection";

// Lazy load sections
const TrustSection = lazy(() => import("@/components/TrustSection"));
const InteractiveDemoSection = lazy(() => import("@/components/InteractiveDemoSection"));
const UIUXSection = lazy(() => import("@/components/UIUXSection"));
const ExpertiseSection = lazy(() => import("@/components/ExpertiseSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionLoader = () => (
  <div className="min-h-[100px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      
      {/* Trust section - stats + credibility */}
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <TrustSection />
        </Suspense>
      </LazySection>
      
      {/* Interactive Demo - Website Builder Playground */}
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <InteractiveDemoSection />
        </Suspense>
      </LazySection>

      {/* UI/UX Section */}
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <UIUXSection />
        </Suspense>
      </LazySection>

      {/* Expertise Section */}
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <ExpertiseSection />
        </Suspense>
      </LazySection>
      
      {/* Testimonials */}
      <LazySection>
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
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
