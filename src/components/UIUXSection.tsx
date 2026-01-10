import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Palette, Layers, MousePointer2, Sparkles, Layout, Wand2 } from "lucide-react";

const UIUXSection = () => {
  const { language } = useLanguage();

  const elements = [
    {
      icon: Palette,
      title: language === "fr" ? "Design System" : "Design System",
      description: language === "fr" ? "Couleurs, typographies et composants cohérents" : "Consistent colors, typography and components",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Layers,
      title: language === "fr" ? "Composants UI" : "UI Components",
      description: language === "fr" ? "Bibliothèque de composants réutilisables" : "Reusable component library",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: MousePointer2,
      title: language === "fr" ? "Interactions" : "Interactions",
      description: language === "fr" ? "Micro-animations et transitions fluides" : "Micro-animations and smooth transitions",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Layout,
      title: language === "fr" ? "Layouts Adaptatifs" : "Adaptive Layouts",
      description: language === "fr" ? "Grilles et mises en page responsives" : "Responsive grids and layouts",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Sparkles,
      title: language === "fr" ? "Animations" : "Animations",
      description: language === "fr" ? "Effets visuels et transitions élégantes" : "Visual effects and elegant transitions",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Wand2,
      title: language === "fr" ? "Prototypage" : "Prototyping",
      description: language === "fr" ? "Maquettes interactives haute fidélité" : "High-fidelity interactive mockups",
      gradient: "from-red-500 to-pink-500",
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
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            UI/UX Design
          </span>
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {language === "fr" 
              ? "Design d'Interface Moderne" 
              : "Modern Interface Design"}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            {language === "fr"
              ? "Nous créons des expériences utilisateur exceptionnelles avec les dernières tendances UI/UX"
              : "We create exceptional user experiences with the latest UI/UX trends"}
          </p>
        </motion.div>

        {/* 3D Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {elements.map((element, index) => (
            <motion.div
              key={element.title}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -10, 
                rotateX: 5,
                rotateY: -5,
                transition: { duration: 0.3 }
              }}
              className="group relative"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              <div className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${element.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon with 3D effect */}
                <motion.div 
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${element.gradient} p-3 mb-4 shadow-lg`}
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: "translateZ(20px)"
                  }}
                  whileHover={{ scale: 1.1, rotateZ: 5 }}
                >
                  <element.icon className="w-full h-full text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="font-bebas text-xl text-white mb-2">
                  {element.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {element.description}
                </p>

                {/* Decorative corner */}
                <div className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${element.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Figma-style floating toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 p-2 rounded-2xl bg-card/80 backdrop-blur-xl border border-white/10 shadow-2xl">
            {[Palette, Layers, Layout, MousePointer2, Wand2].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors group"
              >
                <Icon className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" />
              </motion.button>
            ))}
            <div className="w-px h-8 bg-white/10 mx-1" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
            >
              {language === "fr" ? "Démarrer" : "Start"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UIUXSection;
