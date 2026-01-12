import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = "contact@mysitefactory.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentEmailRequest {
  paymentId?: string;
  orderId?: string;
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: "card" | "crypto";
  cryptoCurrency?: string;
  packName?: string;
  language?: "fr" | "en";
}

const emailContent = {
  fr: {
    subject: "✅ Paiement confirmé - MySiteFactory",
    title: "Paiement reçu avec succès",
    greeting: "Bonjour",
    message: "Nous avons bien reçu votre paiement. Merci pour votre confiance !",
    paymentDetails: "Détails du paiement",
    amount: "Montant",
    method: "Méthode",
    project: "Projet",
    cta: "Suivre mon projet",
    footer: "À très bientôt,",
    teamName: "L'équipe MySiteFactory",
    cardPayment: "Carte bancaire",
    cryptoPayment: "Cryptomonnaie",
  },
  en: {
    subject: "✅ Payment confirmed - MySiteFactory",
    title: "Payment received successfully",
    greeting: "Hello",
    message: "We have received your payment. Thank you for your trust!",
    paymentDetails: "Payment details",
    amount: "Amount",
    method: "Method",
    project: "Project",
    cta: "Track my project",
    footer: "See you soon,",
    teamName: "The MySiteFactory Team",
    cardPayment: "Credit card",
    cryptoPayment: "Cryptocurrency",
  },
};

const generateEmailHtml = (
  content: typeof emailContent.fr,
  userName: string,
  amount: number,
  currency: string,
  paymentMethod: string,
  packName: string,
  language: "fr" | "en"
) => {
  const dashboardUrl = "https://mysitefactory.com/dashboard";

  return `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f0f23; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f0f23;">
    <tr>
      <td style="padding: 48px 24px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">
          
          <!-- Logo -->
          <tr>
            <td style="text-align: center; padding-bottom: 40px;">
              <h1 style="margin: 0; color: #818cf8; font-size: 28px; font-weight: 800;">MySiteFactory</h1>
            </td>
          </tr>
          
          <!-- Main Card -->
          <tr>
            <td>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(180deg, #1a1a2e 0%, #16162a 100%); border-radius: 20px; overflow: hidden; border: 1px solid rgba(129, 140, 248, 0.2);">
                
                <!-- Success Banner -->
                <tr>
                  <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 32px 40px; text-align: center;">
                    <div style="width: 64px; height: 64px; margin: 0 auto 16px; background-color: rgba(255,255,255,0.2); border-radius: 50%; line-height: 64px; font-size: 32px;">✓</div>
                    <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">${content.title}</h2>
                  </td>
                </tr>
                
                <!-- Greeting -->
                <tr>
                  <td style="padding: 40px 40px 24px;">
                    <p style="margin: 0; color: #a5b4fc; font-size: 16px;">
                      ${content.greeting} <strong style="color: #ffffff;">${userName}</strong>,
                    </p>
                  </td>
                </tr>
                
                <!-- Message -->
                <tr>
                  <td style="padding: 0 40px 32px;">
                    <p style="margin: 0; color: #d1d5db; font-size: 16px; line-height: 1.7;">
                      ${content.message}
                    </p>
                  </td>
                </tr>
                
                <!-- Payment Details -->
                <tr>
                  <td style="padding: 0 40px 32px;">
                    <div style="background-color: rgba(129, 140, 248, 0.1); border-radius: 16px; padding: 24px;">
                      <h3 style="margin: 0 0 20px; color: #ffffff; font-size: 16px; font-weight: 600;">${content.paymentDetails}</h3>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="padding: 10px 0; border-bottom: 1px solid rgba(129, 140, 248, 0.1);">
                            <span style="color: #9ca3af; font-size: 14px;">${content.amount}</span>
                          </td>
                          <td style="padding: 10px 0; border-bottom: 1px solid rgba(129, 140, 248, 0.1); text-align: right;">
                            <span style="color: #10b981; font-size: 18px; font-weight: 700;">${amount} ${currency}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; border-bottom: 1px solid rgba(129, 140, 248, 0.1);">
                            <span style="color: #9ca3af; font-size: 14px;">${content.method}</span>
                          </td>
                          <td style="padding: 10px 0; border-bottom: 1px solid rgba(129, 140, 248, 0.1); text-align: right;">
                            <span style="color: #ffffff; font-size: 14px;">${paymentMethod}</span>
                          </td>
                        </tr>
                        ${packName ? `
                        <tr>
                          <td style="padding: 10px 0;">
                            <span style="color: #9ca3af; font-size: 14px;">${content.project}</span>
                          </td>
                          <td style="padding: 10px 0; text-align: right;">
                            <span style="color: #ffffff; font-size: 14px; font-weight: 600;">${packName}</span>
                          </td>
                        </tr>
                        ` : ''}
                      </table>
                    </div>
                  </td>
                </tr>
                
                <!-- CTA -->
                <tr>
                  <td style="padding: 0 40px 40px; text-align: center;">
                    <a href="${dashboardUrl}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%); color: #ffffff; text-decoration: none; padding: 18px 48px; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 24px rgba(99, 102, 241, 0.4);">
                      ${content.cta}
                    </a>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 32px 40px; border-top: 1px solid rgba(129, 140, 248, 0.1); text-align: center;">
                    <p style="margin: 0 0 8px; color: #9ca3af; font-size: 15px; font-style: italic;">${content.footer}</p>
                    <p style="margin: 0; color: #818cf8; font-size: 15px; font-weight: 600;">${content.teamName}</p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
          
          <!-- Bottom Footer -->
          <tr>
            <td style="padding: 32px 0 0; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                © ${new Date().getFullYear()} MySiteFactory. ${language === "fr" ? "Tous droits réservés." : "All rights reserved."}
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: PaymentEmailRequest = await req.json();
    const language = data.language || "fr";
    const content = emailContent[language];

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch user profile
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("first_name, last_name, email")
      .eq("user_id", data.userId)
      .single();

    if (!profile?.email) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const userName = profile.first_name || "Client";
    const paymentMethodDisplay = data.paymentMethod === "crypto" 
      ? `${content.cryptoPayment}${data.cryptoCurrency ? ` (${data.cryptoCurrency.toUpperCase()})` : ''}`
      : content.cardPayment;

    // Send to client
    const clientHtml = generateEmailHtml(
      content,
      userName,
      data.amount,
      data.currency,
      paymentMethodDisplay,
      data.packName || "",
      language
    );

    const emailPromises = [
      resend.emails.send({
        from: "MySiteFactory <noreply@mysitefactory.com>",
        to: [profile.email],
        subject: content.subject,
        html: clientHtml,
      }),
      // Also notify admin
      resend.emails.send({
        from: "MySiteFactory <noreply@mysitefactory.com>",
        to: [ADMIN_EMAIL],
        subject: `💰 Paiement reçu: ${data.amount} ${data.currency} - ${userName}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #1a1a2e; color: #fff;">
            <h2 style="color: #10b981;">Paiement confirmé</h2>
            <p><strong>Montant:</strong> ${data.amount} ${data.currency}</p>
            <p><strong>Client:</strong> ${userName} (${profile.email})</p>
            <p><strong>Méthode:</strong> ${paymentMethodDisplay}</p>
            ${data.packName ? `<p><strong>Pack:</strong> ${data.packName}</p>` : ''}
            <p><a href="https://mysitefactory.com/admin" style="color: #818cf8;">Voir dans l'admin</a></p>
          </div>
        `,
      }),
    ];

    const results = await Promise.all(emailPromises);
    console.log("Payment emails sent:", results);

    return new Response(
      JSON.stringify({ success: true, data: results }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-payment-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
