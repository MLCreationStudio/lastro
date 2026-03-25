/\*\*  
 \* \============================================================================  
 \* LASTRO CORE SDK \- MOTOR DE REGRAS E ALGORITMOS (v2.0)  
 \* \============================================================================  
 \* Este arquivo contém o cérebro matemático e estratégico do Manifesto v4.  
 \* Ele mitiga os 7 riscos mapeados e blinda o modelo de negócio contra IAs genéricas.  
 \*/

import { createClient } from '@supabase/supabase-js';

// Inicialização do cliente Supabase (Substituir pelas variáveis de ambiente reais)  
const supabaseUrl \= process.env.SUPABASE\_URL || 'https://xyzcompany.supabase.co';  
const supabaseKey \= process.env.SUPABASE\_ANON\_KEY || 'public-anon-key';  
const supabase \= createClient(supabaseUrl, supabaseKey);

/\*\*  
 \* \============================================================================  
 \* 1\. LASTRO ACE (Algoritmo de Concretude Executável)  
 \* Foco: Impedir conselhos genéricos. Força a criação de "Briefings Invioláveis".  
 \* \============================================================================  
 \*/  
interface BriefingOutput {  
  parametrosControle: { cacTeto: number; cplAlvo: number };  
  ativosMandatorios: any;  
  criterioPausa: string;  
}

class MotorConcretudeExecutavel {  
  public validarInput(budgetMidia: number, cacEstimado: number): boolean {  
    if (\!budgetMidia || budgetMidia \<= 0\) return false;  
    return true; // Passou no Hard Gate  
  }  
}

/\*\*  
 \* \============================================================================  
 \* 2\. LASTRO ACSD (Algoritmo de Contexto e Soberania de Dados)  
 \* Foco: Defesa contra IAs Genéricas via Contexto Brasileiro (Sazonalidade e Impostos)  
 \* \============================================================================  
 \*/  
enum MesBrasileiro {  
  JAN \= 1, FEV, MAR, ABR, MAI, JUN, JUL, AGO, SET, OUT, NOV, DEZ  
}

enum CanalTracao {  
  META\_ADS \= 'Meta Ads',  
  GOOGLE\_ADS \= 'Google Ads',  
  LINKEDIN\_ADS \= 'LinkedIn Ads',  
  INDICACAO \= 'Indicação',  
  ORGANICO \= 'Orgânico'  
}

interface ConfiguracaoFiscalBR {  
  impostoMetaAds: number; // Ex: 0.1215 (12,15% em 2026\)  
  iofCartaoInternacional: number; // Ex: 0.0438  
}

interface DadosDiagnostico {  
  budgetTotal: number;  
  ticketMedio: number;  
  metaClientes: number;  
  nicho: string;  
  isB2B: boolean;  
}

interface BenchmarkProprietario {  
  cacMinimo: number;  
  cacMaximo: number;  
  cicloVendaDias: number;  
}

interface RelatorioViabilidadeBR {  
  budgetMidiaReal: number;  
  cacAjustado: number;  
  tetoClientesPossivel: number;  
  status: 'VIAVEL' | 'INVIAVEL' | 'ALERTA\_SAZONAL';  
  parecerTecnico: string;  
}

class MotorSoberaniaBrasil {  
  private fiscal: ConfiguracaoFiscalBR;

  constructor() {  
    // Hardcoded para a realidade BR de 2026  
    this.fiscal \= {  
      impostoMetaAds: 0.1215,   
      iofCartaoInternacional: 0.0438   
    };  
  }

  private extrairBudgetDeLeilao(budgetTotal: number, canal: CanalTracao): number {  
    let budgetMidia \= budgetTotal \* 0.56;

    if (canal \=== CanalTracao.META\_ADS) {  
      budgetMidia \= budgetMidia / (1 \+ this.fiscal.impostoMetaAds);  
    }  
    return budgetMidia;  
  }

  private aplicarSazonalidade(cacBase: number, mesAtual: MesBrasileiro, isB2B: boolean): number {  
    let multiplicador \= 1.0;

    if (mesAtual \=== MesBrasileiro.FEV && isB2B) {  
      multiplicador \= 1.35;   
    } else if (mesAtual \=== MesBrasileiro.NOV) {  
      multiplicador \= 1.45;   
    } else if (mesAtual \=== MesBrasileiro.JAN && \!isB2B) {  
      multiplicador \= 1.20;  
    }

    return cacBase \* multiplicador;  
  }

  public processarViabilidade(  
    dados: DadosDiagnostico,   
    benchmark: BenchmarkProprietario,   
    canalPrincipal: CanalTracao,  
    mesAtual: MesBrasileiro  
  ): RelatorioViabilidadeBR {  
      
    const budgetReal \= this.extrairBudgetDeLeilao(dados.budgetTotal, canalPrincipal);  
    const cacMedioNicho \= (benchmark.cacMinimo \+ benchmark.cacMaximo) / 2;  
    const cacSazonalReal \= this.aplicarSazonalidade(cacMedioNicho, mesAtual, dados.isB2B);  
      
    const tetoClientes \= Math.floor(budgetReal / cacSazonalReal);

    let status: 'VIAVEL' | 'INVIAVEL' | 'ALERTA\_SAZONAL' \= 'VIAVEL';  
    let parecer \= \`Viável. Seu budget suporta até ${tetoClientes} clientes neste cenário.\`;

    if (tetoClientes \< dados.metaClientes) {  
      status \= 'INVIAVEL';  
      parecer \= \`Inviável. Para a meta de ${dados.metaClientes} clientes, considerando o CAC real de R$${cacSazonalReal.toFixed(2)} (ajustado para impostos de 2026 e sazonalidade), você precisaria de R$${(dados.metaClientes \* cacSazonalReal).toFixed(2)} líquidos em mídia.\`;  
    } else if (cacSazonalReal \> cacMedioNicho \* 1.2) {  
      status \= 'ALERTA\_SAZONAL';  
      parecer \= \`Alerta: O mês atual inflaciona seu custo de aquisição em ${(this.aplicarSazonalidade(1, mesAtual, dados.isB2B) \- 1\) \* 100}%. Sugerimos reter verba ou mudar para canais orgânicos.\`;  
    }

    return {  
      budgetMidiaReal: budgetReal,  
      cacAjustado: cacSazonalReal,  
      tetoClientesPossivel: tetoClientes,  
      status,  
      parecerTecnico: parecer  
    };  
  }  
}

/\*\*  
 \* \============================================================================  
 \* 3\. LASTRO AELI (Algoritmo de Expansão Lateral de ICP)  
 \* Foco: Evitar churn por "inviabilidade" sugerindo pivots lucrativos.  
 \* \============================================================================  
 \*/  
interface SubNichoData {  
  nome: string;  
  cacMedio: number;  
  ticketMedioSugerido: number;  
  concorrenciaScore: number;   
}

interface ResultadoPivot {  
  necessitaPivot: boolean;  
  sugestaoSubnicho?: string;  
  justificativa?: string;  
}

class MotorExpansaoICP {  
  public analisarSaturacao(  
    budgetMidia: number,   
    nichoAtual: string,   
    subNichoAtual: SubNichoData,   
    bancoDeNichos: SubNichoData\[\]  
  ): ResultadoPivot {

    const clientesComprados \= budgetMidia / subNichoAtual.cacMedio;  
      
    if (clientesComprados \>= 2 && subNichoAtual.concorrenciaScore \< 80\) {  
      return { necessitaPivot: false };   
    }

    const nichoAlternativo \= this.encontrarOceanoAzul(nichoAtual, bancoDeNichos, budgetMidia);

    if (nichoAlternativo) {  
      return {  
        necessitaPivot: true,  
        sugestaoSubnicho: nichoAlternativo.nome,  
        justificativa: \`Seu budget de R$${budgetMidia} sofre muita pressão no subnicho '${subNichoAtual.nome}'. Pivotando a comunicação para '${nichoAlternativo.nome}', a relação CAC vs Ticket permite escalar com mais segurança.\`  
      };  
    }

    return { necessitaPivot: true, justificativa: "Budget crítico para qualquer segmento deste nicho." };  
  }

  private encontrarOceanoAzul(nichoPai: string, vizinhos: SubNichoData\[\], budget: number): SubNichoData | null {  
    const opcoesViaveis \= vizinhos.filter(vizinho \=\> (budget / vizinho.cacMedio) \>= 3);  
    if (opcoesViaveis.length \=== 0\) return null;  
    return opcoesViaveis.sort((a, b) \=\> a.concorrenciaScore \- b.concorrenciaScore)\[0\];  
  }  
}

/\*\*  
 \* \============================================================================  
 \* 4\. LASTRO AEE (Algoritmo de Emulação Estratégica)  
 \* Foco: Tomar decisões de GTM como um CMO sênior, sem depender do suporte humano.  
 \* \============================================================================  
 \*/  
interface ContextoDoCliente {  
  budgetMidia: number;  
  ticketMedio: number;  
  cacEstimado: number;  
  prazoEsperadoDias: number;  
  temClientesPagantes: boolean;  
  icpScore: number;   
}

class EmuladorCMO {  
  public gerarMapaGTM(contexto: ContextoDoCliente): CanalTracao\[\] | string\[\] {  
    const canaisRecomendados: string\[\] \= \[\];

    // Regra Universal: Custo Zero Primeiro  
    canaisRecomendados.push(CanalTracao.INDICACAO);

    // Proteção de Caixa  
    if (contexto.budgetMidia \< 600\) {  
      canaisRecomendados.push(CanalTracao.ORGANICO);  
      return canaisRecomendados;   
    }

    // Validação de Escala  
    if (\!contexto.temClientesPagantes) {  
       canaisRecomendados.push('Outbound Direto');  
       return canaisRecomendados;   
    }

    // Barreira de Algoritmo  
    const capacidadeAprendizado \= contexto.budgetMidia / contexto.cacEstimado;  
    if (capacidadeAprendizado \< 3\) {  
      canaisRecomendados.push(CanalTracao.ORGANICO);  
      return canaisRecomendados;  
    }

    // Filtro de ICP Fraco  
    if (contexto.icpScore \< 40\) {  
       return canaisRecomendados;   
    }

    // Direcionamento Específico de Tráfego Pago  
    if (contexto.prazoEsperadoDias \> 45\) {  
      canaisRecomendados.push(CanalTracao.META\_ADS);   
    }  
      
    if (contexto.ticketMedio \> 200\) {  
      canaisRecomendados.push(CanalTracao.GOOGLE\_ADS);   
    }

    if (contexto.ticketMedio \> 2000\) {  
      canaisRecomendados.push(CanalTracao.LINKEDIN\_ADS);   
    }

    return canaisRecomendados;  
  }  
}

/\*\*  
 \* \============================================================================  
 \* 5\. LASTRO AFP (Algoritmo do Flywheel Proprietário)  
 \* Foco: Trancar o dado real de mercado no BD para criar um moat incopiável.  
 \* \============================================================================  
 \*/  
interface ResultadoTrackerM3 {  
  usuarioId: string;  
  nicho: string;  
  subnicho: string;  
  canal: "Meta Ads" | "Google Ads" | "LinkedIn Ads" | "Indicação";  
  investimentoReal: number;  
  leadsGerados: number;  
  vendasRealizadas: number;  
  cicloVendaDiasReal: number;  
}

interface TabelaBenchmarkNicho {  
  nicho: string;  
  cplMedio: number;  
  cacMedio: number;  
  amostrasColetadas: number;  
  confianca: "Baixa" | "Média" | "Alta";  
  ultimaAtualizacao: Date;  
}

class MotorFlywheelLastro {  
  private readonly PESO\_HISTORICO \= 0.85;   
  private readonly PESO\_NOVO\_DADO \= 0.15;

  public ingerirDadoReal(resultado: ResultadoTrackerM3, benchmarkAtual: TabelaBenchmarkNicho): TabelaBenchmarkNicho {  
    const leadsValidos \= Math.max(resultado.leadsGerados, 1);  
    const vendasValidas \= Math.max(resultado.vendasRealizadas, 1);

    const cplRealDoCliente \= resultado.investimentoReal / leadsValidos;  
    const cacRealDoCliente \= resultado.investimentoReal / vendasValidas;

    const novoCplMedio \= (benchmarkAtual.cplMedio \* this.PESO\_HISTORICO) \+ (cplRealDoCliente \* this.PESO\_NOVO\_DADO);  
    const novoCacMedio \= (benchmarkAtual.cacMedio \* this.PESO\_HISTORICO) \+ (cacRealDoCliente \* this.PESO\_NOVO\_DADO);  
      
    const novaAmostra \= benchmarkAtual.amostrasColetadas \+ 1;  
    const novaConfianca \= this.calcularNivelConfianca(novaAmostra);

    return {  
      nicho: benchmarkAtual.nicho,  
      cplMedio: novoCplMedio,  
      cacMedio: novoCacMedio,  
      amostrasColetadas: novaAmostra,  
      confianca: novaConfianca,  
      ultimaAtualizacao: new Date()  
    };  
  }

  private calcularNivelConfianca(amostras: number): "Baixa" | "Média" | "Alta" {  
    if (amostras \< 10\) return "Baixa";  
    if (amostras \>= 10 && amostras \<= 50\) return "Média";  
    return "Alta";   
  }  
}

/\*\*  
 \* \============================================================================  
 \* 6\. LASTRO ADA (Algoritmo de Desacoplamento de API)  
 \* Foco: Proteger o core do sistema contra mudanças nas regras do Meta/Google (Risco 7).  
 \* \============================================================================  
 \*/  
interface MetricasUniversaisLastro {  
  investimentoLiquido: number;  
  impressoes: number;  
  cliques: number;  
  leads: number;  
  vendas: number;  
}

interface FonteDeDadosMarketing {  
  extrairMetricas(identificador: string): Promise\<MetricasUniversaisLastro\>;  
}

class ProvedorInputManualTrackerM3 implements FonteDeDadosMarketing {  
  async extrairMetricas(trackerId: string): Promise\<MetricasUniversaisLastro\> {  
    const dadosDoBanco \= await supabase.from('tracker\_m3').select('\*').eq('id', trackerId).single();  
      
    return {  
      investimentoLiquido: dadosDoBanco.data.investimento\_declarado,  
      impressoes: dadosDoBanco.data.impressoes\_declaradas,  
      cliques: dadosDoBanco.data.cliques\_declarados,  
      leads: dadosDoBanco.data.leads\_declarados,  
      vendas: dadosDoBanco.data.vendas\_declaradas  
    };  
  }  
}

class ProvedorIntegracaoMetaAdsAPI implements FonteDeDadosMarketing {  
  private readonly IMPOSTO\_2026 \= 0.1215; 

  async extrairMetricas(campanhaId: string): Promise\<MetricasUniversaisLastro\> {  
    const metaData \= await fetch(\`https://graph.facebook.com/v20.0/${campanhaId}/insights...\`);  
    const json \= await metaData.json();  
      
    return {  
      investimentoLiquido: json.spend / (1 \+ this.IMPOSTO\_2026),   
      impressoes: json.impressions,  
      cliques: json.clicks,  
      leads: this.extrairAcao(json.actions, 'lead'),  
      vendas: this.extrairAcao(json.actions, 'purchase')  
    };  
  }

  private extrairAcao(actions: any\[\], tipo: string): number {  
    const acao \= actions.find(a \=\> a.action\_type \=== tipo);  
    return acao ? parseInt(acao.value) : 0;  
  }  
}

class ProcessadorDeSalaDeGuerra {  
  constructor(private fonteDeDados: FonteDeDadosMarketing) {}

  async analisarCampanha(id: string, tetoCplPermitido: number) {  
    const metricas \= await this.fonteDeDados.extrairMetricas(id);  
    const cplReal \= metricas.investimentoLiquido / metricas.leads;  
      
    if (cplReal \> tetoCplPermitido) {  
       return {  
         status: "Revisão",  
         alerta: "Micro-Pivô tático ativado: CPL acima do limite viável.",  
         acao: "Suspender canal e ativar plano B."  
       };  
    }

    return { status: "No Prazo" };  
  }  
}

/\*\*  
 \* \============================================================================  
 \* 7\. LASTRO AUD (Algoritmo de UX Defensiva)  
 \* Foco: Framework de comunicação para mitigar churn por expectativa frustrada.  
 \* \============================================================================  
 \*/  
export const UX\_DICTIONARY\_M3 \= {  
  "status\_revisao": {  
    "causa\_canal\_errado": {  
      "condicao": "CPL alto \+ cliques baixos",  
      "copy\_lastro\_aud": "Alerta de Leilão. O custo por clique no \[Canal\] está inviabilizando seu CAC. O orçamento está sendo consumido sem gerar tráfego suficiente. Sugestão imediata: pausar campanha e testar \[Canal Alternativo\]."  
    },  
    "causa\_mensagem\_errada": {  
      "condicao": "Cliques ok \+ conversão baixa",  
      "copy\_lastro\_aud": "Fricção de Funil. O \[Canal\] está entregando tráfego no custo certo, mas a página de destino não está convertendo. Não aumente o budget. O plano exige revisão de Copy (M9) ou Webdesign (M5) antes de continuar."  
    },  
    "causa\_icp\_errado": {  
      "condicao": "Leads chegam \+ não convertem no CRM",  
      "copy\_lastro\_aud": "Desalinhamento de ICP. Estamos comprando leads no custo correto, mas o fechamento comercial falhou. A segmentação atual está atraindo curiosos, não compradores. Ação: Revisar os parâmetros de público (M10)."  
    },  
    "causa\_diagnostico\_otimista": {  
      "condicao": "CAC real acima em todos os canais",  
      "copy\_lastro\_aud": "Recalibragem Necessária. O CAC real do seu nicho provou ser superior ao estimado inicialmente. Com o budget atual, a meta original é matematicamente improvável. O Lastro Score foi atualizado. Veja o novo cenário possível."  
    }  
  }  
};  
