import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CreditCard, 
  CheckCircle, 
  Loader2,
  Bitcoin,
  Copy,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Pack {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  pack_type: string;
  duration_months: number | null;
  features: string[];
}

interface PaymentData {
  payment_id: string;
  pay_address: string;
  pay_amount: number;
  pay_currency: string;
  order_id: string;
  order_description: string;
  price_amount: number;
  price_currency: string;
  expiration_estimate_date?: string;
}

const CRYPTO_OPTIONS = [
  { value: 'btc', label: 'Bitcoin (BTC)', icon: '₿' },
  { value: 'eth', label: 'Ethereum (ETH)', icon: 'Ξ' },
  { value: 'ltc', label: 'Litecoin (LTC)', icon: 'Ł' },
  { value: 'usdttrc20', label: 'USDT (TRC20)', icon: '₮' },
  { value: 'usdterc20', label: 'USDT (ERC20)', icon: '₮' },
  { value: 'bnbbsc', label: 'BNB (BSC)', icon: '◈' },
];

const CountdownTimer = ({ expirationDate, t }: { expirationDate: string; t: (key: string) => string }) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const expiration = new Date(expirationDate).getTime();
      const now = Date.now();
      const difference = expiration - now;

      if (difference <= 0) {
        setIsExpired(true);
        return { minutes: 0, seconds: 0 };
      }

      return {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expirationDate]);

  if (isExpired) {
    return (
      <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <p className="text-sm font-medium text-destructive">{t("checkout.paymentExpired")}</p>
      </div>
    );
  }

  const totalSeconds = timeLeft.minutes * 60 + timeLeft.seconds;
  const isUrgent = totalSeconds < 300;

  return (
    <div className={`p-4 rounded-xl border ${isUrgent ? 'bg-orange-500/10 border-orange-500/20' : 'bg-primary/5 border-primary/20'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className={`h-5 w-5 ${isUrgent ? 'text-orange-500' : 'text-primary'}`} />
          <span className="text-sm font-medium">{t("checkout.timeRemaining")}</span>
        </div>
        <div className={`font-mono text-2xl font-bold ${isUrgent ? 'text-orange-500' : 'text-primary'}`}>
          {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  const { packId } = useParams<{ packId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const [pack, setPack] = useState<Pack | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState('btc');
  const [processing, setProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchPack();
  }, [user, packId, navigate]);

  const fetchPack = async () => {
    if (!packId) return;
    
    try {
      const { data, error } = await supabase
        .from('packs')
        .select('*')
        .eq('id', packId)
        .single();

      if (error) throw error;

      setPack({
        ...data,
        features: Array.isArray(data.features) ? data.features : JSON.parse(data.features as string || '[]')
      });
    } catch (error) {
      toast({
        title: t("checkout.toasts.error"),
        description: t("checkout.toasts.packNotFound"),
        variant: "destructive"
      });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayment = async () => {
    if (!pack || !user) return;

    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          pack_id: pack.id,
          amount: pack.price,
          currency: pack.currency,
          crypto_currency: selectedCrypto,
          user_id: user.id
        }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setPaymentData(data);
      toast({
        title: t("checkout.toasts.paymentCreated"),
        description: t("checkout.toasts.sendExactAmount")
      });
    } catch (error: any) {
      toast({
        title: t("checkout.toasts.error"),
        description: error.message || t("checkout.toasts.cantCreatePayment"),
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
    toast({ title: t("checkout.copied") });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!pack) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("checkout.backToDashboard")}
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Pack Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant={pack.pack_type === 'subscription' ? 'default' : 'secondary'}>
                  {pack.pack_type === 'subscription' ? t("checkout.subscription") : t("checkout.oneTimePayment")}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{pack.name}</CardTitle>
              <CardDescription>{pack.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">{pack.price}</span>
                <span className="text-muted-foreground">{pack.currency}</span>
                {pack.pack_type === 'subscription' && pack.duration_months && (
                  <span className="text-muted-foreground">
                    /{pack.duration_months === 1 ? t("checkout.perMonth") : `${pack.duration_months} ${t("checkout.perMonths")}`}
                  </span>
                )}
              </div>
              <ul className="space-y-2">
                {pack.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Payment Section */}
          {!paymentData ? (
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10 border-b border-border">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Bitcoin className="h-5 w-5 text-primary" />
                  </div>
                  {t("checkout.cryptoPayment")}
                </CardTitle>
                <CardDescription>
                  {t("checkout.selectCrypto")}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CRYPTO_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedCrypto(option.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedCrypto === option.value
                          ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="text-xs font-medium truncate">{option.label.split(' ')[0]}</div>
                    </button>
                  ))}
                </div>

                <Button 
                  className="w-full h-14 text-base font-semibold" 
                  size="lg" 
                  onClick={handleCreatePayment}
                  disabled={processing}
                >
                  {processing ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <CreditCard className="h-5 w-5 mr-2" />
                  )}
                  {t("checkout.proceedToPayment")}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {t("checkout.securePayment")}
                </p>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 border-primary/30 overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-primary/10 to-primary/5 border-b border-primary/20">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-primary">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Clock className="h-5 w-5" />
                      </div>
                      {t("checkout.awaitingPayment")}
                    </CardTitle>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {paymentData.pay_currency.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Countdown Timer */}
                  {paymentData.expiration_estimate_date && (
                    <CountdownTimer expirationDate={paymentData.expiration_estimate_date} t={t} />
                  )}

                  {/* QR Code */}
                  <div className="flex justify-center">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="p-6 bg-white rounded-2xl shadow-xl"
                    >
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paymentData.pay_address)}`}
                        alt="QR Code"
                        className="w-48 h-48"
                      />
                    </motion.div>
                  </div>

                  {/* Payment Details */}
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-xl border border-border">
                      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">{t("checkout.exactAmount")}</p>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-3xl font-bold text-foreground">
                          {paymentData.pay_amount} <span className="text-lg text-muted-foreground">{paymentData.pay_currency.toUpperCase()}</span>
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="shrink-0"
                          onClick={() => copyToClipboard(paymentData.pay_amount.toString(), 'amount')}
                        >
                          {copied === 'amount' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-xl border border-border">
                      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">{t("checkout.paymentAddress")}</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 p-3 bg-background rounded-lg text-xs break-all font-mono">
                          {paymentData.pay_address}
                        </code>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="shrink-0"
                          onClick={() => copyToClipboard(paymentData.pay_address, 'address')}
                        >
                          {copied === 'address' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      {t("checkout.paymentVerification")}
                    </p>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full h-12"
                    onClick={() => navigate('/dashboard')}
                  >
                    {t("checkout.backToDashboard")}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;