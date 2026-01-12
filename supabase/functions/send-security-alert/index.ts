import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SecurityAlertRequest {
  userId: string;
  alertType: "new_login" | "password_changed" | "unusual_activity";
  deviceInfo?: string;
  ipAddress?: string;
  location?: string;
  language?: "fr" | "en";
}

const emailContent = {
  new_login: {
    fr: {
      subject: "🔔 Nouvelle connexion détectée - MySiteFactory",
      title: "Nouvelle connexion à votre compte",
      message: "Une nouvelle connexion a été détectée sur votre compte MySiteFactory.",
      warning: "Si vous n'êtes pas à l'origine de cette connexion, nous vous recommandons de sécuriser votre compte immédiatement.",
      cta: "Sécuriser mon compte",
    },
    en: {
      subject: "🔔 New login detected - MySiteFactory",
      title: "New login to your account",
      message: "A new login was detected on your MySiteFactory account.",
      warning: "If you didn't initiate this login, we recommend securing your account immediately.",
      cta: "Secure my account",
    },
  },
  password_changed: {
    fr: {
      subject: "🔐 Mot de passe modifié - MySiteFactory",
      title: "Votre mot de passe a été modifié",
      message: "Votre mot de passe MySiteFactory a été modifié avec succès.",
      warning: "Si vous n'êtes pas à l'origine de ce changement, contactez-nous immédiatement.",
      cta: "Sécuriser mon compte",
    },
    en: {
      subject: "🔐 Password changed - MySiteFactory",
      title: "Your password has been changed",
      message: "Your MySiteFactory password was successfully changed.",
      warning: "If you didn't make this change, please contact us immediately.",
      cta: "Secure my account",
    },
  },
  unusual_activity: {
    fr: {
      subject: "⚠️ Activité suspecte détectée - MySiteFactory",
      title: "Activité inhabituelle sur votre compte",
      message: "Nous avons détecté une activité inhabituelle sur votre compte MySiteFactory.",
      warning: "Par sécurité, nous vous recommandons de vérifier vos dernières activités et de changer votre mot de passe.",
      cta: "Vérifier mon compte",
    },
    en: {
      subject: "⚠️ Suspicious activity detected - MySiteFactory",
      title: "Unusual activity on your account",
      message: "We detected unusual activity on your MySiteFactory account.",
      warning: "For security, we recommend reviewing your recent activity and changing your password.",
      cta: "Check my account",
    },
  },
};

const generateEmailHtml = (
  content: typeof emailContent.new_login.fr,
  userName: string,
  deviceInfo?: string,
  location?: string,
  timestamp?: string,
  language: "fr" | "en" = "fr"
) => {
  const securityUrl = "https://mysitefactory.com/auth";

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
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(180deg, #1a1a2e 0%, #16162a 100%); border-radius: 20px; overflow: hidden; border: 1px solid rgba(239, 68, 68, 0.3);">
                
                <!-- Alert Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%); padding: 32px 40px; text-align: center; border-bottom: 1px solid rgba(239, 68, 68, 0.2);">
                    <div style="width: 64px; height: 64px; margin: 0 auto 16px; background-color: rgba(239, 68, 68, 0.2); border-radius: 50%; line-height: 64px; font-size: 32px;">🔒</div>
                    <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">${content.title}</h2>
                  </td>
                </tr>
                
                <!-- Greeting -->
                <tr>
                  <td style="padding: 40px 40px 24px;">
                    <p style="margin: 0; color: #a5b4fc; font-size: 16px;">
                      ${language === "fr" ? "Bonjour" : "Hello"} <strong style="color: #ffffff;">${userName}</strong>,
                    </p>
                  </td>
                </tr>
                
                <!-- Message -->
                <tr>
                  <td style="padding: 0 40px 24px;">
                    <p style="margin: 0; color: #d1d5db; font-size: 16px; line-height: 1.7;">
                      ${content.message}
                    </p>
                  </td>
                </tr>
                
                <!-- Activity Details -->
                <tr>
                  <td style="padding: 0 40px 24px;">
                    <div style="background-color: rgba(129, 140, 248, 0.1); border-radius: 12px; padding: 20px;">
                      <h4 style="margin: 0 0 16px; color: #a5b4fc; font-size: 14px; font-weight: 600;">${language === "fr" ? "Détails" : "Details"}</h4>
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="padding: 6px 0; color: #9ca3af; font-size: 14px;">${language === "fr" ? "Date & heure" : "Date & time"}</td>
                          <td style="padding: 6px 0; color: #ffffff; font-size: 14px; text-align: right;">${timestamp || new Date().toLocaleString(language === "fr" ? "fr-FR" : "en-US")}</td>
                        </tr>
                        ${deviceInfo ? `
                        <tr>
                          <td style="padding: 6px 0; color: #9ca3af; font-size: 14px;">${language === "fr" ? "Appareil" : "Device"}</td>
                          <td style="padding: 6px 0; color: #ffffff; font-size: 14px; text-align: right;">${deviceInfo}</td>
                        </tr>
                        ` : ''}
                        ${location ? `
                        <tr>
                          <td style="padding: 6px 0; color: #9ca3af; font-size: 14px;">${language === "fr" ? "Localisation" : "Location"}</td>
                          <td style="padding: 6px 0; color: #ffffff; font-size: 14px; text-align: right;">${location}</td>
                        </tr>
                        ` : ''}
                      </table>
                    </div>
                  </td>
                </tr>
                
                <!-- Warning -->
                <tr>
                  <td style="padding: 0 40px 32px;">
                    <div style="background-color: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 16px; border-radius: 0 8px 8px 0;">
                      <p style="margin: 0; color: #fca5a5; font-size: 14px; line-height: 1.6;">
                        ⚠️ ${content.warning}
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- CTA -->
                <tr>
                  <td style="padding: 0 40px 40px; text-align: center;">
                    <a href="${securityUrl}" style="display: inline-block; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: #ffffff; text-decoration: none; padding: 18px 48px; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 24px rgba(239, 68, 68, 0.4);">
                      ${content.cta}
                    </a>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 32px 40px; border-top: 1px solid rgba(129, 140, 248, 0.1); text-align: center;">
                    <p style="margin: 0; color: #9ca3af; font-size: 14px;">
                      ${language === "fr" ? "Si vous avez des questions, contactez-nous à" : "If you have questions, contact us at"} 
                      <a href="mailto:contact@mysitefactory.com" style="color: #818cf8; text-decoration: none;">contact@mysitefactory.com</a>
                    </p>
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
    const data: SecurityAlertRequest = await req.json();
    const language = data.language || "fr";

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch user profile
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("first_name, email")
      .eq("user_id", data.userId)
      .single();

    if (!profile?.email) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const content = emailContent[data.alertType][language];
    const userName = profile.first_name || "Client";
    const timestamp = new Date().toLocaleString(language === "fr" ? "fr-FR" : "en-US", {
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailHtml = generateEmailHtml(
      content,
      userName,
      data.deviceInfo,
      data.location,
      timestamp,
      language
    );

    const emailResponse = await resend.emails.send({
      from: "MySiteFactory Security <noreply@mysitefactory.com>",
      to: [profile.email],
      subject: content.subject,
      html: emailHtml,
    });

    console.log("Security alert email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-security-alert:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
