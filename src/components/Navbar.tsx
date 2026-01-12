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
      setHasScrolled(window.scrollY > 20);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hasScrolled || isOpen
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/30' 
          : 'bg-transparent border-b border-transparent'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.4, 0.25, 1)' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="container mx-auto px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo - premium spacing */}
          <Link 
            to="/" 
            className="flex items-center gap-1 flex-shrink-0 group"
            onClick={handleLogoClick}
          >
            <img 
              src={logoIcon} 
              alt="MySiteFactory" 
              className="h-11 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]" 
              style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.4, 0.25, 1)' }}
            />
            <span className="font-medium text-lg md:text-xl tracking-tight whitespace-nowrap">
              <span className="text-foreground/90">MySite</span>
              <span className="text-primary">Factory</span>
            </span>
          </Link>

          {/* Desktop Navigation - refined spacing */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative transition-colors duration-300 text-sm font-medium cursor-pointer whitespace-nowrap link-underline ${
                  hasScrolled 
                    ? 'text-muted-foreground hover:text-foreground' 
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side - refined buttons */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
            <LanguageSwitcher hasScrolled={hasScrolled} isOpen={isOpen} />
            {user ? (
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-5 xl:px-6 h-11 text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
              >
                {t("nav.dashboard")}
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => navigate('/auth')}
                  className={`text-sm font-medium px-4 h-11 rounded-xl transition-all duration-300 ${hasScrolled ? 'text-foreground hover:bg-muted/50' : 'text-foreground/80 hover:bg-foreground/5'}`}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {t("nav.signIn")}
                </Button>
                <Button 
                  onClick={() => navigate('/auth', { state: { isSignUp: true } })}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-5 xl:px-6 h-11 text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {t("nav.signUp")}
                </Button>
              </>
            )}
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${hasScrolled || isOpen ? 'text-foreground hover:bg-muted/50' : 'text-foreground hover:bg-foreground/5'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile/Tablet Navigation - Premium fullscreen */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 top-[72px] bg-background/98 backdrop-blur-xl z-40"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div className="flex flex-col p-6 pt-8 h-full">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                      className="text-foreground hover:text-primary transition-colors duration-300 text-lg font-medium py-3.5 px-4 rounded-xl hover:bg-muted/30 cursor-pointer"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>
                
                <motion.div 
                  className="flex items-center gap-3 py-4 px-4 mt-4 border-t border-border/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-sm text-muted-foreground">{t("nav.language")}:</span>
                  <LanguageSwitcher hasScrolled={true} isOpen={true} />
                </motion.div>
                
                <motion.div 
                  className="mt-auto pb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  {user ? (
                    <Button 
                      onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground w-full h-14 rounded-xl text-base font-semibold shadow-lg shadow-primary/20"
                    >
                      {t("nav.dashboard")}
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => { setIsOpen(false); navigate('/auth'); }}
                        className="w-full h-13 rounded-xl text-base border-border/50"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        {t("nav.signIn")}
                      </Button>
                      <Button 
                        onClick={() => { setIsOpen(false); navigate('/auth', { state: { isSignUp: true } }); }}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground w-full h-14 rounded-xl text-base font-semibold shadow-lg shadow-primary/20"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        {t("nav.signUp")}
                      </Button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
