import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const HeroSection = () => {
  const [websiteType, setWebsiteType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{websiteType?: string; budget?: string; timeline?: string}>({});

  const validateForm = () => {
    const newErrors: {websiteType?: string; budget?: string; timeline?: string} = {};
    
    if (!websiteType) {
      newErrors.websiteType = "Please select a website type";
    }
    if (!budget) {
      newErrors.budget = "Please select a budget range";
    }
    if (!timeline) {
      newErrors.timeline = "Please select a timeline";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          website_type: websiteType,
          budget: budget,
          timeline: timeline,
        });

      if (error) {
        console.error("Error submitting lead:", error);
        toast({
          title: "Submission failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setFormSubmitted(true);
      toast({
        title: "Brief submitted!",
        description: "We'll review your request within 24 hours.",
      });
      
      setTimeout(() => {
        const packsSection = document.getElementById('packs');
        if (packsSection) {
          packsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 2000);
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { value: "150+", label: "Projects Delivered" },
    { value: "5-10", label: "Days Delivery" },
    { value: "100%", label: "Satisfaction Rate" },
  ];

  const features = [
    "Fixed transparent pricing",
    "Crypto & card payments",
    "No upfront commitment",
  ];

  return (
    <section className="relative min-h-screen lg:min-h-[88vh] flex items-center overflow-hidden bg-[hsl(220,20%,8%)]">
      {/* Subtle professional background */}
      <div className="absolute inset-0">
        {/* Very subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(hsl(220,40%,50%) 1px, transparent 1px), linear-gradient(90deg, hsl(220,40%,50%) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,25%,10%)] via-[hsl(220,20%,8%)] to-[hsl(220,20%,8%)]" />
        
        {/* Very subtle accent glow - minimal */}
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-2xl">
            {/* Badge - subtle and professional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
            >
              <span className="w-1.5 h-1.5 bg-primary/80 rounded-full" />
              <span className="text-sm text-white/60 font-medium tracking-wide">Web Development Studio</span>
            </motion.div>

            {/* Main headline - confident, not hype */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            >
              Professional websites,
              <br />
              delivered in{" "}
              <span className="text-primary font-extrabold">5–10 days</span>
            </motion.h1>

            {/* Subtitle - clear and calm */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/50 leading-relaxed mb-8 max-w-lg"
            >
              Fixed pricing. Transparent process. Crypto or card payment.
              <br />
              Every project handled by a real team.
            </motion.p>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-x-6 gap-y-3 mb-10"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-white/70">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-6 sm:gap-10"
            >
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right form card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            {/* Card glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 rounded-3xl blur-xl opacity-50" />
            
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">Start your project</h3>
                <p className="text-white/50 text-sm">Get a free proposal within 24 hours</p>
              </div>

              {formSubmitted ? (
                <motion.div
                  className="py-8 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Brief received!</h4>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Thank you. A real team member will review your request and contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-white/70">
                      Website type <span className="text-red-400">*</span>
                    </label>
                    <Select value={websiteType} onValueChange={(value) => {
                      setWebsiteType(value);
                      setErrors(prev => ({ ...prev, websiteType: undefined }));
                    }}>
                      <SelectTrigger className={`bg-white/5 border-white/10 text-white h-12 ${errors.websiteType ? 'border-red-400' : ''}`}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="landing">Landing page</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="business">Business site</SelectItem>
                        <SelectItem value="portfolio">Portfolio</SelectItem>
                        <SelectItem value="webapp">Web app</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.websiteType && (
                      <p className="text-red-400 text-xs mt-1">{errors.websiteType}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-white/70">
                      Budget range <span className="text-red-400">*</span>
                    </label>
                    <Select value={budget} onValueChange={(value) => {
                      setBudget(value);
                      setErrors(prev => ({ ...prev, budget: undefined }));
                    }}>
                      <SelectTrigger className={`bg-white/5 border-white/10 text-white h-12 ${errors.budget ? 'border-red-400' : ''}`}>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Starter (~$500)</SelectItem>
                        <SelectItem value="business">Business (~$1,200)</SelectItem>
                        <SelectItem value="premium">Premium (~$2,000)</SelectItem>
                        <SelectItem value="unsure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.budget && (
                      <p className="text-red-400 text-xs mt-1">{errors.budget}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-white/70">
                      Timeline <span className="text-red-400">*</span>
                    </label>
                    <Select value={timeline} onValueChange={(value) => {
                      setTimeline(value);
                      setErrors(prev => ({ ...prev, timeline: undefined }));
                    }}>
                      <SelectTrigger className={`bg-white/5 border-white/10 text-white h-12 ${errors.timeline ? 'border-red-400' : ''}`}>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">As soon as possible</SelectItem>
                        <SelectItem value="1week">Within 1 week</SelectItem>
                        <SelectItem value="2weeks">Within 2 weeks</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.timeline && (
                      <p className="text-red-400 text-xs mt-1">{errors.timeline}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg text-sm mt-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request a free proposal
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                  
                  {/* Reassuring micro-copy */}
                  <p className="text-xs text-white/40 text-center pt-3 leading-relaxed">
                    Free brief • No payment required • Reviewed by a real project manager
                  </p>
                </form>
              )}
            </div>

            {/* Trust badges under form */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6">
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No spam</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>5-star rated</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;