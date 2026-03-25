# Lastro — UX e Fluxo de Telas

## Filosofia de design

**Zero UI Cinematográfico**

O produto some. O usuário não vê interface — vive uma experiência.
Essa escolha é coerente com o posicionamento: um produto que promete clareza
não pode ter uma interface confusa.

---

## Dispositivo

**Desktop primeiro** — web app responsivo como objetivo futuro.

---

## Identidade visual da interface

- Fundo: `#0D1F1A` (verde escuro profundo)
- Texto principal: `#F5F0E8` (creme)
- Destaque / cursor: `#1D9E75` (teal)
- Tipografia: Georgia (serif) — incomum em produto digital, transmite seriedade
- Sem bordas decorativas, sem cards, sem ícones
- Texto aparece letra por letra — ritmo de conversa, não de formulário

---

## Fluxo completo — tela a tela

### Tela 0 — Entrada
- Fundo escuro total
- Logo "Lastro" centralizado em teal
- Frase animada: "Marketing com base real."
- Botão único: "Começar diagnóstico"
- Sem menu, sem navbar, sem ruído

### Tela 1 — Cadastro / Login
- Fundo escuro mantido
- Campo de e-mail + botão "entrar com Google"
- Sem formulário longo — máximo 2 campos
- Texto: "Seu diagnóstico fica salvo. Sempre."

### Telas 2 a 10 — Conversa cinematográfica (Módulo 1)
- Fundo escuro total
- Pergunta aparece letra por letra (velocidade ~20ms/caractere)
- Cursor piscando verde no final da pergunta
- Campo de resposta embaixo — linha simples, sem borda visível
- Placeholder: "escreva sua resposta..."
- Botão "enviar" ou Enter para avançar
- Resposta anterior fica visível acima em verde — cria histórico da conversa
- Barra de progresso discreta no topo (2px, verde)
- Indicador "3 de 9" no canto superior direito
- Sem botão "voltar" — a conversa flui para frente

### Tela 11 — Processando
- Fundo escuro
- Frase animada: "Analisando seu negócio..."
- Depois: "Calculando o que é possível..."
- Depois: "Preparando seu diagnóstico..."
- Sem spinner, sem barra de loading — só texto aparecendo e sumindo
- Dura 3 a 5 segundos (tempo real de processamento da IA)

### Tela 12 — Resultado — Lastro Score (Módulo 1)
- Fundo escuro mantido
- Número do score cresce animado de 0 até o valor real (duração: 1,5s)
- Abaixo: uma frase em Georgia descrevendo o diagnóstico
- Abaixo: as 4 dimensões com barras que se preenchem progressivamente
- Abaixo: resumo do que é possível e do que não é, em linguagem humana
- CTA: "Ver meu mapa de GTM →" (bloqueado se score < 40)
- Se score < 40: mensagem honesta de por que o módulo 2 está bloqueado + o que ajustar

### Tela 13 — Transição para Módulo 2
- Fundo escuro
- Uma pergunta em estilo conversa: "Você já tem clientes pagando?"
- Duas opções clicáveis: "Sim, tenho" / "Ainda não"
- Sem explicação do por que — a pergunta é direta

### Tela 14 — Gerando mapa
- Fundo escuro
- Frases aparecem uma a uma, pausadamente:
  - "Analisando seus canais..."
  - "Aplicando as regras para o seu contexto..."
  - "Montando seu plano..."
- Tom: deliberado, quase tenso — o usuário sente que algo importante está sendo calculado

### Tela 15 — Mapa de GTM (Módulo 2)
- Layout muda levemente: fundo escuro + área de conteúdo ligeiramente mais clara
- Canais recomendados aparecem em ordem de prioridade
- Cada canal tem: nome + justificativa de 1 linha + budget alocado
- Canais bloqueados listados abaixo com motivo
- Plano de 90 dias em formato de linha do tempo simples
- 3 métricas com metas numéricas
- CTA: "Começar a acompanhar →"

### Tela 16 — Dashboard do Tracker (Módulo 3)
- Layout mais estruturado — o usuário volta aqui toda semana
- 3 campos de preenchimento semanal (investimento, resultado, data)
- Status do plano visível: pílula verde/amarela/vermelha
- Semana atual do plano de 90 dias destacada
- Histórico das semanas anteriores em linha do tempo
- Alerta quando status = revisão: painel lateral aparece com causa + correção

### Tela 17 — Resultado final do ciclo (Dia 60)
- Score atualizado com dado real — comparado com o estimado
- "Seu diagnóstico foi X% preciso"
- O que o produto aprendeu sobre o seu negócio
- O que ajustar no próximo ciclo
- CTA: "Novo diagnóstico" ou "Compartilhar resultado"

---

## Princípios de navegação

1. **A conversa flui para frente** — sem botão voltar no módulo 1
2. **Uma coisa por vez** — nunca duas perguntas na mesma tela
3. **O produto some** — nenhum elemento de UI compete com o conteúdo
4. **O progresso é discreto** — barra de 2px e contador "X de 9" no canto
5. **O resultado é um momento** — score animado, não exibido estaticamente
6. **O tracker é o lar** — o usuário volta aqui toda semana, então é a tela mais refinada

---

## Estados especiais

### Score < 40 (diagnóstico crítico)
- Score aparece normalmente (honestidade — o usuário merece ver o número)
- Módulo 2 aparece bloqueado com cadeado discreto
- Mensagem: "Seu plano precisa de ajuste antes de avançar. Veja o que mudar."
- Lista das dimensões com score baixo e o que melhorar em cada uma

### Usuário sem respostas suficientes (P6 — sem histórico)
- "Ainda não tentei marketing" é uma resposta válida
- O produto registra `tem_historico: false` e adapta o módulo 2

### Timeout de sessão
- Respostas salvas automaticamente a cada pergunta enviada
- Se o usuário fechar e voltar, retoma de onde parou

---

## Prompt base para o Lovable — Módulo 1

```
Crie um web app chamado Lastro com as seguintes características:

DESIGN:
- Background: #0D1F1A em tela cheia
- Tipografia: Georgia (serif) para todos os textos
- Cor de destaque: #1D9E75 (teal)
- Cor de texto: #F5F0E8 (creme)
- Zero elementos decorativos — só texto e campo de input
- Barra de progresso de 2px no topo em #1D9E75
- Contador "X de 9" no canto superior direito em rgba(245,240,232,0.3)

COMPORTAMENTO:
- Cada pergunta aparece letra por letra (20ms por caractere)
- Cursor piscando verde no final da pergunta durante a digitação
- Resposta anterior fica visível acima em #1D9E75
- Campo de input: linha simples, sem borda visível, fundo transparente
- Enter ou botão "enviar" avança para próxima pergunta
- Resposta salva automaticamente no Supabase antes de avançar

AS 9 PERGUNTAS (em ordem):
[lista das 9 perguntas aqui]

BANCO DE DADOS:
Conectar ao Supabase e salvar cada resposta na tabela "diagnostico" com os campos:
produto_desc, icp_desc, ticket_medio, modelo_cobranca, concorrentes_desc,
foco_geografico, historico_marketing, budget_total, meta_clientes, prazo_esperado

Após a última pergunta, chamar a Edge Function "processar-respostas-abertas"
e redirecionar para a tela de resultado com o Lastro Score.
```
