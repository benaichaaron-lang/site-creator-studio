import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const footerLinks = {
    services: [
      { label: "Starter Pack", href: "/#packs" },
      { label: "Business Pack", href: "/#packs" },
      { label: "Premium Pack", href: "/#packs" },
      { label: "Custom", href: "/#custom" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/#portfolio" },
      { label: "How it Works", href: "/#how-it-works" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#contact" },
    ],
    legal: [
      { label: "Legal Notice", href: "/legal-notice" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith("/#")) {
      const sectionId = href.substring(2);
      
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToHeroForm = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative pt-32 pb-12 overflow-hidden" style={{ backgroundColor: 'hsl(217 50% 8%)' }}>
      {/* CTA Banner */}
      <motion.div 
        className="container mx-auto px-4 mb-28"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-primary/30 shadow-[0_8px_60px_hsl(217,91%,50%,0.3)]"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="text-center">
            <motion.h2 
              className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ready to launch your project?
            </motion.h2>
            <motion.p 
              className="text-white/70 mb-2 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Start with a free brief. Decide later.
            </motion.p>
            <motion.p 
              className="text-primary text-sm mb-10 font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
            >
              No payment required until you validate the project.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <a href="/" onClick={scrollToHeroForm}>
                  <Button variant="hero" size="xl">
                    Start my brief
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </Button>
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <a href="/#packs" onClick={(e) => handleNavClick(e, "/#packs")}>
                  <Button variant="heroOutline" size="xl">
                    See pricing
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer Content */}
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/" className="flex items-center gap-3 mb-4 group">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
                  <span className="text-primary-foreground font-bold text-lg tracking-tight">M</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-semibold text-lg tracking-tight text-white/90 group-hover:text-white transition-colors">
                    MySite<span className="text-primary/80 group-hover:text-primary transition-colors">Factory</span>
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 -mt-0.5">
                    Web Solutions
                  </span>
                </div>
              </Link>
            </motion.div>
            <p className="text-white/60 text-sm mb-4 max-w-xs">
              Professional websites, delivered fast, with crypto payments. 
              Simple, modern, transparent.
            </p>
            <p className="text-white/40 text-xs mb-6 max-w-xs italic">
              Trusted by entrepreneurs and businesses worldwide since 2023.
            </p>
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-white/50">Ready to work with you</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/50 hover:text-white transition-colors text-sm cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/50 hover:text-white transition-colors text-sm cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/50 hover:text-white transition-colors text-sm cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-white/40 text-sm">
            © {currentYear} MySiteFactory. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-sm">Accepted payments:</span>
            <div className="flex items-center gap-2">
              {["ETH", "BTC", "USDC", "USDT"].map((crypto, index) => (
                <motion.div
                  key={crypto}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                >
                  <span className="text-xs font-bold text-white">{crypto[0]}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;