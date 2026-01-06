import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const PolitiqueConfidentialite = () => {
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
              Politique de confidentialité
            </h1>

            <div className="prose prose-invert max-w-none space-y-8">
              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">1. Collecte des données</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nous collectons les données personnelles que vous nous fournissez volontairement lors de l'utilisation 
                  de nos services : nom, adresse email, informations de projet. Ces données sont nécessaires à 
                  l'exécution de nos prestations et à la gestion de notre relation commerciale.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">2. Utilisation des données</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vos données personnelles sont utilisées pour :
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• Traiter vos commandes et livrer vos projets</li>
                  <li>• Communiquer avec vous concernant votre projet</li>
                  <li>• Améliorer nos services et votre expérience utilisateur</li>
                  <li>• Respecter nos obligations légales et réglementaires</li>
                </ul>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">3. Protection des données</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles 
                  contre tout accès non autorisé, modification, divulgation ou destruction. Les transactions 
                  en cryptomonnaie sont sécurisées par la technologie blockchain.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">4. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont 
                  de petits fichiers texte stockés sur votre appareil. Vous pouvez configurer votre navigateur 
                  pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">5. Vos droits</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• Droit d'accès à vos données personnelles</li>
                  <li>• Droit de rectification des données inexactes</li>
                  <li>• Droit à l'effacement de vos données</li>
                  <li>• Droit à la portabilité de vos données</li>
                  <li>• Droit d'opposition au traitement</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Pour exercer ces droits, contactez-nous à : contact@mysitefactory.io
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">6. Conservation des données</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vos données personnelles sont conservées pendant la durée nécessaire à la réalisation des 
                  finalités pour lesquelles elles ont été collectées, et en conformité avec les obligations 
                  légales applicables.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PolitiqueConfidentialite;
