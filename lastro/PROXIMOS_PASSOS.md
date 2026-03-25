# Lastro — Próximos Passos

**Atualizado:** Março 2026
**Status geral:** Produto estrategicamente definido · Iniciando fase de construção

---

## O que fazer AGORA — antes de abrir o Lovable

### 1. Finalizar os prompts da Anthropic API
**Arquivo:** `tecnico/PROMPTS_IA.md`
**Status:** Rascunho estrutural pronto — falta testar com casos reais
**Ação:** Testar cada prompt com 10 respostas reais da agência e validar os JSONs retornados
**Tempo estimado:** 2 a 4 horas

### 2. Montar o banco no Supabase
**Arquivo:** `tecnico/ARQUITETURA.md` (seção "Modelo de dados")
**Ação:** Criar as tabelas pelo painel visual do Supabase:
- Tabela `diagnostico` com todos os campos tipados
- Tabela `cac_benchmark` com os 15 nichos da tabela de CAC
- Tabela `resultado_semanal`
**Tempo estimado:** 3 a 4 horas

### 3. Popular a tabela de CAC no Supabase
**Arquivo:** `tecnico/CAC_NICHOS.md`
**Ação:** Inserir os 15 nichos com todos os campos via painel do Supabase
**Tempo estimado:** 1 hora

---

## O que fazer EM SEGUIDA — desenvolvimento

### Fase 1: Setup (semana 1)
- [ ] Criar projeto no Supabase
- [ ] Criar tabelas (ver arquitetura)
- [ ] Configurar autenticação (e-mail + Google)
- [ ] Popular tabela de CAC

### Fase 2: Módulo 1 no Lovable (semanas 2–3)
- [ ] Usar o prompt base do UX_FLUXO.md para gerar o formulário
- [ ] Conectar ao Supabase
- [ ] Validar que cada resposta está sendo salva corretamente

### Fase 3: Edge Functions (semanas 3–4)
- [ ] `processar-respostas-abertas` — chama os 4 prompts da Anthropic API
- [ ] `calcular-score` — fórmula do Lastro Score
- [ ] Testar com casos reais antes de conectar ao Lovable

### Fase 4: Tela de resultado (semana 4)
- [ ] Score animado
- [ ] 4 dimensões com barras progressivas
- [ ] Relatório em texto gerado pela IA
- [ ] CTA para módulo 2 (bloqueado se score < 40)

### Fase 5: Módulo 2 no Lovable (semanas 4–5)
- [ ] Pergunta "clientes pagando?"
- [ ] `gerar-plano-gtm` Edge Function
- [ ] Tela de canais recomendados com justificativa
- [ ] Plano de 90 dias

### Fase 6: Módulo 3 + n8n (semanas 5–6)
- [ ] Dashboard do tracker semanal
- [ ] `calcular-desvio` Edge Function
- [ ] Workflows n8n para dias 7, 30 e 60
- [ ] E-mails via Resend

### Fase 7: Beta fechado (semanas 7–8)
- [ ] 10 a 20 usuários reais
- [ ] Ajustar prompts da IA com base em respostas reais
- [ ] Ajustar pesos do score se necessário
- [ ] Corrigir bugs

---

## O que fazer na FASE 2 — após MVP validado

- [ ] Detalhar M4 a M9 um por um (outputs, prompts, UX)
- [ ] Construir M4 — Direção de Arte no Lovable
- [ ] Construir M5 — Direção de Webdesign
- [ ] Construir M6 — Direção Executiva
- [ ] Construir M7 — Direção de Social Media
- [ ] Construir M8 — Direção de Gravações
- [ ] Construir M9 — Copy e Narrativa
- [ ] Lançar plano Direção (R$197) apenas após M4–M9 prontos

## O que fazer na FASE 3 — após fase 2 validada

- [ ] Detalhar M10 a M13
- [ ] Construir M10 — Direção de Tráfego Pago
- [ ] Construir M11 — Diagnóstico de Funil
- [ ] Construir M12 — Direção de Lançamento
- [ ] Construir M13 — Inteligência de Mercado (depende de dados acumulados)
- [ ] Lançar plano Completo (R$397) apenas após M10–M13 prontos

## O que fazer PRÉ-LANÇAMENTO PÚBLICO

- [ ] Estratégia de aquisição dos primeiros 100 usuários
- [ ] Termos de uso e política de privacidade
- [ ] Métricas de sucesso do produto definidas
- [ ] Plano de conteúdo (build in public / LinkedIn)

---

## O que fica para PÓS-MVP

- [ ] Integração Meta Ads API (v2)
- [ ] Plano Agência com white-label
- [ ] Relatório público trimestral de CAC por nicho
- [ ] Google Ads API (v3)
- [ ] App mobile

---

## Regras do projeto

1. **Não adicionar feature antes de validar as existentes** — escopo controlado até o beta
2. **Prompts da IA têm versão** — nunca sobrescrever, sempre criar nova versão
3. **Tabela de CAC é editável sem deploy** — via painel Supabase
4. **Objeto de diagnóstico é único** — usuário nunca repete informação entre módulos
5. **Score < 40 bloqueia módulo 2** — não é opcional, é o produto sendo fiel a si mesmo

---

## Como retomar uma sessão

Cole o conteúdo do arquivo `LEIA_PRIMEIRO.md` e diga:
> "Estou retomando o projeto Lastro. Leia o contexto e me ajude a continuar."

Para contexto mais profundo, carregue também o arquivo da área específica.
