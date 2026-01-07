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
  user_id: string;
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
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.claims.sub;
    const { pack_id, amount, currency, crypto_currency } = await req.json() as PaymentRequest;

    console.log('Creating payment:', { pack_id, amount, currency, crypto_currency, userId });

    // Create order in database
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        pack_id,
        status: 'pending',
        total_amount: amount,
        currency
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw new Error('Failed to create order');
    }

    console.log('Order created:', orderData.id);

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
        order_id: orderData.id,
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

    // Save payment info to database
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        order_id: orderData.id,
        user_id: userId,
        amount,
        currency,
        crypto_currency,
        payment_id: paymentData.payment_id?.toString(),
        payment_status: 'pending',
        pay_address: paymentData.pay_address,
        pay_amount: paymentData.pay_amount
      });

    if (paymentError) {
      console.error('Error saving payment:', paymentError);
    }

    return new Response(
      JSON.stringify({
        payment_id: paymentData.payment_id,
        pay_address: paymentData.pay_address,
        pay_amount: paymentData.pay_amount,
        pay_currency: crypto_currency,
        order_id: orderData.id,
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
