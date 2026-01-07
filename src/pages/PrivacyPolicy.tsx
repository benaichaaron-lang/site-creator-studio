import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Legal</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-8">
              Privacy Policy
            </h1>

            <div className="prose prose-invert max-w-none space-y-8">
              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">1. Data Collection</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect personal data that you voluntarily provide when using our services: 
                  name, email address, project information. This data is necessary for the execution 
                  of our services and the management of our business relationship.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">2. Use of Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your personal data is used to:
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• Process your orders and deliver your projects</li>
                  <li>• Communicate with you regarding your project</li>
                  <li>• Improve our services and your user experience</li>
                  <li>• Comply with our legal and regulatory obligations</li>
                </ul>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">3. Data Protection</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate security measures to protect your personal data against 
                  unauthorized access, modification, disclosure or destruction. Cryptocurrency 
                  transactions are secured by blockchain technology.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">4. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website uses cookies to improve your browsing experience. Cookies are small 
                  text files stored on your device. You can configure your browser to refuse cookies, 
                  but this may affect some features of the site.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">5. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In accordance with GDPR, you have the following rights:
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• Right of access to your personal data</li>
                  <li>• Right to rectification of inaccurate data</li>
                  <li>• Right to erasure of your data</li>
                  <li>• Right to data portability</li>
                  <li>• Right to object to processing</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  To exercise these rights, contact us at: contact@mysitefactory.io
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">6. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your personal data is retained for the duration necessary to fulfill the purposes 
                  for which it was collected, and in compliance with applicable legal obligations.
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
