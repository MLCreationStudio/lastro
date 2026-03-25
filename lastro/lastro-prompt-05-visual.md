# Lastro — Prompt 5 Lovable
## Escopo: Refatoração visual completa — design cinematográfico premium

---

Cole esse prompt APÓS os Prompts 1, 2, 3 e 4 estarem funcionando.
Pré-requisito: autenticação, navegação, conversa e score funcionando corretamente.

IMPORTANTE: Esse prompt NÃO altera nenhuma lógica, nenhuma rota, nenhuma
integração com Supabase. Ele APENAS refatora o visual de todas as telas.
Se algo parar de funcionar após esse prompt, reverta só o CSS/visual.

---

## PROMPT PARA COLAR NO LOVABLE

---

Mantenha toda a lógica, rotas e integração com Supabase dos prompts anteriores.

Refatore completamente o visual do app para o padrão abaixo.
Não altere nenhuma função, nenhum handler, nenhuma chamada ao Supabase.
Só CSS, fontes, cores, espaçamentos e estrutura HTML visual.

---

### Fontes — importar no topo do projeto

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

Regra global de fontes:
- Títulos, perguntas da conversa, score, saudações → `DM Serif Display`, serif
- Todo o resto → `Inter`, sans-serif

---

### Design tokens — aplicar globalmente

```css
--bg-base: #080f0c;
--bg-surface: #0e1a14;
--bg-deep: #0a1410;
--green: #1D9E75;
--green-dim: rgba(29, 158, 117, 0.12);
--green-text: rgba(29, 158, 117, 0.8);
--text-primary: #f0f5f2;
--text-secondary: rgba(232, 240, 235, 0.45);
--text-muted: rgba(232, 240, 235, 0.2);
--border-subtle: rgba(232, 240, 235, 0.05);
--border-green: rgba(29, 158, 117, 0.15);
```

Background de TODAS as telas: `var(--bg-base)` — `#080f0c`

---

### Tela de entrada (landing / `/`)

Layout: tela cheia, conteúdo centralizado vertical e horizontalmente.

**Eyebrow acima do título:**
```
diagnóstico · estratégia · direção
```
- `Inter`, 11px, `#1D9E75`, letter-spacing 0.16em, uppercase
- Flanqueado por duas linhas de 24px em `#1D9E75` com opacidade 0.5
- Margem inferior: 24px

**Título principal:**
```
Lastro.
```
- `DM Serif Display`, 72px, `#f0f5f2`, weight 400, letter-spacing -0.02em
- O ponto final em `#1D9E75`, font-style italic
- Margem inferior: 16px

**Subtítulo:**
```
Marketing com base real. Descubra o que é possível
antes de investir um centavo.
```
- `Inter`, 16px, `rgba(232,240,235,0.45)`, weight 300, line-height 1.6
- Max-width: 380px, centralizado
- Margem inferior: 48px

**Botões (dois, lado a lado, centralizados, gap 12px):**

Botão primário "iniciar diagnóstico":
- Background: `#1D9E75`
- Texto: `#080f0c`, Inter, 13px, weight 500, letter-spacing 0.01em
- Padding: 12px 28px, border-radius 8px, sem borda
- Hover: opacity 0.85

Botão ghost "entrar":
- Background: transparente
- Texto: `rgba(232,240,235,0.45)`, Inter, 13px, weight 400
- Border: 1px solid `rgba(232,240,235,0.12)`
- Padding: 12px 24px, border-radius 8px
- Hover: border-color `rgba(232,240,235,0.25)`, texto `rgba(232,240,235,0.7)`

**Badges abaixo dos botões (margem-top 48px):**
- Quatro pills: "diagnóstico de viabilidade" · "mapa de gtm" · "direção criativa" · "tracker semanal"
- Inter, 11px, `rgba(232,240,235,0.3)`, border `1px solid rgba(232,240,235,0.08)`
- Padding: 4px 12px, border-radius 99px
- Dispostos em linha com gap 8px, centralizados

---

### Tela de conversa (`/diagnostico`)

**Topo da tela:**

Logo à esquerda:
- `DM Serif Display`, 18px, `#1D9E75`, font-style italic
- Texto: "Lastro."

Indicador de etapa à direita:
- Inter, 11px, `rgba(232,240,235,0.25)`, letter-spacing 0.06em
- Exemplo: "3 de 9"

Barra de progresso:
- Logo abaixo do topo, largura 100%
- Trilho: 1px de altura, `rgba(232,240,235,0.06)`
- Preenchimento: 1px, `#1D9E75`, transição `width 0.5s cubic-bezier(0.4,0,0.2,1)`

**Área de conversa:**
- Padding: 48px 80px
- Gap entre pares pergunta+resposta: 32px

Pergunta:
- `DM Serif Display`, 22px, `#f0f5f2`, line-height 1.45, max-width 520px, weight 400

Cursor piscando após a pergunta:
- Retângulo de 2px × 18px, cor `#1D9E75`
- Animação: opacity alternando 0↔1 em 0.65s

Resposta do usuário:
- Inter, 15px, `rgba(29,158,117,0.9)`, line-height 1.6
- Padding-left: 18px
- Border-left: 1.5px solid `#1D9E75`
- Max-width: 480px

**Input fixo no fundo:**
- Separador no topo: 1px solid `rgba(232,240,235,0.05)`
- Padding: 24px 80px 32px

Campo de texto:
- Fundo transparente, sem borda
- `DM Serif Display`, 17px, `#e8f0eb`
- Placeholder: "escreva sua resposta..." em `rgba(232,240,235,0.18)`
- Caret: `#1D9E75`

Botão enviar:
- Fundo transparente
- Border: 1px solid `rgba(29,158,117,0.3)`
- Texto: "enviar", Inter, 12px, `#1D9E75`, letter-spacing 0.04em
- Border-radius: 6px, padding: 6px 16px
- Hover: background `rgba(29,158,117,0.08)`, border `rgba(29,158,117,0.5)`

**Tela de processamento (entre conversa e resultado):**
- Fundo `#080f0c`, tela cheia, centralizado
- Três frases que aparecem e somem em sequência:
  1. "Analisando seu negócio..."
  2. "Calculando o que é possível..."
  3. "Preparando seu diagnóstico..."
- `DM Serif Display`, 18px, `rgba(232,240,235,0.6)`, font-style italic
- Cada frase aparece com fade-in, fica 1.2s, depois fade-out
- A terceira permanece até redirecionar

---

### Tela de resultado (`/resultado`)

Layout: tela cheia, centralizado, padding 60px.

**Label acima do score:**
- "Lastro Score"
- Inter, 11px, `rgba(232,240,235,0.3)`, letter-spacing 0.14em, uppercase
- Margem inferior: 20px

**O número:**
- `DM Serif Display`, 120px, `#1D9E75`, weight 400, letter-spacing -0.02em
- Animado: conta de 0 até o valor real em 1.5s (easing ease-out)

**Label da zona:**
- Abaixo do número, margem-top 8px
- Inter, 12px, `rgba(29,158,117,0.6)`, letter-spacing 0.1em, uppercase
- Texto baseado na zona: "pronto para executar" / "viável com ressalvas" / "ajuste necessário" / "crítico"

**Frase do diagnóstico:**
- Margem-top: 32px
- `DM Serif Display`, 20px, `#f0f5f2`, font-style italic, max-width 440px
- Line-height 1.5, centralizado
- Aparece letra por letra após o contador terminar (18ms/char)

**As 4 dimensões:**
- Margem-top: 40px, max-width 400px, centralizado
- Gap entre linhas: 12px

Cada linha:
- Nome à esquerda: Inter, 12px, `rgba(232,240,235,0.35)`, min-width 160px, letter-spacing 0.01em
- Trilho no centro: flex-1, 1px de altura, `rgba(232,240,235,0.08)`
- Barra de preenchimento: 1px, `#1D9E75`, transição `width 1.1s cubic-bezier(0.4,0,0.2,1)`
- Valor à direita: Inter, 12px, `rgba(29,158,117,0.8)`, min-width 28px

As barras preenchem uma após a outra com 160ms de intervalo, começando 1.2s após o score terminar.

**CTA:**
- Margem-top: 40px
- Botão primário "ver meu mapa de GTM →" (mesma estilização do primário da landing)
- Link abaixo "refazer diagnóstico": Inter, 12px, `rgba(232,240,235,0.25)`, margem-top 14px
- Se zona = crítico: substituir botão primário por ghost + texto explicativo

---

### Tela dashboard (`/dashboard`)

Layout: padding 48px, sem navbar, sem sidebar.

**Topo:**
- Logo "Lastro." à esquerda: `DM Serif Display`, 22px, `#1D9E75`, italic
- Botão "sair" à direita: Inter, 11px, `rgba(232,240,235,0.2)`, sem borda, hover `rgba(232,240,235,0.4)`

**Saudação:**
- Margem-top: 56px
- "Olá." — `DM Serif Display`, 48px, `#f0f5f2`, weight 400
- Subtexto "O que você quer descobrir hoje?" — Inter, 14px, `rgba(232,240,235,0.35)`, weight 300
- Margem-bottom: 48px

**Card principal de diagnóstico:**
- Background: `#0e1a14`
- Border: 1px solid `rgba(29,158,117,0.12)`
- Border-radius: 14px, padding: 32px
- Hover: border-color `rgba(29,158,117,0.3)`, transição 0.2s
- Cursor: pointer

Dentro do card:
- Tag "módulo 1" com linha antes: Inter, 11px, `#1D9E75`, uppercase, letter-spacing 0.1em, linha de 16px em `#1D9E75` antes
- Título "Diagnóstico de viabilidade": `DM Serif Display`, 26px, `#f0f5f2`, weight 400, margem-top 16px
- Descrição: Inter, 14px, `rgba(232,240,235,0.4)`, weight 300, line-height 1.6, margem: 8px 0 24px
- CTA inline "iniciar diagnóstico →": Inter, 13px, `#1D9E75`

**Grid de módulos bloqueados (3 colunas, gap 10px):**
- Cada card: background `#0a1410`, border `1px solid rgba(232,240,235,0.05)`, border-radius 10px, padding 20px
- Opacity: 0.4 (não clicável)
- Nome do módulo: Inter, 13px, `#f0f5f2`, weight 500
- Descrição: Inter, 11px, `rgba(232,240,235,0.3)`, margem-top 6px, line-height 1.5

Módulos:
1. "Mapa de GTM" · "disponível após o diagnóstico"
2. "Direção criativa" · "disponível após o diagnóstico"
3. "Tracker semanal" · "disponível após o diagnóstico"

---

### Telas placeholder (`/plano`, `/tracker`)

Mesma estrutura: fundo `#080f0c`, centralizado.

- Logo "Lastro." no topo esquerdo: `DM Serif Display`, 18px, `#1D9E75`, italic
- Título da seção: `DM Serif Display`, 32px, `#1D9E75`, weight 400
- Subtexto: `DM Serif Display`, 16px, `rgba(232,240,235,0.4)`, italic
- Link "← voltar": Inter, 12px, `rgba(232,240,235,0.25)`, margem-top 32px

---

### Regras absolutas — não violar

1. Sem gradientes, sem sombras, sem blur em nenhum elemento
2. Sem navbar ou sidebar em nenhuma tela
3. Sem fonte sans-serif nos títulos e perguntas — só DM Serif Display
4. Sem cores fora da paleta definida acima
5. Sem bordas arredondadas acima de 14px (exceto pills que usam 99px)
6. Não alterar nenhuma lógica, rota ou integração Supabase
7. Background sempre `#080f0c` — nunca branco, nunca cinza

---

### Resultado esperado

Ao final desse prompt, o app deve ter:
- Identidade visual consistente em todas as telas
- DM Serif Display nos títulos e na conversa
- Inter no corpo, botões e labels
- Paleta `#080f0c` / `#1D9E75` / `#f0f5f2` aplicada globalmente
- Micro-interações: hover nos cards, transição nas barras de progresso, cursor piscando
- Toda a lógica funcionando exatamente como antes

O app deve parecer um produto premium — não um template.
