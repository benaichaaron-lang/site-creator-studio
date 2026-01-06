import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Contact</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Une question ?
                <br />
                <span className="text-gradient">Parlons-en</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                Vous avez des questions sur nos offres ou besoin d'un conseil ? 
                Notre équipe est là pour vous aider à concrétiser votre projet.
              </p>

              {/* Contact Options */}
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center gap-4 glass rounded-xl p-4 hover:bg-card/60 transition-colors cursor-pointer"
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
                </motion.div>

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
                    <h4 className="font-semibold">Chat en direct</h4>
                    <p className="text-muted-foreground text-sm">Réponse sous 24h en moyenne</p>
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="text-sm font-medium mb-2 block">Nom</label>
                    <Input
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-secondary/50 border-border/50 focus:border-primary transition-all duration-300"
                      required
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                  >
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-secondary/50 border-border/50 focus:border-primary transition-all duration-300"
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="text-sm font-medium mb-2 block">Sujet</label>
                  <Input
                    placeholder="Comment pouvons-nous vous aider ?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary transition-all duration-300"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea
                    placeholder="Décrivez votre projet ou posez-nous votre question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary min-h-[150px] transition-all duration-300"
                    required
                  />
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Envoyer le message
                    <motion.div
                      whileHover={{ x: 5, rotate: -20 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
