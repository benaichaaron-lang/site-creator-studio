import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: "Pack Starter", href: "#packs" },
      { label: "Pack Business", href: "#packs" },
      { label: "Pack Premium", href: "#packs" },
      { label: "Sur-mesure", href: "#custom" },
    ],
    company: [
      { label: "À propos", href: "#" },
      { label: "Comment ça marche", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    legal: [
      { label: "Mentions légales", href: "#" },
      { label: "Politique de confidentialité", href: "#" },
      { label: "Conditions générales", href: "#" },
    ],
  };

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      {/* CTA Banner */}
      <div className="container mx-auto px-4 mb-24">
        <div className="max-w-4xl mx-auto bg-gradient-card rounded-3xl p-8 md:p-12 border border-primary/20 glow-primary">
          <div className="text-center">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Prêt à lancer votre projet ?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Rejoignez les entreprises qui nous font confiance pour leur présence en ligne.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl">
                Créer mon site maintenant
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="heroOutline" size="xl">
                Demander un devis
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M</span>
              </div>
              <span className="font-display font-bold text-xl">
                MySite<span className="text-gradient">Factory</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Des sites web professionnels, livrés rapidement, avec paiement en crypto. 
              Simple, moderne, transparent.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Prêt à travailler avec vous</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} MySiteFactory. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">Paiements acceptés :</span>
            <div className="flex items-center gap-2">
              {["ETH", "BTC", "USDC"].map((crypto) => (
                <div
                  key={crypto}
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-foreground">{crypto[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
