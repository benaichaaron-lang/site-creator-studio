import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";
import googleLogo from "@/assets/google-logo.png";
import shopifyLogo from "@/assets/shopify-logo.png";

const ExpertiseSection = () => {
  const { language } = useLanguage();

  const expertises = [
    {
      logo: googleLogo,
      name: "Google Friendly",
      description: language === "fr" 
        ? "Sites optimisés pour le référencement naturel et les performances Google"
        : "Sites optimized for SEO and Google performance",
      features: language === "fr" 
        ? ["SEO optimisé", "Core Web Vitals", "Mobile-first", "Rich Snippets"]
        : ["Optimized SEO", "Core Web Vitals", "Mobile-first", "Rich Snippets"],
      bgColor: "from-blue-500/10 to-green-500/10",
      borderColor: "border-blue-500/20 hover:border-blue-500/40",
    },
    {
      logo: shopifyLogo,
      name: "Shopify",
      description: language === "fr"
        ? "Expertise complète sur la plateforme e-commerce leader mondial"
        : "Complete expertise on the world's leading e-commerce platform",
      features: language === "fr"
        ? ["Thèmes personnalisés", "Apps & intégrations", "Optimisation conversion", "Multi-devises"]
        : ["Custom themes", "Apps & integrations", "Conversion optimization", "Multi-currency"],
      bgColor: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/20 hover:border-green-500/40",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            {language === "fr" ? "Nos Maîtrises" : "Our Expertise"}
          </span>
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {language === "fr" 
              ? "Technologies & Plateformes" 
              : "Technologies & Platforms"}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            {language === "fr"
              ? "Nous maîtrisons les outils et plateformes essentiels pour votre succès digital"
              : "We master the essential tools and platforms for your digital success"}
          </p>
        </motion.div>

        {/* Expertise Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {expertises.map((expertise, index) => (
            <motion.div
              key={expertise.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-3xl bg-gradient-to-br ${expertise.bgColor} backdrop-blur-sm border ${expertise.borderColor} transition-all duration-300 group`}
            >
              {/* Logo */}
              <div className="mb-6">
                <motion.div 
                  className="h-16 flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src={expertise.logo} 
                    alt={expertise.name}
                    className="h-full w-auto object-contain max-w-[200px]"
                  />
                </motion.div>
              </div>

              {/* Content */}
              <h3 className="font-bebas text-2xl text-white mb-3">
                {expertise.name}
              </h3>
              <p className="text-white/60 mb-6">
                {expertise.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                {expertise.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-white/80">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-white/50 text-sm">
            {language === "fr" 
              ? "Et bien plus encore : React, Next.js, WordPress, Webflow..."
              : "And much more: React, Next.js, WordPress, Webflow..."}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
