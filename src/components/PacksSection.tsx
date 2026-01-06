import { Button } from "@/components/ui/button";
import { Check, X, Zap, Building2, Crown } from "lucide-react";
import { motion } from "framer-motion";

const packs = [
  {
    name: "Starter",
    icon: Zap,
    description: "Perfect for getting started quickly with a simple and effective site.",
    price: "0.15 ETH",
    fiat: "~$500",
    delay: "5 days",
    popular: false,
    features: [
      { text: "One-page landing page", included: true },
      { text: "Responsive design", included: true },
      { text: "Contact form", included: true },
      { text: "1 year hosting", included: true },
      { text: "1 revision included", included: true },
      { text: "Multiple pages", included: false },
      { text: "Integrated blog", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Business",
    icon: Building2,
    description: "The complete solution for businesses that want to stand out.",
    price: "0.35 ETH",
    fiat: "~$1,200",
    delay: "7 days",
    popular: true,
    features: [
      { text: "Up to 5 pages", included: true },
      { text: "Premium responsive design", included: true },
      { text: "Advanced forms", included: true },
      { text: "1 year hosting", included: true },
      { text: "3 revisions included", included: true },
      { text: "SEO optimized", included: true },
      { text: "Integrations (analytics, etc.)", included: true },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Premium",
    icon: Crown,
    description: "Excellence for ambitious projects with dedicated support.",
    price: "0.6 ETH",
    fiat: "~$2,000",
    delay: "10 days",
    popular: false,
    features: [
      { text: "Unlimited pages", included: true },
      { text: "Premium custom design", included: true },
      { text: "Advanced features", included: true },
      { text: "2 years hosting", included: true },
      { text: "Unlimited revisions", included: true },
      { text: "Advanced SEO", included: true },
      { text: "All integrations", included: true },
      { text: "24/7 priority support", included: true },
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
  return (
    <section id="packs" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="text-primary text-sm font-semibold uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our Offers
          </motion.span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Choose the pack
            <br />
            <span className="text-gradient">that fits your needs</span>
          </h2>
          <p className="text-muted-foreground">
            Clear and transparent pricing. No surprises, no hidden fees.
          </p>
        </motion.div>

        {/* Packs Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {packs.map((pack, index) => (
            <motion.div
              key={pack.name}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`relative rounded-2xl p-8 transition-all duration-500 ${
                pack.popular
                  ? "bg-gradient-card border-2 border-primary/50 glow-primary"
                  : "glass"
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

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <motion.span 
                    className="font-display text-3xl font-bold text-foreground"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {pack.price}
                  </motion.span>
                  <span className="text-muted-foreground text-sm">{pack.fiat}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pack.features.map((feature, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                  >
                    {feature.included ? (
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                      >
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      </motion.div>
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                    )}
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground/50"}>
                      {feature.text}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a href="#contact">
                  <Button 
                    variant={pack.popular ? "hero" : "outline"} 
                    className="w-full"
                    size="lg"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Choose this pack
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PacksSection;
