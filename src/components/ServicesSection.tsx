import { motion } from "framer-motion";
import { Globe, ShoppingCart, Briefcase, Camera, Code, Sparkles } from "lucide-react";

// Services based on user's website types from translations
const services = [
  {
    icon: Globe,
    title: "Landing Page",
    description: "Page unique optimisée pour convertir vos visiteurs en clients",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Boutique en ligne complète avec paiement sécurisé",
  },
  {
    icon: Briefcase,
    title: "Site Vitrine",
    description: "Présentez votre activité avec élégance et professionnalisme",
  },
  {
    icon: Camera,
    title: "Portfolio",
    description: "Mettez en valeur vos réalisations et votre savoir-faire",
  },
  {
    icon: Code,
    title: "Application Web",
    description: "Solutions techniques sur mesure pour vos besoins complexes",
  },
  {
    icon: Sparkles,
    title: "Sur-mesure",
    description: "Projets personnalisés adaptés à vos exigences spécifiques",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(217,91%,50%,0.05),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="font-montserrat text-primary text-xs md:text-sm uppercase tracking-widest">
            Nos Services
          </span>
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-4">
            Ce que nous créons
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto font-heebo">
            Des solutions web adaptées à chaque besoin, livrées en 5-10 jours.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-primary/50 hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                >
                  <service.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                </motion.div>
                
                <h3 className="font-bebas text-2xl md:text-3xl text-white mb-3">
                  {service.title}
                </h3>
                
                <p className="text-white/50 text-sm md:text-base font-heebo leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
