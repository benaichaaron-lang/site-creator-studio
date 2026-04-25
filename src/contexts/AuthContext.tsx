import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, metadata?: { first_name?: string; last_name?: string; phone?: string }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Detect OAuth callback markers in URL (code/access_token/state) BEFORE listener fires
    const url = new URL(window.location.href);
    const hashParams = new URLSearchParams(url.hash.replace(/^#/, ''));
    const isOAuthReturn =
      url.searchParams.has('code') ||
      url.searchParams.has('access_token') ||
      hashParams.has('access_token') ||
      sessionStorage.getItem('oauth_pending') === '1';

    const cleanOAuthUrl = () => {
      ['code', 'state', 'access_token', 'refresh_token', 'token_type', 'expires_in', 'provider_token', 'error', 'error_description']
        .forEach((k) => {
          url.searchParams.delete(k);
          hashParams.delete(k);
        });
      const newSearch = url.searchParams.toString();
      const newHash = hashParams.toString();
      const cleaned = url.pathname + (newSearch ? `?${newSearch}` : '') + (newHash ? `#${newHash}` : '');
      window.history.replaceState({}, '', cleaned);
    };

    const handleOAuthRedirect = (signedInUser: User) => {
      sessionStorage.removeItem('oauth_pending');
      cleanOAuthUrl();

      // New vs existing account: created within last 60s = new
      const createdAt = signedInUser.created_at ? new Date(signedInUser.created_at).getTime() : 0;
      const isNewAccount = createdAt > 0 && Date.now() - createdAt < 60_000;

      // Admin check to pick destination
      supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', signedInUser.id)
        .eq('role', 'admin')
        .maybeSingle()
        .then(({ data }) => {
          const destination = data ? '/admin' : '/dashboard';
          toast({
            title: isNewAccount ? 'Bienvenue ! 🎉' : 'Connexion réussie',
            description: isNewAccount
              ? 'Votre compte a été créé avec Google.'
              : `Content de vous revoir${signedInUser.user_metadata?.full_name ? `, ${signedInUser.user_metadata.full_name}` : ''} !`,
          });
          // Avoid redirecting if already on a private page
          const path = window.location.pathname;
          const stayOn = ['/admin', '/dashboard', '/profile', '/checkout'].some((p) => path.startsWith(p));
          if (!stayOn) {
            window.location.replace(destination);
          }
        });
    };

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Check admin role with setTimeout to prevent deadlock
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
        }

        // Handle OAuth completion: SIGNED_IN event right after returning from provider
        if (event === 'SIGNED_IN' && session?.user && isOAuthReturn) {
          setTimeout(() => handleOAuthRedirect(session.user), 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (!error && data) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.error('Error checking admin role:', err);
      setIsAdmin(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: { first_name?: string; last_name?: string; phone?: string }) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata
      }
    });

    // Send welcome email if signup was successful
    if (!error && data.user) {
      try {
        // Detect language from browser or default to French
        const browserLang = navigator.language?.startsWith('en') ? 'en' : 'fr';
        
        await supabase.functions.invoke('send-welcome-email', {
          body: {
            userId: data.user.id,
            email: email,
            firstName: metadata?.first_name,
            language: browserLang,
          },
        });
        console.log('Welcome email sent successfully');
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail signup if email fails
      }
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signInWithGoogle = async () => {
    // Mark that an OAuth flow is in progress so we can detect the return
    sessionStorage.setItem('oauth_pending', '1');
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: `${window.location.origin}/auth`,
    });
    if (result.error) {
      sessionStorage.removeItem('oauth_pending');
    }
    return { error: result.error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  const value = {
    user,
    session,
    loading,
    isAdmin,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
