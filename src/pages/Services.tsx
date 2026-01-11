import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Code2, 
  Palette, 
  Layers, 
  Globe, 
  Zap, 
  Wrench,
  LayoutDashboard,
  Smartphone,
  ShoppingCart,
  FileCode,
  Wallet,
  BarChart3,
  Settings,
  Headphones,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectStarterModal from "@/components/ProjectStarterModal";
import CryptoBadge, { BitcoinIcon, EthereumIcon, USDCIcon } from "@/components/CryptoBadge";

// Service categories with their services
const serviceCategories = [
  {
    id: "development",
    icon: Code2,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    services: ["landing", "vitrine", "webapp", "saas"]
  },
  {
    id: "design",
    icon: Palette,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    services: ["uiux", "dashboard", "designSystem"]
  },
  {
    id: "branding",
    icon: Layers,
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
    services: ["logo", "identity", "social"]
  },
  {
    id: "web3",
    icon: Wallet,
    gradient: "from-[#F7931A]/20 to-[#627EEA]/20",
    iconColor: "text-[#F7931A]",
    services: ["cryptoPayments", "walletIntegration", "web3Dashboard"]
  },
  {
    id: "performance",
    icon: BarChart3,
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
    services: ["seo", "analytics", "optimization"]
  },
  {
    id: "maintenance",
    icon: Settings,
    gradient: "from-slate-500/20 to-gray-500/20",
    iconColor: "text-slate-400",
    services: ["support", "hosting", "updates"]
  }
];

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  landing: Zap,
  vitrine: Globe,
  webapp: Code2,
  saas: LayoutDashboard,
  uiux: Palette,
  dashboard: LayoutDashboard,
  designSystem: Layers,
  logo: Layers,
  identity: Palette,
  social: Smartphone,
  cryptoPayments: Wallet,
  walletIntegration: Shield,
  web3Dashboard: BarChart3,
  seo: BarChart3,
  analytics: BarChart3,
  optimization: Zap,
  support: Headphones,
  hosting: Settings,
  updates: Wrench,
};

const Services = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    id: string;
    title: string;
    price: string;
    delay: string;
    features?: string[];
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const handleStartProject = (categoryId: string, serviceId: string) => {
    const serviceKey = `services.catalog.${categoryId}.services.${serviceId}`;
    setSelectedService({
      id: serviceId,
      title: t(`${serviceKey}.title`),
      price: t(`${serviceKey}.price`),
      delay: t(`${serviceKey}.delay`),
      features: [],
    });
    setIsModalOpen(true);
  };

  const filteredCategories = activeCategory === "all" 
    ? serviceCategories 
    : serviceCategories.filter(cat => cat.id === activeCategory);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Web3 Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F7931A]/10 via-[#627EEA]/10 to-[#26A17B]/10 border border-white/10 mb-8"
            >
              <div className="flex items-center gap-1.5">
                <BitcoinIcon className="w-5 h-5" />
                <EthereumIcon className="w-5 h-5" />
                <USDCIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-white/80">{t("services.cryptoBadge")}</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t("services.hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8">
              {t("services.hero.subtitle")}
            </p>

            {/* Crypto payment highlight */}
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10">
                <Wallet className="w-4 h-4 text-primary" />
                <span className="text-sm text-white/70">{t("services.payWithCrypto")}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm text-white/70">{t("services.worldwide")}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm text-white/70">{t("services.fastDelivery")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-primary text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {t("services.filter.all")}
            </button>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t(`services.catalog.${category.id}.title`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Catalog */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {filteredCategories.map((category, catIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                    <category.icon className={`w-6 h-6 ${category.iconColor}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {t(`services.catalog.${category.id}.title`)}
                    </h2>
                    <p className="text-white/50 text-sm">
                      {t(`services.catalog.${category.id}.subtitle`)}
                    </p>
                  </div>
                  {category.id === "web3" && (
                    <CryptoBadge variant="compact" className="ml-auto" />
                  )}
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((serviceId, index) => {
                    const ServiceIcon = serviceIcons[serviceId] || Code2;
                    const serviceKey = `services.catalog.${category.id}.services.${serviceId}`;
                    
                    return (
                      <motion.div
                        key={serviceId}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`group relative p-6 rounded-2xl bg-gradient-to-br ${category.gradient} border border-white/10 hover:border-white/20 transition-all duration-300`}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-black/30 flex items-center justify-center mb-4 ${category.iconColor}`}>
                          <ServiceIcon className="w-5 h-5" />
                        </div>
                        
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {t(`${serviceKey}.title`)}
                        </h3>
                        <p className="text-white/60 text-sm mb-4 leading-relaxed">
                          {t(`${serviceKey}.description`)}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div>
                            <p className="text-xs text-white/40">{t("services.from")}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-primary font-semibold">{t(`${serviceKey}.price`)}</span>
                              {category.id === "web3" && (
                                <span className="text-[#F7931A] text-xs">/ {t(`${serviceKey}.cryptoPrice`)}</span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-white/40">{t("services.deliveredIn")}</p>
                            <span className="text-white text-sm">{t(`${serviceKey}.delay`)}</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleStartProject(category.id, serviceId)}
                          className="w-full mt-4 bg-white/10 hover:bg-primary text-white font-medium h-10 transition-all"
                        >
                          {t("services.orderNow")}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Web3 Highlight Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7931A]/5 via-[#627EEA]/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex justify-center gap-3 mb-6">
              <BitcoinIcon className="w-10 h-10" />
              <EthereumIcon className="w-10 h-10" />
              <USDCIcon className="w-10 h-10" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("services.web3Section.title")}
            </h2>
            <p className="text-white/60 text-lg mb-8">
              {t("services.web3Section.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/packs")}
                className="bg-gradient-to-r from-[#F7931A] to-[#627EEA] hover:opacity-90 text-white px-8 py-6 text-lg font-semibold"
              >
                {t("services.web3Section.cta")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/contact")}
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                {t("services.web3Section.contact")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t("services.cta.title")}
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              {t("services.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/packs")}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              >
                {t("services.cta.seePricing")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/contact")}
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                {t("services.cta.contact")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Project Starter Modal */}
      {selectedService && (
        <ProjectStarterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projectType={selectedService}
        />
      )}
    </main>
  );
};

export default Services;