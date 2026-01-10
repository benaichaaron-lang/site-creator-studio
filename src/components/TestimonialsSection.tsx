import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useLanguage } from "@/contexts/LanguageContext";

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
];

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Get testimonials from translations
  const testimonials = [0, 1, 2, 3].map((index) => ({
    id: index + 1,
    name: t(`testimonials.list.${index}.name`),
    role: t(`testimonials.list.${index}.role`),
    company: t(`testimonials.list.${index}.company`),
    content: t(`testimonials.list.${index}.content`),
    avatar: avatars[index],
    rating: 5,
  }));

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
    <section id="testimonials" className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(217,91%,50%,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="font-montserrat text-primary text-xs md:text-sm uppercase tracking-widest">
            {t("testimonials.badge")}
          </span>
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white mt-6 mb-6">
            {t("testimonials.title")}
          </h2>
          <p className="text-white/50 font-heebo text-lg">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>

        {/* Mobile: Horizontal swipe */}
        <div className="sm:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_90%] min-w-0 pl-3 first:pl-0">
                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 h-full relative">
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Quote className="w-4 h-4 text-primary" />
                    </div>
                    
                    <div className="flex gap-0.5 mb-4 pt-2">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-white text-base leading-relaxed mb-6 font-heebo">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-white text-sm font-heebo">{testimonial.name}</div>
                        <div className="text-xs text-white/50 font-heebo">{testimonial.role}, {testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center gap-1.5 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? "w-6 bg-primary" : "w-1.5 bg-white/20"}`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden sm:grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="bg-white/[0.02] border border-white/10 hover:border-primary/30 rounded-xl p-6 h-full flex flex-col relative transition-all duration-300">
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Quote className="w-4 h-4 text-primary" />
                </div>

                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-white text-sm leading-relaxed flex-grow mb-5 font-heebo">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" className="w-11 h-11 rounded-full object-cover" />
                  <div className="min-w-0">
                    <div className="font-semibold text-white text-sm truncate font-heebo">{testimonial.name}</div>
                    <div className="text-xs text-white/50 truncate font-heebo">{testimonial.company}</div>
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
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 px-8 py-5 bg-white/[0.02] border border-white/10 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-white/60 font-heebo">4.9/5</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <span className="text-white/60 font-heebo">
              <span className="font-semibold text-white">98%</span> {t("testimonials.satisfaction")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
