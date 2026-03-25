# Lastro — Prompt 4 Lovable
## Escopo: Cálculo do Lastro Score + tela de resultado

---

Cole esse prompt APÓS o Prompt 3 estar funcionando.
Pré-requisito: conversa com 9 perguntas funcionando e dados salvos no Supabase.

---

## PROMPT PARA COLAR NO LOVABLE

---

Mantenha tudo que foi criado nos prompts anteriores.

Agora implemente o cálculo do Lastro Score e a tela `/resultado`.

---

### Lógica de cálculo do Lastro Score

Após o usuário finalizar as 9 perguntas, calcular o score com base nos dados salvos.

O Lastro Score é composto por 4 dimensões com os seguintes pesos:

```
Lastro Score =
  Viabilidade financeira × 0.40
+ Clareza de ICP          × 0.25
+ Alinhamento de prazo    × 0.20
+ Maturidade de mercado   × 0.15
```

---

**Dimensão 1 — Viabilidade financeira (peso 40%)**

Calcular: `budget_midia = budget_total * 0.56`

Buscar o `cac_min` e `cac_max` da tabela `cac_benchmark` onde `nicho` corresponde ao nicho identificado.
Por enquanto, usar o nicho como a primeira palavra significativa do campo `produto_desc`
(exemplo: se produto_desc contém "imobiliária" ou "corretor" → nicho = "imobiliaria").

Calcular quantos ciclos de aquisição o budget cobre:
`ciclos = budget_midia / cac_min`

Pontuar:
- ciclos >= 3 → 100 pontos
- ciclos >= 2 → 75 pontos
- ciclos >= 1 → 50 pontos
- ciclos >= 0.5 → 25 pontos
- ciclos < 0.5 → 10 pontos

**Dimensão 2 — Clareza de ICP (peso 25%)**

Avaliar o campo `icp_desc` pelo número de palavras e especificidade:
- Mais de 30 palavras com descrição específica → 85 pontos
- Entre 15 e 30 palavras → 65 pontos
- Entre 5 e 15 palavras → 40 pontos
- Menos de 5 palavras ou resposta genérica ("todo mundo", "qualquer pessoa") → 15 pontos

**Dimensão 3 — Alinhamento de prazo (peso 20%)**

Cruzar `prazo_esperado` com o `ciclo_min_dias` do benchmark do nicho:

- prazo_esperado >= ciclo_min_dias × 2 → 100 pontos
- prazo_esperado >= ciclo_min_dias → 70 pontos
- prazo_esperado >= ciclo_min_dias / 2 → 40 pontos
- prazo_esperado < ciclo_min_dias / 2 → 15 pontos

Se não encontrar o nicho no benchmark, usar ciclo_min_dias = 30 como padrão.

**Dimensão 4 — Maturidade de mercado (peso 15%)**

Avaliar o campo `concorrentes_desc`:
- Menciona concorrentes específicos E explica diferencial claro → 90 pontos
- Menciona concorrentes mas diferencial vago → 55 pontos
- Não menciona concorrentes ou diz "não tenho" → 25 pontos

**Cálculo final:**

```
score = (dim1 * 0.40) + (dim2 * 0.25) + (dim3 * 0.20) + (dim4 * 0.15)
```

Arredondar para inteiro.

Definir a zona:
- score 0–39 → zona = "critico"
- score 40–59 → zona = "ajuste"
- score 60–79 → zona = "ressalvas"
- score 80–100 → zona = "pronto"

Salvar no Supabase os campos: `budget_midia`, `lastro_score`, `zona`
e também `icp_score` (dim2), `diferencial_score` (dim4).

---

### Tela `/resultado` — Lastro Score

Fundo `#0D1F1A`. Sem navbar. Conteúdo centralizado com padding 60px lateral.

**Bloco 1 — O número**

O score aparece animado: começa em 0 e conta até o valor real em 1.5 segundos.
- Número: Georgia, 88px, peso 500
- Cor do número baseada na zona:
  - critico → `#E24B4A`
  - ajuste → `#BA7517`
  - ressalvas → `#639922`
  - pronto → `#1D9E75`
- Abaixo do número: texto "Lastro Score" — Georgia, 13px, `rgba(245,240,232,0.4)`, letter-spacing 0.08em

**Bloco 2 — A frase do diagnóstico**

Baseado na zona, exibir uma frase em Georgia, 18px, `#F5F0E8`, max-width 480px, line-height 1.6, centralizado.

Frases por zona:
- critico: "Há um desalinhamento importante antes de qualquer investimento. Veja o que precisa ser ajustado."
- ajuste: "Seu plano tem base — com um ajuste importante antes de avançar."
- ressalvas: "Você está no caminho certo. Há um ponto de atenção antes de escalar."
- pronto: "Seu diagnóstico está sólido. O caminho está pronto para ser traçado."

Essa frase aparece letra por letra após o contador do score terminar. Velocidade: 18ms por caractere.

**Bloco 3 — As 4 dimensões**

Exibir após a frase, com 32px de margem acima. Largura máxima 400px, centralizado.

Para cada dimensão, uma linha com:
- Nome da dimensão à esquerda: Georgia, 12px, `rgba(245,240,232,0.45)`, min-width 180px
- Barra de progresso no centro: altura 3px, fundo `rgba(255,255,255,0.08)`, preenchimento em `#1D9E75`
- Número à direita: Georgia, 12px, `#1D9E75`

As barras preenchem progressivamente, uma após a outra, com intervalo de 150ms entre cada uma.

Dimensões (nessa ordem):
1. "Viabilidade financeira" — valor: dim1
2. "Clareza de ICP" — valor: dim2
3. "Alinhamento de prazo" — valor: dim3
4. "Maturidade de mercado" — valor: dim4

**Bloco 4 — CTA**

Abaixo das dimensões, com 40px de margem:

Se zona = "critico":
- Texto explicativo: "Com esse score, o mapa de GTM ainda não está disponível. Ajuste os pontos abaixo e refaça o diagnóstico." — Georgia, 14px, `rgba(245,240,232,0.5)`, itálico
- Botão secundário: "Refazer diagnóstico" — ao clicar, vai para `/diagnostico`

Se zona != "critico":
- Botão primário: "Ver meu mapa de GTM →" — ao clicar, vai para `/plano`
- Link abaixo: "Refazer diagnóstico" — ao clicar, vai para `/diagnostico`

---

### Resumo do que é salvo no Supabase

Ao finalizar o cálculo, atualizar o registro de diagnóstico com:
- `budget_midia` = budget_total * 0.56
- `icp_score` = pontuação da dimensão 2
- `diferencial_score` = pontuação da dimensão 4
- `lastro_score` = score final calculado
- `zona` = zona correspondente

---

### O que NÃO fazer

- Não implementar o módulo 2 ainda
- Não chamar a Anthropic API ainda — o cálculo é local por enquanto
- Não adicionar navbar ou header
- Não usar cores fora da paleta

---

### Resultado esperado

Ao final desse prompt:
- Score calculado com base nas 4 dimensões
- Tela de resultado com número animado, frase por zona e barras das dimensões
- CTA correto baseado na zona (bloqueado se crítico)
- Dados do score salvos no Supabase

O próximo prompt vai implementar o Módulo 2 — Mapa de GTM.
