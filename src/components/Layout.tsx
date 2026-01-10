import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      {children}
      <Footer />
      <WhatsAppWidget />
    </main>
  );
};

export default Layout;
