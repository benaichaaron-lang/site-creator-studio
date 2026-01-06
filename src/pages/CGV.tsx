import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const CGV = () => {
  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Légal</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-8">
              Conditions générales de vente
            </h1>

            <div className="prose prose-invert max-w-none space-y-8">
              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">1. Objet</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre 
                  MySiteFactory et ses clients dans le cadre de la fourniture de services de création de sites web.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">2. Services proposés</h2>
                <p className="text-muted-foreground leading-relaxed">
                  MySiteFactory propose des services de création de sites web sous forme de :
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• <strong className="text-foreground">Pack Starter :</strong> Landing page one-page, livré en 5 jours</li>
                  <li>• <strong className="text-foreground">Pack Business :</strong> Site jusqu'à 5 pages, livré en 7 jours</li>
                  <li>• <strong className="text-foreground">Pack Premium :</strong> Site complet avec pages illimitées, livré en 10 jours</li>
                  <li>• <strong className="text-foreground">Sur-mesure :</strong> Projets personnalisés selon devis</li>
                </ul>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">3. Prix et paiement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les prix sont indiqués en cryptomonnaie (ETH) avec une indication en euros à titre informatif. 
                  Le paiement s'effectue intégralement avant le début de la prestation. Nous acceptons : ETH, BTC, USDC, USDT.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  La transaction est considérée comme validée dès confirmation sur la blockchain. 
                  Le projet démarre après réception et validation du brief client.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">4. Délais de livraison</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les délais de livraison sont garantis et démarrent après validation du brief client et 
                  confirmation du paiement. En cas de retard imputable à MySiteFactory, une compensation 
                  sera proposée au client.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">5. Révisions</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le nombre de révisions incluses dépend du pack choisi :
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• Pack Starter : 1 révision</li>
                  <li>• Pack Business : 3 révisions</li>
                  <li>• Pack Premium : révisions illimitées</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Les révisions supplémentaires sont facturées selon un tarif communiqué sur demande.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">6. Propriété intellectuelle</h2>
                <p className="text-muted-foreground leading-relaxed">
                  À la livraison complète et après paiement intégral, le client devient propriétaire des droits 
                  sur le site web livré. MySiteFactory conserve le droit de mentionner le projet dans son portfolio, 
                  sauf accord contraire.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">7. Hébergement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  L'hébergement est inclus dans tous les packs :
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• Pack Starter et Business : 1 an d'hébergement</li>
                  <li>• Pack Premium : 2 ans d'hébergement</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Le renouvellement de l'hébergement est proposé à l'issue de la période incluse.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">8. Annulation et remboursement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  En raison de la nature des transactions en cryptomonnaie, aucun remboursement n'est possible 
                  une fois le paiement confirmé et le projet démarré. En cas de litige, MySiteFactory s'engage 
                  à trouver une solution amiable avec le client.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">9. Droit applicable</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les présentes CGV sont soumises au droit français. Tout litige relatif à leur interprétation 
                  ou leur exécution relève de la compétence exclusive des tribunaux français.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CGV;
