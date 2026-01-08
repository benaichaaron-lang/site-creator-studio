import Layout from "@/components/Layout";
import { lazy, Suspense } from "react";

const FAQSection = lazy(() => import("@/components/FAQSection"));

const SectionLoader = () => (
  <div className="min-h-[150px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const FAQ = () => {
  return (
    <Layout>
      <div className="pt-24">
        <Suspense fallback={<SectionLoader />}>
          <FAQSection />
        </Suspense>
      </div>
    </Layout>
  );
};

export default FAQ;
