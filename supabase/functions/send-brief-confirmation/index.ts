import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BriefConfirmationRequest {
  firstName: string;
  email: string;
  projectType?: string;
  language?: "fr" | "en";
}

const emailContent = {
  fr: {
    subject: "Votre brief a bien été reçu — MySiteFactory",
    greeting: "Bonjour",
    title: "Merci pour votre confiance",
    intro: "Nous avons bien reçu votre brief projet et nous vous en remercions.",
    confirmationTitle: "Votre demande est entre de bonnes mains",
    confirmationText: "Notre équipe prend dès maintenant connaissance des informations que vous nous avez transmises. Chaque brief est étudié avec attention pour comprendre vos besoins et vous proposer la solution la plus adaptée.",
    nextStepsTitle: "Prochaines étapes",
    step1: "Analyse de votre brief par notre équipe",
    step2: "Prise de contact sous 24-48h si des précisions sont nécessaires",
    step3: "Suivi de l'avancement depuis votre espace client",
    dashboardCta: "Accéder à mon espace",
    supportTitle: "Une question ?",
    supportText: "Notre équipe reste à votre disposition pour toute question. N'hésitez pas à nous contacter directement.",
    contactEmail: "contact@mysitefactory.com",
    footer: "À très bientôt,",
    teamName: "L'équipe MySiteFactory",
  },
  en: {
    subject: "Your brief has been received — MySiteFactory",
    greeting: "Hello",
    title: "Thank you for your trust",
    intro: "We have successfully received your project brief and we thank you for that.",
    confirmationTitle: "Your request is in good hands",
    confirmationText: "Our team is now reviewing the information you have shared with us. Each brief is carefully analyzed to understand your needs and offer you the most suitable solution.",
    nextStepsTitle: "Next steps",
    step1: "Analysis of your brief by our team",
    step2: "Contact within 24-48h if clarification is needed",
    step3: "Track progress from your client dashboard",
    dashboardCta: "Access my dashboard",
    supportTitle: "Have a question?",
    supportText: "Our team is available for any questions. Feel free to contact us directly.",
    contactEmail: "contact@mysitefactory.com",
    footer: "See you soon,",
    teamName: "The MySiteFactory Team",
  },
};

const generateEmailHtml = (
  content: typeof emailContent.fr,
  firstName: string,
  projectType?: string,
  language: "fr" | "en" = "fr"
) => {
  const dashboardUrl = "https://mysitefactory.com/dashboard";
  const projectInfo = projectType 
    ? `<div style="background-color: #1e1b4b; border-left: 4px solid #818cf8; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
        <p style="margin: 0; color: #c7d2fe; font-size: 14px; font-weight: 500;">
          ${language === "fr" ? "Projet demandé" : "Requested project"}
        </p>
        <p style="margin: 8px 0 0; color: #ffffff; font-size: 16px; font-weight: 600;">
          ${projectType}
        </p>
      </div>`
    : "";

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
                
                <!-- Greeting -->
                <tr>
                  <td style="padding: 40px 40px 24px;">
                    <p style="margin: 0; color: #a5b4fc; font-size: 16px;">
                      ${content.greeting} <strong style="color: #ffffff;">${firstName}</strong>,
                    </p>
                  </td>
                </tr>
                
                <!-- Title -->
                <tr>
                  <td style="padding: 0 40px 16px;">
                    <h2 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700; line-height: 1.3;">
                      ${content.title}
                    </h2>
                  </td>
                </tr>
                
                <!-- Intro -->
                <tr>
                  <td style="padding: 0 40px 24px;">
                    <p style="margin: 0; color: #d1d5db; font-size: 16px; line-height: 1.7;">
                      ${content.intro}
                    </p>
                  </td>
                </tr>
                
                <!-- Project Info -->
                ${projectInfo ? `<tr><td style="padding: 0 40px;">${projectInfo}</td></tr>` : ""}
                
                <!-- Confirmation Section -->
                <tr>
                  <td style="padding: 24px 40px;">
                    <h3 style="margin: 0 0 12px; color: #818cf8; font-size: 18px; font-weight: 600;">
                      ✓ ${content.confirmationTitle}
                    </h3>
                    <p style="margin: 0; color: #d1d5db; font-size: 15px; line-height: 1.7;">
                      ${content.confirmationText}
                    </p>
                  </td>
                </tr>
                
                <!-- Divider -->
                <tr>
                  <td style="padding: 8px 40px;">
                    <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(129, 140, 248, 0.3), transparent);"></div>
                  </td>
                </tr>
                
                <!-- Next Steps -->
                <tr>
                  <td style="padding: 24px 40px;">
                    <h3 style="margin: 0 0 20px; color: #ffffff; font-size: 18px; font-weight: 600;">
                      ${content.nextStepsTitle}
                    </h3>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 12px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width: 32px; vertical-align: top;">
                                <div style="width: 24px; height: 24px; background-color: rgba(129, 140, 248, 0.2); border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; color: #818cf8; font-weight: 600;">1</div>
                              </td>
                              <td style="padding-left: 12px; color: #d1d5db; font-size: 15px; line-height: 1.5;">
                                ${content.step1}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width: 32px; vertical-align: top;">
                                <div style="width: 24px; height: 24px; background-color: rgba(129, 140, 248, 0.2); border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; color: #818cf8; font-weight: 600;">2</div>
                              </td>
                              <td style="padding-left: 12px; color: #d1d5db; font-size: 15px; line-height: 1.5;">
                                ${content.step2}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width: 32px; vertical-align: top;">
                                <div style="width: 24px; height: 24px; background-color: rgba(129, 140, 248, 0.2); border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; color: #818cf8; font-weight: 600;">3</div>
                              </td>
                              <td style="padding-left: 12px; color: #d1d5db; font-size: 15px; line-height: 1.5;">
                                ${content.step3}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- CTA Button -->
                <tr>
                  <td style="padding: 16px 40px 32px; text-align: center;">
                    <a href="${dashboardUrl}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 24px rgba(99, 102, 241, 0.4);">
                      ${content.dashboardCta}
                    </a>
                  </td>
                </tr>
                
                <!-- Support Section -->
                <tr>
                  <td style="padding: 24px 40px; background-color: rgba(129, 140, 248, 0.05); border-top: 1px solid rgba(129, 140, 248, 0.1);">
                    <h4 style="margin: 0 0 8px; color: #a5b4fc; font-size: 15px; font-weight: 600;">
                      ${content.supportTitle}
                    </h4>
                    <p style="margin: 0; color: #9ca3af; font-size: 14px; line-height: 1.6;">
                      ${content.supportText}<br>
                      <a href="mailto:${content.contactEmail}" style="color: #818cf8; text-decoration: none;">${content.contactEmail}</a>
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
    const { firstName, email, projectType, language = "fr" }: BriefConfirmationRequest = await req.json();

    if (!email || !firstName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: firstName and email" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const content = emailContent[language];
    const emailHtml = generateEmailHtml(content, firstName, projectType, language);

    console.log(`Sending brief confirmation email to ${email} for project: ${projectType || "N/A"}`);

    const emailResponse = await resend.emails.send({
      from: "MySiteFactory <noreply@mysitefactory.com>",
      to: [email],
      subject: content.subject,
      html: emailHtml,
    });

    console.log("Brief confirmation email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-brief-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
