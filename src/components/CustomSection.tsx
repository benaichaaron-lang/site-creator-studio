import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Code, Rocket, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Palette,
    title: "Unique design",
    description: "A design created specifically for your brand and needs.",
  },
  {
    icon: Code,
    title: "Custom features",
    description: "Development of personalized features without limits.",
  },
  {
    icon: Rocket,
    title: "Scalability",
    description: "Architecture designed to support your growth.",
  },
  {
    icon: Headphones,
    title: "Dedicated support",
    description: "A project manager supports you throughout the process.",
  },
];

const listItems = [
  "Complete e-commerce",
  "Complex web applications",
  "SaaS platforms",
  "Advanced API integrations",
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
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Custom</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Need a project
                <br />
                <span className="text-gradient-accent">that's truly unique?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Have specific needs that don't fit our packs? 
                Our custom option is made for you. We develop exactly 
                what you need, without compromise.
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
                      className="w-2 h-2 rounded-full bg-accent"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    />
                    <span className="text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="accent" size="xl">
                  Request a custom quote
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
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
                  className="glass rounded-xl p-6 hover:bg-card/60 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </motion.div>
                  <h3 className="font-display font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
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
