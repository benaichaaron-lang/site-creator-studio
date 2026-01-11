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
  TrendingUp,
  Eye,
  Target,
  Sparkles,
  ChevronDown,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { BitcoinIcon, EthereumIcon, USDCIcon } from "@/components/CryptoBadge";

// 4 Tiers structure as specified
const serviceTiers = [
  {
    id: "core",
    tier: 1,
    gradient: "from-primary/20 to-blue-500/20",
    borderColor: "border-primary/30",
    iconColor: "text-primary",
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
    gradient: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
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
    gradient: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
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
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    services: [
      { id: "maintenance", icon: Wrench },
      { id: "security", icon: Lock },
      { id: "cryptoPayments", icon: Wallet, crypto: true },
      { id: "web3Landing", icon: Globe, crypto: true },
    ]
  }
];

interface ServicesTieredSectionProps {
  showOnlyTier1?: boolean;
  compact?: boolean;
}

const ServicesTieredSection = ({ showOnlyTier1 = false, compact = false }: ServicesTieredSectionProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [expandedTier, setExpandedTier] = useState<string | null>(showOnlyTier1 ? null : "core");

  const filteredTiers = showOnlyTier1 
    ? serviceTiers.filter(tier => tier.tier === 1) 
    : serviceTiers;

  const handleRequestService = (serviceId: string) => {
    sessionStorage.setItem('selectedService', serviceId);
    navigate('/contact');
  };

  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(217,91%,50%,0.03),transparent_60%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            {/* Crypto badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#F7931A]/10 via-[#627EEA]/10 to-[#26A17B]/10 border border-white/10 mb-6">
              <div className="flex items-center gap-1.5">
                <BitcoinIcon className="w-4 h-4" />
                <EthereumIcon className="w-4 h-4" />
                <USDCIcon className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-white/70">{t("servicesTiers.cryptoAvailable")}</span>
            </div>
            
            <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              {t("servicesTiers.title")}
            </h2>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
              {t("servicesTiers.subtitle")}
            </p>
          </motion.div>
        )}

        {/* Tiers */}
        <div className="space-y-6">
          {filteredTiers.map((tier, tierIndex) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: tierIndex * 0.1 }}
              className={`rounded-2xl border ${tier.borderColor} bg-gradient-to-br ${tier.gradient} backdrop-blur-sm overflow-hidden`}
            >
              {/* Tier Header - Clickable to expand on mobile */}
              <button
                onClick={() => setExpandedTier(expandedTier === tier.id ? null : tier.id)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center ${tier.iconColor}`}>
                    <span className="font-bebas text-lg">{tier.tier}</span>
                  </div>
                  <div>
                    <h3 className="font-bebas text-xl md:text-2xl text-white">
                      {t(`servicesTiers.tiers.${tier.id}.title`)}
                    </h3>
                    <p className="text-white/50 text-sm hidden md:block">
                      {t(`servicesTiers.tiers.${tier.id}.subtitle`)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-sm hidden md:block">
                    {tier.services.length} {t("servicesTiers.services")}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-white/40 transition-transform ${
                      expandedTier === tier.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Services Grid - Collapsible */}
              <AnimatePresence>
                {(expandedTier === tier.id || !showOnlyTier1) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 md:px-6 md:pb-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {tier.services.map((service, serviceIndex) => {
                          const ServiceIcon = service.icon;
                          return (
                            <motion.div
                              key={service.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: serviceIndex * 0.05 }}
                              className="group relative p-4 rounded-xl bg-black/30 border border-white/5 hover:border-white/15 transition-all cursor-pointer"
                              onClick={() => handleRequestService(service.id)}
                            >
                              {/* Badges */}
                              <div className="flex gap-1.5 absolute -top-2 right-3">
                                {service.popular && (
                                  <span className="px-2 py-0.5 rounded-full bg-primary text-[10px] font-semibold text-white">
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

                              <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mb-3 ${tier.iconColor}`}>
                                <ServiceIcon className="w-4 h-4" />
                              </div>
                              
                              <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-primary transition-colors">
                                {t(`servicesTiers.tiers.${tier.id}.services.${service.id}.title`)}
                              </h4>
                              <p className="text-white/40 text-xs leading-relaxed mb-3">
                                {t(`servicesTiers.tiers.${tier.id}.services.${service.id}.description`)}
                              </p>
                              
                              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                <span className="text-primary text-xs font-medium">
                                  {t(`servicesTiers.tiers.${tier.id}.services.${service.id}.price`)}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {showOnlyTier1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Button
              onClick={() => navigate('/services')}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              {t("servicesTiers.seeAllServices")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}

        {/* Crypto reassurance */}
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#F7931A]/5 via-[#627EEA]/5 to-[#26A17B]/5 border border-white/10 text-center"
          >
            <div className="flex justify-center gap-4 mb-4">
              <BitcoinIcon className="w-8 h-8" />
              <EthereumIcon className="w-8 h-8" />
              <USDCIcon className="w-8 h-8" />
            </div>
            <h3 className="font-bebas text-xl text-white mb-2">
              {t("servicesTiers.cryptoCta.title")}
            </h3>
            <p className="text-white/50 text-sm max-w-md mx-auto mb-4">
              {t("servicesTiers.cryptoCta.subtitle")}
            </p>
            <Button
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-[#F7931A] to-[#627EEA] hover:opacity-90 text-white"
            >
              {t("servicesTiers.cryptoCta.button")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServicesTieredSection;
