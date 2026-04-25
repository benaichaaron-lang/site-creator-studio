import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [redirectResult, setRedirectResult] = useState<
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null
  >(null);

  // Detect OAuth redirect return: success when ?auth=callback or hash tokens present,
  // error when ?error / ?error_description in query or hash.
  useEffect(() => {
    const hash = window.location.hash.startsWith("#")
      ? window.location.hash.slice(1)
      : "";
    const hashParams = new URLSearchParams(hash);

    const queryError =
      searchParams.get("error_description") || searchParams.get("error");
    const hashError =
      hashParams.get("error_description") || hashParams.get("error");

    if (queryError || hashError) {
      const msg = queryError || hashError || "Échec de la connexion OAuth";
      setRedirectResult({ type: "error", message: msg });
      toast({
        title: "Échec OAuth",
        description: msg,
        variant: "destructive",
      });
      // Clean URL
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    const hasCallbackFlag = searchParams.get("auth") === "callback";
    const hasHashTokens =
      hashParams.has("access_token") || hashParams.has("refresh_token");

    if (hasCallbackFlag || hasHashTokens) {
      // Wait for auth state to resolve, then confirm
      if (!loading) {
        if (user) {
          setRedirectResult({
            type: "success",
            message: `Connexion Google réussie pour ${user.email}`,
          });
          toast({ title: "Connexion réussie", description: user.email ?? "" });
        } else {
          setRedirectResult({
            type: "error",
            message: "Retour OAuth reçu mais aucune session active.",
          });
        }
        // Clean URL after handling
        if (hasCallbackFlag) {
          searchParams.delete("auth");
          setSearchParams(searchParams, { replace: true });
        }
        if (hasHashTokens) {
          window.history.replaceState({}, "", window.location.pathname);
        }
      }
    }
  }, [loading, user, searchParams, setSearchParams, toast]);

  const handleGoogle = async () => {
    setBusy(true);
    setRedirectResult(null);
    const { error } = await signInWithGoogle();
    if (error) {
      toast({
        title: "Erreur Google Sign-in",
        description: error.message ?? String(error),
        variant: "destructive",
      });
      setRedirectResult({
        type: "error",
        message: error.message ?? String(error),
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
            <Badge className="bg-primary/15 text-primary border-primary/30">
              Connecté
            </Badge>
          ) : (
            <Badge variant="outline">Déconnecté</Badge>
          )}
        </div>

        {redirectResult && (
          <div
            className={
              redirectResult.type === "success"
                ? "rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm text-primary"
                : "rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
            }
            role="status"
          >
            {redirectResult.type === "success" ? "✓ " : "✕ "}
            {redirectResult.message}
          </div>
        )}

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