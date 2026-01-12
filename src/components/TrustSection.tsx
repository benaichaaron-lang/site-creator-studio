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
    <section className="py-20 md:py-32 lg:py-40 relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Stats - elegant horizontal layout with more spacing */}
        <div className="flex justify-center gap-12 md:gap-20 lg:gap-28 mb-16 md:mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: premiumEase }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3.5 mb-3">
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <span className="font-bebas text-5xl md:text-7xl text-foreground tracking-tight">{stat.value}</span>
              </div>
              <p className="text-muted-foreground text-sm md:text-base font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Crypto payment banner - refined glass style */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: 0.7, ease: premiumEase }}
          className="mb-16 md:mb-24"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 p-6 md:p-10 rounded-3xl bg-gradient-to-r from-[#F7931A]/[0.03] via-[#627EEA]/[0.03] to-[#26A17B]/[0.03] border border-border/30 backdrop-blur-sm">
            <div className="flex items-center gap-3.5">
              <Wallet className="w-5 h-5 text-primary/70" />
              <span className="text-muted-foreground font-medium">{t("cryptoNative.payWith")}</span>
            </div>
            <div className="flex items-center gap-4">
              {cryptos.map((crypto) => (
                <motion.div
                  key={crypto.name}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.4, ease: premiumEase }}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-card/40 border border-border/40 hover:border-border/60 transition-all duration-400"
                >
                  <crypto.Icon className="w-5 h-5" />
                  <span className="text-muted-foreground text-sm font-medium">{crypto.name}</span>
                </motion.div>
              ))}
            </div>
            <div className="hidden md:block h-6 w-px bg-border/30" />
            <span className="text-sm text-muted-foreground/60">{t("cryptoNative.web2web3")}</span>
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
          <p className="text-muted-foreground text-sm md:text-base mb-10 md:mb-12 max-w-lg mx-auto leading-relaxed">
            {t("trust.credibility")}
          </p>
          
          {/* Sector icons - clean grid with more spacing */}
          <div className="flex items-center justify-center gap-8 md:gap-12">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.08, duration: 0.6, ease: premiumEase }}
                className="group"
              >
                <div className="flex flex-col items-center gap-3.5">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-card/50 border border-border/30 flex items-center justify-center group-hover:bg-card/70 group-hover:border-border/50 transition-all duration-500">
                    <sector.icon className="w-7 h-7 md:w-8 md:h-8 text-muted-foreground group-hover:text-foreground/70 transition-colors duration-500" />
                  </div>
                  <span className="text-xs md:text-sm text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-500">{sector.name}</span>
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
