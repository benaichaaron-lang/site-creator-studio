import { Shield, Zap, Globe, Lock, Wallet, FileText, CheckCircle, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const cryptos = [
  { name: "Ethereum", symbol: "ETH" },
  { name: "Bitcoin", symbol: "BTC" },
  { name: "USD Coin", symbol: "USDC" },
  { name: "Tether", symbol: "USDT" },
];

const wallets = [
  { name: "MetaMask" },
  { name: "WalletConnect" },
  { name: "Coinbase Wallet" },
];

const CryptoSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      titleKey: "crypto.features.secure.title",
      descKey: "crypto.features.secure.description",
    },
    {
      icon: Zap,
      titleKey: "crypto.features.fast.title",
      descKey: "crypto.features.fast.description",
    },
    {
      icon: Globe,
      titleKey: "crypto.features.borderless.title",
      descKey: "crypto.features.borderless.description",
    },
    {
      icon: Lock,
      titleKey: "crypto.features.transparent.title",
      descKey: "crypto.features.transparent.description",
    },
  ];

  const steps = [
    { num: "1", titleKey: "crypto.steps.choosePack.title", descKey: "crypto.steps.choosePack.description" },
    { num: "2", titleKey: "crypto.steps.connect.title", descKey: "crypto.steps.connect.description" },
    { num: "3", titleKey: "crypto.steps.confirm.title", descKey: "crypto.steps.confirm.description" },
  ];

  const trustElements = [
    { icon: FileText, textKey: "crypto.trust.invoice" },
    { icon: CheckCircle, textKey: "crypto.trust.proof" },
    { icon: Headphones, textKey: "crypto.trust.support" },
  ];

  return (
    <section className="py-16 lg:py-28 relative overflow-hidden bg-black">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-xs font-medium uppercase tracking-widest">{t("crypto.badge")}</span>
              <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl mt-3 mb-6 text-white tracking-tight">
                {t("crypto.title")}
              </h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed font-heebo">
                {t("crypto.subtitle")}
              </p>

              {/* Crypto Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {cryptos.map((crypto, index) => (
                  <motion.div
                    key={crypto.symbol}
                    className="bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-2 flex items-center gap-2 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all cursor-default"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                      <span className="text-primary text-[10px] font-bold">{crypto.symbol[0]}</span>
                    </div>
                    <span className="text-sm font-medium text-white/70">{crypto.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Supported Wallets */}
              <div className="mb-10">
                <p className="text-xs text-white/40 mb-3 font-heebo uppercase tracking-wider">{t("crypto.wallets")}</p>
                <div className="flex flex-wrap gap-2">
                  {wallets.map((wallet, index) => (
                    <motion.div
                      key={wallet.name}
                      className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.06] rounded-lg px-3 py-1.5"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.08 }}
                    >
                      <Wallet className="w-3.5 h-3.5 text-primary/70" />
                      <span className="text-xs font-medium text-white/60">{wallet.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4 mb-10">
                <p className="text-xs text-white/40 uppercase tracking-wider font-heebo">{t("crypto.howItWorks")}</p>
                {steps.map((step, index) => (
                  <motion.div 
                    key={step.num}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-sm font-bold">{step.num}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-0.5 text-white font-heebo text-sm">{t(step.titleKey)}</h4>
                      <p className="text-white/40 text-sm font-heebo">{t(step.descKey)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust/Reassurance elements */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                  <div className="flex flex-wrap gap-4">
                    {trustElements.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-primary/70" />
                        <span className="text-xs text-white/50 font-heebo">{t(item.textKey)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-primary/[0.05] rounded-xl border border-primary/[0.15]">
                  <p className="text-sm text-white/60 leading-relaxed font-heebo">
                    <span className="text-primary font-medium">Important :</span> {t("crypto.important")}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Features Grid */}
            <motion.div 
              className="grid sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.titleKey}
                  className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bebas text-xl mb-2 text-white tracking-tight">{t(feature.titleKey)}</h3>
                  <p className="text-white/45 text-sm font-heebo leading-relaxed">{t(feature.descKey)}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoSection;
