-- Create table for storing project briefs
CREATE TABLE public.project_briefs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    project_type TEXT,
    budget TEXT,
    timeline TEXT,
    details TEXT,
    recommendation TEXT,
    language TEXT DEFAULT 'fr',
    status TEXT DEFAULT 'new',
    user_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.project_briefs ENABLE ROW LEVEL SECURITY;

-- Admins can view all briefs
CREATE POLICY "Admins can view all briefs"
ON public.project_briefs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update briefs
CREATE POLICY "Admins can update briefs"
ON public.project_briefs
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Users can view their own briefs (if they have an account)
CREATE POLICY "Users can view their own briefs"
ON public.project_briefs
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Anyone can insert a brief (public form)
CREATE POLICY "Anyone can insert briefs"
ON public.project_briefs
FOR INSERT
WITH CHECK (true);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_project_briefs_updated_at
BEFORE UPDATE ON public.project_briefs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for faster queries
CREATE INDEX idx_project_briefs_email ON public.project_briefs(email);
CREATE INDEX idx_project_briefs_status ON public.project_briefs(status);
CREATE INDEX idx_project_briefs_created_at ON public.project_briefs(created_at DESC);