# Lastro — Produto Completo

## Origem

Nasceu da ML Creation Studio após anos de agência identificando o mesmo padrão repetido: desalinhamento entre budget, expectativa e o que é matematicamente possível. A trava era sempre "budget vs resultado" — e acontecia DEPOIS de semanas de trabalho investido. O Lastro resolve ANTES.

---

## Os 4 pilares inegociáveis

1. Realmente agregador ao mercado
2. Posicionamento defensável
3. Dor real do cliente
4. Não é uma feature de algo maior

---

## Os 3 módulos

### Módulo 1 — Diagnóstico de viabilidade

**9 perguntas em 3 blocos:**

**Bloco A — O produto**
1. O que você vende e qual problema resolve?
2. Quem é seu cliente hoje — descreva a pessoa que mais compra de você.
3. Qual é o ticket médio e como o cliente paga? (único / recorrente / parcelado)

**Bloco B — O mercado**
4. Quem são seus 3 principais concorrentes e por que o cliente escolheria você?
5. Em qual região ou segmento quer crescer nos próximos 90 dias?
6. Já tentou alguma ação de marketing? O que funcionou e o que não funcionou?

**Bloco C — Budget e expectativa**
7. Quanto pode investir por mês em marketing (ferramenta + mídia + produção)?
8. Quantos clientes novos precisa fechar por mês para considerar bem-sucedido?
9. Em quanto tempo espera ver os primeiros resultados?

**4 outputs do módulo 1:**
- Output 1: Lastro Score (0–100)
- Output 2: Relatório de viabilidade em texto
- Output 3: Plano de ação ajustado à realidade
- Output 4: Alerta de desalinhamento (score < 40)

---

### Lastro Score — Fórmula

```
Lastro Score =
  Viabilidade financeira × 0,40
+ Clareza de ICP × 0,25
+ Alinhamento de prazo × 0,20
+ Maturidade de mercado × 0,15
```

**Zonas:**
- 0–39: Crítico — módulo 2 BLOQUEADO
- 40–59: Ajuste necessário
- 60–79: Viável com ressalvas
- 80–100: Pronto para executar

**Campo calculado automaticamente:**
- `budget_midia = budget_total × 0,56` (nunca digitado pelo usuário)

---

### Módulo 2 — Mapa de GTM

**Regra de acesso:** Score abaixo de 40 bloqueia o módulo 2.

**Uma pergunta nova:** "Você já tem clientes pagando?" (muda todo o mapa de canais)

**Regras de seleção de canais:**
- `budget_midia < R$600` → bloqueia tráfego pago
- `budget / CAC < 3` → bloqueia mesmo com budget suficiente
- `score_icp < 40` → bloqueia todos os canais pagos
- `prazo == 30 dias` → bloqueia orgânico e SEO
- `ticket < R$200` → bloqueia LinkedIn e outbound alto esforço
- `modelo == recorrente` → ativa lógica SaaS (MRR, LTV, churn)
- `clientes_pagando == false` → bloqueia anúncios, começa por indicação

**Prioridade de canais:**
1. Indicação estruturada — sempre, custo zero
2. Conteúdo orgânico — budget < R$800 ou prazo > 60 dias
2. Outbound direto — B2B, ticket > R$500, ICP específico
3. Meta Ads — B2C, budget > R$600, CAC viável, 45+ dias
3. Google Ads — demanda ativa no nicho, ticket > R$200
4. LinkedIn Ads — B2B enterprise, ticket > R$2.000

**Plano de 90 dias:**
- Semana 1–2: Fundação (zero mídia)
- Semana 3–4: Primeiro canal (aprender, não escalar)
- Semana 5–8: Validação e ajuste
- Semana 9–12: Escala seletiva

**Regra de ouro:** Nunca dois canais ao mesmo tempo no início.

**4 outputs do módulo 2:**
- Ranking de canais com justificativa
- Plano de 90 dias executável
- 3 métricas de acompanhamento com metas
- Sinal de alerta automático na semana 4

---

### Módulo 3 — Tracker de resultado vs expectativa

**Princípio:** Avalia o plano, não o usuário.

**3 métricas acompanhadas:**
1. Investimento real (usuário preenche / Meta API na v2)
2. Resultado principal — leads, trials, vendas (usuário / Meta API parcial)
3. CAC real emergente — calculado automaticamente

**3 status do plano:**
- No prazo: 80–120% da meta → confirma e avança
- Atenção: 40–79% → pergunta diagnóstica
- Revisão: < 40% → diagnóstico de causa + correção

**4 causas de desvio:**
1. Canal errado — CPL alto + cliques baixos → testar canal alternativo
2. Mensagem errada — cliques ok + conversão baixa → revisar copy
3. ICP errado — leads chegam + não convertem → revisar segmentação
4. Diagnóstico otimista — CAC real acima em todos canais → recalibrar score

**4 outputs do módulo 3:**
- Painel de acompanhamento semanal
- Diagnóstico de causa quando status = revisão
- Lastro Score atualizado ao fim do ciclo
- Contribuição ao banco de CAC proprietário

**Integração Meta Ads:**
- v1 (MVP): coleta manual — 3 campos, 1x/semana
- v2: Meta API automática (investimento + CPL + leads)
- v3: Meta + Google + LinkedIn — painel unificado
- Conversão final SEMPRE manual — é o dado mais valioso

---

### Loop de feedback

**4 touchpoints:**
- Dia 0: Âncora criada (automático, invisível)
- Dia 7: "Campanha foi ao ar?" — 1 pergunta, 1 clique
- Dia 30: Valor investido + leads + fechamentos — 3 campos
- Dia 60: CAC real + canal + diagnóstico preciso? — 5 campos → novo score

**3 mecanismos de incentivo:**
1. Reciprocidade — diagnóstico atualizado em troca da resposta
2. Pertencimento — "seus dados ajudam outros do mesmo nicho"
3. Novo diagnóstico — quem responde recebe score atualizado

**Princípio:** Entrega primeiro, coleta depois. Nunca parece pesquisa.

---

### Dado proprietário — o moat

4 tipos de dado que se acumulam:
1. Experimentos reais de GTM por nicho + canal + budget
2. Padrões de ICP por segmento e estágio
3. Histórico longitudinal de cada produto
4. Benchmarks reais de CAC por nicho — inexistentes hoje no Brasil

**Flywheel:**
Founder usa → registra resultado → produto aprende → score mais preciso → mais valor → mais founders usam

---

## Modelo de preço

### B2C (consumidor direto)
| Plano | Preço | Limite | Gatilho |
|-------|-------|--------|---------|
| Grátis | R$0 | 1 diagnóstico · só módulo 1 | módulo 2 bloqueado |
| Base | R$49/mês | 3 diagnósticos · módulos 1+2+3 | — |
| Completo | R$99/mês | Ilimitado + histórico + PDF | founders com múltiplos produtos |

### B2B (agências)
| Plano | Preço | Inclui |
|-------|-------|--------|
| Agência | R$297/mês (até 10 clientes) | White-label + painel de clientes + PDF com logo da agência |
| Por cliente adicional | R$25/cliente/mês | — |

**Gatilho de conversão:** módulo 2 bloqueado no free
**Não fazer:** trial de 14 dias, desconto anual antes de validar retenção

### Projeção MRR conservadora
- Mês 6: R$2.710
- Mês 12: R$8.365
- Mês 18: R$21.680
