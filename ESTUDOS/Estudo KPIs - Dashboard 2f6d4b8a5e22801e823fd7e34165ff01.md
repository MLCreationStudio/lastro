# Estudo KPIs - Dashboard

# C-LEVEL/PROPRIETÁRIO:

**1. Receita & Funil (O Dinheiro na Mesa)**

| **Métrica** | **Definição Lógica (Backend)** | **Fonte do Dado** | **Impacto Estratégico** |
| --- | --- | --- | --- |
| **Lead (Novo)** | `count(unique_phone)` onde `first_interaction` = hoje. Se o número já existe mas estava inativo há >60 dias, conta como "Lead Reativado". | Entrada via Webhook/API ou mensagem direta. | Base para cálculo de conversão. |
| **Conversão por Etapa** | % de leads que mudaram de `status_id: X` para `status_id: Y`. Ex: `count(status='Proposta') / count(status='Lead')`. | Movimentação de Cards no Kanban ou mudança de tag. | Identifica onde o funil está "furado" (o ralo). |
| **Receita Gerada** | Soma do campo `deal_value` em todos os chats marcados como `status='Ganho'`. | **Formulário de Finalização** (Obrigatório para o badge "Fechador"). | O KPI principal do C-Level. |
| **Receita por Canal** | `sum(deal_value)` agrupado por `source_channel` (WhatsApp, Insta, Web). | Identificador de origem da sessão do chat. | Define onde investir verba de marketing. |
| **Ticket Médio** | `Receita Total / Número de Vendas (status='Ganho')`. Filtrável por `agent_id`. | Cálculo derivado. | Mostra quem vende melhor, não apenas quem vende mais. |
| **CAC (Custo por Lead)** | `Input Manual de Verba de Mkt / Total de Leads`. | Campo inserido pelo Gestor no Dashboard Financeiro ou via API do Meta Ads. | Essencial para saber a saúde do tráfego pago. |
| **LTV (Lifetime Value)** | Soma histórica de `deal_value` agrupada pelo `customer_phone_id`. | Histórico do banco de dados (CRM interno). | Mostra o valor da retenção vs. aquisição. |
| **Payback (Do Lead)** | `(Receita do Lead - Custo Médio do Lead)`. | Cálculo derivado. | Mostra se a operação se paga no primeiro contato. |

**2. Eficiência Operacional (A Máquina)**

| **Métrica** | **Definição Lógica (Backend)** | **Fonte do Dado** | **Impacto Estratégico** |
| --- | --- | --- | --- |
| **Tempo Médio 1ª Resposta** | Média de `(timestamp_agent_reply - timestamp_client_first_msg)`. **Obs:** Excluir mensagens automáticas/bot. | Log de mensagens (Timestamps). | Impacta o **Badge Velocista**. Define a retenção inicial. |
| **Tempo Médio de Resolução** | Média de `(timestamp_status_closed - timestamp_session_start)`. | Mudança de status para "Resolvido" ou "Venda". | Mede a agilidade do time em limpar a fila. |
| **% Dentro do SLA** | Contagem de chats onde `1ª resposta < SLA_configurado` dividido pelo total. | Comparação com configuração da aba "Geral". | O principal indicador de saúde para o Gestor. |
| **Volume de Conversas** | `count(session_id)` agrupado por dia/semana. | Logs de sessão. | Dimensionamento de equipe (Headcount). |
| **Picos de Demanda** | Heatmap: Contagem de mensagens recebidas agrupadas por `hora_do_dia` e `dia_da_semana`. | Logs de entrada de mensagens. | Define escalas de turno e pausas. |

**3. Qualidade & Risco (O Ralo Financeiro)**

| **Métrica** | **Definição Lógica (Backend)** | **Fonte do Dado** | **Impacto Estratégico** |
| --- | --- | --- | --- |
| **NPS (Net Promoter Score)** | Média das notas (0-10) da pesquisa enviada após `status='Resolvido'`. | Resposta do usuário ao Bot de Pesquisa. | Qualidade percebida pelo cliente. |
| **Taxa de Abandono** | % de chats onde `last_msg_from = client` e `time_elapsed > 24h` sem `agent_reply`. | Varredura de cron job no banco de dados. | **Alerta Crítico:** Mostra dinheiro sendo ignorado. |
| **Clientes "Quentes" sem Atendimento** | Contagem de leads com `Lead Score > 80` (definido pela IA) sem resposta há > `X minutos`. | AI Advisor + Timestamps. | Prioridade máxima para a tela "Visão de Águia". |
| **Taxa de Churn de Atendimento** | % de atendimentos encerrados como "Perdido" ou "Insatisfeito". | Tag selecionada no Encerramento. | Indica falha no script ou produto. |

**4. People / Performance (Gamificação e Time)**

| **Métrica** | **Definição Lógica (Backend)** | **Fonte do Dado** | **Impacto Estratégico** |
| --- | --- | --- | --- |
| **Produtividade (Volume)** | `count(msgs_sent)` + `count(tickets_resolved)` por `agent_id`. | Logs de atividade do usuário. | Identifica quem trabalha mais (mas não necessariamente melhor). |
| **Produtividade (Financeira)** | `sum(deal_value)` por `agent_id`. | Formulário de Finalização. | Define o "Rei do Ranking". |
| **SLA por Atendente** | Média de tempo de resposta filtrada por `agent_id`. | Logs de mensagens. | Identifica o gargalo da equipe. |
| **NPS por Time** | Média de NPS filtrada pelos membros do `team_id` (Ex: Time Vendas vs. Time Suporte). | Agrupamento de notas de NPS. | Competição saudável entre setores. |

# GESTOR/SUPERVISOR

**1. Fila & Capacidade (O Coração da Operação)**

| **Métrica** | **Definição Lógica (Backend)** | **Fonte do Dado** | **Impacto Estratégico** |
| --- | --- | --- | --- |
| **Conversas em fila agora** | `count(sessions)` onde `status = 'waiting_agent'`. | Socket em tempo real / Tabela de sessões ativas. | Visualização imediata do gargalo. |
| **Novas conversas (X h/d)** | `count(unique_session_id)` criados no intervalo de tempo selecionado. | Logs de criação de ticket. | Mede a velocidade de entrada de leads (demanda). |
| **Backlog por etiqueta** | `count(sessions)` agrupado por `tag_id` (Vendas, Suporte, etc.) onde `status != 'closed'`. | Cruzamento de Tabela de Sessões e Tags. | Identifica qual setor da empresa está sobrecarregado (Estoque de conversa). |
| **Capacidade do Time** | `(Soma da capacidade_max_atendentes_online) - (Conversas ativas no momento)`. | Configuração de perfil + Sessões ativas. | Indica se o time suporta novos leads ou se precisa de reforço/IA. |

**2. SLA & Qualidade (A Régua de Excelência)**

| **Métrica** | **Definição Lógica (Backend)** | **Fonte do Dado** | **Impacto Estratégico** |
| --- | --- | --- | --- |
| **Tempo 1ª Resposta (Agente/Time)** | Média de `(1st_msg_timestamp - agent_reply_timestamp)` filtrado por `agent_id` ou `team_id`. | Logs de mensagens. | Diferencia "Atendentes Velocistas" de "Gargalos Humanos". |
| **Tempo de Resolução (Agente/Time)** | Média de `(close_timestamp - session_start_timestamp)` filtrado por `agent_id/team_id`. | Ciclo de vida do ticket. | Mede a eficiência resolutiva. Atendimento rápido não é necessariamente bom se não resolve. |
| **% Dentro do SLA** | `(Chats dentro do tempo limite / Total de chats)` por período. | Comparação com a meta da aba "Geral". | O KPI de governança mais importante para o Gestor. |
| **Abandonos por Agente/Time** | `count(sessions)` onde o cliente saiu/encerrou sem que o agente desse a última resposta. | Status de encerramento automático por timeout. | Identifica falha crítica de atenção ou desinteresse do atendente. |

**3. Performance Comercial (O ROI da Equipe)**

| **Métrica** | **Definição Lógica (Backend)** | **Fonte do Dado** | **Impacto Estratégico** |
| --- | --- | --- | --- |
| **Conversão por Agente/Time** | `(Vendas Ganhas / Total de Leads Atribuídos)` em percentual. | Formulário de Finalização. | Define quem são os "Fechadores Diamante" para o Ranking. |
| **Motivos de Perda (Top 5)** | `count(loss_reason)` agrupado por categoria, ordenado do maior para o menor. | **Campo Obrigatório** no encerramento do chat. | **O Mapa do Ralo:** Diz exatamente por que a empresa está perdendo dinheiro (Preço? Prazo? Produto?). |
| **LTV (Lifetime Value)** | `sum(total_revenue)` agrupado por `unique_customer_id` (telefone/CPF) ao longo de todo o histórico. | Histórico de Vendas (Financeiro/CRM). | **Ouro puro:** Prova que o ChatSAC não só vende uma vez, mas mantém o cliente comprando. |

# ATENDENTE:

**1. Operação Individual (Fila & Foco)**

| **Métrica** | **Definição Lógica (Backend)** | **Fonte do Dado** | **Impacto Estratégico** |
| --- | --- | --- | --- |
| **Minha fila agora** | `count(sessions)` onde `assigned_agent_id = ME` AND `status = 'open'`. | Tabela de Sessões Ativas. | Controle de carga de trabalho individual. |
| **Esperando há mais tempo** | `sort_desc(current_timestamp - last_client_msg_timestamp)` para a fila do agente. | Timestamps de mensagens. | **Foco Total:** Identifica o lead com maior risco de abandono imediato. |
| **"Sem resposta" vs "Aguardando cliente"** | **Sem resposta:** `last_msg_from = client`. **Aguardando:** `last_msg_from = agent`. | Identificador do autor da última mensagem. | Filtra o que é ação do atendente e o que é tempo de espera do lead. |
| **Próximas ações (Follow-up)** | `list(contacts)` onde `followup_date = TODAY`. | Tabela de Agendamentos/Lembretes. | Garante que o lead não suma após o primeiro "não" ou "vou pensar". |

**2. Performance Pessoal (O Ranking em Tempo Real)**

| **Métrica** | **Definição Lógica (Backend)** | **Fonte do Dado** | **Impacto Estratégico** |
| --- | --- | --- | --- |
| **Concluídos hoje** | `count(sessions)` onde `status = 'closed'` AND `closed_at = TODAY`. | Logs de Encerramento. | Alimenta o sentimento de "dever cumprido" e produtividade. |
| **Tempo Médio de Resposta** | Média de `(timestamp_reply - timestamp_incoming)` apenas para as interações do agente logado. | Logs de Interação. | Define a posição do atendente no **Ranking de Velocidade**. |
| **Tempo de Resolução** | Média de `(timestamp_closed - timestamp_opened)` para os tickets do agente. | Ciclo de vida do ticket. | Mede a precisão técnica e capacidade resolutiva. |
| **Meta do Dia** | `(Realizado / Valor_Meta_Gestor) * 100`. | Cruzamento: Dashboard vs. Configuração do Gestor. | **Gamificação:** Mostra a distância para o próximo nível ou bônus. |

**3. Qualidade & Contexto (O "Superpoder" da IA)**

| **Métrica** | **Definição Lógica (Backend)** | **Fonte do Dado** | **Impacto Estratégico** |
| --- | --- | --- | --- |
| **Risco de Perda (Sentimento)** | Análise de sentimentos + `time_elapsed`. Se tom for "irritado" ou delay for alto, atribui `risk_level: High`. | AI Advisor (LLM + Análise de Tom). | **Alerta de Emergência:** Prioriza o atendimento para salvar a venda. |
| **Resumo da conversa** | `LLM_Summary(last_50_messages)`. Gera um parágrafo conciso do que foi tratado. | Motor de IA Generativa. | Permite que o atendente retome o contexto em segundos após uma pausa. |
| **Próxima melhor resposta** | `LLM_Suggest(context + playbook_rules)`. Sugestão de texto pronta para envio. | Intelligence Hub (Playbooks). | Aumenta a **Precisão Técnica** e reduz o tempo de digitação. |