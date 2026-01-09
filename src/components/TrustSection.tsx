import { motion } from "framer-motion";
import { Clock, Users, Headphones, Briefcase, ShoppingBag, Rocket, Building } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TrustSection = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: "+150",
      label: t("trust.stats.projects"),
    },
    {
      icon: Clock,
      value: "5-10",
      label: t("trust.stats.delivery"),
    },
    {
      icon: Headphones,
      value: "<24h",
      label: t("trust.stats.response"),
    },
  ];

  const sectors = [
    { name: t("trust.sectors.ecommerce"), icon: ShoppingBag },
    { name: t("trust.sectors.startups"), icon: Rocket },
    { name: t("trust.sectors.sme"), icon: Building },
    { name: t("trust.sectors.services"), icon: Briefcase },
  ];

  return (
    <section className="py-14 md:py-20 border-t border-b border-white/[0.05]">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 mb-12 md:mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2.5 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bebas text-4xl md:text-5xl text-white tracking-tight">{stat.value}</span>
              </div>
              <p className="text-white/40 text-sm font-heebo">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Credibility phrase + sectors */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-white/50 text-sm mb-6 font-heebo max-w-md mx-auto">
            {t("trust.credibility")}
          </p>
          
          {/* Sector icons - premium monochrome */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
                className="group"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.05] group-hover:border-white/[0.1] transition-all duration-300">
                    <sector.icon className="w-6 h-6 text-white/40 group-hover:text-white/60 transition-colors" />
                  </div>
                  <span className="text-[11px] text-white/30 font-heebo group-hover:text-white/50 transition-colors">{sector.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;