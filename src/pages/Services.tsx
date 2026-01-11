import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Code2, 
  Palette, 
  Bot, 
  Shield,
  Globe,
  Zap,
  LayoutDashboard,
  Rocket,
  RefreshCw,
  Smartphone,
  LineChart,
  MessageSquare,
  Wrench,
  Lock,
  Wallet,
  Eye,
  Target,
  ChevronDown,
  Star,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectStarterModal from "@/components/ProjectStarterModal";
import { BitcoinIcon, EthereumIcon, USDCIcon } from "@/components/CryptoBadge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// 4 Tiers structure as specified
const serviceTiers = [
  {
    id: "core",
    tier: 1,
    icon: Code2,
    gradient: "from-primary/20 to-blue-500/20",
    borderColor: "border-primary/30",
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
    services: [
      { id: "landing", icon: Zap, popular: true, highDemand: true },
      { id: "business", icon: Globe, popular: true },
      { id: "redesign", icon: RefreshCw, highDemand: true },
      { id: "dashboard", icon: LayoutDashboard },
      { id: "mvp", icon: Rocket, highDemand: true },
    ]
  },
  {
    id: "design",
    tier: 2,
    icon: Palette,
    gradient: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
    bgColor: "bg-purple-500/10",
    services: [
      { id: "uiDesign", icon: Palette, popular: true },
      { id: "uxAudit", icon: Eye },
      { id: "mobileFirst", icon: Smartphone },
      { id: "dashboardDesign", icon: LayoutDashboard },
      { id: "prototyping", icon: Target },
    ]
  },
  {
    id: "automation",
    tier: 3,
    icon: Bot,
    gradient: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
    services: [
      { id: "automations", icon: Zap, highDemand: true },
      { id: "internalTools", icon: Wrench },
      { id: "aiChatbots", icon: MessageSquare, popular: true },
      { id: "analytics", icon: LineChart },
    ]
  },
  {
    id: "infrastructure",
    tier: 4,
    icon: Shield,
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    services: [
      { id: "maintenance", icon: Wrench },
      { id: "security", icon: Lock },
      { id: "cryptoPayments", icon: Wallet, crypto: true },
      { id: "web3Landing", icon: Globe, crypto: true },
    ]
  }
];

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
  const [activeTab, setActiveTab] = useState("core");

  const handleRequestService = (tierId: string, serviceId: string) => {
    const serviceKey = `servicesTiers.tiers.${tierId}.services.${serviceId}`;
    setSelectedService({
      id: serviceId,
      title: t(`${serviceKey}.title`),
      price: t(`${serviceKey}.price`),
      delay: "Variable",
      features: [],
    });
    setIsModalOpen(true);
  };

  const activeTier = serviceTiers.find(tier => tier.id === activeTab)!;

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
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
              <span className="text-sm font-medium text-white/80">{t("servicesTiers.cryptoAvailable")}</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-bebas">
              {t("servicesTiers.title")}
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8">
              {t("servicesTiers.subtitle")}
            </p>

            {/* Crypto payment highlight */}
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10">
                <Wallet className="w-4 h-4 text-primary" />
                <span className="text-sm text-white/70">{t("cryptoNative.payWith")}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm text-white/70">{t("cryptoNative.web2web3")}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-white/70">{t("cryptoNative.tagline")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services with Tabs */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-white/10 rounded-none h-auto p-0 mb-8 flex-wrap">
              {serviceTiers.map((tier) => {
                const TierIcon = tier.icon;
                return (
                  <TabsTrigger
                    key={tier.id}
                    value={tier.id}
                    className={`relative px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent text-white/60 data-[state=active]:text-white font-medium transition-all`}
                  >
                    <div className="flex items-center gap-2">
                      <TierIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">{t(`servicesTiers.tiers.${tier.id}.title`)}</span>
                      <span className="sm:hidden">Tier {tier.tier}</span>
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Tab Content */}
            {serviceTiers.map((tier) => (
              <TabsContent key={tier.id} value={tier.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Tier Header */}
                  <div className={`rounded-2xl p-6 md:p-8 mb-8 bg-gradient-to-br ${tier.gradient} border ${tier.borderColor}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${tier.bgColor} flex items-center justify-center ${tier.iconColor}`}>
                          <tier.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-white font-bebas">
                            {t(`servicesTiers.tiers.${tier.id}.title`)}
                          </h2>
                          <p className="text-white/50 text-sm md:text-base">
                            {t(`servicesTiers.tiers.${tier.id}.subtitle`)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <BitcoinIcon className="w-5 h-5" />
                        <EthereumIcon className="w-5 h-5" />
                        <USDCIcon className="w-5 h-5" />
                        <span className="text-white/50 text-sm ml-2">{t("servicesTiers.cryptoAvailable")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tier.services.map((service, index) => {
                      const ServiceIcon = service.icon;
                      const serviceKey = `servicesTiers.tiers.${tier.id}.services.${service.id}`;
                      
                      return (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={`group relative p-6 rounded-2xl bg-gradient-to-br ${tier.gradient} border ${tier.borderColor} hover:border-white/20 transition-all duration-300`}
                        >
                          {/* Badges */}
                          <div className="flex gap-1.5 absolute -top-2 right-4">
                            {service.popular && (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-[10px] font-semibold text-white">
                                <Star className="w-2.5 h-2.5 fill-current" />
                                {t("servicesTiers.badges.popular")}
                              </span>
                            )}
                            {service.highDemand && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-[10px] font-semibold text-black">
                                {t("servicesTiers.badges.highDemand")}
                              </span>
                            )}
                            {service.crypto && (
                              <span className="px-2 py-0.5 rounded-full bg-[#F7931A]/80 text-[10px] font-semibold text-white flex items-center gap-1">
                                <Wallet className="w-2.5 h-2.5" />
                                Web3
                              </span>
                            )}
                          </div>

                          <div className={`w-10 h-10 rounded-lg ${tier.bgColor} flex items-center justify-center mb-4 ${tier.iconColor}`}>
                            <ServiceIcon className="w-5 h-5" />
                          </div>
                          
                          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                            {t(`${serviceKey}.title`)}
                          </h3>
                          <p className="text-white/60 text-sm mb-4 leading-relaxed">
                            {t(`${serviceKey}.description`)}
                          </p>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-white/10 mb-4">
                            <span className="text-primary font-semibold">{t(`${serviceKey}.price`)}</span>
                            {service.crypto && (
                              <div className="flex items-center gap-1">
                                <BitcoinIcon className="w-3.5 h-3.5" />
                                <EthereumIcon className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>

                          <Button
                            onClick={() => handleRequestService(tier.id, service.id)}
                            className="w-full bg-white/10 hover:bg-primary text-white font-medium h-10 transition-all"
                          >
                            {t("contact.form.submit")}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-bebas">
              {t("servicesTiers.cryptoCta.title")}
            </h2>
            <p className="text-white/60 text-lg mb-8">
              {t("servicesTiers.cryptoCta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/contact')}
                className="bg-gradient-to-r from-[#F7931A] to-[#627EEA] hover:opacity-90 text-white px-8 py-6 text-lg font-semibold"
              >
                {t("servicesTiers.cryptoCta.button")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/packs')}
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                {t("services.cta.seePricing")}
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-bebas">
              {t("services.cta.title")}
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              {t("services.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/packs')}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              >
                {t("services.cta.seePricing")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/contact')}
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
