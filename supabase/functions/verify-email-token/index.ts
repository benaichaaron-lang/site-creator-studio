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

    // Mark token as used IMMEDIATELY to prevent reuse
    const { error: updateError } = await supabaseAdmin
      .from("email_verification_tokens")
      .update({ used_at: new Date().toISOString() })
      .eq("id", tokenData.id);

    if (updateError) {
      console.error("Error marking token as used:", updateError);
      // Continue anyway - we don't want to fail the verification
    }

    // Find user by user_id from token
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(tokenData.user_id);
    
    if (userError || !userData.user) {
      console.error("Error fetching user:", userError);
      
      // Fallback: Try to find by email
      const { data: usersList, error: usersListError } = await supabaseAdmin.auth.admin.listUsers();
      
      if (usersListError) {
        console.error("Error listing users:", usersListError);
        return new Response(
          JSON.stringify({ error: "Failed to verify user", code: "USER_LIST_ERROR" }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      const user = usersList.users.find(u => u.email === tokenData.email);
      
      if (!user) {
        console.error("User not found for email:", tokenData.email);
        return new Response(
          JSON.stringify({ error: "User not found", code: "USER_NOT_FOUND" }),
          { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      
      // Found by email fallback
      tokenData.user_id = user.id;
    }

    const userId = userData?.user?.id || tokenData.user_id;

    // Step 1: Update user's email confirmation status
    console.log(`Confirming email for user: ${userId}`);
    
    const { error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      email_confirm: true
    });

    if (confirmError) {
      console.error("Error confirming email:", confirmError);
      // Don't fail - the email might already be confirmed
    }

    console.log(`Email confirmed for user: ${userId}`);

    // Step 2: Generate a magic link for auto-login
    // We use generateLink to create a session token that will log the user in
    console.log(`Generating magic link for auto-login: ${tokenData.email}`);
    
    const { data: magicLinkData, error: magicLinkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: tokenData.email,
      options: {
        redirectTo: 'https://mysitefactory.com/dashboard'
      }
    });

    if (magicLinkError) {
      console.error("Error generating magic link:", magicLinkError);
      // Fallback: return success but without auto-login
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Email verified successfully",
          user_id: userId,
          email_confirmed: true,
          auto_login: false,
          redirect_url: '/auth?verified=true'
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Extract the token from the magic link for client-side session creation
    // The action_link contains the tokens needed for auto-login
    const actionLink = magicLinkData.properties?.action_link;
    
    if (!actionLink) {
      console.error("No action link in magic link response");
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Email verified successfully",
          user_id: userId,
          email_confirmed: true,
          auto_login: false,
          redirect_url: '/auth?verified=true'
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Parse the action link to extract token parameters
    // Format: https://xxx.supabase.co/auth/v1/verify?token=xxx&type=magiclink&redirect_to=xxx
    const url = new URL(actionLink);
    const accessToken = url.searchParams.get('token');
    const tokenHash = magicLinkData.properties?.hashed_token;

    console.log(`Magic link generated successfully for: ${tokenData.email}`);

    // Return success with the magic link token for auto-login
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email verified successfully",
        user_id: userId,
        email_confirmed: true,
        auto_login: true,
        // Return the Supabase action link - the frontend will use this to complete login
        action_link: actionLink,
        token_hash: tokenHash,
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