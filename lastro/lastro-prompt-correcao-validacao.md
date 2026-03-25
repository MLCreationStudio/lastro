# Lastro — Prompt de Correção
## Escopo: Validação modular de respostas — campo vazio + mínimo por pergunta

---

Cole esse prompt no Lovable para corrigir a validação das respostas.
Não altera rotas, banco ou lógica de score.

---

## PROMPT PARA COLAR NO LOVABLE

---

Mantenha tudo que foi criado. Corrija apenas a validação das respostas
na tela de conversa `/diagnostico`.

---

### O problema a corrigir

Atualmente o app avança para a próxima pergunta mesmo com respostas
muito curtas ou insuficientes. Cada pergunta precisa de um mínimo de
conteúdo para o diagnóstico funcionar corretamente.

---

### Regras de validação por pergunta

Implemente validação específica para cada uma das 9 perguntas.
Cada pergunta tem um critério de mínimo diferente.

```javascript
const validacoes = [
  {
    pergunta: 1,
    minChars: 20,
    minWords: 4,
    mensagem: "Conta um pouco mais — o que você vende e qual problema resolve?"
  },
  {
    pergunta: 2,
    minChars: 25,
    minWords: 5,
    mensagem: "Descreva melhor seu cliente — idade, perfil, o que ele busca."
  },
  {
    pergunta: 3,
    minChars: 10,
    minWords: 2,
    mensagem: "Informe o valor e como o cliente paga — ex: R$500, recorrente."
  },
  {
    pergunta: 4,
    minChars: 20,
    minWords: 4,
    mensagem: "Cite pelo menos um concorrente e seu diferencial."
  },
  {
    pergunta: 5,
    minChars: 10,
    minWords: 2,
    mensagem: "Indique a região ou segmento — ex: São Paulo, clínicas pequenas."
  },
  {
    pergunta: 6,
    minChars: 15,
    minWords: 3,
    mensagem: "Conte o que já tentou — ou diga que ainda não tentou nada."
  },
  {
    pergunta: 7,
    minChars: 5,
    minWords: 1,
    mensagem: "Informe o valor mensal — ex: R$500 por mês."
  },
  {
    pergunta: 8,
    minChars: 1,
    minWords: 1,
    mensagem: "Informe um número — ex: 5 clientes por mês."
  },
  {
    pergunta: 9,
    minChars: 1,
    minWords: 1,
    mensagem: "Informe um prazo — ex: 30 dias, 3 meses."
  }
]
```

---

### Lógica de validação ao clicar em ENVIAR

```javascript
function validarResposta(perguntaIndex, texto) {
  const regra = validacoes[perguntaIndex]
  const chars = texto.trim().length
  const words = texto.trim().split(/\s+/).filter(w => w.length > 0).length

  if (chars === 0) {
    return { valido: false, mensagem: "Escreva sua resposta antes de continuar." }
  }

  if (chars < regra.minChars || words < regra.minWords) {
    return { valido: false, mensagem: regra.mensagem }
  }

  return { valido: true }
}
```

---

### Comportamento visual quando a resposta não passar na validação

1. O app NÃO avança para a próxima pergunta
2. O campo de input recebe uma animação de shake (tremer lateralmente, 300ms)
3. Abaixo do input, aparece a mensagem de erro específica da pergunta:
   - Fonte: Inter, 12px
   - Cor: `rgba(220, 100, 80, 0.8)`
   - Aparece com fade-in suave (0.2s)
   - Some automaticamente após 3 segundos ou quando o usuário começar a digitar
4. O cursor volta para o campo de input automaticamente

**CSS da animação shake:**
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px); }
  40%       { transform: translateX(6px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
}
.shake {
  animation: shake 0.3s ease-in-out;
}
```

---

### Mensagem de erro — posicionamento

A mensagem de erro aparece entre o separador do input e o campo de texto:
- Padding: 6px 0 0
- Alinhamento: esquerdo, alinhado com o início do input
- Desaparece quando o usuário começa a digitar (onInput → limpar erro)

---

### Feedback positivo — quando a resposta é suficiente

Quando a resposta passar na validação:
- O botão ENVIAR recebe um pulso sutil em `#1D9E75` antes de avançar (100ms)
- A resposta aparece normalmente em verde com a borda esquerda
- A próxima pergunta inicia o efeito de digitação

---

### Casos especiais

**Pergunta 6 — histórico de marketing:**
Se o usuário escrever variações de "não" ou "nunca tentei" ou "não fiz nada",
considerar como resposta válida mesmo sendo curta.
Detectar: se o texto contém "não", "nunca", "nada", "nenhuma" → validar como ok.

**Pergunta 7 — budget:**
Aceitar qualquer formato de valor monetário:
- "500", "R$500", "500 reais", "quinhentos reais", "500/mês"
- Validar que contém pelo menos um número

**Pergunta 8 — meta de clientes:**
Aceitar número por extenso também:
- "cinco", "10", "uns 5", "em torno de 3"

**Pergunta 9 — prazo:**
Aceitar formatos variados:
- "30 dias", "1 mês", "3 meses", "90 dias", "um mês"
- Mapear para inteiro: 30, 60, 90 ou 180

---

### O que NÃO alterar

- Lógica de salvamento no Supabase
- Efeito de digitação das perguntas
- Visual da conversa (cores, fontes, espaçamentos)
- Roteamento para /resultado após a pergunta 9
- Nenhuma outra tela além de /diagnostico

---

### Resultado esperado

Ao final desse prompt:
- Respostas vazias bloqueadas em todas as 9 perguntas
- Cada pergunta com critério mínimo próprio
- Mensagem de erro específica por pergunta
- Animação shake no input quando inválido
- Pergunta 6 aceita "não tentei" como válido
- Perguntas 7, 8 e 9 com parsing flexível de formatos
