import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut } from "lucide-react";
import googleLogo from "@/assets/google-logo.png";

const AuthTest = () => {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);

  const handleGoogle = async () => {
    setBusy(true);
    const { error } = await signInWithGoogle();
    if (error) {
      toast({
        title: "Erreur Google Sign-in",
        description: error.message ?? String(error),
        variant: "destructive",
      });
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    setBusy(true);
    await signOut();
    setBusy(false);
    toast({ title: "Déconnecté" });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md p-8 space-y-6 bg-card/80 backdrop-blur border-border">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-foreground">Test Auth Google</h1>
          <p className="text-sm text-muted-foreground">
            Page de diagnostic de la connexion Google
          </p>
        </header>

        <div className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-4">
          <span className="text-sm text-muted-foreground">État</span>
          {loading ? (
            <Badge variant="secondary" className="gap-1">
              <Loader2 className="h-3 w-3 animate-spin" /> Chargement
            </Badge>
          ) : user ? (
            <Badge className="bg-green-500/15 text-green-500 border-green-500/30">
              Connecté
            </Badge>
          ) : (
            <Badge variant="outline">Déconnecté</Badge>
          )}
        </div>

        {user && (
          <div className="space-y-1 rounded-lg border border-border bg-background/50 p-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Email</span>
              <span className="text-foreground truncate">{user.email}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">User ID</span>
              <span className="text-foreground font-mono text-xs truncate">{user.id}</span>
            </div>
          </div>
        )}

        {user ? (
          <Button
            onClick={handleSignOut}
            disabled={busy}
            variant="outline"
            className="w-full"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            Se déconnecter
          </Button>
        ) : (
          <Button
            onClick={handleGoogle}
            disabled={busy || loading}
            className="w-full bg-white text-black hover:bg-white/90 gap-2"
            size="lg"
          >
            {busy ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <img src={googleLogo} alt="Google" className="h-5 w-5" />
            )}
            Continuer avec Google
          </Button>
        )}
      </Card>
    </main>
  );
};

export default AuthTest;