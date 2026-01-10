import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, RefreshCw, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type VerificationStatus = 'loading' | 'success' | 'redirecting' | 'expired' | 'invalid' | 'error';

const VerifyEmail = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendEmail, setResendEmail] = useState('');

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('invalid');
      setErrorMessage(t('verifyEmail.errors.noToken'));
      return;
    }

    verifyToken(token);
  }, [token]);

  const verifyToken = async (token: string) => {
    try {
      setStatus('loading');

      const { data, error } = await supabase.functions.invoke('verify-email-token', {
        body: { token }
      });

      if (error) {
        console.error('Verification error:', error);
        handleVerificationError({ code: 'INTERNAL_ERROR', message: error.message });
        return;
      }

      if (data.error) {
        handleVerificationError({ code: data.code, message: data.error });
        return;
      }

      // Success! We have a magic link - redirect to it for auto-authentication
      if (data.magic_link) {
        setStatus('redirecting');
        toast({
          title: t('verifyEmail.success.title'),
          description: t('verifyEmail.success.description'),
        });

        // Small delay to show success message, then redirect to magic link
        setTimeout(() => {
          // Redirect to the Supabase magic link which will auto-authenticate
          window.location.href = data.magic_link;
        }, 1500);
        return;
      }

      // Fallback if no magic link (shouldn't happen)
      setStatus('success');
      toast({
        title: t('verifyEmail.success.title'),
        description: t('verifyEmail.success.loginRequired'),
      });
      setTimeout(() => navigate('/auth'), 2000);

    } catch (err: any) {
      console.error('Verification catch error:', err);
      setStatus('error');
      setErrorMessage(t('verifyEmail.errors.generic'));
    }
  };

  const handleVerificationError = (error: { code: string; message: string }) => {
    switch (error.code) {
      case 'EXPIRED_TOKEN':
        setStatus('expired');
        setErrorMessage(t('verifyEmail.errors.expired'));
        break;
      case 'USED_TOKEN':
        setStatus('invalid');
        setErrorMessage(t('verifyEmail.errors.alreadyUsed'));
        break;
      case 'INVALID_TOKEN':
        setStatus('invalid');
        setErrorMessage(t('verifyEmail.errors.invalid'));
        break;
      default:
        setStatus('error');
        setErrorMessage(error.message || t('verifyEmail.errors.generic'));
    }
  };

  const handleResendEmail = async () => {
    if (!resendEmail) {
      toast({
        title: t('verifyEmail.resend.enterEmail'),
        variant: "destructive",
      });
      return;
    }

    setIsResending(true);
    try {
      // Request new verification email via edge function
      const { error } = await supabase.functions.invoke('resend-verification-email', {
        body: { email: resendEmail }
      });

      if (error) throw error;

      toast({
        title: t('verifyEmail.resend.success'),
        description: t('verifyEmail.resend.checkInbox'),
      });
    } catch (err) {
      toast({
        title: t('verifyEmail.resend.error'),
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              {t('verifyEmail.loading.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('verifyEmail.loading.description')}
            </p>
          </motion.div>
        );

      case 'redirecting':
        return (
          <motion.div
            key="redirecting"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              {t('verifyEmail.success.title')}
            </h1>
            <p className="text-muted-foreground mb-4">
              {t('verifyEmail.success.description')}
            </p>
            <div className="flex items-center justify-center gap-2 text-primary">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">{t('verifyEmail.success.redirecting')}</span>
            </div>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              {t('verifyEmail.success.title')}
            </h1>
            <p className="text-muted-foreground mb-6">
              {t('verifyEmail.success.description')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('verifyEmail.success.redirecting')}
            </p>
          </motion.div>
        );

      case 'expired':
        return (
          <motion.div
            key="expired"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
              <RefreshCw className="w-10 h-10 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              {t('verifyEmail.expired.title')}
            </h1>
            <p className="text-muted-foreground mb-6">
              {errorMessage}
            </p>
            
            <div className="space-y-4">
              <input
                type="email"
                placeholder={t('verifyEmail.resend.placeholder')}
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary transition-colors"
              />
              <Button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full bg-gradient-primary"
              >
                {isResending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Mail className="w-4 h-4 mr-2" />
                )}
                {t('verifyEmail.resend.button')}
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/auth')}
                className="w-full"
              >
                {t('verifyEmail.backToLogin')}
              </Button>
            </div>
          </motion.div>
        );

      case 'invalid':
      case 'error':
      default:
        return (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              {t('verifyEmail.error.title')}
            </h1>
            <p className="text-muted-foreground mb-6">
              {errorMessage}
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/auth')}
                className="w-full bg-gradient-primary"
              >
                {t('verifyEmail.backToLogin')}
              </Button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-elevated p-8">
          {renderContent()}
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
