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
    <section className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217,91%,55%,0.02),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Header - refined spacing */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: premiumEase }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          {/* Crypto badge - more subtle */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-card/40 border border-border/30 mb-10">
            <div className="flex items-center gap-1.5">
              <BitcoinIcon className="w-4 h-4" />
              <EthereumIcon className="w-4 h-4" />
              <USDCIcon className="w-4 h-4" />
            </div>
            <span className="text-xs text-muted-foreground">{t("homepageServices.cryptoBadge")}</span>
          </div>

          <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium block mb-5">
            {t("homepageServices.badge")}
          </span>
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            {t("homepageServices.title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg mx-auto">
            {t("homepageServices.subtitle")}
          </p>
        </motion.div>

        {/* Services Grid - refined cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6 mb-16">
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
                className="group relative p-7 rounded-2xl bg-card/40 border border-border/30 hover:border-border/50 hover:bg-card/60 cursor-pointer transition-all duration-500 hover:-translate-y-1"
              >
                {/* Popular badge - more discrete */}
                {service.popular && (
                  <div className="absolute -top-2.5 -right-2.5">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-[10px] font-semibold text-primary-foreground shadow-lg shadow-primary/25">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      {t("homepageServices.popular")}
                    </span>
                  </div>
                )}

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors duration-500">
                  <ServiceIcon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-semibold text-foreground mb-2.5 group-hover:text-primary transition-colors duration-400">
                  {t(`homepageServices.services.${service.id}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {t(`homepageServices.services.${service.id}.description`)}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-border/30">
                  <div>
                    <span className="text-primary font-semibold">
                      {t(`homepageServices.services.${service.id}.price`)}
                    </span>
                    <span className="text-muted-foreground/50 text-xs ml-2">
                      {t(`homepageServices.services.${service.id}.delay`)}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTAs - refined styling */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={() => navigate('/services')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-400"
          >
            {t("homepageServices.viewAll")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            onClick={() => navigate('/contact')}
            variant="outline"
            className="border-border/50 text-foreground hover:bg-card/50 px-8 h-14 rounded-xl text-base font-medium transition-all duration-400"
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
          className="text-center text-muted-foreground/50 text-sm mt-12"
        >
          {t("homepageServices.trust")}
        </motion.p>
      </div>
    </section>
  );
};

export default HomepageCoreServices;
