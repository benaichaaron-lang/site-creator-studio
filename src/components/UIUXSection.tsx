import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Palette, Layers, MousePointer2, Sparkles, Layout, Wand2, type LucideIcon } from "lucide-react";
import { useState, Suspense, lazy } from "react";

const WebsiteBuilder3D = lazy(() => import("./WebsiteBuilder3D"));

interface BuildStep {
  icon: LucideIcon;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  gradient: string;
  stepIndex: number;
}

const UIUXSection = () => {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const buildSteps: BuildStep[] = [
    {
      icon: Palette,
      title: "Design System",
      titleEn: "Design System",
      description: "Définissez votre identité visuelle : couleurs, typographies et composants de base",
      descriptionEn: "Define your visual identity: colors, typography and base components",
      gradient: "from-pink-500 to-rose-500",
      stepIndex: 0,
    },
    {
      icon: Layers,
      title: "Structure & Header",
      titleEn: "Structure & Header",
      description: "Construisez la navigation et l'en-tête de votre site avec logo et menus",
      descriptionEn: "Build navigation and header with logo and menus",
      gradient: "from-purple-500 to-indigo-500",
      stepIndex: 1,
    },
    {
      icon: MousePointer2,
      title: "Section Hero",
      titleEn: "Hero Section",
      description: "Créez une section d'accueil impactante avec titre, CTA et visuels",
      descriptionEn: "Create an impactful hero section with title, CTA and visuals",
      gradient: "from-blue-500 to-cyan-500",
      stepIndex: 2,
    },
    {
      icon: Layout,
      title: "Contenu & Cards",
      titleEn: "Content & Cards",
      description: "Ajoutez vos sections de contenu avec des cartes élégantes",
      descriptionEn: "Add your content sections with elegant cards",
      gradient: "from-emerald-500 to-teal-500",
      stepIndex: 3,
    },
    {
      icon: Sparkles,
      title: "Animations",
      titleEn: "Animations",
      description: "Ajoutez des micro-animations et transitions fluides",
      descriptionEn: "Add micro-animations and smooth transitions",
      gradient: "from-amber-500 to-orange-500",
      stepIndex: 4,
    },
    {
      icon: Wand2,
      title: "Finalisation",
      titleEn: "Finalization",
      description: "Footer, optimisations et touches finales pour un site parfait",
      descriptionEn: "Footer, optimizations and final touches for a perfect site",
      gradient: "from-red-500 to-pink-500",
      stepIndex: 5,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Floating 3D shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotateZ: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm border border-white/10 shadow-2xl"
          style={{ transform: "perspective(1000px) rotateX(20deg) rotateY(-20deg)" }}
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotateZ: [0, -5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-[15%] w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 backdrop-blur-sm border border-white/10 shadow-2xl"
          style={{ transform: "perspective(1000px) rotateX(-15deg) rotateY(25deg)" }}
        />
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            rotateZ: [0, 10, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-32 left-[20%] w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-500/25 to-blue-500/10 backdrop-blur-sm border border-white/10 shadow-2xl"
          style={{ transform: "perspective(1000px) rotateX(25deg) rotateY(15deg)" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            UI/UX Design
          </span>
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {language === "fr" 
              ? "Construisez Votre Site en 3D" 
              : "Build Your Website in 3D"}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            {language === "fr"
              ? "Cliquez sur chaque étape pour voir votre site se construire sous vos yeux"
              : "Click on each step to see your website being built before your eyes"}
          </p>
        </motion.div>

        {/* Main content - Two columns */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left - 3D Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <Suspense fallback={
              <div className="w-full h-[400px] md:h-[500px] rounded-2xl bg-card/50 border border-white/10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent"
                  />
                  <p className="text-white/60">
                    {language === "fr" ? "Chargement de la vue 3D..." : "Loading 3D view..."}
                  </p>
                </div>
              </div>
            }>
              <WebsiteBuilder3D activeStep={activeStep} />
            </Suspense>
            
            {/* Progress indicator */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {buildSteps.map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i <= activeStep ? "bg-primary w-8" : "bg-white/20 w-2"
                  }`}
                  animate={{ scale: i === activeStep ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right - Steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-3"
          >
            {buildSteps.map((step, index) => (
              <motion.button
                key={step.title}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left group relative`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div 
                  className={`relative p-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                    activeStep === index 
                      ? "bg-primary/10 border-primary/40" 
                      : "bg-card/30 border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Gradient overlay when active */}
                  <AnimatePresence>
                    {activeStep === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-5`}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative flex items-center gap-4">
                    {/* Step number */}
                    <div 
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bebas text-lg transition-all ${
                        activeStep >= index 
                          ? `bg-gradient-to-br ${step.gradient} text-white` 
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {activeStep > index ? "✓" : index + 1}
                    </div>

                    {/* Icon */}
                    <div 
                      className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        activeStep === index 
                          ? `bg-gradient-to-br ${step.gradient} shadow-lg` 
                          : "bg-white/5"
                      }`}
                    >
                      <step.icon 
                        className={`w-6 h-6 transition-colors ${
                          activeStep === index ? "text-white" : "text-white/40"
                        }`} 
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <h3 
                        className={`font-bebas text-lg transition-colors ${
                          activeStep === index ? "text-white" : "text-white/60"
                        }`}
                      >
                        {language === "fr" ? step.title : step.titleEn}
                      </h3>
                      <p 
                        className={`text-sm truncate transition-colors ${
                          activeStep === index ? "text-white/70" : "text-white/40"
                        }`}
                      >
                        {language === "fr" ? step.description : step.descriptionEn}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      animate={{ x: activeStep === index ? [0, 5, 0] : 0 }}
                      transition={{ duration: 1, repeat: activeStep === index ? Infinity : 0 }}
                      className={`flex-shrink-0 transition-opacity ${
                        activeStep === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            ))}

            {/* Action buttons */}
            <div className="pt-4 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              >
                {language === "fr" ? "← Précédent" : "← Previous"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStep(Math.min(buildSteps.length - 1, activeStep + 1))}
                disabled={activeStep === buildSteps.length - 1}
                className="flex-1 px-4 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {language === "fr" ? "Suivant →" : "Next →"}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 mb-4">
            {language === "fr" 
              ? "Prêt à construire votre site de la même manière ?" 
              : "Ready to build your site the same way?"}
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
          >
            {language === "fr" ? "Démarrer Mon Projet" : "Start My Project"}
            <Sparkles className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default UIUXSection;
