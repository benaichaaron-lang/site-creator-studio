import { Button } from "@/components/ui/button";
import { Check, Zap, Building2, Crown, ArrowRight, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PacksSection = () => {
  const { t } = useLanguage();
  const [showComparison, setShowComparison] = useState(false);
  
  // EUR prices primary, crypto secondary
  const packs = [
    {
      name: t("packs.starter.name"),
      icon: Zap,
      price: "500€",
      crypto: "~0.15 ETH",
      delay: t("packs.starter.delay"),
      popular: false,
      keyFeatures: [t("packs.starter.features.0"), t("packs.starter.features.1"), t("packs.starter.features.2")],
      moreFeatures: [t("packs.starter.moreFeatures.0"), t("packs.starter.moreFeatures.1"), t("packs.starter.moreFeatures.2")],
    },
    {
      name: t("packs.business.name"),
      icon: Building2,
      price: "1 200€",
      crypto: "~0.35 ETH",
      delay: t("packs.business.delay"),
      popular: true,
      keyFeatures: [t("packs.business.features.0"), t("packs.business.features.1"), t("packs.business.features.2")],
      moreFeatures: [t("packs.business.moreFeatures.0"), t("packs.business.moreFeatures.1"), t("packs.business.moreFeatures.2"), t("packs.business.moreFeatures.3")],
    },
    {
      name: t("packs.premium.name"),
      icon: Crown,
      price: "2 000€",
      crypto: "~0.6 ETH",
      delay: t("packs.premium.delay"),
      popular: false,
      keyFeatures: [t("packs.premium.features.0"), t("packs.premium.features.1"), t("packs.premium.features.2")],
      moreFeatures: [t("packs.premium.moreFeatures.0"), t("packs.premium.moreFeatures.1"), t("packs.premium.moreFeatures.2"), t("packs.premium.moreFeatures.3")],
    },
  ];

  const MobilePackCard = ({ pack }: { pack: typeof packs[0] }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChoosePack = () => {
      // Use pack index to determine the pack key for pre-fill
      const packIndex = packs.findIndex(p => p.name === pack.name);
      const packKeys = ['starter', 'business', 'premium'];
      const budgetValue = packKeys[packIndex] || '';
      
      // Store in sessionStorage for ContactSection to read
      if (budgetValue) {
        sessionStorage.setItem('selectedPack', budgetValue);
      }
      
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <div className={`bg-card rounded-2xl p-5 shadow-card relative h-full flex flex-col ${
        pack.popular ? "border-2 border-primary" : "border border-border/40"
      }`}>
        {pack.popular && (
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-primary rounded-full">
            <span className="text-primary-foreground text-xs font-semibold">{t("packs.popular")}</span>
          </div>
        )}

        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            pack.popular ? "bg-primary/20" : "bg-secondary"
          }`}>
            <pack.icon className={`w-5 h-5 ${pack.popular ? "text-primary" : "text-foreground"}`} />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold">{pack.name}</h3>
            <span className="text-xs text-muted-foreground">{pack.delay}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className={`font-display text-2xl font-extrabold ${pack.popular ? 'text-primary' : 'text-foreground'}`}>
              {pack.price}
            </span>
            <span className="text-muted-foreground text-xs">{pack.crypto}</span>
          </div>
        </div>

        <ul className="space-y-2 mb-3 flex-grow">
          {pack.keyFeatures.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-foreground text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-primary font-medium mb-3"
        >
          {expanded ? t("packs.hide") : `+${pack.moreFeatures.length} ${t("packs.moreFeatures")}`}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-1.5 mb-3 overflow-hidden"
            >
              {pack.moreFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
                  <span className="text-muted-foreground text-xs">{feature}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <Button 
          variant={pack.popular ? "hero" : "outline"} 
          className="w-full h-10 text-sm mt-auto"
          onClick={handleChoosePack}
        >
          {t("packs.choose")}
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    );
  };

  const DesktopPackCard = ({ pack, index }: { pack: typeof packs[0]; index: number }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChoosePack = () => {
      // Use pack index to determine the pack key for pre-fill
      const packIndex = packs.findIndex(p => p.name === pack.name);
      const packKeys = ['starter', 'business', 'premium'];
      const budgetValue = packKeys[packIndex] || '';
      
      // Store in sessionStorage for ContactSection to read
      if (budgetValue) {
        sessionStorage.setItem('selectedPack', budgetValue);
      }
      
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-300 ${
          pack.popular
            ? "bg-card border-2 border-primary shadow-[0_8px_40px_hsl(217,91%,50%,0.2)] lg:scale-105 z-10"
            : "bg-card border border-border/60 shadow-card hover:shadow-elevated"
        }`}
      >
        {pack.popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-primary rounded-full">
            <span className="text-primary-foreground text-sm font-semibold">{t("packs.mostPopular")}</span>
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            pack.popular ? "bg-primary/20" : "bg-secondary"
          }`}>
            <pack.icon className={`w-6 h-6 ${pack.popular ? "text-primary" : "text-foreground"}`} />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold">{pack.name}</h3>
            <span className="text-sm text-muted-foreground">{t("packs.deliveredIn")} {pack.delay}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-3">
            <span className={`font-display text-4xl font-extrabold ${pack.popular ? 'text-primary' : 'text-foreground'}`}>
              {pack.price}
            </span>
            <span className="text-muted-foreground text-xs font-medium">{pack.crypto}</span>
          </div>
        </div>

        {/* Visual preview of what you get */}
        <div className="mb-5 p-3 bg-muted/30 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            {/* Mini device mockups */}
            <div className="flex-1 h-14 bg-card rounded border border-border/60 overflow-hidden">
              <div className="h-2 bg-muted/60 flex items-center px-1 gap-0.5">
                <div className="w-1 h-1 rounded-full bg-red-400/60" />
                <div className="w-1 h-1 rounded-full bg-yellow-400/60" />
                <div className="w-1 h-1 rounded-full bg-green-400/60" />
              </div>
              <div className="p-1.5">
                <div className="h-1 bg-primary/20 rounded w-2/3 mb-1" />
                <div className="h-0.5 bg-muted/60 rounded w-full" />
              </div>
            </div>
            <div className="w-6 h-12 bg-card rounded border border-border/60 overflow-hidden">
              <div className="h-1 bg-muted/60" />
              <div className="p-0.5">
                <div className="h-0.5 bg-primary/20 rounded mb-0.5" />
                <div className="h-0.5 bg-muted/60 rounded" />
              </div>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground text-center">{t("packs.responsiveIncluded")}</p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold mb-3">{t("packs.whatYouGet")}</p>
          <ul className="space-y-2.5">
            {pack.keyFeatures.map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-primary font-medium mb-4"
        >
          {expanded ? t("packs.hideDetails") : `+${pack.moreFeatures.length} ${t("packs.moreFeatures")}`}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 mb-4 overflow-hidden"
            >
              {pack.moreFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary/60 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{feature}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <Button 
          variant={pack.popular ? "hero" : "outline"} 
          className="w-full"
          size="lg"
          onClick={handleChoosePack}
        >
          {t("packs.choosePack")}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    );
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "center",
    containScroll: "trimSnaps",
    startIndex: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(1);

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
    <section id="packs" className="py-16 md:py-24 lg:py-32 relative bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(217,91%,50%,0.05),transparent_50%)]" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">{t("packs.badge")}</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-4 mb-2 sm:mb-4">
            {t("packs.title")}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {t("packs.subtitle")}
          </p>
        </motion.div>

        {/* Mobile: Horizontal swipe carousel */}
        <div className="sm:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {packs.map((pack) => (
                <div 
                  key={pack.name} 
                  className="flex-[0_0_85%] min-w-0 pl-3 first:pl-0"
                >
                  <MobilePackCard pack={pack} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Swipe indicators */}
          <div className="flex justify-center gap-1.5 mt-4">
            {packs.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
          
          <p className="text-center text-muted-foreground text-xs mt-4">
            {t("packs.swipeToCompare")}
          </p>
        </div>

        {/* Tablet/Desktop: Grid */}
        <div className="hidden sm:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {packs.map((pack, index) => (
            <DesktopPackCard key={pack.name} pack={pack} index={index} />
          ))}
        </div>
        {/* Mobile compare button */}
        <div className="sm:hidden text-center mt-6">
          <button
            onClick={() => setShowComparison(true)}
            className="text-primary text-sm font-medium underline underline-offset-4"
          >
            {t("packs.comparePacks")}
          </button>
        </div>

        {/* Comparison Modal */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowComparison(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-card border border-border rounded-2xl p-4 max-w-lg w-full max-h-[80vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bebas text-xl text-white">{t("packs.comparisonTitle")}</h3>
                  <button onClick={() => setShowComparison(false)} className="text-white/50 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="font-bold text-primary">{t("packs.starter.name")}</div>
                  <div className="font-bold text-primary">{t("packs.business.name")}</div>
                  <div className="font-bold text-primary">{t("packs.premium.name")}</div>
                  <div className="text-white/60">~500€</div>
                  <div className="text-white/60">~1 200€</div>
                  <div className="text-white/60">~2 000€</div>
                  <div className="text-white/60">{t("packs.comparison.days5")}</div>
                  <div className="text-white/60">{t("packs.comparison.days7")}</div>
                  <div className="text-white/60">{t("packs.comparison.days10")}</div>
                  <div className="text-white/60">{t("packs.comparison.page1")}</div>
                  <div className="text-white/60">{t("packs.comparison.pages5")}</div>
                  <div className="text-white/60">{t("packs.comparison.unlimited")}</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.p
          className="text-center text-muted-foreground text-xs sm:text-sm mt-6 sm:mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {t("packs.notSure")}
        </motion.p>
      </div>
    </section>
  );
};

export default PacksSection;
