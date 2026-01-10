import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerifyTokenRequest {
  token: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token }: VerifyTokenRequest = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Token is required", code: "MISSING_TOKEN" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find the token
    const { data: tokenData, error: tokenError } = await supabaseAdmin
      .from("email_verification_tokens")
      .select("*")
      .eq("token", token)
      .maybeSingle();

    if (tokenError) {
      console.error("Error fetching token:", tokenError);
      return new Response(
        JSON.stringify({ error: "Failed to verify token", code: "DB_ERROR" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!tokenData) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token", code: "INVALID_TOKEN" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check if token is expired
    if (new Date(tokenData.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: "Token has expired", code: "EXPIRED_TOKEN" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check if token was already used
    if (tokenData.used_at) {
      return new Response(
        JSON.stringify({ error: "Token has already been used", code: "USED_TOKEN" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Mark token as used
    const { error: updateError } = await supabaseAdmin
      .from("email_verification_tokens")
      .update({ used_at: new Date().toISOString() })
      .eq("id", tokenData.id);

    if (updateError) {
      console.error("Error marking token as used:", updateError);
    }

    // Try to find user by email first (more reliable than user_id for repeated signups)
    const { data: usersList, error: usersListError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (usersListError) {
      console.error("Error listing users:", usersListError);
      return new Response(
        JSON.stringify({ error: "Failed to verify user", code: "USER_LIST_ERROR" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Find user by email
    const user = usersList.users.find(u => u.email === tokenData.email);
    
    if (!user) {
      console.error("User not found for email:", tokenData.email);
      return new Response(
        JSON.stringify({ error: "User not found", code: "USER_NOT_FOUND" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Update user's email confirmation status if needed
    if (!user.email_confirmed_at) {
      await supabaseAdmin.auth.admin.updateUserById(user.id, {
        email_confirm: true
      });
      console.log(`Email confirmed for user: ${user.id}`);
    }

    // Generate a magic link that will auto-authenticate the user
    const { data: magicLinkData, error: magicLinkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: tokenData.email,
      options: {
        redirectTo: "https://mysitefactory.com/dashboard"
      }
    });

    if (magicLinkError) {
      console.error("Error generating magic link:", magicLinkError);
      return new Response(
        JSON.stringify({ error: "Failed to create session", code: "SESSION_ERROR" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get the magic link URL that will authenticate the user
    const magicLinkUrl = magicLinkData.properties?.action_link;

    if (!magicLinkUrl) {
      console.error("No magic link URL generated");
      return new Response(
        JSON.stringify({ error: "Failed to generate login link", code: "LINK_ERROR" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Email verified successfully for user: ${user.id}, magic link generated`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email verified successfully",
        magic_link: magicLinkUrl,
        user_id: user.id
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in verify-email-token function:", error);
    return new Response(
      JSON.stringify({ error: error.message, code: "INTERNAL_ERROR" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);