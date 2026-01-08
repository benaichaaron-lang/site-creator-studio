import { MousePointerClick, FileText, Wallet, Truck, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const steps = [
  {
    icon: MousePointerClick,
    number: "01",
    title: "Choisissez votre pack",
    description: "Pack ou sur-mesure, sélectionnez l'offre qui correspond à vos besoins.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Remplissez le brief",
    description: "Un questionnaire simple pour bien comprendre votre projet.",
  },
  {
    icon: Wallet,
    number: "03",
    title: "Paiement crypto ou carte",
    description: "Payez en toute sécurité avec ETH, BTC, USDC, ou par carte.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Livraison",
    description: "Recevez votre site dans le délai annoncé.",
  },
  {
    icon: RefreshCw,
    number: "05",
    title: "Révisions",
    description: "Demandez des ajustements selon votre pack.",
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
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-28 relative bg-black">
      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--primary)/0.05),transparent_50%)]" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">Processus</span>
          <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl mt-2 sm:mt-4 mb-2 sm:mb-4 text-white">
            Comment ça marche
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-heebo">
            Un processus simple du brief à la livraison.
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
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{step.number}</span>
                      </div>
                    </div>
                    <h3 className="font-bebas text-xl text-white mb-2">{step.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-heebo">{step.description}</p>
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
                  index === selectedIndex ? "w-6 bg-primary" : "w-1.5 bg-white/30"
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
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 h-32 flex flex-col justify-center group-hover:bg-white/10 group-hover:border-primary/30 group-hover:-translate-y-1 transition-all duration-300">
                  {/* Step 1: Form mockup */}
                  {step.number === "01" && (
                    <div className="space-y-2">
                      <div className="h-6 bg-white/10 rounded flex items-center px-2">
                        <div className="w-2 h-2 rounded-full bg-primary/40 mr-2" />
                        <span className="text-[10px] text-white/40">Choisir le pack...</span>
                      </div>
                      <div className="h-6 bg-white/10 rounded flex items-center px-2">
                        <div className="w-2 h-2 rounded-full bg-primary/40 mr-2" />
                        <span className="text-[10px] text-white/40">Votre budget</span>
                      </div>
                      <div className="h-6 bg-primary/20 rounded flex items-center justify-center">
                        <span className="text-[10px] text-primary font-medium">Envoyer →</span>
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
                        <div className="h-2 flex-1 bg-white/10 rounded" />
                      </div>
                      <div className="h-1.5 bg-white/10 rounded w-full" />
                      <div className="h-1.5 bg-white/10 rounded w-3/4" />
                      <div className="h-1.5 bg-white/10 rounded w-5/6" />
                    </div>
                  )}
                  {/* Step 3: Wallet/crypto mockup */}
                  {step.number === "03" && (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white">0.35</span>
                        <span className="text-[10px] text-white/40">ETH</span>
                      </div>
                    </div>
                  )}
                  {/* Step 4: Delivery mockup */}
                  {step.number === "04" && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-7 bg-white/10 rounded border border-white/10" />
                        <div className="w-5 h-10 bg-white/10 rounded border border-white/10" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-white/40">Prêt à lancer</span>
                      </div>
                    </div>
                  )}
                  {/* Step 5: Revisions mockup */}
                  {step.number === "05" && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-green-500/20 flex items-center justify-center">
                          <svg className="w-2 h-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-white/40 line-through">Design initial</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-green-500/20 flex items-center justify-center">
                          <svg className="w-2 h-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-white/40 line-through">Révision 1</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full border border-primary animate-pulse" />
                        <span className="text-[10px] text-white font-medium">Version finale</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Step info */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-1.5 mb-2">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="font-bebas text-base lg:text-lg text-white mb-1">{step.title}</h3>
                  <p className="text-white/50 text-xs font-heebo">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-white font-medium text-sm sm:text-base mb-1 font-heebo">
              Une vraie équipe sur chaque projet.
            </p>
            <p className="text-white/50 text-xs sm:text-sm font-heebo">
              Pas de templates. Uniquement des développeurs expérimentés.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;