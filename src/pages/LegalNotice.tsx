import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const LegalNotice = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">{t("legal.badge")}</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-8">
              {t("legal.title")}
            </h1>

            <div className="prose prose-invert max-w-none space-y-8">
              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("legal.sections.publisher.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("legal.sections.publisher.content")}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  <strong className="text-foreground">{t("legal.sections.publisher.headquarters")}</strong> {t("legal.sections.publisher.toComplete")}<br />
                  <strong className="text-foreground">{t("legal.sections.publisher.email")}</strong> contact@mysitefactory.io<br />
                  <strong className="text-foreground">{t("legal.sections.publisher.director")}</strong> {t("legal.sections.publisher.toComplete")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("legal.sections.hosting.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("legal.sections.hosting.content")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("legal.sections.ip.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("legal.sections.ip.content")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("legal.sections.liability.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("legal.sections.liability.content")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("legal.sections.law.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("legal.sections.law.content")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default LegalNotice;
