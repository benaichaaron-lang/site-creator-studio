import { motion } from "framer-motion";
import { Clock, Users, Headphones, Briefcase, ShoppingBag, Rocket, Building, Wallet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BitcoinIcon, EthereumIcon, USDCIcon, USDTIcon } from "./CryptoBadge";

// Premium easing
const premiumEase: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

const TrustSection = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: "15.000",
      label: t("trust.stats.projects"),
    },
    {
      icon: Clock,
      value: "5",
      label: t("trust.stats.delivery"),
    },
    {
      icon: Headphones,
      value: "<24h",
      label: t("trust.stats.response"),
    },
  ];

  const sectors = [
    { name: t("trust.sectors.ecommerce"), icon: ShoppingBag },
    { name: t("trust.sectors.startups"), icon: Rocket },
    { name: t("trust.sectors.sme"), icon: Building },
    { name: t("trust.sectors.services"), icon: Briefcase },
  ];

  const cryptos = [
    { Icon: BitcoinIcon, name: "BTC" },
    { Icon: EthereumIcon, name: "ETH" },
    { Icon: USDCIcon, name: "USDC" },
    { Icon: USDTIcon, name: "USDT" },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        {/* Stats - responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-12 lg:gap-20 mb-12 md:mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: premiumEase }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <span className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground tracking-tight">{stat.value}</span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Crypto payment banner - responsive */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: 0.7, ease: premiumEase }}
          className="mb-12 md:mb-20"
        >
          <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-8 p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#F7931A]/[0.03] via-[#627EEA]/[0.03] to-[#26A17B]/[0.03] border border-border/30 backdrop-blur-sm">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-primary/70" />
              <span className="text-muted-foreground text-sm sm:text-base font-medium">{t("cryptoNative.payWith")}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
              {cryptos.map((crypto) => (
                <motion.div
                  key={crypto.name}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.4, ease: premiumEase }}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-card/40 border border-border/40 hover:border-border/60 transition-all duration-400"
                >
                  <crypto.Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-muted-foreground text-xs sm:text-sm font-medium">{crypto.name}</span>
                </motion.div>
              ))}
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground/60 text-center">{t("cryptoNative.web2web3")}</span>
          </div>
        </motion.div>

        {/* Credibility phrase + sectors */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3, duration: 0.7, ease: premiumEase }}
          className="text-center"
        >
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base mb-8 sm:mb-10 md:mb-12 max-w-lg mx-auto leading-relaxed px-2">
            {t("trust.credibility")}
          </p>
          
          {/* Sector icons - responsive grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 max-w-2xl mx-auto">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.08, duration: 0.6, ease: premiumEase }}
                className="group"
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-card/50 border border-border/30 flex items-center justify-center group-hover:bg-card/70 group-hover:border-border/50 transition-all duration-500">
                    <sector.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-muted-foreground group-hover:text-foreground/70 transition-colors duration-500" />
                  </div>
                  <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-500 text-center leading-tight">{sector.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
