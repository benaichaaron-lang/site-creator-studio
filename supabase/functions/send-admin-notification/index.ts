import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = "contact@mysitefactory.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AdminNotificationRequest {
  type: "new_account" | "payment_received" | "new_login" | "security_alert";
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  details?: string;
}

const generateEmailHtml = (
  title: string,
  content: string,
  ctaUrl: string,
  ctaText: string,
  timestamp: string
) => {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f0f23; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f0f23;">
    <tr>
      <td style="padding: 40px 24px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">
          
          <!-- Logo -->
          <tr>
            <td style="text-align: center; padding-bottom: 24px;">
              <h1 style="margin: 0; color: #818cf8; font-size: 24px; font-weight: 800;">MySiteFactory Admin</h1>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 12px;">${timestamp}</p>
            </td>
          </tr>
          
          <!-- Main Card -->
          <tr>
            <td>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(180deg, #1a1a2e 0%, #16162a 100%); border-radius: 16px; overflow: hidden; border: 1px solid rgba(129, 140, 248, 0.3);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%); padding: 20px 32px; text-align: center;">
                    <h2 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 700;">${title}</h2>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 28px 32px;">
                    ${content}
                    
                    <!-- CTA -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 24px;">
                      <tr>
                        <td style="text-align: center;">
                          <a href="${ctaUrl}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 600; font-size: 15px;">
                            ${ctaText}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
              </table>
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
    const data: AdminNotificationRequest = await req.json();
    
    const timestamp = new Date().toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    let subject = "";
    let title = "";
    let content = "";
    let ctaUrl = "https://mysitefactory.com/admin";
    let ctaText = "Voir dans l'admin";

    switch (data.type) {
      case "new_account":
        subject = "👤 Nouveau compte créé - MySiteFactory";
        title = "Nouveau compte créé";
        content = `
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; width: 100px;">Nom</td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${data.firstName || ''} ${data.lastName || ''}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #818cf8; text-decoration: none;">${data.email}</a></td>
            </tr>
          </table>
        `;
        ctaText = "Voir le profil";
        break;

      case "payment_received":
        subject = "💰 Paiement reçu - MySiteFactory";
        title = "Paiement confirmé";
        content = `
          <div style="background-color: rgba(16, 185, 129, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: center;">
            <p style="margin: 0; color: #10b981; font-size: 32px; font-weight: 700;">${data.amount} ${data.currency || 'EUR'}</p>
            <p style="margin: 8px 0 0; color: #9ca3af; font-size: 14px;">${data.paymentMethod || 'Carte'}</p>
          </div>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; width: 100px;">Client</td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${data.firstName || ''} ${data.lastName || ''}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #818cf8; text-decoration: none;">${data.email}</a></td>
            </tr>
          </table>
        `;
        ctaText = "Voir le paiement";
        break;

      case "security_alert":
        subject = "🚨 Alerte de sécurité - MySiteFactory";
        title = "Alerte de sécurité";
        content = `
          <div style="background-color: rgba(239, 68, 68, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="margin: 0; color: #ef4444; font-size: 16px; font-weight: 600;">⚠️ ${data.details || 'Activité suspecte détectée'}</p>
          </div>
          ${data.email ? `<p style="margin: 0; color: #9ca3af; font-size: 14px;">Compte: ${data.email}</p>` : ''}
        `;
        ctaText = "Vérifier la sécurité";
        break;

      default:
        return new Response(
          JSON.stringify({ error: "Unknown notification type" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
    }

    const emailHtml = generateEmailHtml(title, content, ctaUrl, ctaText, timestamp);

    const emailResponse = await resend.emails.send({
      from: "MySiteFactory <noreply@mysitefactory.com>",
      to: [ADMIN_EMAIL],
      subject: subject,
      html: emailHtml,
    });

    console.log("Admin notification sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-admin-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
