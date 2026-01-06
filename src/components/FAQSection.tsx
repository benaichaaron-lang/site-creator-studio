import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quelle est la différence entre les packs et le sur-mesure ?",
    answer: "Les packs sont des formules prédéfinies avec un contenu et un prix fixe, parfaites pour des projets standards. Le sur-mesure s'adresse aux projets complexes nécessitant des fonctionnalités spécifiques, un design unique ou des intégrations particulières. Nous établissons alors un devis personnalisé après étude de vos besoins.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Les délais varient selon la formule choisie : Pack Starter en 5 jours, Pack Business en 7 jours, Pack Premium en 10 jours. Pour les projets sur-mesure, le délai est estimé lors du devis en fonction de la complexité du projet. Ces délais sont garantis et démarrent après validation de votre brief.",
  },
  {
    question: "Comment fonctionne le paiement en crypto ?",
    answer: "Nous acceptons ETH, BTC, USDC et USDT. Après avoir choisi votre formule, vous recevez une adresse de paiement unique. Connectez votre wallet (MetaMask, WalletConnect...), envoyez le montant indiqué, et dès confirmation sur la blockchain, nous démarrons votre projet. C'est simple, sécurisé et instantané.",
  },
  {
    question: "Combien de révisions sont incluses ?",
    answer: "Cela dépend du pack choisi : 1 révision pour Starter, 3 pour Business, et révisions illimitées pour Premium. Chaque révision vous permet de demander des ajustements sur le design ou le contenu. Pour le sur-mesure, le nombre de révisions est défini dans le devis.",
  },
  {
    question: "Proposez-vous un support après la livraison ?",
    answer: "Oui ! Tous les packs incluent un support par email pendant 30 jours après livraison. Le pack Premium inclut un support prioritaire 24/7 pendant 6 mois. Des options de maintenance et support étendu sont disponibles en supplément.",
  },
  {
    question: "Puis-je modifier mon site moi-même après livraison ?",
    answer: "Absolument. Nous vous livrons l'accès complet à votre site. Selon la technologie choisie, vous aurez un CMS intuitif pour modifier vos contenus facilement, ou nous vous formons à l'utilisation de votre site si nécessaire.",
  },
  {
    question: "L'hébergement est-il inclus ?",
    answer: "Oui, l'hébergement est inclus dans tous les packs : 1 an pour Starter et Business, 2 ans pour Premium. Nous nous occupons de tout : mise en ligne, certificat SSL, sauvegardes. À l'issue de la période, vous pouvez renouveler ou migrer votre site.",
  },
  {
    question: "Que se passe-t-il si je ne suis pas satisfait ?",
    answer: "Votre satisfaction est notre priorité. Les révisions incluses vous permettent d'ajuster le résultat. Si malgré tout le livrable ne correspond pas au brief validé, nous travaillons avec vous jusqu'à obtenir le résultat attendu. La transparence est au cœur de notre processus.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground">
            Tout ce que vous devez savoir avant de commencer.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass rounded-xl px-6 border-none data-[state=open]:glow-primary transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-display font-semibold hover:no-underline hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
