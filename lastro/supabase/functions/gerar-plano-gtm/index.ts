import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Interface auxiliar para os Canais
interface CanalStatus {
  id: string;
  nome: string;
  status: 'aprovado' | 'bloqueado';
  motivo_bloqueio?: string;
  justificativa_aprovacao?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { diagnostico_id, clientes_pagando } = await req.json();

    if (!diagnostico_id) {
      throw new Error('diagnostico_id é obrigatório');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Buscar os dados completos do diagnóstico
    const { data: diag, error } = await supabase
      .from('diagnostico')
      .select('*')
      .eq('id', diagnostico_id)
      .single();

    if (error || !diag) throw new Error('Diagnóstico não encontrado');

    // Se o Score final (que deve ter sido calculado antes) for menor que 40, bloqueio duro.
    if (diag.score_final && diag.score_final < 40) {
      return new Response(JSON.stringify({
        success: false,
        bloqueado: true,
        motivo: 'Score crítico. Requer Pivot Lateral (AELI) antes de investir em GTM.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200, // Retornamos 200 com payload amigável para a UI renderizar o bloqueio
      });
    }

    // Variáveis Base para o AEE (Avaliador de Eficiência Estratégica)
    const budgetTotal = diag.budget_total || 0;
    const budgetMidia = budgetTotal * 0.56; // Regra global de distribuição
    const cacEsperado = diag.cac_esperado || 250; 
    const ciclosDeCac = budgetMidia / cacEsperado;
    const icpScore = 80; // Hardcoded no MVP mock, num DB real viria da extracao do M1
    const ticketMedio = diag.ticket_medio || 0;
    const prazo = diag.prazo_esperado || 90;

    const canais: CanalStatus[] = [];

    // --- HARD GATES (Regras do Manifesto v4) ---

    // 1. Meta Ads / Tráfego Pago Base
    if (!clientes_pagando) {
      canais.push({
        id: 'meta_ads', nome: 'Meta Ads', status: 'bloqueado',
        motivo_bloqueio: 'Produto sem validação de pagamento. Foque em indicação/orgânico 1:1 primeiro.'
      });
    } else if (budgetMidia < 600) {
      canais.push({
        id: 'meta_ads', nome: 'Meta Ads', status: 'bloqueado',
        motivo_bloqueio: 'Orçamento de mídia insuficiente (< R$600).'
      });
    } else if (ciclosDeCac < 3) {
      canais.push({
        id: 'meta_ads', nome: 'Meta Ads', status: 'bloqueado',
        motivo_bloqueio: `Budget suporta apenas ${ciclosDeCac.toFixed(1)} ciclos de CAC. Mínimo exigido: 3.`
      });
    } else if (icpScore < 40) {
      canais.push({
        id: 'meta_ads', nome: 'Meta Ads', status: 'bloqueado',
        motivo_bloqueio: 'Score de ICP muito baixo. Anúncios vão sangrar caixa sem conversão.'
      });
    } else {
      canais.push({
        id: 'meta_ads', nome: 'Meta Ads', status: 'aprovado',
        justificativa_aprovacao: 'Caixa e ICP validados. Canal prioritário de tração.'
      });
    }

    // 2. SEO e Inbound (Orgânico Longo Prazo)
    if (prazo <= 30) {
      canais.push({
        id: 'seo', nome: 'SEO & Inbound', status: 'bloqueado',
        motivo_bloqueio: 'Expectativa de prazo muito curta (30 dias). SEO requer 6+ meses.'
      });
    } else {
      canais.push({
        id: 'seo', nome: 'SEO & Inbound', status: 'aprovado',
        justificativa_aprovacao: 'Prazo alinhado para construção de autoridade contínua.'
      });
    }

    // 3. Outbound & LinkedIn B2B
    if (ticketMedio < 200 && diag.modelo_negocio !== 'B2C') {
      canais.push({
        id: 'outbound', nome: 'Outbound / LinkedIn', status: 'bloqueado',
        motivo_bloqueio: 'Ticket muito baixo para justificar o esforço humano de prospecção.'
      });
    } else {
      canais.push({
        id: 'outbound', nome: 'Outbound / Social Selling', status: 'aprovado',
        justificativa_aprovacao: 'Ticket alto comporta o CAC humano.'
      });
    }

    // Gerar Tabela do Plano de 90 Dias Científico (Sincronizado com Roadmap de 20 Pilares)
    const plano90Dias = Array.from({ length: 12 }, (_, i) => {
      const semana = i + 1;
      let foco = '';
      let acoes: string[] = [];
      let pilarRelacionado = '';

      if (semana <= 4) {
        foco = 'Fase 1: Descoberta e Fundação Estratégica';
        pilarRelacionado = 'Pilares 1-5 (Diagnóstico, Propósito, Categoria)';
        acoes = [
          'Realizar Análise SWOT profunda (Pilar 1)',
          'Definir o "Porquê" central (Start with Why - Pilar 2)',
          'Validar Posicionamento vs Competidores (Pilar 5)'
        ];
      } else if (semana <= 8) {
        foco = 'Fase 2: Construção da Narrativa e Cliente';
        pilarRelacionado = 'Pilares 6-10 (StoryBrand, ICP, Proposta de Valor)';
        acoes = [
          'StoryBrand: Mapear o Cliente como Herói (Pilar 6)',
          'Refinar ICP e Personas de Early Adopters (Pilar 8)',
          'Articular Proposta de Valor "Obviously Awesome" (Pilar 10)'
        ];
      } else {
        foco = 'Fase 3: Execução e Engajamento';
        pilarRelacionado = 'Pilares 11-15 (Lean Startup, Hooked, GTM Engine)';
        acoes = [
          'Setup do Motor de GTM e Teste de Canais (Pilar 15)',
          'Implementar Ciclo Build-Measure-Learn (Pilar 11)',
          'Projetar Gatilhos do Modelo de Gancho (Pilar 12)'
        ];
      }

      const leadsMeta = Math.round((budgetMidia / 30) * (semana * 0.15));

      return {
        semana,
        foco,
        fase: pilarRelacionado,
        acoes,
        metricas_meta: {
          leads: leadsMeta,
          vendas: Math.ceil(leadsMeta * 0.05),
          investimento_semana: Math.round(budgetMidia / 4),
        }
      };
    });

    return new Response(JSON.stringify({ 
      success: true, 
      bloqueado: false,
      canais,
      plano_90_dias: plano90Dias
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
