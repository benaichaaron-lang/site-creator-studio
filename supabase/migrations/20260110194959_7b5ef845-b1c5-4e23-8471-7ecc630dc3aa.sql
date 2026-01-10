-- Create email verification tokens table
CREATE TABLE public.email_verification_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  token TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_verification_tokens ENABLE ROW LEVEL SECURITY;

-- Create index for faster token lookups
CREATE INDEX idx_email_verification_tokens_token ON public.email_verification_tokens(token);
CREATE INDEX idx_email_verification_tokens_user_id ON public.email_verification_tokens(user_id);

-- RLS policy: Service role can do everything (tokens are managed by edge functions)
-- No direct user access needed as token verification happens server-side
CREATE POLICY "Service role can manage tokens"
ON public.email_verification_tokens
FOR ALL
USING (true)
WITH CHECK (true);

-- Function to clean up expired tokens (can be called periodically)
CREATE OR REPLACE FUNCTION public.cleanup_expired_verification_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM public.email_verification_tokens
  WHERE expires_at < now() OR used_at IS NOT NULL;
END;
$$;