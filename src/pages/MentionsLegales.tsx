import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const MentionsLegales = () => {
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
              Mentions légales
            </h1>

            <div className="prose prose-invert max-w-none space-y-8">
              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">1. Éditeur du site</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le site MySiteFactory est édité par la société MySiteFactory SAS, société par actions simplifiée 
                  au capital de 10 000€, immatriculée au Registre du Commerce et des Sociétés de Paris sous le 
                  numéro RCS PARIS XXX XXX XXX.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  <strong className="text-foreground">Siège social :</strong> [Adresse à compléter]<br />
                  <strong className="text-foreground">Email :</strong> contact@mysitefactory.io<br />
                  <strong className="text-foreground">Directeur de publication :</strong> [Nom à compléter]
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">2. Hébergement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">3. Propriété intellectuelle</h2>
                <p className="text-muted-foreground leading-relaxed">
                  L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) 
                  est la propriété exclusive de MySiteFactory ou de ses partenaires. Toute reproduction, représentation, 
                  modification, publication, transmission ou dénaturation du site ou de son contenu, par quelque procédé 
                  que ce soit, est interdite sans autorisation préalable.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">4. Limitation de responsabilité</h2>
                <p className="text-muted-foreground leading-relaxed">
                  MySiteFactory ne saurait être tenu responsable des dommages directs ou indirects causés au matériel 
                  de l'utilisateur lors de l'accès au site. MySiteFactory décline toute responsabilité quant à 
                  l'utilisation qui pourrait être faite des informations et contenus présents sur le site.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">5. Droit applicable</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le présent site et les mentions légales qui y figurent sont régis par le droit français. 
                  En cas de litige, les tribunaux français seront seuls compétents.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default MentionsLegales;
