import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Phone, ArrowRight, Loader2, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

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
  
  const navigate = useNavigate();
  const location = useLocation();
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
  }, [location.state]);

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

  const sendConfirmationEmail = async (userEmail: string, userFirstName: string) => {
    try {
      const response = await supabase.functions.invoke('send-auth-email', {
        body: {
          type: 'signup_confirmation',
          email: userEmail,
          firstName: userFirstName,
        },
      });
      
      if (response.error) {
        console.error('Error sending confirmation email:', response.error);
      }
    } catch (error) {
      console.error('Error sending confirmation email:', error);
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
          // Send confirmation email via Resend
          await sendConfirmationEmail(email, firstName);
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

  // Email Confirmation Screen
  if (showConfirmation) {
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
            <Button
              onClick={() => {
                setShowConfirmation(false);
                setIsLogin(true);
              }}
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              {t("authPage.confirmation.backToLogin")}
            </Button>
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

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t("authPage.backToSite")}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
