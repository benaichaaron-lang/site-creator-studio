import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { MessageCircle, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const FAQSection = () => {
  const { t } = useLanguage();
  
  // Get FAQ questions from translations
  const faqQuestions = [
    { question: t("faq.questions.0.question"), answer: t("faq.questions.0.answer") },
    { question: t("faq.questions.1.question"), answer: t("faq.questions.1.answer") },
    { question: t("faq.questions.2.question"), answer: t("faq.questions.2.answer") },
    { question: t("faq.questions.3.question"), answer: t("faq.questions.3.answer") },
    { question: t("faq.questions.4.question"), answer: t("faq.questions.4.answer") },
    { question: t("faq.questions.5.question"), answer: t("faq.questions.5.answer") },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 lg:py-32 relative bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(217,91%,50%,0.02),transparent_60%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-montserrat text-primary text-xs uppercase tracking-widest">{t("faq.badge")}</span>
          <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl text-white mt-3 mb-4 tracking-tight">
            {t("faq.title")}
          </h2>
          <p className="text-white/40 font-heebo">
            {t("faq.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
          {/* FAQ Accordion */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqQuestions.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 data-[state=open]:border-primary/20 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-medium hover:no-underline hover:text-primary py-5 text-white text-[15px] font-heebo">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/50 pb-5 leading-relaxed text-sm font-heebo">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Reassurance sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4 lg:sticky lg:top-24 self-start"
          >
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
              <h4 className="font-bebas text-lg text-white mb-4 tracking-tight">{t("faq.needHelp")}</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-white/70 font-heebo">{t("faq.avgResponse")}</p>
                    <p className="text-xs text-white/40">{t("faq.under24h")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-white/70 font-heebo">{t("faq.satisfaction")}</p>
                    <p className="text-xs text-white/40">{t("faq.satisfactionDesc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-white/70 font-heebo">{t("faq.guaranteedDelivery")}</p>
                    <p className="text-xs text-white/40">{t("faq.deliveryDesc")}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-3 px-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-sm font-medium hover:bg-primary/15 transition-colors"
            >
              {t("faq.anotherQuestion")}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
