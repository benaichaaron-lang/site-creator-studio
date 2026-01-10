import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  packName?: string;
}

const AuthPromptModal = ({ isOpen, onClose, packName }: AuthPromptModalProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSignIn = () => {
    onClose();
    navigate('/auth');
  };

  const handleSignUp = () => {
    onClose();
    navigate('/auth', { state: { isSignUp: true } });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none"
          >
            <div className="w-full max-w-md pointer-events-auto">
              <div className="bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-6 border-b border-white/10">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <UserPlus className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="font-bebas text-2xl md:text-3xl text-white mb-2">
                      {t("authPrompt.title") || "Créez votre compte"}
                    </h2>
                    <p className="text-white/60 text-sm">
                      {packName 
                        ? `${t("authPrompt.subtitleWithPack") || "Pour commander le pack"} ${packName}`
                        : t("authPrompt.subtitle") || "Connectez-vous pour continuer"
                      }
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-white/70 text-sm text-center mb-6">
                    {t("authPrompt.description") || "Créez un compte gratuit pour accéder à votre espace client et suivre vos projets."}
                  </p>

                  <Button
                    onClick={handleSignUp}
                    className="w-full bg-primary hover:bg-primary/90 text-white h-12"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {t("authPrompt.signUp") || "Créer un compte"}
                  </Button>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-white/40 text-xs">{t("authPrompt.or") || "ou"}</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  <Button
                    onClick={handleSignIn}
                    variant="outline"
                    className="w-full h-12 border-white/20 text-white hover:bg-white/10"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    {t("authPrompt.signIn") || "J'ai déjà un compte"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthPromptModal;
