import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Phone, ArrowRight, Loader2, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';
import googleLogo from '@/assets/google-logo.png';

const Auth = () => {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { signIn, signUp, user, isAdmin } = useAuth();
  const { toast } = useToast();

  const signUpSchema = z.object({
    email: z.string().email(t("authPage.errors.invalidEmail")).max(255),
    password: z.string().min(6, t("authPage.errors.passwordMin")),
    firstName: z.string().min(1, t("authPage.errors.firstNameRequired")).max(100),
    lastName: z.string().min(1, t("authPage.errors.lastNameRequired")).max(100),
    phone: z.string().optional(),
  });

  const signInSchema = z.object({
    email: z.string().email(t("authPage.errors.invalidEmail")),
    password: z.string().min(1, t("authPage.errors.passwordRequired")),
  });

  // Pre-fill data from form submission
  useEffect(() => {
    const state = location.state as { firstName?: string; lastName?: string; phone?: string; isSignUp?: boolean } | null;
    if (state) {
      if (state.firstName) setFirstName(state.firstName);
      if (state.lastName) setLastName(state.lastName);
      if (state.phone) setPhone(state.phone);
      if (state.isSignUp) setIsLogin(false);
    }
    
    // Check if coming from email verification
    if (searchParams.get('verified') === 'true') {
      setEmailVerified(true);
      setIsLogin(true);
    }
  }, [location.state, searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, isAdmin, navigate]);

  // Note: Welcome email with magic link is sent from AuthContext.signUp()
  // No need to send a separate confirmation email here

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        toast({
          title: t("authPage.toasts.error"),
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t("authPage.toasts.error"),
        description: t("authPage.toasts.unexpectedError"),
        variant: "destructive",
      });
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use our custom edge function that sends via Resend only
      const { error } = await supabase.functions.invoke('reset-password', {
        body: {
          email: forgotPasswordEmail,
        },
      });

      if (error) {
        toast({
          title: t("authPage.toasts.error"),
          description: error.message,
          variant: "destructive",
        });
      } else {
        setForgotPasswordSent(true);
      }
    } catch (error) {
      toast({
        title: t("authPage.toasts.error"),
        description: t("authPage.toasts.unexpectedError"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      if (isLogin) {
        const validation = signInSchema.safeParse({ email, password });
        if (!validation.success) {
          const fieldErrors: Record<string, string> = {};
          validation.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setIsLoading(false);
          return;
        }

        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: t("authPage.toasts.loginError"),
              description: t("authPage.toasts.wrongCredentials"),
              variant: "destructive",
            });
          } else {
            toast({
              title: t("authPage.toasts.error"),
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: t("authPage.toasts.loginSuccess"),
            description: t("authPage.toasts.welcome"),
          });
        }
      } else {
        const validation = signUpSchema.safeParse({ email, password, firstName, lastName, phone });
        if (!validation.success) {
          const fieldErrors: Record<string, string> = {};
          validation.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(email, password, {
          first_name: firstName,
          last_name: lastName,
          phone: phone || undefined,
        });

        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: t("authPage.toasts.accountExists"),
              description: t("authPage.toasts.accountExistsDesc"),
              variant: "destructive",
            });
            setIsLogin(true);
          } else {
            toast({
              title: t("authPage.toasts.signUpError"),
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          // Welcome email with magic link is automatically sent from AuthContext.signUp()
          setShowConfirmation(true);
        }
      }
    } catch (err) {
      toast({
        title: t("authPage.toasts.error"),
        description: t("authPage.toasts.unexpectedError"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password Form
  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-hero flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-2xl shadow-elevated p-8">
            <AnimatePresence mode="wait">
              {forgotPasswordSent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    {t("authPage.forgotPassword.emailSent")}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {t("authPage.forgotPassword.emailSentDesc")}
                  </p>
                  <Button
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotPasswordSent(false);
                      setForgotPasswordEmail('');
                    }}
                    className="w-full"
                  >
                    {t("authPage.forgotPassword.backToLogin")}
                  </Button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t("authPage.forgotPassword.back")}
                  </button>
                  
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {t("authPage.forgotPassword.title")}
                  </h1>
                  <p className="text-muted-foreground mb-6">
                    {t("authPage.forgotPassword.subtitle")}
                  </p>

                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="forgot-email">{t("authPage.email")}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="forgot-email"
                          type="email"
                          placeholder="jean@exemple.com"
                          value={forgotPasswordEmail}
                          onChange={(e) => setForgotPasswordEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary hover:opacity-90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          {t("authPage.forgotPassword.submit")}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  }

  // Helper function to get email provider link
  const getEmailProviderLink = (userEmail: string): { name: string; url: string } | null => {
    const domain = userEmail.split('@')[1]?.toLowerCase();
    
    const providers: Record<string, { name: string; url: string }> = {
      'gmail.com': { name: 'Gmail', url: 'https://mail.google.com' },
      'googlemail.com': { name: 'Gmail', url: 'https://mail.google.com' },
      'outlook.com': { name: 'Outlook', url: 'https://outlook.live.com' },
      'outlook.fr': { name: 'Outlook', url: 'https://outlook.live.com' },
      'hotmail.com': { name: 'Outlook', url: 'https://outlook.live.com' },
      'hotmail.fr': { name: 'Outlook', url: 'https://outlook.live.com' },
      'live.com': { name: 'Outlook', url: 'https://outlook.live.com' },
      'live.fr': { name: 'Outlook', url: 'https://outlook.live.com' },
      'msn.com': { name: 'Outlook', url: 'https://outlook.live.com' },
      'yahoo.com': { name: 'Yahoo Mail', url: 'https://mail.yahoo.com' },
      'yahoo.fr': { name: 'Yahoo Mail', url: 'https://mail.yahoo.com' },
      'icloud.com': { name: 'iCloud Mail', url: 'https://www.icloud.com/mail' },
      'me.com': { name: 'iCloud Mail', url: 'https://www.icloud.com/mail' },
      'mac.com': { name: 'iCloud Mail', url: 'https://www.icloud.com/mail' },
      'protonmail.com': { name: 'ProtonMail', url: 'https://mail.protonmail.com' },
      'proton.me': { name: 'Proton Mail', url: 'https://mail.proton.me' },
      'orange.fr': { name: 'Orange Mail', url: 'https://messagerie.orange.fr' },
      'wanadoo.fr': { name: 'Orange Mail', url: 'https://messagerie.orange.fr' },
      'sfr.fr': { name: 'SFR Mail', url: 'https://webmail.sfr.fr' },
      'free.fr': { name: 'Free Mail', url: 'https://webmail.free.fr' },
      'laposte.net': { name: 'La Poste', url: 'https://www.laposte.net/accueil' },
    };
    
    return providers[domain] || null;
  };

  // Email Confirmation Screen
  if (showConfirmation) {
    const emailProvider = getEmailProviderLink(email);
    
    return (
      <div className="min-h-screen bg-hero flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-2xl shadow-elevated p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {t("authPage.confirmation.title")}
            </h1>
            <p className="text-muted-foreground mb-6">
              {t("authPage.confirmation.subtitle")}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {t("authPage.confirmation.checkSpam")}
            </p>
            
            <div className="space-y-3">
              {emailProvider && (
                <Button
                  onClick={() => window.open(emailProvider.url, '_blank')}
                  className="w-full bg-gradient-primary hover:opacity-90"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t("authPage.confirmation.openMailbox").replace('{provider}', emailProvider.name)}
                </Button>
              )}
              
              <Button
                variant={emailProvider ? "outline" : "default"}
                onClick={() => {
                  setShowConfirmation(false);
                  setIsLogin(true);
                }}
                className={emailProvider ? "w-full" : "w-full bg-gradient-primary hover:opacity-90"}
              >
                {t("authPage.confirmation.backToLogin")}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-elevated p-8">
          {/* Email verified success banner */}
          {emailVerified && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-sm text-green-400">
                {t("authPage.emailVerified") || "Email vérifié avec succès ! Connectez-vous maintenant."}
              </p>
            </motion.div>
          )}
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {isLogin ? t("authPage.signIn") : t("authPage.signUp")}
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? t("authPage.accessClient")
                : t("authPage.joinUs")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("authPage.firstName")}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Jean"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`pl-10 ${errors.firstName ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-xs text-destructive">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("authPage.lastName")}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Dupont"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={`pl-10 ${errors.lastName ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-xs text-destructive">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("authPage.phoneOptional")}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+33 6 12 34 56 78"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t("authPage.email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="jean@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("authPage.password")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
              {!isLogin && <PasswordStrengthIndicator password={password} />}
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:underline"
                >
                  {t("authPage.forgotPasswordLink")}
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {isLogin ? t("authPage.signInBtn") : t("authPage.signUpBtn")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Google OAuth Button */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  {t("googleAuth.or")}
                </span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full mt-4"
              onClick={handleGoogleSignIn}
            >
              <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" />
              {t("googleAuth.continueWith")}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin 
                ? t("authPage.noAccount")
                : t("authPage.hasAccount")}
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-border/50">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/')}
              className="w-full text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("authPage.backToSite")}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
