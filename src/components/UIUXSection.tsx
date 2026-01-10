import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Palette, Layers, MousePointer2, Sparkles, Layout, Wand2, Check, ArrowRight, Zap, type LucideIcon } from "lucide-react";
import { useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";

const WebsiteBuilder3D = lazy(() => import("./WebsiteBuilder3D"));

interface BuildStep {
  icon: LucideIcon;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  gradient: string;
}

// Preset color palettes
const colorPalettes = [
  { name: "Violet Magic", primary: "#8B5CF6", secondary: "#EC4899", accent: "#06B6D4" },
  { name: "Ocean Blue", primary: "#3B82F6", secondary: "#06B6D4", accent: "#10B981" },
  { name: "Sunset Orange", primary: "#F97316", secondary: "#EF4444", accent: "#FBBF24" },
  { name: "Forest Green", primary: "#10B981", secondary: "#059669", accent: "#34D399" },
  { name: "Royal Purple", primary: "#7C3AED", secondary: "#A855F7", accent: "#C084FC" },
  { name: "Rose Gold", primary: "#F43F5E", secondary: "#FB7185", accent: "#FDA4AF" },
  { name: "Midnight", primary: "#1E40AF", secondary: "#3730A3", accent: "#6366F1" },
  { name: "Emerald", primary: "#059669", secondary: "#10B981", accent: "#34D399" },
];

// Style options
const styleOptions = [
  { id: "minimal", name: "Minimal", nameFr: "Minimaliste", description: "Clean & simple", descriptionFr: "Épuré & simple" },
  { id: "modern", name: "Modern", nameFr: "Moderne", description: "Sleek & trendy", descriptionFr: "Élégant & tendance" },
  { id: "bold", name: "Bold", nameFr: "Audacieux", description: "Strong & impactful", descriptionFr: "Fort & percutant" },
];

const UIUXSection = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPalette, setSelectedPalette] = useState(colorPalettes[0]);
  const [selectedStyle, setSelectedStyle] = useState<"minimal" | "modern" | "bold">("modern");
  const [customPrimary, setCustomPrimary] = useState("");
  const [isCustomColor, setIsCustomColor] = useState(false);

  const primaryColor = isCustomColor && customPrimary ? customPrimary : selectedPalette.primary;
  const secondaryColor = selectedPalette.secondary;

  const buildSteps: BuildStep[] = [
    {
      icon: Palette,
      title: "Identité Visuelle",
      titleEn: "Visual Identity",
      description: "Choisissez vos couleurs et votre style",
      descriptionEn: "Choose your colors and style",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Layers,
      title: "Structure & Navigation",
      titleEn: "Structure & Navigation",
      description: "Header, logo et menus",
      descriptionEn: "Header, logo and menus",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: MousePointer2,
      title: "Section Hero",
      titleEn: "Hero Section",
      description: "Titre, CTA et visuels impactants",
      descriptionEn: "Title, CTA and impactful visuals",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Layout,
      title: "Contenu & Fonctionnalités",
      titleEn: "Content & Features",
      description: "Sections de contenu élégantes",
      descriptionEn: "Elegant content sections",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Sparkles,
      title: "Témoignages & Social Proof",
      titleEn: "Testimonials & Social Proof",
      description: "Avis clients et preuves sociales",
      descriptionEn: "Customer reviews and social proof",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Wand2,
      title: "Finalisation",
      titleEn: "Finalization",
      description: "Footer et touches finales",
      descriptionEn: "Footer and final touches",
      gradient: "from-red-500 to-pink-500",
    },
  ];

  const handleFinish = () => {
    // Store preferences in sessionStorage for the brief
    sessionStorage.setItem('sitePreferences', JSON.stringify({
      primaryColor,
      secondaryColor,
      style: selectedStyle,
      paletteName: selectedPalette.name,
    }));
    navigate('/contact');
  };

  const isLastStep = activeStep === buildSteps.length - 1;

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div 
        className="absolute inset-0 opacity-30 transition-colors duration-1000"
        style={{ 
          background: `radial-gradient(ellipse at 50% 0%, ${primaryColor}20 0%, transparent 50%)` 
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
            animate={{ 
              boxShadow: [
                `0 0 20px ${primaryColor}40`,
                `0 0 40px ${primaryColor}60`,
                `0 0 20px ${primaryColor}40`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-4 h-4" />
            {language === "fr" ? "Expérience Interactive" : "Interactive Experience"}
          </motion.span>
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white mb-3">
            {language === "fr" 
              ? "Créez Votre Site en Direct" 
              : "Create Your Site Live"}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            {language === "fr"
              ? "Personnalisez et visualisez votre futur site en temps réel"
              : "Customize and visualize your future site in real time"}
          </p>
        </motion.div>

        {/* Main content - Three columns on large screens */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* Left - Customization Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Color Palette Selector */}
            <div className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10">
              <h3 className="font-bebas text-lg text-white mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-primary" />
                {language === "fr" ? "Palette de Couleurs" : "Color Palette"}
              </h3>
              
              <div className="grid grid-cols-4 gap-2 mb-3">
                {colorPalettes.map((palette) => (
                  <motion.button
                    key={palette.name}
                    onClick={() => { setSelectedPalette(palette); setIsCustomColor(false); }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-full aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedPalette.name === palette.name && !isCustomColor
                        ? "border-white shadow-lg" 
                        : "border-transparent hover:border-white/30"
                    }`}
                    style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})` }}
                    title={palette.name}
                  >
                    {selectedPalette.name === palette.name && !isCustomColor && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/30"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Custom color picker */}
              <div className="flex items-center gap-2">
                <div className="relative flex-grow">
                  <input
                    type="color"
                    value={customPrimary || primaryColor}
                    onChange={(e) => { setCustomPrimary(e.target.value); setIsCustomColor(true); }}
                    className="w-full h-10 rounded-lg cursor-pointer border-2 border-white/10"
                  />
                </div>
                <span className="text-xs text-white/50">
                  {language === "fr" ? "Personnalisé" : "Custom"}
                </span>
              </div>
            </div>

            {/* Style Selector */}
            <div className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10">
              <h3 className="font-bebas text-lg text-white mb-3 flex items-center gap-2">
                <Layout className="w-4 h-4 text-primary" />
                {language === "fr" ? "Style" : "Style"}
              </h3>
              
              <div className="space-y-2">
                {styleOptions.map((style) => (
                  <motion.button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id as "minimal" | "modern" | "bold")}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      selectedStyle === style.id
                        ? "bg-primary/20 border border-primary/40"
                        : "bg-white/5 border border-transparent hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium text-sm ${selectedStyle === style.id ? "text-white" : "text-white/70"}`}>
                          {language === "fr" ? style.nameFr : style.name}
                        </p>
                        <p className="text-xs text-white/40">
                          {language === "fr" ? style.descriptionFr : style.description}
                        </p>
                      </div>
                      {selectedStyle === style.id && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <Check className="w-4 h-4 text-primary" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Current selection preview */}
            <div 
              className="p-4 rounded-2xl border border-white/10 transition-all duration-500"
              style={{ background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)` }}
            >
              <p className="text-xs text-white/50 mb-2">
                {language === "fr" ? "Votre sélection" : "Your selection"}
              </p>
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                />
                <div>
                  <p className="text-sm font-medium text-white">
                    {isCustomColor ? (language === "fr" ? "Couleur personnalisée" : "Custom color") : selectedPalette.name}
                  </p>
                  <p className="text-xs text-white/50">
                    {language === "fr" ? styleOptions.find(s => s.id === selectedStyle)?.nameFr : styleOptions.find(s => s.id === selectedStyle)?.name}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center - 3D Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="relative">
              {/* Glow effect */}
              <div 
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-30 transition-colors duration-1000"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              />
              
              <div className="relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden border border-white/10">
                <Suspense fallback={
                  <div className="w-full h-full bg-card/50 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 rounded-full border-2 border-t-transparent"
                      style={{ borderColor: primaryColor }}
                    />
                  </div>
                }>
                  <WebsiteBuilder3D 
                    activeStep={activeStep} 
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    style={selectedStyle}
                  />
                </Suspense>
              </div>
              
              {/* Progress dots */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {buildSteps.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i <= activeStep ? "w-8" : "w-2 hover:w-4"
                    }`}
                    style={{ 
                      backgroundColor: i <= activeStep ? primaryColor : "rgba(255,255,255,0.2)" 
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              {/* Step indicator */}
              <div className="mt-3 text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-white/60 text-sm"
                  >
                    <span className="text-white font-medium">{language === "fr" ? "Étape" : "Step"} {activeStep + 1}/{buildSteps.length}:</span>{" "}
                    {language === "fr" ? buildSteps[activeStep].title : buildSteps[activeStep].titleEn}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right - Steps Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-2"
          >
            {buildSteps.map((step, index) => (
              <motion.button
                key={step.title}
                onClick={() => setActiveStep(index)}
                className="w-full text-left group relative"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div 
                  className={`relative p-3 rounded-xl border transition-all duration-300 overflow-hidden ${
                    activeStep === index 
                      ? "border-white/30" 
                      : "border-white/5 hover:border-white/15"
                  }`}
                  style={{
                    background: activeStep === index 
                      ? `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}10)` 
                      : "rgba(255,255,255,0.02)"
                  }}
                >
                  <div className="relative flex items-center gap-3">
                    {/* Step indicator */}
                    <div 
                      className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-bebas transition-all ${
                        activeStep > index 
                          ? "text-white" 
                          : activeStep === index
                            ? "text-white"
                            : "text-white/30"
                      }`}
                      style={{
                        background: activeStep >= index 
                          ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` 
                          : "rgba(255,255,255,0.05)"
                      }}
                    >
                      {activeStep > index ? <Check className="w-4 h-4" /> : index + 1}
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <h4 
                        className={`font-medium text-sm transition-colors ${
                          activeStep === index ? "text-white" : "text-white/50"
                        }`}
                      >
                        {language === "fr" ? step.title : step.titleEn}
                      </h4>
                      <p 
                        className={`text-xs truncate transition-colors ${
                          activeStep === index ? "text-white/60" : "text-white/30"
                        }`}
                      >
                        {language === "fr" ? step.description : step.descriptionEn}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}

            {/* Navigation buttons */}
            <div className="pt-3 space-y-2">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="flex-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  ← {language === "fr" ? "Retour" : "Back"}
                </motion.button>
                {!isLastStep && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="flex-1 px-3 py-2.5 rounded-xl text-white text-sm font-medium transition-colors"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  >
                    {language === "fr" ? "Suivant" : "Next"} →
                  </motion.button>
                )}
              </div>

              {/* Final CTA */}
              <AnimatePresence>
                {isLastStep && (
                  <motion.button
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleFinish}
                    className="w-full px-4 py-4 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      boxShadow: `0 10px 40px ${primaryColor}40`
                    }}
                  >
                    <Sparkles className="w-5 h-5" />
                    {language === "fr" ? "Créer Mon Site →" : "Create My Site →"}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Tip card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <p className="text-xs text-white/50 flex items-start gap-2">
                <span className="text-lg">💡</span>
                <span>
                  {language === "fr" 
                    ? "Vous pouvez faire pivoter la vue 3D avec votre souris !" 
                    : "You can rotate the 3D view with your mouse!"}
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UIUXSection;
