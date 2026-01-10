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
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectStarterModal from "./ProjectStarterModal";

type WebsiteType = "business" | "ecommerce" | "portfolio";
type ColorTheme = "dark" | "light" | "accent";
type LayoutStyle = "minimal" | "corporate" | "creative";

interface DemoConfig {
  websiteType: WebsiteType;
  colorTheme: ColorTheme;
  layoutStyle: LayoutStyle;
  animationsEnabled: boolean;
}

const InteractiveDemoSection = () => {
  const { t, language } = useLanguage();
  const [config, setConfig] = useState<DemoConfig>({
    websiteType: "business",
    colorTheme: "dark",
    layoutStyle: "minimal",
    animationsEnabled: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const websiteTypes = [
    { id: "business" as WebsiteType, label: language === 'fr' ? "Business" : "Business", icon: Briefcase },
    { id: "ecommerce" as WebsiteType, label: language === 'fr' ? "E-commerce" : "E-commerce", icon: ShoppingCart },
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
      default: // dark
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

  // Content based on website type
  const getContent = () => {
    switch (config.websiteType) {
      case "ecommerce":
        return {
          heroTitle: language === 'fr' ? "Découvrez nos produits" : "Discover Our Products",
          heroSubtitle: language === 'fr' ? "Qualité premium, livraison rapide" : "Premium quality, fast delivery",
          cards: [
            { title: language === 'fr' ? "Montre Elite" : "Elite Watch", price: "€299", tag: language === 'fr' ? "Nouveau" : "New" },
            { title: language === 'fr' ? "Sac Voyage" : "Travel Bag", price: "€149", tag: "Bestseller" },
            { title: language === 'fr' ? "Lunettes Pro" : "Pro Glasses", price: "€89", tag: "-20%" },
          ],
          cta: language === 'fr' ? "Acheter maintenant" : "Shop Now",
          navItems: [language === 'fr' ? "Boutique" : "Shop", language === 'fr' ? "Catégories" : "Categories", language === 'fr' ? "Panier" : "Cart"],
        };
      case "portfolio":
        return {
          heroTitle: language === 'fr' ? "Créations digitales" : "Digital Creations",
          heroSubtitle: language === 'fr' ? "Designer & Développeur freelance" : "Freelance Designer & Developer",
          cards: [
            { title: language === 'fr' ? "Projet App Mobile" : "Mobile App Project", price: "UI/UX", tag: "2024" },
            { title: language === 'fr' ? "Identité de marque" : "Brand Identity", price: "Branding", tag: "2024" },
            { title: language === 'fr' ? "Site E-commerce" : "E-commerce Site", price: "Web", tag: "2023" },
          ],
          cta: language === 'fr' ? "Voir les projets" : "View Projects",
          navItems: [language === 'fr' ? "Travaux" : "Work", language === 'fr' ? "À propos" : "About", "Contact"],
        };
      default: // business
        return {
          heroTitle: language === 'fr' ? "Solutions innovantes" : "Innovative Solutions",
          heroSubtitle: language === 'fr' ? "Transformez votre business avec nos experts" : "Transform your business with our experts",
          cards: [
            { title: language === 'fr' ? "Consulting" : "Consulting", price: language === 'fr' ? "Expert" : "Expert", tag: "★ 4.9" },
            { title: language === 'fr' ? "Développement" : "Development", price: "Tech", tag: language === 'fr' ? "Populaire" : "Popular" },
            { title: language === 'fr' ? "Marketing" : "Marketing", price: language === 'fr' ? "Croissance" : "Growth", tag: language === 'fr' ? "Nouveau" : "New" },
          ],
          cta: language === 'fr' ? "Nous contacter" : "Contact Us",
          navItems: ["Services", language === 'fr' ? "À propos" : "About", "Contact"],
        };
    }
  };

  const content = getContent();

  // Layout-specific styles
  const getLayoutStyles = () => {
    switch (config.layoutStyle) {
      case "corporate":
        return {
          heroAlign: "text-left",
          cardGrid: "grid-cols-3 gap-3",
          cardShape: "rounded-lg",
          buttonShape: "rounded-md",
          spacing: "space-y-3",
        };
      case "creative":
        return {
          heroAlign: "text-center",
          cardGrid: "grid-cols-2 gap-4",
          cardShape: "rounded-2xl rotate-1",
          buttonShape: "rounded-full",
          spacing: "space-y-4",
        };
      default: // minimal
        return {
          heroAlign: "text-center",
          cardGrid: "grid-cols-3 gap-2",
          cardShape: "rounded-xl",
          buttonShape: "rounded-lg",
          spacing: "space-y-2",
        };
    }
  };

  const layout = getLayoutStyles();

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

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background with subtle crypto-inspired effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(217,91%,50%,0.08),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-2xl" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(217 91% 50% / 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(217 91% 50% / 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="font-montserrat text-primary text-xs uppercase tracking-widest">
            {language === 'fr' ? "Démo interactive" : "Interactive Demo"}
          </span>
          <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl text-white mt-3 mb-3">
            {language === 'fr' ? "Construisez votre site en direct" : "Build Your Site Live"}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto font-heebo text-sm md:text-base">
            {language === 'fr' 
              ? "Cliquez, personnalisez et voyez instantanément le résultat" 
              : "Click, customize and see the result instantly"}
          </p>
        </motion.div>

        {/* Main content: Controls + Preview */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 max-w-6xl mx-auto">
          
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 lg:sticky lg:top-24 lg:self-start"
          >
            {/* Website Type */}
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

            {/* Color Theme */}
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

            {/* Layout Style */}
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

            {/* Animations Toggle */}
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
                  config.animationsEnabled 
                    ? "bg-primary text-white" 
                    : "bg-white/5 text-white/60 border border-white/10"
                }`}
              >
                <span className="font-medium">
                  {config.animationsEnabled 
                    ? (language === 'fr' ? "Activées" : "Enabled")
                    : (language === 'fr' ? "Désactivées" : "Disabled")}
                </span>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  config.animationsEnabled ? "bg-white/20" : "bg-white/10"
                }`}>
                  <motion.div 
                    className={`w-4 h-4 rounded-full ${
                      config.animationsEnabled ? "bg-white" : "bg-white/40"
                    }`}
                    animate={{ x: config.animationsEnabled ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </motion.button>
            </div>

            {/* CTA Buttons */}
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
            {/* Browser Chrome */}
            <div className="bg-card/50 rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/30">
              {/* Browser Header */}
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

              {/* Website Preview */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${config.websiteType}-${config.colorTheme}-${config.layoutStyle}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${theme.bg} min-h-[400px] md:min-h-[480px] overflow-hidden`}
                >
                  {/* Navigation */}
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
                          className={`text-sm ${theme.textMuted} hover:${theme.text} cursor-pointer transition-colors hidden sm:block`}
                          initial={config.animationsEnabled ? { opacity: 0, y: -10 } : {}}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.nav>

                  {/* Hero Section */}
                  <motion.div 
                    className={`px-4 md:px-8 py-8 md:py-12 ${layout.heroAlign} ${layout.spacing}`}
                    initial={config.animationsEnabled ? { y: 20, opacity: 0 } : {}}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.h1 
                      className={`text-2xl md:text-3xl lg:text-4xl font-bold ${theme.text} mb-2`}
                      initial={config.animationsEnabled ? { scale: 0.9 } : {}}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.25, type: "spring" }}
                    >
                      {content.heroTitle}
                    </motion.h1>
                    <p className={`${theme.textMuted} text-sm md:text-base max-w-md ${layout.heroAlign === "text-center" ? "mx-auto" : ""}`}>
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

                  {/* Cards Section */}
                  <div className={`px-4 md:px-8 pb-8 grid ${layout.cardGrid}`}>
                    {content.cards.slice(0, config.layoutStyle === "creative" ? 2 : 3).map((card, i) => (
                      <motion.div
                        key={card.title}
                        className={`${theme.card} ${layout.cardShape} p-4 border ${theme.border} relative overflow-hidden group`}
                        initial={config.animationsEnabled ? { y: 30, opacity: 0 } : {}}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        whileHover={config.animationsEnabled ? { y: -4, scale: 1.02 } : {}}
                      >
                        {/* Card image placeholder */}
                        <div className={`aspect-square ${
                          config.colorTheme === "light" ? "bg-gray-200" : "bg-white/5"
                        } rounded-lg mb-3 flex items-center justify-center overflow-hidden`}>
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

            {/* Configuration summary badge */}
            <motion.div 
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-white font-medium flex items-center gap-2 shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Check className="w-3.5 h-3.5" />
              {config.websiteType.charAt(0).toUpperCase() + config.websiteType.slice(1)} • {config.colorTheme} • {config.layoutStyle}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Project Starter Modal */}
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
