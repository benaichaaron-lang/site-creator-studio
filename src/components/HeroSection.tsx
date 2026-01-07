import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import heroVideo from "@/assets/hero-background.mp4";

// Static Mobile Hero - Premium, no swipe
const MobileHeroStatic = ({ onStartBrief }: { onStartBrief: () => void }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-between px-5 py-6">
      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] mb-5 self-start"
        >
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span className="text-xs text-white/60 font-medium">Web Development Studio</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[28px] leading-[1.15] font-bold text-white mb-4"
        >
          High-converting websites in{" "}
          <span className="text-primary">5–10 days</span>
        </motion.h1>

        {/* Supporting line */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/50 text-sm leading-relaxed mb-6"
        >
          Fixed pricing. Transparent process.<br />
          Crypto or card accepted.
        </motion.p>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {[
            { value: "150+", label: "projects" },
            { value: "5-10", label: "days" },
            { value: "100%", label: "satisfaction" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{stat.value}</span>
              </div>
              <span className="text-xs text-white/50">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section - Fixed at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        {/* Primary CTA */}
        <Button 
          onClick={onStartBrief}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-base shadow-lg shadow-primary/20"
        >
          Start my brief
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Reassurance */}
        <div className="flex items-center justify-center gap-4">
          {["Free brief", "No payment required", "24h response"].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-primary/70" />
              <span className="text-[10px] text-white/40">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Desktop Hero
const DesktopHero = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{firstName?: string; lastName?: string; phone?: string}>({});

  const validateForm = () => {
    const newErrors: {firstName?: string; lastName?: string; phone?: string} = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({ title: "Missing information", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xvzgebre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          recommendation: recommendation.trim() || null,
        }),
      });

      if (!response.ok) {
        toast({ title: "Submission failed", description: "Something went wrong. Please try again.", variant: "destructive" });
        return;
      }
      setFormSubmitted(true);
      toast({ title: "Brief submitted!", description: "We'll review your request within 24 hours." });
      setTimeout(() => document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' }), 2000);
    } catch (err) {
      toast({ title: "Submission failed", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { value: "150+", label: "Projects Delivered" },
    { value: "5-10", label: "Days Delivery" },
    { value: "100%", label: "Satisfaction Rate" },
  ];

  const features = ["Fixed transparent pricing", "Crypto & card payments", "No upfront commitment"];

  return (
    <div className="container mx-auto px-4 relative z-10 pt-32 pb-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8">
            <span className="w-1.5 h-1.5 bg-primary/80 rounded-full" />
            <span className="text-sm text-white/60 font-medium tracking-wide">Web Development Studio</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Professional websites,<br />delivered in <span className="text-primary font-extrabold">5–10 days</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/50 leading-relaxed mb-8 max-w-lg">
            Fixed pricing. Transparent process. Crypto or card payment.<br />Every project handled by a real team.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm text-white/70">{feature}</span>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-10">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right form card */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 rounded-3xl blur-xl opacity-50" />
          
          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-white mb-2">Start your project</h3>
              <p className="text-white/50 text-sm">Get a free proposal within 24 hours</p>
            </div>

            {formSubmitted ? (
              <motion.div className="py-8 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Brief received!</h4>
                <p className="text-sm text-white/60 leading-relaxed">Thank you. A real team member will review your request and contact you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-white/70">First name <span className="text-red-400">*</span></label>
                    <Input
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); setErrors(prev => ({ ...prev, firstName: undefined })); }}
                      className={`bg-white/5 border-white/10 text-white h-12 ${errors.firstName ? 'border-red-400' : ''}`}
                    />
                    {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-white/70">Last name <span className="text-red-400">*</span></label>
                    <Input
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); setErrors(prev => ({ ...prev, lastName: undefined })); }}
                      className={`bg-white/5 border-white/10 text-white h-12 ${errors.lastName ? 'border-red-400' : ''}`}
                    />
                    {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-white/70">Phone <span className="text-red-400">*</span></label>
                  <Input
                    type="tel"
                    placeholder="+1 234 567 890"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setErrors(prev => ({ ...prev, phone: undefined })); }}
                    className={`bg-white/5 border-white/10 text-white h-12 ${errors.phone ? 'border-red-400' : ''}`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-white/70">Recommendation <span className="text-white/40">(optional)</span></label>
                  <Input
                    placeholder="Who referred you to us?"
                    value={recommendation}
                    onChange={(e) => setRecommendation(e.target.value)}
                    className="bg-white/5 border-white/10 text-white h-12"
                  />
                </div>

                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg text-sm mt-2" disabled={isSubmitting}>
                  {isSubmitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</>) : (<>Request a free proposal<ArrowRight className="w-4 h-4 ml-2" /></>)}
                </Button>
                
                <p className="text-xs text-white/40 text-center pt-3 leading-relaxed">Free brief • No payment required • Reviewed by a real project manager</p>
              </form>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            {[{ icon: "M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", label: "Secure" },
              { icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", label: "No spam" },
              { icon: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z", label: "5-star rated" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/40 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d={item.icon} clipRule="evenodd" /></svg>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[hsl(220,20%,8%)]">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-30"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[hsl(220,20%,8%)]/70" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(220,20%,8%)]/50 to-[hsl(220,20%,8%)]" />
        {/* Subtle glow */}
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      {/* Mobile: Static hero */}
      <div className="sm:hidden w-full relative z-10 pt-20">
        <MobileHeroStatic onStartBrief={scrollToForm} />
      </div>

      {/* Desktop: Original hero */}
      <div className="hidden sm:block w-full relative z-10">
        <DesktopHero />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;