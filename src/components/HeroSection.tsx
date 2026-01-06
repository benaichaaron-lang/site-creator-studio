import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const HeroSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <motion.div 
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card shadow-sm mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">Crypto payments accepted</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-foreground">Your professional website</span>
            <br />
            <span className="italic text-primary">delivered in 7 days</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Modern websites crafted with precision. Simple process, transparent pricing, exceptional results.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a href="#packs" onClick={(e) => handleNavClick(e, "#packs")}>
                <Button size="xl" className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base font-medium rounded-full shadow-elevated">
                  View our packs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a href="#custom" onClick={(e) => handleNavClick(e, "#custom")}>
                <Button variant="outline" size="xl" className="px-8 py-6 text-base font-medium rounded-full border-border/60 hover:bg-secondary">
                  Request a quote
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="mt-20 pt-12 border-t border-border/50 flex flex-wrap items-center justify-center gap-12 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {[
              { number: "7", label: "Day delivery" },
              { number: "100%", label: "Transparent" },
              { number: "24/7", label: "Support" }
            ].map((item, index) => (
              <motion.div 
                key={item.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <div className="font-display text-3xl text-foreground mb-1">{item.number}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
