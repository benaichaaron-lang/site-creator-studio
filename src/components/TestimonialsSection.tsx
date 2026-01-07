import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marie D.",
    role: "Fondatrice",
    company: "Studio Bloom",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content: "Nouveau site = +40% de demandes en 2 mois. Équipe réactive !",
    fullContent: "Un travail exceptionnel ! Notre nouveau site a boosté notre visibilité et nos demandes ont augmenté de 40% en 2 mois. L'équipe est réactive et à l'écoute.",
    rating: 5,
  },
  {
    id: 2,
    name: "Thomas B.",
    role: "Directeur",
    company: "Tech Solutions",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Livré en 8 jours, parfaitement fonctionnel. Je recommande !",
    fullContent: "Processus fluide et résultat au-delà de nos attentes. Le site a été livré en 8 jours, parfaitement fonctionnel. Je recommande vivement.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophie M.",
    role: "CEO",
    company: "Éco Habitat",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "Vision comprise dès le brief. Taux de conversion doublé.",
    fullContent: "Très professionnel. Ils ont compris notre vision dès le premier brief et l'ont traduite parfaitement. Notre taux de conversion a doublé.",
    rating: 5,
  },
  {
    id: 4,
    name: "Lucas M.",
    role: "Co-fondateur",
    company: "FitLife Pro",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "Qualité-prix imbattable. Site moderne et rapide.",
    fullContent: "Rapport qualité-prix imbattable. Le site est moderne, rapide et nos clients adorent l'expérience utilisateur. Merci à toute l'équipe !",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.04),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header - compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-10"
        >
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full mb-2 sm:mb-3">
            Témoignages
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Ce que nos clients disent
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            +50 entreprises nous font confiance.
          </p>
        </motion.div>

        {/* Testimonials Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="bg-card rounded-xl p-3 sm:p-4 lg:p-5 shadow-card h-full flex flex-col relative">
                {/* Quote icon - smaller on mobile */}
                <div className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Quote className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content - short on mobile, full on desktop */}
                <p className="text-foreground text-xs sm:text-sm leading-relaxed flex-grow mb-3">
                  <span className="sm:hidden">"{testimonial.content}"</span>
                  <span className="hidden sm:inline">"{testimonial.fullContent}"</span>
                </p>

                {/* Author - compact */}
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    loading="lazy"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground text-xs sm:text-sm truncate">
                      {testimonial.name}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground truncate">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators - more compact */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 sm:mt-10 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 px-4 py-3 bg-muted/30 rounded-xl text-xs sm:text-sm">
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-muted-foreground">4.9/5</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">98%</span> satisfaction
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
