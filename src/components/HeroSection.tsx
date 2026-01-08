import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Loader2, UserPlus, Clock, CreditCard, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Badge component for trust indicators
const TrustBadge = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
    <Icon className="w-4 h-4 text-primary" />
    <span className="text-sm text-white/80 font-heebo">{label}</span>
  </div>
);

// Mobile Hero - Clean and conversion-focused
const MobileHeroStatic = ({ onStartBrief, onSeePacks }: { onStartBrief: () => void; onSeePacks: () => void }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-between px-5 py-8">
      <div className="flex-1 flex flex-col justify-center">
        {/* Main Title - Responsive clamp */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bebas text-[clamp(2.5rem,10vw,3.5rem)] leading-[0.95] text-white mb-1"
        >
          Sites web professionnels
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-bebas text-[clamp(2rem,8vw,2.75rem)] text-primary leading-[0.95] mb-6"
        >
          livrés en 5–10 jours
        </motion.h2>

        {/* Value subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/60 text-base leading-relaxed mb-8 font-heebo max-w-sm"
        >
          Prix fixe. Processus transparent.<br />
          Paiement crypto ou carte.
        </motion.p>

        {/* Two CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-3 mb-8"
        >
          <Button 
            onClick={onStartBrief}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-base"
          >
            Démarrer mon brief
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            onClick={onSeePacks}
            variant="outline"
            className="w-full h-12 bg-transparent border-white/20 text-white hover:bg-white/5 font-medium rounded-xl text-sm"
          >
            Voir les packs
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-2"
        >
          <TrustBadge icon={Clock} label="Livré en 5–10 jours" />
          <TrustBadge icon={CreditCard} label="Prix fixe" />
          <TrustBadge icon={Wallet} label="Crypto/carte" />
        </motion.div>
      </div>
    </div>
  );
};

// Desktop Hero - Premium with form
const DesktopHero = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [websiteType, setWebsiteType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{firstName?: string; lastName?: string; phone?: string; websiteType?: string; budget?: string; timeline?: string}>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!firstName.trim()) newErrors.firstName = "Prénom requis";
    if (!lastName.trim()) newErrors.lastName = "Nom requis";
    if (!phone.trim()) newErrors.phone = "Téléphone requis";
    if (!websiteType) newErrors.websiteType = "Sélectionnez un type";
    if (!budget) newErrors.budget = "Sélectionnez un budget";
    if (!timeline) newErrors.timeline = "Sélectionnez un délai";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({ title: "Informations manquantes", description: "Veuillez remplir tous les champs requis.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xvzgebre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phone, recommendation, websiteType, budget, timeline }),
      });

      if (!response.ok) {
        toast({ title: "Erreur", description: "Une erreur est survenue. Veuillez réessayer.", variant: "destructive" });
        return;
      }
      setFormSubmitted(true);
      toast({ title: "Brief envoyé !", description: "Nous reviendrons vers vous sous 24h." });
      setTimeout(() => document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' }), 2000);
    } catch {
      toast({ title: "Erreur", description: "Une erreur est survenue.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToPacks = () => {
    document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 relative z-10 pt-28 pb-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left content */}
        <div>
          {/* Title with responsive clamp - never cut */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="font-bebas text-[clamp(3rem,6vw,5rem)] text-white leading-[0.95] mb-1"
          >
            Sites web professionnels
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bebas text-[clamp(2.5rem,5vw,4rem)] text-primary leading-[0.95] mb-6"
          >
            livrés en 5–10 jours
          </motion.h2>

          {/* Value subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-lg mb-8 max-w-md font-heebo"
          >
            Prix fixe. Processus transparent. Paiement crypto ou carte.
          </motion.p>

          {/* Two CTAs side by side on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-13 px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-base"
            >
              Démarrer mon brief
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={scrollToPacks}
              variant="outline"
              className="h-13 px-8 bg-transparent border-white/20 text-white hover:bg-white/5 font-medium rounded-xl text-base"
            >
              Voir les packs
            </Button>
          </motion.div>

          {/* Trust badges - horizontal on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <TrustBadge icon={Clock} label="Livré en 5–10 jours" />
            <TrustBadge icon={CreditCard} label="Prix fixe" />
            <TrustBadge icon={Wallet} label="Crypto/carte" />
          </motion.div>
        </div>

        {/* Right - Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/15 via-primary/5 to-primary/15 rounded-3xl blur-xl opacity-50" />
          
          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8">
            <div className="mb-6">
              <h3 className="font-bebas text-2xl text-white mb-1">Démarrez votre projet</h3>
              <p className="text-white/50 text-sm font-heebo">Devis gratuit sous 24h</p>
            </div>

            {formSubmitted ? (
              <motion.div className="py-8 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bebas text-2xl text-white mb-2">Brief reçu !</h4>
                <p className="text-sm text-white/60 leading-relaxed mb-6 font-heebo">
                  Un membre de notre équipe vous contactera sous 24h.
                </p>
                <Button 
                  onClick={() => navigate('/auth', { state: { firstName, lastName, phone } })}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Créer mon compte
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium mb-1.5 block text-white/70 font-heebo">Prénom *</label>
                    <Input
                      placeholder="Jean"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); setErrors(prev => ({ ...prev, firstName: undefined })); }}
                      className={`bg-white/5 border-white/10 text-white h-11 placeholder:text-white/30 ${errors.firstName ? 'border-red-400' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block text-white/70 font-heebo">Nom *</label>
                    <Input
                      placeholder="Dupont"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); setErrors(prev => ({ ...prev, lastName: undefined })); }}
                      className={`bg-white/5 border-white/10 text-white h-11 placeholder:text-white/30 ${errors.lastName ? 'border-red-400' : ''}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block text-white/70 font-heebo">Téléphone *</label>
                  <Input
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setErrors(prev => ({ ...prev, phone: undefined })); }}
                    className={`bg-white/5 border-white/10 text-white h-11 placeholder:text-white/30 ${errors.phone ? 'border-red-400' : ''}`}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block text-white/70 font-heebo">Recommandation <span className="text-white/40">(optionnel)</span></label>
                  <Input
                    placeholder="Qui vous a parlé de nous ?"
                    value={recommendation}
                    onChange={(e) => setRecommendation(e.target.value)}
                    className="bg-white/5 border-white/10 text-white h-11 placeholder:text-white/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block text-white/70 font-heebo">Type de site *</label>
                  <Select value={websiteType} onValueChange={(value) => { setWebsiteType(value); setErrors(prev => ({ ...prev, websiteType: undefined })); }}>
                    <SelectTrigger className={`bg-white/5 border-white/10 text-white h-11 ${errors.websiteType ? 'border-red-400' : ''}`}>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="landing">Landing page</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="business">Site vitrine</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="webapp">Web app</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium mb-1.5 block text-white/70 font-heebo">Budget *</label>
                    <Select value={budget} onValueChange={(value) => { setBudget(value); setErrors(prev => ({ ...prev, budget: undefined })); }}>
                      <SelectTrigger className={`bg-white/5 border-white/10 text-white h-11 ${errors.budget ? 'border-red-400' : ''}`}>
                        <SelectValue placeholder="Budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="starter">~500€</SelectItem>
                        <SelectItem value="business">~1 200€</SelectItem>
                        <SelectItem value="premium">~2 000€</SelectItem>
                        <SelectItem value="unsure">À définir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block text-white/70 font-heebo">Délai *</label>
                    <Select value={timeline} onValueChange={(value) => { setTimeline(value); setErrors(prev => ({ ...prev, timeline: undefined })); }}>
                      <SelectTrigger className={`bg-white/5 border-white/10 text-white h-11 ${errors.timeline ? 'border-red-400' : ''}`}>
                        <SelectValue placeholder="Délai" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="asap">Dès que possible</SelectItem>
                        <SelectItem value="1week">Sous 1 semaine</SelectItem>
                        <SelectItem value="2weeks">Sous 2 semaines</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg mt-2" disabled={isSubmitting}>
                  {isSubmitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Envoi...</>) : (<>Demander un devis gratuit<ArrowRight className="w-4 h-4 ml-2" /></>)}
                </Button>
                
                <p className="text-[11px] text-white/40 text-center pt-2 font-heebo">
                  Brief gratuit • Sans paiement • Réponse sous 24h
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
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPacks = () => {
    document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* Subtle background - no marquee */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center">
        {/* Mobile */}
        <div className="sm:hidden w-full relative z-10 pt-20">
          <MobileHeroStatic onStartBrief={scrollToContact} onSeePacks={scrollToPacks} />
        </div>

        {/* Desktop */}
        <div className="hidden sm:block w-full relative z-10">
          <DesktopHero />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default HeroSection;
