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

// Premium easing
const premiumEase: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

// Tier 1 Core Services - Most visible on homepage
const coreServices = [
  { 
    id: "landing", 
    icon: Zap, 
    popular: true,
  },
  { 
    id: "business", 
    icon: Globe, 
    popular: true,
  },
  { 
    id: "redesign", 
    icon: RefreshCw,
  },
  { 
    id: "dashboard", 
    icon: LayoutDashboard,
  },
  { 
    id: "mvp", 
    icon: Rocket,
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
    <section className="py-16 sm:py-20 md:py-28 lg:py-36 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217,91%,55%,0.02),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        {/* Header - refined spacing */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: premiumEase }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 md:mb-16 lg:mb-20"
        >
          {/* Crypto badge - more subtle */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-card/40 border border-border/30 mb-6 sm:mb-8 md:mb-10">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <BitcoinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <EthereumIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <USDCIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="text-[10px] sm:text-xs text-muted-foreground">{t("homepageServices.cryptoBadge")}</span>
          </div>

          <span className="text-primary text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium block mb-3 sm:mb-4 md:mb-5">
            {t("homepageServices.badge")}
          </span>
          <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 sm:mb-5 md:mb-6">
            {t("homepageServices.title")}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mx-auto px-2">
            {t("homepageServices.subtitle")}
          </p>
        </motion.div>

        {/* Services Grid - responsive cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-12 md:mb-16">
          {coreServices.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: premiumEase }}
                onClick={() => handleServiceClick(service.id)}
                className="group relative p-5 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl bg-card/40 border border-border/30 hover:border-border/50 hover:bg-card/60 cursor-pointer transition-all duration-500 hover:-translate-y-1"
              >
                {/* Popular badge - responsive */}
                {service.popular && (
                  <div className="absolute -top-2 -right-2 sm:-top-2.5 sm:-right-2.5">
                    <span className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-primary text-[9px] sm:text-[10px] font-semibold text-primary-foreground shadow-lg shadow-primary/25">
                      <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-current" />
                      {t("homepageServices.popular")}
                    </span>
                  </div>
                )}

                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:bg-primary/15 transition-colors duration-500">
                  <ServiceIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 text-primary" />
                </div>

                <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2 sm:mb-2.5 group-hover:text-primary transition-colors duration-400">
                  {t(`homepageServices.services.${service.id}.title`)}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 lg:mb-6">
                  {t(`homepageServices.services.${service.id}.description`)}
                </p>

                <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-border/30">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                    <span className="text-primary font-semibold text-sm sm:text-base">
                      {t(`homepageServices.services.${service.id}.price`)}
                    </span>
                    <span className="text-muted-foreground/50 text-[10px] sm:text-xs">
                      {t(`homepageServices.services.${service.id}.delay`)}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTAs - responsive styling */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2"
        >
          <Button
            onClick={() => navigate('/services')}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-sm sm:text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-400"
          >
            {t("homepageServices.viewAll")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            onClick={() => navigate('/contact')}
            variant="outline"
            className="w-full sm:w-auto border-border/50 text-foreground hover:bg-card/50 px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-sm sm:text-base font-medium transition-all duration-400"
          >
            <Wallet className="w-4 h-4 mr-2" />
            {t("homepageServices.payWithCrypto")}
          </Button>
        </motion.div>

        {/* Trust line - more subtle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, ease: premiumEase }}
          className="text-center text-muted-foreground/50 text-xs sm:text-sm mt-8 sm:mt-10 md:mt-12 px-4"
        >
          {t("homepageServices.trust")}
        </motion.p>
      </div>
    </section>
  );
};

export default HomepageCoreServices;
