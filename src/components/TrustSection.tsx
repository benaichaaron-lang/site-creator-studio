import { motion } from "framer-motion";
import { Clock, Users, Headphones, Briefcase, ShoppingBag, Rocket, Building, Wallet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CryptoBadge, { BitcoinIcon, EthereumIcon, USDCIcon, USDTIcon } from "./CryptoBadge";

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
    <section className="py-10 md:py-20 border-t border-b border-white/[0.05]">
      <div className="container mx-auto px-4">
        {/* Stats - horizontal scroll on mobile, row on desktop */}
        <div className="flex justify-between md:justify-center gap-6 md:gap-20 mb-8 md:mb-16 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center flex-shrink-0"
            >
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <span className="font-bebas text-3xl md:text-5xl text-white tracking-tight">{stat.value}</span>
              </div>
              <p className="text-white/40 text-xs md:text-sm font-heebo whitespace-nowrap">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Crypto payment banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 p-4 md:p-6 rounded-2xl bg-gradient-to-r from-[#F7931A]/5 via-[#627EEA]/5 to-[#26A17B]/5 border border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              <span className="text-white/70 font-medium text-sm md:text-base">{t("cryptoNative.payWith")}</span>
            </div>
            <div className="flex items-center gap-3">
              {cryptos.map((crypto) => (
                <motion.div
                  key={crypto.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10"
                >
                  <crypto.Icon className="w-5 h-5" />
                  <span className="text-white/60 text-xs font-medium">{crypto.name}</span>
                </motion.div>
              ))}
            </div>
            <div className="hidden md:block h-5 w-px bg-white/10" />
            <span className="text-xs text-white/40 font-heebo">{t("cryptoNative.web2web3")}</span>
          </div>
        </motion.div>

        {/* Credibility phrase + sectors - more compact on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-white/50 text-xs md:text-sm mb-4 md:mb-6 font-heebo max-w-sm md:max-w-md mx-auto px-2">
            {t("trust.credibility")}
          </p>
          
          {/* Sector icons - horizontal scroll on mobile */}
          <div className="flex items-center justify-start md:justify-center gap-3 md:gap-6 overflow-x-auto pb-2 md:pb-0 px-2 md:px-0 scrollbar-hide">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.08, duration: 0.4 }}
                className="group flex-shrink-0"
              >
                <div className="flex flex-col items-center gap-1.5 md:gap-2">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.05] group-hover:border-white/[0.1] transition-all duration-300">
                    <sector.icon className="w-5 h-5 md:w-6 md:h-6 text-white/40 group-hover:text-white/60 transition-colors" />
                  </div>
                  <span className="text-[10px] md:text-[11px] text-white/30 font-heebo group-hover:text-white/50 transition-colors whitespace-nowrap">{sector.name}</span>
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
