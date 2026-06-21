-- Migration : Création de la table pour le suivi des A/B Tests
-- Cette table stocke toutes les impressions et conversions pour analyser
-- quelle variante convertit le mieux.

CREATE TABLE IF NOT EXISTS public.ab_test_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  experiment_id TEXT NOT NULL,
  variant TEXT NOT NULL CHECK (variant IN ('A', 'B')),
  event_type TEXT NOT NULL CHECK (event_type IN ('impression', 'conversion')),
  conversion_type TEXT,
  session_id TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les requêtes analytiques fréquentes
CREATE INDEX IF NOT EXISTS idx_ab_test_experiment ON public.ab_test_events(experiment_id);
CREATE INDEX IF NOT EXISTS idx_ab_test_variant ON public.ab_test_events(experiment_id, variant);
CREATE INDEX IF NOT EXISTS idx_ab_test_created ON public.ab_test_events(created_at DESC);

-- RLS : Insertion publique (visiteurs non connectés), lecture admin seulement
ALTER TABLE public.ab_test_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for tracking" ON public.ab_test_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON public.ab_test_events
  FOR SELECT USING (auth.role() = 'authenticated');

-- Vue analytique : Taux de conversion par expérience et variante
CREATE OR REPLACE VIEW public.ab_test_analytics AS
SELECT
  experiment_id,
  variant,
  COUNT(*) FILTER (WHERE event_type = 'impression') AS impressions,
  COUNT(*) FILTER (WHERE event_type = 'conversion') AS conversions,
  ROUND(
    COUNT(*) FILTER (WHERE event_type = 'conversion')::NUMERIC /
    NULLIF(COUNT(*) FILTER (WHERE event_type = 'impression'), 0) * 100,
    2
  ) AS conversion_rate_pct
FROM public.ab_test_events
GROUP BY experiment_id, variant
ORDER BY experiment_id, variant;
