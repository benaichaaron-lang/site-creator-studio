import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, Mail, MessageCircle, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
    consent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{name?: string; email?: string; message?: string; consent?: string}>({});

  const validateForm = () => {
    const newErrors: {name?: string; email?: string; message?: string; consent?: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    if (!formData.consent) {
      newErrors.consent = "Please agree to be contacted";
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
        .from('contact_messages')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          topic: formData.topic || null,
          message: formData.message.trim(),
        });

      if (error) {
        console.error("Error submitting contact message:", error);
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
        setFormData({ name: "", email: "", topic: "", message: "", consent: false });
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error("Unexpected error:", err);
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
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
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
                          Name <span className="text-red-400">*</span>
                        </label>
                        <Input
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            setErrors(prev => ({ ...prev, name: undefined }));
                          }}
                          className={`bg-secondary/50 border-border/50 focus:border-primary transition-all duration-300 ${errors.name ? 'border-red-400' : ''}`}
                        />
                        {errors.name && (
                          <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                        )}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35 }}
                      >
                        <label className="text-sm font-medium mb-2 block">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            setErrors(prev => ({ ...prev, email: undefined }));
                          }}
                          className={`bg-secondary/50 border-border/50 focus:border-primary transition-all duration-300 ${errors.email ? 'border-red-400' : ''}`}
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                        )}
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="text-sm font-medium mb-2 block">Topic</label>
                      <Select 
                        value={formData.topic} 
                        onValueChange={(value) => setFormData({ ...formData, topic: value })}
                      >
                        <SelectTrigger className="bg-secondary/50 border-border/50">
                          <SelectValue placeholder="What can we help you with?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quote">Request a quote</SelectItem>
                          <SelectItem value="support">Support / Question</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.45 }}
                    >
                      <label className="text-sm font-medium mb-2 block">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <Textarea
                        placeholder="Describe your project or ask us your question..."
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          setErrors(prev => ({ ...prev, message: undefined }));
                        }}
                        className={`bg-secondary/50 border-border/50 focus:border-primary min-h-[120px] transition-all duration-300 ${errors.message ? 'border-red-400' : ''}`}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => {
                          setFormData({ ...formData, consent: checked as boolean });
                          setErrors(prev => ({ ...prev, consent: undefined }));
                        }}
                        className={`mt-0.5 ${errors.consent ? 'border-red-400' : ''}`}
                      />
                      <label 
                        htmlFor="consent" 
                        className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                      >
                        I agree to be contacted by MySiteFactory regarding my request. 
                        Your data will be processed according to our privacy policy.
                        <span className="text-red-400"> *</span>
                      </label>
                    </motion.div>
                    {errors.consent && (
                      <p className="text-red-400 text-xs -mt-4">{errors.consent}</p>
                    )}

                    <motion.div 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.55 }}
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