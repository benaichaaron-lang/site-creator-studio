import { motion } from "framer-motion";
import { Target, Sparkles, Shield, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Agency = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const values = [
    {
      icon: Target,
      title: t("agency.values.precision.title"),
      description: t("agency.values.precision.description"),
    },
    {
      icon: Sparkles,
      title: t("agency.values.quality.title"),
      description: t("agency.values.quality.description"),
    },
    {
      icon: Shield,
      title: t("agency.values.trust.title"),
      description: t("agency.values.trust.description"),
    },
    {
      icon: Zap,
      title: t("agency.values.speed.title"),
      description: t("agency.values.speed.description"),
    },
  ];

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {t("agency.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              {t("agency.title")}
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              {t("agency.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-10 md:p-16 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="px-4 py-1.5 rounded-full bg-primary text-white text-sm font-medium">
                  {t("agency.mission.badge")}
                </span>
              </div>
              <p className="text-xl md:text-2xl text-white/90 text-center leading-relaxed font-light">
                "{t("agency.mission.text")}"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("agency.valuesTitle")}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              {t("agency.valuesSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-white/60 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t("agency.approach.title")}
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                {t("agency.approach.text")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/process")}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6"
                >
                  {t("agency.approach.cta")}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/portfolio")}
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-6"
                >
                  {t("agency.approach.portfolio")}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Agency;
