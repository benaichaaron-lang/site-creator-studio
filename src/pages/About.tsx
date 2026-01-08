import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Zap, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Zap,
      titleKey: "about.values.speed.title",
      descKey: "about.values.speed.description",
    },
    {
      icon: Shield,
      titleKey: "about.values.transparency.title",
      descKey: "about.values.transparency.description",
    },
    {
      icon: Globe,
      titleKey: "about.values.innovation.title",
      descKey: "about.values.innovation.description",
    },
    {
      icon: Users,
      titleKey: "about.values.proximity.title",
      descKey: "about.values.proximity.description",
    },
  ];

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
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">{t("about.badge")}</span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                {t("about.title")}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t("about.intro")}
              </p>
            </div>

            {/* Mission */}
            <motion.div
              className="glass rounded-2xl p-8 md:p-12 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-display text-2xl font-bold mb-6 text-center">{t("about.mission.title")}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed text-center">
                {t("about.mission.content")}
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-display text-2xl font-bold mb-8 text-center">{t("about.values.title")}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.titleKey}
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
                    <h3 className="font-display font-bold text-lg mb-2">{t(value.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(value.descKey)}</p>
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
              <h2 className="font-display text-2xl font-bold mb-6 text-center">{t("about.whyCrypto.title")}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed text-center mb-8">
                {t("about.whyCrypto.content")}
              </p>
              <div className="flex justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/#packs">
                    <Button variant="hero" size="xl">
                      {t("about.whyCrypto.cta")}
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
