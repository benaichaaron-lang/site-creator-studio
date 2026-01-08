import Layout from "@/components/Layout";
import { lazy, Suspense } from "react";

const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));

const SectionLoader = () => (
  <div className="min-h-[150px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const HowItWorks = () => {
  return (
    <Layout>
      <div className="pt-24">
        <Suspense fallback={<SectionLoader />}>
          <HowItWorksSection />
        </Suspense>
      </div>
    </Layout>
  );
};

export default HowItWorks;
