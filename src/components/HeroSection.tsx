import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const HeroSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith("#")) {
      const sectionId = href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const trustedLogos = [
    { name: "Hitachi", opacity: 0.7 },
    { name: "PayPal", opacity: 0.7 },
    { name: "Netflix", opacity: 0.7 },
    { name: "L'Oréal", opacity: 0.7 },
    { name: "Skechers", opacity: 0.7 },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-hero pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <motion.div 
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-32 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <motion.p 
            className="text-hero-foreground/80 text-sm md:text-base mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Trusted by 200,000+ customers worldwide
          </motion.p>

          {/* Main Title */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-hero-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Turn to top freelancers
            <br />
            to create the <span className="italic font-normal">perfect site</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-hero-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Modern websites crafted with precision. Simple process, transparent pricing, exceptional results.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative flex items-center bg-background rounded-full overflow-hidden shadow-elevated">
              <div className="flex-1 flex items-center pl-6">
                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                <input
                  type="text"
                  placeholder="What type of website do you need?"
                  className="w-full py-4 text-foreground placeholder:text-muted-foreground bg-transparent outline-none text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <a href="#packs" onClick={(e) => handleNavClick(e, "#packs")}>
                <Button className="m-2 rounded-full px-6 py-6 bg-foreground text-background hover:bg-foreground/90 font-semibold">
                  Search
                </Button>
              </a>
            </div>
            
            {/* Popular searches */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              <span className="text-hero-foreground/60 text-sm">Popular:</span>
              {["Website Design", "E-Commerce", "Landing Page", "WordPress"].map((tag) => (
                <a
                  key={tag}
                  href="#packs"
                  onClick={(e) => handleNavClick(e, "#packs")}
                  className="text-hero-foreground/80 hover:text-hero-foreground text-sm border border-hero-foreground/30 rounded-full px-3 py-1 transition-colors hover:border-hero-foreground/60"
                >
                  {tag}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Trust Logos */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {trustedLogos.map((logo, index) => (
              <motion.div 
                key={logo.name}
                className="text-hero-foreground/50 font-semibold text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                {logo.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
