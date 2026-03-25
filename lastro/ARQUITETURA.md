# Lastro — Arquitetura Técnica

## Stack de desenvolvimento

| Camada | Tecnologia | Motivo |
|--------|-----------|--------|
| Construção do produto | Lovable | Geração de código por prompt — sem dev humano no MVP |
| Banco de dados | Supabase (PostgreSQL) | Nativo com Lovable, gerenciado, painel visual |
| Autenticação | Supabase Auth | Embutido, sem configuração extra |
| Lógica server-side | Supabase Edge Functions | TypeScript, deploy pelo painel |
| IA do produto | Anthropic API (Claude) | Melhor compreensão PT-BR, contexto mais preciso |
| Automação de e-mails | Resend | Alta deliverability, plano gratuito generoso |
| Workflows automáticos | n8n | Conecta Supabase + Resend sem código |
| Agente de desenvolvimento | Claude / ChatGPT | Escreve código para Edge Functions e debug |

---

## Princípio arquitetural central

**Um único objeto de diagnóstico percorre os 3 módulos.**
O usuário nunca repete informação. Cada módulo lê o que precisa e escreve o que produziu.

---

## Modelo de dados — objeto de diagnóstico

### Tabela principal: `diagnostico`

```typescript
{
  id: uuid
  user_id: uuid                    // Supabase Auth
  
  // Módulo 1 — inputs do usuário
  produto_desc: text               // Resposta aberta P1 — processada pela IA
  icp_desc: text                   // Resposta aberta P2
  ticket_medio: decimal
  modelo_cobranca: enum            // unico | recorrente | parcelado
  concorrentes_desc: text          // Resposta aberta P4
  foco_geografico: text
  historico_marketing: text        // Resposta aberta P6
  budget_total: decimal
  meta_clientes: int
  prazo_esperado: enum             // 30 | 60 | 90 | 180

  // Módulo 1 — campos calculados
  budget_midia: decimal            // budget_total × 0,56 — NUNCA digitado
  nicho: text                      // Extraído pela IA de produto_desc
  icp_score: int                   // 0–100 — calculado pela IA
  diferencial_score: int           // 0–100 — calculado pela IA
  cac_estimado: decimal            // Lookup na tabela cac_benchmark
  lastro_score: int                // 0–100 — fórmula dos 4 pesos
  zona: enum                       // critico | ajuste | ressalvas | pronto
  
  // Módulo 2 — gerado pelo produto
  canais_recomendados: jsonb       // [{nome, prioridade, justificativa, budget}]
  canais_bloqueados: jsonb         // [{nome, motivo}]
  plano_90_dias: jsonb             // [{semana, foco, acoes[], marco}]
  metricas_acompanhamento: jsonb   // [{nome, meta_s4, meta_s8, meta_s12}]
  threshold_alerta: decimal        // 40% da meta na semana 4
  clientes_pagando: boolean        // Única pergunta nova do módulo 2
  
  // Módulo 3 — monitoramento
  status_plano: enum               // no_prazo | atencao | revisao
  cac_real: decimal                // Coletado no loop de feedback
  lastro_score_atualizado: int     // Recalculado com dados reais
  
  // Controle
  created_at: timestamp
  updated_at: timestamp
  data_inicio_plano: date
}
```

### Tabela: `cac_benchmark`
```typescript
{
  id: uuid
  nicho: text
  subnicho: text                   // ex: "odonto_geral" vs "odonto_estetica"
  cpl_min: decimal
  cpl_max: decimal
  cac_min: decimal
  cac_max: decimal
  canal_principal: text[]
  ciclo_medio_dias_min: int
  ciclo_medio_dias_max: int
  confianca: enum                  // alta | media | baixa
  fonte: enum                      // memoria_agencia | benchmark_ajustado | dado_proprio
  updated_at: timestamp
}
```

### Tabela: `resultado_semanal`
```typescript
{
  id: uuid
  diagnostico_id: uuid
  semana: int
  investimento_real: decimal
  resultado_real: int              // leads / trials / vendas
  cac_emergente: decimal           // calculado: investimento / resultado
  status: enum                     // no_prazo | atencao | revisao
  causa_desvio: enum               // canal | mensagem | icp | diagnostico
  created_at: timestamp
}
```

---

## Regras de bloqueio entre módulos

```
score < 40           → módulo 2 BLOQUEADO
budget_midia < 600   → bloqueia tráfego pago
budget/CAC < 3       → bloqueia mesmo com budget ok
icp_score < 40       → bloqueia todos canais pagos
prazo == 30          → bloqueia orgânico e SEO
ticket < 200         → bloqueia LinkedIn e outbound
modelo == recorrente → ativa lógica SaaS
clientes_pagando == false → bloqueia anúncios
```

---

## Edge Functions necessárias

### 1. `calcular-score`
Recebe os campos do módulo 1 e calcula:
- `budget_midia = budget_total × 0,56`
- Lookup de `cac_estimado` na tabela `cac_benchmark`
- Scores das 4 dimensões
- `lastro_score` pela fórmula
- `zona` pelo score

### 2. `processar-respostas-abertas`
Chama a Anthropic API com os 4 prompts:
- P1 → extrai `nicho` e categoria
- P2 → calcula `icp_score`
- P4 → calcula `diferencial_score`
- P6 → extrai `canal_testado[]` com flag "já tentado"

### 3. `gerar-plano-gtm`
Recebe o diagnóstico completo e gera:
- `canais_recomendados` com justificativa
- `canais_bloqueados` com motivo
- `plano_90_dias` semana a semana
- `metricas_acompanhamento` com metas numéricas

### 4. `calcular-desvio`
Recebe resultado semanal e retorna:
- `status` do plano
- `causa_desvio` identificada
- Texto de correção sugerida

---

## Automações n8n

### Workflow 1: Loop de feedback — dia 7
- Trigger: `diagnostico.created_at` + 7 dias
- Condição: `status_plano != null` (módulo 2 foi concluído)
- Ação: Resend → e-mail touchpoint dia 7

### Workflow 2: Loop de feedback — dia 30
- Trigger: `diagnostico.created_at` + 30 dias
- Ação: Resend → e-mail com link para registro de resultado

### Workflow 3: Loop de feedback — dia 60
- Trigger: `diagnostico.created_at` + 60 dias
- Ação: Resend → e-mail com link para resultado final + novo score

### Workflow 4: Alerta de desvio — semana 4
- Trigger: `resultado_semanal.semana == 4`
- Condição: `resultado_real < threshold_alerta`
- Ação: Resend → e-mail de alerta + diagnóstico de causa

---

## Decisões técnicas críticas

1. **Tipar o objeto de diagnóstico desde o dia 1** — um type centralizado importado por todos os módulos
2. **Regras de negócio fora do código** — arquivo de configuração editável, não if/else hardcoded
3. **Versionar os prompts da IA** — prompts têm controle de versão e testes automatizados
4. **Tabela de CAC editável sem deploy** — via painel do Supabase, não hardcoded
5. **Não otimizar antes de ter usuários** — sem cache, filas ou microserviços no MVP

---

## Fases de desenvolvimento

| Fase | O que constrói | Tempo estimado |
|------|---------------|----------------|
| 1 | Setup Supabase — tabelas e autenticação | 1 semana |
| 2 | Módulo 1 no Lovable | 2–3 semanas |
| 3 | Edge Functions — score + IA | 1–2 semanas |
| 4 | Módulo 2 no Lovable | 2 semanas |
| 5 | Módulo 3 + automações n8n | 2 semanas |
| 6 | Beta fechado — 10 a 20 usuários | 2 semanas |

**Total estimado: 6 a 8 semanas**
