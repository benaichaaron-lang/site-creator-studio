import { Mail, MessageCircle, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import TrustpilotWidget from "@/components/TrustpilotWidget";
import { BitcoinIcon, EthereumIcon, USDCIcon } from "@/components/CryptoBadge";
import BriefWizard from "@/components/BriefWizard";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-16 lg:py-24 relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">{t("contact.badge")}</span>
              <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl mt-4 mb-6 text-white">
                {t("contact.title")}
                <br />
                <span className="text-primary">{t("contact.titleHighlight")}</span>
              </h2>
              <p className="text-white/60 text-lg mb-10 font-heebo">
                {t("contact.subtitle")}
              </p>

              {/* Contact Options */}
              <div className="space-y-6">
                <motion.a 
                  href="mailto:support@mysitefactory.com"
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center"
                    whileHover={{ rotate: 10 }}
                  >
                    <Mail className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white">{t("contact.email")}</h4>
                    <p className="text-white/60 text-sm">support@mysitefactory.com</p>
                  </div>
                </motion.a>

                <motion.a 
                  href="https://wa.me/13463683103?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20vos%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center"
                    whileHover={{ rotate: -10 }}
                  >
                    <MessageCircle className="w-6 h-6 text-green-500" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white">{t("contact.whatsapp")}</h4>
                    <p className="text-white/60 text-sm">{t("contact.whatsappDesc")}</p>
                  </div>
                </motion.a>

                {/* Crypto Payment Badge */}
                <motion.div
                  className="flex items-center gap-4 bg-gradient-to-r from-amber-500/10 to-primary/10 border border-amber-500/20 rounded-xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm">{t("contact.cryptoPayment.title")}</h4>
                    <p className="text-white/60 text-xs">{t("contact.cryptoPayment.subtitle")}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <BitcoinIcon className="w-5 h-5" />
                    <EthereumIcon className="w-5 h-5" />
                    <USDCIcon className="w-5 h-5" />
                  </div>
                </motion.div>

                {/* Trustpilot Widget */}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <TrustpilotWidget />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Brief Wizard */}
            <motion.div 
              className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BriefWizard />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
