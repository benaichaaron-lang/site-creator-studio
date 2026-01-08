import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Code, Rocket, Headphones, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CustomSection = () => {
  const { t } = useLanguage();
  
  const benefits = [
    {
      icon: Palette,
      titleKey: "custom.benefits.design.title",
      descKey: "custom.benefits.design.description",
    },
    {
      icon: Code,
      titleKey: "custom.benefits.features.title",
      descKey: "custom.benefits.features.description",
    },
    {
      icon: Rocket,
      titleKey: "custom.benefits.scalable.title",
      descKey: "custom.benefits.scalable.description",
    },
    {
      icon: Headphones,
      titleKey: "custom.benefits.support.title",
      descKey: "custom.benefits.support.description",
    },
  ];

  const listItems = [
    t("custom.projectTypes.0"),
    t("custom.projectTypes.1"),
    t("custom.projectTypes.2"),
    t("custom.projectTypes.3"),
  ];

  return (
    <section id="custom" className="py-16 lg:py-28 relative overflow-hidden bg-black">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(217,91%,50%,0.03),transparent_50%)]" />
      
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
              <span className="text-primary text-xs font-medium uppercase tracking-widest">{t("custom.badge")}</span>
              <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl mt-3 mb-6 text-white tracking-tight">
                {t("custom.title")}
              </h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed font-heebo">
                {t("custom.subtitle")}
              </p>

              <div className="space-y-3 mb-8">
                {listItems.map((item, index) => (
                  <motion.div 
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-white/70 font-heebo">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Response time badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8"
              >
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">{t("custom.responseTime")}</span>
              </motion.div>

              <div>
                <Button 
                  size="lg"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 h-14 rounded-xl shadow-[0_4px_20px_hsl(217,91%,50%,0.25)]"
                >
                  {t("custom.getQuote")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>

            {/* Right Content - Benefits Grid */}
            <motion.div 
              className="grid sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.titleKey}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bebas text-xl text-white mb-2 tracking-tight">{t(benefit.titleKey)}</h3>
                  <p className="text-white/45 text-sm font-heebo leading-relaxed">{t(benefit.descKey)}</p>
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
