import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Globe, ShoppingCart, Briefcase, Code, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectStarterModal from "./ProjectStarterModal";
import useEmblaCarousel from "embla-carousel-react";

// Premium easing
const premiumEase: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

const DemoTabsSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("landing");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{
    id: string;
    title: string;
    price: string;
    delay: string;
    features?: string[];
  } | null>(null);
  
  // Mobile carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", containScroll: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabIds = ["landing", "ecommerce", "vitrine", "webapp"] as const;
  
  const getTabData = useCallback((id: typeof tabIds[number]) => {
    const tabConfig = {
      landing: {
        icon: Globe,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      },
      ecommerce: {
        icon: ShoppingCart,
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
      },
      vitrine: {
        icon: Briefcase,
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop",
      },
      webapp: {
        icon: Code,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      },
    };
    
    return {
      id,
      label: t(`demoTabs.tabs.${id}.label`),
      icon: tabConfig[id].icon,
      image: tabConfig[id].image,
      bullets: [
        t(`demoTabs.tabs.${id}.bullets.0`) || "",
        t(`demoTabs.tabs.${id}.bullets.1`) || "",
        t(`demoTabs.tabs.${id}.bullets.2`) || "",
      ],
      delay: t(`demoTabs.tabs.${id}.delay`),
      price: t(`demoTabs.tabs.${id}.price`),
    };
  }, [t]);

  const tabs = tabIds.map(getTabData);
  const activeContent = tabs.find((tab) => tab.id === activeTab)!;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    setActiveTab(tabIds[index]);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const handleStartProject = (tab?: typeof tabs[0]) => {
    const content = tab || activeContent;
    setSelectedProject({
      id: content.id,
      title: content.label,
      price: content.price,
      delay: content.delay,
      features: content.bullets,
    });
    setIsModalOpen(true);
  };

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(217,91%,55%,0.015),transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Header - refined */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: premiumEase }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium block mb-5">
            {t("demoTabs.badge")}
          </span>
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-foreground mb-5">
            {t("demoTabs.title")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed hidden md:block">
            {t("demoTabs.subtitle")}
          </p>
        </motion.div>

        {/* MOBILE: Swipeable cards */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <div key={tab.id} className="flex-[0_0_88%] min-w-0 pl-3 first:pl-0 pr-3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: index === selectedIndex ? 1 : 0.5, scale: index === selectedIndex ? 1 : 0.95 }}
                      transition={{ duration: 0.5, ease: premiumEase }}
                      className="bg-card/50 border border-border/30 rounded-2xl overflow-hidden backdrop-blur-sm"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={tab.image}
                          alt={tab.label}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-primary/90 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary-foreground" />
                          </div>
                          <span className="text-foreground font-semibold">{tab.label}</span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-5">
                          <span className="text-primary font-bold text-xl">{tab.price}</span>
                          <span className="text-muted-foreground text-sm">{tab.delay}</span>
                        </div>
                        
                        <ul className="space-y-3 mb-6">
                          {tab.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground text-sm leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Button
                          onClick={() => handleStartProject(tab)}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-13 shadow-lg shadow-primary/20"
                        >
                          {t("demoTabs.cta")}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Mobile navigation - refined */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-card/50 border border-border/40 flex items-center justify-center text-muted-foreground hover:bg-card/70 hover:text-foreground transition-all duration-400"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {tabs.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === selectedIndex ? "w-8 bg-primary" : "w-2 bg-border/60"
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
            
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-card/50 border border-border/40 flex items-center justify-center text-muted-foreground hover:bg-card/70 hover:text-foreground transition-all duration-400"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DESKTOP: Tab buttons + content grid - refined */}
        <div className="hidden md:block">
          {/* Tab navigation */}
          <div className="relative mb-14 lg:mb-20">
            <div className="flex flex-wrap justify-center gap-4">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6, ease: premiumEase }}
                    className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-500 cursor-pointer ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xl shadow-primary/25"
                        : "bg-card/50 text-foreground border border-border/40 hover:border-primary/40 hover:bg-card/70"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-primary rounded-2xl"
                        transition={{ type: "spring", bounce: 0.12, duration: 0.7 }}
                      />
                    )}
                    <motion.div
                      className="relative z-10"
                      animate={isActive ? { rotate: [0, -5, 5, 0] } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-primary"}`} />
                    </motion.div>
                    <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: premiumEase }}
              className="max-w-5xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="relative group order-2 md:order-1">
                  <div className="absolute -inset-6 bg-gradient-to-r from-primary/8 to-primary/4 rounded-3xl blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-600" />
                  <div className="relative rounded-2xl overflow-hidden border border-border/30 bg-card/40">
                    <div className="h-11 bg-card/60 flex items-center px-5 gap-2 border-b border-border/30">
                      <div className="w-3 h-3 rounded-full bg-destructive/40" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/40" />
                      <div className="w-3 h-3 rounded-full bg-success/40" />
                      <div className="flex-1 mx-8">
                        <div className="h-6 bg-background/40 rounded-lg max-w-[200px] flex items-center px-3">
                          <span className="text-[11px] text-muted-foreground">mysite.com</span>
                        </div>
                      </div>
                    </div>
                    <div className="aspect-[16/10]">
                      <img
                        src={activeContent.image}
                        alt={activeContent.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-10 order-1 md:order-2">
                  <div>
                    <h3 className="font-bebas text-4xl md:text-5xl text-foreground mb-5">
                      {activeContent.label}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-bold text-2xl">{activeContent.price}</span>
                      <span className="text-muted-foreground/40">•</span>
                      <span className="text-muted-foreground">{t("demoTabs.deliveredIn")} {activeContent.delay}</span>
                    </div>
                  </div>

                  <ul className="space-y-5">
                    {activeContent.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-muted-foreground text-base leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleStartProject()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-14 px-9 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-400"
                  >
                    {t("demoTabs.cta")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Project Starter Modal */}
      {selectedProject && (
        <ProjectStarterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projectType={selectedProject}
        />
      )}
    </section>
  );
};

export default DemoTabsSection;
