import { Button } from "@/components/ui/button";
import { Check, X, Zap, Building2, Crown } from "lucide-react";
import { motion } from "framer-motion";

const packs = [
  {
    name: "Starter",
    icon: Zap,
    description: "Parfait pour démarrer rapidement avec un site simple et efficace.",
    price: "0.15 ETH",
    fiat: "~500€",
    delay: "5 jours",
    popular: false,
    features: [
      { text: "Landing page one-page", included: true },
      { text: "Design responsive", included: true },
      { text: "Formulaire de contact", included: true },
      { text: "Hébergement 1 an", included: true },
      { text: "1 révision incluse", included: true },
      { text: "Pages multiples", included: false },
      { text: "Blog intégré", included: false },
      { text: "Support prioritaire", included: false },
    ],
  },
  {
    name: "Business",
    icon: Building2,
    description: "La solution complète pour les entreprises qui veulent se démarquer.",
    price: "0.35 ETH",
    fiat: "~1200€",
    delay: "7 jours",
    popular: true,
    features: [
      { text: "Jusqu'à 5 pages", included: true },
      { text: "Design responsive premium", included: true },
      { text: "Formulaires avancés", included: true },
      { text: "Hébergement 1 an", included: true },
      { text: "3 révisions incluses", included: true },
      { text: "SEO optimisé", included: true },
      { text: "Intégrations (analytics, etc.)", included: true },
      { text: "Support prioritaire", included: false },
    ],
  },
  {
    name: "Premium",
    icon: Crown,
    description: "L'excellence pour les projets ambitieux avec un support dédié.",
    price: "0.6 ETH",
    fiat: "~2000€",
    delay: "10 jours",
    popular: false,
    features: [
      { text: "Pages illimitées", included: true },
      { text: "Design sur-mesure premium", included: true },
      { text: "Fonctionnalités avancées", included: true },
      { text: "Hébergement 2 ans", included: true },
      { text: "Révisions illimitées", included: true },
      { text: "SEO avancé", included: true },
      { text: "Toutes intégrations", included: true },
      { text: "Support prioritaire 24/7", included: true },
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
            Nos offres
          </motion.span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Choisissez le pack
            <br />
            <span className="text-gradient">adapté à vos besoins</span>
          </h2>
          <p className="text-muted-foreground">
            Des formules claires et transparentes. Pas de surprise, pas de frais cachés.
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
                  <span className="text-primary-foreground text-sm font-semibold">Le plus populaire</span>
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
                  <span className="text-sm text-muted-foreground">Livré en {pack.delay}</span>
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

              {/* CTA */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant={pack.popular ? "hero" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  Choisir ce pack
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PacksSection;
