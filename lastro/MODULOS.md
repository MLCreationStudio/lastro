# Lastro — Os 13 Módulos

**Versão:** 2.0 · Março 2026
**Lógica central:** Módulos posteriores dependem do M1. Sem diagnóstico, sem direção.

---

## Visão geral por fase

| Fase | Módulos | Nome da camada | Status |
|------|---------|---------------|--------|
| 1 — MVP | M1, M2, M3 | Base — diagnóstico e execução | ✅ Detalhados |
| 2 — Direção | M4, M5, M6, M7, M8, M9 | Direção estratégica e criativa | 🔲 A detalhar |
| 3 — Inteligência | M10, M11, M12, M13 | Inteligência e especialização | 🔲 A detalhar |

---

## FASE 1 — Base (MVP)

### Módulo 1 — Diagnóstico de viabilidade
**O que faz:** 9 perguntas em conversa cinematográfica → Lastro Score → relatório de viabilidade
**Output:** Score 0–100 · zonas · relatório · alerta de desalinhamento
**Detalhe completo:** ver `produto/PRODUTO.md`

### Módulo 2 — Mapa de GTM
**O que faz:** Recebe diagnóstico → seleciona canais → gera plano de 90 dias
**Output:** Ranking de canais com justificativa · plano semana a semana · métricas
**Detalhe completo:** ver `produto/PRODUTO.md`
**Regra:** Bloqueado se score < 40

### Módulo 3 — Tracker de resultado vs expectativa
**O que faz:** Monitora resultado real vs meta projetada · diagnostica causa de desvio
**Output:** Status semanal · diagnóstico de causa · Lastro Score atualizado
**Detalhe completo:** ver `produto/PRODUTO.md`

---

## FASE 2 — Direção estratégica e criativa

### Módulo 4 — Direção de Arte
**O que faz:** Com base no posicionamento e ICP do diagnóstico, gera a direção visual completa do negócio. Elimina 3 rodadas de revisão com o designer.
**Inputs do M1:** nicho · ICP · diferencial · tom de voz inferido
**Output:**
- Paleta de cores com justificativa estratégica (não estética)
- Tipografia recomendada por contexto de uso
- Mood board em texto descritivo — o que o visual precisa transmitir
- Referências de estética com link ou descrição
- O que NUNCA fazer visualmente — baseado no público e no mercado
- Tom visual: formal/informal · denso/leve · humano/institucional
**Entrega para:** Designer gráfico ou social media

### Módulo 5 — Direção de Webdesign
**O que faz:** Gera o briefing completo para landing pages e sites. O webdesigner monta — a estratégia já está decidida.
**Inputs do M1:** produto · ICP · diferencial · CTA principal · canal de tráfego
**Output:**
- Estrutura de seções com ordem estratégica
- Copy de cada bloco (headline, subheadline, corpo, CTA)
- Hierarquia de informação — o que o usuário vê primeiro
- CTAs com texto exato e posicionamento
- O que o usuário precisa sentir em cada scroll
- Meta de conversão por seção
- Elementos de prova social recomendados
**Entrega para:** Webdesigner ou desenvolvedor no-code (Webflow, Framer)

### Módulo 6 — Direção Executiva (CEO/CFO/CMO)
**O que faz:** Traduz o diagnóstico de marketing em linguagem de negócio para aprovação de budget e alinhamento de liderança.
**Inputs do M1:** score completo · budget · meta · plano de GTM
**Output:**
- Resumo executivo em 1 página
- Projeção de ROI com cenário conservador e otimista
- Risco financeiro do não investimento
- Plano de 90 dias em linguagem C-level (sem jargão de marketing)
- Métricas que o board entende: CAC, LTV, payback period
- Aprovação de budget com justificativa por canal
**Entrega para:** CEO/CFO/CMO para apresentação ao board ou aprovação interna

### Módulo 7 — Direção de Social Media
**O que faz:** Estratégia completa de conteúdo derivada do ICP e do canal recomendado. O social media manager recebe direção — não achismo.
**Inputs do M1:** ICP · nicho · tom de voz · canal principal · prazo
**Output:**
- 3 a 5 pilares editoriais com descrição e exemplos
- Frequência por plataforma recomendada
- Formato por rede (Reels, carrossel, estático, story)
- Calendário editorial de 30 dias com temas específicos
- Tom de voz por rede (Instagram ≠ LinkedIn ≠ TikTok)
- Métricas de acompanhamento por pilar
- O que nunca postar baseado no ICP
**Entrega para:** Social media manager ou gestor de conteúdo

### Módulo 8 — Estratégia e Direção de Gravações
**O que faz:** Roteiro estratégico de vídeos e fotos em ordem de prioridade. O produtor e editor recebem direção criativa clara.
**Inputs do M1:** produto · ICP · canal · pilares editoriais (M7)
**Output:**
- Lista priorizada de conteúdos a gravar (do mais urgente ao menos)
- Gancho de abertura para cada vídeo (primeiros 3 segundos)
- Narrativa central de cada conteúdo
- CTA no final de cada vídeo
- Duração ideal por plataforma
- Especificações técnicas: formato, proporção, legenda
- Roteiro de apresentação da marca (vídeo institucional)
**Entrega para:** Produtor de conteúdo, videomaker ou o próprio dono

### Módulo 9 — Direção de Copy e Narrativa de Marca
**O que faz:** Gera a voz da marca em linguagem executável. Tudo derivado do diagnóstico — não inventado do zero pelo copywriter.
**Inputs do M1:** produto · ICP · diferencial · tom de voz · canal
**Output:**
- Tagline principal + 3 variações
- Headline principal (para landing page, anúncio, bio)
- Pitch de 30 segundos (oral e escrito)
- Pitch de 2 minutos completo
- Copy de anúncio por canal (Meta, Google, LinkedIn)
- E-mail de prospecção para outbound
- Bio para cada rede social
- Mensagem de apresentação via WhatsApp
**Entrega para:** Copywriter, gestor de tráfego ou o próprio dono

---

## FASE 3 — Inteligência e especialização

### Módulo 10 — Direção de Tráfego Pago
**O que faz:** Briefing completo de campanha para o gestor de tráfego. Estrutura, segmentação, copy e critérios de escala — tudo derivado do diagnóstico.
**Inputs do M1+M2:** canal recomendado · CAC estimado · budget_midia · ICP · copy (M9)
**Output:**
- Estrutura de campanhas e conjuntos de anúncios
- Públicos por prioridade (frio, morno, quente, lookalike)
- Copy de cada anúncio (headline + primary text + descrição)
- Budget por conjunto com critério de redistribuição
- Métricas de aprovação de criativo (CPL máximo, CTR mínimo)
- Critérios de escala: quando dobrar, quando pausar
- Critérios de reprovação: quando matar o conjunto
**Entrega para:** Gestor de tráfego pago

### Módulo 11 — Diagnóstico de Funil e Conversão
**O que faz:** Identifica onde o funil está quebrando — não só topo (anúncios), mas meio (nutrição) e fundo (fechamento). Conecta naturalmente com o ChurnDefense.
**Inputs do M1+M3:** resultado real por etapa · CAC real · taxa de conversão observada
**Output:**
- Mapa visual do funil atual com taxas reais
- Gargalo principal identificado (topo / meio / fundo)
- Custo do gargalo em reais por mês
- Plano de correção específico por etapa
- Métricas de acompanhamento pós-correção
- Flag de integração com ChurnDefense (quando relevante)
**Entrega para:** Dono do negócio ou gestor de marketing

### Módulo 12 — Direção de Lançamento
**O que faz:** Plano completo para lançamento de produto, serviço ou campanha sazonal. Do pré-aquecimento ao pós-venda.
**Inputs do M1+M2:** produto · ICP · canal · copy (M9) · plano de 90 dias
**Output:**
- Cronograma de lançamento com datas e marcos
- Fase de pré-aquecimento: conteúdos e frequência
- Data e hora de abertura com justificativa
- Sequência de conteúdos por fase (pré · lançamento · urgência · fechamento)
- Urgência legítima — baseada no produto, não inventada
- Sequência de e-mails e mensagens WhatsApp por fase
- Plano B: o que fazer se não bater 50% da meta no dia 1
**Entrega para:** Dono do negócio, gestor ou produtor de lançamento

### Módulo 13 — Relatório de Inteligência de Mercado
**O que faz:** Com os dados acumulados de todos os usuários do mesmo nicho, gera um relatório de inteligência proprietária. O módulo que transforma dado em autoridade de mercado.
**Inputs:** Dados agregados e anonimizados de todos os diagnósticos do nicho
**Output:**
- O que está funcionando no nicho agora (canais, formatos, mensagens)
- O que parou de funcionar nos últimos 90 dias
- Tendências de CAC por canal no nicho
- Canais emergentes e canais em declínio
- Benchmarks atualizados de CPL e CAC com dado real
- 3 experimentos recomendados para testar nos próximos 30 dias
**Entrega para:** Dono do negócio (plano Completo) · Agências (relatório white-label)
**Nota:** Esse módulo é o que justifica o relatório público trimestral do Lastro

---

## Regras de dependência entre módulos

```
M2 depende de: M1 completo + score ≥ 40
M3 depende de: M2 concluído
M4 depende de: M1 completo (nicho + ICP + diferencial)
M5 depende de: M1 + M4 (direção visual antes de webdesign)
M6 depende de: M1 + M2 (precisa do plano de GTM para ROI)
M7 depende de: M1 + M2 (canal recomendado define plataforma)
M8 depende de: M1 + M7 (pilares editoriais antes de roteiros)
M9 depende de: M1 (produto + ICP + diferencial)
M10 depende de: M1 + M2 + M9 (copy antes de campanha)
M11 depende de: M1 + M3 (precisa de dado real do tracker)
M12 depende de: M1 + M2 + M9 (plano + copy antes de lançamento)
M13 depende de: dados agregados de múltiplos usuários do nicho
```
