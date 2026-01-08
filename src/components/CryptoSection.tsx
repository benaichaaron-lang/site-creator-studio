import { Shield, Zap, Globe, Lock, Wallet, FileText, CheckCircle, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Sécurisé",
    description: "Transactions vérifiées sur la blockchain avec une transparence totale.",
  },
  {
    icon: Zap,
    title: "Rapide",
    description: "Confirmation rapide de votre paiement. Nous démarrons dès validation.",
  },
  {
    icon: Globe,
    title: "Sans frontières",
    description: "Payez de n'importe où dans le monde, sans frais bancaires traditionnels.",
  },
  {
    icon: Lock,
    title: "Transparent",
    description: "Chaque transaction est traçable. Facture et référence incluses.",
  },
];

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

const steps = [
  { num: "1", title: "Choisissez votre pack", desc: "Sélectionnez l'offre qui vous convient" },
  { num: "2", title: "Connectez votre wallet", desc: "MetaMask, WalletConnect, ou Coinbase Wallet" },
  { num: "3", title: "Confirmez la transaction", desc: "Validez et nous démarrons votre projet" },
];

// Trust elements for reassurance
const trustElements = [
  { icon: FileText, text: "Facture officielle fournie" },
  { icon: CheckCircle, text: "Preuve de transaction blockchain" },
  { icon: Headphones, text: "Support dédié pendant le paiement" },
];

const CryptoSection = () => {
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
              <span className="text-primary text-xs font-medium uppercase tracking-widest">Paiement</span>
              <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl mt-3 mb-6 text-white tracking-tight">
                Paiement crypto accepté
              </h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed font-heebo">
                Nous acceptons les principales cryptomonnaies pour une expérience 
                de paiement fluide et sans frontières.
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
                <p className="text-xs text-white/40 mb-3 font-heebo uppercase tracking-wider">Wallets supportés</p>
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
                <p className="text-xs text-white/40 uppercase tracking-wider font-heebo">Comment ça marche</p>
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
                      <h4 className="font-semibold mb-0.5 text-white font-heebo text-sm">{step.title}</h4>
                      <p className="text-white/40 text-sm font-heebo">{step.desc}</p>
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
                        <span className="text-xs text-white/50 font-heebo">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-primary/[0.05] rounded-xl border border-primary/[0.15]">
                  <p className="text-sm text-white/60 leading-relaxed font-heebo">
                    <span className="text-primary font-medium">Important :</span> Le paiement s'effectue uniquement après validation du brief. Aucun paiement initial requis.
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
                  key={feature.title}
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
                  <h3 className="font-bebas text-xl mb-2 text-white tracking-tight">{feature.title}</h3>
                  <p className="text-white/45 text-sm font-heebo leading-relaxed">{feature.description}</p>
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
