import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Zap, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Zap,
    title: "Rapidité",
    description: "Des délais de livraison garantis pour que vous puissiez lancer votre projet rapidement.",
  },
  {
    icon: Shield,
    title: "Transparence",
    description: "Des prix clairs, un processus simple, et une communication directe à chaque étape.",
  },
  {
    icon: Globe,
    title: "Innovation",
    description: "Nous embrassons les nouvelles technologies : crypto, web3, et les dernières tendances du web.",
  },
  {
    icon: Users,
    title: "Proximité",
    description: "Une équipe à votre écoute qui vous accompagne de A à Z dans votre projet.",
  },
];

const About = () => {
  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">À propos</span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Qui sommes-nous ?
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                MySiteFactory est né d'une vision simple : rendre la création de sites web professionnels 
                accessible, rapide et transparente.
              </p>
            </div>

            {/* Mission */}
            <motion.div
              className="glass rounded-2xl p-8 md:p-12 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-display text-2xl font-bold mb-6 text-center">Notre mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed text-center">
                Nous croyons que chaque entreprise mérite une présence en ligne de qualité, sans les 
                complications habituelles des agences traditionnelles. Notre approche productisée 
                permet de livrer des sites web modernes et performants en un temps record, avec 
                un processus simple et des prix transparents.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-display text-2xl font-bold mb-8 text-center">Nos valeurs</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    className="glass rounded-xl p-6 hover:bg-card/60 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <value.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h3 className="font-display font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Why Crypto */}
            <motion.div
              className="mt-16 glass rounded-2xl p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="font-display text-2xl font-bold mb-6 text-center">Pourquoi la crypto ?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed text-center mb-8">
                Nous avons choisi d'accepter les paiements en cryptomonnaie car nous croyons en l'avenir 
                de cette technologie. Elle offre des transactions sécurisées, transparentes et sans 
                frontières, parfaitement alignées avec notre vision d'un web moderne et accessible.
              </p>
              <div className="flex justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/#packs">
                    <Button variant="hero" size="xl">
                      Découvrir nos offres
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
