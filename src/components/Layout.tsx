import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CryptoBackground from "@/components/CryptoBackground";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="min-h-screen bg-background relative">
      {/* Global crypto background */}
      <div className="fixed inset-0 z-0">
        <CryptoBackground />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        {children}
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
