import { motion } from "framer-motion";
import { ArrowRight, Zap, ShoppingCart, Building2, Palette, Code2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Services = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const services = [
    {
      icon: Zap,
      title: t("services.landing.title"),
      description: t("services.landing.description"),
      features: t("services.landing.features") as unknown as string[],
      delay: t("services.landing.delay"),
      price: t("services.landing.price"),
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400",
    },
    {
      icon: ShoppingCart,
      title: t("services.ecommerce.title"),
      description: t("services.ecommerce.description"),
      features: t("services.ecommerce.features") as unknown as string[],
      delay: t("services.ecommerce.delay"),
      price: t("services.ecommerce.price"),
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400",
    },
    {
      icon: Building2,
      title: t("services.vitrine.title"),
      description: t("services.vitrine.description"),
      features: t("services.vitrine.features") as unknown as string[],
      delay: t("services.vitrine.delay"),
      price: t("services.vitrine.price"),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
    },
    {
      icon: Palette,
      title: t("services.portfolio.title"),
      description: t("services.portfolio.description"),
      features: t("services.portfolio.features") as unknown as string[],
      delay: t("services.portfolio.delay"),
      price: t("services.portfolio.price"),
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
    },
    {
      icon: Code2,
      title: t("services.webapp.title"),
      description: t("services.webapp.description"),
      features: t("services.webapp.features") as unknown as string[],
      delay: t("services.webapp.delay"),
      price: t("services.webapp.price"),
      gradient: "from-red-500/20 to-rose-500/20",
      iconColor: "text-red-400",
    },
    {
      icon: Smartphone,
      title: t("services.custom.title"),
      description: t("services.custom.description"),
      features: t("services.custom.features") as unknown as string[],
      delay: t("services.custom.delay"),
      price: t("services.custom.price"),
      gradient: "from-indigo-500/20 to-violet-500/20",
      iconColor: "text-indigo-400",
    },
  ];

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {t("services.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t("services.title")}
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              {t("services.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative p-8 rounded-2xl bg-gradient-to-br ${service.gradient} border border-white/10 hover:border-white/20 transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-xl bg-black/50 flex items-center justify-center mb-6 ${service.iconColor}`}>
                  <service.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-white/60 mb-6 text-sm leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2 mb-8">
                  {Array.isArray(service.features) && service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <p className="text-xs text-white/40 mb-1">{t("services.deliveredIn")}</p>
                    <p className="text-white font-medium">{service.delay}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/40 mb-1">{t("services.from")}</p>
                    <p className="text-primary font-semibold text-lg">{service.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t("services.cta.title")}
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              {t("services.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/packs")}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              >
                {t("services.cta.seePricing")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/contact")}
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                {t("services.cta.contact")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
