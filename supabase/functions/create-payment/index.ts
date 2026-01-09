import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  pack_id: string;
  amount: number;
  currency: string;
  crypto_currency: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const NOWPAYMENTS_API_KEY = Deno.env.get('NOWPAYMENTS_API_KEY');
    if (!NOWPAYMENTS_API_KEY) {
      throw new Error('NOWPAYMENTS_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Validate auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = user.id;
    const { pack_id, amount, currency, crypto_currency } = await req.json() as PaymentRequest;

    console.log('Creating payment intent:', { pack_id, amount, currency, crypto_currency, userId });

    // Create payment intent in database (NOT an order yet)
    const { data: intentData, error: intentError } = await supabase
      .from('payment_intents')
      .insert({
        user_id: userId,
        pack_id,
        amount,
        currency,
        crypto_currency,
        status: 'pending'
      })
      .select()
      .single();

    if (intentError) {
      console.error('Error creating payment intent:', intentError);
      throw new Error('Failed to create payment intent');
    }

    console.log('Payment intent created:', intentData.id);

    // Create payment with NOWPayments
    const nowPaymentsResponse = await fetch('https://api.nowpayments.io/v1/payment', {
      method: 'POST',
      headers: {
        'x-api-key': NOWPAYMENTS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: currency.toLowerCase(),
        pay_currency: crypto_currency,
        order_id: intentData.id, // Use payment_intent ID as order reference
        order_description: `Pack purchase - ${pack_id}`
      })
    });

    if (!nowPaymentsResponse.ok) {
      const errorText = await nowPaymentsResponse.text();
      console.error('NOWPayments error:', errorText);
      throw new Error('Failed to create payment with NOWPayments');
    }

    const paymentData = await nowPaymentsResponse.json();
    console.log('NOWPayments response:', paymentData);

    // Update payment intent with NOWPayments data
    const { error: updateError } = await supabase
      .from('payment_intents')
      .update({
        nowpayments_payment_id: paymentData.payment_id?.toString(),
        pay_address: paymentData.pay_address,
        pay_amount: paymentData.pay_amount,
        expires_at: paymentData.expiration_estimate_date
      })
      .eq('id', intentData.id);

    if (updateError) {
      console.error('Error updating payment intent:', updateError);
    }

    return new Response(
      JSON.stringify({
        payment_id: paymentData.payment_id,
        pay_address: paymentData.pay_address,
        pay_amount: paymentData.pay_amount,
        pay_currency: crypto_currency,
        intent_id: intentData.id,
        order_description: paymentData.order_description,
        price_amount: amount,
        price_currency: currency,
        expiration_estimate_date: paymentData.expiration_estimate_date
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error in create-payment:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
