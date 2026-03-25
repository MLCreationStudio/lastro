# Créditos AI — Lógica, Usabilidade e Viabilidade Financeira

> **Chatsac Nexus — Documento Oficial**
Elaborado com base no Master Doc de Precificação Científica (Ronan Pinho, 19/03/2026)
Versão final — Uso interno: Financeiro, Produto, Engenharia, Sócios e CEO
> 

---

> **Nota metodológica:** Os custos de LLM utilizados neste documento são estimativas de mercado referentes a março/2026. Preços de API de modelos de linguagem estão sujeitos a variação. Uma análise de sensibilidade (seção 6) mostra que as conclusões se sustentam mesmo em cenários de custo significativamente maiores. Os preços finais dos planos e add-ons dependem de validação adicional de COGS de infraestrutura (banco, compute, WhatsApp BSP), conforme pendência registrada na seção 14 do Master Doc.
> 

---

## Resumo Executivo

**Pergunta central deste documento:**

> *"Quanto custa ao Nexus entregar 1 Crédito AI — e os preços sugeridos garantem que nunca pagaremos para trabalhar?"*
> 

**Resposta direta:**

O custo médio ponderado por Crédito AI é de aproximadamente **R$ 0,006**. Com os preços sugeridos no Master Doc, o componente de IA representa **menos de 0,5% da receita** em todos os planos. A margem bruta do componente AI supera **99% em todos os planos pagos**.

| Indicador | Valor |
| --- | --- |
| Custo médio por Crédito AI | **R$ 0,006** |
| Custo de IA como % da receita (Scale) | **0,48%** — o mais alto entre os planos |
| Margem bruta AI — Starter | **99,8%** |
| Margem bruta AI — Growth | **99,6%** |
| Margem bruta AI — Scale | **99,5%** |
| Margem dos pacotes add-on | **91% a 94%** |
| Distância até o break-even (100 clientes) | **84x o volume atual** |

**Conclusão para o financeiro:** Os preços sugeridos no Master Doc são sustentáveis. O custo de LLM não é o driver de precificação — o driver é percepção de valor e posicionamento competitivo. As únicas proteções obrigatórias são para o plano **Enterprise**, onde o custo pode ser relevante sem um cap de créditos definido.

---

## 1. O que é um Crédito AI no Nexus

O **Crédito AI** é a unidade de consumo dos recursos de inteligência artificial do Chatsac Nexus. Ele existe para três finalidades simultâneas:

- **Para o usuário:** traduz "uso de IA" em algo tangível, mensurável e gerenciável
- **Para o produto:** é o mecanismo de feature gate que diferencia planos e gera upsell natural
- **Para o financeiro:** é o escudo que protege a margem contra o custo variável de infraestrutura de LLM

> **Distinção importante:** Um Crédito AI não é um token LLM. É uma **unidade de valor de produto** que abstrai o custo técnico (medido em tokens) e entrega previsibilidade ao cliente e proteção de margem ao Nexus. O cliente compra e consome créditos — nunca vê ou gerencia tokens.
> 

---

## 2. Tabela de Consumo por Ação

Cada ação de IA consome créditos proporcionalmente à sua complexidade, conforme definido no Master Doc de Precificação (seção 2.3).

| Ação AI | Créditos consumidos | Complexidade | Tokens LLM estimados¹ |
| --- | --- | --- | --- |
| Sugestão de resposta | 0,5 crédito | Muito baixa | ~500 tokens |
| Análise de sentimento (batch) | 0,5 crédito | Muito baixa | ~400 tokens |
| Resolução de conversa | 1 crédito | Baixa | ~1.000 tokens |
| Insight de churn — Ralo Financeiro | 2 créditos | Média | ~3.000 tokens |
| Ação automática de conversão | 3 créditos | Alta | ~4.000 tokens |
| Campanha AI-optimized | 5 créditos | Muito alta | ~8.000 tokens |

> ¹ Estimativas de tokens LLM são utilizadas internamente para o cálculo de COGS. O usuário final nunca tem contato com essa métrica.
> 

---

## 3. Cotas por Plano

Conforme arquitetura de planos definida no Master Doc (seção 3). Os preços em R$ são preliminares e dependem da validação financeira completa de COGS.

| Plano | Créditos AI/mês | Contatos ativos | Operadores | Preço sugerido |
| --- | --- | --- | --- | --- |
| **Starter** | 50 créditos | 300 | 2 | R$ 197/mês |
| **Growth** ⭐ | 250 créditos | 1.500 | 5 | R$ 497/mês |
| **Scale** | 1.000 créditos | 8.000 | 15 | R$ 1.297/mês |
| **Enterprise** | Definido por contrato | Custom | Ilimitados | A partir de R$ 2.997/mês |

> Enterprise: cota de créditos é definida individualmente por contrato. A seção 7 deste documento especifica a estrutura recomendada para proteger a margem.
> 

### 3.1 Regras de ciclo dos créditos

- Créditos do plano **resetam** no início de cada ciclo de billing — use-it-or-lose-it
- Créditos extras comprados como add-on **acumulam por 90 dias** a partir da compra
- A ordem de consumo é: créditos do plano primeiro, depois créditos add-on
- Créditos são isolados por workspace — não são transferíveis entre empresas
- Em downgrade de plano: créditos do plano não são reembolsados; créditos add-on são preservados

### 3.2 Comportamento ao atingir o limite

| Saldo restante | Comportamento do sistema |
| --- | --- |
| Abaixo de 20% da cota | Banner de aviso no dashboard + e-mail ao admin |
| Zero — cota esgotada | AI Advisor desativado. Chat manual permanece 100% funcional. CTA de compra imediata. |

> **Princípio inviolável (Master Doc, seção 10.1):** O esgotamento de créditos AI **nunca bloqueia o chat manual**. O operador continua atendendo normalmente — apenas as funcionalidades automáticas de IA são pausadas.
> 

---

## 4. Análise de COGS — Custo Real por Crédito AI

> Esta seção responde diretamente à pendência crítica registrada no Master Doc (seção 14, item 1): *"Qual o custo médio de tokens por tipo de ação AI?"*
> 

### 4.1 Estrutura de custo de um Crédito AI

`Custo por crédito = Custo LLM (tokens de input + output) + Overhead operacional`

O custo de LLM é o componente dominante. O overhead (compute, latência de API, margem de segurança) é estimado em **15%** sobre o custo de LLM.

### 4.2 Modelos LLM de referência (preços de mercado — março/2026)

A estratégia de roteamento de modelos — usar modelos mais leves para tarefas simples e modelos mais robustos para tarefas complexas — é a principal alavanca de otimização de COGS. Cada ação de IA é roteada para o modelo mais adequado à sua complexidade.

| Modelo | Input por 1k tokens | Output por 1k tokens | Uso recomendado no Nexus |
| --- | --- | --- | --- |
| GPT-4o mini | US$ 0,000150 | US$ 0,000600 | Sugestões, resoluções simples |
| Gemini 1.5 Flash | US$ 0,000070 | US$ 0,000300 | Análise de sentimento em batch |
| Claude 3.5 Haiku | US$ 0,000800 | US$ 0,004000 | Insights analíticos (churn) |
| GPT-4o | US$ 0,005000 | US$ 0,015000 | Ações de conversão complexas |
| Claude 3.5 Sonnet | US$ 0,003000 | US$ 0,015000 | Campanhas AI otimizadas |

> Câmbio utilizado: **R$ 5,80/USD** (referência março/2026).
> 

### 4.3 Custo real por ação — memória de cálculo

A tabela abaixo detalha o cálculo de custo para cada ação, considerando o mix de tokens de input e output típico de cada tarefa.

| Ação AI | Créditos | Tokens | Mix input/output | Modelo | Custo LLM (R$) | + Overhead 15% (R$) |
| --- | --- | --- | --- | --- | --- | --- |
| Sugestão de resposta | 0,5 | 500 | 60% input / 40% output | GPT-4o mini | R$ 0,0010 | **R$ 0,0012** |
| Análise de sentimento | 0,5 | 400 | 70% input / 30% output | Gemini Flash | R$ 0,0003 | **R$ 0,0004** |
| Resolução de conversa | 1 | 1.000 | 60% input / 40% output | GPT-4o mini | R$ 0,0019 | **R$ 0,0022** |
| Insight de churn (Ralo) | 2 | 3.000 | 70% input / 30% output | Claude Haiku | R$ 0,0306 | **R$ 0,0352** |
| Ação automática de conversão | 3 | 4.000 | 60% input / 40% output | GPT-4o | R$ 0,2088 | **R$ 0,2401** |
| Campanha AI-optimized | 5 | 8.000 | 55% input / 45% output | Claude Sonnet | R$ 0,3898 | **R$ 0,4483** |

**Verificação dos cálculos:**

- Sugestão: (300t × $0,000150 + 200t × $0,000600)/1k × R$5,80 = $0,000165 × 5,80 = R$0,00096 ≈ R$0,0010 ✓
- Resolução: (600t × $0,000150 + 400t × $0,000600)/1k × R$5,80 = $0,000330 × 5,80 = R$0,00191 ≈ R$0,0019 ✓
- Insight: (2.100t × $0,000800 + 900t × $0,004000)/1k × R$5,80 = $0,005280 × 5,80 = R$0,03062 ≈ R$0,0306 ✓
- Conversão: (2.400t × $0,005000 + 1.600t × $0,015000)/1k × R$5,80 = $0,036000 × 5,80 = R$0,2088 ✓

### 4.4 Custo médio ponderado por Crédito AI

Para determinar o custo médio por crédito, aplicamos uma ponderação com base no mix de uso esperado de uma empresa típica. O percentual representa **a fatia de créditos consumidos por tipo de ação** — não o número de ações.

| Ação AI | % dos créditos consumidos | Custo por crédito (R$)¹ | Contribuição ponderada (R$) |
| --- | --- | --- | --- |
| Sugestão de resposta | 45% | R$ 0,0024 | R$ 0,00108 |
| Análise de sentimento | 20% | R$ 0,0008 | R$ 0,00016 |
| Resolução de conversa | 25% | R$ 0,0022 | R$ 0,00055 |
| Insight de churn | 6% | R$ 0,0176 | R$ 0,00106 |
| Ação de conversão | 3% | R$ 0,0800 | R$ 0,00240 |
| Campanha AI | 1% | R$ 0,0897 | R$ 0,00090 |
| **Total** | **100%** | — | **R$ 0,00615 ≈ R$ 0,006** |

> ¹ Custo por crédito = Custo total com overhead ÷ créditos consumidos pela ação.
Exemplo — Insight de churn: R$ 0,0352 ÷ 2 créditos = R$ 0,0176/crédito.
> 

> **Custo médio ponderado por Crédito AI: R$ 0,006**
Interpretação prática: cada Crédito AI custa ao Nexus aproximadamente **0,6 centavos**.
> 

---

## 5. Análise de Margem por Plano

### 5.1 Custo mensal de IA por plano

| Plano | Créditos/mês | Custo AI (R$) | Receita sugerida (R$) | Custo AI como % da receita |
| --- | --- | --- | --- | --- |
| Starter | 50 | R$ 0,31 | R$ 197 | **0,16%** |
| Growth | 250 | R$ 1,55 | R$ 497 | **0,31%** |
| Scale | 1.000 | R$ 6,18 | R$ 1.297 | **0,48%** |

> Enterprise tratado separadamente na seção 7, pois sua cota de créditos é definida por contrato.
> 

### 5.2 Margem bruta do componente AI por plano

A tabela abaixo isola o componente AI dentro da receita de cada plano. O preço do plano cobre três eixos (contatos, operadores e IA); a divisão abaixo é uma simplificação para demonstrar a irrelevância do custo de IA frente à receita total.

| Plano | Receita implícita por crédito¹ | Custo por crédito | Margem bruta AI |
| --- | --- | --- | --- |
| Starter | R$ 3,94/crédito | R$ 0,006 | **99,8%** ✅ |
| Growth | R$ 1,99/crédito | R$ 0,006 | **99,7%** ✅ |
| Scale | R$ 1,30/crédito | R$ 0,006 | **99,5%** ✅ |

> ¹ Receita por crédito = preço do plano ÷ créditos incluídos. Ex: R$197 ÷ 50 = R$3,94/crédito.
> 

> **A meta de margem >70% por crédito definida no Master Doc (seção 2.3) é superada em mais de 29 pontos percentuais em todos os planos.**
> 

---

## 6. Análise de Sensibilidade — E se o custo de LLM aumentar?

Esta análise responde à pergunta: *"As margens se sustentam mesmo se os provedores de IA aumentarem seus preços?"*

### 6.1 Impacto nos planos em diferentes cenários de custo

| Cenário | Custo/crédito | Custo mensal Scale | % da receita Scale | Margem AI Scale | Status |
| --- | --- | --- | --- | --- | --- |
| **Base (estimado)** | R$ 0,006 | R$ 6,18 | 0,48% | 99,5% | ✅ Sólido |
| **2x — LLM dobra de preço** | R$ 0,012 | R$ 12,36 | 0,95% | 99,1% | ✅ Sólido |
| **5x — aumento expressivo** | R$ 0,030 | R$ 30,90 | 2,38% | 97,6% | ✅ Sólido |
| **10x — cenário extremo** | R$ 0,060 | R$ 61,80 | 4,76% | 95,2% | ✅ Aceitável |

> **Conclusão para os planos:** Mesmo num cenário de custos 10x maiores que o estimado, o custo de IA representaria menos de 5% da receita do plano Scale. Os planos são robustos a qualquer variação realista de preço de LLM.
> 

### 6.2 Impacto nos add-ons em diferentes cenários de custo

Os add-ons são mais sensíveis a variações de custo por terem uma parcela maior de seus componentes diretamente vinculada ao custo de crédito.

| Cenário | Custo Pack Mini (500 créd) | Margem Pack Mini | Margem Pack Elite | Status |
| --- | --- | --- | --- | --- |
| **Base** | R$ 3,00 | 94,0% | 91,0% | ✅ Excelente |
| **2x** | R$ 6,00 | 88,0% | 82,0% | ✅ Bom |
| **5x** | R$ 15,00 | 69,9% ⚠️ | 55,0% ⚠️ | ⚠️ Revisar preços |
| **10x** | R$ 30,00 | 39,9% ❌ | 9,8% ❌ | ❌ Repricing obrigatório |

> **Gatilho de revisão de preços de add-ons:** Se o custo por crédito superar **R$ 0,029** (5x o estimado), os preços dos pacotes add-on devem ser revisados para manter a margem acima de 70%. Recomenda-se monitoramento trimestral do custo real de LLM via ledger de créditos (seção 10).
> 

> **Nota:** Uma variação de 5x no custo de LLM seria um evento sem precedentes no histórico recente do setor — os preços de API de LLM têm caído consistentemente desde 2023. Ainda assim, a proteção via monitoramento é boa prática.
> 

---

## 7. Precificação dos Add-ons de Créditos

O Master Doc define o add-on como **+500 créditos AI** com preço "a definir pós análise de COGS". Esta seção fecha essa pendência.

### 7.1 Preço mínimo por nível de margem (floor pricing)

Com custo de 500 créditos = 500 × R$ 0,006 = **R$ 3,00**:

| Margem-alvo | Fórmula | Preço mínimo |
| --- | --- | --- |
| 70% (mínimo do Master Doc) | R$ 3,00 ÷ (1 − 0,70) | **R$ 10,00** |
| 90% | R$ 3,00 ÷ (1 − 0,90) | **R$ 30,00** |
| 95% | R$ 3,00 ÷ (1 − 0,95) | **R$ 60,00** |

### 7.2 Precificação recomendada dos pacotes add-on

| Pacote | Créditos | Preço recomendado (R$) | Custo real (R$) | Margem |
| --- | --- | --- | --- | --- |
| Pack Mini | 500 | R$ 49,90 | R$ 3,00 | **94,0%** ✅ |
| Pack Padrão | 1.500 | R$ 129,90 | R$ 9,00 | **93,1%** ✅ |
| Pack Plus | 5.000 | R$ 379,90 | R$ 30,00 | **92,1%** ✅ |
| Pack Elite | 15.000 | R$ 997,90 | R$ 90,00 | **91,0%** ✅ |

**Verificação — Pack Padrão:** (R$129,90 − R$9,00) / R$129,90 = R$120,90 / R$129,90 = 93,07% ✓

> **Escalonamento de preço:** Pacotes maiores têm custo menor por crédito para o cliente, incentivando compra antecipada e reduzindo churn por falta de IA. O volume maior garante receita absoluta maior mesmo com desconto por crédito.
> 

> **Argumento de venda:** O Pack Padrão custa R$ 0,087 por crédito. Cada crédito AI do Nexus executa em milissegundos o equivalente a minutos de análise humana. O ROI da comparação é imediato.
> 

---

## 8. Proteção de Margem no Enterprise

O Enterprise é o único plano onde o custo de IA pode tornar-se relevante sem uma estrutura de proteção definida, pois sua cota de créditos é negociada individualmente.

### 8.1 Cenários de uso Enterprise e impacto no custo

| Perfil de uso | Créditos/mês | Custo AI (R$) | Sobre receita mín. R$2.997 | Margem AI |
| --- | --- | --- | --- | --- |
| Uso leve (10 atend., 30 sugestões/dia) | 4.500 | R$ 27 | 0,9% | 99,1% |
| Uso médio (20 atend., 50 sugestões/dia) | 15.000 | R$ 90 | 3,0% | 97,0% |
| Uso intenso (50 atend., 200 sugestões/dia) | 150.000 | R$ 900 | 30,0% | 70,0% ⚠️ |
| Uso extremo (1M créditos/mês) | 1.000.000 | R$ 6.000 | 200% | **PREJUÍZO** ❌ |

> O cenário de uso intenso (150k créditos) assume 50 atendentes fazendo 200 sugestões cada por dia — operação de call center de grande porte. Ainda assim, a margem atinge exatamente o piso de 70%. O cenário extremo de 1M créditos é tecnicamente improvável com as cotas atuais, mas demonstra a necessidade de proteção contratual.
> 

### 8.2 Estrutura recomendada para contratos Enterprise

`Enterprise — Estrutura de créditos recomendada:

Plano base (R$ 2.997/mês):
├── Inclui: 20.000 créditos AI/mês
├── Custo ao Nexus: 20.000 × R$0,006 = R$120,00
└── Margem AI: (R$2.997 − R$120) / R$2.997 = 96,0% ✅

Créditos excedentes (acima de 20k):
├── Preço ao cliente: R$ 0,08 por crédito adicional
├── Custo ao Nexus: R$ 0,006 por crédito
└── Margem no excedente: (R$0,08 − R$0,006) / R$0,08 = 92,5% ✅

Exemplo — cliente usa 100.000 créditos no mês:
├── 20.000 incluídos no plano (sem cobrança extra)
├── 80.000 excedentes × R$0,08 = R$6.400 de receita adicional
├── Custo dos 80.000: 80.000 × R$0,006 = R$480
└── Margem no excedente: 92,5% ✅`

### 8.3 Mecanismos de proteção obrigatórios para o Enterprise

| Mecanismo | Descrição |
| --- | --- |
| **Cota contratual definida** | Nunca fechar Enterprise sem cota de créditos expressa no contrato |
| **Cobrança por excedente** | Acima da cota: R$ 0,08/crédito (negociável por volume) |
| **Rate limiting por workspace** | Máximo de requisições por minuto — protege contra uso automatizado abusivo |
| **Roteamento de modelo** | Modelo leve para ações simples; nunca usar GPT-4o para sugestões básicas |
| **Cache de respostas** | Reutilizar resposta para queries idênticas no mesmo workspace — reduz COGS 15–25% |

---

## 9. Projeção Financeira — Base de 100 Clientes

### 9.1 Custo total de IA vs receita com 100 clientes ativos

| Plano | Clientes | Créditos/mês | Custo AI (R$) | Receita (R$) |
| --- | --- | --- | --- | --- |
| Starter | 40 | 2.000 | R$ 12,00 | R$ 7.880 |
| Growth | 35 | 8.750 | R$ 52,50 | R$ 17.395 |
| Scale | 20 | 20.000 | R$ 120,00 | R$ 25.940 |
| Enterprise¹ | 5 | 100.000 | R$ 600,00 | R$ 14.985 |
| **Total** | **100** | **130.750** | **R$ 784,50** | **R$ 66.200** |

> ¹ Enterprise com 20.000 créditos incluídos por empresa. Os 5 clientes × 20k = 100k créditos.
> 

**O custo total de IA com 100 clientes é R$ 784,50 — equivalente a 1,18% da receita.**

### 9.2 Distância até o break-even

> Qual seria o volume de créditos necessário para o custo de IA igualar toda a receita?
> 

`Receita total (100 clientes): R$ 66.200/mês
Custo por crédito: R$ 0,006

Volume de créditos para break-even: R$ 66.200 ÷ R$ 0,006 = 11.033.333 créditos/mês

Volume atual projetado: 130.750 créditos/mês

Distância até o break-even: 11.033.333 ÷ 130.750 = 84x`

> O Nexus precisaria ter um consumo **84 vezes maior** do que o projetado para que o custo de IA consumisse toda a receita dos planos. Isso é estruturalmente impossível com as cotas atuais.
> 

---

## 10. Ledger de Créditos — Referência Técnica

O sistema de créditos opera como um ledger financeiro auditável, conforme definido no Master Doc (seção 2.3). Duas colunas adicionais são recomendadas ao schema original para viabilizar o monitoramento financeiro em produção.

sql

`CREATE TABLE credit_ledger (
  id               UUID PRIMARY KEY,
  workspace_id     UUID NOT NULL,
  transaction_type ENUM('allocation', 'debit', 'addon_purchase', 'expiration'),
  credits          DECIMAL(10,2) NOT NULL,
  action_type      VARCHAR(50),    -- 'suggestion', 'resolution', 'churn_insight', etc.
  reference_id     UUID,           -- conversation_id, campaign_id, etc.
  model_used       VARCHAR(50),    -- ADIÇÃO: para auditoria de COGS real por modelo
  cost_brl         DECIMAL(10,6),  -- ADIÇÃO: custo real em R$ daquela transação
  created_at       TIMESTAMPTZ DEFAULT NOW()
);`

> **Por que `model_used` e `cost_brl` são essenciais:** Esses dois campos permitem ao financeiro gerar relatórios mensais de COGS real — comparando os custos projetados neste documento com os custos efetivos em produção. É a única forma de validar continuamente se as margens se sustentam conforme a base de clientes cresce.
> 

### 10.1 Fluxo do ledger no ciclo de billing

`[Início do ciclo]
    → Registro tipo 'allocation': créditos = cota do plano

[Durante o ciclo]
    → Ação AI disparada → Registro tipo 'debit': créditos = −N
    → Saldo em tempo real = SUM(credits) WHERE workspace_id = X

[Compra de add-on]
    → Registro tipo 'addon_purchase': créditos = +pacote
    → expiration_date = NOW() + 90 days

[Encerramento do ciclo]
    → Créditos do plano não usados → Registro tipo 'expiration'
    → Créditos add-on não expirados → permanecem no saldo
    → Novo ciclo: registro tipo 'allocation'`

---

## 11. Otimizações de COGS — Prioridades para Engenharia

As otimizações abaixo reduzem o custo real por crédito e ampliam ainda mais as margens conforme a base escala.

| Estratégia | Redução de COGS estimada | Prioridade | Quando |
| --- | --- | --- | --- |
| Roteamento de modelo por complexidade | 40–60% | 🔴 Crítico | MVP |
| Cache de respostas por workspace | 15–25% | 🔴 Crítico | MVP |
| Compressão de contexto longo | 20–30% | 🟡 Importante | Pós-lançamento |
| Batching de análises em horário off-peak | 10–15% | 🟡 Importante | Pós-lançamento |
| Negociação de volume com provedor LLM | 10–30% | 🟢 Estratégico | Quando escalar |
| Fine-tuning de modelo proprietário | 50–70% | 🟢 Estratégico | V4+ |

> **Regra de roteamento para o MVP:** `credits <= 1` → modelo leve (GPT-4o mini / Gemini Flash); `credits >= 3` → modelo robusto (GPT-4o / Claude Sonnet). Essa única regra reduz o COGS médio em até 50%.
> 

---

## 12. O que o Financeiro Deve Priorizar para Fechar o Preço Final

Em ordem de relevância para a saúde financeira do Nexus — do maior para o menor impacto:

1. **Custo de WhatsApp API (BSP)** — Meta cobra por conversa/mensagem iniciada. Se o Nexus absorver esse custo (pass-through não é pass-through), o impacto na margem pode ser maior do que o custo de IA. Definir a política antes de fechar os preços.
2. **Custo de infraestrutura por tenant** — banco de dados, storage, compute. Esse custo escala com o número de clientes e varia por plano. Ainda pendente de análise conforme Master Doc, seção 14, item 2.
3. **CAC e payback period** — quanto custa adquirir um cliente de cada tier vs quanto ele paga por mês. Define o ritmo seguro de crescimento.
4. **Custo de LLM** — conforme demonstrado neste documento, é residual. **Não deve ser o driver de precificação.** O driver é percepção de valor e posicionamento competitivo.

---

## 13. Glossário

| Termo | Definição |
| --- | --- |
| **Crédito AI** | Unidade de consumo dos recursos de IA do Nexus. Abstração de produto sobre tokens LLM. |
| **Token LLM** | Unidade técnica interna de processamento do modelo de linguagem (~3–4 caracteres). Invisível ao usuário. |
| **COGS** | Cost of Goods Sold — custo direto de entrega do serviço (LLM + infra). |
| **Custo médio ponderado** | Média do custo por crédito ponderada pelo mix de uso esperado das diferentes ações de IA. |
| **Ledger** | Registro contábil de todas as transações de crédito: alocação, débito, compra e expiração. |
| **Fair use / Cota** | Volume máximo de créditos incluído no plano. Acima disso, aplica-se cobrança por excedente. |
| **Add-on** | Pacote de créditos extras adquirido além da cota do plano. Válido por 90 dias. |
| **Roteamento de modelo** | Estratégia de usar modelos LLM diferentes por complexidade — otimização crítica de COGS. |
| **Cache de respostas** | Reutilização de respostas idênticas sem novo processamento LLM. Reduz custo em 15–25%. |
| **Workspace / Tenant** | Empresa cliente do Nexus. Saldo de créditos é isolado por workspace. |
| **Break-even de créditos** | Volume de créditos no qual o custo de LLM igualaria toda a receita dos planos. |
| **BSP** | Business Solution Provider — operadora autorizada pela Meta para API do WhatsApp. |