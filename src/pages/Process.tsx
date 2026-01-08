import { motion } from "framer-motion";
import { MessageSquare, Palette, Code, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Process = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: t("process.steps.brief.title"),
      description: t("process.steps.brief.description"),
      details: t("process.steps.brief.details") as unknown as string[],
      duration: t("process.steps.brief.duration"),
    },
    {
      number: "02",
      icon: Palette,
      title: t("process.steps.design.title"),
      description: t("process.steps.design.description"),
      details: t("process.steps.design.details") as unknown as string[],
      duration: t("process.steps.design.duration"),
    },
    {
      number: "03",
      icon: Code,
      title: t("process.steps.development.title"),
      description: t("process.steps.development.description"),
      details: t("process.steps.development.details") as unknown as string[],
      duration: t("process.steps.development.duration"),
    },
    {
      number: "04",
      icon: Rocket,
      title: t("process.steps.launch.title"),
      description: t("process.steps.launch.description"),
      details: t("process.steps.launch.details") as unknown as string[],
      duration: t("process.steps.launch.duration"),
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
              {t("process.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t("process.title")}
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              {t("process.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row gap-8 p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  {/* Number & Icon */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl font-bold text-primary/30">{step.number}</span>
                      <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                        <step.icon className="w-7 h-7 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                      <span className="inline-flex px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-white/60 mb-6 leading-relaxed">{step.description}</p>
                    
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Array.isArray(step.details) && step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-[52px] top-full w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent" />
                )}
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
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t("process.cta.title")}
            </h2>
            <p className="text-white/60 mb-8">
              {t("process.cta.subtitle")}
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
            >
              {t("process.cta.button")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Process;
