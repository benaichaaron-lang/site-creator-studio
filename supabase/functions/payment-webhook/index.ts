import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.190.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-nowpayments-sig',
};

// Verify HMAC signature from NOWPayments
async function verifySignature(body: string, signature: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-512" },
      false,
      ["sign"]
    );
    
    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(body)
    );
    
    const computedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    return computedSignature === signature.toLowerCase();
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

// Sort object keys for consistent signature
function sortObject(obj: Record<string, any>): Record<string, any> {
  return Object.keys(obj).sort().reduce((result: Record<string, any>, key) => {
    result[key] = obj[key];
    return result;
  }, {});
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const ipnSecret = Deno.env.get('NOWPAYMENTS_IPN_SECRET');
    const supabase = createClient(supabaseUrl, supabaseKey);

    const bodyText = await req.text();
    const body = JSON.parse(bodyText);
    
    console.log('Webhook received:', body);

    // Verify signature if IPN secret is configured
    if (ipnSecret) {
      const signature = req.headers.get('x-nowpayments-sig');
      
      if (!signature) {
        console.error('Missing signature header');
        return new Response(
          JSON.stringify({ error: 'Missing signature' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // NOWPayments requires sorted JSON for signature verification
      const sortedBody = JSON.stringify(sortObject(body));
      const isValid = await verifySignature(sortedBody, signature, ipnSecret);
      
      if (!isValid) {
        console.error('Invalid signature');
        return new Response(
          JSON.stringify({ error: 'Invalid signature' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      console.log('Signature verified successfully');
    } else {
      console.warn('IPN secret not configured - skipping signature verification');
    }

    const { payment_id, payment_status, order_id, actually_paid } = body;

    if (!payment_id || !payment_status) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Map NOWPayments status to our status
    const statusMap: Record<string, string> = {
      'waiting': 'pending',
      'confirming': 'confirming',
      'confirmed': 'paid',
      'sending': 'paid',
      'partially_paid': 'pending',
      'finished': 'paid',
      'failed': 'failed',
      'refunded': 'failed',
      'expired': 'expired'
    };

    const mappedStatus = statusMap[payment_status] || payment_status;

    // Update payment intent status
    const { error: intentError } = await supabase
      .from('payment_intents')
      .update({
        status: mappedStatus,
        updated_at: new Date().toISOString()
      })
      .eq('nowpayments_payment_id', payment_id.toString());

    if (intentError) {
      console.error('Error updating payment intent:', intentError);
    }

    // If payment is confirmed/paid, CREATE the order now
    if (mappedStatus === 'paid' && order_id) {
      console.log('Payment confirmed, creating order for intent:', order_id);
      
      // Get the payment intent details
      const { data: intentData, error: fetchError } = await supabase
        .from('payment_intents')
        .select('*')
        .eq('id', order_id)
        .single();

      if (fetchError || !intentData) {
        console.error('Error fetching payment intent:', fetchError);
        return new Response(
          JSON.stringify({ error: 'Payment intent not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create the order NOW that payment is confirmed
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: intentData.user_id,
          pack_id: intentData.pack_id,
          status: 'in_progress', // Order starts as in_progress since payment is confirmed
          total_amount: intentData.amount,
          currency: intentData.currency
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        return new Response(
          JSON.stringify({ error: 'Failed to create order' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Order created:', orderData.id);

      // Create payment record linked to the order
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          order_id: orderData.id,
          user_id: intentData.user_id,
          amount: intentData.amount,
          currency: intentData.currency,
          crypto_currency: intentData.crypto_currency,
          payment_id: payment_id.toString(),
          payment_status: 'confirmed',
          pay_address: intentData.pay_address,
          pay_amount: intentData.pay_amount
        });

      if (paymentError) {
        console.error('Error creating payment record:', paymentError);
      }

      // Check if this is a subscription pack and create subscription record
      if (intentData.pack_id) {
        const { data: packData } = await supabase
          .from('packs')
          .select('pack_type, duration_months')
          .eq('id', intentData.pack_id)
          .single();

        if (packData?.pack_type === 'subscription' && packData.duration_months) {
          const endDate = new Date();
          endDate.setMonth(endDate.getMonth() + packData.duration_months);

          await supabase
            .from('subscriptions')
            .insert({
              user_id: intentData.user_id,
              pack_id: intentData.pack_id,
              status: 'active',
              start_date: new Date().toISOString(),
              end_date: endDate.toISOString()
            });

          console.log('Subscription created for user:', intentData.user_id);
        }
      }
    }

    console.log('Webhook processed successfully');

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in payment-webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
