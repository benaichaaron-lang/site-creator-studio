import { Button } from "@/components/ui/button";
import { Check, Zap, Building2, Crown, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const packs = [
  {
    name: "Starter",
    icon: Zap,
    price: "0.15 ETH",
    fiat: "~$500",
    delay: "5 days",
    popular: false,
    keyFeatures: [
      "One-page landing",
      "Responsive design",
      "Contact form",
    ],
    moreFeatures: [
      "1 year hosting included",
      "SSL certificate",
      "Basic SEO setup",
    ],
  },
  {
    name: "Business",
    icon: Building2,
    price: "0.35 ETH",
    fiat: "~$1,200",
    delay: "7 days",
    popular: true,
    keyFeatures: [
      "Up to 5 pages",
      "Premium design",
      "Advanced forms",
    ],
    moreFeatures: [
      "1 year hosting included",
      "SSL certificate",
      "Full SEO optimization",
      "Analytics integration",
    ],
  },
  {
    name: "Premium",
    icon: Crown,
    price: "0.6 ETH",
    fiat: "~$2,000",
    delay: "10 days",
    popular: false,
    keyFeatures: [
      "Unlimited pages",
      "Custom design",
      "All integrations",
    ],
    moreFeatures: [
      "2 years hosting included",
      "SSL certificate",
      "Advanced SEO & performance",
      "24/7 priority support (6 months)",
    ],
  },
];

const PackCard = ({ pack, index }: { pack: typeof packs[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChoosePack = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative rounded-xl p-4 sm:p-5 lg:p-6 transition-all duration-300 ${
        pack.popular
          ? "bg-card border-2 border-primary shadow-[0_4px_20px_hsl(217,91%,50%,0.2)] z-10"
          : "bg-card border border-border/60 shadow-card"
      }`}
    >
      {pack.popular && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-primary rounded-full">
          <span className="text-primary-foreground text-xs font-semibold">Popular</span>
        </div>
      )}

      {/* Header: Icon + Name + Delay */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${
          pack.popular ? "bg-primary/20" : "bg-secondary"
        }`}>
          <pack.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${pack.popular ? "text-primary" : "text-foreground"}`} />
        </div>
        <div>
          <h3 className="font-display text-base sm:text-lg font-bold leading-tight">{pack.name}</h3>
          <span className="text-xs text-muted-foreground">{pack.delay}</span>
        </div>
      </div>

      {/* Price - prominent */}
      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className={`font-display text-2xl sm:text-3xl font-extrabold ${pack.popular ? 'text-primary' : 'text-foreground'}`}>
            {pack.price}
          </span>
          <span className="text-muted-foreground text-xs sm:text-sm">{pack.fiat}</span>
        </div>
      </div>

      {/* Key Features - always visible */}
      <ul className="space-y-1.5 mb-3">
        {pack.keyFeatures.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span className="text-foreground text-xs sm:text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Expandable more features */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-primary font-medium mb-3 hover:underline"
      >
        {expanded ? "Hide details" : `+${pack.moreFeatures.length} more features`}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-1.5 mb-3 overflow-hidden"
          >
            {pack.moreFeatures.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
                <span className="text-muted-foreground text-xs">{feature}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* CTA Button */}
      <Button 
        variant={pack.popular ? "hero" : "outline"} 
        className="w-full h-9 sm:h-10 text-sm"
        onClick={handleChoosePack}
      >
        Choose
        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
      </Button>
    </motion.div>
  );
};

const PacksSection = () => {
  return (
    <section id="packs" className="py-12 sm:py-16 lg:py-28 relative bg-background">
      <div className="container mx-auto px-4">
        {/* Header - compact on mobile */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">Pricing</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-4 mb-2 sm:mb-4">
            Transparent pricing
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Fixed prices. No hidden fees.
          </p>
        </motion.div>

        {/* Packs Grid - 3 columns on mobile for compact view */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto">
          {packs.map((pack, index) => (
            <PackCard key={pack.name} pack={pack} index={index} />
          ))}
        </div>

        {/* Pack advice */}
        <motion.p
          className="text-center text-muted-foreground text-xs sm:text-sm mt-6 sm:mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Not sure? Start the brief and we'll guide you.
        </motion.p>
      </div>
    </section>
  );
};

export default PacksSection;
