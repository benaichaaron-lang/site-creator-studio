import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = "contact@mysitefactory.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TicketEmailRequest {
  ticketId: string;
  emailType: "ticket_opened" | "ticket_reply_admin" | "ticket_reply_client";
  messagePreview?: string;
  language?: "fr" | "en";
}

const emailContent = {
  ticket_opened: {
    fr: {
      clientSubject: "🎫 Ticket créé - MySiteFactory",
      clientTitle: "Votre ticket a été créé",
      clientMessage: "Nous avons bien reçu votre demande. Notre équipe vous répondra dans les plus brefs délais.",
      clientCta: "Voir mon ticket",
      adminSubject: "🎫 Nouveau ticket - MySiteFactory",
      adminTitle: "Nouveau ticket créé",
      adminMessage: "Un client a ouvert un nouveau ticket de support.",
      adminCta: "Répondre au ticket",
      reference: "Référence",
      expectedResponse: "Délai de réponse estimé : 24-48h",
    },
    en: {
      clientSubject: "🎫 Ticket created - MySiteFactory",
      clientTitle: "Your ticket has been created",
      clientMessage: "We have received your request. Our team will respond as soon as possible.",
      clientCta: "View my ticket",
      adminSubject: "🎫 New ticket - MySiteFactory",
      adminTitle: "New ticket created",
      adminMessage: "A client has opened a new support ticket.",
      adminCta: "Reply to ticket",
      reference: "Reference",
      expectedResponse: "Estimated response time: 24-48h",
    },
  },
  ticket_reply_admin: {
    fr: {
      clientSubject: "💬 Nouvelle réponse à votre ticket - MySiteFactory",
      clientTitle: "Vous avez reçu une réponse",
      clientMessage: "Notre équipe a répondu à votre ticket. Consultez la réponse ci-dessous.",
      clientCta: "Voir la réponse",
    },
    en: {
      clientSubject: "💬 New reply to your ticket - MySiteFactory",
      clientTitle: "You received a reply",
      clientMessage: "Our team has replied to your ticket. View the response below.",
      clientCta: "View reply",
    },
  },
  ticket_reply_client: {
    fr: {
      adminSubject: "💬 Réponse client au ticket - MySiteFactory",
      adminTitle: "Le client a répondu",
      adminMessage: "Le client a envoyé une nouvelle réponse à son ticket.",
      adminCta: "Voir et répondre",
    },
    en: {
      adminSubject: "💬 Client reply to ticket - MySiteFactory",
      adminTitle: "Client replied",
      adminMessage: "The client has sent a new reply to their ticket.",
      adminCta: "View and reply",
    },
  },
};

const generateEmailHtml = (
  title: string,
  message: string,
  cta: string,
  ctaUrl: string,
  ticketRef: string,
  ticketSubject: string,
  preview?: string,
  extraInfo?: string,
  language: "fr" | "en" = "fr"
) => {
  const greeting = language === "fr" ? "Bonjour" : "Hello";
  const footer = language === "fr" 
    ? "Merci de votre confiance.<br>L'équipe MySiteFactory"
    : "Thank you for your trust.<br>The MySiteFactory Team";

  return `
<!DOCTYPE html>
<html lang="${language}">
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
            <td style="text-align: center; padding-bottom: 32px;">
              <h1 style="margin: 0; color: #818cf8; font-size: 24px; font-weight: 800;">MySiteFactory</h1>
            </td>
          </tr>
          
          <!-- Main Card -->
          <tr>
            <td>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(180deg, #1a1a2e 0%, #16162a 100%); border-radius: 16px; overflow: hidden; border: 1px solid rgba(129, 140, 248, 0.2);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%); padding: 24px 32px; text-align: center;">
                    <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700;">${title}</h2>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 32px;">
                    <p style="margin: 0 0 20px; color: #d1d5db; font-size: 16px; line-height: 1.7;">
                      ${message}
                    </p>
                    
                    <!-- Ticket Info -->
                    <div style="background-color: rgba(129, 140, 248, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                      <p style="margin: 0 0 8px; color: #9ca3af; font-size: 13px;">${language === "fr" ? "Ticket" : "Ticket"}: <strong style="color: #818cf8;">#${ticketRef}</strong></p>
                      <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">${ticketSubject}</p>
                    </div>
                    
                    ${preview ? `
                    <div style="background-color: rgba(255, 255, 255, 0.05); border-left: 3px solid #818cf8; padding: 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
                      <p style="margin: 0; color: #d1d5db; font-size: 14px; font-style: italic;">"${preview.substring(0, 150)}${preview.length > 150 ? '...' : ''}"</p>
                    </div>
                    ` : ''}
                    
                    ${extraInfo ? `<p style="margin: 0 0 24px; color: #10b981; font-size: 14px;">✓ ${extraInfo}</p>` : ''}
                    
                    <!-- CTA -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="text-align: center;">
                          <a href="${ctaUrl}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);">
                            ${cta}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 24px 32px; border-top: 1px solid rgba(129, 140, 248, 0.1);">
                    <p style="margin: 0; color: #9ca3af; font-size: 14px; text-align: center; line-height: 1.6;">
                      ${footer}
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
          
          <!-- Bottom Footer -->
          <tr>
            <td style="padding: 24px 0 0; text-align: center;">
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
    const { ticketId, emailType, messagePreview, language = "fr" }: TicketEmailRequest = await req.json();

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch ticket with user details
    const { data: ticket, error: ticketError } = await supabaseAdmin
      .from("tickets")
      .select("*")
      .eq("id", ticketId)
      .single();

    if (ticketError || !ticket) {
      return new Response(
        JSON.stringify({ error: "Ticket not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Fetch user profile
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("first_name, last_name, email")
      .eq("user_id", ticket.user_id)
      .single();

    const userEmail = profile?.email;
    const userName = profile?.first_name || "Client";
    const ticketRef = ticketId.slice(0, 8).toUpperCase();
    const content = emailContent[emailType][language];
    const dashboardUrl = "https://mysitefactory.com/dashboard";
    const adminUrl = `https://mysitefactory.com/admin?ticket=${ticketId}`;

    const emailPromises: Promise<any>[] = [];
    const openedContent = emailContent.ticket_opened[language];
    const replyAdminContent = emailContent.ticket_reply_admin[language];
    const replyClientContent = emailContent.ticket_reply_client[language];

    if (emailType === "ticket_opened") {
      // Send to client
      if (userEmail) {
        const clientHtml = generateEmailHtml(
          openedContent.clientTitle,
          openedContent.clientMessage,
          openedContent.clientCta,
          dashboardUrl,
          ticketRef,
          ticket.subject,
          undefined,
          openedContent.expectedResponse,
          language
        );
        emailPromises.push(
          resend.emails.send({
            from: "MySiteFactory <noreply@mysitefactory.com>",
            to: [userEmail],
            subject: openedContent.clientSubject,
            html: clientHtml,
          })
        );
      }

      // Send to admin
      const adminHtml = generateEmailHtml(
        openedContent.adminTitle,
        openedContent.adminMessage,
        openedContent.adminCta,
        adminUrl,
        ticketRef,
        ticket.subject,
        undefined,
        `${language === "fr" ? "Client" : "Client"}: ${userName} (${userEmail})`,
        language
      );
      emailPromises.push(
        resend.emails.send({
          from: "MySiteFactory <noreply@mysitefactory.com>",
          to: [ADMIN_EMAIL],
          subject: openedContent.adminSubject,
          html: adminHtml,
        })
      );
    } else if (emailType === "ticket_reply_admin" && userEmail) {
      // Admin replied, notify client
      const clientHtml = generateEmailHtml(
        replyAdminContent.clientTitle,
        replyAdminContent.clientMessage,
        replyAdminContent.clientCta,
        dashboardUrl,
        ticketRef,
        ticket.subject,
        messagePreview,
        undefined,
        language
      );
      emailPromises.push(
        resend.emails.send({
          from: "MySiteFactory <noreply@mysitefactory.com>",
          to: [userEmail],
          subject: replyAdminContent.clientSubject,
          html: clientHtml,
        })
      );
    } else if (emailType === "ticket_reply_client") {
      // Client replied, notify admin
      const adminHtml = generateEmailHtml(
        replyClientContent.adminTitle,
        replyClientContent.adminMessage,
        replyClientContent.adminCta,
        adminUrl,
        ticketRef,
        ticket.subject,
        messagePreview,
        `${language === "fr" ? "Client" : "Client"}: ${userName}`,
        language
      );
      emailPromises.push(
        resend.emails.send({
          from: "MySiteFactory <noreply@mysitefactory.com>",
          to: [ADMIN_EMAIL],
          subject: replyClientContent.adminSubject,
          html: adminHtml,
        })
      );
    }

    const results = await Promise.all(emailPromises);
    console.log("Ticket emails sent:", results);

    return new Response(
      JSON.stringify({ success: true, data: results }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-ticket-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
