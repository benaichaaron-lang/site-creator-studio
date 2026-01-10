import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  userId: string;
  email: string;
  firstName?: string;
  language?: "fr" | "en";
}

// Generate a secure random token
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

const emailContent = {
  fr: {
    subject: "Bienvenue chez MySiteFactory 🎉 - Confirmez votre email",
    greeting: "Bonjour",
    welcome: "Bienvenue dans l'univers MySiteFactory !",
    intro: "Nous sommes ravis de vous compter parmi nous. Cliquez sur le bouton ci-dessous pour confirmer votre email et accéder directement à votre espace client.",
    ctaText: "Confirmer et accéder à mon espace",
    featuresTitle: "Ce que vous pouvez faire dès maintenant",
    feature1: "Demander un devis personnalisé pour votre projet web",
    feature2: "Suivre l'avancement de vos projets en temps réel",
    feature3: "Échanger directement avec notre équipe",
    feature4: "Accéder à vos factures et documents",
    helpTitle: "Besoin d'aide ?",
    helpText: "Notre équipe est disponible pour répondre à toutes vos questions. N'hésitez pas à nous contacter.",
    contactEmail: "contact@mysitefactory.com",
    footer: "À très bientôt,",
    teamName: "L'équipe MySiteFactory",
    expiry: "Ce lien expire dans 30 minutes.",
    fallback: "Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :",
  },
  en: {
    subject: "Welcome to MySiteFactory 🎉 - Confirm your email",
    greeting: "Hello",
    welcome: "Welcome to the MySiteFactory universe!",
    intro: "We're delighted to have you with us. Click the button below to confirm your email and access your personal client dashboard directly.",
    ctaText: "Confirm and access my dashboard",
    featuresTitle: "What you can do right now",
    feature1: "Request a personalized quote for your web project",
    feature2: "Track your projects progress in real-time",
    feature3: "Communicate directly with our team",
    feature4: "Access your invoices and documents",
    helpTitle: "Need help?",
    helpText: "Our team is available to answer all your questions. Feel free to contact us.",
    contactEmail: "contact@mysitefactory.com",
    footer: "See you soon,",
    teamName: "The MySiteFactory Team",
    expiry: "This link expires in 30 minutes.",
    fallback: "If the button doesn't work, copy this link to your browser:",
  },
};

const generateEmailHtml = (
  content: typeof emailContent.fr,
  firstName: string,
  verifyUrl: string,
  language: "fr" | "en" = "fr"
) => {
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
          
          <!-- Logo Header -->
          <tr>
            <td style="text-align: center; padding-bottom: 40px;">
              <h1 style="margin: 0; color: #818cf8; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">MySiteFactory</h1>
            </td>
          </tr>
          
          <!-- Main Card -->
          <tr>
            <td>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(180deg, #1a1a2e 0%, #16162a 100%); border-radius: 20px; overflow: hidden; border: 1px solid rgba(129, 140, 248, 0.2);">
                
                <!-- Welcome Banner -->
                <tr>
                  <td style="background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%); padding: 32px 40px; text-align: center;">
                    <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                      🎉 ${content.welcome}
                    </h2>
                  </td>
                </tr>
                
                <!-- Greeting -->
                <tr>
                  <td style="padding: 40px 40px 24px;">
                    <p style="margin: 0; color: #a5b4fc; font-size: 18px;">
                      ${content.greeting} <strong style="color: #ffffff;">${firstName}</strong>,
                    </p>
                  </td>
                </tr>
                
                <!-- Intro -->
                <tr>
                  <td style="padding: 0 40px 32px;">
                    <p style="margin: 0; color: #d1d5db; font-size: 16px; line-height: 1.7;">
                      ${content.intro}
                    </p>
                  </td>
                </tr>
                
                <!-- CTA Button - PROMINENT -->
                <tr>
                  <td style="padding: 0 40px 32px; text-align: center;">
                    <a href="${verifyUrl}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 20px 56px; border-radius: 12px; font-weight: 700; font-size: 18px; box-shadow: 0 4px 24px rgba(16, 185, 129, 0.4);">
                      ✓ ${content.ctaText}
                    </a>
                  </td>
                </tr>
                
                <!-- Expiry Notice -->
                <tr>
                  <td style="padding: 0 40px 32px; text-align: center;">
                    <p style="margin: 0; color: #9ca3af; font-size: 14px;">
                      ${content.expiry}
                    </p>
                  </td>
                </tr>
                
                <!-- Features Section -->
                <tr>
                  <td style="padding: 0 40px 32px;">
                    <h3 style="margin: 0 0 20px; color: #ffffff; font-size: 18px; font-weight: 600;">
                      ${content.featuresTitle}
                    </h3>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 10px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width: 28px; vertical-align: top; color: #10b981; font-size: 16px;">✓</td>
                              <td style="color: #d1d5db; font-size: 15px; line-height: 1.5;">${content.feature1}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width: 28px; vertical-align: top; color: #10b981; font-size: 16px;">✓</td>
                              <td style="color: #d1d5db; font-size: 15px; line-height: 1.5;">${content.feature2}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width: 28px; vertical-align: top; color: #10b981; font-size: 16px;">✓</td>
                              <td style="color: #d1d5db; font-size: 15px; line-height: 1.5;">${content.feature3}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width: 28px; vertical-align: top; color: #10b981; font-size: 16px;">✓</td>
                              <td style="color: #d1d5db; font-size: 15px; line-height: 1.5;">${content.feature4}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Help Section -->
                <tr>
                  <td style="padding: 24px 40px; background-color: rgba(129, 140, 248, 0.05); border-top: 1px solid rgba(129, 140, 248, 0.1);">
                    <h4 style="margin: 0 0 8px; color: #a5b4fc; font-size: 15px; font-weight: 600;">
                      ${content.helpTitle}
                    </h4>
                    <p style="margin: 0; color: #9ca3af; font-size: 14px; line-height: 1.6;">
                      ${content.helpText}<br>
                      <a href="mailto:${content.contactEmail}" style="color: #818cf8; text-decoration: none;">${content.contactEmail}</a>
                    </p>
                  </td>
                </tr>
                
                <!-- Fallback Link -->
                <tr>
                  <td style="padding: 24px 40px; text-align: center;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px;">
                      ${content.fallback}<br>
                      <a href="${verifyUrl}" style="color: #818cf8; word-break: break-all; font-size: 11px;">${verifyUrl}</a>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 32px 40px; text-align: center;">
                    <p style="margin: 0 0 8px; color: #9ca3af; font-size: 15px; font-style: italic;">
                      ${content.footer}
                    </p>
                    <p style="margin: 0; color: #818cf8; font-size: 15px; font-weight: 600;">
                      ${content.teamName}
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
    const { userId, email, firstName, language = "fr" }: WelcomeEmailRequest = await req.json();

    if (!email || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: email and userId" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase admin client to store the token
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Delete any existing tokens for this user
    await supabaseAdmin
      .from("email_verification_tokens")
      .delete()
      .eq("user_id", userId);

    // Generate new secure token (expires in 30 minutes)
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const { error: insertError } = await supabaseAdmin
      .from("email_verification_tokens")
      .insert({
        user_id: userId,
        token: token,
        email: email,
        expires_at: expiresAt
      });

    if (insertError) {
      console.error("Error creating verification token:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create verification token" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate verification URL with magic link token
    const verifyUrl = `https://mysitefactory.com/verify-email?token=${token}`;

    const displayName = firstName || (language === "fr" ? "cher client" : "valued customer");
    const content = emailContent[language];
    const emailHtml = generateEmailHtml(content, displayName, verifyUrl, language);

    console.log(`Sending welcome email with magic link to ${email} (user: ${userId})`);

    const emailResponse = await resend.emails.send({
      from: "MySiteFactory <noreply@mysitefactory.com>",
      to: [email],
      subject: content.subject,
      html: emailHtml,
    });

    console.log("Welcome email with magic link sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
