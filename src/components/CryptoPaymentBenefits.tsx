import { motion } from "framer-motion";
import { Shield, Zap, Globe, Receipt, Wallet, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CryptoBadge, { BitcoinIcon, EthereumIcon, USDCIcon, USDTIcon } from "./CryptoBadge";

const CryptoPaymentBenefits = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Zap,
      title: t("cryptoBenefits.fast.title"),
      description: t("cryptoBenefits.fast.description"),
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400",
    },
    {
      icon: Globe,
      title: t("cryptoBenefits.global.title"),
      description: t("cryptoBenefits.global.description"),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
    },
    {
      icon: Shield,
      title: t("cryptoBenefits.secure.title"),
      description: t("cryptoBenefits.secure.description"),
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400",
    },
    {
      icon: Receipt,
      title: t("cryptoBenefits.transparent.title"),
      description: t("cryptoBenefits.transparent.description"),
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
    },
  ];

  const cryptos = [
    { icon: BitcoinIcon, name: "Bitcoin", symbol: "BTC", color: "#F7931A" },
    { icon: EthereumIcon, name: "Ethereum", symbol: "ETH", color: "#627EEA" },
    { icon: USDCIcon, name: "USD Coin", symbol: "USDC", color: "#2775CA" },
    { icon: USDTIcon, name: "Tether", symbol: "USDT", color: "#26A17B" },
  ];

  const wallets = [
    { name: "MetaMask", logo: "🦊" },
    { name: "WalletConnect", logo: "🔗" },
    { name: "Coinbase Wallet", logo: "💰" },
    { name: "Trust Wallet", logo: "🛡️" },
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(217,91%,50%,0.08),transparent_70%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F7931A]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#627EEA]/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F7931A]/10 via-[#627EEA]/10 to-[#26A17B]/10 border border-white/10 mb-6">
            <Wallet className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white/80">{t("cryptoBenefits.badge")}</span>
          </div>
          
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {t("cryptoBenefits.title")}
          </h2>
          <p className="text-white/50 text-lg md:text-xl font-heebo max-w-2xl mx-auto">
            {t("cryptoBenefits.subtitle")}
          </p>
        </motion.div>

        {/* Accepted cryptos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16"
        >
          {cryptos.map((crypto, index) => (
            <motion.div
              key={crypto.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all"
            >
              <crypto.icon className="w-8 h-8" />
              <div>
                <p className="text-white font-semibold text-sm">{crypto.name}</p>
                <p className="text-white/40 text-xs">{crypto.symbol}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${benefit.gradient} border border-white/10 hover:border-white/20 transition-all group`}
            >
              <div className={`w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center mb-4 ${benefit.iconColor}`}>
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Supported wallets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-white/40 text-sm mb-4 font-heebo">{t("cryptoBenefits.supportedWallets")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {wallets.map((wallet) => (
              <div 
                key={wallet.name}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white/60 text-sm"
              >
                <span>{wallet.logo}</span>
                <span>{wallet.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/40 text-sm mb-6">
            {t("cryptoBenefits.noUpfront")}
          </p>
          <Button
            onClick={() => navigate("/contact")}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-xl"
          >
            {t("cryptoBenefits.cta")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CryptoPaymentBenefits;
