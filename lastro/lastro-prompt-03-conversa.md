# Lastro — Prompt 3 Lovable
## Escopo: Conversa cinematográfica — Módulo 1 (as 9 perguntas)

---

Cole esse prompt APÓS o Prompt 2 estar funcionando.
Pré-requisito: navegação entre rotas funcionando, dashboard com cards corretos.

---

## PROMPT PARA COLAR NO LOVABLE

---

Mantenha tudo que foi criado nos prompts anteriores.

Agora implemente a tela `/diagnostico` — a conversa cinematográfica do Módulo 1.

---

### Comportamento geral da tela `/diagnostico`

A tela é uma conversa em tela cheia. Fundo `#0D1F1A`. Sem navbar. Sem header.

O usuário responde 9 perguntas, uma por vez, em formato de chat minimalista.
Cada pergunta aparece como se estivesse sendo digitada em tempo real.
A resposta anterior fica visível acima, criando um histórico da conversa.

---

### Layout da tela

**Topo da tela — elementos fixos:**

Barra de progresso:
- Linha de 2px de altura no topo absoluto da tela
- Cor: `#1D9E75`
- Largura inicial: 0% — avança proporcionalmente a cada pergunta respondida
- Sem animação brusca — transição suave de 0.4s

Indicador de etapa:
- Canto superior direito
- Texto: "1 de 9" — atualiza a cada pergunta
- Georgia, 11px, `rgba(245,240,232,0.3)`
- Sem borda, sem fundo

**Área central — histórico da conversa:**

Container com padding 60px lateral, padding-top 80px, padding-bottom 160px.
Scroll vertical quando o histórico crescer.

Cada pergunta respondida aparece como:
- Texto da pergunta: Georgia, 17px, `#F5F0E8`, line-height 1.7, max-width 560px
- Resposta do usuário abaixo: Georgia, 15px, `#1D9E75`, padding-left 20px, borda esquerda 2px solid `#1D9E75`
- Espaçamento entre pares de pergunta+resposta: 32px

**Área inferior — input fixo:**

Fixo no fundo da tela, padding 24px lateral, padding-bottom 32px.
Linha separadora no topo: 0.5px solid `rgba(245,240,232,0.08)`.

Input de texto:
- Fundo transparente
- Sem borda visível
- Fonte: Georgia, 16px, `#F5F0E8`
- Placeholder: "escreva sua resposta..." em `rgba(245,240,232,0.25)`
- Ocupa toda a largura disponível menos o botão

Botão "enviar":
- Fundo transparente
- Borda: 0.5px solid `rgba(29,158,117,0.4)`
- Texto: "enviar" — Georgia, 13px, `#1D9E75`
- Border-radius: 6px
- Ao hover: fundo `rgba(29,158,117,0.1)`

---

### As 9 perguntas — exibir nessa ordem exata

1. "O que você vende — e qual problema ele resolve para o seu cliente?"
2. "Me descreva a pessoa que mais compra de você. Quem é ela?"
3. "Qual é o ticket médio da sua venda? E como o cliente paga — único, recorrente ou parcelado?"
4. "Quem são seus principais concorrentes? E por que um cliente escolheria você no lugar deles?"
5. "Em qual região ou segmento você quer crescer nos próximos 90 dias?"
6. "Você já tentou alguma ação de marketing antes? O que funcionou e o que não funcionou?"
7. "Quanto você pode investir por mês em marketing — incluindo ferramenta, mídia e produção?"
8. "Quantos clientes novos você precisa fechar por mês para considerar o marketing bem-sucedido?"
9. "Em quanto tempo você espera ver os primeiros resultados?"

---

### Comportamento de digitação da pergunta

Quando uma nova pergunta aparece:
- O texto aparece caractere por caractere
- Velocidade: 20ms por caractere para perguntas curtas, 14ms para longas (acima de 60 chars)
- Cursor piscando `|` em `#1D9E75` no final do texto durante a digitação
- O cursor some quando a pergunta termina de aparecer
- O input recebe foco automaticamente após a pergunta terminar

---

### Comportamento ao enviar resposta

Ao clicar em "enviar" ou pressionar Enter:
- Validar que o campo não está vazio — se vazio, fazer o input tremer levemente (animation shake, 300ms)
- Registrar a resposta no estado local do componente
- Mostrar a resposta acima em `#1D9E75` com a borda esquerda
- Limpar o input
- Aguardar 500ms
- Exibir a próxima pergunta com o efeito de digitação

---

### Salvamento no Supabase — ao longo da conversa

A cada resposta enviada, salvar no Supabase na tabela `diagnostico`:

- Pergunta 1 → campo `produto_desc`
- Pergunta 2 → campo `icp_desc`
- Pergunta 3 → campos `ticket_medio` (extrair número) e `modelo_cobranca` (extrair palavra-chave: único/recorrente/parcelado)
- Pergunta 4 → campo `concorrentes_desc`
- Pergunta 5 → campo `foco_geografico`
- Pergunta 6 → campo `historico_marketing`
- Pergunta 7 → campo `budget_total` (extrair número)
- Pergunta 8 → campo `meta_clientes` (extrair número)
- Pergunta 9 → campo `prazo_esperado` (extrair número: 30, 60, 90 ou 180)

Na primeira resposta, criar o registro com `insert` e salvar o `id` gerado.
Nas respostas seguintes, usar `update` no mesmo registro pelo `id`.
Salvar também o campo `etapa_atual` com o número da pergunta atual.
Salvar o `user_id` com o id do usuário logado.

---

### Ao finalizar a pergunta 9

Após o usuário enviar a resposta da pergunta 9:
- Mostrar texto centralizado animado por 2 segundos:
  - Linha 1: "Analisando seu negócio..." — aparece e some
  - Linha 2: "Calculando o que é possível..." — aparece e some
  - Linha 3: "Preparando seu diagnóstico..." — aparece
- Texto em Georgia, 16px, `rgba(245,240,232,0.7)`, itálico, centralizado
- Após os 2 segundos: redirecionar para `/resultado`

---

### Retomada de sessão

Se o usuário já tiver um diagnóstico em andamento (etapa_atual entre 1 e 8):
- Ao entrar em `/diagnostico`, buscar o diagnóstico mais recente do usuário no Supabase
- Retomar a partir da etapa salva — mostrar histórico das respostas anteriores
- Exibir as respostas anteriores no histórico sem efeito de digitação
- Exibir a próxima pergunta com o efeito de digitação normalmente

---

### O que NÃO fazer

- Não calcular o Lastro Score ainda — isso é o próximo prompt
- Não exibir nenhum resultado ainda
- Não adicionar botão "voltar" entre as perguntas
- Não permitir editar respostas anteriores
- Não adicionar navbar ou header
- Não usar fonte sans-serif

---

### Resultado esperado

Ao final desse prompt:
- Tela `/diagnostico` com a conversa cinematográfica funcionando
- 9 perguntas exibidas uma a uma com efeito de digitação
- Respostas salvas no Supabase a cada envio
- Retomada de sessão funcionando
- Redirecionamento para `/resultado` ao finalizar

O próximo prompt vai implementar o cálculo do Lastro Score e a tela de resultado.
