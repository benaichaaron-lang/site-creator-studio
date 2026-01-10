import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BriefConfirmationRequest {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  details?: string;
  recommendation?: string;
  language?: "fr" | "en";
  userId?: string;
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
  briefId?: string,
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
        ${briefId ? `<p style="margin: 8px 0 0; color: #9ca3af; font-size: 12px;">Réf: ${briefId.slice(0, 8).toUpperCase()}</p>` : ''}
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

const generateAdminNotificationHtml = (data: BriefConfirmationRequest, briefId: string) => {
  const adminUrl = `https://mysitefactory.com/admin?brief=${briefId}`;
  const timestamp = new Date().toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau Brief Reçu</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f0f23; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f0f23;">
    <tr>
      <td style="padding: 40px 24px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">
          
          <!-- Header -->
          <tr>
            <td style="text-align: center; padding-bottom: 32px;">
              <h1 style="margin: 0; color: #818cf8; font-size: 24px; font-weight: 800;">🚀 Nouveau Brief Reçu</h1>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 13px;">Réf: ${briefId.slice(0, 8).toUpperCase()}</p>
            </td>
          </tr>
          
          <!-- Main Card -->
          <tr>
            <td>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(180deg, #1a1a2e 0%, #16162a 100%); border-radius: 16px; overflow: hidden; border: 1px solid rgba(129, 140, 248, 0.3);">
                
                <!-- Client Info -->
                <tr>
                  <td style="padding: 32px;">
                    <h2 style="margin: 0 0 24px; color: #ffffff; font-size: 20px; font-weight: 600; border-bottom: 1px solid rgba(129, 140, 248, 0.2); padding-bottom: 16px;">
                      👤 Informations Client
                    </h2>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; width: 120px;">Nom complet</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${data.firstName} ${data.lastName || ''}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Email</td>
                        <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #818cf8; text-decoration: none;">${data.email}</a></td>
                      </tr>
                      ${data.phone ? `
                      <tr>
                        <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Téléphone</td>
                        <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #818cf8; text-decoration: none;">${data.phone}</a></td>
                      </tr>
                      ` : ''}
                      ${data.recommendation ? `
                      <tr>
                        <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Recommandation</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${data.recommendation}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
                
                <!-- Project Info -->
                <tr>
                  <td style="padding: 0 32px 32px;">
                    <h2 style="margin: 0 0 24px; color: #ffffff; font-size: 20px; font-weight: 600; border-bottom: 1px solid rgba(129, 140, 248, 0.2); padding-bottom: 16px;">
                      📋 Détails du Projet
                    </h2>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      ${data.projectType ? `
                      <tr>
                        <td style="padding: 8px 0; color: #9ca3af; font-size: 14px; width: 120px;">Type de site</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${data.projectType}</td>
                      </tr>
                      ` : ''}
                      ${data.budget ? `
                      <tr>
                        <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Budget</td>
                        <td style="padding: 8px 0; color: #10b981; font-size: 14px; font-weight: 600;">${data.budget}</td>
                      </tr>
                      ` : ''}
                      ${data.timeline ? `
                      <tr>
                        <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Délai</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${data.timeline}</td>
                      </tr>
                      ` : ''}
                    </table>
                    
                    ${data.details ? `
                    <div style="margin-top: 20px; padding: 16px; background-color: rgba(129, 140, 248, 0.1); border-radius: 8px;">
                      <p style="margin: 0 0 8px; color: #a5b4fc; font-size: 13px; font-weight: 600;">Détails supplémentaires:</p>
                      <p style="margin: 0; color: #d1d5db; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.details}</p>
                    </div>
                    ` : ''}
                  </td>
                </tr>
                
                <!-- CTA -->
                <tr>
                  <td style="padding: 16px 32px 32px; text-align: center;">
                    <a href="${adminUrl}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 600; font-size: 15px;">
                      Voir dans l'admin
                    </a>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 0 0; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                Reçu le ${timestamp}
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

// Admin email - configurable via env or default
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "benaichaaron@gmail.com";

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: BriefConfirmationRequest = await req.json();
    const { firstName, lastName, email, phone, projectType, budget, timeline, details, recommendation, language = "fr", userId } = requestData;

    if (!email || !firstName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: firstName and email" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase admin client to save the brief
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // STEP 1: Save brief to database FIRST (before sending emails)
    console.log(`Saving brief to database for: ${email}`);
    
    const { data: briefData, error: briefError } = await supabaseAdmin
      .from("project_briefs")
      .insert({
        first_name: firstName,
        last_name: lastName || null,
        email: email,
        phone: phone || null,
        project_type: projectType || null,
        budget: budget || null,
        timeline: timeline || null,
        details: details || null,
        recommendation: recommendation || null,
        language: language,
        status: 'new',
        user_id: userId || null,
      })
      .select('id')
      .single();

    if (briefError) {
      console.error("Error saving brief to database:", briefError);
      // Continue with email sending even if DB save fails
      // but log the error for monitoring
    }

    const briefId = briefData?.id || crypto.randomUUID();
    console.log(`Brief saved with ID: ${briefId}`);

    const content = emailContent[language];
    const emailHtml = generateEmailHtml(content, firstName, projectType, briefId, language);

    // STEP 2: Send confirmation email to client
    console.log(`Sending brief confirmation email to ${email} for project: ${projectType || "N/A"}`);
    
    let clientEmailResult = { success: false, error: null as string | null, id: null as string | null };
    try {
      const clientEmailResponse = await resend.emails.send({
        from: "MySiteFactory <noreply@mysitefactory.com>",
        to: [email],
        subject: content.subject,
        html: emailHtml,
      });
      clientEmailResult = { success: true, error: null, id: (clientEmailResponse as any).id || null };
      console.log("Brief confirmation email sent to client:", clientEmailResponse);
    } catch (clientEmailError: any) {
      clientEmailResult = { success: false, error: clientEmailError.message, id: null };
      console.error("Failed to send client email:", clientEmailError);
    }

    // STEP 3: Send notification email to admin
    console.log(`Sending admin notification to ${ADMIN_EMAIL}`);
    
    let adminEmailResult = { success: false, error: null as string | null, id: null as string | null };
    try {
      const adminEmailHtml = generateAdminNotificationHtml(requestData, briefId);
      const adminEmailResponse = await resend.emails.send({
        from: "MySiteFactory <noreply@mysitefactory.com>",
        to: [ADMIN_EMAIL],
        subject: `🚀 Nouveau Brief: ${firstName} ${lastName || ''} - ${projectType || 'Projet'} [${briefId.slice(0, 8).toUpperCase()}]`,
        html: adminEmailHtml,
      });
      adminEmailResult = { success: true, error: null, id: (adminEmailResponse as any).id || null };
      console.log("Admin notification email sent:", adminEmailResponse);
    } catch (adminEmailError: any) {
      adminEmailResult = { success: false, error: adminEmailError.message, id: null };
      console.error("Failed to send admin email:", adminEmailError);
    }

    // STEP 4: Update brief status with email results
    if (briefData?.id) {
      await supabaseAdmin
        .from("project_briefs")
        .update({ 
          status: clientEmailResult.success && adminEmailResult.success ? 'confirmed' : 'pending_email'
        })
        .eq('id', briefData.id);
    }

    // Return success if at least the brief was saved
    // Include email status for debugging
    const response = {
      success: true,
      briefId: briefId,
      emails: {
        client: clientEmailResult,
        admin: adminEmailResult,
      }
    };

    // Log summary
    console.log(`Brief ${briefId} processed: Client email ${clientEmailResult.success ? 'sent' : 'failed'}, Admin email ${adminEmailResult.success ? 'sent' : 'failed'}`);

    return new Response(
      JSON.stringify(response),
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