import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import logoIcon from "@/assets/dashboard-icon.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.agency"), href: "/agency" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: t("nav.process"), href: "/process" },
    { label: t("nav.pricing"), href: "/pricing" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    navigate(href);
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled || isOpen
          ? 'bg-black/95 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent border-b border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo - flex-shrink-0 prevents compression */}
          <Link 
            to="/" 
            className="flex items-center gap-2 flex-shrink-0 group"
            onClick={handleLogoClick}
          >
            {/* Logo icon */}
            <img src={logoIcon} alt="MySiteFactory" className="h-20 md:h-24 w-auto object-contain" />
            {/* Text - hidden on very small screens */}
            <span className="font-medium text-2xl md:text-4xl tracking-tight whitespace-nowrap">
              <span className="text-white/90">MySite</span>
              <span className="text-primary">Factory</span>
            </span>
          </Link>

          {/* Desktop Navigation - better spacing */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`transition-colors text-sm font-medium cursor-pointer whitespace-nowrap ${
                  hasScrolled 
                    ? 'text-muted-foreground hover:text-foreground' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side - hidden on mobile/tablet */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
            <LanguageSwitcher hasScrolled={hasScrolled} isOpen={isOpen} />
            {user ? (
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-foreground text-background hover:bg-foreground/90 rounded-md px-4 xl:px-5 text-sm font-semibold"
              >
                {t("nav.dashboard")}
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => navigate('/auth')}
                  className={`text-sm font-medium px-3 ${hasScrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'}`}
                >
                  <LogIn className="w-4 h-4 mr-1.5" />
                  {t("nav.signIn")}
                </Button>
                <Button 
                  onClick={() => navigate('/auth', { state: { isSignUp: true } })}
                  className="bg-primary hover:bg-primary/90 text-white rounded-md px-3 xl:px-4 text-sm font-semibold"
                >
                  <UserPlus className="w-4 h-4 mr-1.5" />
                  {t("nav.signUp")}
                </Button>
              </>
            )}
          </div>

          {/* Mobile/Tablet Menu Button - visible until lg */}
          <button
            className={`lg:hidden p-2 transition-colors ${hasScrolled || isOpen ? 'text-foreground' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile/Tablet Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden py-4 border-t border-border bg-background"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2 cursor-pointer"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex items-center gap-3 py-2">
                  <span className="text-sm text-muted-foreground">{t("nav.language")}:</span>
                  <LanguageSwitcher hasScrolled={true} isOpen={true} />
                </div>
                {user ? (
                  <Button 
                    onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
                    className="bg-foreground text-background hover:bg-foreground/90 mt-2 w-full"
                  >
                    {t("nav.dashboard")}
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2 mt-2">
                    <Button 
                      variant="outline"
                      onClick={() => { setIsOpen(false); navigate('/auth'); }}
                      className="w-full"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      {t("nav.signIn")}
                    </Button>
                    <Button 
                      onClick={() => { setIsOpen(false); navigate('/auth', { state: { isSignUp: true } }); }}
                      className="bg-primary hover:bg-primary/90 text-white w-full"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {t("nav.signUp")}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
