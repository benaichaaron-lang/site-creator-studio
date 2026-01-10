import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

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

    // Update user's email_confirmed_at in auth.users if not already confirmed
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(tokenData.user_id);

    if (userError) {
      console.error("Error fetching user:", userError);
      return new Response(
        JSON.stringify({ error: "User not found", code: "USER_NOT_FOUND" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Update user's email confirmation status if needed
    if (!userData.user.email_confirmed_at) {
      await supabaseAdmin.auth.admin.updateUserById(tokenData.user_id, {
        email_confirm: true
      });
    }

    // Generate a magic link for auto-login
    const { data: magicLinkData, error: magicLinkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: tokenData.email,
    });

    if (magicLinkError) {
      console.error("Error generating magic link:", magicLinkError);
      return new Response(
        JSON.stringify({ error: "Failed to create session", code: "SESSION_ERROR" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Extract the token from the magic link properties
    const actionLink = magicLinkData.properties?.action_link;
    
    // Parse the hashed_token from the action link
    const url = new URL(actionLink);
    const hashParams = new URLSearchParams(url.hash.substring(1));
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");

    console.log(`Email verified successfully for user: ${tokenData.user_id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email verified successfully",
        access_token: accessToken,
        refresh_token: refreshToken,
        user_id: tokenData.user_id
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
