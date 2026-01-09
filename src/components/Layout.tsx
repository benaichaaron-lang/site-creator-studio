import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
