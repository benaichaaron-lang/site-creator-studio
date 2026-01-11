import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Loader2, UserPlus, Clock, CreditCard, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Badge component for trust indicators - more premium
const TrustBadge = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <motion.div 
    className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-2.5 backdrop-blur-sm"
    whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.15)" }}
    transition={{ duration: 0.2 }}
  >
    <Icon className="w-4 h-4 text-primary" />
    <span className="text-sm text-white/70 font-heebo">{label}</span>
  </motion.div>
);

// Mobile Hero - Clean and conversion-focused
const MobileHeroStatic = ({ onStartBrief, onSeePacks }: { onStartBrief: () => void; onSeePacks: () => void }) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-5 py-8">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto">
        {/* Main Title - Elegant and precise */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="font-bebas text-[clamp(2.75rem,11vw,4rem)] leading-[0.92] text-white tracking-tight"
        >
          {t("hero.title")}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="font-bebas text-[clamp(2.25rem,9vw,3.25rem)] text-primary leading-[0.92] tracking-tight mt-1 mb-6"
        >
          {t("hero.titleHighlight")}
        </motion.h2>

        {/* Value subtitle - more readable */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/50 text-base leading-relaxed mb-8 font-heebo"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Two CTAs - stacked on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-3 mb-8"
        >
          <Button 
            onClick={onStartBrief}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-base shadow-[0_4px_20px_hsl(217,91%,50%,0.25)]"
          >
            {t("hero.cta.startBrief")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            onClick={onSeePacks}
            variant="outline"
            className="w-full h-12 bg-white/[0.02] border-white/[0.1] text-white/90 hover:bg-white/[0.05] hover:border-white/20 font-medium rounded-xl text-sm backdrop-blur-sm"
          >
            {t("hero.cta.seePacks")}
          </Button>
        </motion.div>

        {/* Trust badges - more spaced */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-2.5"
        >
          <TrustBadge icon={Clock} label={t("hero.trustBadges.delivery")} />
          <TrustBadge icon={CreditCard} label={t("hero.trustBadges.fixedPrice")} />
          <TrustBadge icon={Wallet} label={t("hero.trustBadges.cryptoCard")} />
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
      const response = await fetch("https://formspree.io/f/xvzgebre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, recommendation, websiteType, budget, timeline }),
      });

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
    <div className="container mx-auto px-4 lg:px-6 xl:px-8 relative z-10 pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-32 xl:pt-40 xl:pb-36 2xl:pt-44 2xl:pb-40 max-w-7xl">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-8 xl:gap-12 2xl:gap-16 items-start">
        {/* Left content */}
        <div className="flex-1 max-w-xl lg:max-w-[50%] xl:max-w-[55%] lg:pr-4">
          {/* Title with elegant sizing - responsive */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="font-bebas text-[clamp(3rem,6vw,5.5rem)] text-white leading-[0.9] tracking-tight"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="font-bebas text-[clamp(2.5rem,5vw,4.5rem)] text-primary leading-[0.9] tracking-tight mt-1 mb-6 lg:mb-8"
          >
            {t("hero.titleHighlight")}
          </motion.h2>

          {/* Value subtitle - cleaner */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/55 text-base lg:text-lg xl:text-xl mb-8 lg:mb-10 font-heebo leading-relaxed max-w-md lg:max-w-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Two CTAs - horizontal on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-3 lg:gap-4 mb-8 lg:mb-10"
          >
            <Button 
              onClick={() => {
                // Focus on first form field instead of scrolling
                const firstInput = document.querySelector('form input') as HTMLInputElement;
                if (firstInput) {
                  firstInput.focus();
                  firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="h-12 lg:h-14 px-6 lg:px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-base lg:text-lg shadow-[0_4px_24px_hsl(217,91%,50%,0.3)] transition-all hover:shadow-[0_8px_32px_hsl(217,91%,50%,0.4)]"
            >
              {t("hero.cta.startBrief")}
              <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 ml-2" />
            </Button>
            <Button 
              onClick={scrollToPacks}
              variant="outline"
              className="h-12 lg:h-14 px-6 lg:px-8 bg-white/[0.02] border-white/[0.1] text-white/90 hover:bg-white/[0.05] hover:border-white/20 font-medium rounded-xl text-base lg:text-lg backdrop-blur-sm"
            >
              {t("hero.cta.seePacks")}
            </Button>
          </motion.div>

          {/* Trust badges - more spaced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 lg:gap-3"
          >
            <TrustBadge icon={Clock} label={t("hero.trustBadges.deliveryLong")} />
            <TrustBadge icon={CreditCard} label={t("hero.trustBadges.fixedPrice")} />
            <TrustBadge icon={Wallet} label={t("hero.trustBadges.cryptoCard")} />
          </motion.div>
        </div>

        {/* Right - Form with premium glass effect */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative w-full lg:w-auto lg:flex-shrink-0 lg:max-w-[420px] xl:max-w-[460px]"
        >
          {/* Subtle glow behind */}
          <div className="absolute -inset-4 lg:-inset-6 bg-gradient-to-br from-primary/12 via-transparent to-primary/8 rounded-3xl blur-3xl" />
          
          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.1] rounded-2xl p-6 lg:p-8">
            <div className="mb-6">
              <h3 className="font-bebas text-2xl lg:text-3xl text-white mb-1.5 tracking-tight">{t("hero.form.title")}</h3>
              <p className="text-white/50 text-sm lg:text-base font-heebo">{t("hero.form.subtitle")}</p>
            </div>

            {formSubmitted ? (
              <motion.div className="py-10 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bebas text-2xl text-white mb-2 tracking-tight">{t("hero.form.success.title")}</h4>
                <p className="text-sm text-white/50 leading-relaxed mb-6 font-heebo">
                  {t("hero.form.success.message")}
                </p>
                <Button 
                  onClick={() => navigate('/auth', { state: { firstName, lastName, phone } })}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {t("hero.form.success.createAccount")}
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">{t("hero.form.firstName")} {t("hero.form.required")}</label>
                    <Input
                      placeholder="Jean"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); setErrors(prev => ({ ...prev, firstName: undefined })); }}
                      className={`bg-white/[0.03] border-white/[0.08] text-white h-11 placeholder:text-white/25 focus:border-primary/50 transition-colors ${errors.firstName ? 'border-red-400/60' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">{t("hero.form.lastName")} {t("hero.form.required")}</label>
                    <Input
                      placeholder="Dupont"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); setErrors(prev => ({ ...prev, lastName: undefined })); }}
                      className={`bg-white/[0.03] border-white/[0.08] text-white h-11 placeholder:text-white/25 focus:border-primary/50 transition-colors ${errors.lastName ? 'border-red-400/60' : ''}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">{t("hero.form.email")} {t("hero.form.required")}</label>
                  <Input
                    type="email"
                    placeholder="jean@exemple.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
                    className={`bg-white/[0.03] border-white/[0.08] text-white h-11 placeholder:text-white/25 focus:border-primary/50 transition-colors ${errors.email ? 'border-red-400/60' : ''}`}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">{t("hero.form.phone")} {t("hero.form.required")}</label>
                  <Input
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setErrors(prev => ({ ...prev, phone: undefined })); }}
                    className={`bg-white/[0.03] border-white/[0.08] text-white h-11 placeholder:text-white/25 focus:border-primary/50 transition-colors ${errors.phone ? 'border-red-400/60' : ''}`}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">{t("hero.form.recommendation")} <span className="text-white/30">({t("hero.form.optional")})</span></label>
                  <Input
                    placeholder={t("hero.form.recommendationPlaceholder")}
                    value={recommendation}
                    onChange={(e) => setRecommendation(e.target.value)}
                    className="bg-white/[0.03] border-white/[0.08] text-white h-11 placeholder:text-white/25 focus:border-primary/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">{t("hero.form.websiteType")} {t("hero.form.required")}</label>
                  <Select value={websiteType} onValueChange={(value) => { setWebsiteType(value); setErrors(prev => ({ ...prev, websiteType: undefined })); }}>
                    <SelectTrigger className={`bg-white/[0.03] border-white/[0.08] text-white h-11 ${errors.websiteType ? 'border-red-400/60' : ''}`}>
                      <SelectValue placeholder={t("hero.form.selectType")} />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="landing">{t("hero.websiteTypes.landing")}</SelectItem>
                      <SelectItem value="ecommerce">{t("hero.websiteTypes.ecommerce")}</SelectItem>
                      <SelectItem value="business">{t("hero.websiteTypes.business")}</SelectItem>
                      <SelectItem value="portfolio">{t("hero.websiteTypes.portfolio")}</SelectItem>
                      <SelectItem value="webapp">{t("hero.websiteTypes.webapp")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">{t("hero.form.budget")} {t("hero.form.required")}</label>
                    <Select value={budget} onValueChange={(value) => { setBudget(value); setErrors(prev => ({ ...prev, budget: undefined })); }}>
                      <SelectTrigger className={`bg-white/[0.03] border-white/[0.08] text-white h-11 ${errors.budget ? 'border-red-400/60' : ''}`}>
                        <SelectValue placeholder={t("hero.form.selectBudget")} />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="starter">{t("hero.budgetOptions.starter")}</SelectItem>
                        <SelectItem value="business">{t("hero.budgetOptions.business")}</SelectItem>
                        <SelectItem value="premium">{t("hero.budgetOptions.premium")}</SelectItem>
                        <SelectItem value="unsure">{t("hero.budgetOptions.unsure")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">{t("hero.form.timeline")} {t("hero.form.required")}</label>
                    <Select value={timeline} onValueChange={(value) => { setTimeline(value); setErrors(prev => ({ ...prev, timeline: undefined })); }}>
                      <SelectTrigger className={`bg-white/[0.03] border-white/[0.08] text-white h-11 ${errors.timeline ? 'border-red-400/60' : ''}`}>
                        <SelectValue placeholder={t("hero.form.selectTimeline")} />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="asap">{t("hero.timelineOptions.asap")}</SelectItem>
                        <SelectItem value="1week">{t("hero.timelineOptions.oneWeek")}</SelectItem>
                        <SelectItem value="2weeks">{t("hero.timelineOptions.twoWeeks")}</SelectItem>
                        <SelectItem value="flexible">{t("hero.timelineOptions.flexible")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl mt-3 shadow-[0_4px_16px_hsl(217,91%,50%,0.25)]" disabled={isSubmitting}>
                  {isSubmitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t("hero.form.submitting")}</>) : (<>{t("hero.form.submit")}<ArrowRight className="w-4 h-4 ml-2" /></>)}
                </Button>
                
                <p className="text-[11px] text-white/35 text-center pt-2 font-heebo">
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
        // Prevent iOS bounce and improve scroll performance
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'none',
      }}
    >
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          willChange: 'auto',
        }} 
      />
      
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent z-10 pointer-events-none" />

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

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
