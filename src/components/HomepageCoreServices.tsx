import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Zap, 
  Globe,
  RefreshCw,
  LayoutDashboard,
  Rocket,
  Wallet,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { BitcoinIcon, EthereumIcon, USDCIcon } from "@/components/CryptoBadge";

// Tier 1 Core Services - Most visible on homepage
const coreServices = [
  { 
    id: "landing", 
    icon: Zap, 
    popular: true,
    gradient: "from-primary/20 to-blue-600/20",
  },
  { 
    id: "business", 
    icon: Globe, 
    popular: true,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  { 
    id: "redesign", 
    icon: RefreshCw,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  { 
    id: "dashboard", 
    icon: LayoutDashboard,
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  { 
    id: "mvp", 
    icon: Rocket,
    gradient: "from-rose-500/20 to-red-500/20",
  },
];

const HomepageCoreServices = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleServiceClick = (serviceId: string) => {
    sessionStorage.setItem('selectedService', serviceId);
    navigate('/contact');
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217,91%,50%,0.04),transparent_60%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          {/* Crypto badge - subtle */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-6">
            <div className="flex items-center gap-1">
              <BitcoinIcon className="w-3.5 h-3.5" />
              <EthereumIcon className="w-3.5 h-3.5" />
              <USDCIcon className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] text-white/50">{t("homepageServices.cryptoBadge")}</span>
          </div>

          <span className="text-primary text-xs uppercase tracking-widest font-medium">
            {t("homepageServices.badge")}
          </span>
          <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl text-white mt-3 mb-4">
            {t("homepageServices.title")}
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto">
            {t("homepageServices.subtitle")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {coreServices.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => handleServiceClick(service.id)}
                className={`group relative p-5 rounded-2xl bg-gradient-to-br ${service.gradient} border border-white/10 hover:border-white/20 cursor-pointer transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Popular badge */}
                {service.popular && (
                  <div className="absolute -top-2 -right-2">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-[10px] font-semibold text-white">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      {t("homepageServices.popular")}
                    </span>
                  </div>
                )}

                <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center mb-4 text-primary">
                  <ServiceIcon className="w-5 h-5" />
                </div>

                <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                  {t(`homepageServices.services.${service.id}.title`)}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {t(`homepageServices.services.${service.id}.description`)}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div>
                    <span className="text-primary font-semibold text-sm">
                      {t(`homepageServices.services.${service.id}.price`)}
                    </span>
                    <span className="text-white/30 text-xs ml-2">
                      {t(`homepageServices.services.${service.id}.delay`)}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={() => navigate('/services')}
            className="bg-primary hover:bg-primary/90 text-white px-6 h-12"
          >
            {t("homepageServices.viewAll")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            onClick={() => navigate('/contact')}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 px-6 h-12"
          >
            <Wallet className="w-4 h-4 mr-2" />
            {t("homepageServices.payWithCrypto")}
          </Button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm mt-6"
        >
          {t("homepageServices.trust")}
        </motion.p>
      </div>
    </section>
  );
};

export default HomepageCoreServices;
