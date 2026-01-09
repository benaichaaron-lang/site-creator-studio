-- Add internal_tags column to profiles for admin use (VIP, To follow, Inactive)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS internal_tags text[] DEFAULT '{}';

-- Add order_id to tickets if not already linked properly for support
-- (already exists as order_id in tickets table)

-- Create index for faster tag queries
CREATE INDEX IF NOT EXISTS idx_profiles_internal_tags ON public.profiles USING GIN(internal_tags);