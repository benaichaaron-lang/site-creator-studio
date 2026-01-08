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
          Sites web professionnels
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="font-bebas text-[clamp(2.25rem,9vw,3.25rem)] text-primary leading-[0.92] tracking-tight mt-1 mb-6"
        >
          livrés en 5–10 jours
        </motion.h2>

        {/* Value subtitle - more readable */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/50 text-base leading-relaxed mb-8 font-heebo"
        >
          Prix fixe • Processus transparent • Paiement crypto ou carte
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
            Démarrer mon brief
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            onClick={onSeePacks}
            variant="outline"
            className="w-full h-12 bg-white/[0.02] border-white/[0.1] text-white/90 hover:bg-white/[0.05] hover:border-white/20 font-medium rounded-xl text-sm backdrop-blur-sm"
          >
            Voir les packs
          </Button>
        </motion.div>

        {/* Trust badges - more spaced */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-2.5"
        >
          <TrustBadge icon={Clock} label="5–10 jours" />
          <TrustBadge icon={CreditCard} label="Prix fixe" />
          <TrustBadge icon={Wallet} label="Crypto/carte" />
        </motion.div>
      </div>
    </div>
  );
};

// Desktop Hero - Premium with animated gradient and form
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
    <div className="container mx-auto px-4 relative z-10 pt-28 pb-20">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left content */}
        <div className="max-w-xl">
          {/* Title with elegant sizing */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="font-bebas text-[clamp(3.5rem,5.5vw,5.5rem)] text-white leading-[0.9] tracking-tight"
          >
            Sites web professionnels
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="font-bebas text-[clamp(2.75rem,4.5vw,4.5rem)] text-primary leading-[0.9] tracking-tight mt-1 mb-8"
          >
            livrés en 5–10 jours
          </motion.h2>

          {/* Value subtitle - cleaner */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg mb-10 font-heebo leading-relaxed"
          >
            Prix fixe • Processus transparent • Paiement crypto ou carte
          </motion.p>

          {/* Two CTAs - horizontal on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-base shadow-[0_4px_24px_hsl(217,91%,50%,0.3)] transition-all hover:shadow-[0_8px_32px_hsl(217,91%,50%,0.4)]"
            >
              Démarrer mon brief
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={scrollToPacks}
              variant="outline"
              className="h-14 px-8 bg-white/[0.02] border-white/[0.1] text-white/90 hover:bg-white/[0.05] hover:border-white/20 font-medium rounded-xl text-base backdrop-blur-sm"
            >
              Voir les packs
            </Button>
          </motion.div>

          {/* Trust badges - more spaced */}
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

        {/* Right - Form with premium glass effect */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative"
        >
          {/* Subtle glow behind */}
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl blur-2xl" />
          
          <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-7 lg:p-8">
            <div className="mb-6">
              <h3 className="font-bebas text-2xl text-white mb-1.5 tracking-tight">Démarrez votre projet</h3>
              <p className="text-white/40 text-sm font-heebo">Devis gratuit • Réponse sous 24h</p>
            </div>

            {formSubmitted ? (
              <motion.div className="py-10 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bebas text-2xl text-white mb-2 tracking-tight">Brief reçu !</h4>
                <p className="text-sm text-white/50 leading-relaxed mb-6 font-heebo">
                  Un membre de notre équipe vous contactera sous 24h.
                </p>
                <Button 
                  onClick={() => navigate('/auth', { state: { firstName, lastName, phone } })}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Créer mon compte
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">Prénom *</label>
                    <Input
                      placeholder="Jean"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); setErrors(prev => ({ ...prev, firstName: undefined })); }}
                      className={`bg-white/[0.03] border-white/[0.08] text-white h-11 placeholder:text-white/25 focus:border-primary/50 transition-colors ${errors.firstName ? 'border-red-400/60' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">Nom *</label>
                    <Input
                      placeholder="Dupont"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); setErrors(prev => ({ ...prev, lastName: undefined })); }}
                      className={`bg-white/[0.03] border-white/[0.08] text-white h-11 placeholder:text-white/25 focus:border-primary/50 transition-colors ${errors.lastName ? 'border-red-400/60' : ''}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">Téléphone *</label>
                  <Input
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setErrors(prev => ({ ...prev, phone: undefined })); }}
                    className={`bg-white/[0.03] border-white/[0.08] text-white h-11 placeholder:text-white/25 focus:border-primary/50 transition-colors ${errors.phone ? 'border-red-400/60' : ''}`}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">Recommandation <span className="text-white/30">(optionnel)</span></label>
                  <Input
                    placeholder="Qui vous a parlé de nous ?"
                    value={recommendation}
                    onChange={(e) => setRecommendation(e.target.value)}
                    className="bg-white/[0.03] border-white/[0.08] text-white h-11 placeholder:text-white/25 focus:border-primary/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">Type de site *</label>
                  <Select value={websiteType} onValueChange={(value) => { setWebsiteType(value); setErrors(prev => ({ ...prev, websiteType: undefined })); }}>
                    <SelectTrigger className={`bg-white/[0.03] border-white/[0.08] text-white h-11 ${errors.websiteType ? 'border-red-400/60' : ''}`}>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
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
                    <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">Budget *</label>
                    <Select value={budget} onValueChange={(value) => { setBudget(value); setErrors(prev => ({ ...prev, budget: undefined })); }}>
                      <SelectTrigger className={`bg-white/[0.03] border-white/[0.08] text-white h-11 ${errors.budget ? 'border-red-400/60' : ''}`}>
                        <SelectValue placeholder="Budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="starter">~500€</SelectItem>
                        <SelectItem value="business">~1 200€</SelectItem>
                        <SelectItem value="premium">~2 000€</SelectItem>
                        <SelectItem value="unsure">À définir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block text-white/60 font-heebo">Délai *</label>
                    <Select value={timeline} onValueChange={(value) => { setTimeline(value); setErrors(prev => ({ ...prev, timeline: undefined })); }}>
                      <SelectTrigger className={`bg-white/[0.03] border-white/[0.08] text-white h-11 ${errors.timeline ? 'border-red-400/60' : ''}`}>
                        <SelectValue placeholder="Délai" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="asap">Dès que possible</SelectItem>
                        <SelectItem value="1week">Sous 1 semaine</SelectItem>
                        <SelectItem value="2weeks">Sous 2 semaines</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl mt-3 shadow-[0_4px_16px_hsl(217,91%,50%,0.25)]" disabled={isSubmitting}>
                  {isSubmitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Envoi...</>) : (<>Demander un devis gratuit<ArrowRight className="w-4 h-4 ml-2" /></>)}
                </Button>
                
                <p className="text-[11px] text-white/35 text-center pt-2 font-heebo">
                  Sans engagement • Sans paiement initial
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
      {/* Premium animated gradient background */}
      <div className="absolute inset-0">
        {/* Base */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/[0.06] rounded-full blur-[150px]"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-primary/[0.04] rounded-full blur-[120px]"
          animate={{ 
            x: [0, -25, 0],
            y: [0, 25, 0],
            scale: [1, 0.95, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center">
        {/* Mobile */}
        <div className="sm:hidden w-full relative z-10 pt-16">
          <MobileHeroStatic onStartBrief={scrollToContact} onSeePacks={scrollToPacks} />
        </div>

        {/* Desktop */}
        <div className="hidden sm:block w-full relative z-10">
          <DesktopHero />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
