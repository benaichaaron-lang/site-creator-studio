import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const LegalNotice = () => {
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
              Legal Notice
            </h1>

            <div className="prose prose-invert max-w-none space-y-8">
              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">1. Site Publisher</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The MySiteFactory website is published by MySiteFactory SAS, a simplified joint-stock company 
                  with a capital of €10,000, registered in the Paris Trade and Companies Register under 
                  number RCS PARIS XXX XXX XXX.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  <strong className="text-foreground">Headquarters:</strong> [Address to be completed]<br />
                  <strong className="text-foreground">Email:</strong> contact@mysitefactory.io<br />
                  <strong className="text-foreground">Publication Director:</strong> [Name to be completed]
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">2. Hosting</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, United States.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">3. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on this website (texts, images, graphics, logo, icons, sounds, software, etc.) 
                  is the exclusive property of MySiteFactory or its partners. Any reproduction, representation, 
                  modification, publication, transmission or alteration of the site or its content, by any means 
                  whatsoever, is prohibited without prior authorization.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">4. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  MySiteFactory cannot be held responsible for direct or indirect damages caused to the user's 
                  equipment when accessing the site. MySiteFactory declines all responsibility for the use 
                  that may be made of the information and content present on the site.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">5. Applicable Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This website and its legal notices are governed by French law. 
                  In case of dispute, the French courts will have sole jurisdiction.
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
