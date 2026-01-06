import { MousePointerClick, FileText, Wallet, Truck, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    number: "01",
    title: "Choisissez votre formule",
    description: "Pack ou sur-mesure, sélectionnez l'offre qui correspond à vos besoins.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Remplissez le brief",
    description: "Un questionnaire simple pour comprendre votre projet, vos objectifs et vos préférences.",
  },
  {
    icon: Wallet,
    number: "03",
    title: "Paiement crypto",
    description: "Réglez en toute sécurité avec votre wallet. ETH, BTC, USDC acceptés.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Livraison",
    description: "Recevez votre site web dans les délais annoncés, clé en main et prêt à l'emploi.",
  },
  {
    icon: RefreshCw,
    number: "05",
    title: "Révisions",
    description: "Demandez des ajustements selon votre formule. Nous perfectionnons ensemble.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Processus</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Comment ça marche
          </h2>
          <p className="text-muted-foreground">
            Un processus simple et transparent en 5 étapes. De la commande à la livraison.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="grid md:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:glow-primary transition-all duration-500">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  {/* Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
