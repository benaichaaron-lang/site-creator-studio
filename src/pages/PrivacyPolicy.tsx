import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
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
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">{t("privacy.badge")}</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-8">
              {t("privacy.title")}
            </h1>

            <div className="prose prose-invert max-w-none space-y-8">
              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("privacy.sections.collection.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("privacy.sections.collection.content")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("privacy.sections.use.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("privacy.sections.use.intro")}
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• {t("privacy.sections.use.purposes.0")}</li>
                  <li>• {t("privacy.sections.use.purposes.1")}</li>
                  <li>• {t("privacy.sections.use.purposes.2")}</li>
                  <li>• {t("privacy.sections.use.purposes.3")}</li>
                </ul>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("privacy.sections.protection.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("privacy.sections.protection.content")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("privacy.sections.cookies.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("privacy.sections.cookies.content")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("privacy.sections.rights.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("privacy.sections.rights.intro")}
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• {t("privacy.sections.rights.list.0")}</li>
                  <li>• {t("privacy.sections.rights.list.1")}</li>
                  <li>• {t("privacy.sections.rights.list.2")}</li>
                  <li>• {t("privacy.sections.rights.list.3")}</li>
                  <li>• {t("privacy.sections.rights.list.4")}</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  {t("privacy.sections.rights.contact")}
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("privacy.sections.retention.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("privacy.sections.retention.content")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
