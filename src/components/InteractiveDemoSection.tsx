import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  ShoppingCart, 
  Palette, 
  Sun, 
  Moon, 
  Sparkles,
  Layers,
  Building2,
  Wand2,
  ArrowRight,
  Check,
  Zap,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectStarterModal from "./ProjectStarterModal";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

type WebsiteType = "business" | "ecommerce" | "portfolio";
type ColorTheme = "dark" | "light" | "accent";
type LayoutStyle = "minimal" | "corporate" | "creative";

interface DemoConfig {
  websiteType: WebsiteType;
  colorTheme: ColorTheme;
  layoutStyle: LayoutStyle;
  animationsEnabled: boolean;
}

// Mobile control step component
const MobileControlStep = ({ 
  title, 
  icon: Icon, 
  children,
  stepNumber,
  totalSteps
}: { 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
  stepNumber: number;
  totalSteps: number;
}) => (
  <div className="flex-[0_0_100%] min-w-0 px-4">
    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-sm flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          {title}
        </h3>
        <span className="text-xs text-white/40">{stepNumber}/{totalSteps}</span>
      </div>
      {children}
    </div>
  </div>
);

const InteractiveDemoSection = () => {
  const { language } = useLanguage();
  const [config, setConfig] = useState<DemoConfig>({
    websiteType: "business",
    colorTheme: "dark",
    layoutStyle: "minimal",
    animationsEnabled: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mobile carousel for controls
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: false });
  const [controlStep, setControlStep] = useState(0);

  const websiteTypes = [
    { id: "business" as WebsiteType, label: "Business", icon: Briefcase },
    { id: "ecommerce" as WebsiteType, label: "E-commerce", icon: ShoppingCart },
    { id: "portfolio" as WebsiteType, label: "Portfolio", icon: Palette },
  ];

  const colorThemes = [
    { id: "dark" as ColorTheme, label: language === 'fr' ? "Sombre" : "Dark", icon: Moon },
    { id: "light" as ColorTheme, label: language === 'fr' ? "Clair" : "Light", icon: Sun },
    { id: "accent" as ColorTheme, label: "Accent", icon: Sparkles },
  ];

  const layoutStyles = [
    { id: "minimal" as LayoutStyle, label: "Minimal", icon: Layers },
    { id: "corporate" as LayoutStyle, label: "Corporate", icon: Building2 },
    { id: "creative" as LayoutStyle, label: language === 'fr' ? "Créatif" : "Creative", icon: Wand2 },
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setControlStep(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const updateConfig = useCallback(<K extends keyof DemoConfig>(key: K, value: DemoConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleStartWithDesign = () => {
    setIsModalOpen(true);
  };

  // Theme-based colors
  const getThemeColors = () => {
    switch (config.colorTheme) {
      case "light":
        return {
          bg: "bg-white",
          card: "bg-gray-50",
          text: "text-gray-900",
          textMuted: "text-gray-600",
          border: "border-gray-200",
          accent: "bg-primary",
          accentText: "text-primary",
          nav: "bg-white/95",
        };
      case "accent":
        return {
          bg: "bg-gradient-to-br from-primary/20 via-background to-primary/10",
          card: "bg-primary/10",
          text: "text-white",
          textMuted: "text-white/70",
          border: "border-primary/30",
          accent: "bg-primary",
          accentText: "text-primary",
          nav: "bg-primary/20",
        };
      default:
        return {
          bg: "bg-background",
          card: "bg-card",
          text: "text-white",
          textMuted: "text-white/60",
          border: "border-border",
          accent: "bg-primary",
          accentText: "text-primary",
          nav: "bg-card/95",
        };
    }
  };

  const theme = getThemeColors();

  const getContent = () => {
    switch (config.websiteType) {
      case "ecommerce":
        return {
          heroTitle: language === 'fr' ? "Nos produits" : "Our Products",
          heroSubtitle: language === 'fr' ? "Qualité premium" : "Premium quality",
          cards: [
            { title: language === 'fr' ? "Montre" : "Watch", price: "€299", tag: language === 'fr' ? "Nouveau" : "New" },
            { title: language === 'fr' ? "Sac" : "Bag", price: "€149", tag: "Best" },
          ],
          cta: language === 'fr' ? "Acheter" : "Shop",
          navItems: [language === 'fr' ? "Boutique" : "Shop", "Cart"],
        };
      case "portfolio":
        return {
          heroTitle: language === 'fr' ? "Créations" : "Creations",
          heroSubtitle: language === 'fr' ? "Designer freelance" : "Freelance Designer",
          cards: [
            { title: "App Mobile", price: "UI/UX", tag: "2024" },
            { title: "Branding", price: "Design", tag: "2024" },
          ],
          cta: language === 'fr' ? "Voir" : "View",
          navItems: [language === 'fr' ? "Travaux" : "Work", "Contact"],
        };
      default:
        return {
          heroTitle: language === 'fr' ? "Solutions" : "Solutions",
          heroSubtitle: language === 'fr' ? "Experts business" : "Business experts",
          cards: [
            { title: "Consulting", price: "Expert", tag: "★ 4.9" },
            { title: "Tech", price: "Dev", tag: language === 'fr' ? "Populaire" : "Popular" },
          ],
          cta: "Contact",
          navItems: ["Services", "Contact"],
        };
    }
  };

  const content = getContent();

  const getLayoutStyles = () => {
    switch (config.layoutStyle) {
      case "corporate":
        return { heroAlign: "text-left", cardShape: "rounded-lg", buttonShape: "rounded-md" };
      case "creative":
        return { heroAlign: "text-center", cardShape: "rounded-2xl", buttonShape: "rounded-full" };
      default:
        return { heroAlign: "text-center", cardShape: "rounded-xl", buttonShape: "rounded-lg" };
    }
  };

  const layout = getLayoutStyles();

  const MobileControlButton = ({ 
    active, 
    onClick, 
    icon: Icon, 
    label 
  }: { 
    active: boolean; 
    onClick: () => void; 
    icon: React.ElementType; 
    label: string;
  }) => (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
        active 
          ? "bg-primary text-white" 
          : "bg-white/5 text-white/70 border border-white/10"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="truncate">{label}</span>
    </motion.button>
  );

  const ControlButton = ({ 
    active, 
    onClick, 
    icon: Icon, 
    label 
  }: { 
    active: boolean; 
    onClick: () => void; 
    icon: React.ElementType; 
    label: string;
  }) => (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
        active 
          ? "bg-primary text-white shadow-lg shadow-primary/30" 
          : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      {active && <Check className="w-3.5 h-3.5 ml-1" />}
    </motion.button>
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(217,91%,50%,0.08),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-10"
        >
          <span className="font-montserrat text-primary text-xs uppercase tracking-widest">
            {language === 'fr' ? "Démo interactive" : "Interactive Demo"}
          </span>
          <h2 className="font-bebas text-2xl md:text-4xl lg:text-5xl text-white mt-2 mb-2">
            {language === 'fr' ? "Construisez en direct" : "Build Live"}
          </h2>
          <p className="text-white/50 max-w-sm mx-auto font-heebo text-sm hidden md:block">
            {language === 'fr' 
              ? "Personnalisez et voyez le résultat instantanément" 
              : "Customize and see the result instantly"}
          </p>
        </motion.div>

        {/* MOBILE: Preview first, then swipeable controls */}
        <div className="lg:hidden space-y-4">
          {/* Live Preview - compact */}
          <div className="bg-card/50 rounded-xl border border-white/10 overflow-hidden">
            <div className="h-8 bg-white/5 flex items-center px-3 gap-1.5 border-b border-white/5">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-2">
                <div className="h-4 bg-white/5 rounded-full max-w-[120px] flex items-center px-2">
                  <span className="text-[9px] text-white/40">yoursite.com</span>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${config.websiteType}-${config.colorTheme}-${config.layoutStyle}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`${theme.bg} min-h-[220px] overflow-hidden`}
              >
                {/* Mini Nav */}
                <div className={`${theme.nav} backdrop-blur-lg px-3 py-2 flex items-center justify-between border-b ${theme.border}`}>
                  <div className={`font-bold ${theme.text} text-sm`}>
                    {config.websiteType === "ecommerce" ? "Shop" : 
                     config.websiteType === "portfolio" ? "Studio" : "Biz"}
                  </div>
                  <div className="flex gap-3">
                    {content.navItems.map((item) => (
                      <span key={item} className={`text-xs ${theme.textMuted}`}>{item}</span>
                    ))}
                  </div>
                </div>

                {/* Mini Hero */}
                <div className={`px-3 py-4 ${layout.heroAlign}`}>
                  <h1 className={`text-lg font-bold ${theme.text} mb-1`}>{content.heroTitle}</h1>
                  <p className={`${theme.textMuted} text-xs mb-3`}>{content.heroSubtitle}</p>
                  <button className={`${theme.accent} text-white px-4 py-1.5 ${layout.buttonShape} text-xs font-medium`}>
                    {content.cta}
                  </button>
                </div>

                {/* Mini Cards */}
                <div className="px-3 pb-3 flex gap-2">
                  {content.cards.map((card) => (
                    <motion.div
                      key={card.title}
                      className={`flex-1 ${theme.card} ${layout.cardShape} p-2 border ${theme.border}`}
                      animate={config.animationsEnabled ? { y: [0, -2, 0] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className={`aspect-square ${config.colorTheme === "light" ? "bg-gray-200" : "bg-white/5"} rounded mb-1`} />
                      <span className={`text-[10px] ${theme.accentText}`}>{card.tag}</span>
                      <p className={`${theme.text} text-xs font-medium truncate`}>{card.title}</p>
                      <p className={`${theme.textMuted} text-[10px]`}>{card.price}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Swipeable Controls */}
          <div className="overflow-hidden -mx-4" ref={emblaRef}>
            <div className="flex">
              <MobileControlStep title={language === 'fr' ? "Type de site" : "Website Type"} icon={Briefcase} stepNumber={1} totalSteps={4}>
                <div className="flex gap-2">
                  {websiteTypes.map(type => (
                    <MobileControlButton
                      key={type.id}
                      active={config.websiteType === type.id}
                      onClick={() => updateConfig("websiteType", type.id)}
                      icon={type.icon}
                      label={type.label}
                    />
                  ))}
                </div>
              </MobileControlStep>

              <MobileControlStep title={language === 'fr' ? "Thème" : "Theme"} icon={Sparkles} stepNumber={2} totalSteps={4}>
                <div className="flex gap-2">
                  {colorThemes.map(themeOption => (
                    <MobileControlButton
                      key={themeOption.id}
                      active={config.colorTheme === themeOption.id}
                      onClick={() => updateConfig("colorTheme", themeOption.id)}
                      icon={themeOption.icon}
                      label={themeOption.label}
                    />
                  ))}
                </div>
              </MobileControlStep>

              <MobileControlStep title="Layout" icon={Layers} stepNumber={3} totalSteps={4}>
                <div className="flex gap-2">
                  {layoutStyles.map(style => (
                    <MobileControlButton
                      key={style.id}
                      active={config.layoutStyle === style.id}
                      onClick={() => updateConfig("layoutStyle", style.id)}
                      icon={style.icon}
                      label={style.label}
                    />
                  ))}
                </div>
              </MobileControlStep>

              <MobileControlStep title="Animations" icon={Zap} stepNumber={4} totalSteps={4}>
                <motion.button
                  onClick={() => updateConfig("animationsEnabled", !config.animationsEnabled)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    config.animationsEnabled ? "bg-primary text-white" : "bg-white/5 text-white/60 border border-white/10"
                  }`}
                >
                  <span className="font-medium">
                    {config.animationsEnabled ? (language === 'fr' ? "Activées" : "Enabled") : (language === 'fr' ? "Désactivées" : "Disabled")}
                  </span>
                  <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${config.animationsEnabled ? "bg-white/20" : "bg-white/10"}`}>
                    <motion.div 
                      className={`w-4 h-4 rounded-full ${config.animationsEnabled ? "bg-white" : "bg-white/40"}`}
                      animate={{ x: config.animationsEnabled ? 20 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
                </motion.button>
              </MobileControlStep>
            </div>
          </div>

          {/* Mobile navigation + CTA */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`h-1 rounded-full transition-all ${i === controlStep ? "w-4 bg-primary" : "w-1 bg-white/20"}`} />
              ))}
            </div>
            
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Sticky CTA */}
          <Button
            onClick={handleStartWithDesign}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl h-12"
          >
            {language === 'fr' ? "Démarrer avec ce design" : "Start with this design"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* DESKTOP: Side by side layout */}
        <div className="hidden lg:grid lg:grid-cols-[320px_1fr] gap-8 max-w-6xl mx-auto">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 lg:sticky lg:top-24 lg:self-start"
          >
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                {language === 'fr' ? "Type de site" : "Website Type"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {websiteTypes.map(type => (
                  <ControlButton
                    key={type.id}
                    active={config.websiteType === type.id}
                    onClick={() => updateConfig("websiteType", type.id)}
                    icon={type.icon}
                    label={type.label}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                {language === 'fr' ? "Thème couleur" : "Color Theme"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {colorThemes.map(themeOption => (
                  <ControlButton
                    key={themeOption.id}
                    active={config.colorTheme === themeOption.id}
                    onClick={() => updateConfig("colorTheme", themeOption.id)}
                    icon={themeOption.icon}
                    label={themeOption.label}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                {language === 'fr' ? "Style de layout" : "Layout Style"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {layoutStyles.map(style => (
                  <ControlButton
                    key={style.id}
                    active={config.layoutStyle === style.id}
                    onClick={() => updateConfig("layoutStyle", style.id)}
                    icon={style.icon}
                    label={style.label}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Animations
              </h3>
              <motion.button
                onClick={() => updateConfig("animationsEnabled", !config.animationsEnabled)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  config.animationsEnabled ? "bg-primary text-white" : "bg-white/5 text-white/60 border border-white/10"
                }`}
              >
                <span className="font-medium">
                  {config.animationsEnabled ? (language === 'fr' ? "Activées" : "Enabled") : (language === 'fr' ? "Désactivées" : "Disabled")}
                </span>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${config.animationsEnabled ? "bg-white/20" : "bg-white/10"}`}>
                  <motion.div 
                    className={`w-4 h-4 rounded-full ${config.animationsEnabled ? "bg-white" : "bg-white/40"}`}
                    animate={{ x: config.animationsEnabled ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </motion.button>
            </div>

            <div className="space-y-3 pt-2">
              <Button
                onClick={handleStartWithDesign}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl h-12"
              >
                {language === 'fr' ? "Démarrer avec ce design" : "Start with this design"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={handleStartWithDesign}
                className="w-full border-white/20 text-white hover:bg-white/5 rounded-xl h-12"
              >
                {language === 'fr' ? "Créer mon site" : "Create my website"}
              </Button>
            </div>
          </motion.div>

          {/* Live Preview Canvas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-card/50 rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/30">
              <div className="h-10 bg-white/5 flex items-center px-4 gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 bg-white/5 rounded-full max-w-[240px] flex items-center px-3 gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500/40" />
                    <span className="text-xs text-white/40">yoursite.com</span>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${config.websiteType}-${config.colorTheme}-${config.layoutStyle}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${theme.bg} min-h-[480px] overflow-hidden`}
                >
                  <motion.nav 
                    className={`${theme.nav} backdrop-blur-lg px-4 py-3 flex items-center justify-between border-b ${theme.border}`}
                    initial={config.animationsEnabled ? { y: -20, opacity: 0 } : {}}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className={`font-bold ${theme.text} text-lg`}>
                      {config.websiteType === "ecommerce" ? "ShopPro" : 
                       config.websiteType === "portfolio" ? "Studio" : "BizTech"}
                    </div>
                    <div className="flex gap-4">
                      {content.navItems.map((item, i) => (
                        <motion.span 
                          key={item}
                          className={`text-sm ${theme.textMuted} cursor-pointer transition-colors`}
                          initial={config.animationsEnabled ? { opacity: 0, y: -10 } : {}}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.nav>

                  <motion.div 
                    className={`px-8 py-12 ${layout.heroAlign} space-y-3`}
                    initial={config.animationsEnabled ? { y: 20, opacity: 0 } : {}}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.h1 
                      className={`text-3xl lg:text-4xl font-bold ${theme.text} mb-2`}
                      initial={config.animationsEnabled ? { scale: 0.9 } : {}}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.25, type: "spring" }}
                    >
                      {content.heroTitle}
                    </motion.h1>
                    <p className={`${theme.textMuted} text-base max-w-md ${layout.heroAlign === "text-center" ? "mx-auto" : ""}`}>
                      {content.heroSubtitle}
                    </p>
                    <motion.button 
                      className={`mt-4 ${theme.accent} text-white px-6 py-2.5 ${layout.buttonShape} font-medium text-sm inline-flex items-center gap-2`}
                      whileHover={config.animationsEnabled ? { scale: 1.05 } : {}}
                      whileTap={config.animationsEnabled ? { scale: 0.95 } : {}}
                    >
                      {content.cta}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>

                  <div className="px-8 pb-8 grid grid-cols-2 gap-4">
                    {content.cards.map((card, i) => (
                      <motion.div
                        key={card.title}
                        className={`${theme.card} ${layout.cardShape} p-4 border ${theme.border}`}
                        initial={config.animationsEnabled ? { y: 30, opacity: 0 } : {}}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        whileHover={config.animationsEnabled ? { y: -4, scale: 1.02 } : {}}
                      >
                        <div className={`aspect-square ${config.colorTheme === "light" ? "bg-gray-200" : "bg-white/5"} rounded-lg mb-3 flex items-center justify-center`}>
                          <motion.div 
                            className={`w-12 h-12 ${theme.accent} rounded-lg opacity-50`}
                            animate={config.animationsEnabled ? { rotate: [0, 5, -5, 0] } : {}}
                            transition={{ duration: 4, repeat: Infinity }}
                          />
                        </div>
                        <span className={`text-xs ${theme.accentText} font-medium`}>{card.tag}</span>
                        <h3 className={`${theme.text} font-semibold text-sm mt-1`}>{card.title}</h3>
                        <p className={`${theme.textMuted} text-xs mt-0.5`}>{card.price}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div 
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-white font-medium flex items-center gap-2 shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Check className="w-3.5 h-3.5" />
              {config.websiteType} • {config.colorTheme} • {config.layoutStyle}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <ProjectStarterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectType={{
          id: config.websiteType,
          title: config.websiteType.charAt(0).toUpperCase() + config.websiteType.slice(1),
          price: language === 'fr' ? "Sur devis" : "Custom quote",
          delay: "7-14 " + (language === 'fr' ? "jours" : "days"),
          features: [
            `${language === 'fr' ? "Thème" : "Theme"}: ${config.colorTheme}`,
            `Layout: ${config.layoutStyle}`,
            `Animations: ${config.animationsEnabled ? (language === 'fr' ? "Oui" : "Yes") : "Non"}`,
          ],
        }}
      />
    </section>
  );
};

export default InteractiveDemoSection;
