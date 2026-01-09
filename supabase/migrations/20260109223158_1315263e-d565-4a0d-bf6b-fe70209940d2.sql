
-- Create payment_intents table for pre-payment flow
-- This stores the payment intention BEFORE a user pays
-- Order is only created after payment is confirmed

CREATE TABLE public.payment_intents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  pack_id uuid REFERENCES public.packs(id),
  amount numeric NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  crypto_currency text,
  nowpayments_payment_id text,
  pay_address text,
  pay_amount numeric,
  status text NOT NULL DEFAULT 'pending', -- pending, paid, expired, failed
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payment_intents ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own payment intents"
ON public.payment_intents
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payment intents"
ON public.payment_intents
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all payment intents"
ON public.payment_intents
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update all payment intents"
ON public.payment_intents
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_payment_intents_updated_at
BEFORE UPDATE ON public.payment_intents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_payment_intents_nowpayments_id ON public.payment_intents(nowpayments_payment_id);
CREATE INDEX idx_payment_intents_user_id ON public.payment_intents(user_id);
CREATE INDEX idx_payment_intents_status ON public.payment_intents(status);
