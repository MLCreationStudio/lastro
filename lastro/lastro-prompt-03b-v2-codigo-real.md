# Lastro — Prompt 03b Revisado
## Conversa adaptativa por tópico — baseado no código real do repositório

---

Cole esse prompt no Lovable para substituir a lógica de Diagnostico.tsx.
Baseado na leitura do repositório MLCreationStudio/lastro-auth-hub.

PRÉ-REQUISITO: Configure a variável de ambiente VITE_ANTHROPIC_API_KEY
no painel do Lovable antes de rodar esse prompt.

---

## PROMPT PARA COLAR NO LOVABLE

---

Mantenha todos os arquivos do projeto exceto os que serão alterados abaixo.
Não toque em App.tsx, Resultado.tsx, lastro-score.ts, nem em nenhum componente de UI.

Faça as seguintes alterações cirúrgicas:

---

### 1. Adicionar colunas no Supabase

Execute esse SQL no Supabase SQL Editor antes de qualquer alteração de código:

```sql
alter table diagnostico
  add column if not exists nicho text,
  add column if not exists subnicho text,
  add column if not exists categoria text,
  add column if not exists modelo_negocio text,
  add column if not exists icp_score integer,
  add column if not exists diferencial_score integer,
  add column if not exists canais_testados jsonb,
  add column if not exists tem_historico boolean,
  add column if not exists complementares_usados integer default 0;
```

---

### 2. Criar arquivo `src/lib/topicos.ts`

Esse arquivo define os 9 tópicos, seus dados obrigatórios e os prompts
de extração para a Anthropic API.

```typescript
export type ExtractionResult = {
  suficiente: boolean;
  pergunta_complementar: string | null;
  [key: string]: unknown;
};

export type Topico = {
  id: number;
  campo_principal: string;
  pergunta_inicial: string;
  max_complementares: number;
  system_prompt: string;
  user_prompt_template: string;
};

export const TOPICOS: Topico[] = [
  {
    id: 1,
    campo_principal: 'produto_desc',
    pergunta_inicial: 'O que você vende — e qual problema ele resolve para o seu cliente?',
    max_complementares: 2,
    system_prompt: `Você é um assistente de diagnóstico de marketing brasileiro.
Analise respostas de donos de negócio e extraia dados estruturados.
Responda APENAS com JSON válido, sem texto adicional, sem markdown, sem blocos de código.`,
    user_prompt_template: `Analise a resposta e retorne JSON com:
- produto: string (descrição do produto ou serviço)
- nicho: string (um dos: imobiliaria, clinica_medica, clinica_odontologica, academia, studio_fitness, ecommerce, perfumaria, agencia_mkt, infoproduto, credito_consignado, saas, consultoria, outro)
- subnicho: string ou null (ex: odonto_estetica, studio_fitness_high_ticket, clinica_geral)
- categoria: string (servico | produto | infoproduto | saas)
- modelo_negocio: string (b2b | b2c | b2b2c)
- suficiente: boolean (true se nicho e tipo de produto identificados com clareza)
- pergunta_complementar: string ou null (se suficiente=false, pergunta específica e curta para o que falta — ex: "Clínica de qual especialidade — geral, odontologia ou estética?")

Resposta do usuário: "{{RESPOSTA}}"

Retorne APENAS JSON válido.`,
  },
  {
    id: 2,
    campo_principal: 'icp_desc',
    pergunta_inicial: 'Me descreva a pessoa que mais compra de você. Quem é ela?',
    max_complementares: 2,
    system_prompt: `Você é um assistente de diagnóstico de marketing brasileiro.
Analise respostas de donos de negócio e extraia dados estruturados.
Responda APENAS com JSON válido, sem texto adicional, sem markdown, sem blocos de código.`,
    user_prompt_template: `Analise a resposta e retorne JSON com:
- perfil: string (descrição do perfil identificado)
- especificidade: string (especifico | parcial | vago)
- icp_score: number (especifico=85, parcial=55, vago=20)
- tem_demografico: boolean
- tem_dor: boolean
- suficiente: boolean (true se tem ao menos perfil parcial com alguma dor ou motivação identificável)
- pergunta_complementar: string ou null (se suficiente=false — ex: "Qual a faixa de idade e o que essa pessoa busca quando te contrata?")

IMPORTANTE: "todo mundo", "qualquer pessoa", "todos" = suficiente=false, icp_score=15

Resposta do usuário: "{{RESPOSTA}}"

Retorne APENAS JSON válido.`,
  },
  {
    id: 3,
    campo_principal: 'ticket_medio',
    pergunta_inicial: 'Qual é o ticket médio da sua venda? E como o cliente paga — único, recorrente ou parcelado?',
    max_complementares: 1,
    system_prompt: `Você é um assistente de diagnóstico de marketing brasileiro.
Analise respostas de donos de negócio e extraia dados estruturados.
Responda APENAS com JSON válido, sem texto adicional, sem markdown, sem blocos de código.`,
    user_prompt_template: `Analise a resposta e retorne JSON com:
- ticket_medio: number ou null (extrair valor numérico, aceitar qualquer formato — "mil reais"=1000, "500/mês"=500)
- modelo_cobranca: string (unico | recorrente | parcelado | nao_identificado)
- suficiente: boolean (true se tem valor numérico identificável)
- pergunta_complementar: string ou null (se falta valor → "Qual o valor médio que um cliente paga por vez?", se falta modelo → "Esse valor é por consulta, mensalidade ou parcelado?")

Resposta do usuário: "{{RESPOSTA}}"

Retorne APENAS JSON válido.`,
  },
  {
    id: 4,
    campo_principal: 'concorrentes_desc',
    pergunta_inicial: 'Quem são seus principais concorrentes — e por que um cliente escolheria você no lugar deles?',
    max_complementares: 2,
    system_prompt: `Você é um assistente de diagnóstico de marketing brasileiro.
Analise respostas de donos de negócio e extraia dados estruturados.
Responda APENAS com JSON válido, sem texto adicional, sem markdown, sem blocos de código.`,
    user_prompt_template: `Analise a resposta e retorne JSON com:
- concorrentes: array de strings (nomes ou tipos mencionados)
- diferencial: string ou null (diferencial identificado)
- diferencial_score: number (claro_e_defensavel=90, existe_mas_fraco=55, ausente=20)
- suficiente: boolean (true se ao menos 1 concorrente E algum diferencial identificado)
- pergunta_complementar: string ou null (se sem concorrente → "Quem o cliente contrataria se não fosse você?", se sem diferencial → "O que faz um cliente escolher você em vez deles?")

IMPORTANTE: "não tenho concorrentes", "não sei" = suficiente=false

Resposta do usuário: "{{RESPOSTA}}"

Retorne APENAS JSON válido.`,
  },
  {
    id: 5,
    campo_principal: 'foco_geografico',
    pergunta_inicial: 'Em qual região ou segmento você quer crescer nos próximos 90 dias?',
    max_complementares: 1,
    system_prompt: `Você é um assistente de diagnóstico de marketing brasileiro.
Analise respostas de donos de negócio e extraia dados estruturados.
Responda APENAS com JSON válido, sem texto adicional, sem markdown, sem blocos de código.`,
    user_prompt_template: `Analise a resposta e retorne JSON com:
- regiao: string (cidade, estado ou "nacional")
- segmento: string ou null (segmento de mercado se mencionado)
- suficiente: boolean (true se identificou região OU segmento específico)
- pergunta_complementar: string ou null (se "todo Brasil" ou muito vago → "Começa por qual cidade ou estado?")

Resposta do usuário: "{{RESPOSTA}}"

Retorne APENAS JSON válido.`,
  },
  {
    id: 6,
    campo_principal: 'historico_marketing',
    pergunta_inicial: 'Você já tentou alguma ação de marketing antes? O que funcionou e o que não funcionou?',
    max_complementares: 1,
    system_prompt: `Você é um assistente de diagnóstico de marketing brasileiro.
Analise respostas de donos de negócio e extraia dados estruturados.
Responda APENAS com JSON válido, sem texto adicional, sem markdown, sem blocos de código.`,
    user_prompt_template: `Analise a resposta e retorne JSON com:
- tem_historico: boolean
- canais_testados: array de objetos com {canal: string, resultado: string} (array vazio se não tentou)
- suficiente: boolean (true se claramente disse que tentou COM detalhes, OU claramente disse que nunca tentou)
- pergunta_complementar: string ou null (se disse "sim tentei" sem detalhe → "Quais canais — Instagram, Google, panfleto? O que aconteceu?")

IMPORTANTE: qualquer variação de "nunca tentei", "não fiz nada", "ainda não" = suficiente=true, tem_historico=false

Resposta do usuário: "{{RESPOSTA}}"

Retorne APENAS JSON válido.`,
  },
  {
    id: 7,
    campo_principal: 'budget_total',
    pergunta_inicial: 'Quanto você pode investir por mês em marketing — incluindo ferramenta, mídia e produção?',
    max_complementares: 1,
    system_prompt: `Você é um assistente de diagnóstico de marketing brasileiro.
Analise respostas de donos de negócio e extraia dados estruturados.
Responda APENAS com JSON válido, sem texto adicional, sem markdown, sem blocos de código.`,
    user_prompt_template: `Analise a resposta e retorne JSON com:
- budget_total: number ou null (extrair valor numérico mensal, qualquer formato)
- suficiente: boolean (true se tem qualquer valor numérico identificável)
- pergunta_complementar: string ou null (se "pouco", "não sei", "depende" → "Pensa num valor mensal — mesmo que seja R$200 ou R$500.")

Resposta do usuário: "{{RESPOSTA}}"

Retorne APENAS JSON válido.`,
  },
  {
    id: 8,
    campo_principal: 'meta_clientes',
    pergunta_inicial: 'Quantos clientes novos você precisa fechar por mês para considerar o marketing bem-sucedido?',
    max_complementares: 1,
    system_prompt: `Você é um assistente de diagnóstico de marketing brasileiro.
Analise respostas de donos de negócio e extraia dados estruturados.
Responda APENAS com JSON válido, sem texto adicional, sem markdown, sem blocos de código.`,
    user_prompt_template: `Analise a resposta e retorne JSON com:
- meta_clientes: number ou null (extrair inteiro, aceitar por extenso — "cinco"=5, "uns dez"=10)
- suficiente: boolean (true se tem número identificável)
- pergunta_complementar: string ou null (se "muitos", "quanto mais melhor" → "Me dá um número — 5, 10, 20 por mês?")

Resposta do usuário: "{{RESPOSTA}}"

Retorne APENAS JSON válido.`,
  },
  {
    id: 9,
    campo_principal: 'prazo_esperado',
    pergunta_inicial: 'Em quanto tempo você espera ver os primeiros resultados?',
    max_complementares: 1,
    system_prompt: `Você é um assistente de diagnóstico de marketing brasileiro.
Analise respostas de donos de negócio e extraia dados estruturados.
Responda APENAS com JSON válido, sem texto adicional, sem markdown, sem blocos de código.`,
    user_prompt_template: `Analise a resposta e retorne JSON com:
- prazo_esperado: number ou null (mapear para 30, 60, 90 ou 180 dias — "1 mês"=30, "3 meses"=90, "rápido"=30)
- suficiente: boolean (true se tem prazo identificável)
- pergunta_complementar: string ou null (se "rápido", "logo", "não sei" → "Em quanto tempo — 1 mês, 3 meses, 6 meses?")

Mapeamento: até 30d=30, 31-60d=60, 61-90d=90, mais de 90d=180

Resposta do usuário: "{{RESPOSTA}}"

Retorne APENAS JSON válido.`,
  },
];
```

---

### 3. Criar arquivo `src/lib/anthropic.ts`

Função reutilizável para chamada à Anthropic API.

```typescript
import { ExtractionResult, Topico } from './topicos';

export async function extrairDadosTopico(
  topico: Topico,
  resposta: string,
): Promise<ExtractionResult> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error('VITE_ANTHROPIC_API_KEY não configurada');
    return { suficiente: true, pergunta_complementar: null };
  }

  const userPrompt = topico.user_prompt_template.replace('{{RESPOSTA}}', resposta);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: topico.system_prompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      console.error('Anthropic API error:', response.status);
      return { suficiente: true, pergunta_complementar: null };
    }

    const data = await response.json();
    const texto = data.content?.[0]?.text?.trim() ?? '';

    // Limpar markdown se o modelo incluir
    const jsonLimpo = texto
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    return JSON.parse(jsonLimpo) as ExtractionResult;
  } catch (error) {
    console.error('Erro ao processar resposta da IA:', error);
    // Fallback seguro: avança sem bloquear o usuário
    return { suficiente: true, pergunta_complementar: null };
  }
}
```

---

### 4. Substituir `src/pages/Diagnostico.tsx` completo

Reescrever o arquivo mantendo a estrutura visual existente (classes CSS,
layout, animações) mas substituindo a lógica de perguntas fixas por
tópicos adaptativos.

Alterações na lógica:

**Novos campos de estado — adicionar aos existentes:**
```typescript
const [complementaresUsados, setComplementaresUsados] = useState(0);
const [isProcessingAI, setIsProcessingAI] = useState(false);
const [dadosExtraidos, setDadosExtraidos] = useState<Record<string, unknown>>({});
```

**Substituir `QUESTIONS` por `TOPICOS` de `@/lib/topicos`:**
```typescript
import { TOPICOS } from '@/lib/topicos';
import { extrairDadosTopico } from '@/lib/anthropic';
```

O `currentQuestionIndex` agora representa o tópico atual (0–8), não a pergunta.
A `activeQuestion` pode ser uma pergunta inicial OU uma pergunta complementar gerada pela IA.

**Novo estado para a pergunta ativa:**
```typescript
const [perguntaAtiva, setPerguntaAtiva] = useState<string>(TOPICOS[0].pergunta_inicial);
const [isPerguntaComplementar, setIsPerguntaComplementar] = useState(false);
```

**Substituir `handleSubmit` pela nova lógica adaptativa:**

```typescript
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const trimmedAnswer = answer.trim();
  if (!trimmedAnswer || isProcessingAI) {
    if (!trimmedAnswer) setShouldShake(true);
    return;
  }

  if (!session?.user) return;

  setSaveError('');
  setIsSaving(true);
  setIsProcessingAI(true);

  const topicoAtual = TOPICOS[currentQuestionIndex];

  try {
    // Chamar IA para avaliar a resposta
    const resultado = await extrairDadosTopico(topicoAtual, trimmedAnswer);

    // Mesclar dados extraídos
    const novosDados = { ...dadosExtraidos, ...resultado };
    setDadosExtraidos(novosDados);

    // Adicionar ao histórico visual
    setConversation((current) => [
      ...current,
      { question: perguntaAtiva, answer: trimmedAnswer },
    ]);
    setAnswer('');

    // Salvar no Supabase
    await salvarProgresso(currentQuestionIndex, trimmedAnswer, novosDados, session.user.id);

    const podePerguntarComplementar =
      !resultado.suficiente &&
      complementaresUsados < topicoAtual.max_complementares &&
      resultado.pergunta_complementar;

    if (podePerguntarComplementar) {
      // Fazer pergunta complementar no mesmo tópico
      setComplementaresUsados((n) => n + 1);
      setIsPerguntaComplementar(true);
      window.setTimeout(() => {
        setPerguntaAtiva(resultado.pergunta_complementar as string);
      }, 500);
    } else {
      // Avançar para próximo tópico
      setComplementaresUsados(0);
      setIsPerguntaComplementar(false);

      if (currentQuestionIndex === TOPICOS.length - 1) {
        setIsCompleting(true);
        setCompletionIndex(0);
      } else {
        window.setTimeout(() => {
          const proximoTopico = TOPICOS[currentQuestionIndex + 1];
          setPerguntaAtiva(proximoTopico.pergunta_inicial);
          setCurrentQuestionIndex((index) => index + 1);
        }, 500);
      }
    }
  } catch (error) {
    setSaveError('Não foi possível salvar sua resposta agora.');
  } finally {
    setIsSaving(false);
    setIsProcessingAI(false);
  }
};
```

**Nova função `salvarProgresso`:**

```typescript
const salvarProgresso = async (
  topicoIndex: number,
  resposta: string,
  dados: Record<string, unknown>,
  userId: string,
) => {
  // Mapear campos extraídos para colunas do Supabase
  const payload: Record<string, unknown> = {
    user_id: userId,
    etapa_atual: topicoIndex + 1,
    updated_at: new Date().toISOString(),
  };

  // Campos diretos
  const camposDiretos = [
    'produto_desc', 'icp_desc', 'concorrentes_desc', 'foco_geografico',
    'historico_marketing', 'nicho', 'subnicho', 'categoria', 'modelo_negocio',
    'icp_score', 'diferencial_score', 'canais_testados', 'tem_historico',
    'ticket_medio', 'modelo_cobranca', 'budget_total', 'meta_clientes', 'prazo_esperado',
  ];

  for (const campo of camposDiretos) {
    if (dados[campo] !== undefined && dados[campo] !== null) {
      payload[campo] = dados[campo];
    }
  }

  // Fallback: salvar resposta bruta no campo principal do tópico
  const topico = TOPICOS[topicoIndex];
  if (!payload[topico.campo_principal]) {
    payload[topico.campo_principal] = resposta;
  }

  if (!diagnosticoId) {
    const { data, error } = await supabase
      .from('diagnostico')
      .insert(payload)
      .select('id')
      .single();
    if (error) throw error;
    setDiagnosticoId(data.id);
  } else {
    const { error } = await supabase
      .from('diagnostico')
      .update(payload)
      .eq('id', diagnosticoId);
    if (error) throw error;
  }
};
```

**Atualizar o indicador de progresso e stepLabel:**

```typescript
// Indicador mostra tópico atual — não muda em perguntas complementares
const progressWidth = `${(currentQuestionIndex / TOPICOS.length) * 100}%`;
const stepLabel = isCompleting
  ? `${TOPICOS.length} de ${TOPICOS.length}`
  : `${currentQuestionIndex + 1} de ${TOPICOS.length}`;
```

**Atualizar o useEffect do efeito de digitação:**

Substituir referência a `activeQuestion` por `perguntaAtiva`:

```typescript
useEffect(() => {
  if (loading || isCompleting || !perguntaAtiva) return;
  // ... resto do efeito igual, usando perguntaAtiva no lugar de activeQuestion
}, [perguntaAtiva, isCompleting, loading]);
```

**Indicador de loading da IA — adicionar entre o histórico e o input:**

Quando `isProcessingAI` for true, mostrar três pontos piscando onde
a próxima pergunta vai aparecer:

```tsx
{isProcessingAI && (
  <div className="mb-8">
    <p className="font-display text-[20px] leading-[1.45] text-primary opacity-60">
      <span className="animate-pulse">· · ·</span>
    </p>
  </div>
)}
```

**Desabilitar input durante processamento da IA:**

No campo `disabled` do input e do botão, adicionar `|| isProcessingAI`:
```tsx
disabled={isTyping || isSaving || isProcessingAI}
```

**Retomada de sessão — atualizar `loadDiagnostico`:**

Ao restaurar sessão, usar `TOPICOS[history.length].pergunta_inicial`
para definir `perguntaAtiva`:

```typescript
if (data) {
  const history = buildConversationHistory(data as DiagnosticoRecord);
  setConversation(history);
  setCurrentQuestionIndex(history.length);
  setDiagnosticoId(data.id);
  if (history.length < TOPICOS.length) {
    setPerguntaAtiva(TOPICOS[history.length].pergunta_inicial);
  }
  // ... resto igual
}
```

---

### 5. Atualizar `src/lib/lastro-score.ts`

Pequena alteração: quando `icp_score` e `diferencial_score` já vierem
salvos no banco (extraídos pela IA), usar esses valores em vez de
recalcular localmente.

Atualizar o tipo `DiagnosticoScoreRecord`:

```typescript
export type DiagnosticoScoreRecord = {
  id: string;
  etapa_atual: number | null;
  produto_desc: string | null;
  icp_desc: string | null;
  concorrentes_desc: string | null;
  budget_total: number | null;
  prazo_esperado: number | null;
  icp_score: number | null;        // novo
  diferencial_score: number | null; // novo
};
```

Atualizar `calculateLastroScore` para usar scores pré-calculados quando disponíveis:

```typescript
export const calculateLastroScore = (
  diagnostico: DiagnosticoScoreRecord,
  benchmarks: BenchmarkRow[],
): LastroCalculation => {
  const nicho = resolveNicho(diagnostico.produto_desc, benchmarks);
  const benchmark = benchmarks.find((item) => item.nicho === nicho) ?? null;

  const { score: dim1, budgetMidia } = scoreFinancialViability(
    diagnostico.budget_total,
    benchmark?.cac_min ?? null,
  );

  // Usar score da IA se disponível, senão calcular localmente
  const dim2 = diagnostico.icp_score ?? scoreIcpClarity(diagnostico.icp_desc);
  const dim3 = scoreTimelineAlignment(
    diagnostico.prazo_esperado,
    benchmark?.ciclo_min_dias ?? DEFAULT_CICLO_MIN_DIAS,
  );
  const dim4 = diagnostico.diferencial_score ?? scoreMarketMaturity(diagnostico.concorrentes_desc);

  const score = Math.round(dim1 * 0.4 + dim2 * 0.25 + dim3 * 0.2 + dim4 * 0.15);

  return { budgetMidia, dim1, dim2, dim3, dim4, score, zone: getZone(score), nicho, benchmark };
};
```

---

### O que NÃO alterar

- App.tsx — rotas inalteradas
- Resultado.tsx — inalterado (já consome icp_score e diferencial_score do banco)
- Todos os arquivos em src/components/ui/
- Landing.tsx, Login.tsx, Cadastro.tsx, Dashboard.tsx
- Plano.tsx, Tracker.tsx
- tailwind.config.ts, vite.config.ts

---

### Resultado esperado

Ao final desse prompt:
- `src/lib/topicos.ts` criado com os 9 tópicos e prompts de extração
- `src/lib/anthropic.ts` criado com função de chamada à API
- `src/pages/Diagnostico.tsx` com conversa adaptativa funcionando
- `src/lib/lastro-score.ts` usando scores da IA quando disponíveis
- Indicador "X de 9" mostra tópico — não muda em complementares
- Loading `· · ·` visível durante processamento da IA
- Input desabilitado durante processamento
- Retomada de sessão funcionando com nova lógica
- Fallback seguro se a API falhar (avança sem bloquear)
