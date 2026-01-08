import Layout from "@/components/Layout";
import { lazy, Suspense } from "react";

const CustomSection = lazy(() => import("@/components/CustomSection"));

const SectionLoader = () => (
  <div className="min-h-[150px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Custom = () => {
  return (
    <Layout>
      <div className="pt-24">
        <Suspense fallback={<SectionLoader />}>
          <CustomSection />
        </Suspense>
      </div>
    </Layout>
  );
};

export default Custom;
