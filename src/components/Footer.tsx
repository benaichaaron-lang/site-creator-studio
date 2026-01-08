import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const footerLinks = {
    services: [
      { label: t("footer.links.starterPack"), href: "/packs" },
      { label: t("footer.links.businessPack"), href: "/packs" },
      { label: t("footer.links.premiumPack"), href: "/packs" },
      { label: t("footer.links.custom"), href: "/custom" },
    ],
    company: [
      { label: t("footer.links.about"), href: "/about" },
      { label: t("footer.links.portfolio"), href: "/portfolio" },
      { label: t("footer.links.howItWorks"), href: "/how-it-works" },
      { label: t("footer.links.faq"), href: "/faq" },
      { label: t("footer.links.contact"), href: "/contact" },
    ],
    legal: [
      { label: t("footer.links.legalNotice"), href: "/legal-notice" },
      { label: t("footer.links.privacyPolicy"), href: "/privacy-policy" },
      { label: t("footer.links.terms"), href: "/terms" },
    ],
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToHeroForm = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative pt-32 pb-12 overflow-hidden bg-black border-t border-white/10">
      {/* CTA Banner */}
      <motion.div className="container mx-auto px-4 mb-28" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <motion.div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-primary/30 shadow-[0_8px_60px_hsl(217,91%,50%,0.3)]" whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 200 }}>
          <div className="text-center">
            <motion.h2 className="font-bebas text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">{t("footer.cta.title")}</motion.h2>
            <motion.p className="text-white/70 mb-2 max-w-xl mx-auto">{t("footer.cta.subtitle")}</motion.p>
            <motion.p className="text-primary text-sm mb-10 font-medium">{t("footer.cta.noPayment")}</motion.p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/" onClick={scrollToHeroForm}>
                <Button variant="hero" size="xl">{t("footer.cta.startBrief")}<ArrowRight className="w-5 h-5" /></Button>
              </a>
              <a href="/#packs" onClick={(e) => handleNavClick(e, "/#packs")}>
                <Button variant="heroOutline" size="xl">{t("footer.cta.seePricing")}</Button>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              {/* Circle icon with M */}
              <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center bg-transparent">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <path 
                    d="M4 18V6L12 14L20 6V18" 
                    stroke="url(#footerLogoGradient)" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="footerLogoGradient" x1="4" y1="6" x2="20" y2="18" gradientUnits="userSpaceOnUse">
                      <stop stopColor="hsl(var(--primary))" />
                      <stop offset="1" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              {/* Text */}
              <span className="font-semibold text-xl tracking-tight">
                <span className="text-white">MySite</span>
                <span className="text-primary">Factory</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm mb-4 max-w-xs">{t("footer.description")}</p>
            <p className="text-white/40 text-xs mb-6 max-w-xs italic">{t("footer.trusted")}</p>
            <div className="flex items-center gap-2">
              <motion.div className="w-2 h-2 rounded-full bg-primary" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-sm text-white/50">{t("footer.readyToWork")}</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-white">{t("footer.services")}</h4>
            <ul className="space-y-3">{footerLinks.services.map((link) => (<li key={link.label}><a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-white/50 hover:text-white transition-colors text-sm cursor-pointer">{link.label}</a></li>))}</ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-white">{t("footer.company")}</h4>
            <ul className="space-y-3">{footerLinks.company.map((link) => (<li key={link.label}><a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-white/50 hover:text-white transition-colors text-sm cursor-pointer">{link.label}</a></li>))}</ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-white">{t("footer.legal")}</h4>
            <ul className="space-y-3">{footerLinks.legal.map((link) => (<li key={link.label}><a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-white/50 hover:text-white transition-colors text-sm cursor-pointer">{link.label}</a></li>))}</ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© {currentYear} MySiteFactory. {t("footer.copyright")}</p>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-sm">{t("footer.acceptedPayments")}</span>
            <div className="flex items-center gap-2">
              {["ETH", "BTC", "USDC", "USDT"].map((crypto) => (<div key={crypto} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><span className="text-xs font-bold text-white">{crypto[0]}</span></div>))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
