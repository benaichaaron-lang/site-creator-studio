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
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-28 relative bg-secondary/30">
      <div className="container mx-auto px-4">
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

        {/* Tablet/Desktop: Grid layout */}
        <div className="hidden sm:block max-w-5xl mx-auto relative">
          <div className="absolute top-12 left-0 right-0 hidden lg:block">
            <motion.div 
              className="h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
          
          <div className="grid grid-cols-5 gap-4 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="relative mb-4">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl glass flex items-center justify-center">
                    <step.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">{step.number}</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-sm lg:text-base mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-xs lg:text-sm">{step.description}</p>
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
