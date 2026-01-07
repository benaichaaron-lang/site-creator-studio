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
  const [activeStep, setActiveStep] = useState(0);

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

  // Auto-advance demo steps for desktop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="demo" className="py-12 sm:py-16 lg:py-28 bg-background relative overflow-hidden">
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

        {/* Tablet/Desktop: Interactive visual demo */}
        <div className="hidden sm:block max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Animated visual demo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-card rounded-2xl shadow-elevated border border-border/40 p-6 lg:p-8">
                {/* Browser mockup */}
                <div className="bg-muted/30 rounded-xl overflow-hidden">
                  <div className="h-8 bg-muted/50 flex items-center px-3 gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                    <div className="flex-1 mx-8">
                      <div className="h-4 bg-card rounded-full flex items-center px-3">
                        <span className="text-[10px] text-muted-foreground">mysite.com</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Demo content - changes based on activeStep */}
                  <div className="p-4 lg:p-6 h-48 lg:h-56 relative overflow-hidden">
                    {/* Step 1: Form */}
                    <motion.div
                      className="absolute inset-4 lg:inset-6"
                      animate={{ 
                        opacity: activeStep === 0 ? 1 : 0,
                        scale: activeStep === 0 ? 1 : 0.95
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="space-y-3">
                        <div className="h-8 bg-card rounded border border-border flex items-center px-3 text-xs text-muted-foreground">
                          Type de projet
                        </div>
                        <div className="h-8 bg-card rounded border border-border flex items-center px-3 text-xs text-muted-foreground">
                          Budget estimé
                        </div>
                        <div className="h-8 bg-primary rounded flex items-center justify-center text-xs text-white font-medium">
                          Envoyer le brief →
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Step 2: Validation */}
                    <motion.div
                      className="absolute inset-4 lg:inset-6"
                      animate={{ 
                        opacity: activeStep === 1 ? 1 : 0,
                        scale: activeStep === 1 ? 1 : 0.95
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Périmètre validé</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Délai: 7 jours</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Tarif: 0.35 ETH</span>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Step 3: Building */}
                    <motion.div
                      className="absolute inset-4 lg:inset-6"
                      animate={{ 
                        opacity: activeStep === 2 ? 1 : 0,
                        scale: activeStep === 2 ? 1 : 0.95
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="space-y-2">
                        <div className="h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg" />
                        <div className="flex gap-2">
                          <div className="h-8 flex-1 bg-muted/50 rounded" />
                          <div className="h-8 flex-1 bg-muted/50 rounded" />
                        </div>
                        <div className="h-3 bg-muted/50 rounded w-3/4" />
                      </div>
                    </motion.div>
                    
                    {/* Step 4: Delivered */}
                    <motion.div
                      className="absolute inset-4 lg:inset-6 flex flex-col items-center justify-center"
                      animate={{ 
                        opacity: activeStep === 3 ? 1 : 0,
                        scale: activeStep === 3 ? 1 : 0.95
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                        <Check className="w-8 h-8 text-green-600" />
                      </div>
                      <span className="text-lg font-semibold text-green-600">Site livré !</span>
                    </motion.div>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-4 flex gap-2">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        index === activeStep ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Right: Steps list */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setActiveStep(index)}
                  className={`flex gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeStep === index 
                      ? "bg-primary/5 border border-primary/20" 
                      : "hover:bg-muted/30"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    activeStep === index ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <step.icon className={`w-5 h-5 ${activeStep === index ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-primary">Étape {step.id}</span>
                    </div>
                    <h3 className="font-bold text-base mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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
