import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const Terms = () => {
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
              Terms of Service
            </h1>

            <div className="prose prose-invert max-w-none space-y-8">
              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">1. Purpose</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service govern the contractual relationship between MySiteFactory 
                  and its clients in the context of providing website creation services.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">2. Services Offered</h2>
                <p className="text-muted-foreground leading-relaxed">
                  MySiteFactory offers website creation services in the form of:
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• <strong className="text-foreground">Starter Pack:</strong> One-page landing page, delivered in 5 days</li>
                  <li>• <strong className="text-foreground">Business Pack:</strong> Website up to 5 pages, delivered in 7 days</li>
                  <li>• <strong className="text-foreground">Premium Pack:</strong> Complete website with unlimited pages, delivered in 10 days</li>
                  <li>• <strong className="text-foreground">Custom:</strong> Personalized projects based on quote</li>
                </ul>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">3. Pricing and Payment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Prices are indicated in cryptocurrency (ETH) with an indication in euros for information purposes. 
                  Payment is made in full before the start of the service. We accept: ETH, BTC, USDC, USDT.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  The transaction is considered validated upon confirmation on the blockchain. 
                  The project starts after receipt and validation of the client brief.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">4. Delivery Times</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Delivery times are guaranteed and start after validation of the client brief and 
                  confirmation of payment. In case of delay attributable to MySiteFactory, compensation 
                  will be offered to the client.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">5. Revisions</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The number of revisions included depends on the chosen pack:
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• Starter Pack: 1 revision</li>
                  <li>• Business Pack: 3 revisions</li>
                  <li>• Premium Pack: unlimited revisions</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Additional revisions are charged at a rate communicated upon request.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">6. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Upon complete delivery and after full payment, the client becomes the owner of the rights 
                  to the delivered website. MySiteFactory reserves the right to mention the project in its portfolio, 
                  unless otherwise agreed.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">7. Hosting</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Hosting is included in all packs:
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>• Starter and Business Pack: 1 year of hosting</li>
                  <li>• Premium Pack: 2 years of hosting</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Hosting renewal is offered at the end of the included period.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">8. Cancellation and Refund</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Due to the nature of cryptocurrency transactions, no refund is possible once payment 
                  is confirmed and the project has started. In case of dispute, MySiteFactory is committed 
                  to finding an amicable solution with the client.
                </p>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h2 className="font-display text-xl font-bold mb-4 text-foreground">9. Applicable Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service are subject to French law. Any dispute relating to their interpretation 
                  or execution falls under the exclusive jurisdiction of the French courts.
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
