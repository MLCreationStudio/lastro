# Lastro — Prompt de Correção: Conversa Adaptativa
## Substitui a lógica do Prompt 03 — tópicos com profundidade adaptativa via IA

---

Cole esse prompt no Lovable APÓS o Prompt 02 (navegação) estar funcionando.
Ele SUBSTITUI o Prompt 03 anterior — não use os dois.

IMPORTANTE: Esse prompt exige que a Anthropic API Key esteja configurada
como variável de ambiente no projeto. Configure antes de rodar.
Nome da variável: VITE_ANTHROPIC_API_KEY ou ANTHROPIC_API_KEY (conforme o Lovable usar).

---

## PROMPT PARA COLAR NO LOVABLE

---

Mantenha tudo dos prompts 01 e 02 — autenticação, rotas, dashboard, visual.

Substitua completamente a lógica da tela `/diagnostico`.
A nova versão usa conversa adaptativa com IA — 9 tópicos, perguntas ilimitadas
por tópico até extrair o dado necessário.

---

### Conceito central

O módulo 1 não tem 9 perguntas fixas. Tem 9 tópicos.
Cada tópico começa com uma pergunta inicial.
Após cada resposta, a IA avalia se extraiu o dado necessário.
Se sim: avança para o próximo tópico.
Se não: faz uma pergunta complementar dentro do mesmo tópico.
O usuário nunca fica preso — máximo de perguntas complementares por tópico.

O indicador "X de 9" mostra o tópico atual, não o número de mensagens trocadas.

---

### Os 9 tópicos e seus dados obrigatórios

```javascript
const TOPICOS = [
  {
    id: 1,
    campo_principal: 'produto_desc',
    campos_extraidos: ['nicho', 'categoria', 'problema_resolvido'],
    pergunta_inicial: "O que você vende — e qual problema ele resolve para o seu cliente?",
    max_complementares: 2,
    prompt_extracao: `Analise a resposta e extraia em JSON:
      - produto: string (descrição do produto/serviço)
      - nicho: string (um dos: imobiliaria, clinica_medica, clinica_odontologica, 
        academia, studio_fitness, ecommerce, perfumaria, agencia_mkt, 
        infoproduto, credito_consignado, saas, consultoria, outro)
      - subnicho: string (ex: odonto_estetica, studio_fitness_high_ticket)
      - categoria: string (servico | produto | infoproduto | saas)
      - modelo_negocio: string (b2b | b2c | b2b2c)
      - suficiente: boolean (true se nicho e produto identificados claramente)
      - pergunta_complementar: string (se suficiente=false, pergunta específica 
        para o que está faltando — ex: "Clínica de qual especialidade — geral, 
        odontologia ou estética?" — null se suficiente=true)`
  },
  {
    id: 2,
    campo_principal: 'icp_desc',
    campos_extraidos: ['icp_score', 'perfil_demografico', 'dor_principal'],
    pergunta_inicial: "Me descreva a pessoa que mais compra de você. Quem é ela?",
    max_complementares: 2,
    prompt_extracao: `Analise a resposta e extraia em JSON:
      - perfil: string (descrição do perfil do cliente)
      - especificidade: string (especifico | parcial | vago)
      - icp_score: number (0-100: especifico=85, parcial=55, vago=20)
      - tem_demografico: boolean
      - tem_dor: boolean
      - suficiente: boolean (true se tem ao menos perfil parcial e alguma dor/motivação)
      - pergunta_complementar: string (se suficiente=false — ex: "Qual a faixa de 
        idade e o que essa pessoa busca quando te contrata?" — null se true)
      IMPORTANTE: "todo mundo" ou "qualquer pessoa" = suficiente=false`
  },
  {
    id: 3,
    campo_principal: 'ticket_medio',
    campos_extraidos: ['ticket_medio', 'modelo_cobranca'],
    pergunta_inicial: "Qual é o ticket médio da sua venda? E como o cliente paga — único, recorrente ou parcelado?",
    max_complementares: 1,
    prompt_extracao: `Analise a resposta e extraia em JSON:
      - ticket_medio: number (extrair valor numérico, aceitar qualquer formato)
      - modelo_cobranca: string (unico | recorrente | parcelado | nao_identificado)
      - suficiente: boolean (true se tem valor numérico)
      - pergunta_complementar: string (se falta valor → "Qual o valor médio que 
        um cliente paga por vez?", se falta modelo → "Esse valor é por consulta, 
        mensalidade ou parcelado?" — null se suficiente=true)`
  },
  {
    id: 4,
    campo_principal: 'concorrentes_desc',
    campos_extraidos: ['diferencial_score', 'tem_diferencial'],
    pergunta_inicial: "Quem são seus principais concorrentes — e por que um cliente escolheria você no lugar deles?",
    max_complementares: 2,
    prompt_extracao: `Analise a resposta e extraia em JSON:
      - concorrentes: array de strings (nomes mencionados)
      - diferencial: string (descrição do diferencial identificado)
      - diferencial_score: number (0-100: claro_defensavel=90, existe_mas_fraco=55, ausente=20)
      - suficiente: boolean (true se ao menos 1 concorrente E algum diferencial)
      - pergunta_complementar: string (se sem concorrente → "Quem o cliente 
        contrataria se não fosse você?", se sem diferencial → "O que faz um 
        cliente escolher você em vez deles?" — null se true)
      IMPORTANTE: "não tenho concorrentes" = suficiente=false`
  },
  {
    id: 5,
    campo_principal: 'foco_geografico',
    campos_extraidos: ['regiao', 'segmento_foco'],
    pergunta_inicial: "Em qual região ou segmento você quer crescer nos próximos 90 dias?",
    max_complementares: 1,
    prompt_extracao: `Analise a resposta e extraia em JSON:
      - regiao: string (cidade, estado ou "nacional")
      - segmento: string (segmento de mercado se mencionado)
      - suficiente: boolean (true se identificou região OU segmento)
      - pergunta_complementar: string (se "todo Brasil" ou vago → "Começa por 
        qual cidade ou estado?" — null se suficiente=true)`
  },
  {
    id: 6,
    campo_principal: 'historico_marketing',
    campos_extraidos: ['canais_testados', 'tem_historico'],
    pergunta_inicial: "Você já tentou alguma ação de marketing antes? O que funcionou e o que não funcionou?",
    max_complementares: 1,
    prompt_extracao: `Analise a resposta e extraia em JSON:
      - tem_historico: boolean
      - canais_testados: array de objetos {canal: string, resultado: string}
      - suficiente: boolean (true se claramente disse que tentou COM detalhe, 
        OU claramente disse que nunca tentou)
      - pergunta_complementar: string (se "sim tentei" sem detalhe → "Quais 
        canais — Instagram, Google, panfleto? O que aconteceu?" — null se true)
      IMPORTANTE: qualquer variação de "nunca tentei" / "não fiz nada" = 
        suficiente=true com tem_historico=false`
  },
  {
    id: 7,
    campo_principal: 'budget_total',
    campos_extraidos: ['budget_total', 'budget_midia'],
    pergunta_inicial: "Quanto você pode investir por mês em marketing — incluindo ferramenta, mídia e produção?",
    max_complementares: 1,
    prompt_extracao: `Analise a resposta e extraia em JSON:
      - budget_total: number (extrair valor numérico, aceitar qualquer formato)
      - budget_midia: number (budget_total * 0.56, calcular automaticamente)
      - suficiente: boolean (true se tem qualquer valor numérico)
      - pergunta_complementar: string (se "pouco/não sei/depende" → "Pensa num 
        valor mensal — mesmo que seja R$200 ou R$500." — null se true)`
  },
  {
    id: 8,
    campo_principal: 'meta_clientes',
    campos_extraidos: ['meta_clientes'],
    pergunta_inicial: "Quantos clientes novos você precisa fechar por mês para considerar o marketing bem-sucedido?",
    max_complementares: 1,
    prompt_extracao: `Analise a resposta e extraia em JSON:
      - meta_clientes: number (extrair inteiro, aceitar por extenso)
      - suficiente: boolean (true se tem número identificável)
      - pergunta_complementar: string (se "muitos/quanto mais melhor" → "Me dá 
        um número — 5, 10, 20 por mês?" — null se true)`
  },
  {
    id: 9,
    campo_principal: 'prazo_esperado',
    campos_extraidos: ['prazo_esperado'],
    pergunta_inicial: "Em quanto tempo você espera ver os primeiros resultados?",
    max_complementares: 1,
    prompt_extracao: `Analise a resposta e extraia em JSON:
      - prazo_esperado: number (mapear para: 30, 60, 90 ou 180 dias)
      - suficiente: boolean (true se tem prazo identificável)
      - pergunta_complementar: string (se "rápido/logo/não sei" → "Em quanto 
        tempo — 1 mês, 3 meses, 6 meses?" — null se true)
      Mapeamento: até 30 dias=30, 31-60 dias=60, 61-90 dias=90, >90 dias=180`
  }
]
```

---

### Estado da conversa — estrutura de dados local

```javascript
const estadoConversa = {
  topicoAtual: 0,          // índice 0-8
  complementaresUsados: 0, // contador por tópico, reseta ao avançar
  dadosExtraidos: {},      // acumula todos os campos extraídos
  historico: [],           // array de {tipo: 'pergunta'|'resposta', texto: string}
  diagnosticoId: null,     // uuid gerado no primeiro insert no Supabase
  processando: false       // bloqueia input durante chamada à API
}
```

---

### Fluxo principal — função ao enviar resposta

```javascript
async function processarResposta(textoUsuario) {
  // 1. Bloquear input
  estadoConversa.processando = true

  // 2. Adicionar resposta ao histórico visual
  adicionarAoHistorico('resposta', textoUsuario)

  // 3. Chamar Anthropic API com o prompt do tópico atual
  const topico = TOPICOS[estadoConversa.topicoAtual]
  const resultado = await chamarAnthropicAPI(topico, textoUsuario, estadoConversa.dadosExtraidos)

  // 4. Mesclar dados extraídos
  estadoConversa.dadosExtraidos = { ...estadoConversa.dadosExtraidos, ...resultado }

  // 5. Salvar no Supabase (insert na primeira vez, update depois)
  await salvarNoSupabase(estadoConversa.dadosExtraidos)

  // 6. Decidir: avançar ou perguntar complementar?
  const podePerguntarComplementar = 
    estadoConversa.complementaresUsados < topico.max_complementares

  if (!resultado.suficiente && podePerguntarComplementar && resultado.pergunta_complementar) {
    // Fazer pergunta complementar dentro do mesmo tópico
    estadoConversa.complementaresUsados++
    await exibirPergunta(resultado.pergunta_complementar, false) // false = não é nova pergunta principal
  } else {
    // Avançar para o próximo tópico
    estadoConversa.topicoAtual++
    estadoConversa.complementaresUsados = 0
    atualizarProgressoUI()

    if (estadoConversa.topicoAtual >= TOPICOS.length) {
      // Todos os tópicos concluídos
      await exibirProcessando()
      redirecionarParaResultado()
    } else {
      await exibirPergunta(TOPICOS[estadoConversa.topicoAtual].pergunta_inicial, true)
    }
  }

  estadoConversa.processando = false
}
```

---

### Chamada à Anthropic API

```javascript
async function chamarAnthropicAPI(topico, respostaUsuario, dadosJaExtraidos) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: `Você é um assistente de diagnóstico de marketing brasileiro.
Analise respostas de donos de negócio e extraia dados estruturados.
Responda APENAS com JSON válido, sem texto adicional, sem markdown.
Contexto já extraído: ${JSON.stringify(dadosJaExtraidos)}`,
      messages: [{
        role: 'user',
        content: `${topico.prompt_extracao}

Resposta do usuário: "${respostaUsuario}"

Retorne APENAS JSON válido.`
      }]
    })
  })

  const data = await response.json()
  const texto = data.content[0].text.trim()

  try {
    return JSON.parse(texto)
  } catch {
    // Fallback se JSON inválido
    return { suficiente: true, pergunta_complementar: null }
  }
}
```

---

### Salvamento no Supabase — insert + update

```javascript
async function salvarNoSupabase(dados) {
  const userId = supabase.auth.getUser()?.data?.user?.id

  if (!estadoConversa.diagnosticoId) {
    // Primeiro save — INSERT
    const { data, error } = await supabase
      .from('diagnostico')
      .insert({
        user_id: userId,
        etapa_atual: estadoConversa.topicoAtual + 1,
        ...dados
      })
      .select('id')
      .single()

    if (data) estadoConversa.diagnosticoId = data.id
  } else {
    // Saves seguintes — UPDATE
    await supabase
      .from('diagnostico')
      .update({
        etapa_atual: estadoConversa.topicoAtual + 1,
        updated_at: new Date().toISOString(),
        ...dados
      })
      .eq('id', estadoConversa.diagnosticoId)
  }
}
```

---

### Interface visual — comportamento durante processamento

Quando a IA está processando a resposta (entre o envio e a próxima pergunta):
- Input fica desabilitado
- Botão ENVIAR fica desabilitado
- Aparece indicador sutil de loading: três pontos piscando em `#1D9E75`
  estilo: `· · ·` animados em sequência, 400ms cada
- Posicionado onde a próxima pergunta vai aparecer
- Desaparece quando a pergunta chega

Quando é pergunta complementar (não nova pergunta principal):
- O indicador "X de 9" NÃO muda — o tópico é o mesmo
- A pergunta aparece com o mesmo efeito de digitação
- Visualmente idêntico a qualquer outra pergunta

Quando avança para novo tópico:
- O indicador "X de 9" atualiza com transição suave
- A barra de progresso avança
- A pergunta inicial do novo tópico aparece com efeito de digitação

---

### Tela de processamento final — após tópico 9

Após o último tópico ser concluído, antes de redirecionar para `/resultado`:

Mostrar tela de processamento em fundo `#080f0c`, centralizado:

Sequência animada de frases (cada uma aparece e some):
1. "Analisando seu negócio..." — aparece com fade-in, fica 1.2s, fade-out
2. "Calculando o que é possível..." — idem
3. "Preparando seu diagnóstico..." — aparece e fica

Fonte: DM Serif Display, 18px, `rgba(232,240,235,0.6)`, itálico
Após a terceira frase ficar 1s: redirecionar para `/resultado`

---

### Retomada de sessão

Se o usuário fechar o browser e voltar:

1. Buscar diagnóstico mais recente do usuário com `etapa_atual < 10`
2. Se encontrar: restaurar estado da conversa
   - `topicoAtual = diagnostico.etapa_atual - 1`
   - `diagnosticoId = diagnostico.id`
   - `dadosExtraidos = { todos os campos do registro }`
3. Exibir histórico das perguntas e respostas anteriores SEM efeito de digitação
4. Exibir a pergunta inicial do tópico atual COM efeito de digitação
5. Se `etapa_atual >= 10`: redirecionar direto para `/resultado`

---

### Campos adicionais no Supabase — adicionar à tabela diagnostico

Executar no SQL Editor do Supabase antes de testar:

```sql
alter table diagnostico
  add column if not exists nicho text,
  add column if not exists subnicho text,
  add column if not exists categoria text,
  add column if not exists modelo_negocio text,
  add column if not exists problema_resolvido text,
  add column if not exists icp_score integer,
  add column if not exists diferencial_score integer,
  add column if not exists canais_testados jsonb,
  add column if not exists tem_historico boolean,
  add column if not exists confianca_dados jsonb;
```

---

### O que NÃO alterar

- Visual da conversa (cores, fontes, espaçamentos, efeito de digitação)
- Rotas e navegação
- Autenticação e sessão
- Telas de resultado, dashboard e placeholder

---

### Resultado esperado

Ao final desse prompt:
- 9 tópicos com conversa adaptativa funcionando
- IA avalia cada resposta via Anthropic API
- Pergunta complementar quando a resposta é insuficiente
- Máximo de complementares respeitado por tópico
- Dados extraídos e salvos no Supabase progressivamente
- Retomada de sessão funcionando
- Indicador "X de 9" reflete tópico atual, não número de mensagens
- Loading visível durante processamento da IA
- Redirecionamento para /resultado após todos os tópicos

O próximo prompt implementa o cálculo do Lastro Score
usando os dados enriquecidos pela IA.
