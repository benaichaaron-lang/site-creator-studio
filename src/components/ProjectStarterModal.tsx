import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, User, CreditCard, Zap, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectStarterModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectType: {
    id: string;
    title: string;
    price: string;
    delay: string;
    features?: string[];
  };
}

const ProjectStarterModal = ({ isOpen, onClose, projectType }: ProjectStarterModalProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"choice" | "brief" | "login">("choice");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");

  const handleStartBrief = () => {
    setStep("brief");
  };

  const handleLogin = () => {
    navigate("/auth", { state: { returnTo: "/checkout", projectType: projectType.id } });
    onClose();
  };

  const handlePayNow = () => {
    if (user) {
      navigate("/checkout", { state: { projectType: projectType.id } });
    } else {
      navigate("/auth", { state: { returnTo: "/checkout", projectType: projectType.id } });
    }
    onClose();
  };

  const handleSubmitBrief = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit brief and redirect to contact confirmation
    navigate("/contact", { state: { briefSubmitted: true, projectType: projectType.id } });
    onClose();
  };

  const resetAndClose = () => {
    setStep("choice");
    setEmail("");
    setName("");
    setPhone("");
    setDetails("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div className="w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-6 border-b border-white/10">
                <button
                  onClick={resetAndClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bebas text-2xl text-white tracking-tight">
                      {projectType.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-primary font-semibold">{projectType.price}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-white/60">{projectType.delay}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {step === "choice" && (
                    <motion.div
                      key="choice"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <h4 className="font-bebas text-xl text-white mb-6">
                        {t("projectStarter.title")}
                      </h4>

                      {/* Option 1: Start Brief */}
                      <button
                        onClick={handleStartBrief}
                        className="w-full p-5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all group text-left"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                            <ArrowRight className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-white mb-1">
                              {t("projectStarter.briefOption.title")}
                            </h5>
                            <p className="text-sm text-white/60">
                              {t("projectStarter.briefOption.description")}
                            </p>
                          </div>
                        </div>
                      </button>

                      {/* Option 2: Pay Now */}
                      <button
                        onClick={handlePayNow}
                        className="w-full p-5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 hover:border-primary/60 transition-all group text-left"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/40 transition-colors">
                            <CreditCard className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-white mb-1">
                              {t("projectStarter.payOption.title")}
                            </h5>
                            <p className="text-sm text-white/60">
                              {t("projectStarter.payOption.description")}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Shield className="w-3.5 h-3.5 text-green-400" />
                              <span className="text-xs text-green-400">
                                {t("projectStarter.payOption.secure")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Benefits */}
                      <div className="pt-4 border-t border-white/10 mt-6">
                        <div className="flex items-center gap-6 text-xs text-white/50">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{t("projectStarter.benefits.response")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5" />
                            <span>{t("projectStarter.benefits.noCommitment")}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === "brief" && (
                    <motion.div
                      key="brief"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <button
                        onClick={() => setStep("choice")}
                        className="text-sm text-white/50 hover:text-white mb-4 flex items-center gap-1"
                      >
                        ← {t("projectStarter.back")}
                      </button>

                      <h4 className="font-bebas text-xl text-white mb-6">
                        {t("projectStarter.briefForm.title")}
                      </h4>

                      <form onSubmit={handleSubmitBrief} className="space-y-4">
                        <div>
                          <label className="text-sm text-white/60 mb-1.5 block">
                            {t("projectStarter.briefForm.name")} *
                          </label>
                          <Input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Jean Dupont"
                            className="bg-white/5 border-white/10 text-white h-12"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-white/60 mb-1.5 block">
                            {t("projectStarter.briefForm.email")} *
                          </label>
                          <Input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="jean@exemple.com"
                            className="bg-white/5 border-white/10 text-white h-12"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-white/60 mb-1.5 block">
                            {t("projectStarter.briefForm.phone")}
                          </label>
                          <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+33 6 12 34 56 78"
                            className="bg-white/5 border-white/10 text-white h-12"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-white/60 mb-1.5 block">
                            {t("projectStarter.briefForm.details")}
                          </label>
                          <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder={t("projectStarter.briefForm.detailsPlaceholder")}
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-md text-white px-3 py-2 text-sm placeholder:text-white/30 focus:border-primary/50 focus:outline-none resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold"
                        >
                          {t("projectStarter.briefForm.submit")}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectStarterModal;
