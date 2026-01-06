import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, CreditCard, RefreshCw, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HeroSection = () => {
  const [websiteType, setWebsiteType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Scroll to packs section
    const packsSection = document.getElementById('packs');
    if (packsSection) {
      packsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const valueProps = [
    { icon: Clock, text: "5–10 days delivery" },
    { icon: DollarSign, text: "Fixed pricing" },
    { icon: CreditCard, text: "Crypto or card" },
    { icon: RefreshCw, text: "Clear revisions" },
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
          {/* Value Props */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {valueProps.map((prop, index) => (
              <motion.div
                key={prop.text}
                className="flex items-center gap-2 text-hero-foreground/80 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <prop.icon className="w-4 h-4 text-primary" />
                <span>{prop.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-[1.1] tracking-tight text-hero-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            High-converting websites
            <br />
            delivered in <span className="text-primary">5–10 days</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-hero-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed italic"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Pay in crypto. Simple and transparent.
          </motion.p>

          {/* Mini Quote Form */}
          <motion.div 
            className="max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="bg-background rounded-2xl p-6 shadow-elevated">
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-left text-muted-foreground">Website type</label>
                  <Select value={websiteType} onValueChange={setWebsiteType}>
                    <SelectTrigger className="bg-secondary/50 border-border/50">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="landing">Landing page</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="business">Business site</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="webapp">Web app</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-left text-muted-foreground">Budget</label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger className="bg-secondary/50 border-border/50">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter (~$500)</SelectItem>
                      <SelectItem value="business">Business (~$1,200)</SelectItem>
                      <SelectItem value="premium">Premium (~$2,000)</SelectItem>
                      <SelectItem value="unsure">Not sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-left text-muted-foreground">Timeline</label>
                  <Select value={timeline} onValueChange={setTimeline}>
                    <SelectTrigger className="bg-secondary/50 border-border/50">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="1week">1 week</SelectItem>
                      <SelectItem value="2weeks">2 weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-6 bg-foreground text-background hover:bg-foreground/90 font-semibold rounded-full"
              >
                Start my brief
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </motion.div>

          {/* Trust indicators */}
          <motion.p 
            className="text-hero-foreground/50 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            No commitment required • Response within 24h
          </motion.p>
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