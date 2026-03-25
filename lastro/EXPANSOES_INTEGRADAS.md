# Lastro — Integração das Expansões Estratégicas

**Versão:** 1.0 · Março 2026
**Fonte:** 3 documentos de expansão analisados e integrados à arquitetura existente

---

## Curadoria — o que entra, onde e quando

### Classificação por impacto e momento

| Ideia | Origem | Impacto | Quando entra |
|-------|--------|---------|-------------|
| Onboarding por leitura de URL | Evolução v3.1 | Alto — reduz abandono 60% | MVP — altera M1 |
| Confirmação dialética (afirmações vs perguntas) | Evolução v3.1 | Alto — UX radicalmente melhor | MVP — altera M1 |
| Dashboard 3 visões (Founder / Executora / Preditiva) | Integração v1 | Alto — diferencia o M3 | Fase 1 — M3 |
| Pivô Preditivo — Sala de Guerra | Evolução v3.1 | Alto — M3 vira GPS de crise | Fase 1 — M3 |
| Simulação "What If" | Expansões | Alto — poder de planejamento | Fase 1 — pós M2 |
| Calculadora de Burn Rate de Mídia | Expansões | Alto — protege o ROI | Fase 1 — M3 |
| Monitor de Impostos de Mídia 2026 | Expansões | Médio — já embutido no CAC | Fase 1 — M1/M3 |
| Auditoria de Terceiros ("Detector de Mentiras") | Expansões | Alto — posicionamento único | Fase 2 |
| Alerta de Fadiga de Canal | Expansões | Alto — retenção e ROI | Fase 2 — M3 |
| Scripts de Vendas Alinhados | Expansões | Médio — extensão do M9 | Fase 2 — M9 |
| Auditoria de Landing Page via IA | Expansões | Médio — extensão do M5 | Fase 2 — M5 |
| Benchmarks de Criativos por Nicho | Expansões | Alto — dado proprietário | Fase 2 — M8 |
| Simulação de LTV | Expansões | Médio — SaaS/recorrente | Fase 2 — M2 |
| Roadmap de Contratação Progressiva | Expansões | Médio — CMO virtual | Fase 2 |
| Camada de integração Meta/Google/CRM | Integração v1 | Alto — automatiza M3 | Fase 2/3 |
| Filtro de Sazonalidade | Integração v1 | Alto — dado contextual BR | Fase 3 |
| Filtro de Eficiência de Ativos | Integração v1 | Alto — fecha loop M4-M9 com resultado | Fase 3 |
| Lastro Certified — Marketplace | Evolução v3.1 | Transformador — novo modelo de negócio | Fase 3+ |
| The Lastro Index — Benchmarking Comparativo | Evolução v3.1 | Alto — moat e retenção | Fase 3 — M13 |
| Relatório Trimestral público | Evolução v3.1 | Alto — autoridade de mercado | Fase 3 — M13 |

---

## Mudanças no MVP — o que altera agora

### Mudança 1 — Onboarding de Carga Rápida (altera M1)

**O que é:** Antes das 9 perguntas, o usuário insere o URL do site ou @ do perfil.
A IA lê o conteúdo e pré-preenche automaticamente:
- `nicho` e `subnicho` — extraídos do conteúdo da página
- `icp_desc` — inferido da linguagem e promessas do site
- `diferencial_score` inicial — headline comparada com benchmarks do setor

**Como muda a conversa:** Em vez de perguntas abertas, o sistema apresenta afirmações para confirmação:
> "Identifiquei que você opera no subnicho de Estética Dental com foco em público High Ticket. Isso reflete seu momento atual ou houve um pivot recente?"

**Impacto:** Reduz tempo do M1 em até 60%. Usuário chega ao score com menor taxa de abandono. A IA já tem contexto antes de fazer qualquer pergunta.

**Campo novo no banco:**
```sql
alter table diagnostico add column if not exists url_negocio text;
alter table diagnostico add column if not exists dados_precarregados jsonb;
```

**Tópicos que mudam:** 1 (produto), 2 (ICP) e 4 (diferencial) — a pergunta inicial se torna confirmação, não descoberta.

---

### Mudança 2 — Pivô Preditivo no M3 (altera Tracker)

**O que é:** Quando `status_plano` atinge `revisao` (< 40% da meta), o produto ativa a "Sala de Guerra" — não apenas diagnostica, mas age:

1. Cruza `cac_real` com `cac_benchmark` e identifica a causa raiz
2. Aplica automaticamente o ajuste de 12,15% do Meta Ads 2026
3. Sugere micro-pivô tático imediato (ex: suspender Meta Ads e ativar Indicação Estruturada com briefing pronto)
4. Recalcula o Lastro Score com dados reais da semana
5. Projeta nova data realista de atingimento da meta

**UX:** Em vez de alerta vermelho, abre uma tela de contexto específico:
> "Semana 4 — seu plano precisa de ajuste. Aqui está o que está acontecendo e o que fazer agora."

**Impacto:** M3 deixa de ser tracker passivo e vira GPS de crise em tempo real. Diferença de produto fundamental.

---

### Mudança 3 — Dashboard com 3 visões (altera M3)

**O que é:** O painel do M3 tem 3 abas com contextos diferentes:

**Visão Founder:** ROI, CAC real, sobrevivência de caixa, score atualizado
**Visão Executora:** CTR, CPL, performance de criativos — briefing para agência ou gestor
**Visão Preditiva:** "O que fazer amanhã" baseado no desvio da meta

**Impacto:** O mesmo dado lido por 3 públicos diferentes sem mudar de tela. Agências que usam o plano white-label podem mostrar a visão executora para o cliente e a preditiva para si mesmas.

---

### Mudança 4 — Simulação "What If" (nova feature pós M2)

**O que é:** Interface interativa após o M2 onde o usuário testa variáveis antes de consolidar o plano:
- "Se eu aumentar o budget em 20%, meu score vai para 82?"
- "Se eu reduzir o ticket médio de R$500 para R$350, o plano ainda é viável?"
- "Se eu mudar o prazo de 60 para 90 dias, qual canal fica disponível?"

**Mecânica:** Sliders com recálculo em tempo real do Lastro Score e das regras de canal. Não salva no banco até o usuário confirmar.

**Impacto:** Dá poder de planejamento. O usuário entende o impacto das decisões antes de executar. Forte gatilho para upgrade — a simulação avançada fica no plano Direção.

---

### Mudança 5 — Calculadora de Burn Rate (feature do M3)

**O que é:** Dentro do tracker, monitora a velocidade do gasto vs tempo restante do mês.

> "Você gastou R$420 em 12 dias. No ritmo atual, seu orçamento zera em 8 dias — antes do fim do ciclo planejado. Recomendamos reduzir o lance diário em 30%."

**Impacto:** Protege o ROI proativamente. Evita que o usuário fique sem verba antes de colher resultado.

---

## Novas features na Fase 2

### Auditoria de Terceiros — "Detector de Mentiras"

**O que é:** O usuário insere dados de uma proposta recebida de agência ou freelancer.
O Lastro cruza as promessas com a tabela de CAC e emite parecer:

> "Uma agência promete 50 leads por mês com R$500 de budget no nicho imobiliário. Com CAC mínimo de R$80/lead nesse nicho, seriam necessários R$4.000 de mídia. Essa proposta não é viável com o orçamento declarado."

**Posicionamento:** Reforça "honesto antes de otimista". Protege o usuário do mercado. Cria inimigo claro (agências desonestas) e coloca o Lastro do lado certo.

**Onde vive:** Nova tela acessível do dashboard — "Avaliar uma proposta"

---

### Alerta de Fadiga de Canal

**O que é:** Quando o CPL de um canal aumenta mais de 25% em relação à semana anterior, o sistema alerta:

> "Seu custo por lead no Meta Ads subiu 34% esta semana. Isso pode indicar fadiga de criativo ou aumento de leilão. Recomendamos rodar novos criativos ou migrar 30% do budget para indicação estruturada."

Gera automaticamente o briefing de novos criativos via M8.

---

### Benchmarks de Criativos por Nicho (extensão M8)

**O que é:** No M8 (Direção de Gravações), o sistema apresenta os padrões de anúncios com menor CAC real no nicho:
- Duração ideal de vídeo
- Formato de gancho mais eficiente
- CTA que mais converte

Baseado nos dados reais acumulados dos usuários do mesmo nicho.

**Impacto:** Usa o dado proprietário como vantagem competitiva concreta. Nenhuma IA genérica consegue isso sem o contexto brasileiro acumulado.

---

### Scripts de Vendas Alinhados (extensão M9)

**O que é:** Extensão do M9 que gera roteiros de abordagem baseados no ICP e no diferencial validado no M1:
- Script de abertura WhatsApp
- Roteiro de call de discovery
- E-mail de follow-up pós reunião

Toda a linguagem derivada do diagnóstico — não de template genérico.

---

### Simulação de LTV (extensão M2 para recorrência)

**O que é:** Para `modelo_cobranca == recorrente`, projeta o LTV e recalibra o Lastro Score:

> "Com ticket de R$200/mês e retenção média de 8 meses no seu nicho, seu LTV é R$1.600. Isso torna viável um CAC de até R$320 — 60% acima do que o score atual considera."

**Impacto:** Evita que SaaS e serviços recorrentes recebam score injustamente baixo por ter CAC aparentemente alto.

---

## Fase 3 — Inteligência e ecossistema

### Camada de Integração (Meta / Google / RD Station / HubSpot / GA4)

**Conectores e o que cada um entrega:**

| Plataforma | Dado | Aplicação |
|-----------|------|-----------|
| Meta Ads | Gasto real + imposto 12,15% | Valida investimento de mídia no M3 |
| Google Ads | CPC real | Compara demanda de mercado com meta do M2 |
| RD Station | Status de leads no funil | Calcula CAC real sem input manual |
| HubSpot | Valor de venda + ciclo | Calibra LTV e tempo de retorno |
| GA4 | Taxa de rejeição + origens | Alimenta auditoria de landing page M5 |

**Camada de Tradução (Middleware):**

- **Filtro de Fidelidade:** Cruza GA4 com CRM. Se houver discrepância, avisa: "Seus dados de rastreio estão perdendo 15% das conversões. O plano pode estar melhor do que parece."
- **Filtro de Sazonalidade:** Analisa tendências históricas do nicho no Brasil. "Novembro costuma dobrar o custo de leilão no seu nicho. Recomendamos antecipar o budget para Outubro."
- **Filtro de Eficiência de Ativos:** Identifica qual direção de arte (M4) ou copy (M9) gerou o melhor ROI nos anúncios.

**Privacidade:**
- Zero Data Retention opcional: processa via API, calcula scores, não armazena dados sensíveis de leads — só agregados
- Read-Only Access: nunca altera campanhas sem autorização expressa

---

### The Lastro Index — Benchmarking Comparativo Dinâmico

**O que é:** Ao visualizar o score, o usuário recebe contexto de mercado em tempo real:

> "Seu CAC de R$150 está 12% acima da média das clínicas de Estética Médica monitoradas pelo Lastro este mês."

**Gatilho de upgrade:** Acesso aos dados detalhados ("o que está funcionando agora no meu nicho") é o principal gatilho para o plano Completo (R$397/mês).

---

### Lastro Certified — Marketplace

**O que é:** Ecossistema que conecta a direção estratégica (M4–M10) com executores humanos qualificados.

**Mecânica:**
- Outputs dos módulos M4–M10 viram documentos de contratação padronizados ("Briefing Inviolável")
- Qualquer profissional "Lastro Certified" consegue executar sem reuniões extensas de alinhamento
- O Lastro atua como nó central — cobra referral fee por projetos fechados via plataforma
- Certificação mantida apenas se os planos executados mantêm status "No Prazo" no M3

**Modelo de receita adicional:** Referral fee de 15–20% sobre o valor do projeto

**Impacto no produto:** Transforma o Lastro de ferramenta de diagnóstico em sistema operacional completo — da estratégia à execução certificada.

---

## Tabela de Hierarquia de Valor (do documento v3.1)

| Nível | Percepção do usuário | Módulo chave |
|-------|---------------------|-------------|
| **Clareza** | "Descobri que meu plano era impossível antes de perder dinheiro." | M1 |
| **Direção** | "Sei exatamente o que pedir para o meu designer e copywriter." | M4–M9 |
| **Segurança** | "Meu GPS de marketing me avisou que o canal mudou e me deu o novo caminho." | M3 |
| **Vantagem** | "Tenho dados de mercado que meus concorrentes não conseguem ver." | M13 |

Esta tabela define a jornada de valor do usuário — e o plano de upgrade natural entre os planos de preço.

---

## O que NÃO entra — e por quê

### Roadmap de Contratação Progressiva
Boa ideia, mas é uma feature de CMO virtual que dilui o foco do produto no MVP e fase 2. Entra na fase 3 se houver demanda comprovada.

### Auditoria de Landing Page via GA4
Depende de integração com GA4 — que só entra na fase 3. A versão manual (usuário insere URL, IA analisa) pode entrar no M5 da fase 2.

### Filtro de Sazonalidade histórica
Requer banco de dados histórico do mercado brasileiro que ainda não existe. Entra quando o Lastro Index tiver dados suficientes (500+ diagnósticos por nicho).

---

## Impacto no modelo de preço

As novas features redistribuem o valor entre os planos:

| Plano | Novas features incluídas |
|-------|------------------------|
| **Grátis** | Onboarding por URL (carga rápida) — melhora conversão sem custo |
| **Estratégia R$79** | Dashboard 3 visões · Burn Rate · Monitor de impostos |
| **Direção R$197** | Simulação What If · Auditoria de Terceiros · Alerta de Fadiga · Scripts de Vendas |
| **Completo R$397** | Lastro Index com benchmarking comparativo · Simulação de LTV · Benchmarks de Criativos |
| **Agência R$597** | Visão Executora do dashboard · Briefings certificados · acesso ao marketplace (fase 3) |

---

## Sequência de implementação recomendada

### Agora (antes de recomeçar no Lovable)
1. Onboarding por leitura de URL — altera o início do M1
2. Confirmação dialética — altera a UX da conversa
3. Dashboard com 3 visões — altera o M3
4. Simulação "What If" — nova feature pós M2

### Fase 2 (após MVP validado)
5. Pivô Preditivo / Sala de Guerra — aprofunda M3
6. Auditoria de Terceiros — nova tela no dashboard
7. Calculadora de Burn Rate — dentro do M3
8. Alerta de Fadiga de Canal — extensão do M3
9. Simulação de LTV — extensão do M2 para recorrência
10. Benchmarks de Criativos — extensão do M8
11. Scripts de Vendas — extensão do M9

### Fase 3 (escala)
12. Integrações Meta / Google / RD Station / HubSpot / GA4
13. Camada de Tradução (3 filtros)
14. The Lastro Index — benchmarking dinâmico
15. Lastro Certified — marketplace
16. Relatório Trimestral público
