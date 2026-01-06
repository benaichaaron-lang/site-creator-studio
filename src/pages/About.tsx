import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Zap, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Zap,
    title: "Speed",
    description: "Guaranteed delivery times so you can launch your project quickly.",
  },
  {
    icon: Shield,
    title: "Transparency",
    description: "Clear pricing, simple process, and direct communication at every step.",
  },
  {
    icon: Globe,
    title: "Innovation",
    description: "We embrace new technologies: crypto, web3, and the latest web trends.",
  },
  {
    icon: Users,
    title: "Proximity",
    description: "A team that listens and supports you from A to Z in your project.",
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
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">About</span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Who are we?
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                MySiteFactory was born from a simple vision: to make professional website creation 
                accessible, fast, and transparent.
              </p>
            </div>

            {/* Mission */}
            <motion.div
              className="glass rounded-2xl p-8 md:p-12 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-display text-2xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed text-center">
                We believe every business deserves a quality online presence, without the usual 
                complications of traditional agencies. Our productized approach allows us to 
                deliver modern and performant websites in record time, with a simple process 
                and transparent pricing.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-display text-2xl font-bold mb-8 text-center">Our Values</h2>
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
              <h2 className="font-display text-2xl font-bold mb-6 text-center">Why Crypto?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed text-center mb-8">
                We chose to accept cryptocurrency payments because we believe in the future of this 
                technology. It offers secure, transparent, and borderless transactions, perfectly 
                aligned with our vision of a modern and accessible web.
              </p>
              <div className="flex justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/#packs">
                    <Button variant="hero" size="xl">
                      Discover our offers
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
