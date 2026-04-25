import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut } from "lucide-react";
import googleLogo from "@/assets/google-logo.png";

// Keys considered sensitive and masked in the Details panel
const SENSITIVE_KEYS = new Set([
  "access_token",
  "refresh_token",
  "provider_token",
  "provider_refresh_token",
  "id_token",
  "code",
]);

// Keys we always strip from the URL after handling the OAuth return
const OAUTH_QUERY_KEYS = [
  "auth",
  "code",
  "state",
  "error",
  "error_code",
  "error_description",
  "provider",
];
const OAUTH_HASH_KEYS = [
  "access_token",
  "refresh_token",
  "provider_token",
  "provider_refresh_token",
  "id_token",
  "expires_in",
  "expires_at",
  "token_type",
  "type",
  "state",
  "error",
  "error_code",
  "error_description",
];

const maskValue = (key: string, value: string) => {
  if (!SENSITIVE_KEYS.has(key)) return value;
  if (value.length <= 8) return "••••";
  return `${value.slice(0, 4)}…${value.slice(-4)} (${value.length} chars)`;
};

const AuthTest = () => {
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const [redirectResult, setRedirectResult] = useState<
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null
  >(null);
  const [details, setDetails] = useState<{
    receivedQuery: Array<[string, string]>;
    receivedHash: Array<[string, string]>;
    cleanedUrl: string;
  } | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    const hashRaw = url.hash.startsWith("#") ? url.hash.slice(1) : "";
    const hashParams = new URLSearchParams(hashRaw);

    const queryError =
      queryParams.get("error_description") || queryParams.get("error");
    const hashError =
      hashParams.get("error_description") || hashParams.get("error");
    const hasCallbackFlag = queryParams.get("auth") === "callback";
    const hasHashTokens =
      hashParams.has("access_token") || hashParams.has("refresh_token");
    const hasOAuthCode = queryParams.has("code");

    const isOAuthReturn =
      Boolean(queryError || hashError) ||
      hasCallbackFlag ||
      hasHashTokens ||
      hasOAuthCode;

    if (!isOAuthReturn) return;

    // Wait for auth resolution before declaring success
    if (!queryError && !hashError && loading) return;

    // Snapshot received params (before cleanup) for the Details panel
    const receivedQuery = Array.from(queryParams.entries());
    const receivedHash = Array.from(hashParams.entries());

    // Determine result
    if (queryError || hashError) {
      const msg = queryError || hashError || "Échec de la connexion OAuth";
      setRedirectResult({ type: "error", message: msg });
      toast({ title: "Échec OAuth", description: msg, variant: "destructive" });
    } else if (user) {
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

    // Robust cleanup: strip every known OAuth key from query AND hash
    OAUTH_QUERY_KEYS.forEach((k) => queryParams.delete(k));
    OAUTH_HASH_KEYS.forEach((k) => hashParams.delete(k));

    const newSearch = queryParams.toString();
    const newHash = hashParams.toString();
    const cleanedUrl =
      url.pathname +
      (newSearch ? `?${newSearch}` : "") +
      (newHash ? `#${newHash}` : "");

    window.history.replaceState({}, "", cleanedUrl);

    setDetails({
      receivedQuery,
      receivedHash,
      cleanedUrl: window.location.origin + cleanedUrl,
    });
  }, [loading, user, toast]);

  const handleGoogle = async () => {
    setBusy(true);
    setRedirectResult(null);
    setDetails(null);
    // Override redirect target so we land back on this test page with a flag
    const { lovable } = await import("@/integrations/lovable");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/auth-test?auth=callback`,
    });
    const error = result.error;
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

        {details && (
          <details className="rounded-lg border border-border bg-background/50 p-4 text-sm" open>
            <summary className="cursor-pointer text-foreground font-medium">
              Détails de la redirection
            </summary>
            <div className="mt-3 space-y-3">
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  Query params reçus
                </div>
                {details.receivedQuery.length === 0 ? (
                  <div className="text-xs text-muted-foreground">(aucun)</div>
                ) : (
                  <ul className="space-y-1 font-mono text-xs">
                    {details.receivedQuery.map(([k, v]) => (
                      <li key={`q-${k}`} className="break-all">
                        <span className="text-primary">{k}</span>
                        <span className="text-muted-foreground"> = </span>
                        <span className="text-foreground">{maskValue(k, v)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  Hash params reçus
                </div>
                {details.receivedHash.length === 0 ? (
                  <div className="text-xs text-muted-foreground">(aucun)</div>
                ) : (
                  <ul className="space-y-1 font-mono text-xs">
                    {details.receivedHash.map(([k, v]) => (
                      <li key={`h-${k}`} className="break-all">
                        <span className="text-primary">{k}</span>
                        <span className="text-muted-foreground"> = </span>
                        <span className="text-foreground">{maskValue(k, v)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  URL nettoyée
                </div>
                <div className="font-mono text-xs break-all text-foreground">
                  {details.cleanedUrl}
                </div>
              </div>
            </div>
          </details>
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