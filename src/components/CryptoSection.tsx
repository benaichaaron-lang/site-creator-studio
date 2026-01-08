import { Shield, Zap, Globe, Lock, Wallet } from "lucide-react";
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

const CryptoSection = () => {
  return (
    <section className="py-16 lg:py-28 relative overflow-hidden bg-black">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-sm font-medium uppercase tracking-wider">Paiement</span>
              <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl mt-4 mb-6 text-white">
                Paiement crypto accepté
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed font-heebo">
                Nous acceptons les principales cryptomonnaies pour une expérience 
                de paiement fluide et sans frontières.
              </p>

              {/* Crypto Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {cryptos.map((crypto, index) => (
                  <motion.div
                    key={crypto.symbol}
                    className="bg-white/5 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <span className="text-primary text-xs font-bold">{crypto.symbol[0]}</span>
                    </motion.div>
                    <span className="text-sm font-medium text-white">{crypto.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Supported Wallets */}
              <div className="mb-10">
                <p className="text-sm text-white/60 mb-3 font-heebo">Wallets supportés :</p>
                <div className="flex flex-wrap gap-2">
                  {wallets.map((wallet, index) => (
                    <motion.div
                      key={wallet.name}
                      className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Wallet className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-white/80">{wallet.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div 
                    key={step.num}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <motion.div 
                      className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.4)" }}
                    >
                      <span className="text-primary text-sm font-bold">{step.num}</span>
                    </motion.div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white font-heebo">{step.title}</h4>
                      <p className="text-white/60 text-sm font-heebo">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Notes */}
              <motion.div
                className="mt-10 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="p-4 bg-white/[0.03] rounded-lg border border-white/10">
                  <p className="text-sm text-white/70 leading-relaxed font-heebo">
                    <Shield className="w-4 h-4 inline-block mr-2 text-primary" />
                    Facture, référence de transaction et preuve de paiement fournis pour chaque commande.
                  </p>
                </div>
                <div className="p-4 bg-white/[0.03] rounded-lg border border-white/10">
                  <p className="text-sm text-white/70 leading-relaxed font-heebo">
                    Le paiement s'effectue <span className="text-white font-medium">uniquement après validation du brief</span>. 
                    Aucun paiement initial requis.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Features Grid */}
            <motion.div 
              className="grid sm:grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-primary/30 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-6 h-6 text-primary" strokeWidth={2.5} />
                  </motion.div>
                  <h3 className="font-bebas text-xl mb-2 text-white">{feature.title}</h3>
                  <p className="text-white/60 text-sm font-heebo">{feature.description}</p>
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