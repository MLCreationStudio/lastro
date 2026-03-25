# Precificação Científica — Nexus 2.0 (Master Doc)

<aside>
🎯

**Documento mestre de precificação** para os times de Produto e Tecnologia.

Este doc define a arquitetura de planos, value metrics, feature gates, lógica de limites, upgrade paths, e requisitos técnicos para implementação. Os **valores finais em R$** dependem de validação financeira (análise de COGS) que será feita em fase seguinte.

**Status:** Draft v1 — 19 de março de 2026

**Owner:** Ronan Pinho

</aside>

---

## 1. Filosofia de Pricing

### 1.1 Por que Hybrid (Base + Usage + Outcome)

O mercado SaaS em 2026 está em plena transformação por causa da IA. O modelo per-seat puro está morrendo — cobrar por "assento" de um agente AI que resolve 80% dos tickets sozinho não faz sentido.

**Dados de mercado:**

- 85% dos SaaS já adotaram alguma forma de usage-based pricing (vs 30% em 2019)
- 126% de crescimento em modelos de crédito em 2025
- Gartner: até 2030, 40%+ do spend SaaS enterprise será usage/outcome-based
- 41% dos SaaS enterprise já usam modelo híbrido

**O modelo do Nexus combina 3 eixos:**

<aside>
👥

**Eixo 1: Contatos Ativos**

Escala com o tamanho do cliente. É o value metric primário — quanto mais contatos o cliente engaja, mais valor extrai.

</aside>

<aside>
💺

**Eixo 2: Operadores (Seats)**

Revenue floor previsível. Garante receita mínima independente de uso.

</aside>

<aside>
🤖

**Eixo 3: Créditos AI**

Monetiza o AI Advisor. Alinha custo com valor entregue. Protege margem contra COGS variável de LLM.

</aside>

### 1.2 Referências competitivas

| **Plataforma** | **Modelo** | **Entrada** | **AI Pricing** |
| --- | --- | --- | --- |
| [Respond.io](http://Respond.io) | Per-seat + usage | $99/mo (5 users) | Incluso no plano |
| Wati | Tiered + 20% markup WhatsApp | $49/mo (5 users) | Add-on de créditos |
| Sleekflow | Per-seat | $349/mo (5 users) | Incluso |
| Kommo | Per-seat (min 6 meses) | $15/user/mo | Limitado |
| Intercom | Seat + outcome | $29/seat/mo | $0.99/resolução AI (Fin) |
| Zendesk | Seat + AI add-on | $55/agent/mo | +$50/agent + $1.50/resolução |

<aside>
💡

**Posicionamento Nexus:** Não competimos com Wati/Kommo em preço. Somos o "Intercom do WhatsApp com CS Intelligence" — categoria diferente. Nenhum concorrente WhatsApp-first tem Ralo Financeiro + Motor de Conversão + Gamificação nativos.

</aside>

---

## 2. Definições Técnicas

### 2.1 Contato Ativo (value metric primário)

<aside>
📏

**Definição:** Contato que teve pelo menos **1 interação** (enviou ou recebeu mensagem) nos últimos **30 dias corridos**.

</aside>

**Regras:**

- A contagem é recalculada diariamente (job noturno)
- Contatos importados sem interação **não contam**
- Contatos que ficaram inativos >30 dias saem da contagem automaticamente
- O cliente vê o contador em tempo real no Dashboard
- A janela é **rolling** (últimos 30 dias a partir de hoje), não mês calendário

**Implementação back-end:**

```sql
SELECT COUNT(DISTINCT contact_id)
FROM interactions
WHERE workspace_id = :workspace_id
  AND interaction_date >= CURRENT_DATE - INTERVAL '30 days'
```

### 2.2 Operador (Seat)

<aside>
📏

**Definição:** Usuário com role `operator` ou `admin` que tem acesso ao workspace. Usuários com role `viewer` **não contam** como seat.

</aside>

**Regras:**

- Seats são contados por usuários **ativos** (não deletados, não suspensos)
- Admins contam como operadores
- O owner/billing contact conta como 1 seat

### 2.3 Crédito AI

<aside>
📏

**Definição:** Unidade de consumo do AI Advisor. Cada ação AI consome N créditos dependendo da complexidade.

</aside>

**Tabela de consumo:**

| **Ação AI** | **Créditos** | **Descrição** |
| --- | --- | --- |
| Resolução de conversa | 1 | AI Advisor resolve uma conversa sem intervenção humana |
| Sugestão de resposta | 0.5 | AI sugere resposta que o operador pode editar/enviar |
| Insight de churn (Ralo) | 2 | Análise preditiva de risco de churn por contato |
| Análise de sentimento (batch) | 0.5 | Classificação de sentimento em lote de conversas |
| Ação automática de conversão | 3 | Motor de Conversão executa ação AI-driven |
| Campanha AI-optimized | 5 | AI otimiza targeting/copy de uma campanha |

<aside>
⚠️

**PENDENTE — Validação financeira:** Os valores de créditos acima são preliminares. Precisam ser validados contra o COGS real (custo de tokens LLM por ação). A margem target por crédito deve ser >70%.

</aside>

**Implementação — Sistema de Ledger:**

- Cada workspace tem um `credit_balance` (saldo atual)
- Cada ação AI gera um `credit_transaction` (debit)
- No início do ciclo de billing, o saldo é resetado para o valor do plano
- Créditos **não acumulam** entre ciclos (use-it-or-lose-it)
- Créditos extras comprados como add-on **acumulam** por 90 dias

```sql
CREATE TABLE credit_ledger (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL,
  transaction_type ENUM('allocation', 'debit', 'addon_purchase', 'expiration'),
  credits DECIMAL(10,2) NOT NULL,
  action_type VARCHAR(50),  -- 'resolution', 'churn_insight', etc.
  reference_id UUID,        -- conversation_id, campaign_id, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 3. Arquitetura de Planos

### Visão geral

| **Componente** | **Starter** | **Growth** ⭐ | **Scale** | **Enterprise** |
| --- | --- | --- | --- | --- |
| **Contatos ativos** | 300 | 1.500 | 8.000 | Custom |
| **Operadores** | 2 | 5 | 15 | Ilimitados |
| **Créditos AI/mês** | 50 | 250 | 1.000 | Custom |
| **Preço sugerido** | R$197/mês | R$497/mês | R$1.297/mês | A partir de R$2.997/mês |

<aside>
⚠️

**Preços são preliminares.** Dependem da análise de COGS (custo de infra, LLM, WhatsApp API). A régua de contatos e operadores foi calibrada para o mercado **Brasil** (empresas menores que as americanas).

</aside>

---

## 4. Feature Matrix Detalhada

Legenda: ✅ = Completo | 🔸 = Limitado/Light | 👁️ = Read-only | ❌ = Não disponível

### 4.1 Core

| **Feature** | **Starter** | **Growth** | **Scale** | **Enterprise** | **Flag técnica** |
| --- | --- | --- | --- | --- | --- |
| Login/Registro | ✅ | ✅ | ✅ | ✅ | — |
| Dashboard | ✅ | ✅ | ✅ | ✅ | — |
| Chat Completo | ✅ | ✅ | ✅ | ✅ | — |
| Suporte | ✅ | ✅ | ✅ | ✅ | — |
| Configurações | ✅ | ✅ | ✅ | ✅ | — |
| Tradução (3 idiomas) | ✅ | ✅ | ✅ | ✅ | — |
| Telas Internas | ✅ | ✅ | ✅ | ✅ | — |

### 4.2 AI & Intelligence

| **Feature** | **Starter** | **Growth** | **Scale** | **Enterprise** | **Flag técnica** |
| --- | --- | --- | --- | --- | --- |
| AI Advisor — Resoluções | 🔸 50 créd/mês | 🔸 250 créd/mês | 🔸 1.000 créd/mês | ✅ Custom | `ai_credit_limit` |
| Ralo Financeiro | 👁️ Read-only | ✅ Alerts + Diagnósticos + Recomendações AI | ✅ + Ações automáticas | ✅ Completo | `ralo_mode: readonly \| alerts \| full` |
| Motor de Conversão | 🔸Playbook - Free 14 dias | 🔸 Playbooks | ✅ Completo | ✅ Completo | `conversion_engine: off \| basic \| full` |
| Automações | ❌ | ✅Chatbot | ✅ Completo | ✅ Completo |  |

### 4.3 Engagement & Retenção

| **Feature** | **Starter** | **Growth** | **Scale** | **Enterprise** | **Flag técnica** |
| --- | --- | --- | --- | --- | --- |
| Onboarding personalizado | ✅  | ✅ | ✅ | ✅ White-glove | — |
| Avatares | ✅ | ✅ | ✅ | ✅ | — |
| Gamificação | 🔸 Light (badges + ranking) | ✅ Completa (metas, rewards, leaderboards, challenges) | ✅ Completa | ✅ Completa | `gamification_mode: light \| full` |
| Playbook Templates | ✅ 4-6 templates pré-prontos | ✅ Templates + custom | ✅ | ✅ | `playbooks: templates_only \| full` |
| Campanhas (motor completo) | ❌ | ❌ | ✅ | ✅ | `campaigns_enabled: bool` |

### 4.4 Plataforma & Extensibilidade

| **Feature** | **Starter** | **Growth** | **Scale** | **Enterprise** | **Flag técnica** |
| --- | --- | --- | --- | --- | --- |
| Marketplace | ❌ (apenas com upsell) | 🔸 Módulos básicos | ✅ Básico + Avançado | ✅ Completo | `marketplace_tier: none \| basic \| advanced \| full` |
| Audit Logs | 🔸 7 dias | 🔸 30 dias | 🔸 90 dias | ✅ Ilimitado | `audit_log_retention_days: int` |
| API Access | ❌ | ❌ | ✅ | ✅ | `api_access: bool` |
| White-label (marca custom) | ❌ | ❌ | 🔸 Nível 1 (logo, cores, domínio) | ✅ Nível 2-3 (rebrand completo + multi-tenant) | `whitelabel_level: 0 \| 1 \| 2 \| 3` |
| Tour Guiado (primeiro acesso) | ✅ | ✅ | ✅ Customizável | ✅ White-label | `tour_mode: standard \| custom \| whitelabel` |

---

## 5. Playbook Templates — Starter

O Starter **não tem** o motor de campanhas completo, mas entrega valor imediato com templates pré-prontos que rodam no playbook engine simplificado.

### Templates inclusos no lançamento:

| **Template** | **Trigger** | **Ação** | **Objetivo** |
| --- | --- | --- | --- |
| Boas-vindas | Novo contato adicionado | Mensagem de boas-vindas com apresentação | First impression + onboarding do contato |
| Reativação 30d | Contato inativo há 30 dias | Mensagem de reengajamento | Recuperar contato antes de virar churn |
| NPS/CSAT | Após resolução de conversa | Pesquisa de satisfação | Medir qualidade do atendimento |
| Cobrança gentil | Manual ou integração billing | Lembrete de pagamento amigável | Reduzir inadimplência sem agressividade |
| Follow-up pós-venda | 7 dias após tag "venda" | Check-in de satisfação + oferta complementar | Aumentar LTV e satisfação |
| Aniversário/Data especial | Campo de data do contato | Mensagem personalizada | Humanizar relacionamento |

<aside>
💡

**Lógica de upgrade:** O cliente usa os templates, vê resultado, e quando quer **criar seus próprios fluxos** ou **customizar** os templates → precisa do Growth. É o melhor conversor de upgrade: "você já viu que funciona, agora quer criar os seus."

</aside>

### Implementação técnica — Playbook Engine (MVP)

- Templates são objetos JSON com `trigger_type`, `delay`, `message_template` e `variables`
- Variáveis suportadas: `{{contact_name}}`, `{{company_name}}`, `{{last_interaction_date}}`
- O cliente pode **ativar/desativar** templates mas **não editar** o conteúdo (Starter)
- No Growth+, o mesmo engine aceita templates custom criados pelo cliente

---

## 6. Ralo Financeiro — Escada de Valor

O Ralo Financeiro é o **principal conversor de upgrade** do produto. A estratégia é: mostrar o problema de graça, cobrar pela solução.

| **Capacidade** | **Starter (Read-only)** | **Growth (Alerts)** | **Scale (Full)** |
| --- | --- | --- | --- |
| Dashboard de churn/revenue at risk | ✅ Vê o valor total em risco | ✅ | ✅ |
| Lista de contatos em risco | ✅ Vê top 5 (blur no resto) | ✅ Lista completa | ✅ |
| Score de risco por contato | ❌ | ✅ | ✅ |
| Alertas em tempo real | ❌ | ✅ Email + in-app | ✅ + WhatsApp + webhook |
| Diagnóstico AI (por que está em risco) | ❌ | ✅ (consome créditos AI) | ✅ |
| Recomendações AI de ação | ❌ | ✅ (consome créditos AI) | ✅ |
| Ações automáticas (playbook anti-churn) | ❌ | ❌ | ✅ (consome créditos AI) |
| Integração Motor de Conversão | ❌ | ❌ | ✅ |

<aside>
🎯

**UX do upgrade nudge (Starter):** O dashboard mostra "Você tem R$12.400 em risco de churn este mês" com 5 contatos visíveis e o resto em blur. Abaixo: botão "Desbloquear diagnóstico completo → Growth".

</aside>

---

## 7. Gamificação — Light vs Full

| **Recurso** | **Light (Starter)** | **Full (Growth+)** |
| --- | --- | --- |
| Badges por conquistas | ✅ Set fixo (5-8 badges) | ✅ Badges custom |
| Ranking entre operadores | ✅ Ranking simples (resoluções) | ✅ Multi-critério (CSAT, velocidade, volume) |
| Metas individuais | ❌ | ✅ Metas custom por operador |
| Rewards / Recompensas | ❌ | ✅ Sistema de pontos trocáveis |
| Leaderboards avançados | ❌ | ✅ Por time, período, métrica |
| Challenges / Missões | ❌ | ✅ Challenges temporários |

---

## 8. White-Label — Roadmap por Nível

<aside>
🏗️

**Decisão arquitetural para o time de dev:** A implementação de white-label **não é prioridade agora**, mas a arquitetura precisa suportar **brand abstraction desde V1**. Não hardcodar strings "Chatsac" no código — usar variáveis de tenant.

</aside>

### 3 Níveis

| **Nível** | **O que inclui** | **Esforço dev** | **Quando** | **Disponível em** |
| --- | --- | --- | --- | --- |
| **1 — Cosmético** | Logo custom, cores/tema, domínio custom ([app.cliente.com](http://app.cliente.com)), email com domínio do cliente | Baixo | V3 (Beta) | Scale (add-on) |
| **2 — Rebrand completo** | Tudo do N1 + remoção total de menção Chatsac, onboarding com marca do revendedor, cliente final não sabe que é Chatsac | Médio | V4 (RC) | Enterprise |
| **3 — Plataforma** | Tudo do N2 + painel admin do revendedor (billing, provisioning), revendedor define seus próprios planos e preços, multi-tenant hierárquico | Alto | V5+ | Programa de Parceiros |

### O que o dev precisa fazer AGORA (V1-V2)

- [ ]  Todas as strings de marca ("Chatsac", logo URL, cores primárias) devem vir de uma config de tenant, **nunca hardcoded**
- [ ]  Email transacionais usam template com variáveis de brand
- [ ]  Favicon, título da aba, meta tags — parametrizáveis por tenant
- [ ]  Preparar a tabela `tenant_branding` mesmo que só tenha 1 registro por agora

---

## 9. Add-ons

Receita incremental fora dos planos. Cada add-on tem sua própria flag.

| **Add-on** | **Preço sugerido** | **Disponível a partir de** | **Flag técnica** |
| --- | --- | --- | --- |
| +500 Créditos AI | A definir (pós análise COGS) | Todos os planos | `addon_ai_credits` |
| +1.000 Contatos ativos | A definir | Todos os planos | `addon_contacts` |
| +5 Operadores | A definir | Todos os planos | `addon_seats` |
| Número WhatsApp adicional | A definir | Growth+ | `addon_wa_numbers` |
| Módulo Marketplace premium | Variável por módulo | Growth+ | `marketplace_modules[]` |
| White-label Nível 1 | A definir | Scale | `whitelabel_level` |

---

## 10. Lógica de Limites e Upgrade

### 10.1 Comportamento quando atinge limite

| **Limite** | **80% (warning)** | **100% (soft limit)** | **110% (hard limit)** |
| --- | --- | --- | --- |
| Contatos ativos | Banner amarelo no dashboard + email ao admin | Banner vermelho + CTA upgrade. Novos contatos ainda podem interagir por **7 dias de grace period** | Bloqueia novas conversas com contatos acima do limite. Conversas existentes continuam. |
| Operadores | — | Não permite criar novo operador. Mostra CTA de upgrade ou add-on. | Hard block (não tem grace) |
| Créditos AI | Banner "X créditos restantes" + email | AI Advisor para de funcionar. Mostra CTA para comprar pacote extra ou upgrade. | Hard block. Chat manual continua funcionando normalmente. |

<aside>
💡

**Princípio:** Nunca bloquear o chat manual do cliente. O limite de AI/contatos não pode impedir o operador de atender — só desliga features automáticas/AI. O cliente nunca fica "no escuro".

</aside>

### 10.2 Lógica de upgrade/downgrade

**Upgrade:**

- Imediato. Pro-rata do ciclo restante.
- Features novas ficam disponíveis na hora.
- Limites ajustados imediatamente.

**Downgrade:**

- Aplicado no **próximo ciclo** de billing.
- Se contatos ativos > novo limite: aviso de que precisa reduzir, senão regra de 110% se aplica.
- Dados históricos (audit logs, campanhas) não são deletados, mas acesso é restrito conforme novo plano.
- Créditos AI não usados são perdidos no downgrade.

### 10.3 Trial

- **14 dias no plano Growth** (âncora no plano mais rentável)
- Sem cartão de crédito para iniciar
- Ao fim do trial: converte para Starter (se não pagar) ou plano escolhido
- Features do Growth ficam "fantasma" após downgrade para Starter (visíveis mas locked, com CTA de upgrade)

---

## 11. Billing & Ciclo

| **Aspecto** | **Regra** |
| --- | --- |
| Ciclo | Mensal (padrão) ou Anual (20% desconto) |
| Moeda | BRL (primário), USD (para clientes internacionais) |
| Método de pagamento | Cartão de crédito, Pix (mensal), Boleto (anual) |
| Desconto anual | 20% — melhora cash flow e reduz churn |
| Reset de créditos AI | Início de cada ciclo. Saldo do plano não acumula. |
| Créditos add-on | Acumulam por 90 dias (não resetam no ciclo) |
| Grace period (pagamento atrasado) | 7 dias. Após: workspace em modo read-only. |
| Cancelamento | Efetivo no fim do ciclo corrente. Dados retidos por 90 dias após cancelamento. |

---

## 12. Requisitos Técnicos — Resumo para Dev

### P0 — Obrigatório para lançamento

- [ ]  **Feature flags por tenant** — tabela `tenant_plan_features` com todas as flags listadas na seção 4
- [ ]  **Contador de contatos ativos** — query rolling 30 dias, recalculada via job diário
- [ ]  **Contador de operadores** — count de users ativos com role operator/admin
- [ ]  **Enforcement de limites** — middleware que checa limite antes de ações gated
- [ ]  **Banner/UI de limites** — componente que mostra warnings em 80%, 100%, 110%
- [ ]  **Brand abstraction** — zero strings "Chatsac" hardcoded; tudo via `tenant_branding`

### P1 — Necessário para billing

- [ ]  **Sistema de créditos AI (ledger)** — tabela `credit_ledger` com allocation, debit, expiration
- [ ]  **Integração com gateway de pagamento** — Stripe ou local ([Pagar.me](http://Pagar.me), Asaas)
- [ ]  **Lógica de pro-rata** para upgrades mid-cycle
- [ ]  **Trial engine** — 14 dias Growth, auto-downgrade para Starter

### P2 — Pós-lançamento

- [ ]  **Upgrade nudges** — CTAs contextuais quando cliente atinge 80% de limites ou tenta usar feature locked
- [ ]  **Ralo Financeiro read-only** — dashboard com blur/lock nas features pagas
- [ ]  **Playbook engine MVP** — templates JSON com triggers e variáveis
- [ ]  **Add-on purchase flow** — compra de pacotes extras dentro do app

### P3 — Futuro

- [ ]  **White-label Nível 1** — theming engine + DNS custom
- [ ]  **Marketplace billing** — revenue share com desenvolvedores de módulos
- [ ]  **Outcome-based pricing** — tracking de "R$ salvo em churn" para modelo enterprise

---

## 13. Roadmap de Pricing × Versões

| **Versão** | **Planos disponíveis** | **Pricing evolution** |
| --- | --- | --- |
| **V1-V2 (agora)** | Starter + Growth | Lançamento com 2 planos. AI credits generosos para criar hábito. Foco em adoção e PMF. |
| **V3 (Beta)** | Starter + Growth + Scale | Adiciona Scale. Campanhas como diferencial do Growth. White-label N1 como add-on do Scale. Marketplace revenue share. |
| **V4 (RC)** | Todos os 4 tiers | Enterprise tier. White-label N2. Outcome-based component experimental (% do churn prevenido). |
| **V5+ (futuro)** | Planos + Programa de Parceiros | White-label N3 (plataforma). Full outcome-based option. Partner portal com wholesale pricing. |

---

## 14. Pendências — Análise Financeira

<aside>
🔴

**Antes de bater o martelo nos valores em R$, precisamos validar:**

</aside>

1. **COGS por crédito AI** — Qual o custo médio de tokens (input + output) por tipo de ação AI? Isso define a margem do crédito e se os pacotes são sustentáveis.
2. **Custo de infra por tenant** — Banco de dados, storage, compute. Quanto custa manter 1 workspace Starter vs Growth vs Scale?
3. **WhatsApp API costs** — Meta cobra por conversa/mensagem. Isso é pass-through (cliente paga direto à Meta via BSP) ou absorvido no preço? Se absorvido, qual o impacto na margem por tier?
4. **Baseline do Chatsac 1.0** — Clientes atuais pagam quanto? O Nexus é upgrade path (grandfathering) ou fresh start (migração)?
5. **Elasticidade de preço no mercado BR** — R$197 Starter e R$497 Growth são acessíveis para a persona-alvo (PME brasileira)? Precisamos validar com pesquisa ou early adopters.
6. **Break-even por tier** — Quantos clientes por tier para cobrir custo fixo + variável? Qual o mix ideal de tiers?

---

<aside>
📋

**Próximos passos:**

1. Time de produto valida feature matrix e flags técnicas

2. Time de dev estima esforço dos P0/P1

3. Rodar análise financeira (COGS, margem, break-even)

4. Validar preços com early adopters / clientes 1.0

5. Construir pricing page e billing flow

</aside>