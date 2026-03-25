// ============================================================================
// LASTRO — Edge Function: calcular-desvio
// Módulo 3: Tracker · Integra AUD (UX Defensiva) + AFP (Flywheel)
// ============================================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ── AUD: Dicionário de UX Defensiva ──

const COPY_AUD: Record<string, { condicao: string; copy: string; acao: string }> = {
  canal: {
    condicao: 'CPL alto + cliques baixos',
    copy: 'Alerta de Leilão. O custo por clique está inviabilizando seu CAC. O orçamento está sendo consumido sem gerar tráfego suficiente.',
    acao: 'Pausar campanha atual e testar canal alternativo (Pilar 15: GTM Engine).',
  },
  mensagem: {
    condicao: 'Cliques ok + conversão baixa',
    copy: 'Fricção de Funil. O canal está entregando tráfego no custo certo, mas a página de destino não está convertendo. Não aumente o budget.',
    acao: 'Revisar Copy e StoryBrand (Pilar 6) antes de continuar.',
  },
  icp: {
    condicao: 'Leads chegam + não convertem no CRM',
    copy: 'Desalinhamento de ICP. Estamos comprando leads no custo correto, mas o fechamento comercial falhou. A segmentação atual está atraindo curiosos, não compradores.',
    acao: 'Revisar o ICP (Pilar 8) e Personas de Early Adopters (Pilar 7).',
  },
  diagnostico: {
    condicao: 'CAC real acima em todos os canais',
    copy: 'Resiliência no Messy Middle (Pilar 20). O CAC real provou ser superior ao esperado. Esta é a fase de ajuste incerta entre o lançamento e o sucesso.',
    acao: 'Aplicar Ciclo Build-Measure-Learn (Pilar 11). O Lastro Score foi atualizado para este novo cenário.',
  },
};

// ── AFP: Flywheel de Benchmark ──

const AFP_PESO_HISTORICO = 0.85;
const AFP_PESO_NOVO = 0.15;

interface StatusDesvio {
  status: 'no_prazo' | 'atencao' | 'revisao';
  causa: string | null;
  correcao: string | null;
  copyAUD: string | null;
}

function classificarStatus(resultadoReal: number, metaSemana: number): StatusDesvio {
  const percentual = metaSemana > 0 ? (resultadoReal / metaSemana) * 100 : 0;

  if (percentual >= 80) {
    return { status: 'no_prazo', causa: null, correcao: null, copyAUD: null };
  }

  if (percentual >= 40) {
    return {
      status: 'atencao',
      causa: null,
      correcao: 'O plano está abaixo da meta. Analise as métricas intermediárias para identificar o gargalo.',
      copyAUD: null,
    };
  }

  // Status revisão — precisa identificar causa
  return {
    status: 'revisao',
    causa: null,       // Preenchido na lógica principal
    correcao: null,    // Preenchido na lógica principal
    copyAUD: null,     // Preenchido na lógica principal
  };
}

// ── Handler ──

serve(async (req) => {
  try {
    const { diagnostico_id, semana, investimento_real, resultado_real, canal_reportado } = await req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // 1. Buscar diagnóstico e métricas
    const { data: diag, error: diagError } = await supabase
      .from('diagnostico')
      .select('*, metricas_acompanhamento, threshold_alerta, cac_estimado, nicho, subnicho')
      .eq('id', diagnostico_id)
      .single();

    if (diagError || !diag) {
      return new Response(JSON.stringify({ error: 'Diagnóstico não encontrado' }), { status: 404 });
    }

    // 2. Calcular CAC emergente
    const cacEmergente = resultado_real > 0 ? investimento_real / resultado_real : null;

    // 3. Determinar meta da semana
    const metricas = diag.metricas_acompanhamento || [];
    const metricaLeads = metricas.find((m: any) => m.nome === 'Leads gerados');
    let metaSemana = 0;
    if (metricaLeads) {
      if (semana <= 4) metaSemana = metricaLeads.meta_s4;
      else if (semana <= 8) metaSemana = metricaLeads.meta_s8;
      else metaSemana = metricaLeads.meta_s12;
    }

    // 4. Classificar status
    let desvio = classificarStatus(resultado_real, metaSemana);

    // 5. Se revisão, identificar causa (heurística simples v1)
    let causaDesvio: string | null = null;
    if (desvio.status === 'revisao' && cacEmergente !== null) {
      if (cacEmergente > (diag.cac_estimado || 500) * 2) {
        // CAC real muito acima em todos os cenários
        causaDesvio = 'diagnostico';
      } else if (resultado_real === 0 && investimento_real > 0) {
        // Gastou mas não gerou nada
        causaDesvio = 'canal';
      } else if (resultado_real > 0 && cacEmergente > (diag.cac_estimado || 500) * 1.5) {
        // Gerou mas com custo alto demais
        causaDesvio = 'mensagem';
      } else {
        causaDesvio = 'icp';
      }

      const aud = COPY_AUD[causaDesvio];
      desvio.causa = causaDesvio;
      desvio.correcao = aud.acao;
      desvio.copyAUD = aud.copy;
    }

    // 6. Salvar resultado semanal
    const { error: insertError } = await supabase
      .from('resultado_semanal')
      .upsert({
        diagnostico_id,
        user_id: diag.user_id,
        semana,
        investimento_real,
        resultado_real,
        cac_emergente: cacEmergente,
        status: desvio.status,
        causa_desvio: causaDesvio,
        correcao_sugerida: desvio.copyAUD ? `${desvio.copyAUD} ${desvio.correcao}` : desvio.correcao,
        canal_reportado,
      }, {
        onConflict: 'diagnostico_id,semana',
      });

    if (insertError) {
      return new Response(JSON.stringify({ error: insertError.message }), { status: 500 });
    }

    // 7. Atualizar status do diagnóstico
    const updatePayload: Record<string, unknown> = {
      status_plano: desvio.status,
    };

    if (cacEmergente !== null) {
      updatePayload.cac_real = cacEmergente;
    }

    await supabase
      .from('diagnostico')
      .update(updatePayload)
      .eq('id', diagnostico_id);

    // 8. AFP: Retroalimentar benchmark (se temos dados reais)
    if (cacEmergente !== null && diag.nicho) {
      const { data: benchmark } = await supabase
        .from('cac_benchmark')
        .select('*')
        .eq('nicho', diag.nicho)
        .eq('subnicho', diag.subnicho || 'geral')
        .single();

      if (benchmark) {
        const cacMedioAtual = (benchmark.cac_min + benchmark.cac_max) / 2;
        const novoCacMedio = (cacMedioAtual * AFP_PESO_HISTORICO) + (cacEmergente * AFP_PESO_NOVO);

        await supabase
          .from('cac_benchmark')
          .update({
            cac_min: Math.min(benchmark.cac_min, cacEmergente * 0.8),
            cac_max: Math.max(benchmark.cac_max, cacEmergente * 1.2),
            amostras_coletadas: (benchmark.amostras_coletadas || 0) + 1,
            ultima_calibracao: new Date().toISOString(),
            confianca: (benchmark.amostras_coletadas || 0) + 1 >= 50 ? 'alta' : ((benchmark.amostras_coletadas || 0) + 1 >= 10 ? 'media' : 'baixa'),
          })
          .eq('id', benchmark.id);
      }
    }

    return new Response(JSON.stringify({
      semana,
      status: desvio.status,
      cac_emergente: cacEmergente,
      causa_desvio: causaDesvio,
      correcao: desvio.correcao,
      copy_aud: desvio.copyAUD,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
});
