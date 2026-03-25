// ============================================================================
// LASTRO — Edge Function: processar-respostas-abertas
// Chama Anthropic API com os 4 prompts para extrair dados estruturados
// ============================================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const MAX_TOKENS = 1000;
const TEMPERATURE = 0.2;

// ── Prompts Versionados (v1) ──

const PROMPTS = {
  v1: {
    nicho: (produtoDesc: string) => `Você é um Estrategista de GTM (Persona Morgan PM).
Analise o negócio sob a ótica do Pilar 3 (Category Design) e Pilar 5 (Posicionamento).

Descrição: ${produtoDesc}

Avalie:
- Categoria (Pilar 3): O negócio está em uma categoria saturada (Oceano Vermelho) ou criando uma nova (Oceano Azul)?
- Posicionamento (Pilar 5): Como ele se diferencia na mente do consumidor?

Retorne APENAS um JSON válido: { "nicho", "subnicho", "categoria", "modelo_negocio", "category_design_score", "posicionamento_obs" }`,

    icp: (icpDesc: string) => `Você é um Consultor de Crescimento (Persona Pax PO).
Avalie o ICP sob a ótica do Pilar 7 (Crossing the Chasm) e Pilar 8 (ICP & Personas).

Descrição do cliente: ${icpDesc}

Avalie (0-100):
- Precisão (Pilar 8): O perfil é específico o suficiente para evitar desperdício?
- Maturidade (Pilar 7): O negócio foca em Early Adopters ou já tenta atravessar o abismo para a Maioria Inicial?

Retorne APENAS JSON: { "icp_score", "nivel", "dimensoes": { "precisao", "maturidade", "dor" }, "framework_feedback": "Obs baseada no documento GTM" }`,

    diferencial: (concorrentesDesc: string) => `Você é um Especialista em Branding Empático.
Analise o diferencial sob o Pilar 6 (StoryBrand) e Pilar 10 (Obvioulsy Awesome).

Diferencial: ${concorrentesDesc}

Avalie:
- O Cliente é o Herói? (Pilar 6): O diferencial foca no sucesso do cliente ou no ego da empresa?
- Valor Único (Pilar 10): É "obviamente incrível" ou genérico?

Retorne APENAS JSON: { "diferencial_score", "storybrand_rating", "valor_unico_obs" }`,

    historico: (historicoMarketing: string) => `Você é um Especialista em GTM Engine.
Analise o histórico sob o Pilar 11 (Lean Startup) e Pilar 15 (GTM Engine).

Histórico: ${historicoMarketing}

Avalie:
- Aprendizado Ágil (Pilar 11): Houve ciclo de "Build-Measure-Learn" nas tentativas anteriores?
- Canais (Pilar 15): O motor de GTM está sendo construído ou são apenas tentativas aleatórias?

Retorne APENAS JSON: { "tem_historico", "canais_tentados", "lean_startup_score", "recomendacao_gtm" }`,
  },
};

import { LLMService } from '../_shared/llm-service.ts';

const llm = new LLMService();

// ── Handler Principal ──

serve(async (req) => {
  try {
    const { diagnostico_id } = await req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // 1. Buscar diagnóstico
    const { data: diag, error: diagError } = await supabase
      .from('diagnostico')
      .select('produto_desc, icp_desc, concorrentes_desc, historico_marketing')
      .eq('id', diagnostico_id)
      .single();

    if (diagError || !diag) {
      return new Response(JSON.stringify({ error: 'Diagnóstico não encontrado' }), { status: 404 });
    }

    const version = 'v1';
    const prompts = PROMPTS[version];

    // 2. Executar os 4 prompts em paralelo usando o LLMService
    const [nichoResult, icpResult, diferencialResult, historicoResult] = await Promise.allSettled([
      diag.produto_desc ? llm.call({ prompt: prompts.nicho(diag.produto_desc), diagnosticoId: diagnostico_id, actionType: 'analysis', jsonMode: true }) : Promise.resolve(null),
      diag.icp_desc ? llm.call({ prompt: prompts.icp(diag.icp_desc), diagnosticoId: diagnostico_id, actionType: 'analysis', jsonMode: true }) : Promise.resolve(null),
      diag.concorrentes_desc ? llm.call({ prompt: prompts.diferencial(diag.concorrentes_desc), diagnosticoId: diagnostico_id, actionType: 'analysis', jsonMode: true }) : Promise.resolve(null),
      diag.historico_marketing ? llm.call({ prompt: prompts.historico(diag.historico_marketing), diagnosticoId: diagnostico_id, actionType: 'analysis', jsonMode: true }) : Promise.resolve(null),
    ]);

    // 3. Extrair resultados (com fallback seguro)
    const nicho = nichoResult.status === 'fulfilled' ? nichoResult.value : null;
    const icp = icpResult.status === 'fulfilled' ? icpResult.value : null;
    const diferencial = diferencialResult.status === 'fulfilled' ? diferencialResult.value : null;
    const historico = historicoResult.status === 'fulfilled' ? historicoResult.value : null;

    // 4. Consolidar Insights Científicos (Morgan PM & Pax PO)
    const updatePayload: Record<string, any> = {
      prompt_version: version,
    };
    let relatorioCientifico = `### 🎯 Análise Estratégica (20 Pilares GTM)\n\n`;

    if (nicho) {
      const n = nicho as any;
      updatePayload.nicho = n.nicho;
      updatePayload.subnicho = n.subnicho;
      updatePayload.categoria = n.categoria;
      updatePayload.modelo_negocio = n.modelo_negocio;
      relatorioCientifico += `**Fundação:**\n- Categoria (P3): ${n.category_design_score}/100\n- Posicionamento (P5): ${n.posicionamento_obs}\n\n`;
    }

    if (icp) {
      const i = icp as any;
      updatePayload.icp_score = i.icp_score;
      relatorioCientifico += `**Cliente & Narrativa:**\n- Framework (P7/P8): ${i.framework_feedback}\n- Maturidade: ${i.dimensoes?.maturidade || 0}/100\n\n`;
    }

    if (diferencial) {
      const d = diferencial as any;
      updatePayload.diferencial_score = d.diferencial_score;
      relatorioCientifico += `**Diferenciação:**\n- StoryBrand (P6): ${d.storybrand_rating}\n- Valor Único (P10): ${d.valor_unico_obs}\n\n`;
    }

    if (historico) {
      const h = historico as any;
      updatePayload.canais_testados = h.canais_tentados;
      updatePayload.tem_historico = h.tem_historico;
      relatorioCientifico += `**Execução:**\n- Lean Startup (P11): ${h.lean_startup_score}/100\n- GTM Engine (P15): ${h.recomendacao_gtm}\n\n`;
    }

    updatePayload.relatorio_viabilidade = relatorioCientifico;

    const { error: updateError } = await supabase
      .from('diagnostico')
      .update(updatePayload)
      .eq('id', diagnostico_id);

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({
      success: true,
      extraido: {
        nicho: nicho || { status: 'fallback' },
        icp: icp || { status: 'fallback' },
        diferencial: diferencial || { status: 'fallback' },
        historico: historico || { status: 'fallback' },
      },
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
});
