import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowUpRight, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      category: t("portfolio.categories.ecommerce"),
      delay: t("portfolio.delays.days7"),
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
      category: t("portfolio.categories.business"),
      delay: t("portfolio.delays.days5"),
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=500&fit=crop",
      category: t("portfolio.categories.landing"),
      delay: t("portfolio.delays.days5"),
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=500&fit=crop",
      category: t("portfolio.categories.webapp"),
      delay: t("portfolio.delays.days10"),
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop",
      category: t("portfolio.categories.ecommerce"),
      delay: t("portfolio.delays.days7"),
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=500&fit=crop",
      category: t("portfolio.categories.business"),
      delay: t("portfolio.delays.days7"),
    },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-24 md:pb-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              {t("portfolio.badge")}
            </span>
            <h1 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-6">
              {t("portfolio.title")}
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              {t("portfolio.subtitle")}
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-500">
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${t("portfolio.project")} ${project.id}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-primary text-xs font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-white/60 text-xs">
                        <Clock className="w-3 h-3" />
                        {project.delay}
                      </div>
                    </div>
                    <h3 className="font-bebas text-xl text-white mb-1">
                      {t("portfolio.project")} {project.id}
                    </h3>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-16 md:mt-20"
          >
            <p className="text-white/50 mb-6">{t("portfolio.cta.text")}</p>
            <Button
              onClick={() => navigate("/")}
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl"
            >
              {t("portfolio.cta.button")}
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
