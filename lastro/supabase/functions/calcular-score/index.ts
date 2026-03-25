// ============================================================================
// LASTRO — Edge Function: calcular-score
// Supabase Edge Function · Deno Deploy
// ============================================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ── Constantes do Lastro Score ──
// Morgan PM & Pax PO: Pesos recalibrados para priorizar Fundação Estratégica
const PESOS = {
  viabilidade: 0.35, // Antes 0.40
  icp: 0.25,         // Mantido (Pilar 8)
  prazo: 0.15,       // Antes 0.20
  mercado: 0.25,     // Antes 0.15 (Prioriza Diferencial Pilar 10 e StoryBrand Pilar 6)
} as const;

const FISCAL_BR = {
  impostoMetaAds: 0.1215,   // 12.15% em 2026
  iofCartao: 0.0438,
};

// Multiplicadores de sazonalidade por mês (1-indexed, [0] não usado)
const SAZONALIDADE: Record<number, { b2b: number; b2c: number }> = {
  1:  { b2b: 1.00, b2c: 1.20 },   // Janeiro: B2C inflacionado
  2:  { b2b: 1.35, b2c: 1.00 },   // Fevereiro: B2B inflacionado
  3:  { b2b: 1.00, b2c: 1.00 },
  4:  { b2b: 1.00, b2c: 1.00 },
  5:  { b2b: 1.00, b2c: 1.00 },
  6:  { b2b: 1.00, b2c: 1.00 },
  7:  { b2b: 1.00, b2c: 1.00 },
  8:  { b2b: 1.00, b2c: 1.00 },
  9:  { b2b: 1.00, b2c: 1.00 },
  10: { b2b: 1.00, b2c: 1.00 },
  11: { b2b: 1.45, b2c: 1.45 },   // Novembro: Black Friday infla tudo
  12: { b2b: 1.10, b2c: 1.10 },
};

// ── Funções de Cálculo ──

function calcularBudgetMidia(budgetTotal: number): number {
  return budgetTotal * 0.56; // Desconta ferramenta (24%) + produção (20%)
}

function calcularBudgetLiquido(budgetMidia: number, canalPrincipal: string): number {
  if (canalPrincipal === 'meta_ads') {
    return budgetMidia / (1 + FISCAL_BR.impostoMetaAds);
  }
  return budgetMidia;
}

function aplicarSazonalidade(cacBase: number, mes: number, isB2B: boolean): number {
  const mult = SAZONALIDADE[mes] || { b2b: 1.0, b2c: 1.0 };
  return cacBase * (isB2B ? mult.b2b : mult.b2c);
}

function calcularDimensaoViabilidade(budgetMidia: number, cacEstimado: number, metaClientes: number): number {
  if (cacEstimado <= 0) return 0;
  const ciclosPossiveis = budgetMidia / cacEstimado;

  if (ciclosPossiveis >= metaClientes * 1.5) return 100;
  if (ciclosPossiveis >= metaClientes) return 80;
  if (ciclosPossiveis >= metaClientes * 0.5) return 50;
  if (ciclosPossiveis >= 1) return 25;
  return 0;
}

function calcularDimensaoPrazo(prazoEsperado: string, cicloMinDias: number): number {
  const prazo = parseInt(prazoEsperado);
  const ratio = prazo / cicloMinDias;

  if (ratio >= 3) return 100;
  if (ratio >= 2) return 80;
  if (ratio >= 1) return 60;
  if (ratio >= 0.5) return 30;
  return 0;
}

function determinarZona(score: number): string {
  if (score >= 80) return 'pronto';
  if (score >= 60) return 'ressalvas';
  if (score >= 40) return 'ajuste';
  return 'critico';
}

// ── Handler Principal ──

serve(async (req) => {
  try {
    const { diagnostico_id } = await req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // 1. Buscar o diagnóstico
    const { data: diag, error: diagError } = await supabase
      .from('diagnostico')
      .select('*')
      .eq('id', diagnostico_id)
      .single();

    if (diagError || !diag) {
      return new Response(JSON.stringify({ error: 'Diagnóstico não encontrado' }), { status: 404 });
    }

    // 2. Calcular budget_midia
    const budgetMidia = calcularBudgetMidia(diag.budget_total);

    // 3. Buscar benchmark do nicho
    const { data: benchmark } = await supabase
      .from('cac_benchmark')
      .select('*')
      .eq('nicho', diag.nicho)
      .eq('subnicho', diag.subnicho || 'geral')
      .single();

    const cacMedio = benchmark
      ? (benchmark.cac_min + benchmark.cac_max) / 2
      : 500; // Fallback seguro

    // 4. ACSD: Aplicar impostos e sazonalidade
    const mesAtual = new Date().getMonth() + 1;
    const isB2B = diag.modelo_negocio === 'b2b';
    const canalPrincipal = benchmark?.canal_principal?.[0] || 'meta_ads';

    const budgetLiquido = calcularBudgetLiquido(budgetMidia, canalPrincipal);
    const cacAjustado = aplicarSazonalidade(cacMedio, mesAtual, isB2B);

    // 5. Calcular as 4 dimensões
    const scoreViabilidade = calcularDimensaoViabilidade(budgetLiquido, cacAjustado, diag.meta_clientes || 1);
    const scoreIcp = diag.icp_score || 0;
    const scorePrazo = calcularDimensaoPrazo(diag.prazo_esperado || '90', benchmark?.ciclo_min_dias || 30);
    const scoreMercado = diag.diferencial_score || 0;

    // 6. Calcular score final ponderado
    const lastroScore = Math.round(
      scoreViabilidade * PESOS.viabilidade +
      scoreIcp * PESOS.icp +
      scorePrazo * PESOS.prazo +
      scoreMercado * PESOS.mercado
    );

    const zona = determinarZona(lastroScore);

    // 7. Atualizar diagnóstico
    const { error: updateError } = await supabase
      .from('diagnostico')
      .update({
        budget_midia: budgetMidia,
        budget_midia_liquido: budgetLiquido,
        cac_estimado: cacMedio,
        cac_ajustado_imposto: cacMedio * (canalPrincipal === 'meta_ads' ? (1 + FISCAL_BR.impostoMetaAds) : 1),
        cac_ajustado_sazonalidade: cacAjustado,
        mes_diagnostico: mesAtual,
        lastro_score: lastroScore,
        zona,
        score_viabilidade: scoreViabilidade,
        score_icp: scoreIcp,
        score_prazo: scorePrazo,
        score_mercado: scoreMercado,
      })
      .eq('id', diagnostico_id);

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({
      lastro_score: lastroScore,
      zona,
      dimensoes: {
        viabilidade: scoreViabilidade,
        icp: scoreIcp,
        prazo: scorePrazo,
        mercado: scoreMercado,
      },
      acsd: {
        budget_midia: budgetMidia,
        budget_liquido: budgetLiquido,
        cac_medio_nicho: cacMedio,
        cac_ajustado: cacAjustado,
        mes: mesAtual,
      },
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
});
