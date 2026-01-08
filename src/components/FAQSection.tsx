import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { MessageCircle, Shield, Clock } from "lucide-react";

const faqs = [
  {
    question: "Quelle est la différence entre les packs et le sur-mesure ?",
    answer: "Les packs sont des formules prédéfinies avec contenu et tarif fixes, parfaits pour les projets standards. Starter est une landing page (5 jours), Business couvre jusqu'à 5 pages (7 jours), et Premium offre des pages illimitées avec fonctionnalités avancées (10 jours). Le sur-mesure est pour les projets complexes nécessitant des fonctionnalités spécifiques, un design unique ou des intégrations particulières—nous fournissons un devis personnalisé après étude de vos besoins.",
  },
  {
    question: "Quels sont les délais de livraison exacts ?",
    answer: "Les délais sont garantis et démarrent après validation du brief et confirmation du paiement. Starter Pack : 5 jours ouvrés. Business Pack : 7 jours ouvrés. Premium Pack : 10 jours ouvrés. Pour les projets sur-mesure, le délai est estimé lors du devis selon la complexité du projet.",
  },
  {
    question: "Comment fonctionne le paiement crypto ?",
    answer: "Le paiement intervient uniquement après validation du brief—jamais avant. Nous acceptons ETH, BTC, USDC et USDT. Après validation du brief, vous recevez une adresse de paiement unique. Connectez votre wallet (MetaMask, WalletConnect, Coinbase Wallet), envoyez le montant indiqué, et une fois confirmé sur la blockchain (10-30 minutes généralement), nous démarrons immédiatement votre projet.",
  },
  {
    question: "Combien de révisions sont incluses ?",
    answer: "Starter : 1 cycle de révision. Business : 3 cycles de révision. Premium : révisions illimitées. Une révision est un lot de retours soumis ensemble—vous pouvez demander plusieurs modifications en une révision. Les corrections de fautes de frappe ou liens cassés sont corrigés gratuitement et ne comptent pas comme révisions.",
  },
  {
    question: "Que se passe-t-il si je ne suis pas satisfait ?",
    answer: "Votre satisfaction est notre priorité. D'abord, utilisez vos révisions incluses pour demander des ajustements—la plupart des clients sont satisfaits après 1-2 cycles. Si le livrable final ne correspond pas au brief validé malgré les révisions, nous continuons à travailler sans coût supplémentaire jusqu'à satisfaction.",
  },
  {
    question: "L'hébergement est-il inclus ?",
    answer: "Oui, l'hébergement est inclus : 1 an pour Starter et Business, 2 ans pour Premium. Nous gérons le déploiement, le certificat SSL, les sauvegardes quotidiennes et le monitoring. Avant expiration, nous vous contactons pour le renouvellement (généralement 50-100€/an selon le trafic).",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24 lg:py-32 relative bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(217,91%,50%,0.02),transparent_60%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-montserrat text-primary text-xs uppercase tracking-widest">FAQ</span>
          <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl text-white mt-3 mb-4 tracking-tight">
            Questions fréquentes
          </h2>
          <p className="text-white/40 font-heebo">
            Des réponses claires pour vous aider à décider.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
          {/* FAQ Accordion */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 data-[state=open]:border-primary/20 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-medium hover:no-underline hover:text-primary py-5 text-white text-[15px] font-heebo">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/50 pb-5 leading-relaxed text-sm font-heebo">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Reassurance sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4 lg:sticky lg:top-24 self-start"
          >
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
              <h4 className="font-bebas text-lg text-white mb-4 tracking-tight">Besoin d'aide ?</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-white/70 font-heebo">Réponse moyenne</p>
                    <p className="text-xs text-white/40">sous 24h</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-white/70 font-heebo">Satisfaction garantie</p>
                    <p className="text-xs text-white/40">ou on continue gratuitement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-white/70 font-heebo">Délais garantis</p>
                    <p className="text-xs text-white/40">5-10 jours selon le pack</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-3 px-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-sm font-medium hover:bg-primary/15 transition-colors"
            >
              Une autre question ?
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
