import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ProjectStatusEmailRequest {
  orderId: string;
  newStatus: "pending" | "in_progress" | "review" | "completed" | "cancelled";
  language?: "fr" | "en";
}

const statusConfig = {
  pending: {
    fr: { label: "En attente", icon: "⏳", color: "#f59e0b", message: "Votre commande est en attente de traitement." },
    en: { label: "Pending", icon: "⏳", color: "#f59e0b", message: "Your order is awaiting processing." },
  },
  in_progress: {
    fr: { label: "En cours", icon: "🚀", color: "#3b82f6", message: "Notre équipe travaille activement sur votre projet. Vous pouvez suivre l'avancement en temps réel depuis votre tableau de bord." },
    en: { label: "In Progress", icon: "🚀", color: "#3b82f6", message: "Our team is actively working on your project. You can track progress in real-time from your dashboard." },
  },
  review: {
    fr: { label: "En révision", icon: "👀", color: "#8b5cf6", message: "Votre projet est prêt pour révision ! Connectez-vous pour examiner notre travail et nous faire part de vos retours." },
    en: { label: "In Review", icon: "👀", color: "#8b5cf6", message: "Your project is ready for review! Log in to examine our work and share your feedback." },
  },
  completed: {
    fr: { label: "Terminé", icon: "🎉", color: "#10b981", message: "Félicitations ! Votre projet a été livré avec succès. Merci pour votre confiance !" },
    en: { label: "Completed", icon: "🎉", color: "#10b981", message: "Congratulations! Your project has been successfully delivered. Thank you for your trust!" },
  },
  cancelled: {
    fr: { label: "Annulé", icon: "❌", color: "#ef4444", message: "Votre commande a été annulée. Si vous avez des questions, n'hésitez pas à nous contacter." },
    en: { label: "Cancelled", icon: "❌", color: "#ef4444", message: "Your order has been cancelled. If you have any questions, please contact us." },
  },
};

const emailContent = {
  fr: {
    subject: "Mise à jour de votre projet - MySiteFactory",
    title: "Statut mis à jour",
    greeting: "Bonjour",
    statusLabel: "Nouveau statut",
    cta: "Voir mon projet",
    footer: "À très bientôt,",
    teamName: "L'équipe MySiteFactory",
  },
  en: {
    subject: "Project update - MySiteFactory",
    title: "Status updated",
    greeting: "Hello",
    statusLabel: "New status",
    cta: "View my project",
    footer: "See you soon,",
    teamName: "The MySiteFactory Team",
  },
};

const generateEmailHtml = (
  content: typeof emailContent.fr,
  statusInfo: typeof statusConfig.pending.fr,
  userName: string,
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
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, ${statusInfo.color}22 0%, ${statusInfo.color}11 100%); padding: 32px 40px; text-align: center; border-bottom: 1px solid ${statusInfo.color}33;">
                    <div style="font-size: 48px; margin-bottom: 16px;">${statusInfo.icon}</div>
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
                
                <!-- Status Badge -->
                <tr>
                  <td style="padding: 0 40px 24px;">
                    <div style="display: inline-block; background-color: ${statusInfo.color}22; border: 1px solid ${statusInfo.color}44; border-radius: 50px; padding: 12px 24px;">
                      <span style="color: ${statusInfo.color}; font-size: 14px; font-weight: 600;">${content.statusLabel}: ${statusInfo.label}</span>
                    </div>
                  </td>
                </tr>
                
                <!-- Message -->
                <tr>
                  <td style="padding: 0 40px 32px;">
                    <p style="margin: 0; color: #d1d5db; font-size: 16px; line-height: 1.7;">
                      ${statusInfo.message}
                    </p>
                  </td>
                </tr>
                
                <!-- Project Info -->
                ${packName ? `
                <tr>
                  <td style="padding: 0 40px 32px;">
                    <div style="background-color: rgba(129, 140, 248, 0.1); border-radius: 12px; padding: 16px 20px;">
                      <p style="margin: 0; color: #9ca3af; font-size: 13px;">${language === "fr" ? "Projet" : "Project"}</p>
                      <p style="margin: 8px 0 0; color: #ffffff; font-size: 16px; font-weight: 600;">${packName}</p>
                    </div>
                  </td>
                </tr>
                ` : ''}
                
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
    const { orderId, newStatus, language = "fr" }: ProjectStatusEmailRequest = await req.json();

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch order with pack details
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .select("*, pack:packs(name)")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Fetch user profile
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("first_name, email")
      .eq("user_id", order.user_id)
      .single();

    if (!profile?.email) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const content = emailContent[language];
    const statusInfo = statusConfig[newStatus][language];
    const userName = profile.first_name || "Client";
    const packName = order.pack?.name || "";

    const emailHtml = generateEmailHtml(content, statusInfo, userName, packName, language);

    const subjectPrefix = statusInfo.icon;
    const emailResponse = await resend.emails.send({
      from: "MySiteFactory <noreply@mysitefactory.com>",
      to: [profile.email],
      subject: `${subjectPrefix} ${content.subject}`,
      html: emailHtml,
    });

    console.log("Project status email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-project-status-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
