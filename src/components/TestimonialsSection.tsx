import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ExternalLink } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Generate a deterministic gradient color from a name
const getAvatarColors = (name: string) => {
  const colors = [
    { from: "#6366f1", to: "#8b5cf6" }, // indigo → violet
    { from: "#0ea5e9", to: "#6366f1" }, // sky → indigo
    { from: "#10b981", to: "#0ea5e9" }, // emerald → sky
    { from: "#f59e0b", to: "#ef4444" }, // amber → red
    { from: "#ec4899", to: "#8b5cf6" }, // pink → violet
    { from: "#14b8a6", to: "#6366f1" }, // teal → indigo
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const AvatarInitials = ({ name, size = "md" }: { name: string; size?: "sm" | "md" }) => {
  const colors = getAvatarColors(name);
  const initials = getInitials(name);
  const sizeClass = size === "sm" ? "w-11 h-11 text-sm" : "w-12 h-12 text-base";
  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
    >
      {initials}
    </div>
  );
};

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const testimonials = [0, 1, 2, 3, 4, 5].map((index) => ({
    id: index + 1,
    name: t(`testimonials.list.${index}.name`),
    role: t(`testimonials.list.${index}.role`),
    company: t(`testimonials.list.${index}.company`),
    content: t(`testimonials.list.${index}.content`),
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
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(217,91%,50%,0.06),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(270,80%,60%,0.04),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">
              {t("testimonials.badge")}
            </span>
          </div>
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white mt-2 mb-4 tracking-tight">
            {t("testimonials.title")}
          </h2>
          <p className="text-white/50 font-heebo text-base md:text-lg max-w-md mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>

        {/* Mobile: Horizontal swipe */}
        <div className="sm:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_88%] min-w-0">
                  <div className="bg-white/[0.03] border border-white/[0.08] hover:border-primary/20 rounded-2xl p-6 h-full relative transition-all duration-300">
                    <div className="absolute -top-2.5 -left-2.5 w-9 h-9 bg-primary/15 rounded-xl flex items-center justify-center border border-primary/20">
                      <Quote className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex gap-0.5 mb-4 pt-2">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed mb-6 font-heebo italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                      <AvatarInitials name={testimonial.name} />
                      <div>
                        <div className="font-semibold text-white text-sm font-heebo">{testimonial.name}</div>
                        <div className="text-xs text-white/40 font-heebo">{testimonial.role}, {testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

        {/* Desktop: Masonry-style Grid */}
        <div className="hidden sm:grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -4 }}
            >
              <div className="group bg-white/[0.02] border border-white/[0.07] hover:border-primary/25 hover:bg-white/[0.04] rounded-2xl p-6 h-full flex flex-col relative transition-all duration-400 cursor-default">
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
                
                <div className="absolute -top-2.5 -left-2.5 w-9 h-9 bg-primary/15 rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/25 transition-colors duration-300">
                  <Quote className="w-4 h-4 text-primary" />
                </div>

                <div className="flex gap-0.5 mb-4 relative z-10">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-white/75 text-sm leading-relaxed flex-grow mb-5 font-heebo italic relative z-10 group-hover:text-white/90 transition-colors duration-300">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.07] relative z-10">
                  <AvatarInitials name={testimonial.name} size="sm" />
                  <div className="min-w-0">
                    <div className="font-semibold text-white text-sm truncate font-heebo">{testimonial.name}</div>
                    <div className="text-xs text-white/40 truncate font-heebo">{testimonial.role} · {testimonial.company}</div>
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
          <div className="inline-flex flex-wrap items-center justify-center gap-6 px-8 py-5 bg-white/[0.02] border border-white/[0.08] rounded-2xl">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-white font-bold font-heebo">4.9</span>
              <span className="text-white/40 font-heebo text-sm">/ 5</span>
            </div>
            <div className="h-5 w-px bg-white/15" />
            <span className="text-white/60 font-heebo text-sm">
              <span className="font-semibold text-white">98%</span> {t("testimonials.satisfaction")}
            </span>
            <div className="h-5 w-px bg-white/15 hidden sm:block" />
            <a
              href="https://trustpilot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors duration-300 text-sm font-heebo"
            >
              Voir sur Trustpilot
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
