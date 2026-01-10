import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ResendRequest {
  email: string;
}

// Generate a secure random token
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: ResendRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find user by email
    const { data: users, error: userError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (userError) {
      console.error("Error fetching users:", userError);
      return new Response(
        JSON.stringify({ error: "Failed to find user" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const user = users.users.find(u => u.email?.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      // Don't reveal that user doesn't exist
      return new Response(
        JSON.stringify({ success: true, message: "If the email exists, a verification link has been sent" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get user's profile for first name
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("first_name")
      .eq("user_id", user.id)
      .maybeSingle();

    const firstName = profile?.first_name || user.user_metadata?.first_name || "";

    // Delete any existing tokens for this user
    await supabaseAdmin
      .from("email_verification_tokens")
      .delete()
      .eq("user_id", user.id);

    // Generate new token (expires in 30 minutes)
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const { error: insertError } = await supabaseAdmin
      .from("email_verification_tokens")
      .insert({
        user_id: user.id,
        token: token,
        email: email,
        expires_at: expiresAt
      });

    if (insertError) {
      console.error("Error creating token:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create verification token" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send verification email
    const verifyUrl = `https://mysitefactory.com/verify-email?token=${token}`;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0f0f23; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f0f23;">
    <tr>
      <td style="padding: 48px 24px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">
          <tr>
            <td style="text-align: center; padding-bottom: 32px;">
              <h1 style="margin: 0; color: #818cf8; font-size: 28px; font-weight: 800;">MySiteFactory</h1>
            </td>
          </tr>
          <tr>
            <td>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(180deg, #1a1a2e 0%, #16162a 100%); border-radius: 20px; overflow: hidden; border: 1px solid rgba(129, 140, 248, 0.2);">
                <tr>
                  <td style="background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%); padding: 32px 40px; text-align: center;">
                    <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                      ✉️ Confirmez votre email
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 20px; color: #a5b4fc; font-size: 18px;">
                      Bonjour <strong style="color: #ffffff;">${firstName || "cher client"}</strong>,
                    </p>
                    <p style="margin: 0 0 30px; color: #d1d5db; font-size: 16px; line-height: 1.7;">
                      Cliquez sur le bouton ci-dessous pour confirmer votre email et accéder directement à votre espace client.
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${verifyUrl}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%); color: #ffffff; text-decoration: none; padding: 16px 48px; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 24px rgba(99, 102, 241, 0.4);">
                        Confirmer et accéder à mon espace
                      </a>
                    </div>
                    <p style="margin: 30px 0 0; color: #9ca3af; font-size: 14px; text-align: center;">
                      Ce lien expire dans 30 minutes.
                    </p>
                    <p style="margin: 16px 0 0; color: #6b7280; font-size: 12px; text-align: center; word-break: break-all;">
                      Si le bouton ne fonctionne pas :<br>
                      <a href="${verifyUrl}" style="color: #818cf8;">${verifyUrl}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 0 0; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                © ${new Date().getFullYear()} MySiteFactory. Tous droits réservés.
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

    const emailResponse = await resend.emails.send({
      from: "MySiteFactory <noreply@mysitefactory.com>",
      to: [email],
      subject: "Confirmez votre email - MySiteFactory",
      html: emailHtml,
    });

    console.log("Verification email resent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Verification email sent" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in resend-verification-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
