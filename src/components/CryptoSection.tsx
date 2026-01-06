import { Shield, Zap, Globe, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Sécurisé",
    description: "Transactions vérifiées sur la blockchain. Aucun intermédiaire.",
  },
  {
    icon: Zap,
    title: "Instantané",
    description: "Confirmation rapide de votre paiement. Nous démarrons immédiatement.",
  },
  {
    icon: Globe,
    title: "Sans frontières",
    description: "Payez de n'importe où dans le monde, sans frais bancaires.",
  },
  {
    icon: Lock,
    title: "Transparent",
    description: "Chaque transaction est traçable et vérifiable publiquement.",
  },
];

const cryptos = [
  { name: "Ethereum", symbol: "ETH" },
  { name: "Bitcoin", symbol: "BTC" },
  { name: "USD Coin", symbol: "USDC" },
  { name: "Tether", symbol: "USDT" },
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
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Paiement</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Payez en
                <span className="text-gradient"> crypto</span>,
                <br />
                simplement
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Nous acceptons les principales cryptomonnaies. Un processus de paiement 
                simple, moderne et sécurisé qui s'adapte à vos habitudes.
              </p>

              {/* Crypto Badges */}
              <div className="flex flex-wrap gap-3 mb-10">
                {cryptos.map((crypto) => (
                  <div
                    key={crypto.symbol}
                    className="glass rounded-full px-4 py-2 flex items-center gap-2 hover:bg-card/60 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs font-bold">{crypto.symbol[0]}</span>
                    </div>
                    <span className="text-sm font-medium">{crypto.name}</span>
                  </div>
                ))}
              </div>

              {/* Steps */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Choisissez votre pack</h4>
                    <p className="text-muted-foreground text-sm">Sélectionnez l'offre qui vous convient</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Connectez votre wallet</h4>
                    <p className="text-muted-foreground text-sm">MetaMask, WalletConnect, ou tout autre wallet compatible</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Confirmez la transaction</h4>
                    <p className="text-muted-foreground text-sm">Validez et nous démarrons votre projet</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="glass rounded-xl p-6 hover:glow-primary transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoSection;
