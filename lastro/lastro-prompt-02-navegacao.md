# Lastro — Prompt 2 Lovable
## Escopo: Estrutura de navegação e layout base

---

Cole esse prompt no Lovable APÓS o Prompt 1 estar funcionando.
Pré-requisito: cadastro, login e logout funcionando corretamente.

---

## PROMPT PARA COLAR NO LOVABLE

---

Mantenha tudo que foi criado no prompt anterior — identidade visual, autenticação, rotas.

Agora adicione a estrutura de navegação do app.

---

### Estrutura de rotas — adicionar ao projeto

Crie as seguintes rotas, todas protegidas (redirecionam para `/login` se não estiver logado):

- `/dashboard` → página principal do usuário (já existe — manter)
- `/diagnostico` → onde vai acontecer a conversa do módulo 1 (placeholder por enquanto)
- `/resultado` → onde o usuário vai ver o Lastro Score (placeholder por enquanto)
- `/plano` → onde o usuário vai ver o mapa de GTM — módulo 2 (placeholder por enquanto)
- `/tracker` → onde o usuário vai acompanhar o resultado semanal — módulo 3 (placeholder por enquanto)

---

### Tela Dashboard — substituir o placeholder atual

Fundo `#0D1F1A`. Sem navbar. Sem sidebar. Layout limpo.

Conteúdo centralizado, com padding generoso (60px lateral no desktop):

**Saudação no topo:**
- "Olá." em Georgia, 36px, `#F5F0E8`, peso 500
- Abaixo: "O que você quer descobrir hoje?" em Georgia, 16px, `rgba(245,240,232,0.5)`, itálico

**Bloco de ação principal — abaixo da saudação, com margem de 48px:**

Card com fundo `#1A3A30`, sem borda visível, border-radius 12px, padding 32px:
- Texto: "Diagnóstico de viabilidade" — Georgia, 18px, `#F5F0E8`, peso 500
- Subtexto: "Descubra o que é possível com o seu orçamento antes de investir." — Georgia, 14px, `rgba(245,240,232,0.5)`, itálico
- Botão primário abaixo: "Iniciar diagnóstico →" — ao clicar, vai para `/diagnostico`

**Bloco secundário — abaixo do card principal, com margem de 16px:**

Três cards menores lado a lado (grid 3 colunas, gap 12px), fundo `#1A3A30`, border-radius 8px, padding 20px, opacidade 0.5 (módulos ainda não disponíveis):
- Card 1: "Mapa de GTM" + subtexto "disponível após o diagnóstico"
- Card 2: "Tracker semanal" + subtexto "disponível após o diagnóstico"
- Card 3: "Direção criativa" + subtexto "em breve"

Todos os textos dos cards menores: Georgia, 14px, `rgba(245,240,232,0.4)`

Nenhum dos três cards menores é clicável por enquanto.

**Rodapé mínimo — fixo no fundo da tela:**
- À esquerda: e-mail do usuário logado em Georgia, 12px, `rgba(245,240,232,0.3)`
- À direita: link "sair" em Georgia, 12px, `rgba(245,240,232,0.3)` — ao clicar, logout e redireciona para `/`

---

### Telas placeholder — criar com conteúdo mínimo

Para cada rota nova, crie uma tela simples com fundo `#0D1F1A` e conteúdo centralizado:

**`/diagnostico`**
- Texto: "Módulo 1 — Diagnóstico" — Georgia, 24px, `#1D9E75`
- Subtexto: "A conversa começa aqui." — Georgia, 16px, `rgba(245,240,232,0.5)`, itálico
- Link: "← voltar ao início" — ao clicar, vai para `/dashboard`

**`/resultado`**
- Texto: "Seu Lastro Score" — Georgia, 24px, `#1D9E75`
- Subtexto: "Complete o diagnóstico para ver seu resultado." — Georgia, 16px, `rgba(245,240,232,0.5)`, itálico
- Link: "← voltar ao início"

**`/plano`**
- Texto: "Mapa de GTM" — Georgia, 24px, `#1D9E75`
- Subtexto: "Disponível após o diagnóstico." — Georgia, 16px, `rgba(245,240,232,0.5)`, itálico
- Link: "← voltar ao início"

**`/tracker`**
- Texto: "Tracker semanal" — Georgia, 24px, `#1D9E75`
- Subtexto: "Disponível após o diagnóstico." — Georgia, 16px, `rgba(245,240,232,0.5)`, itálico
- Link: "← voltar ao início"

---

### O que NÃO fazer

- Não adicionar navbar, menu hamburguer ou sidebar
- Não criar mais rotas além das definidas
- Não implementar nenhuma lógica de diagnóstico ainda
- Não conectar ao banco de dados ainda
- Não alterar nada da autenticação que já funciona
- Não usar cores fora da paleta definida
- Não usar fontes sans-serif — só Georgia

---

### Resultado esperado

Ao final desse prompt, o Lovable deve ter:
- Dashboard reformulado com a saudação e os cards
- 4 novas rotas protegidas com placeholders limpos
- Navegação funcionando entre dashboard e as rotas
- Logout funcionando no rodapé
- Zero funcionalidade de diagnóstico — só estrutura

O próximo prompt vai implementar a conversa cinematográfica do módulo 1.
