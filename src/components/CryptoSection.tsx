import { Shield, Zap, Globe, Lock, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Secure",
    description: "Transactions verified on the blockchain with full transparency.",
  },
  {
    icon: Zap,
    title: "Fast",
    description: "Quick confirmation of your payment. We start immediately after verification.",
  },
  {
    icon: Globe,
    title: "Borderless",
    description: "Pay from anywhere in the world, without traditional bank fees.",
  },
  {
    icon: Lock,
    title: "Transparent",
    description: "Every transaction is traceable. Invoice and reference included.",
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
  { num: "1", title: "Choose your pack", desc: "Select the offer that suits you" },
  { num: "2", title: "Connect your wallet", desc: "MetaMask, WalletConnect, or Coinbase Wallet" },
  { num: "3", title: "Confirm the transaction", desc: "Validate and we start your project" },
];

const CryptoSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Payment</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Pay with
                <span className="text-gradient"> crypto</span>,
                <br />
                simply
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We accept the main cryptocurrencies. A simple, modern, and secure 
                payment process that adapts to your habits.
              </p>

              {/* Crypto Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {cryptos.map((crypto, index) => (
                  <motion.div
                    key={crypto.symbol}
                    className="glass rounded-full px-4 py-2 flex items-center gap-2 hover:bg-card/60 transition-colors cursor-pointer"
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
                    <span className="text-sm font-medium">{crypto.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Supported Wallets */}
              <div className="mb-10">
                <p className="text-sm text-muted-foreground mb-3">Supported wallets:</p>
                <div className="flex flex-wrap gap-2">
                  {wallets.map((wallet, index) => (
                    <motion.div
                      key={wallet.name}
                      className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-1.5"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Wallet className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium">{wallet.name}</span>
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
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-muted-foreground text-sm">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Notes */}
              <motion.div
                className="mt-8 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <p className="text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 inline-block mr-2 text-primary" />
                    Invoice, transaction reference, and proof of payment provided for every order.
                  </p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    💵 Prefer stability? Pay in USDC or USDT.
                  </p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    ⏳ Crypto payment happens <strong>only after brief validation</strong>. No upfront payment.
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
                  className="glass rounded-xl p-6 hover:glow-primary transition-all duration-500 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
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