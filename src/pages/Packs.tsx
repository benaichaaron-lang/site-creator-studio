import Layout from "@/components/Layout";
import { lazy, Suspense } from "react";

const PacksSection = lazy(() => import("@/components/PacksSection"));
const CryptoSection = lazy(() => import("@/components/CryptoSection"));

const SectionLoader = () => (
  <div className="min-h-[150px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Packs = () => {
  return (
    <Layout>
      <div className="pt-24">
        <Suspense fallback={<SectionLoader />}>
          <PacksSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <CryptoSection />
        </Suspense>
      </div>
    </Layout>
  );
};

export default Packs;
