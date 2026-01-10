import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Globe, ShoppingCart, Briefcase, Code, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectStarterModal from "./ProjectStarterModal";
import useEmblaCarousel from "embla-carousel-react";

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

  const tabs = [
    {
      id: "landing",
      label: t("demoTabs.tabs.landing.label"),
      icon: Globe,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      bullets: [
        t("demoTabs.tabs.landing.bullets.0") || "Modern responsive design",
        t("demoTabs.tabs.landing.bullets.1") || "Optimized for conversion",
        t("demoTabs.tabs.landing.bullets.2") || "Integrated contact forms",
      ],
      delay: t("demoTabs.tabs.landing.delay"),
      price: t("demoTabs.tabs.landing.price"),
    },
    {
      id: "ecommerce",
      label: t("demoTabs.tabs.ecommerce.label"),
      icon: ShoppingCart,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
      bullets: [
        t("demoTabs.tabs.ecommerce.bullets.0") || "Complete product catalog",
        t("demoTabs.tabs.ecommerce.bullets.1") || "Secure payment integrated",
        t("demoTabs.tabs.ecommerce.bullets.2") || "Automated stock management",
      ],
      delay: t("demoTabs.tabs.ecommerce.delay"),
      price: t("demoTabs.tabs.ecommerce.price"),
    },
    {
      id: "vitrine",
      label: t("demoTabs.tabs.vitrine.label"),
      icon: Briefcase,
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop",
      bullets: [
        t("demoTabs.tabs.vitrine.bullets.0") || "Professional presentation",
        t("demoTabs.tabs.vitrine.bullets.1") || "Up to 5 custom pages",
        t("demoTabs.tabs.vitrine.bullets.2") || "SEO optimized from start",
      ],
      delay: t("demoTabs.tabs.vitrine.delay"),
      price: t("demoTabs.tabs.vitrine.price"),
    },
    {
      id: "webapp",
      label: t("demoTabs.tabs.webapp.label"),
      icon: Code,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      bullets: [
        t("demoTabs.tabs.webapp.bullets.0") || "Custom architecture",
        t("demoTabs.tabs.webapp.bullets.1") || "Advanced features",
        t("demoTabs.tabs.webapp.bullets.2") || "Scalable and maintainable",
      ],
      delay: t("demoTabs.tabs.webapp.delay"),
      price: t("demoTabs.tabs.webapp.price"),
    },
  ];

  const activeContent = tabs.find((tab) => tab.id === activeTab)!;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    setActiveTab(tabs[index].id);
  }, [emblaApi, tabs]);

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
    <section className="py-12 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217,91%,50%,0.04),transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - compact on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-14"
        >
          <span className="font-montserrat text-primary text-xs uppercase tracking-widest">
            {t("demoTabs.badge")}
          </span>
          <h2 className="font-bebas text-2xl md:text-4xl lg:text-5xl text-white mt-2 mb-2">
            {t("demoTabs.title")}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto font-heebo text-sm hidden md:block">
            {t("demoTabs.subtitle")}
          </p>
        </motion.div>

        {/* MOBILE: Swipeable cards - one card per screen */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <div key={tab.id} className="flex-[0_0_85%] min-w-0 pl-3 first:pl-0 pr-3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: index === selectedIndex ? 1 : 0.6, scale: index === selectedIndex ? 1 : 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden"
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={tab.image}
                          alt={tab.label}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-primary/90 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-white font-semibold">{tab.label}</span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-primary font-bold text-xl">{tab.price}</span>
                          <span className="text-white/50 text-sm">{tab.delay}</span>
                        </div>
                        
                        <ul className="space-y-2 mb-4">
                          {tab.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-white/70 text-sm font-heebo">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Button
                          onClick={() => handleStartProject(tab)}
                          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl h-11"
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
          
          {/* Mobile navigation */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-1.5">
              {tabs.map((_, index) => (
                <button
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? "w-6 bg-primary" : "w-1.5 bg-white/20"
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
            
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DESKTOP: Tab buttons + content grid */}
        <div className="hidden md:block">
          {/* Tab navigation */}
          <div className="relative mb-8 md:mb-12">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className={`group relative flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-primary text-white shadow-xl shadow-primary/40 ring-2 ring-primary/50"
                        : "bg-white/10 text-white border-2 border-white/20 hover:border-primary/60 hover:bg-primary/10 hover:text-white"
                    }`}
                  >
                    {!isActive && (
                      <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/5 transition-all duration-300" />
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-xl"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <motion.div
                      className="relative z-10"
                      animate={isActive ? { rotate: [0, -10, 10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-primary group-hover:text-primary"}`} />
                    </motion.div>
                    <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                    {!isActive && (
                      <motion.span 
                        className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        →
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative group order-2 md:order-1">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/15 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black">
                    <div className="h-8 bg-white/5 flex items-center px-3 gap-1.5 border-b border-white/5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                      <div className="flex-1 mx-4">
                        <div className="h-4 bg-white/5 rounded-full max-w-[180px] flex items-center px-2">
                          <span className="text-[10px] text-white/30">mysite.com</span>
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

                <div className="space-y-6 order-1 md:order-2">
                  <div>
                    <h3 className="font-bebas text-3xl md:text-4xl text-white mb-3">
                      {activeContent.label}
                    </h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-primary font-bold text-lg">{activeContent.price}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-white/60">{t("demoTabs.deliveredIn")} {activeContent.delay}</span>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {activeContent.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-white/80 font-heebo text-base">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleStartProject()}
                    className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl h-12 px-6"
                  >
                    {t("demoTabs.cta")}
                    <ArrowRight className="w-4 h-4 ml-2" />
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
