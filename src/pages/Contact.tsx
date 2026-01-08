import Layout from "@/components/Layout";
import { lazy, Suspense } from "react";

const ContactSection = lazy(() => import("@/components/ContactSection"));

const SectionLoader = () => (
  <div className="min-h-[150px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Contact = () => {
  return (
    <Layout>
      <div className="pt-24">
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </div>
    </Layout>
  );
};

export default Contact;
