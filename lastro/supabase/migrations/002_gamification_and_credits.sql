-- ============================================================================
-- LASTRO — Migração 002: Gamificação e Créditos AI
-- Baseado nos documentos de estudo (Nexus/Lastro)
-- ============================================================================

-- 1. ENUMS ADICIONAIS
CREATE TYPE transaction_type_enum AS ENUM ('allocation', 'debit', 'addon_purchase', 'expiration');
CREATE TYPE achievement_category_enum AS ENUM ('agilidade', 'dados', 'financeiro', 'conversao', 'engajamento');

-- 2. NOVAS COLUNAS EM DIAGNOSTICO (PER FIL)
ALTER TABLE diagnostico 
ADD COLUMN ai_credits_balance DECIMAL(10,2) DEFAULT 100.00,
ADD COLUMN xp_total INTEGER DEFAULT 0,
ADD COLUMN nivel_maturidade INTEGER DEFAULT 1;

-- 3. TABELA: credit_ledger (Audit Log de Consumo)
CREATE TABLE credit_ledger (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  diagnostico_id UUID REFERENCES diagnostico ON DELETE CASCADE NOT NULL,
  transaction_type transaction_type_enum NOT NULL,
  credits DECIMAL(10,2) NOT NULL,
  action_type TEXT, -- 'suggestion', 'resolution', 'churn_insight', etc.
  model_used TEXT, -- 'gpt-4o-mini', 'claude-3-haiku', etc.
  cost_brl DECIMAL(10,6), -- Custo real aproximado em R$
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ledger_diagnostico ON credit_ledger(diagnostico_id);

-- 4. TABELA: achievements (Badges Conquistados)
CREATE TABLE achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  diagnostico_id UUID REFERENCES diagnostico ON DELETE CASCADE NOT NULL,
  category achievement_category_enum NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- ID do ícone ou URL
  unlocked_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_achievements_diagnostico ON achievements(diagnostico_id);

-- 5. RLS (Row Level Security)
ALTER TABLE credit_ledger ENABLE ROW LEVEL SECURITY;
CREATE POLICY "usuario_ledger_select" ON credit_ledger FOR SELECT 
  USING (diagnostico_id IN (SELECT id FROM diagnostico WHERE user_id = auth.uid()));

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "usuario_achievements_select" ON achievements FOR SELECT 
  USING (diagnostico_id IN (SELECT id FROM diagnostico WHERE user_id = auth.uid()));

-- 6. FUNÇÃO AUXILIAR: Debitar Créditos
CREATE OR REPLACE FUNCTION debitar_creditos(p_diag_id UUID, p_amount DECIMAL, p_action TEXT, p_model TEXT, p_cost DECIMAL)
RETURNS VOID AS $$
BEGIN
  -- Atualiza o saldo no diagnóstico
  UPDATE diagnostico 
  SET ai_credits_balance = ai_credits_balance - p_amount
  WHERE id = p_diag_id;

  -- Registra no ledger
  INSERT INTO credit_ledger (diagnostico_id, transaction_type, credits, action_type, model_used, cost_brl)
  VALUES (p_diag_id, 'debit', p_amount, p_action, p_model, p_cost);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
