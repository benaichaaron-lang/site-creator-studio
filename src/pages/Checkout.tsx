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
  ExternalLink,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
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
}

const CRYPTO_OPTIONS = [
  { value: 'btc', label: 'Bitcoin (BTC)' },
  { value: 'eth', label: 'Ethereum (ETH)' },
  { value: 'ltc', label: 'Litecoin (LTC)' },
  { value: 'usdttrc20', label: 'USDT (TRC20)' },
  { value: 'usdterc20', label: 'USDT (ERC20)' },
  { value: 'bnbbsc', label: 'BNB (BSC)' },
];

const Checkout = () => {
  const { packId } = useParams<{ packId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [pack, setPack] = useState<Pack | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState('btc');
  const [processing, setProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [copied, setCopied] = useState(false);

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
        title: "Erreur",
        description: "Pack introuvable",
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
        title: "Paiement créé",
        description: "Envoyez le montant exact à l'adresse indiquée"
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer le paiement",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copié !" });
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
          Retour au dashboard
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
                  {pack.pack_type === 'subscription' ? 'Abonnement' : 'Paiement unique'}
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
                    /{pack.duration_months === 1 ? 'mois' : `${pack.duration_months} mois`}
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bitcoin className="h-5 w-5" />
                  Paiement en Crypto
                </CardTitle>
                <CardDescription>
                  Sélectionnez votre cryptomonnaie préférée
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Cryptomonnaie</label>
                  <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CRYPTO_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleCreatePayment}
                  disabled={processing}
                >
                  {processing ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CreditCard className="h-4 w-4 mr-2" />
                  )}
                  Procéder au paiement
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Clock className="h-5 w-5" />
                  En attente de paiement
                </CardTitle>
                <CardDescription>
                  Envoyez le montant exact à l'adresse ci-dessous
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-lg">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paymentData.pay_address)}`}
                      alt="QR Code de paiement"
                      className="w-48 h-48"
                    />
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Montant à envoyer</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold">
                        {paymentData.pay_amount} {paymentData.pay_currency.toUpperCase()}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(paymentData.pay_amount.toString())}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Adresse de paiement</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 p-2 bg-background rounded text-xs break-all">
                        {paymentData.pay_address}
                      </code>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(paymentData.pay_address)}
                      >
                        {copied ? <CheckCircle className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  <p className="text-sm">
                    Le paiement sera vérifié automatiquement. Vous recevrez une confirmation une fois le paiement confirmé sur la blockchain.
                  </p>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/dashboard')}
                >
                  Retour au dashboard
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
