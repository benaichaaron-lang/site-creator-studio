import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import logoIcon from "@/assets/logo-icon.png";
import TrustpilotWidget from "@/components/TrustpilotWidget";
import { BitcoinIcon, EthereumIcon, USDCIcon, USDTIcon } from "./CryptoBadge";

// Premium easing
const premiumEase: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const footerLinks = {
    services: [
      { label: t("footer.links.starterPack"), href: "/pricing" },
      { label: t("footer.links.businessPack"), href: "/pricing" },
      { label: t("footer.links.premiumPack"), href: "/pricing" },
      { label: t("footer.links.custom"), href: "/services" },
    ],
    company: [
      { label: t("footer.links.about"), href: "/agency" },
      { label: t("footer.links.portfolio"), href: "/portfolio" },
      { label: t("footer.links.howItWorks"), href: "/process" },
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

  const cryptos = [
    { Icon: BitcoinIcon, name: "BTC" },
    { Icon: EthereumIcon, name: "ETH" },
    { Icon: USDCIcon, name: "USDC" },
    { Icon: USDTIcon, name: "USDT" },
  ];

  return (
    <footer className="relative pt-36 pb-14 overflow-hidden border-t border-border/20">
      {/* CTA Banner - more refined */}
      <motion.div 
        className="container mx-auto px-4 mb-32" 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.8, ease: premiumEase }}
      >
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-br from-primary/15 via-primary/8 to-primary/5 backdrop-blur-sm rounded-3xl p-12 md:p-16 border border-primary/20 shadow-[0_8px_60px_hsl(217,91%,55%,0.15)]"
          whileHover={{ scale: 1.005 }} 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="text-center">
            <motion.h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-foreground">{t("footer.cta.title")}</motion.h2>
            <motion.p className="text-muted-foreground mb-2.5 max-w-xl mx-auto leading-relaxed">{t("footer.cta.subtitle")}</motion.p>
            <motion.p className="text-primary text-sm mb-12 font-medium">{t("footer.cta.noPayment")}</motion.p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/" onClick={scrollToHeroForm}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-400">
                  {t("footer.cta.startBrief")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="/packs" onClick={(e) => handleNavClick(e, "/packs")}>
                <Button variant="outline" className="h-14 px-8 rounded-xl text-base font-medium border-foreground/15 hover:bg-foreground/5 transition-all duration-400">
                  {t("footer.cta.seePricing")}
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-14 mb-20">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <img src={logoIcon} alt="MySiteFactory" className="h-10 w-auto object-contain" />
              <span className="font-medium text-xl tracking-tight">
                <span className="text-foreground/90">MySite</span>
                <span className="text-primary">Factory</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs leading-relaxed">{t("footer.description")}</p>
            <p className="text-muted-foreground/50 text-xs mb-7 max-w-xs italic">{t("footer.trusted")}</p>
            <a href="tel:+13463683103" className="flex items-center gap-2.5 mb-3.5 text-muted-foreground hover:text-primary transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span className="text-sm">+1 346 368 3103</span>
            </a>
            <a href="https://wa.me/13463683103" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 mb-5 text-muted-foreground hover:text-success transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span className="text-sm">WhatsApp</span>
            </a>
            <div className="flex items-center gap-2.5 mb-5">
              <motion.div className="w-2 h-2 rounded-full bg-primary" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
              <span className="text-sm text-muted-foreground/60">{t("footer.readyToWork")}</span>
            </div>
            <div className="max-w-xs">
              <TrustpilotWidget />
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-5 text-foreground">{t("footer.services")}</h4>
            <ul className="space-y-3.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)} 
                    className="text-muted-foreground/70 hover:text-foreground transition-colors duration-300 text-sm cursor-pointer link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-5 text-foreground">{t("footer.company")}</h4>
            <ul className="space-y-3.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)} 
                    className="text-muted-foreground/70 hover:text-foreground transition-colors duration-300 text-sm cursor-pointer link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-5 text-foreground">{t("footer.legal")}</h4>
            <ul className="space-y-3.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)} 
                    className="text-muted-foreground/70 hover:text-foreground transition-colors duration-300 text-sm cursor-pointer link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground/50 text-sm">© {currentYear} MySiteFactory. {t("footer.copyright")}</p>
          <div className="flex items-center gap-5">
            <span className="text-muted-foreground/50 text-sm">{t("footer.acceptedPayments")}</span>
            <div className="flex items-center gap-2">
              {cryptos.map((crypto) => (
                <div 
                  key={crypto.name} 
                  className="w-9 h-9 rounded-full bg-card/50 border border-border/30 flex items-center justify-center hover:bg-card/70 hover:border-border/50 transition-all duration-300"
                >
                  <crypto.Icon className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
