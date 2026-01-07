import { motion } from "framer-motion";
import { FileText, MessageSquare, Paintbrush, Rocket, Check } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const steps = [
  {
    id: 1,
    icon: FileText,
    title: "Soumettez votre brief",
    description: "Décrivez votre projet en quelques minutes.",
  },
  {
    id: 2,
    icon: MessageSquare,
    title: "Nous analysons & validons",
    description: "Nous confirmons le périmètre, délai et tarif.",
  },
  {
    id: 3,
    icon: Paintbrush,
    title: "Design & développement",
    description: "Notre équipe conçoit et développe votre site.",
  },
  {
    id: 4,
    icon: Rocket,
    title: "Livraison",
    description: "Votre site est livré en 5-10 jours, prêt à l'emploi.",
  },
];

const MobileStepCard = ({ step }: { step: typeof steps[0] }) => (
  <div className="bg-card rounded-2xl p-5 shadow-card border border-border/40 h-full">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <step.icon className="w-6 h-6 text-primary" />
      </div>
      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
        <span className="text-primary-foreground text-sm font-bold">{step.id}</span>
      </div>
    </div>
    
    <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.description}</p>
    
    {/* Visual mockup */}
    <div className="bg-muted/30 rounded-xl p-3 space-y-2">
      {step.id === 1 && (
        <>
          <div className="h-7 bg-muted/50 rounded flex items-center px-3 text-xs text-muted-foreground">Type de site</div>
          <div className="h-7 bg-muted/50 rounded flex items-center px-3 text-xs text-muted-foreground">Budget</div>
        </>
      )}
      {step.id === 2 && (
        <>
          <div className="flex items-center gap-2 text-xs">
            <Check className="w-4 h-4 text-success" />
            <span className="text-foreground">Périmètre validé</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Check className="w-4 h-4 text-success" />
            <span className="text-foreground">Tarif confirmé</span>
          </div>
        </>
      )}
      {step.id === 3 && (
        <>
          <div className="h-10 bg-gradient-to-r from-primary/20 to-accent/20 rounded" />
          <div className="flex gap-1.5">
            <div className="h-3 flex-1 bg-muted/50 rounded" />
            <div className="h-3 flex-1 bg-muted/50 rounded" />
          </div>
        </>
      )}
      {step.id === 4 && (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-success" />
          </div>
          <span className="text-sm font-medium text-success">Site livré !</span>
        </div>
      )}
    </div>
  </div>
);

const ServiceDemoSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "center",
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
    <section id="demo" className="py-12 sm:py-16 lg:py-28 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.03),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-12"
        >
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full mb-2 sm:mb-3">
            Notre processus
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Comment ça fonctionne
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Du brief à la livraison en 4 étapes simples.
          </p>
        </motion.div>

        {/* Mobile: Horizontal swipe carousel */}
        <div className="sm:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className="flex-[0_0_85%] min-w-0 pl-3 first:pl-0"
                >
                  <MobileStepCard step={step} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Swipe indicators */}
          <div className="flex justify-center gap-1.5 mt-4">
            {steps.map((_, index) => (
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
        <div className="hidden sm:grid grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-card rounded-2xl shadow-card p-5 mb-4 h-40 flex flex-col justify-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                {step.id === 1 && (
                  <div className="space-y-2">
                    <div className="h-7 bg-muted/50 rounded-lg flex items-center px-3 text-xs text-muted-foreground">Type de site</div>
                    <div className="h-7 bg-muted/50 rounded-lg flex items-center px-3 text-xs text-muted-foreground">Budget</div>
                  </div>
                )}
                {step.id === 2 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs justify-center">
                      <Check className="w-4 h-4 text-success" />
                      <span>Périmètre validé</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs justify-center">
                      <Check className="w-4 h-4 text-success" />
                      <span>Délai & tarif confirmés</span>
                    </div>
                  </div>
                )}
                {step.id === 3 && (
                  <div className="space-y-2">
                    <div className="h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg" />
                    <div className="flex gap-1.5">
                      <div className="h-4 flex-1 bg-muted/50 rounded" />
                      <div className="h-4 flex-1 bg-muted/50 rounded" />
                      <div className="h-4 flex-1 bg-muted/50 rounded" />
                    </div>
                  </div>
                )}
                {step.id === 4 && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-success" />
                    </div>
                    <span className="text-xs font-medium text-success">Site livré !</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xs font-medium text-primary">Étape {step.id}</span>
              </div>
              <h3 className="font-bold text-base mb-1">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 sm:mt-12"
        >
          <motion.a
            href="#hero"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Commencer mon brief
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceDemoSection;
