import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Code, Rocket, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Palette,
    title: "Design unique",
    description: "Un design créé spécifiquement pour votre marque et vos besoins.",
  },
  {
    icon: Code,
    title: "Fonctionnalités sur-mesure",
    description: "Développement de fonctionnalités personnalisées sans limites.",
  },
  {
    icon: Rocket,
    title: "Évolutivité",
    description: "Architecture conçue pour accompagner votre croissance.",
  },
  {
    icon: Headphones,
    title: "Support dédié",
    description: "Un chef de projet vous accompagne tout au long du processus.",
  },
];

const listItems = [
  "E-commerce complet",
  "Applications web complexes",
  "Plateformes SaaS",
  "Intégrations API avancées",
];

const CustomSection = () => {
  return (
    <section id="custom" className="py-16 lg:py-28 relative overflow-hidden bg-black">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--primary)/0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-sm font-medium uppercase tracking-wider">Projets sur-mesure</span>
              <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl mt-4 mb-6 text-white">
                Besoin de quelque chose de plus spécifique ?
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed font-heebo">
                Pour les projets nécessitant des fonctionnalités personnalisées, 
                des intégrations uniques ou un développement spécialisé, 
                nous proposons des solutions sur-mesure avec un devis dédié.
              </p>

              <div className="space-y-4 mb-10">
                {listItems.map((item, index) => (
                  <motion.div 
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    />
                    <span className="text-white font-heebo">{item}</span>
                  </motion.div>
                ))}
              </div>

              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-2 border-white/20 text-white hover:bg-white/10"
              >
                Discutons de votre projet
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Right Content - Benefits Grid */}
            <motion.div 
              className="grid sm:grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="font-bebas text-xl text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/60 text-sm font-heebo">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSection;