-- ============================================================================
-- LASTRO — Migração 001: Criação das Tabelas Core
-- Supabase SQL Editor · Executar na ordem
-- Versão: 1.0 · Sprint 0
-- ============================================================================


-- ============================================================================
-- 1. ENUMS CUSTOMIZADOS
-- ============================================================================

CREATE TYPE modelo_cobranca_enum AS ENUM ('unico', 'recorrente', 'parcelado');
CREATE TYPE prazo_enum AS ENUM ('30', '60', '90', '180');
CREATE TYPE zona_enum AS ENUM ('critico', 'ajuste', 'ressalvas', 'pronto');
CREATE TYPE status_plano_enum AS ENUM ('no_prazo', 'atencao', 'revisao');
CREATE TYPE causa_desvio_enum AS ENUM ('canal', 'mensagem', 'icp', 'diagnostico');
CREATE TYPE confianca_enum AS ENUM ('alta', 'media', 'baixa');
CREATE TYPE fonte_benchmark_enum AS ENUM ('memoria_agencia', 'benchmark_ajustado', 'dado_proprio');


-- ============================================================================
-- 2. TABELA: diagnostico (Objeto central único — percorre M1 → M2 → M3)
-- ============================================================================

CREATE TABLE diagnostico (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,

  -- ── M1: Inputs do Usuário (9 tópicos adaptativos) ──
  produto_desc TEXT,                          -- P1: "O que você vende?"
  icp_desc TEXT,                              -- P2: "Quem é seu cliente?"
  ticket_medio NUMERIC,                       -- P3: Ticket médio
  modelo_cobranca modelo_cobranca_enum,       -- P3: Modelo de receita
  concorrentes_desc TEXT,                     -- P4: Concorrentes e diferencial
  foco_geografico TEXT,                       -- P5: Região de atuação
  historico_marketing TEXT,                   -- P6: O que já tentou
  budget_total NUMERIC,                       -- P7: Budget declarado
  meta_clientes INTEGER,                      -- P8: Meta de clientes
  prazo_esperado prazo_enum,                  -- P9: Prazo esperado

  -- ── M1: Campos Calculados (IA + Algoritmos) ──
  budget_midia NUMERIC,                       -- budget_total × 0.56 (desconta ferramenta + produção)
  nicho TEXT,                                 -- Extraído pela IA (P1)
  subnicho TEXT,                              -- Extraído pela IA (P1)
  categoria TEXT,                             -- servico | produto | infoproduto | saas
  modelo_negocio TEXT,                        -- b2b | b2c | b2b2c
  icp_score INTEGER CHECK (icp_score BETWEEN 0 AND 100),
  diferencial_score INTEGER CHECK (diferencial_score BETWEEN 0 AND 100),
  cac_estimado NUMERIC,                       -- Lookup na cac_benchmark
  canais_testados JSONB,                      -- Histórico de canais já tentados (P6)
  tem_historico BOOLEAN DEFAULT FALSE,

  -- ── M1: Lastro Score ──
  lastro_score INTEGER CHECK (lastro_score BETWEEN 0 AND 100),
  zona zona_enum,
  score_viabilidade NUMERIC,                  -- Dimensão 1: 40%
  score_icp NUMERIC,                          -- Dimensão 2: 25%
  score_prazo NUMERIC,                        -- Dimensão 3: 20%
  score_mercado NUMERIC,                      -- Dimensão 4: 15%

  -- ── ACSD: Contexto Brasileiro ──
  cac_ajustado_imposto NUMERIC,               -- CAC com impostos BR (12.15% Meta 2026)
  cac_ajustado_sazonalidade NUMERIC,          -- CAC com sazonalidade do mês
  mes_diagnostico INTEGER,                    -- Mês em que o diagnóstico foi feito
  budget_midia_liquido NUMERIC,               -- Budget real de leilão (pós-imposto)

  -- ── AELI: Pivot de ICP ──
  pivot_sugerido BOOLEAN DEFAULT FALSE,
  pivot_subnicho TEXT,                        -- Subnicho sugerido pelo AELI
  pivot_justificativa TEXT,

  -- ── M1: Outputs IA ──
  relatorio_viabilidade TEXT,                 -- Texto gerado pela IA
  plano_acao TEXT,                            -- Ações recomendadas
  prompt_version TEXT DEFAULT 'v1',           -- Versão do prompt que gerou

  -- ── M2: GTM (Go-To-Market) ──
  clientes_pagando BOOLEAN,                   -- Única pergunta nova do M2
  canais_recomendados JSONB,                  -- [{nome, prioridade, justificativa, budget}]
  canais_bloqueados JSONB,                    -- [{nome, motivo}]
  plano_90_dias JSONB,                        -- [{semana, foco, acoes[], marco}]
  metricas_acompanhamento JSONB,              -- [{nome, meta_s4, meta_s8, meta_s12}]
  threshold_alerta NUMERIC,                   -- 40% da meta na semana 4

  -- ── M3: Tracker ──
  status_plano status_plano_enum,
  cac_real NUMERIC,                           -- CAC real coletado do campo
  lastro_score_atualizado INTEGER CHECK (lastro_score_atualizado BETWEEN 0 AND 100),

  -- ── Controle ──
  etapa_atual INTEGER DEFAULT 1,              -- 1=M1 | 2=M2 | 3=M3
  topico_atual INTEGER DEFAULT 1,             -- Tópico atual dentro do M1 (1–9)
  data_inicio_plano DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para busca rápida por usuário
CREATE INDEX idx_diagnostico_user ON diagnostico(user_id);
CREATE INDEX idx_diagnostico_nicho ON diagnostico(nicho);

-- Trigger de updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_diagnostico_updated
  BEFORE UPDATE ON diagnostico
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================================
-- 3. TABELA: cac_benchmark (Editável via painel Supabase — sem deploy)
-- ============================================================================

CREATE TABLE cac_benchmark (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nicho TEXT NOT NULL,
  subnicho TEXT,
  cpl_min NUMERIC,
  cpl_max NUMERIC,
  cac_min NUMERIC,
  cac_max NUMERIC,
  canal_principal TEXT[],
  ciclo_min_dias INTEGER,
  ciclo_max_dias INTEGER,
  confianca confianca_enum DEFAULT 'media',
  fonte fonte_benchmark_enum DEFAULT 'memoria_agencia',
  amostras_coletadas INTEGER DEFAULT 0,       -- AFP: quantos dados reais alimentam
  ultima_calibracao TIMESTAMPTZ,              -- AFP: última vez que o flywheel atualizou
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cac_nicho ON cac_benchmark(nicho);
CREATE INDEX idx_cac_subnicho ON cac_benchmark(nicho, subnicho);

CREATE TRIGGER trg_cac_benchmark_updated
  BEFORE UPDATE ON cac_benchmark
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================================
-- 4. TABELA: resultado_semanal (Módulo 3 — Tracker)
-- ============================================================================

CREATE TABLE resultado_semanal (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  diagnostico_id UUID REFERENCES diagnostico ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  semana INTEGER NOT NULL CHECK (semana >= 1 AND semana <= 12),
  investimento_real NUMERIC,
  resultado_real INTEGER,                     -- Leads, trials ou vendas
  cac_emergente NUMERIC,                      -- Calculado: investimento / resultado
  status status_plano_enum,
  causa_desvio causa_desvio_enum,
  correcao_sugerida TEXT,                     -- Texto do AUD (UX Defensiva)
  canal_reportado TEXT,                       -- Qual canal gerou esse resultado
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_resultado_diagnostico ON resultado_semanal(diagnostico_id);
CREATE INDEX idx_resultado_semana ON resultado_semanal(diagnostico_id, semana);

-- Constraint: máximo 1 resultado por semana por diagnóstico
CREATE UNIQUE INDEX idx_resultado_unico ON resultado_semanal(diagnostico_id, semana);


-- ============================================================================
-- 5. TABELA: conversa_topico (Rastreio da conversa adaptativa do M1)
-- ============================================================================

CREATE TABLE conversa_topico (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  diagnostico_id UUID REFERENCES diagnostico ON DELETE CASCADE NOT NULL,
  topico INTEGER NOT NULL CHECK (topico >= 1 AND topico <= 9),
  pergunta_principal TEXT NOT NULL,
  resposta_usuario TEXT,
  complementares_feitas INTEGER DEFAULT 0,
  complementares_max INTEGER NOT NULL,
  dados_extraidos JSONB,                      -- JSON retornado pela IA
  confianca_extracao confianca_enum,
  suficiente BOOLEAN DEFAULT FALSE,
  prompt_version TEXT DEFAULT 'v1',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conversa_diagnostico ON conversa_topico(diagnostico_id);
CREATE UNIQUE INDEX idx_conversa_unica ON conversa_topico(diagnostico_id, topico);


-- ============================================================================
-- 6. RLS (Row Level Security) — Isolamento por Usuário
-- ============================================================================

-- diagnostico: usuário vê e edita apenas os seus
ALTER TABLE diagnostico ENABLE ROW LEVEL SECURITY;
CREATE POLICY "usuario_diagnostico_select" ON diagnostico FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "usuario_diagnostico_insert" ON diagnostico FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "usuario_diagnostico_update" ON diagnostico FOR UPDATE USING (auth.uid() = user_id);

-- cac_benchmark: leitura pública, escrita apenas via service_role
ALTER TABLE cac_benchmark ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cac_leitura_publica" ON cac_benchmark FOR SELECT USING (true);

-- resultado_semanal: usuário vê e edita apenas os seus
ALTER TABLE resultado_semanal ENABLE ROW LEVEL SECURITY;
CREATE POLICY "usuario_resultado_select" ON resultado_semanal FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "usuario_resultado_insert" ON resultado_semanal FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "usuario_resultado_update" ON resultado_semanal FOR UPDATE USING (auth.uid() = user_id);

-- conversa_topico: acesso via diagnóstico do próprio usuário
ALTER TABLE conversa_topico ENABLE ROW LEVEL SECURITY;
CREATE POLICY "usuario_conversa_select" ON conversa_topico FOR SELECT
  USING (diagnostico_id IN (SELECT id FROM diagnostico WHERE user_id = auth.uid()));
CREATE POLICY "usuario_conversa_insert" ON conversa_topico FOR INSERT
  WITH CHECK (diagnostico_id IN (SELECT id FROM diagnostico WHERE user_id = auth.uid()));
CREATE POLICY "usuario_conversa_update" ON conversa_topico FOR UPDATE
  USING (diagnostico_id IN (SELECT id FROM diagnostico WHERE user_id = auth.uid()));


-- ============================================================================
-- 7. SEED: Tabela CAC (15 nichos brasileiros — Fonte: ML Creation Studio)
-- Ajuste 2026: +12.15% sobre Meta Ads
-- ============================================================================

INSERT INTO cac_benchmark
  (nicho, subnicho, cpl_min, cpl_max, cac_min, cac_max, canal_principal, ciclo_min_dias, ciclo_max_dias, confianca, fonte)
VALUES
  ('imobiliaria',          'geral',            80,  350, 1500,  8000, ARRAY['meta_ads','google','portais'],       30, 90,  'alta',  'memoria_agencia'),
  ('imobiliaria',          'alto_padrao',      150, 600, 3000, 15000, ARRAY['google','portais_premium'],          60, 180, 'media', 'benchmark_ajustado'),
  ('clinica_medica',       'geral',            25,  90,  80,   400,   ARRAY['meta_ads','google'],                 7,  21,  'alta',  'memoria_agencia'),
  ('clinica_medica',       'estetica',         50,  180, 200,  800,   ARRAY['meta_ads'],                          7,  30,  'alta',  'memoria_agencia'),
  ('clinica_odontologica', 'geral',            30,  80,  100,  300,   ARRAY['meta_ads','google'],                 7,  21,  'alta',  'memoria_agencia'),
  ('clinica_odontologica', 'estetica_dental',  60,  200, 300,  1200,  ARRAY['meta_ads'],                          14, 45,  'alta',  'memoria_agencia'),
  ('credito_consignado',   'geral',            15,  60,  60,   250,   ARRAY['meta_ads','whatsapp'],               1,  7,   'alta',  'memoria_agencia'),
  ('academia',             'convencional',     10,  40,  30,   120,   ARRAY['meta_ads','organico_local'],         1,  14,  'alta',  'memoria_agencia'),
  ('studio_fitness',       'high_ticket',      40,  150, 150,  600,   ARRAY['meta_ads','indicacao'],              7,  21,  'alta',  'memoria_agencia'),
  ('ecommerce',            'geral',            8,   45,  25,   120,   ARRAY['meta_ads','google_shopping'],        1,  3,   'media', 'benchmark_ajustado'),
  ('ecommerce',            'nicho',            12,  60,  35,   180,   ARRAY['meta_ads'],                          1,  7,   'media', 'benchmark_ajustado'),
  ('perfumaria',           'geral',            6,   25,  18,   80,    ARRAY['meta_ads','influencer'],             1,  7,   'media', 'benchmark_ajustado'),
  ('agencia_mkt',          'b2b',              60,  200, 400,  2000,  ARRAY['indicacao','linkedin','conteudo'],   30, 90,  'alta',  'memoria_agencia'),
  ('infoproduto',          'geral',            5,   30,  15,   90,    ARRAY['meta_ads','youtube'],                1,  3,   'media', 'benchmark_ajustado'),
  ('infoproduto',          'premium',          15,  60,  40,   180,   ARRAY['meta_ads','email'],                  1,  7,   'media', 'benchmark_ajustado');


-- ============================================================================
-- 8. VERIFICAÇÃO FINAL
-- ============================================================================

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('diagnostico', 'cac_benchmark', 'resultado_semanal', 'conversa_topico')
ORDER BY table_name;
