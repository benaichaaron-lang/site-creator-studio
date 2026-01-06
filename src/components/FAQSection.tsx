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
    answer: "Packs are predefined formulas with fixed content and pricing, perfect for standard projects. Starter is a single landing page (5 days), Business covers up to 5 pages (7 days), and Premium offers unlimited pages with advanced features (10 days). Custom is for complex projects requiring specific features, unique design, or particular integrations—we provide a personalized quote after studying your needs. All packs include hosting, SSL, and revisions.",
  },
  {
    question: "What are the exact delivery times?",
    answer: "Delivery times are guaranteed and start after your brief is validated and payment confirmed. Starter Pack: 5 business days. Business Pack: 7 business days. Premium Pack: 10 business days. For custom projects, the timeline is estimated during the quote based on project complexity. If we ever miss a deadline, we offer a discount on your next project.",
  },
  {
    question: "How does crypto payment work?",
    answer: "Payment happens only after you validate the brief—never before. We accept ETH, BTC, USDC, and USDT. After brief validation, you receive a unique payment address. Connect your wallet (MetaMask, WalletConnect, Coinbase Wallet), send the indicated amount, and once confirmed on the blockchain (usually 10-30 minutes), we immediately start your project. You receive an invoice and transaction reference for your records.",
  },
  {
    question: "How many revisions are included, and what counts as a revision?",
    answer: "Starter: 1 revision round. Business: 3 revision rounds. Premium: unlimited revisions. A revision is a batch of feedback submitted together—you can request multiple changes in one revision. For example, 'change the header color, update the hero text, and adjust button positioning' counts as 1 revision. We encourage grouping feedback to make the most of your revisions. Minor text typos or broken links are fixed free of charge and don't count as revisions.",
  },
  {
    question: "What happens if I'm not satisfied with the result?",
    answer: "Your satisfaction is our priority. First, use your included revisions to request adjustments—most clients are happy after 1-2 rounds. If the final deliverable doesn't match the validated brief despite revisions, we continue working at no extra cost until it does. We've never had a project where we couldn't find a solution. That said, we don't offer refunds after work has begun, which is why we validate everything in the brief before payment.",
  },
  {
    question: "Can I modify my site myself after delivery?",
    answer: "Yes, absolutely. You get full ownership and access to all source files. Depending on the technology used, you'll either have an intuitive CMS (like WordPress or Webflow) to easily edit text and images yourself, or we provide a brief training session on how to make updates. For code-based sites, we document everything so any developer can make changes in the future.",
  },
  {
    question: "Is hosting included? What happens after it expires?",
    answer: "Yes, hosting is included: 1 year for Starter and Business, 2 years for Premium. We handle deployment, SSL certificate, daily backups, and uptime monitoring. Before expiration, we'll contact you to renew (typically $50-100/year depending on traffic). Alternatively, you can migrate your site to your own hosting—we provide all files and assist with the transfer at no extra charge.",
  },
  {
    question: "Do you offer support after delivery?",
    answer: "Yes! All packs include 30 days of email support after delivery for questions, minor fixes, or guidance. The Premium pack includes 24/7 priority support for 6 months, with a dedicated project manager. After the included period, you can purchase extended support packages starting at $50/month for ongoing maintenance, updates, and priority assistance.",
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
    <section id="faq" className="py-32 relative bg-background">
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
