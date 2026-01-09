import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  orderId: string;
  emailType: "order_received" | "work_started" | "revision_ready" | "project_delivered" | "payment_issue";
  language?: "fr" | "en";
}

const emailTemplates = {
  order_received: {
    fr: {
      subject: "✅ Commande reçue - MySiteFactory",
      title: "Votre commande a bien été reçue !",
      message: "Notre équipe commence très bientôt à travailler sur votre projet.",
      cta: "Suivre ma commande",
    },
    en: {
      subject: "✅ Order received - MySiteFactory",
      title: "Your order has been received!",
      message: "Our team will start working on your project shortly.",
      cta: "Track my order",
    },
  },
  work_started: {
    fr: {
      subject: "🚀 Travail commencé - MySiteFactory",
      title: "Nous travaillons sur votre projet !",
      message: "Notre équipe travaille activement sur votre projet. Vous pouvez suivre la progression en temps réel depuis votre tableau de bord.",
      cta: "Voir la progression",
    },
    en: {
      subject: "🚀 Work started - MySiteFactory",
      title: "We're working on your project!",
      message: "Our team is actively working on your project. You can track progress in real-time from your dashboard.",
      cta: "View progress",
    },
  },
  revision_ready: {
    fr: {
      subject: "👀 Révision disponible - MySiteFactory",
      title: "Votre projet est prêt pour révision !",
      message: "Nous avons terminé une étape de votre projet. Connectez-vous pour examiner notre travail et nous faire part de vos retours.",
      cta: "Voir le projet",
    },
    en: {
      subject: "👀 Review ready - MySiteFactory",
      title: "Your project is ready for review!",
      message: "We've completed a milestone on your project. Log in to review our work and share your feedback.",
      cta: "View project",
    },
  },
  project_delivered: {
    fr: {
      subject: "🎉 Projet livré - MySiteFactory",
      title: "Votre projet est terminé !",
      message: "Félicitations ! Votre projet a été livré avec succès. Merci pour votre confiance. N'hésitez pas à nous contacter si vous avez besoin d'assistance.",
      cta: "Accéder au projet",
    },
    en: {
      subject: "🎉 Project delivered - MySiteFactory",
      title: "Your project is complete!",
      message: "Congratulations! Your project has been successfully delivered. Thank you for your trust. Don't hesitate to contact us if you need any assistance.",
      cta: "Access project",
    },
  },
  payment_issue: {
    fr: {
      subject: "⚠️ Problème de paiement - MySiteFactory",
      title: "Un problème de paiement a été détecté",
      message: "Nous avons rencontré un problème avec votre paiement. Veuillez vérifier vos informations de paiement pour éviter toute interruption de service.",
      cta: "Résoudre le problème",
    },
    en: {
      subject: "⚠️ Payment issue - MySiteFactory",
      title: "A payment issue has been detected",
      message: "We encountered an issue with your payment. Please check your payment information to avoid any service interruption.",
      cta: "Resolve issue",
    },
  },
};

const generateEmailHtml = (
  template: { title: string; message: string; cta: string },
  userName: string,
  packName: string,
  language: "fr" | "en"
) => {
  const greeting = language === "fr" ? "Bonjour" : "Hello";
  const dashboardUrl = "https://mysitefactory.com/dashboard";
  const footer = language === "fr" 
    ? "Merci de votre confiance.<br>L'équipe MySiteFactory"
    : "Thank you for your trust.<br>The MySiteFactory Team";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border-radius: 16px; overflow: hidden; border: 1px solid #2a2a2a;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">MySiteFactory</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 16px; color: #a0a0a0; font-size: 16px;">
                ${greeting} ${userName},
              </p>
              
              <h2 style="margin: 0 0 16px; color: #ffffff; font-size: 22px; font-weight: 600;">
                ${template.title}
              </h2>
              
              <p style="margin: 0 0 24px; color: #d0d0d0; font-size: 16px; line-height: 1.6;">
                ${template.message}
              </p>
              
              ${packName ? `
              <div style="background-color: #252525; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0; color: #a0a0a0; font-size: 14px;">
                  ${language === "fr" ? "Pack" : "Pack"}: <strong style="color: #ffffff;">${packName}</strong>
                </p>
              </div>
              ` : ""}
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center; padding: 16px 0;">
                    <a href="${dashboardUrl}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      ${template.cta}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #2a2a2a;">
              <p style="margin: 0; color: #707070; font-size: 14px; text-align: center; line-height: 1.6;">
                ${footer}
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
    const { orderId, emailType, language = "fr" }: OrderEmailRequest = await req.json();

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch order with user and pack details
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .select(`
        *,
        pack:packs(name),
        profile:profiles!orders_user_id_fkey(first_name, last_name, email)
      `)
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      console.error("Order fetch error:", orderError);
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get user profile - try direct fetch if join didn't work
    let userEmail = order.profile?.email;
    let userName = order.profile?.first_name || "Client";

    if (!userEmail) {
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("first_name, last_name, email")
        .eq("user_id", order.user_id)
        .single();
      
      if (profile) {
        userEmail = profile.email;
        userName = profile.first_name || "Client";
      }
    }

    if (!userEmail) {
      return new Response(
        JSON.stringify({ error: "User email not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const template = emailTemplates[emailType][language];
    const packName = order.pack?.name || "";

    const emailHtml = generateEmailHtml(template, userName, packName, language);

    const emailResponse = await resend.emails.send({
      from: "MySiteFactory <noreply@mysitefactory.com>",
      to: [userEmail],
      subject: template.subject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
