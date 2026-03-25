/**
 * ============================================================================
 * LASTRO — TypeScript Types Centralizados
 * ============================================================================
 * Objeto de diagnóstico tipado — importado por todos os módulos e Edge Functions.
 * Decisão técnica crítica #1: type centralizado desde o dia 1.
 */

// ── Enums ──────────────────────────────────────────────────────────────────

export type ModeloCobranca = 'unico' | 'recorrente' | 'parcelado';
export type PrazoEsperado = '30' | '60' | '90' | '180';
export type ZonaDiagnostico = 'critico' | 'ajuste' | 'ressalvas' | 'pronto';
export type StatusPlano = 'no_prazo' | 'atencao' | 'revisao';
export type CausaDesvio = 'canal' | 'mensagem' | 'icp' | 'diagnostico';
export type NivelConfianca = 'alta' | 'media' | 'baixa';
export type FonteBenchmark = 'memoria_agencia' | 'benchmark_ajustado' | 'dado_proprio';
export type CategoriaModelo = 'servico' | 'produto' | 'infoproduto' | 'saas';
export type ModeloNegocio = 'b2b' | 'b2c' | 'b2b2c';

// ── Objeto Central: Diagnóstico ────────────────────────────────────────────

export interface Diagnostico {
  id: string;
  user_id: string;

  // M1: Inputs do Usuário (9 tópicos)
  produto_desc: string | null;
  icp_desc: string | null;
  ticket_medio: number | null;
  modelo_cobranca: ModeloCobranca | null;
  concorrentes_desc: string | null;
  foco_geografico: string | null;
  historico_marketing: string | null;
  budget_total: number | null;
  meta_clientes: number | null;
  prazo_esperado: PrazoEsperado | null;

  // M1: Campos Calculados (IA + Algoritmos)
  budget_midia: number | null;
  nicho: string | null;
  subnicho: string | null;
  categoria: CategoriaModelo | null;
  modelo_negocio: ModeloNegocio | null;
  icp_score: number | null;
  diferencial_score: number | null;
  cac_estimado: number | null;
  canais_testados: CanalTestado[] | null;
  tem_historico: boolean;

  // M1: Lastro Score
  lastro_score: number | null;
  zona: ZonaDiagnostico | null;
  score_viabilidade: number | null;
  score_icp: number | null;
  score_prazo: number | null;
  score_mercado: number | null;

  // ACSD: Contexto Brasileiro
  cac_ajustado_imposto: number | null;
  cac_ajustado_sazonalidade: number | null;
  mes_diagnostico: number | null;
  budget_midia_liquido: number | null;

  // AELI: Pivot de ICP
  pivot_sugerido: boolean;
  pivot_subnicho: string | null;
  pivot_justificativa: string | null;

  // M1: Outputs IA
  relatorio_viabilidade: string | null;
  plano_acao: string | null;
  prompt_version: string;

  // M2: GTM
  clientes_pagando: boolean | null;
  canais_recomendados: CanalRecomendado[] | null;
  canais_bloqueados: CanalBloqueado[] | null;
  plano_90_dias: SemanaPlano[] | null;
  metricas_acompanhamento: MetricaAcompanhamento[] | null;
  threshold_alerta: number | null;

  // M3: Tracker
  status_plano: StatusPlano | null;
  cac_real: number | null;
  lastro_score_atualizado: number | null;

  // Controle
  etapa_atual: number;
  topico_atual: number;
  data_inicio_plano: string | null;
  created_at: string;
  updated_at: string;
}

// ── Subtipos do Diagnóstico ────────────────────────────────────────────────

export interface CanalTestado {
  canal: string;
  resultado: 'funcionou' | 'nao_funcionou' | 'parcial';
  motivo_percebido: string;
  flag: 'ja_tentado';
}

export interface CanalRecomendado {
  nome: string;
  prioridade: number;
  justificativa: string;
  budget_sugerido: number;
}

export interface CanalBloqueado {
  nome: string;
  motivo: string;
}

export interface SemanaPlano {
  semana: number;
  foco: string;
  acoes: string[];
  marco: string;
}

export interface MetricaAcompanhamento {
  nome: string;
  meta_s4: number;
  meta_s8: number;
  meta_s12: number;
}

// ── Tabela: CAC Benchmark ──────────────────────────────────────────────────

export interface CacBenchmark {
  id: string;
  nicho: string;
  subnicho: string | null;
  cpl_min: number;
  cpl_max: number;
  cac_min: number;
  cac_max: number;
  canal_principal: string[];
  ciclo_min_dias: number;
  ciclo_max_dias: number;
  confianca: NivelConfianca;
  fonte: FonteBenchmark;
  amostras_coletadas: number;
  ultima_calibracao: string | null;
  created_at: string;
  updated_at: string;
}

// ── Tabela: Resultado Semanal (M3) ─────────────────────────────────────────

export interface ResultadoSemanal {
  id: string;
  diagnostico_id: string;
  user_id: string;
  semana: number;
  investimento_real: number | null;
  resultado_real: number | null;
  cac_emergente: number | null;
  status: StatusPlano | null;
  causa_desvio: CausaDesvio | null;
  correcao_sugerida: string | null;
  canal_reportado: string | null;
  created_at: string;
}

// ── Tabela: Conversa Tópico (M1 Adaptativo) ────────────────────────────────

export interface ConversaTopico {
  id: string;
  diagnostico_id: string;
  topico: number;
  pergunta_principal: string;
  resposta_usuario: string | null;
  complementares_feitas: number;
  complementares_max: number;
  dados_extraidos: Record<string, unknown> | null;
  confianca_extracao: NivelConfianca | null;
  suficiente: boolean;
  prompt_version: string;
  created_at: string;
}

// ── Outputs das Edge Functions ──────────────────────────────────────────────

/** Output do Prompt 1: Extração de Nicho */
export interface OutputExtracaoNicho {
  nicho: string;
  subnicho: string;
  categoria: CategoriaModelo;
  modelo_negocio: ModeloNegocio;
  ticket_estimado: 'baixo' | 'medio' | 'alto';
  confianca: number;
}

/** Output do Prompt 2: Score de ICP */
export interface OutputScoreICP {
  icp_score: number;
  nivel: 'especifico' | 'parcial' | 'vago';
  dimensoes: {
    demografica: number;
    comportamental: number;
    dor: number;
  };
  flag: 'especifico' | 'parcial' | 'vago';
  observacao: string;
}

/** Output do Prompt 3: Diferencial Competitivo */
export interface OutputDiferencial {
  diferencial_score: number;
  tem_diferencial: boolean;
  tipo_diferencial: 'preco' | 'qualidade' | 'especializacao' | 'atendimento' | 'localizacao' | 'nenhum';
  defensabilidade: 'alta' | 'media' | 'baixa';
  observacao: string;
}

/** Output do Prompt 4: Histórico de Marketing */
export interface OutputHistorico {
  tem_historico: boolean;
  canais_tentados: CanalTestado[];
  padroes_identificados: string;
  recomendacao_historico: string;
}

// ── Lastro Score: Cálculo ──────────────────────────────────────────────────

export interface LastroScoreInput {
  budget_midia: number;
  cac_estimado: number;
  meta_clientes: number;
  icp_score: number;
  diferencial_score: number;
  prazo_esperado: PrazoEsperado;
  ciclo_min_dias: number;
}

export interface LastroScoreOutput {
  lastro_score: number;
  zona: ZonaDiagnostico;
  dimensoes: {
    viabilidade: number;   // Peso: 40%
    icp: number;           // Peso: 25%
    prazo: number;         // Peso: 20%
    mercado: number;       // Peso: 15%
  };
}

// ── ACSD: Motor de Soberania Brasil ────────────────────────────────────────

export interface ConfiguracaoFiscalBR {
  impostoMetaAds: number;           // 0.1215 (12.15% em 2026)
  iofCartaoInternacional: number;   // 0.0438
}

export interface RelatorioViabilidadeBR {
  budgetMidiaReal: number;
  cacAjustado: number;
  tetoClientesPossivel: number;
  status: 'VIAVEL' | 'INVIAVEL' | 'ALERTA_SAZONAL';
  parecerTecnico: string;
}

// ── AEE: Emulador CMO ─────────────────────────────────────────────────────

export type CanalTracao =
  | 'Meta Ads'
  | 'Google Ads'
  | 'LinkedIn Ads'
  | 'Indicação'
  | 'Orgânico'
  | 'Outbound Direto';

// ── AFP: Flywheel Proprietário ─────────────────────────────────────────────

export interface IngestaoFlywheel {
  nicho: string;
  subnicho: string;
  canal: string;
  investimento_real: number;
  leads_gerados: number;
  vendas_realizadas: number;
  ciclo_venda_dias_real: number;
}

// ── AUD: UX Defensiva — Dicionário de Copies ───────────────────────────────

export interface CopyAUD {
  condicao: string;
  copy: string;
}

export const UX_DICTIONARY_M3: Record<string, CopyAUD> = {
  causa_canal_errado: {
    condicao: 'CPL alto + cliques baixos',
    copy: 'Alerta de Leilão. O custo por clique no [Canal] está inviabilizando seu CAC. O orçamento está sendo consumido sem gerar tráfego suficiente. Sugestão imediata: pausar campanha e testar [Canal Alternativo].',
  },
  causa_mensagem_errada: {
    condicao: 'Cliques ok + conversão baixa',
    copy: 'Fricção de Funil. O [Canal] está entregando tráfego no custo certo, mas a página de destino não está convertendo. Não aumente o budget. O plano exige revisão de Copy (M9) ou Webdesign (M5) antes de continuar.',
  },
  causa_icp_errado: {
    condicao: 'Leads chegam + não convertem no CRM',
    copy: 'Desalinhamento de ICP. Estamos comprando leads no custo correto, mas o fechamento comercial falhou. A segmentação atual está atraindo curiosos, não compradores. Ação: Revisar os parâmetros de público (M10).',
  },
  causa_diagnostico_otimista: {
    condicao: 'CAC real acima em todos os canais',
    copy: 'Recalibragem Necessária. O CAC real do seu nicho provou ser superior ao estimado inicialmente. Com o budget atual, a meta original é matematicamente improvável. O Lastro Score foi atualizado. Veja o novo cenário possível.',
  },
};
