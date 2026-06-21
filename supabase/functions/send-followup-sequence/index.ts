import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Email de relance J+1 : Guide de réussite
const followup24hHtml = (firstName: string) => `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f0f23;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" style="background:#0f0f23;padding:40px 24px;">
    <tr><td>
      <table width="100%" style="max-width:600px;margin:0 auto;">
        <tr><td style="text-align:center;padding-bottom:32px;">
          <h1 style="margin:0;color:#818cf8;font-size:26px;font-weight:800;">MySiteFactory</h1>
        </td></tr>
        <tr><td style="background:linear-gradient(180deg,#1a1a2e,#16162a);border-radius:20px;border:1px solid rgba(129,140,248,0.2);overflow:hidden;">
          <div style="background:linear-gradient(135deg,#6366f1,#818cf8);padding:28px 40px;text-align:center;">
            <h2 style="margin:0;color:#fff;font-size:22px;">🚀 Votre guide pour réussir votre projet web</h2>
          </div>
          <div style="padding:36px 40px;">
            <p style="color:#a5b4fc;font-size:18px;margin:0 0 8px;">Bonjour <strong style="color:#fff;">${firstName}</strong>,</p>
            <p style="color:#d1d5db;font-size:15px;line-height:1.7;margin:16px 0 24px;">
              Nous avons bien reçu votre demande hier. En attendant notre réponse personnalisée, voici les 3 questions que nos meilleurs clients se posent avant de lancer leur projet :
            </p>
            <div style="background:rgba(99,102,241,0.08);border-left:3px solid #6366f1;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:16px;">
              <p style="margin:0;color:#fff;font-weight:600;font-size:14px;">1. Quel est mon objectif principal ?</p>
              <p style="margin:8px 0 0;color:#9ca3af;font-size:13px;">Vendre, informer, ou générer des leads ? Chaque objectif demande une approche différente.</p>
            </div>
            <div style="background:rgba(99,102,241,0.08);border-left:3px solid #6366f1;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:16px;">
              <p style="margin:0;color:#fff;font-weight:600;font-size:14px;">2. Qui est ma cible ?</p>
              <p style="margin:8px 0 0;color:#9ca3af;font-size:13px;">Plus vous connaissez votre audience, plus votre site sera efficace.</p>
            </div>
            <div style="background:rgba(99,102,241,0.08);border-left:3px solid #6366f1;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:28px;">
              <p style="margin:0;color:#fff;font-weight:600;font-size:14px;">3. Avez-vous des exemples de sites que vous aimez ?</p>
              <p style="margin:8px 0 0;color:#9ca3af;font-size:13px;">Cela nous aide à cerner votre style et à livrer exactement ce que vous voulez.</p>
            </div>
            <div style="text-align:center;">
              <a href="https://mysitefactory.com/contact" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#818cf8);color:#fff;text-decoration:none;padding:16px 48px;border-radius:12px;font-weight:700;font-size:16px;">
                Compléter mon brief →
              </a>
            </div>
          </div>
          <div style="padding:24px 40px;background:rgba(129,140,248,0.05);border-top:1px solid rgba(129,140,248,0.1);text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:13px;">À très bientôt,<br><strong style="color:#818cf8;">L'équipe MySiteFactory</strong></p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

// Email de relance J+3 : Offre limitée
const followup72hHtml = (firstName: string) => `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f0f23;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" style="background:#0f0f23;padding:40px 24px;">
    <tr><td>
      <table width="100%" style="max-width:600px;margin:0 auto;">
        <tr><td style="text-align:center;padding-bottom:32px;">
          <h1 style="margin:0;color:#818cf8;font-size:26px;font-weight:800;">MySiteFactory</h1>
        </td></tr>
        <tr><td style="background:linear-gradient(180deg,#1a1a2e,#16162a);border-radius:20px;border:1px solid rgba(245,158,11,0.3);overflow:hidden;">
          <div style="background:linear-gradient(135deg,#d97706,#f59e0b);padding:28px 40px;text-align:center;">
            <h2 style="margin:0;color:#fff;font-size:22px;">⚡ Offre spéciale pour vous, ${firstName}</h2>
          </div>
          <div style="padding:36px 40px;">
            <p style="color:#d1d5db;font-size:15px;line-height:1.7;margin:0 0 24px;">
              Nous avons remarqué que vous n'avez pas encore finalisé votre projet. Pour vous aider à démarrer, nous vous offrons <strong style="color:#f59e0b;">10% de réduction</strong> si vous confirmez votre brief avant ce vendredi.
            </p>
            <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:12px;padding:20px 24px;text-align:center;margin-bottom:28px;">
              <p style="margin:0;color:#f59e0b;font-size:28px;font-weight:800;">-10%</p>
              <p style="margin:8px 0 0;color:#9ca3af;font-size:13px;">Sur tous nos packs • Offre valable 48h</p>
            </div>
            <div style="text-align:center;">
              <a href="https://mysitefactory.com/packs" style="display:inline-block;background:linear-gradient(135deg,#d97706,#f59e0b);color:#fff;text-decoration:none;padding:16px 48px;border-radius:12px;font-weight:700;font-size:16px;">
                Profiter de l'offre →
              </a>
            </div>
          </div>
          <div style="padding:24px 40px;background:rgba(129,140,248,0.05);border-top:1px solid rgba(129,140,248,0.1);text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:13px;">À très bientôt,<br><strong style="color:#818cf8;">L'équipe MySiteFactory</strong></p>
            <p style="margin:8px 0 0;color:#6b7280;font-size:11px;">
              <a href="https://mysitefactory.com/unsubscribe" style="color:#6b7280;">Se désabonner</a>
            </p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { leadId, step, email, firstName } = await req.json();

    let subject = "";
    let html = "";

    if (step === 1) {
      subject = "Votre guide pour réussir votre projet web 🚀";
      html = followup24hHtml(firstName || "cher client");
    } else if (step === 2) {
      subject = "⚡ Offre spéciale -10% pour vous (48h seulement)";
      html = followup72hHtml(firstName || "cher client");
    } else {
      return new Response(JSON.stringify({ error: "Invalid step" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const emailResponse = await resend.emails.send({
      from: "MySiteFactory <contact@mysitefactory.com>",
      to: [email],
      subject,
      html,
    });

    // Marquer la séquence comme envoyée
    if (leadId) {
      await supabaseAdmin
        .from("email_sequences")
        .update({ status: "sent", sent_at: new Date().toISOString() })
        .eq("lead_id", leadId)
        .eq("sequence_step", step);
    }

    console.log(`Follow-up step ${step} sent to ${email}:`, emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-followup-sequence:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
