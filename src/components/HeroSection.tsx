import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Loader2, UserPlus, Clock, CreditCard, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useABTest, AB_EXPERIMENTS } from "@/hooks/useABTest";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CryptoBadge, { BitcoinIcon, EthereumIcon, USDCIcon } from "./CryptoBadge";

// Premium easing curve
const premiumEase: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

// Badge component for trust indicators - responsive
const TrustBadge = ({ icon: Icon, label, cryptoIcons }: { icon?: React.ElementType; label: string; cryptoIcons?: boolean }) => (
  <motion.div 
    className="flex items-center gap-1.5 sm:gap-2.5 bg-foreground/[0.03] border border-foreground/[0.06] rounded-full px-3 sm:px-4 py-2 sm:py-2.5 backdrop-blur-sm"
    whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.12)" }}
    transition={{ duration: 0.4, ease: premiumEase }}
  >
    {cryptoIcons ? (
      <div className="flex items-center gap-1 sm:gap-1.5">
        <BitcoinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <EthereumIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <USDCIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </div>
    ) : Icon ? (
      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
    ) : null}
    <span className="text-xs sm:text-sm text-foreground/60 font-heebo">{label}</span>
  </motion.div>
);

// Mobile Hero - Optimized for all phone sizes
const MobileHeroStatic = ({ onStartBrief, onSeePacks }: { onStartBrief: () => void; onSeePacks: () => void }) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-[calc(100vh-72px)] min-h-[calc(100dvh-72px)] flex flex-col justify-center px-4 xs:px-5 py-8 safe-bottom">
      <div className="flex-1 flex flex-col justify-center w-full max-w-md mx-auto">
        {/* Main Title - Responsive for all screen sizes */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: premiumEase }}
          className="font-bebas text-[clamp(2.25rem,11vw,4rem)] leading-[0.92] text-foreground tracking-tight"
        >
          {t("hero.title")}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: premiumEase }}
          className="font-bebas text-[clamp(1.875rem,9vw,3.5rem)] text-primary leading-[0.92] tracking-tight mt-1 mb-6"
        >
          {t("hero.titleHighlight")}
        </motion.h2>

        {/* Value subtitle - readable on small screens */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: premiumEase }}
          className="text-muted-foreground text-sm xs:text-base leading-relaxed mb-8 font-heebo"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Two CTAs - full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: premiumEase }}
          className="flex flex-col gap-3 mb-8"
        >
          <Button 
            onClick={onStartBrief}
            className="w-full h-12 xs:h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-sm xs:text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-400"
          >
            {t("hero.cta.startBrief")}
            <ArrowRight className="w-4 h-4 xs:w-5 xs:h-5 ml-2" />
          </Button>
          <Button 
            onClick={onSeePacks}
            variant="outline"
            className="w-full h-11 xs:h-12 bg-foreground/[0.02] border-foreground/[0.08] text-foreground/80 hover:bg-foreground/[0.04] hover:border-foreground/15 font-medium rounded-xl text-sm backdrop-blur-sm transition-all duration-400"
          >
            {t("hero.cta.seePacks")}
          </Button>
        </motion.div>

        {/* Trust badges - responsive wrap */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: premiumEase }}
          className="flex flex-wrap gap-2"
        >
          <TrustBadge icon={Clock} label={t("hero.trustBadges.delivery")} />
          <TrustBadge icon={CreditCard} label={t("hero.trustBadges.fixedPrice")} />
          <TrustBadge cryptoIcons label={t("hero.trustBadges.cryptoCard")} />
        </motion.div>
      </div>
    </div>
  );
};

// Desktop Hero - Premium with animated gradient and form
const DesktopHero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [websiteType, setWebsiteType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{firstName?: string; lastName?: string; email?: string; phone?: string; websiteType?: string; budget?: string; timeline?: string}>({});
  
  // A/B Test sur le CTA du formulaire
  const abTestCTA = useABTest(AB_EXPERIMENTS.HERO_CTA);
  const abTestTitle = useABTest(AB_EXPERIMENTS.HERO_TITLE);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!firstName.trim()) newErrors.firstName = t("hero.errors.firstName");
    if (!lastName.trim()) newErrors.lastName = t("hero.errors.lastName");
    if (!email.trim()) newErrors.email = t("hero.errors.email");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = t("hero.errors.emailInvalid");
    if (!phone.trim()) newErrors.phone = t("hero.errors.phone");
    if (!websiteType) newErrors.websiteType = t("hero.errors.websiteType");
    if (!budget) newErrors.budget = t("hero.errors.budget");
    if (!timeline) newErrors.timeline = t("hero.errors.timeline");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({ title: t("hero.errors.missing"), description: t("hero.errors.missingDesc"), variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Sauvegarde dans Supabase (leads table)
      const { data: leadData } = await supabase
        .from("leads")
        .insert({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          website_type: websiteType,
          budget,
          timeline,
          recommendation,
          source: "hero_form",
          ab_variant: abTestCTA.variant,
        })
        .select("id")
        .single();

      // 2. Planifier les séquences d'emails automatiques
      if (leadData?.id) {
        const now = new Date();
        const followup1 = new Date(now.getTime() + 24 * 60 * 60 * 1000); // J+1
        const followup2 = new Date(now.getTime() + 72 * 60 * 60 * 1000); // J+3
        await supabase.from("email_sequences").insert([
          { lead_id: leadData.id, sequence_step: 1, email_type: "followup_guide", scheduled_at: followup1.toISOString() },
          { lead_id: leadData.id, sequence_step: 2, email_type: "followup_offer", scheduled_at: followup2.toISOString() },
        ]);
      }

      // 3. Envoi via Formspree (backup)
      const response = await fetch("https://formspree.io/f/xvzgebre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, recommendation, websiteType, budget, timeline, abVariant: abTestCTA.variant }),
      });

      // 4. Tracker la conversion A/B
      abTestCTA.trackConversion("form_submit");
      abTestTitle.trackConversion("form_submit");

      if (!response.ok) {
        toast({ title: t("hero.errors.failed"), description: t("hero.errors.failedDesc"), variant: "destructive" });
        return;
      }
      setFormSubmitted(true);
      toast({ title: t("hero.toasts.submitted"), description: t("hero.toasts.submittedDesc") });
      setTimeout(() => document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' }), 2000);
    } catch {
      toast({ title: t("hero.errors.failed"), description: t("hero.errors.failedDesc"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToPacks = () => {
    navigate('/packs');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 xl:pt-40 xl:pb-32 2xl:pt-44 2xl:pb-36 max-w-7xl">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-10 sm:gap-12 lg:gap-10 xl:gap-16 2xl:gap-20 items-start">
        {/* Left content */}
        <div className="flex-1 w-full lg:max-w-[52%] xl:max-w-[56%] lg:pr-6">
          {/* Title with elegant sizing - responsive */}
          <motion.h1 
            initial={{ opacity: 0, y: 32 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: premiumEase }}
            className="font-bebas text-[clamp(2.5rem,8vw,6rem)] sm:text-[clamp(3rem,7vw,6rem)] text-foreground leading-[0.88] tracking-tight"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 32 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="font-bebas text-[clamp(2rem,7vw,5rem)] sm:text-[clamp(2.5rem,6vw,5rem)] text-primary leading-[0.88] tracking-tight mt-1 mb-6 sm:mb-8 lg:mb-10"
          >
            {t("hero.titleHighlight")}
          </motion.h2>

          {/* Value subtitle - responsive */}
          <motion.p 
            initial={{ opacity: 0, y: 24 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.2, ease: premiumEase }}
            className="text-muted-foreground text-sm sm:text-base lg:text-lg xl:text-xl mb-8 sm:mb-10 lg:mb-12 font-heebo leading-relaxed max-w-md lg:max-w-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Two CTAs - responsive */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: premiumEase }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 mb-8 sm:mb-10 lg:mb-12"
          >
            <Button 
              onClick={() => {
                const firstInput = document.querySelector('form input') as HTMLInputElement;
                if (firstInput) {
                  firstInput.focus();
                  firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="w-full sm:w-auto h-12 sm:h-13 lg:h-14 px-6 sm:px-7 lg:px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-sm sm:text-base lg:text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-400"
            >
              {t("hero.cta.startBrief")}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2" />
            </Button>
            <Button 
              onClick={scrollToPacks}
              variant="outline"
              className="w-full sm:w-auto h-12 sm:h-13 lg:h-14 px-6 sm:px-7 lg:px-8 bg-foreground/[0.02] border-foreground/[0.08] text-foreground/80 hover:bg-foreground/[0.04] hover:border-foreground/15 font-medium rounded-xl text-sm sm:text-base lg:text-lg backdrop-blur-sm transition-all duration-400"
            >
              {t("hero.cta.seePacks")}
            </Button>
          </motion.div>

          {/* Trust badges - responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: premiumEase }}
            className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4"
          >
            <TrustBadge icon={Clock} label={t("hero.trustBadges.deliveryLong")} />
            <TrustBadge icon={CreditCard} label={t("hero.trustBadges.fixedPrice")} />
            <TrustBadge cryptoIcons label={t("hero.trustBadges.cryptoCard")} />
          </motion.div>
          
          {/* Crypto-native badge - responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: premiumEase }}
            className="mt-6 sm:mt-8"
          >
            <div className="inline-flex items-center gap-2.5 sm:gap-3.5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#F7931A]/[0.06] via-[#627EEA]/[0.06] to-[#26A17B]/[0.06] border border-foreground/[0.06] backdrop-blur-sm">
              <CryptoBadge variant="compact" />
              <div className="h-4 sm:h-5 w-px bg-foreground/10" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">{t("cryptoNative.tagline")}</span>
            </div>
          </motion.div>
        </div>

        {/* Right - Form with premium glass effect - responsive */}
        <motion.div 
          initial={{ opacity: 0, x: 48 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.9, delay: 0.3, ease: premiumEase }}
          className="relative w-full lg:w-auto lg:flex-shrink-0 lg:max-w-[400px] xl:max-w-[440px]"
        >
          {/* Subtle glow behind - responsive */}
          <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-gradient-to-br from-primary/10 via-transparent to-primary/[0.06] rounded-2xl sm:rounded-[2rem] blur-2xl sm:blur-3xl opacity-60" />
          
          <div className="relative bg-card/40 backdrop-blur-2xl border border-border/30 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-elevated">
            <div className="mb-5 sm:mb-6 lg:mb-7">
              <h3 className="font-bebas text-xl sm:text-2xl lg:text-[1.75rem] text-foreground mb-1.5 sm:mb-2 tracking-tight">{t("hero.form.title")}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base font-heebo">{t("hero.form.subtitle")}</p>
            </div>

            {formSubmitted ? (
              <motion.div className="py-12 text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: premiumEase }}>
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bebas text-2xl text-foreground mb-2 tracking-tight">{t("hero.form.success.title")}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-7 font-heebo">
                  {t("hero.form.success.message")}
                </p>
                <Button 
                  onClick={() => navigate('/auth', { state: { firstName, lastName, phone } })}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl shadow-lg shadow-primary/20"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {t("hero.form.success.createAccount")}
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-medium mb-2 block text-muted-foreground font-heebo">{t("hero.form.firstName")} {t("hero.form.required")}</label>
                    <Input
                      placeholder="Jean"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); setErrors(prev => ({ ...prev, firstName: undefined })); }}
                      className={`bg-foreground/[0.02] border-border/50 text-foreground h-11 placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${errors.firstName ? 'border-destructive/50' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-2 block text-muted-foreground font-heebo">{t("hero.form.lastName")} {t("hero.form.required")}</label>
                    <Input
                      placeholder="Dupont"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); setErrors(prev => ({ ...prev, lastName: undefined })); }}
                      className={`bg-foreground/[0.02] border-border/50 text-foreground h-11 placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${errors.lastName ? 'border-destructive/50' : ''}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium mb-2 block text-muted-foreground font-heebo">{t("hero.form.email")} {t("hero.form.required")}</label>
                  <Input
                    type="email"
                    placeholder="jean@exemple.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
                    className={`bg-foreground/[0.02] border-border/50 text-foreground h-11 placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${errors.email ? 'border-destructive/50' : ''}`}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium mb-2 block text-muted-foreground font-heebo">{t("hero.form.phone")} {t("hero.form.required")}</label>
                  <Input
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setErrors(prev => ({ ...prev, phone: undefined })); }}
                    className={`bg-foreground/[0.02] border-border/50 text-foreground h-11 placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${errors.phone ? 'border-destructive/50' : ''}`}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium mb-2 block text-muted-foreground font-heebo">{t("hero.form.recommendation")} <span className="text-muted-foreground/50">({t("hero.form.optional")})</span></label>
                  <Input
                    placeholder={t("hero.form.recommendationPlaceholder")}
                    value={recommendation}
                    onChange={(e) => setRecommendation(e.target.value)}
                    className="bg-foreground/[0.02] border-border/50 text-foreground h-11 placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium mb-2 block text-muted-foreground font-heebo">{t("hero.form.websiteType")} {t("hero.form.required")}</label>
                  <Select value={websiteType} onValueChange={(value) => { setWebsiteType(value); setErrors(prev => ({ ...prev, websiteType: undefined })); }}>
                    <SelectTrigger className={`bg-foreground/[0.02] border-border/50 text-foreground h-11 focus:ring-1 focus:ring-primary/20 ${errors.websiteType ? 'border-destructive/50' : ''}`}>
                      <SelectValue placeholder={t("hero.form.selectType")} />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border/50 backdrop-blur-xl">
                      <SelectItem value="landing">{t("hero.websiteTypes.landing")}</SelectItem>
                      <SelectItem value="ecommerce">{t("hero.websiteTypes.ecommerce")}</SelectItem>
                      <SelectItem value="business">{t("hero.websiteTypes.business")}</SelectItem>
                      <SelectItem value="portfolio">{t("hero.websiteTypes.portfolio")}</SelectItem>
                      <SelectItem value="webapp">{t("hero.websiteTypes.webapp")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-medium mb-2 block text-muted-foreground font-heebo">{t("hero.form.budget")} {t("hero.form.required")}</label>
                    <Select value={budget} onValueChange={(value) => { setBudget(value); setErrors(prev => ({ ...prev, budget: undefined })); }}>
                      <SelectTrigger className={`bg-foreground/[0.02] border-border/50 text-foreground h-11 focus:ring-1 focus:ring-primary/20 ${errors.budget ? 'border-destructive/50' : ''}`}>
                        <SelectValue placeholder={t("hero.form.selectBudget")} />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border/50 backdrop-blur-xl">
                        <SelectItem value="starter">{t("hero.budgetOptions.starter")}</SelectItem>
                        <SelectItem value="business">{t("hero.budgetOptions.business")}</SelectItem>
                        <SelectItem value="premium">{t("hero.budgetOptions.premium")}</SelectItem>
                        <SelectItem value="unsure">{t("hero.budgetOptions.unsure")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-2 block text-muted-foreground font-heebo">{t("hero.form.timeline")} {t("hero.form.required")}</label>
                    <Select value={timeline} onValueChange={(value) => { setTimeline(value); setErrors(prev => ({ ...prev, timeline: undefined })); }}>
                      <SelectTrigger className={`bg-foreground/[0.02] border-border/50 text-foreground h-11 focus:ring-1 focus:ring-primary/20 ${errors.timeline ? 'border-destructive/50' : ''}`}>
                        <SelectValue placeholder={t("hero.form.selectTimeline")} />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border/50 backdrop-blur-xl">
                        <SelectItem value="asap">{t("hero.timelineOptions.asap")}</SelectItem>
                        <SelectItem value="1week">{t("hero.timelineOptions.oneWeek")}</SelectItem>
                        <SelectItem value="2weeks">{t("hero.timelineOptions.twoWeeks")}</SelectItem>
                        <SelectItem value="flexible">{t("hero.timelineOptions.flexible")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full h-13 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl mt-4 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-400" disabled={isSubmitting}>
                  {isSubmitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t("hero.form.submitting")}</>) : (<>{t("hero.form.submit")}<ArrowRight className="w-4 h-4 ml-2" /></>)}
                </Button>
                
                <p className="text-[11px] text-muted-foreground/50 text-center pt-2 font-heebo">
                  {t("hero.form.footer")}
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  
  const scrollToContact = () => {
    navigate('/contact');
  };

  const scrollToPacks = () => {
    navigate('/packs');
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col"
      style={{ 
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'none',
      }}
    >
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none" 
        style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          willChange: 'auto',
        }} 
      />
      
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="flex-1 flex items-center relative z-10">
        {/* Mobile */}
        <div className="sm:hidden w-full pt-16">
          <MobileHeroStatic onStartBrief={scrollToContact} onSeePacks={scrollToPacks} />
        </div>

        {/* Desktop */}
        <div className="hidden sm:block w-full">
          <DesktopHero />
        </div>
      </div>

      {/* Bottom gradient fade - more subtle */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
