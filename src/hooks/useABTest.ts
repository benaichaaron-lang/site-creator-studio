/**
 * useABTest - Système d'A/B Testing autonome pour MySiteFactory
 * 
 * Fonctionnement :
 * - Assigne aléatoirement un variant (A ou B) à chaque visiteur
 * - Persiste le variant dans localStorage pour cohérence entre sessions
 * - Enregistre les impressions et conversions dans Supabase pour analyse
 */

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ABVariant = "A" | "B";

interface ABTestConfig {
  experimentId: string;
  variants: {
    A: Record<string, string>;
    B: Record<string, string>;
  };
}

interface ABTestResult {
  variant: ABVariant;
  values: Record<string, string>;
  trackConversion: (conversionType?: string) => void;
}

export const useABTest = (config: ABTestConfig): ABTestResult => {
  const storageKey = `ab_test_${config.experimentId}`;
  
  const getOrAssignVariant = (): ABVariant => {
    const stored = localStorage.getItem(storageKey);
    if (stored === "A" || stored === "B") return stored;
    const assigned: ABVariant = Math.random() < 0.5 ? "A" : "B";
    localStorage.setItem(storageKey, assigned);
    return assigned;
  };

  const [variant] = useState<ABVariant>(getOrAssignVariant);

  // Enregistrer l'impression au montage
  useEffect(() => {
    const trackImpression = async () => {
      try {
        await supabase.from("ab_test_events").insert({
          experiment_id: config.experimentId,
          variant,
          event_type: "impression",
          session_id: getSessionId(),
          created_at: new Date().toISOString(),
        });
      } catch {
        // Silently fail - ne pas bloquer l'UX pour un tracking
      }
    };
    trackImpression();
  }, [config.experimentId, variant]);

  const trackConversion = async (conversionType = "cta_click") => {
    try {
      await supabase.from("ab_test_events").insert({
        experiment_id: config.experimentId,
        variant,
        event_type: "conversion",
        conversion_type: conversionType,
        session_id: getSessionId(),
        created_at: new Date().toISOString(),
      });
    } catch {
      // Silently fail
    }
  };

  return {
    variant,
    values: config.variants[variant],
    trackConversion,
  };
};

// Génère un ID de session stable pour la durée de la visite
function getSessionId(): string {
  const key = "msf_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

// Configurations des expériences A/B actives
export const AB_EXPERIMENTS = {
  // Expérience 1 : Hero CTA
  HERO_CTA: {
    experimentId: "hero_cta_v1",
    variants: {
      A: {
        ctaText: "Démarrer mon brief",
        ctaSubtext: "Réponse sous 24h",
      },
      B: {
        ctaText: "Lancer mon projet maintenant",
        ctaSubtext: "Gratuit • Sans engagement",
      },
    },
  },

  // Expérience 2 : Titre Hero
  HERO_TITLE: {
    experimentId: "hero_title_v1",
    variants: {
      A: {
        title: "Propulsez votre business avec un site",
        titleHighlight: "livré en 7 jours chrono",
      },
      B: {
        title: "Votre site web professionnel",
        titleHighlight: "prêt en 7 jours, garanti",
      },
    },
  },

  // Expérience 3 : Urgence sur les packs
  PRICING_URGENCY: {
    experimentId: "pricing_urgency_v1",
    variants: {
      A: {
        badge: "",
        urgencyText: "",
      },
      B: {
        badge: "🔥 Offre limitée",
        urgencyText: "Plus que 3 créneaux disponibles ce mois",
      },
    },
  },
};
