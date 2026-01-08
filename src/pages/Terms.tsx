import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Terms = () => {
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
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">{t("terms.badge")}</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-8">
              {t("terms.title")}
            </h1>

            <div className="prose prose-invert max-w-none space-y-8">
              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("terms.sections.purpose.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.sections.purpose.content")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("terms.sections.services.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.sections.services.intro")}
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• <strong className="text-foreground">Starter Pack:</strong> {t("terms.sections.services.starter")}</li>
                  <li>• <strong className="text-foreground">Business Pack:</strong> {t("terms.sections.services.business")}</li>
                  <li>• <strong className="text-foreground">Premium Pack:</strong> {t("terms.sections.services.premium")}</li>
                  <li>• <strong className="text-foreground">Custom:</strong> {t("terms.sections.services.custom")}</li>
                </ul>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("terms.sections.pricing.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.sections.pricing.content1")}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  {t("terms.sections.pricing.content2")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("terms.sections.delivery.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.sections.delivery.content")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("terms.sections.revisions.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.sections.revisions.intro")}
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• {t("terms.sections.revisions.starter")}</li>
                  <li>• {t("terms.sections.revisions.business")}</li>
                  <li>• {t("terms.sections.revisions.premium")}</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  {t("terms.sections.revisions.additional")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("terms.sections.ip.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.sections.ip.content")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("terms.sections.hosting.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.sections.hosting.intro")}
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• {t("terms.sections.hosting.starterBusiness")}</li>
                  <li>• {t("terms.sections.hosting.premium")}</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  {t("terms.sections.hosting.renewal")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("terms.sections.refund.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.sections.refund.content")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("terms.sections.law.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.sections.law.content")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
