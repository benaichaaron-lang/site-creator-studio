import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What's the difference between packs and custom?",
    answer: "Packs are predefined formulas with fixed content and pricing, perfect for standard projects. Custom is for complex projects requiring specific features, unique design, or particular integrations. We then provide a personalized quote after studying your needs.",
  },
  {
    question: "What are the delivery times?",
    answer: "Delivery times vary by chosen plan: Starter Pack in 5 days, Business Pack in 7 days, Premium Pack in 10 days. For custom projects, the timeline is estimated during the quote based on project complexity. These deadlines are guaranteed and start after your brief is validated.",
  },
  {
    question: "How does crypto payment work?",
    answer: "We accept ETH, BTC, USDC, and USDT. After choosing your plan, you receive a unique payment address. Connect your wallet (MetaMask, WalletConnect...), send the indicated amount, and once confirmed on the blockchain, we start your project. Simple, secure, and instant.",
  },
  {
    question: "How many revisions are included?",
    answer: "It depends on the chosen pack: 1 revision for Starter, 3 for Business, and unlimited revisions for Premium. Each revision allows you to request adjustments to design or content. For custom projects, the number of revisions is defined in the quote.",
  },
  {
    question: "Do you offer support after delivery?",
    answer: "Yes! All packs include email support for 30 days after delivery. The Premium pack includes 24/7 priority support for 6 months. Extended maintenance and support options are available as add-ons.",
  },
  {
    question: "Can I modify my site myself after delivery?",
    answer: "Absolutely. We deliver full access to your site. Depending on the chosen technology, you'll have an intuitive CMS to easily modify your content, or we train you on how to use your site if needed.",
  },
  {
    question: "Is hosting included?",
    answer: "Yes, hosting is included in all packs: 1 year for Starter and Business, 2 years for Premium. We take care of everything: deployment, SSL certificate, backups. At the end of the period, you can renew or migrate your site.",
  },
  {
    question: "What happens if I'm not satisfied?",
    answer: "Your satisfaction is our priority. The included revisions allow you to adjust the result. If despite everything the deliverable doesn't match the validated brief, we work with you until we achieve the expected result. Transparency is at the heart of our process.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="glass rounded-xl px-6 border-none data-[state=open]:glow-primary transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-display font-semibold hover:no-underline hover:text-primary py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
