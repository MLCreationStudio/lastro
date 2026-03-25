# Lastro — Sistema de Memória do Projeto
**Versão:** 3.0 · **Atualizado:** Março 2026

## Como usar esse sistema

Ao iniciar uma nova sessão, cole o conteúdo desse arquivo e diga:
> "Estou retomando o projeto Lastro. Leia o contexto e me ajude a continuar de onde paramos."

Para contexto mais profundo sobre um tema específico, carregue também o arquivo da categoria relevante.

---

## Quem é você

- **Perfil:** Head de produto do ChurnDefense e do Chatsac
- **Empresa:** ML Creation Studio (CNPJ ativo, sem custo)
- **Localização:** São Paulo, Brasil
- **Perfil técnico:** Estratégia — não execução. Tem time de suporte.
- **Desenvolvimento:** Lovable + Supabase + agentes de IA + n8n + Resend

---

## O projeto em uma frase

**Lastro** é o sistema operacional de marketing para pequenos e médios negócios brasileiros. Diagnostica a viabilidade, define a estratégia, direciona a criação e monitora o resultado — tudo em linguagem que qualquer humano consegue executar.

---

## O produto — visão atual (v2)

**13 módulos em 3 fases:**

| Fase | Módulos | Camada | Status |
|------|---------|--------|--------|
| 1 — MVP | M1, M2, M3 | Diagnóstico + GTM + Tracker | ✅ Detalhados |
| 2 — Direção | M4–M9 | Arte · Web · Executivo · Social · Gravações · Copy | 🔲 A construir |
| 3 — Inteligência | M10–M13 | Tráfego · Funil · Lançamento · Mercado | 🔲 A construir |

**Posicionamento atual:**
> "O único produto que pensa o marketing inteiro — antes de qualquer humano executar."

---

## Status de desenvolvimento

| Área | Status |
|------|--------|
| Problema e origem | ✅ Definido |
| Nome e posicionamento | ✅ Definido |
| Módulos 1, 2 e 3 | ✅ Detalhados |
| Módulos 4 a 13 | ✅ Conceituados — outputs definidos |
| Lastro Score — fórmula | ✅ Definido |
| Loop de feedback | ✅ Definido |
| Dado proprietário / moat | ✅ Definido |
| Modelo de preço v2 | ✅ Definido |
| Arquitetura técnica | ✅ Definida |
| UX / fluxo de telas | ✅ Definido (Zero UI cinematográfico) |
| Tabela de CAC por nicho | ✅ Construída (15 nichos) |
| Prompts da Anthropic API | 🔲 Rascunho pronto — falta testar |
| Banco Supabase | 🔲 A criar |
| Primeiro prompt Lovable | 🔲 A fazer |
| Módulos 4–13 detalhados | 🔲 A detalhar um por um |

---

## Modelo de preço (v2)

| Plano | Preço | Módulos | Público |
|-------|-------|---------|---------|
| Grátis | R$0 | M1 | Experimentar |
| Estratégia | R$79/mês | M1+M2+M3+M7 | Executando |
| Direção ⭐ | R$197/mês | M1–M9 | Founders sérios |
| Completo | R$397/mês | M1–M13 | Sistema total |
| Agência | R$597/mês | M1–M13 white-label | Agências B2B |

**MRR projetado mês 18:** R$88.410 (cenário conservador)

---

## Stack técnico

| Ferramenta | Papel |
|-----------|-------|
| Lovable | Construção do produto (UI + lógica) |
| Supabase | Banco + autenticação + Edge Functions |
| Anthropic API (Claude) | IA do produto — processa respostas abertas |
| n8n | Automação do loop de feedback |
| Resend | E-mails dos touchpoints |
| Agentes de IA | Co-desenvolvimento — Edge Functions e debug |

---

## Arquivos do sistema de memória

| Arquivo | Conteúdo |
|---------|----------|
| `produto/PRODUTO.md` | Módulos 1–3 completos, score, loop, fluxo de dados |
| `produto/MODULOS.md` | Todos os 13 módulos com outputs e dependências |
| `produto/POSICIONAMENTO.md` | Nome, tom de voz, identidade visual |
| `produto/PRECO.md` | Modelo de preço v2 — 5 planos com lógica e MRR |
| `tecnico/ARQUITETURA.md` | Stack, modelo de dados, Edge Functions |
| `tecnico/CAC_NICHOS.md` | Tabela de CAC — 15 nichos BR |
| `tecnico/PROMPTS_IA.md` | Os 4 prompts da Anthropic API |
| `mercado/MERCADO.md` | Oportunidade, concorrentes, moat |
| `ux/UX_FLUXO.md` | Fluxo tela a tela, Zero UI, prompt Lovable |
| `operacional/PROXIMOS_PASSOS.md` | O que fazer agora, em ordem |
| `operacional/AQUISICAO_LANCAMENTO.md` | Estratégia de aquisição e lançamento — 4 fases, canais, calendário |

---

## Próxima ação imediata

**Testar os 4 prompts da Anthropic API** com casos reais da agência.
Arquivo: `tecnico/PROMPTS_IA.md`

Depois: criar o banco no Supabase com base em `tecnico/ARQUITETURA.md`

---

## Regras do projeto (não negociáveis)

1. M1 sempre gratuito e completo — o diagnóstico é a porta de entrada
2. Score < 40 bloqueia M2 — o produto sendo fiel a si mesmo
3. Módulos posteriores dependem do M1 — sem diagnóstico, sem direção
4. Prompts da IA têm versão — nunca sobrescrever
5. Fase 2 só lança quando pronta — nunca vender o que não existe
6. Tabela de CAC editável sem deploy — via painel Supabase
7. Objeto de diagnóstico único — usuário nunca repete informação
