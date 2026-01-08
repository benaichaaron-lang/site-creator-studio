import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Globe, ShoppingCart, Briefcase, Code, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectStarterModal from "./ProjectStarterModal";

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

  const handleStartProject = () => {
    setSelectedProject({
      id: activeContent.id,
      title: activeContent.label,
      price: activeContent.price,
      delay: activeContent.delay,
      features: activeContent.bullets,
    });
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217,91%,50%,0.04),transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="font-montserrat text-primary text-xs md:text-sm uppercase tracking-widest">
            {t("demoTabs.badge")}
          </span>
          <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl text-white mt-3 mb-3">
            {t("demoTabs.title")}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto font-heebo text-sm md:text-base">
            {t("demoTabs.subtitle")}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
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
                  onClick={handleStartProject}
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