import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ResetPasswordRequest {
  email: string;
  redirectTo: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, redirectTo }: ResetPasswordRequest = await req.json();

    if (!email || !redirectTo) {
      return new Response(
        JSON.stringify({ error: "Email and redirectTo are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create admin client
    const supabaseAdmin = createClient(
      SUPABASE_URL!,
      SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Generate password reset link using admin API (does NOT send email)
    const { data, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: email,
      options: {
        redirectTo: redirectTo,
      },
    });

    if (linkError) {
      console.error("Error generating reset link:", linkError);
      // Don't reveal if email exists or not for security
      return new Response(
        JSON.stringify({ success: true, message: "If an account exists, a reset email will be sent" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const resetLink = data.properties?.action_link;

    if (!resetLink) {
      console.error("No reset link generated");
      return new Response(
        JSON.stringify({ success: true, message: "If an account exists, a reset email will be sent" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send email via Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MySiteFactory <noreply@mysitefactory.com>",
        to: [email],
        subject: "Réinitialisation de votre mot de passe - MySiteFactory",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f5;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 16px 16px 0 0; padding: 40px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">MySiteFactory</h1>
              </div>
              <div style="background: white; padding: 40px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #18181b; margin-top: 0;">Réinitialisation de mot de passe 🔐</h2>
                <p style="color: #52525b; line-height: 1.6; font-size: 16px;">
                  Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :
                </p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                    Réinitialiser mon mot de passe
                  </a>
                </div>
                <p style="color: #a1a1aa; font-size: 14px; margin-top: 30px;">
                  Ce lien expire dans 1 heure. Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
                </p>
                <p style="color: #a1a1aa; font-size: 12px; margin-top: 20px;">
                  Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>
                  <a href="${resetLink}" style="color: #6366f1; word-break: break-all;">${resetLink}</a>
                </p>
              </div>
              <div style="text-align: center; padding: 20px; color: #a1a1aa; font-size: 12px;">
                <p>© 2025 MySiteFactory - Création de sites web professionnels</p>
                <p>
                  <a href="https://mysitefactory.com" style="color: #6366f1; text-decoration: none;">mysitefactory.com</a>
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const responseData = await emailResponse.json();
    console.log("Password reset email sent:", responseData);

    if (!emailResponse.ok) {
      console.error("Error sending email:", responseData);
      throw new Error(responseData.message || "Failed to send email");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Password reset email sent" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in reset-password function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
