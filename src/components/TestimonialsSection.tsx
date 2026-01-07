import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "Fondatrice",
    company: "Studio Bloom",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content: "Un travail exceptionnel ! Notre nouveau site a boosté notre visibilité et nos demandes ont augmenté de 40% en 2 mois. L'équipe est réactive et à l'écoute.",
    rating: 5,
  },
  {
    id: 2,
    name: "Thomas Bernard",
    role: "Directeur",
    company: "Tech Solutions",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Processus fluide et résultat au-delà de nos attentes. Le site a été livré en 8 jours, parfaitement fonctionnel. Je recommande vivement.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophie Martin",
    role: "CEO",
    company: "Éco Habitat",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "Très professionnel. Ils ont compris notre vision dès le premier brief et l'ont traduite parfaitement. Notre taux de conversion a doublé.",
    rating: 5,
  },
  {
    id: 4,
    name: "Lucas Moreau",
    role: "Co-fondateur",
    company: "FitLife Pro",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "Rapport qualité-prix imbattable. Le site est moderne, rapide et nos clients adorent l'expérience utilisateur. Merci à toute l'équipe !",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 lg:py-28 bg-background relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.04),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ce que nos clients disent
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Des entreprises qui nous font confiance pour leur présence en ligne.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-elevated transition-shadow duration-300 h-full flex flex-col relative">
                {/* Quote icon */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Quote className="w-5 h-5 text-primary" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground leading-relaxed flex-grow mb-6">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-background shadow-sm"
                  />
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 lg:mt-16 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 lg:gap-10 px-6 py-4 bg-muted/30 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {testimonials.slice(0, 4).map((t, i) => (
                  <img
                    key={t.id}
                    src={t.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-background object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                +50 clients satisfaits
              </span>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                4.9/5 note moyenne
              </span>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">98%</span> taux de satisfaction
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
