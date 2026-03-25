# Lastro — Documento Completo do Produto

**Empresa:** ML Creation Studio  
**Versão:** 3.0 · Março 2026  
**Categoria:** Plataforma SaaS de diagnóstico e direção estratégica de marketing  
**Mercado:** Brasil — PMEs, founders, agências de marketing  

---

> *"Marketing com base real."*

---

## Sumário

1. [Origem e problema](#1-origem-e-problema)
2. [Posicionamento e marca](#2-posicionamento-e-marca)
3. [Visão geral do produto](#3-visão-geral-do-produto)
4. [Módulo 1 — Diagnóstico de viabilidade](#4-módulo-1--diagnóstico-de-viabilidade)
5. [Módulo 2 — Mapa de GTM](#5-módulo-2--mapa-de-gtm)
6. [Módulo 3 — Tracker de resultado](#6-módulo-3--tracker-de-resultado)
7. [Fase 2 — Direção estratégica e criativa](#7-fase-2--direção-estratégica-e-criativa)
8. [Fase 3 — Inteligência e especialização](#8-fase-3--inteligência-e-especialização)
9. [O Lastro Score](#9-o-lastro-score)
10. [Fluxo de dados entre módulos](#10-fluxo-de-dados-entre-módulos)
11. [Loop de feedback e dado proprietário](#11-loop-de-feedback-e-dado-proprietário)
12. [UX e experiência cinematográfica](#12-ux-e-experiência-cinematográfica)
13. [Arquitetura técnica](#13-arquitetura-técnica)
14. [Tabela de CAC por nicho](#14-tabela-de-cac-por-nicho)
15. [Mercado e oportunidade](#15-mercado-e-oportunidade)
16. [Modelo de preço](#16-modelo-de-preço)
17. [Riscos e mitigações](#17-riscos-e-mitigações)

---

## 1. Origem e problema

O Lastro nasceu de um padrão que se repetia em praticamente todos os clientes da ML Creation Studio durante anos de operação como agência: o desalinhamento entre budget, expectativa de resultado e o que é matematicamente possível.

O fluxo da agência era estruturado — onboarding, alinhamento de expectativas, branding, pesquisa, campanha, social. Mas o ponto de trava era sempre o mesmo: **budget versus resultado**. Um cliente imobiliário com R$200 por mês querendo fechar R$7 milhões. A conversa difícil acontecia depois de semanas de trabalho investido — quando deveria ter acontecido antes de qualquer compromisso.

**O problema central não era execução de marketing. Era ausência de diagnóstico de viabilidade antes do compromisso.**

### Os 4 pilares inegociáveis do produto

1. **Realmente agregador ao mercado** — resolve a causa raiz de 42% das falhas de startups
2. **Posicionamento defensável** — experiência de produto e dado proprietário como barreira
3. **Dor real e frequente** — vivida e documentada em anos de agência
4. **Não é uma feature** — categoria nova, não funcionalidade adicionada a algo maior

---

## 2. Posicionamento e marca

### Identidade central

| Elemento | Definição |
|----------|-----------|
| **Nome** | Lastro |
| **Origem do nome** | Lastro é o peso que estabiliza um navio. Sem lastro, vira. Com lastro, segue firme. |
| **Tagline** | Marketing com base real. |
| **Promessa** | Descubra o que é possível antes de investir um centavo. |
| **Contra o mercado** | Enquanto todos prometem resultado, o Lastro promete clareza. |
| **Posicionamento** | O único produto que pensa o marketing inteiro antes de qualquer humano executar. |

### Tom de voz — 4 princípios

**Honesto antes de otimista**
- ❌ "Turbine seus resultados com IA!"
- ✅ "Seu orçamento permite 3 leads por mês nesse nicho. Quer saber o que fazer com isso?"

**Direto sem ser frio**
- ❌ "Infelizmente seu budget está abaixo do mínimo recomendado."
- ✅ "Com R$300 por mês, o caminho mais inteligente não é anúncio. É esse aqui."

**Concreto, nunca vago**
- ❌ "Otimize sua estratégia de marketing com dados relevantes."
- ✅ "No seu nicho, o CAC médio é R$180. Você tem R$500. Dá para 2 clientes — se o funil estiver certo."

**Respeita a inteligência do usuário**
- ❌ "Parabéns! Você deu o primeiro passo rumo ao sucesso!"
- ✅ "Diagnóstico pronto. Aqui está o que os números dizem."

### O que o Lastro nunca faz
- Não promete resultado — promete clareza
- Não usa jargão de marketing (funil quente, growth hacking)
- Não exagera (revolucionário, disruptivo, o melhor do Brasil)
- Não celebra artificialmente
- Não tem trial de 14 dias — urgência artificial quebra confiança

### Identidade visual

| Elemento | Valor |
|----------|-------|
| Background | `#080f0c` — quase preto com temperatura verde fria |
| Cor principal | `#1D9E75` — teal |
| Texto principal | `#f0f5f2` — branco frio |
| Texto secundário | `rgba(232,240,235,0.45)` |
| Tipografia títulos | DM Serif Display — serif, incomum em produto digital |
| Tipografia corpo | Inter — leitura fácil, acessível |
| Filosofia visual | Zero UI cinematográfico — a interface some, o conteúdo permanece |

---

## 3. Visão geral do produto

O Lastro é sustentado por um único objeto de dados — o "diagnóstico do negócio" — que é criado no módulo 1, enriquecido nos módulos seguintes e monitorado no módulo 3. **O usuário nunca repete informação.** Cada módulo lê o que precisa e escreve o que produziu.

### Os 13 módulos em 3 fases

| Fase | Módulos | Camada | Status |
|------|---------|--------|--------|
| **1 — MVP** | M1, M2, M3 | Diagnóstico + GTM + Tracker | Em construção |
| **2 — Direção** | M4–M9 | Arte · Web · Executivo · Social · Gravações · Copy | Planejado |
| **3 — Inteligência** | M10–M13 | Tráfego · Funil · Lançamento · Mercado | Planejado |

### O posicionamento que emerge

Com 13 módulos, o Lastro entrega o que um CMO sênior entregaria — em minutos, por uma fração do custo. Não é agência. Não é ferramenta. É o diretor de marketing que qualquer negócio deveria ter — mas que 99% não pode contratar.

---

## 4. Módulo 1 — Diagnóstico de viabilidade

O módulo central do Lastro. Não tem perguntas fixas — tem **9 tópicos com conversa adaptativa via IA**.

### Conceito de tópico adaptativo

Cada tópico começa com uma pergunta inicial. Após cada resposta, a IA avalia se extraiu o dado necessário. Se sim: avança. Se não: faz uma pergunta complementar dentro do mesmo tópico. O usuário nunca fica preso — máximo de complementares por tópico definido.

O indicador "X de 9" mostra o **tópico atual**, não o número de mensagens trocadas.

### Os 9 tópicos e seus dados obrigatórios

| # | Tópico | Dados extraídos pela IA | Máx. complementares |
|---|--------|------------------------|---------------------|
| 1 | O produto | `nicho` · `subnicho` · `categoria` · `modelo_negocio` | 2 |
| 2 | O cliente (ICP) | `icp_desc` · `icp_score` · `tem_demografico` · `tem_dor` | 2 |
| 3 | Ticket e modelo | `ticket_medio` · `modelo_cobranca` | 1 |
| 4 | Concorrentes e diferencial | `concorrentes_desc` · `diferencial_score` | 2 |
| 5 | Foco geográfico | `regiao` · `segmento_foco` | 1 |
| 6 | Histórico de marketing | `historico_marketing` · `canais_testados` · `tem_historico` | 1 |
| 7 | Budget | `budget_total` · `budget_midia` (calculado: × 0,56) | 1 |
| 8 | Meta de resultado | `meta_clientes` | 1 |
| 9 | Prazo esperado | `prazo_esperado` (mapeado para 30/60/90/180 dias) | 1 |

### Regra do limite de complementares

Se após o limite de complementares o dado ainda estiver insuficiente, a IA avança com o melhor dado disponível e registra o campo com `confianca: baixa` no banco. O score reflete isso — mas o usuário não fica preso num loop.

### Os 4 outputs do módulo 1

1. **Lastro Score** (0–100) com zona de diagnóstico
2. **Relatório de viabilidade** em texto gerado pela IA
3. **Plano de ação** ajustado à realidade do negócio
4. **Alerta de desalinhamento** quando score < 40

---

## 5. Módulo 2 — Mapa de GTM

### Princípio central

O módulo 2 não recomenda o ideal — **recomenda o possível**. Um plano ideal com budget errado é promessa falsa. Um plano possível com budget real é estratégia.

**Regra de acesso:** Score abaixo de 40 bloqueia o módulo 2. Não faz sentido recomendar GTM sem viabilidade mínima.

### A única pergunta nova

*"Você já tem clientes pagando?"* — essa resposta muda completamente o mapa de canais. Negócio sem cliente não deve estar em anúncio pago. Com clientes, pode escalar.

### Regras de seleção de canais

```
budget_midia < R$600          → bloqueia tráfego pago
budget / CAC < 3              → bloqueia mesmo com budget suficiente
icp_score < 40                → bloqueia todos os canais pagos
prazo_esperado == 30 dias     → bloqueia orgânico e SEO
ticket_medio < R$200          → bloqueia LinkedIn e outbound alto esforço
modelo_cobranca == recorrente → ativa lógica SaaS (MRR, LTV, churn)
clientes_pagando == false     → bloqueia anúncios, começa por indicação
```

### Prioridade de canais

| Prioridade | Canal | Quando entra | Budget mínimo de mídia |
|-----------|-------|-------------|----------------------|
| 1 | Indicação estruturada | Sempre — custo zero | R$0 |
| 2 | Conteúdo orgânico | Budget < R$800 ou prazo > 60 dias | R$0 |
| 2 | Outbound direto | B2B, ticket > R$500, ICP específico | R$0 |
| 3 | Meta Ads | B2C, budget > R$600, CAC viável, 45+ dias | R$600/mês |
| 3 | Google Ads | Demanda ativa no nicho, ticket > R$200 | R$800/mês |
| 4 | LinkedIn Ads | B2B enterprise, ticket > R$2.000 | R$3.000/mês |

**Regra de ouro:** Nunca dois canais ao mesmo tempo no início.

### Plano de 90 dias

| Período | Foco | O que acontece |
|---------|------|---------------|
| Semana 1–2 | Fundação | Zero mídia — perfis, processo de indicação, proposta revisada |
| Semana 3–4 | Primeiro canal | Orçamento mínimo — objetivo: aprender, não escalar |
| Semana 5–8 | Validação | Ajustar mensagem com dados reais |
| Semana 9–12 | Escala seletiva | Dobrar no que funcionou — segundo canal só com resultado |

### Os 4 outputs do módulo 2

1. Ranking de canais com justificativa
2. Plano de 90 dias executável semana a semana
3. 3 métricas de acompanhamento com metas numéricas
4. Sinal de alerta automático na semana 4 (< 40% da meta)

---

## 6. Módulo 3 — Tracker de resultado vs expectativa

### Princípio central

O módulo 3 não avalia o usuário — **avalia o plano**. Se o resultado está abaixo da meta, o produto identifica qual das 4 causas está falhando e propõe a correção específica. Nunca diz "você errou". Diz "o plano precisa de ajuste aqui."

### As 3 métricas acompanhadas

| Métrica | O que mede | Origem |
|---------|-----------|--------|
| Investimento real | Quanto foi gasto em mídia e produção | Usuário (Meta API na v2) |
| Resultado principal | Leads, trials, agendamentos ou vendas | Usuário (Meta API parcial) |
| CAC real emergente | Investimento ÷ resultado | Calculado automaticamente |

### Os 3 status do plano

| Status | Condição | O que o produto faz |
|--------|---------|-------------------|
| **No prazo** | 80–120% da meta | Confirma e avança |
| **Atenção** | 40–79% da meta | Pergunta diagnóstica |
| **Revisão** | < 40% da meta | Diagnóstico de causa + correção |

### As 4 causas de desvio

| # | Causa | Sinal no dado | Correção |
|---|-------|---------------|---------|
| 1 | Canal errado | CPL alto + cliques baixos | Testar canal alternativo |
| 2 | Mensagem errada | Cliques ok + conversão baixa | Revisar copy antes de aumentar budget |
| 3 | ICP errado | Leads chegam + não convertem | Revisar segmentação |
| 4 | Diagnóstico otimista | CAC real acima em todos os canais | Recalibrar score com dado real |

### Roadmap de integração Meta Ads

| Versão | Coleta | Racional |
|--------|--------|---------|
| v1 — MVP | Manual — 3 campos, 1x/semana | Valida comportamento antes de automatizar |
| v2 | Meta API: investimento + CPL automático. Conversão: manual | Reduz fricção identificada no MVP |
| v3 | Meta + Google + LinkedIn — painel unificado | Hub de resultado independente de canal |

**Nota:** Conversão final SEMPRE manual — é o dado mais valioso do flywheel.

---

## 7. Fase 2 — Direção estratégica e criativa (M4–M9)

Todos os módulos da fase 2 dependem do M1 completo. A profundidade do output é proporcional à qualidade do diagnóstico.

### Módulo 4 — Direção de Arte
Gera direção visual completa: paleta com justificativa estratégica, tipografia, mood board em texto, referências de estética, o que NUNCA fazer visualmente.  
**Entrega para:** Designer gráfico ou social media

### Módulo 5 — Direção de Webdesign
Wireframe textual de landing pages e sites: estrutura de seções, copy de cada bloco, hierarquia, CTAs com texto exato, meta de conversão por seção.  
**Entrega para:** Webdesigner ou desenvolvedor no-code

### Módulo 6 — Direção Executiva (CEO/CFO/CMO)
Traduz o diagnóstico para linguagem de negócio: projeção de ROI, risco do não-investimento, plano de 90 dias em linguagem C-level, métricas que o board entende.  
**Entrega para:** CEO/CFO/CMO para aprovação de budget

### Módulo 7 — Direção de Social Media
Estratégia completa de conteúdo: pilares editoriais, calendário 30 dias, frequência, formato por plataforma, tom de voz por rede, métricas por pilar.  
**Entrega para:** Social media manager ou gestor de conteúdo

### Módulo 8 — Estratégia e Direção de Gravações
Lista priorizada de vídeos e fotos: gancho de abertura, narrativa, CTA, duração ideal por plataforma, especificações técnicas.  
**Entrega para:** Produtor de conteúdo, videomaker ou o próprio dono

### Módulo 9 — Direção de Copy e Narrativa de Marca
Voz da marca executável: tagline, headline principal, pitch de 30s e 2min, copy de anúncios por canal, e-mail de prospecção, bio por rede.  
**Entrega para:** Copywriter, gestor de tráfego ou o próprio dono

---

## 8. Fase 3 — Inteligência e especialização (M10–M13)

### Módulo 10 — Direção de Tráfego Pago
Estrutura de campanha, públicos por prioridade, copy de cada anúncio, budget por conjunto, critérios de escala e reprovação.  
**Entrega para:** Gestor de tráfego pago

### Módulo 11 — Diagnóstico de Funil e Conversão
Mapa do funil com taxas reais, gargalo identificado, custo do gargalo em reais/mês, plano de correção por etapa.  
**Conexão natural:** ChurnDefense (retenção)

### Módulo 12 — Direção de Lançamento
Plano completo de lançamento: pré-aquecimento, abertura, sequência de conteúdos, urgência legítima, sequência de e-mails e mensagens, plano B.  
**Entrega para:** Dono do negócio ou produtor de lançamento

### Módulo 13 — Relatório de Inteligência de Mercado
Com dados agregados de todos os usuários do mesmo nicho: o que está funcionando, o que parou, tendências de CAC, canais emergentes.  
**Nota:** Depende de volume mínimo de usuários (500+). É o módulo que transforma dado proprietário em produto de assinatura premium.

### Mapa de dependências entre módulos

```
M2  depende de: M1 completo + score ≥ 40
M3  depende de: M2 concluído
M4  depende de: M1 completo (nicho + ICP + diferencial)
M5  depende de: M1 + M4
M6  depende de: M1 + M2
M7  depende de: M1 + M2
M8  depende de: M1 + M7
M9  depende de: M1
M10 depende de: M1 + M2 + M9
M11 depende de: M1 + M3
M12 depende de: M1 + M2 + M9
M13 depende de: dados agregados de múltiplos usuários
```

---

## 9. O Lastro Score

### Fórmula

```
Lastro Score =
  Viabilidade financeira  × 0,40
+ Clareza de ICP          × 0,25
+ Alinhamento de prazo    × 0,20
+ Maturidade de mercado   × 0,15
```

### As 4 dimensões

| Dimensão | Peso | O que mede | Como é calculada |
|----------|------|-----------|-----------------|
| Viabilidade financeira | 40% | Budget cobre o CAC estimado para a meta? | `budget_midia / cac_min` → pontuação por faixas de ciclos |
| Clareza de ICP | 25% | O cliente sabe com precisão quem compra dele? | IA avalia especificidade da descrição (0–100) |
| Alinhamento de prazo | 20% | O prazo esperado é compatível com o canal? | Cruza `prazo_esperado` com `ciclo_min_dias` do benchmark |
| Maturidade de mercado | 15% | O produto tem diferencial claro da concorrência? | IA avalia qualidade do diferencial (0–100) |

### Zonas de diagnóstico

| Score | Zona | Ação do produto |
|-------|------|----------------|
| 0–39 | **Crítico** | Módulo 2 bloqueado — diagnóstico de ajuste obrigatório |
| 40–59 | **Ajuste necessário** | Acesso ao M2 com alertas específicos |
| 60–79 | **Viável com ressalvas** | Acesso ao M2 com 1 ponto de atenção |
| 80–100 | **Pronto para executar** | Acesso completo ao M2 |

### Campo calculado automaticamente

```
budget_midia = budget_total × 0,56
```
Desconta ferramenta (24%) e produção (20%). **Nunca digitado pelo usuário.**

---

## 10. Fluxo de dados entre módulos

Um único objeto de diagnóstico percorre os 3 módulos. O usuário nunca repete informação.

### Campos gerados pelo M1 — consumidos pelo M2

```typescript
budget_midia: number          // 56% do budget total — calculado
cac_estimado: number          // lookup na tabela cac_benchmark
nicho: string                 // extraído pela IA
subnicho: string              // extraído pela IA
icp_score: number             // 0–100 — calculado pela IA
diferencial_score: number     // 0–100 — calculado pela IA
ticket_medio: number
modelo_cobranca: enum         // unico | recorrente | parcelado
prazo_esperado: enum          // 30 | 60 | 90 | 180
historico_marketing: string   // com flag de canais já tentados
lastro_score: number          // 0–100
zona: enum                    // critico | ajuste | ressalvas | pronto
```

### Campos gerados pelo M2 — consumidos pelo M3

```typescript
canais_recomendados: Canal[]  // [{nome, prioridade, justificativa, budget}]
plano_90_dias: Semana[]       // [{numero, foco, acoes[], marco}]
metricas_acompanhamento: Metrica[]
threshold_alerta: number      // 40% da meta na semana 4
```

### Campos gerados pelo M3 — retroalimentam o sistema

```typescript
cac_real: number              // atualiza tabela de benchmarks proprietários
status_plano: enum            // no_prazo | atencao | revisao
lastro_score_atualizado: number
```

---

## 11. Loop de feedback e dado proprietário

### Os 4 touchpoints

| Momento | Touchpoint | O que coleta | Fricção |
|---------|-----------|--------------|---------|
| Dia 0 | Âncora criada | Registro automático | Zero |
| Dia 7 | Check-in de lançamento | "Campanha foi ao ar?" — 1 clique | Mínima |
| Dia 30 | Resultado parcial | Investido · leads · fechamentos | Baixa |
| Dia 60 | Resultado final | CAC real · canal · diagnóstico preciso? | Média |

**Princípio:** Entrega primeiro, coleta depois. Nunca parece pesquisa.

### Os 3 mecanismos de incentivo

1. **Reciprocidade** — diagnóstico atualizado em troca da resposta
2. **Pertencimento** — "seus dados ajudam outros do mesmo nicho"
3. **Novo diagnóstico** — quem responde recebe score atualizado

### O dado proprietário — o moat

| Dado | Por que é incopiável |
|------|---------------------|
| Experimentos reais de GTM | Canal + mensagem + conversão por nicho e budget no Brasil |
| Padrões de ICP por segmento | Qual ICP converte mais rápido por tipo de produto |
| Histórico longitudinal | Pivots de posicionamento, troca de canal — contexto que nenhuma IA genérica tem |
| Benchmarks reais de CAC | Único dado de CAC real do mercado brasileiro sistematizado |

**Flywheel:**  
Usuário usa → resultado registrado → benchmark calibrado → score mais preciso → mais valor → mais usuários

---

## 12. UX e experiência cinematográfica

### Filosofia: Zero UI Cinematográfico

O produto some. O usuário não vê interface — vive uma experiência. Cada elemento de UI que não serve o conteúdo é removido.

**Inspiração:** 21st.dev — dark mode sofisticado, micro-animações precisas, componentes com profundidade sem barulho visual.

### Dispositivo

Desktop primeiro — web app responsivo como objetivo futuro.

### Princípios de navegação

1. A conversa flui para frente — sem botão "voltar" no módulo 1
2. Uma coisa por vez — nunca duas perguntas na mesma tela
3. O produto some — nenhum elemento de UI compete com o conteúdo
4. O progresso é discreto — barra de 2px e contador "X de 9" no canto
5. O resultado é um momento — score animado, não exibido estaticamente
6. O tracker é o lar — a tela mais refinada do produto

### Fluxo de telas — módulo 1

| Tela | Descrição |
|------|-----------|
| Entrada | Fundo `#080f0c` · logo `Lastro.` centralizado · tagline · CTA |
| Cadastro/Login | Campo de e-mail · botão Google · sem formulário longo |
| Conversa (tópicos 1–9) | Pergunta aparece letra por letra · cursor piscando · resposta em teal |
| Processando | Frases animadas sequenciais · sem spinner |
| Resultado — Score | Número cresce de 0 ao valor real em 1,5s · frase por zona · barras das 4 dimensões |

### Comportamento da conversa adaptativa

- Pergunta aparece caractere por caractere (20ms para curtas, 14ms para longas)
- Cursor `|` em `#1D9E75` pisca no final durante digitação
- Loading `· · ·` pulsando enquanto a IA processa a resposta
- Input desabilitado durante processamento
- Pergunta complementar aparece com o mesmo efeito — indistinguível para o usuário
- Indicador "X de 9" não muda em perguntas complementares

---

## 13. Arquitetura técnica

### Stack de desenvolvimento

| Camada | Tecnologia | Papel |
|--------|-----------|-------|
| Construção | Lovable | Geração de código por prompt — sem dev humano no MVP |
| Banco de dados | Supabase (PostgreSQL) | Nativo com Lovable, gerenciado, painel visual |
| Autenticação | Supabase Auth | E-mail + Google |
| Lógica server-side | Supabase Edge Functions | TypeScript, deploy pelo painel |
| IA do produto | Anthropic API (Claude Sonnet) | Processa respostas abertas, extrai dados estruturados |
| Automação | n8n | Workflows do loop de feedback sem código |
| E-mails | Resend | Touchpoints dos dias 7, 30 e 60 |
| Agente de dev | Claude / ChatGPT | Co-desenvolvimento de Edge Functions e debug |

### Modelo de dados central

**Tabela `diagnostico`** — objeto único que percorre os 3 módulos:

```
id, user_id, etapa_atual
produto_desc, icp_desc, ticket_medio, modelo_cobranca
concorrentes_desc, foco_geografico, historico_marketing
budget_total, meta_clientes, prazo_esperado
budget_midia (calculado), nicho, subnicho, categoria
icp_score, diferencial_score, cac_estimado
lastro_score, zona
clientes_pagando, canais_recomendados (jsonb), plano_90_dias (jsonb)
status_plano, cac_real, lastro_score_atualizado
canais_testados (jsonb), tem_historico
created_at, updated_at
```

**Tabela `cac_benchmark`** — editável via painel Supabase sem deploy:
```
nicho, subnicho, cpl_min, cpl_max, cac_min, cac_max
canal_principal (array), ciclo_min_dias, ciclo_max_dias, confianca
```

**Tabela `resultado_semanal`** — módulo 3:
```
diagnostico_id, semana, investimento_real, resultado_real
cac_emergente (calculado), status, causa_desvio
```

### Processamento da IA — como funciona

A Anthropic API é chamada para processar as respostas abertas dos tópicos 1, 2, 4 e 6. Cada chamada retorna JSON estruturado com os dados extraídos e um campo `suficiente: boolean`. Se `false` e o limite de complementares não foi atingido, o produto faz uma pergunta complementar específica gerada pela própria IA.

**Fallback seguro:** se a API falhar, o produto avança sem bloquear o usuário.

### Roadmap de integração Meta Ads

- **v1 (MVP):** coleta manual — 3 campos, 1x/semana
- **v2:** Meta API automática — investimento + CPL. Conversão final: sempre manual
- **v3:** Google Ads + LinkedIn — painel unificado

### Decisões técnicas críticas

1. Objeto de diagnóstico tipado em TypeScript — importado por todos os módulos
2. Regras de negócio em arquivo de configuração — não hardcoded em if/else
3. Prompts da IA versionados — nunca sobrescrever, sempre nova versão
4. Tabela de CAC editável sem deploy — via painel Supabase
5. Sem otimização prematura — sem cache, filas ou microserviços no MVP

---

## 14. Tabela de CAC por nicho

**Fonte:** Memória da ML Creation Studio + benchmarks BR ajustados  
**Ajuste 2026:** +12,15% sobre Meta Ads (imposto repassado desde janeiro/2026)

| Nicho | Subnicho | CPL estimado | CAC estimado | Canal principal | Ciclo médio | Confiança |
|-------|----------|-------------|-------------|----------------|-------------|-----------|
| Imobiliária | Geral | R$80–R$350 | R$1.500–R$8.000 | Meta · Google · portais | 30–90 dias | Alta |
| Imobiliária | Alto padrão | R$150–R$600 | R$3.000–R$15.000 | Google · portais premium | 60–180 dias | Média |
| Clínica médica | Geral | R$25–R$90 | R$80–R$400 | Meta · Google | 7–21 dias | Alta |
| Clínica médica | Estética médica | R$50–R$180 | R$200–R$800 | Meta | 7–30 dias | Alta |
| Clínica odontológica | Geral | R$30–R$80 | R$100–R$300 | Meta · Google | 7–21 dias | Alta |
| Clínica odontológica | Estética dental | R$60–R$200 | R$300–R$1.200 | Meta | 14–45 dias | Alta |
| Crédito consignado | Servidor/INSS | R$15–R$60 | R$60–R$250 | Meta · WhatsApp | 1–7 dias | Alta |
| Academia | Convencional | R$10–R$40 | R$30–R$120 | Meta · orgânico local | 1–14 dias | Alta |
| Studio fitness | High ticket | R$40–R$150 | R$150–R$600 | Meta · indicação | 7–21 dias | Alta |
| E-commerce | Geral | R$8–R$45 | R$25–R$120 | Meta · Google Shopping | 1–3 dias | Média |
| E-commerce | Nicho específico | R$12–R$60 | R$35–R$180 | Meta | 1–7 dias | Média |
| Perfumaria | Geral | R$6–R$25 | R$18–R$80 | Meta · influencer | 1–7 dias | Média |
| Agência de marketing | B2B | R$60–R$200 | R$400–R$2.000 | Indicação · LinkedIn | 30–90 dias | Alta |
| Infoproduto | Geral | R$5–R$30 | R$15–R$90 | Meta · YouTube | 1–3 dias | Média |
| Infoproduto | Premium | R$15–R$60 | R$40–R$180 | Meta · e-mail | 1–7 dias | Média |

### Insights críticos da tabela

**Maior armadilha:** Imobiliária com budget pequeno. CAC de R$1.500–R$8.000 com R$500/mês é matematicamente impossível.

**Melhor relação CAC/ticket:** Crédito consignado. Ciclo curto, CAC baixo, comissão alta.

**Maior variação interna:** Odontologia. Geral (CAC ~R$200) vs estética dental (CAC ~R$800) — 4x de diferença. A IA identifica o subnicho na resposta do tópico 1.

**Canal mais subestimado:** Indicação. Studio fitness, agência, odonto estética — todos têm indicação como canal de menor CAC. O M2 sempre recomenda indicação antes de qualquer anúncio para serviços com ticket > R$500.

---

## 15. Mercado e oportunidade

### O gap central

**Nenhum produto responde a pergunta:** "O que é possível alcançar com o meu budget e a minha meta antes de eu investir?"

Toda ferramenta de marketing no Brasil nasceu de execução — e-mail, anúncio, social. Nenhuma nasceu do diagnóstico de viabilidade.

### Números do mercado

- 6,2 milhões de PMEs ativas no Brasil
- 96% das empresas abertas em 2024 eram MEI
- 42% das startups falham por "sem mercado" — dor resolvível com GTM bem feito
- Aumento de 12,15% no custo dos anúncios Meta em 2026

### Concorrentes diretos — e por que não competem

| Ferramenta | O que faz | Por que não compete |
|------------|-----------|---------------------|
| RD Station | E-mail + CRM | Nasceu do e-mail, não do diagnóstico |
| HubSpot | CRM enterprise | Caro, complexo, para times grandes |
| Metricool / mLabs | Analytics social | Métricas, não viabilidade |
| Agências de marketing | Serviço humano | Caro, não escala, mesmo problema de expectativa |

### O moat em 3 horizontes

**Curto prazo:** Conhecimento do mercado brasileiro codificado em produto + tom de voz honesto (contraintuitivo no mercado de marketing)

**Médio prazo:** Tabela de CAC proprietária com dados reais brasileiros + histórico de experimentos de GTM por nicho

**Longo prazo:** Dado longitudinal (evolução de cada negócio no tempo) + relatório público trimestral que gera autoridade e distribuição orgânica

---

## 16. Modelo de preço

### Lógica central

**O modelo vende profundidade de direção — não quantidade de diagnósticos.**

Um negócio no plano Direção não está comprando "diagnóstico ilimitado". Está comprando o briefing que um CMO sênior levaria semanas para produzir.

### Trilha B2C — 4 planos

| Plano | Preço | Módulos | Público |
|-------|-------|---------|---------|
| **Grátis** | R$0 | M1 apenas | Experimentar antes de qualquer compromisso |
| **Estratégia** | R$79/mês | M1+M2+M3+M7 | Executando e precisando do plano completo |
| **Direção** ⭐ | R$197/mês | M1–M9 | Founders que querem o cérebro estratégico completo |
| **Completo** | R$397/mês | M1–M13 | Sistema operacional total de marketing |

**⭐ Plano Direção é o âncora do modelo** — onde o produto entrega mais valor percebido e onde a maioria dos usuários sérios converge.

### Trilha B2B — Agências

| Plano | Preço | Inclui |
|-------|-------|--------|
| **Agência** | R$597/mês (até 10 clientes) | White-label · painel de clientes · todos os 13 módulos · PDF com logo da agência |
| Cliente adicional | R$45/cliente/mês | — |

**Argumento de venda B2B:** "Pare de entregar campanha. Comece a entregar estratégia. O Lastro faz o briefing — você executa com autoridade."

### Gatilho de conversão

**Módulo 2 bloqueado no free** — depois de receber o diagnóstico, a pergunta natural é "e agora, o que eu faço?". A resposta está no M2. É o momento de maior intenção de compra.

### Regras do modelo

| Regra | Detalhe |
|-------|---------|
| M1 sempre gratuito e completo | O diagnóstico é a porta de entrada — ninguém paga sem sentir o valor |
| Sem trial de 14 dias | Urgência artificial quebra confiança em produto que promete clareza |
| Sem desconto anual antes do mês 6 | Validar retenção antes de receber anual de clientes que podem cancelar |
| Fase 2 só lança quando pronta | Nunca vender módulos que ainda não existem |
| M4–M13 só após M1 concluído | A profundidade do output depende do diagnóstico por baixo |

### Projeção de MRR — cenário conservador

| Marco | Composição | MRR estimado |
|-------|-----------|-------------|
| Mês 3 — beta | 10 free · 8 Estratégia · 2 agências | R$1.826 |
| Mês 6 — fase 2 lançada | 100 free · 30 Est. · 15 Dir. · 8 agências | R$8.511 |
| Mês 12 — tração | 400 free · 80 Est. · 50 Dir. · 20 Comp. · 20 ag. | R$33.660 |
| Mês 18 — escala | 1.000 free · 180 Est. · 120 Dir. · 60 Comp. · 50 ag. | R$88.410 |

*Premissas: conversão free→pago 8–10% · sem canal pago · crescimento orgânico*

---

## 17. Riscos e mitigações

| # | Risco | Severidade | Mitigação |
|---|-------|-----------|-----------|
| 1 | Produto vira consultoria disfarçada | Fatal | Cada módulo entrega output concreto — não orientação genérica |
| 2 | IA internacional entra no espaço | Muito alto | Contexto brasileiro como barreira — dado local incopiável por players globais |
| 3 | Mercado pequeno demais | Alto | Ampliar ICP: qualquer negócio digital, não só SaaS |
| 4 | Produto depende da presença do fundador | Alto | Lógica entra no produto via regras e IA — não no suporte |
| 5 | Churn por expectativa frustrada | Médio | Vender processo e clareza — nunca resultado garantido |
| 6 | IA genérica torna o produto obsoleto | Fatal se ocorrer | Diferencial é o dado acumulado — nenhum LLM genérico replica |
| 7 | API Meta muda as regras | Alto (v2+) | Integração só na v2 — MVP sem dependência de API externa |

---

*Lastro — ML Creation Studio · 2026*  
*"Seu plano tem lastro?"*
