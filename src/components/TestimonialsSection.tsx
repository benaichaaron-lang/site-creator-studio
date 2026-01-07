import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "Fondatrice",
    company: "Studio Bloom",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content: "Un travail exceptionnel ! Notre nouveau site a boosté notre visibilité et nos demandes ont augmenté de 40% en 2 mois.",
    rating: 5,
  },
  {
    id: 2,
    name: "Thomas Bernard",
    role: "Directeur",
    company: "Tech Solutions",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Processus fluide et résultat au-delà de nos attentes. Le site a été livré en 8 jours. Je recommande vivement.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophie Martin",
    role: "CEO",
    company: "Éco Habitat",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "Très professionnel. Ils ont compris notre vision dès le premier brief. Notre taux de conversion a doublé.",
    rating: 5,
  },
  {
    id: 4,
    name: "Lucas Moreau",
    role: "Co-fondateur",
    company: "FitLife Pro",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "Rapport qualité-prix imbattable. Le site est moderne, rapide et nos clients adorent l'expérience utilisateur.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.04),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
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

        {/* Mobile: Horizontal swipe carousel */}
        <div className="sm:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="flex-[0_0_90%] min-w-0 pl-3 first:pl-0"
                >
                  <div className="bg-card rounded-2xl p-5 shadow-card h-full relative">
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Quote className="w-4 h-4 text-primary" />
                    </div>
                    
                    <div className="flex gap-0.5 mb-3 pt-2">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-foreground text-sm leading-relaxed mb-4">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-3 pt-3 border-t border-border">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        loading="lazy"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Swipe indicators */}
          <div className="flex justify-center gap-1.5 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Tablet/Desktop: Grid */}
        <div className="hidden sm:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="bg-card rounded-xl p-4 lg:p-5 shadow-card h-full flex flex-col relative">
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Quote className="w-4 h-4 text-primary" />
                </div>

                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-foreground text-sm leading-relaxed flex-grow mb-4">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground text-sm truncate">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
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
