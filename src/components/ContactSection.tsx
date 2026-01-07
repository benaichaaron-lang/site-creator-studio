import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mail, MessageCircle, CheckCircle, Loader2, UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactSection = () => {
  const navigate = useNavigate();
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

  const validateForm = () => {
    const newErrors: {firstName?: string; lastName?: string; phone?: string; websiteType?: string; budget?: string; timeline?: string} = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.websiteType) {
      newErrors.websiteType = "Please select a website type";
    }
    if (!formData.budget) {
      newErrors.budget = "Please select a budget range";
    }
    if (!formData.timeline) {
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
          title: "Message failed to send",
          description: "Something went wrong. Please try again or email us directly.",
          variant: "destructive",
        });
        return;
      }

      // Show success state
      setIsSubmitted(true);
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset after delay
      setTimeout(() => {
        setFormData({ firstName: "", lastName: "", phone: "", recommendation: "", websiteType: "", budget: "", timeline: "" });
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      toast({
        title: "Message failed to send",
        description: "Something went wrong. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 relative overflow-hidden">
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
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Contact</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Have a question?
                <br />
                <span className="text-gradient">Let's talk</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                Do you have questions about our offers or need advice? 
                Our team is here to help you bring your project to life.
              </p>

              {/* Contact Options */}
              <div className="space-y-6">
                <motion.a 
                  href="mailto:contact@mysitefactory.io"
                  className="flex items-center gap-4 glass rounded-xl p-4 hover:bg-card/60 transition-colors"
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
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-muted-foreground text-sm">contact@mysitefactory.io</p>
                  </div>
                </motion.a>

                <motion.div 
                  className="flex items-center gap-4 glass rounded-xl p-4 hover:bg-card/60 transition-colors cursor-pointer"
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center"
                    whileHover={{ rotate: -10 }}
                  >
                    <MessageCircle className="w-6 h-6 text-accent" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold">Live Chat</h4>
                    <p className="text-muted-foreground text-sm">Average response within 24h</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Form */}
            <motion.div 
              className="glass-strong rounded-2xl p-8"
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
                    <h3 className="font-display text-2xl font-bold mb-2">Message sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    
                    <div className="w-full border-t border-border pt-6">
                      <p className="text-sm text-muted-foreground mb-4">Create an account to track your project in real-time</p>
                      <Button 
                        onClick={() => navigate('/auth', { state: { firstName: formData.firstName, lastName: formData.lastName, phone: formData.phone } })}
                        className="w-full"
                        variant="outline"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create my account
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
                        <label className="text-sm font-medium mb-2 block">
                          First name <span className="text-red-400">*</span>
                        </label>
                        <Input
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => {
                            setFormData({ ...formData, firstName: e.target.value });
                            setErrors(prev => ({ ...prev, firstName: undefined }));
                          }}
                          className={`bg-secondary/50 border-border/50 focus:border-primary transition-all duration-300 ${errors.firstName ? 'border-red-400' : ''}`}
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
                        <label className="text-sm font-medium mb-2 block">
                          Last name <span className="text-red-400">*</span>
                        </label>
                        <Input
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => {
                            setFormData({ ...formData, lastName: e.target.value });
                            setErrors(prev => ({ ...prev, lastName: undefined }));
                          }}
                          className={`bg-secondary/50 border-border/50 focus:border-primary transition-all duration-300 ${errors.lastName ? 'border-red-400' : ''}`}
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
                      <label className="text-sm font-medium mb-2 block">
                        Phone <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="tel"
                        placeholder="+1 234 567 890"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          setErrors(prev => ({ ...prev, phone: undefined }));
                        }}
                        className={`bg-secondary/50 border-border/50 focus:border-primary transition-all duration-300 ${errors.phone ? 'border-red-400' : ''}`}
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
                      <label className="text-sm font-medium mb-2 block">
                        Recommendation <span className="text-muted-foreground">(optional)</span>
                      </label>
                      <Input
                        placeholder="Who referred you to us?"
                        value={formData.recommendation}
                        onChange={(e) => setFormData({ ...formData, recommendation: e.target.value })}
                        className="bg-secondary/50 border-border/50 focus:border-primary transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="text-sm font-medium mb-2 block">
                        Website type <span className="text-red-400">*</span>
                      </label>
                      <Select 
                        value={formData.websiteType} 
                        onValueChange={(value) => {
                          setFormData({ ...formData, websiteType: value });
                          setErrors(prev => ({ ...prev, websiteType: undefined }));
                        }}
                      >
                        <SelectTrigger className={`bg-secondary/50 border-border/50 ${errors.websiteType ? 'border-red-400' : ''}`}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border">
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
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.55 }}
                      >
                        <label className="text-sm font-medium mb-2 block">
                          Budget range <span className="text-red-400">*</span>
                        </label>
                        <Select 
                          value={formData.budget} 
                          onValueChange={(value) => {
                            setFormData({ ...formData, budget: value });
                            setErrors(prev => ({ ...prev, budget: undefined }));
                          }}
                        >
                          <SelectTrigger className={`bg-secondary/50 border-border/50 ${errors.budget ? 'border-red-400' : ''}`}>
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border">
                            <SelectItem value="starter">Starter (~$500)</SelectItem>
                            <SelectItem value="business">Business (~$1,200)</SelectItem>
                            <SelectItem value="premium">Premium (~$2,000)</SelectItem>
                            <SelectItem value="unsure">Not sure yet</SelectItem>
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
                        <label className="text-sm font-medium mb-2 block">
                          Timeline <span className="text-red-400">*</span>
                        </label>
                        <Select 
                          value={formData.timeline} 
                          onValueChange={(value) => {
                            setFormData({ ...formData, timeline: value });
                            setErrors(prev => ({ ...prev, timeline: undefined }));
                          }}
                        >
                          <SelectTrigger className={`bg-secondary/50 border-border/50 ${errors.timeline ? 'border-red-400' : ''}`}>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border">
                            <SelectItem value="asap">As soon as possible</SelectItem>
                            <SelectItem value="1week">Within 1 week</SelectItem>
                            <SelectItem value="2weeks">Within 2 weeks</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.timeline && (
                          <p className="text-red-400 text-xs mt-1">{errors.timeline}</p>
                        )}
                      </motion.div>
                    </div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.65 }}
                    >
                      <Button 
                        type="submit" 
                        variant="hero" 
                        size="lg" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send message
                            <motion.div
                              whileHover={{ x: 5, rotate: -20 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Send className="w-5 h-5" />
                            </motion.div>
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