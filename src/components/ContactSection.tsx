import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mail, MessageCircle, CheckCircle, Loader2, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactSection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    recommendation: "",
    websiteType: "",
    budget: "",
    timeline: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{firstName?: string; lastName?: string; phone?: string; websiteType?: string; budget?: string; timeline?: string}>({});

  // Check for pre-selected pack from PacksSection
  useEffect(() => {
    const selectedPack = sessionStorage.getItem('selectedPack');
    if (selectedPack) {
      setFormData(prev => ({ ...prev, budget: selectedPack }));
      sessionStorage.removeItem('selectedPack');
    }
  }, []);

  const validateForm = () => {
    const newErrors: {firstName?: string; lastName?: string; phone?: string; websiteType?: string; budget?: string; timeline?: string} = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = t("contact.errors.firstName");
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t("contact.errors.lastName");
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t("contact.errors.phone");
    }
    if (!formData.websiteType) {
      newErrors.websiteType = t("contact.errors.websiteType");
    }
    if (!formData.budget) {
      newErrors.budget = t("contact.errors.budget");
    }
    if (!formData.timeline) {
      newErrors.timeline = t("contact.errors.timeline");
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: t("hero.errors.missing"),
        description: t("hero.errors.missingDesc"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xvzgebre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          phone: formData.phone.trim(),
          recommendation: formData.recommendation.trim() || null,
          websiteType: formData.websiteType,
          budget: formData.budget,
          timeline: formData.timeline,
        }),
      });

      if (!response.ok) {
        toast({
          title: t("contact.toasts.failed"),
          description: t("contact.toasts.failedDesc"),
          variant: "destructive",
        });
        return;
      }

      setIsSubmitted(true);
      
      toast({
        title: t("contact.toasts.sent"),
        description: t("contact.toasts.sentDesc"),
      });

      setTimeout(() => {
        setFormData({ firstName: "", lastName: "", phone: "", recommendation: "", websiteType: "", budget: "", timeline: "" });
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      toast({
        title: t("contact.toasts.failed"),
        description: t("contact.toasts.failedDesc"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  href="https://wa.me/33600000000?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20vos%20services"
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
              </div>
            </motion.div>

            {/* Right Content - Form */}
            <motion.div 
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </motion.div>
                    <h3 className="font-bebas text-2xl text-white mb-2">{t("contact.form.success.title")}</h3>
                    <p className="text-white/60 mb-6 font-heebo">
                      {t("contact.form.success.message")}
                    </p>
                    
                    <div className="w-full border-t border-white/10 pt-6">
                      <p className="text-sm text-white/60 mb-4 font-heebo">{t("contact.form.success.createAccount")}</p>
                      <Button 
                        onClick={() => navigate('/auth', { state: { firstName: formData.firstName, lastName: formData.lastName, phone: formData.phone } })}
                        className="w-full"
                        variant="outline"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        {t("contact.form.success.createAccountBtn")}
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="text-sm font-medium mb-2 block text-white/80 font-heebo">
                          {t("contact.form.firstName")} <span className="text-red-400">*</span>
                        </label>
                        <Input
                          placeholder="Jean"
                          value={formData.firstName}
                          onChange={(e) => {
                            setFormData({ ...formData, firstName: e.target.value });
                            setErrors(prev => ({ ...prev, firstName: undefined }));
                          }}
                          className={`bg-white/5 border-white/10 text-white focus:border-primary transition-all duration-300 ${errors.firstName ? 'border-red-400' : ''}`}
                        />
                        {errors.firstName && (
                          <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                        )}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35 }}
                      >
                        <label className="text-sm font-medium mb-2 block text-white/80 font-heebo">
                          {t("contact.form.lastName")} <span className="text-red-400">*</span>
                        </label>
                        <Input
                          placeholder="Dupont"
                          value={formData.lastName}
                          onChange={(e) => {
                            setFormData({ ...formData, lastName: e.target.value });
                            setErrors(prev => ({ ...prev, lastName: undefined }));
                          }}
                          className={`bg-white/5 border-white/10 text-white focus:border-primary transition-all duration-300 ${errors.lastName ? 'border-red-400' : ''}`}
                        />
                        {errors.lastName && (
                          <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                        )}
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="text-sm font-medium mb-2 block text-white/80 font-heebo">
                        {t("contact.form.phone")} <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          setErrors(prev => ({ ...prev, phone: undefined }));
                        }}
                        className={`bg-white/5 border-white/10 text-white focus:border-primary transition-all duration-300 ${errors.phone ? 'border-red-400' : ''}`}
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.45 }}
                    >
                      <label className="text-sm font-medium mb-2 block text-white/80 font-heebo">
                        {t("contact.form.recommendation")} <span className="text-white/40">({t("contact.form.optional")})</span>
                      </label>
                      <Input
                        placeholder={t("contact.form.recommendationPlaceholder")}
                        value={formData.recommendation}
                        onChange={(e) => setFormData({ ...formData, recommendation: e.target.value })}
                        className="bg-white/5 border-white/10 text-white focus:border-primary transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="text-sm font-medium mb-2 block text-white/80 font-heebo">
                        {t("contact.form.websiteType")} <span className="text-red-400">*</span>
                      </label>
                      <Select 
                        value={formData.websiteType} 
                        onValueChange={(value) => {
                          setFormData({ ...formData, websiteType: value });
                          setErrors(prev => ({ ...prev, websiteType: undefined }));
                        }}
                      >
                        <SelectTrigger className={`bg-white/5 border-white/10 text-white ${errors.websiteType ? 'border-red-400' : ''}`}>
                          <SelectValue placeholder={t("contact.form.selectType")} />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border">
                          <SelectItem value="landing">{t("hero.websiteTypes.landing")}</SelectItem>
                          <SelectItem value="ecommerce">{t("hero.websiteTypes.ecommerce")}</SelectItem>
                          <SelectItem value="business">{t("hero.websiteTypes.business")}</SelectItem>
                          <SelectItem value="portfolio">{t("hero.websiteTypes.portfolio")}</SelectItem>
                          <SelectItem value="webapp">{t("hero.websiteTypes.webapp")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.websiteType && (
                        <p className="text-red-400 text-xs mt-1">{errors.websiteType}</p>
                      )}
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.55 }}
                      >
                        <label className="text-sm font-medium mb-2 block text-white/80 font-heebo">
                          {t("contact.form.budget")} <span className="text-red-400">*</span>
                        </label>
                        <Select 
                          value={formData.budget} 
                          onValueChange={(value) => {
                            setFormData({ ...formData, budget: value });
                            setErrors(prev => ({ ...prev, budget: undefined }));
                          }}
                        >
                          <SelectTrigger className={`bg-white/5 border-white/10 text-white ${errors.budget ? 'border-red-400' : ''}`}>
                            <SelectValue placeholder={t("contact.form.budget")} />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border">
                            <SelectItem value="starter">Starter ({t("hero.budgetOptions.starter")})</SelectItem>
                            <SelectItem value="business">Business ({t("hero.budgetOptions.business")})</SelectItem>
                            <SelectItem value="premium">Premium ({t("hero.budgetOptions.premium")})</SelectItem>
                            <SelectItem value="unsure">{t("hero.budgetOptions.unsure")}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.budget && (
                          <p className="text-red-400 text-xs mt-1">{errors.budget}</p>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                      >
                        <label className="text-sm font-medium mb-2 block text-white/80 font-heebo">
                          {t("contact.form.timeline")} <span className="text-red-400">*</span>
                        </label>
                        <Select 
                          value={formData.timeline} 
                          onValueChange={(value) => {
                            setFormData({ ...formData, timeline: value });
                            setErrors(prev => ({ ...prev, timeline: undefined }));
                          }}
                        >
                          <SelectTrigger className={`bg-white/5 border-white/10 text-white ${errors.timeline ? 'border-red-400' : ''}`}>
                            <SelectValue placeholder={t("contact.form.timeline")} />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border">
                            <SelectItem value="asap">{t("hero.timelineOptions.asap")}</SelectItem>
                            <SelectItem value="1week">{t("hero.timelineOptions.oneWeek")}</SelectItem>
                            <SelectItem value="2weeks">{t("hero.timelineOptions.twoWeeks")}</SelectItem>
                            <SelectItem value="flexible">{t("hero.timelineOptions.flexible")}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.timeline && (
                          <p className="text-red-400 text-xs mt-1">{errors.timeline}</p>
                        )}
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.65 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            {t("contact.form.submitting")}
                          </>
                        ) : (
                          <>
                            {t("contact.form.submit")}
                            <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
