-- ================================================
-- LASTRO — SQL Setup Supabase
-- Execute UM por vez, na ordem abaixo
-- ================================================


-- ================================================
-- SQL 1 — Tabela de diagnóstico
-- ================================================

create table diagnostico (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,

  produto_desc text,
  icp_desc text,
  ticket_medio numeric,
  modelo_cobranca text,

  concorrentes_desc text,
  foco_geografico text,
  historico_marketing text,

  budget_total numeric,
  meta_clientes integer,
  prazo_esperado integer,

  budget_midia numeric,
  nicho text,
  icp_score integer,
  diferencial_score integer,
  cac_estimado numeric,
  lastro_score integer,
  zona text,

  clientes_pagando boolean,
  canais_recomendados jsonb,
  canais_bloqueados jsonb,
  plano_90_dias jsonb,
  metricas_acompanhamento jsonb,

  status_plano text,
  cac_real numeric,
  lastro_score_atualizado integer,

  etapa_atual integer default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);


-- ================================================
-- SQL 2 — RLS da tabela diagnóstico
-- Execute depois do SQL 1
-- ================================================

alter table diagnostico enable row level security;

create policy "usuario ve proprios diagnosticos"
  on diagnostico
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ================================================
-- SQL 3 — Tabela de CAC por nicho
-- ================================================

create table cac_benchmark (
  id uuid default gen_random_uuid() primary key,
  nicho text not null,
  subnicho text,
  cpl_min numeric,
  cpl_max numeric,
  cac_min numeric,
  cac_max numeric,
  canal_principal text[],
  ciclo_min_dias integer,
  ciclo_max_dias integer,
  confianca text,
  updated_at timestamptz default now()
);


-- ================================================
-- SQL 4 — RLS da tabela cac_benchmark (leitura pública)
-- Execute depois do SQL 3
-- ================================================

alter table cac_benchmark enable row level security;

create policy "leitura publica cac"
  on cac_benchmark
  for select
  using (true);


-- ================================================
-- SQL 5 — Tabela de resultado semanal
-- Execute depois do SQL 1
-- ================================================

create table resultado_semanal (
  id uuid default gen_random_uuid() primary key,
  diagnostico_id uuid references diagnostico on delete cascade,
  user_id uuid references auth.users on delete cascade,
  semana integer not null,
  investimento_real numeric,
  resultado_real integer,
  cac_emergente numeric,
  status text,
  causa_desvio text,
  created_at timestamptz default now()
);


-- ================================================
-- SQL 6 — RLS da tabela resultado_semanal
-- Execute depois do SQL 5
-- ================================================

alter table resultado_semanal enable row level security;

create policy "usuario ve proprios resultados"
  on resultado_semanal
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ================================================
-- SQL 7 — Dados iniciais da tabela CAC
-- Execute depois do SQL 3
-- ================================================

insert into cac_benchmark
  (nicho, subnicho, cpl_min, cpl_max, cac_min, cac_max, canal_principal, ciclo_min_dias, ciclo_max_dias, confianca)
values
  ('imobiliaria', 'geral', 80, 350, 1500, 8000, array['meta_ads','google','portais'], 30, 90, 'alta'),
  ('imobiliaria', 'alto_padrao', 150, 600, 3000, 15000, array['google','portais_premium'], 60, 180, 'media'),
  ('clinica_medica', 'geral', 25, 90, 80, 400, array['meta_ads','google'], 7, 21, 'alta'),
  ('clinica_medica', 'estetica', 50, 180, 200, 800, array['meta_ads'], 7, 30, 'alta'),
  ('clinica_odontologica', 'geral', 30, 80, 100, 300, array['meta_ads','google'], 7, 21, 'alta'),
  ('clinica_odontologica', 'estetica_dental', 60, 200, 300, 1200, array['meta_ads'], 14, 45, 'alta'),
  ('credito_consignado', 'geral', 15, 60, 60, 250, array['meta_ads','whatsapp'], 1, 7, 'alta'),
  ('academia', 'convencional', 10, 40, 30, 120, array['meta_ads','organico_local'], 1, 14, 'alta'),
  ('studio_fitness', 'high_ticket', 40, 150, 150, 600, array['meta_ads','indicacao'], 7, 21, 'alta'),
  ('ecommerce', 'geral', 8, 45, 25, 120, array['meta_ads','google_shopping'], 1, 3, 'media'),
  ('ecommerce', 'nicho', 12, 60, 35, 180, array['meta_ads'], 1, 7, 'media'),
  ('perfumaria', 'geral', 6, 25, 18, 80, array['meta_ads','influencer'], 1, 7, 'media'),
  ('agencia_mkt', 'b2b', 60, 200, 400, 2000, array['indicacao','linkedin','conteudo'], 30, 90, 'alta'),
  ('infoproduto', 'geral', 5, 30, 15, 90, array['meta_ads','youtube'], 1, 3, 'media'),
  ('infoproduto', 'premium', 15, 60, 40, 180, array['meta_ads','email'], 1, 7, 'media');


-- ================================================
-- SQL 8 — Verificação final (opcional)
-- Deve retornar as 3 tabelas criadas
-- ================================================

select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('diagnostico', 'cac_benchmark', 'resultado_semanal')
order by table_name;
