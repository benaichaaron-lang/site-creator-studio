import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Code, Rocket, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Palette,
    title: "Design unique",
    description: "Un design créé spécialement pour votre marque et vos besoins.",
  },
  {
    icon: Code,
    title: "Fonctionnalités sur-mesure",
    description: "Développement de fonctionnalités personnalisées sans limite.",
  },
  {
    icon: Rocket,
    title: "Scalabilité",
    description: "Architecture pensée pour accompagner votre croissance.",
  },
  {
    icon: Headphones,
    title: "Accompagnement dédié",
    description: "Un chef de projet vous accompagne tout au long du processus.",
  },
];

const CustomSection = () => {
  return (
    <section id="custom" className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Sur-mesure</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Besoin d'un projet
                <br />
                <span className="text-gradient-accent">vraiment unique ?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Vous avez des besoins spécifiques qui ne rentrent pas dans nos packs ? 
                Notre option sur-mesure est faite pour vous. Nous développons exactement 
                ce dont vous avez besoin, sans compromis.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-foreground">E-commerce complet</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-foreground">Applications web complexes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-foreground">Plateformes SaaS</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-foreground">Intégrations API avancées</span>
                </div>
              </div>

              <Button variant="accent" size="xl">
                Demander un devis sur-mesure
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Right Content - Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="glass rounded-xl p-6 hover:bg-card/60 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSection;
