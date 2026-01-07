import { Button } from "@/components/ui/button";
import { Check, Zap, Building2, Crown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const packs = [
  {
    name: "Starter",
    icon: Zap,
    description: "Perfect for getting started quickly with a simple and effective site.",
    price: "0.15 ETH",
    fiat: "~$500",
    delay: "5 days",
    revisions: "1 revision",
    popular: false,
    features: [
      "One-page landing page",
      "Responsive design (mobile-first)",
      "Contact form with email notification",
      "1 year hosting included",
      "SSL certificate",
      "Basic SEO setup",
    ],
  },
  {
    name: "Business",
    icon: Building2,
    description: "The complete solution for businesses that want to stand out.",
    price: "0.35 ETH",
    fiat: "~$1,200",
    delay: "7 days",
    revisions: "3 revisions",
    popular: true,
    features: [
      "Up to 5 pages",
      "Premium responsive design",
      "Advanced forms & integrations",
      "1 year hosting included",
      "SSL certificate",
      "Full SEO optimization",
      "Analytics integration",
    ],
  },
  {
    name: "Premium",
    icon: Crown,
    description: "Excellence for ambitious projects with dedicated support.",
    price: "0.6 ETH",
    fiat: "~$2,000",
    delay: "10 days",
    revisions: "Unlimited revisions",
    popular: false,
    features: [
      "Unlimited pages",
      "Premium custom design",
      "Advanced features & animations",
      "2 years hosting included",
      "SSL certificate",
      "Advanced SEO & performance",
      "All integrations included",
      "24/7 priority support (6 months)",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
} as const;

const PacksSection = () => {
  const handleChoosePack = (packName: string) => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="packs" className="py-16 lg:py-28 relative bg-background">
      <div className="container mx-auto px-4">
        {/* Header - cleaner */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Pricing</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-5">
            Transparent pricing
          </h2>
          <p className="text-muted-foreground">
            Fixed prices. No hidden fees. Choose the pack that fits your project.
          </p>
        </motion.div>

        {/* Packs Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {packs.map((pack) => (
            <motion.div
              key={pack.name}
              variants={cardVariants}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.3 }
              }}
              className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-500 ${
                pack.popular
                  ? "bg-card border-2 border-primary shadow-[0_8px_40px_hsl(217,91%,50%,0.25)] lg:scale-105 z-10"
                  : "bg-card border border-border/60 shadow-card hover:shadow-elevated"
              }`}
            >
              {pack.popular && (
                <motion.div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-primary rounded-full"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <span className="text-primary-foreground text-sm font-semibold">Most Popular</span>
                </motion.div>
              )}

              {/* Icon & Name */}
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    pack.popular ? "bg-primary/20" : "bg-secondary"
                  }`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <pack.icon className={`w-6 h-6 ${pack.popular ? "text-primary" : "text-foreground"}`} />
                </motion.div>
                <div>
                  <h3 className="font-display text-xl font-bold">{pack.name}</h3>
                  <span className="text-sm text-muted-foreground">Delivered in {pack.delay}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">{pack.description}</p>

              {/* Price - visually dominant */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <motion.span 
                    className={`font-display text-4xl font-extrabold ${pack.popular ? 'text-primary' : 'text-foreground'}`}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {pack.price}
                  </motion.span>
                  <span className="text-muted-foreground text-sm font-medium">{pack.fiat}</span>
                </div>
                <p className="text-primary text-sm mt-2 font-medium">{pack.revisions}</p>
              </div>

              {/* What you get */}
              <div className="mb-8">
                <p className="text-sm font-semibold mb-3">What you get:</p>
                <ul className="space-y-3">
                  {pack.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      </motion.div>
                      <span className="text-foreground text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Next Steps Preview */}
              <div className="mb-4 p-3 bg-secondary/30 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Next steps:</span> Brief → Payment → Delivery
                </p>
              </div>

              {/* No payment reassurance */}
              <p className="text-xs text-primary mb-4 text-center">
                No payment required before project validation.
              </p>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant={pack.popular ? "hero" : "outline"} 
                  className="w-full"
                  size="lg"
                  onClick={() => handleChoosePack(pack.name)}
                >
                  Choose this pack
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pack advice - reassuring */}
        <motion.p
          className="text-center text-muted-foreground text-sm mt-12 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Not sure which pack fits? Start the brief and we'll guide you.
        </motion.p>
      </div>
    </section>
  );
};

export default PacksSection;