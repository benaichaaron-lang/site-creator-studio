import { MousePointerClick, FileText, Wallet, Truck, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const steps = [
  {
    icon: MousePointerClick,
    number: "01",
    title: "Choose your plan",
    description: "Pack or custom, select the offer that matches your needs.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Fill in the brief",
    description: "A simple questionnaire to understand your project.",
  },
  {
    icon: Wallet,
    number: "03",
    title: "Crypto payment",
    description: "Pay securely with ETH, BTC, USDC, or USDT.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Delivery",
    description: "Receive your website within the announced deadline.",
  },
  {
    icon: RefreshCw,
    number: "05",
    title: "Revisions",
    description: "Request adjustments based on your plan.",
  },
];

const HowItWorksSection = () => {
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
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-28 relative bg-[hsl(35,30%,97%)]">
      {/* Warm subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(35,40%,92%),transparent_50%)]" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">Process</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-4 mb-2 sm:mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Simple process from brief to delivery.
          </p>
        </motion.div>

        {/* Mobile: Horizontal swipe carousel */}
        <div className="sm:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {steps.map((step, index) => (
                <div 
                  key={step.number} 
                  className="flex-[0_0_85%] min-w-0 pl-4 first:pl-0"
                >
                  <div className="bg-card rounded-2xl p-5 shadow-card border border-border/40 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                        <span className="text-primary-foreground text-sm font-bold">{step.number}</span>
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
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

        {/* Tablet/Desktop: Visual cards with mockups */}
        <div className="hidden sm:block max-w-5xl mx-auto">
          <div className="grid grid-cols-5 gap-4 lg:gap-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                {/* Visual mockup card */}
                <div className="bg-card rounded-xl shadow-card border border-border/40 p-4 mb-4 h-32 flex flex-col justify-center group-hover:shadow-elevated group-hover:-translate-y-1 transition-all duration-300">
                  {/* Step 1: Form mockup */}
                  {step.number === "01" && (
                    <div className="space-y-2">
                      <div className="h-6 bg-muted/60 rounded flex items-center px-2">
                        <div className="w-2 h-2 rounded-full bg-primary/40 mr-2" />
                        <span className="text-[10px] text-muted-foreground">Select plan...</span>
                      </div>
                      <div className="h-6 bg-muted/60 rounded flex items-center px-2">
                        <div className="w-2 h-2 rounded-full bg-primary/40 mr-2" />
                        <span className="text-[10px] text-muted-foreground">Your budget</span>
                      </div>
                      <div className="h-6 bg-primary/20 rounded flex items-center justify-center">
                        <span className="text-[10px] text-primary font-medium">Submit →</span>
                      </div>
                    </div>
                  )}
                  {/* Step 2: Brief document mockup */}
                  {step.number === "02" && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="h-2 flex-1 bg-muted/60 rounded" />
                      </div>
                      <div className="h-1.5 bg-muted/40 rounded w-full" />
                      <div className="h-1.5 bg-muted/40 rounded w-3/4" />
                      <div className="h-1.5 bg-muted/40 rounded w-5/6" />
                    </div>
                  )}
                  {/* Step 3: Wallet/crypto mockup */}
                  {step.number === "03" && (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-foreground">0.35</span>
                        <span className="text-[10px] text-muted-foreground">ETH</span>
                      </div>
                    </div>
                  )}
                  {/* Step 4: Delivery mockup */}
                  {step.number === "04" && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-7 bg-muted/60 rounded border border-muted" />
                        <div className="w-5 h-10 bg-muted/60 rounded border border-muted" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-muted-foreground">Ready to launch</span>
                      </div>
                    </div>
                  )}
                  {/* Step 5: Revisions mockup */}
                  {step.number === "05" && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-green-500/20 flex items-center justify-center">
                          <svg className="w-2 h-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-muted-foreground line-through">Initial design</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-green-500/20 flex items-center justify-center">
                          <svg className="w-2 h-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-muted-foreground line-through">Revision 1</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full border border-primary animate-pulse" />
                        <span className="text-[10px] text-foreground font-medium">Final version</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Step info */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-1.5 mb-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-primary-foreground text-[10px] font-bold">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-sm lg:text-base mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-xs">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-foreground font-medium text-sm sm:text-base mb-1">
              Real human team on every project.
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm">
              No templates. Experienced developers only.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
