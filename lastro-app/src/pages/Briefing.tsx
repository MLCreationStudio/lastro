import { useNavigate } from 'react-router-dom';
import './Briefing.css';

export default function Briefing() {
  const navigate = useNavigate();

  return (
    <div className="briefing-container select-none bg-[#f8fafc] text-[#0f172a] min-h-screen py-20 px-6 font-mono">
      <div className="max-w-[850px] mx-auto bg-white shadow-2xl p-16 border border-slate-200 relative overflow-hidden">
        
        {/* Header Contract Style */}
        <div className="flex justify-between items-start mb-16 border-b-2 border-slate-900 pb-8">
           <div className="stack gap-2">
              <h1 className="font-display text-4xl uppercase tracking-tighter">Briefing_Execução</h1>
              <p className="text-[0.65rem] tracking-[0.4em] text-slate-400">PROTOCOLO: LASTRO_GTM_OFFICIAL</p>
           </div>
           <div className="text-right">
              <p className="font-bold text-xs">ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
              <p className="text-[0.6rem] text-slate-400">DATA: {new Date().toLocaleDateString()}</p>
           </div>
        </div>

        {/* Section 1: Parameters */}
        <div className="section mb-12">
           <h2 className="font-display text-xl border-l-[6px] border-slate-900 pl-4 mb-8 uppercase">01. Parâmetros Matemáticos</h2>
           <div className="grid grid-cols-2 gap-8">
              <div className="parameter-card p-6 bg-slate-50 border border-slate-100">
                 <p className="text-[0.55rem] text-slate-400 mb-1 uppercase tracking-widest">CAC_TETO_RECOMENDADO</p>
                 <p className="text-2xl font-display">R$ 48,00</p>
              </div>
              <div className="parameter-card p-6 bg-slate-50 border border-slate-100">
                 <p className="text-[0.55rem] text-slate-400 mb-1 uppercase tracking-widest">VOLUME_EST_MENSAL</p>
                 <p className="text-2xl font-display">450 - 600 LEADS</p>
              </div>
           </div>
        </div>

        {/* Section 2: Creative Guidelines */}
        <div className="section mb-12">
           <h2 className="font-display text-xl border-l-[6px] border-slate-900 pl-4 mb-8 uppercase">02. Diretrizes Criativas (Copy & Angle)</h2>
           <div className="stack gap-6 text-sm leading-relaxed text-slate-700">
              <p>
                 <strong>Gancho Principal:</strong> "A ciência contra a intuição. Pare de queimar caixa e comece a escalar com lastro."
              </p>
              <p>
                 <strong>Tom de Voz:</strong> Autoritário, Analítico, Sóbrio. Evitar adjetivos vazios. Focar em resultados binários.
              </p>
              <div className="flex gap-4 mt-4">
                 <div className="w-12 h-12 bg-[#080F0C] rounded-sm shadow-sm" title="Lastro Deep Green" />
                 <div className="w-12 h-12 bg-[#D4AF37] rounded-sm shadow-sm" title="Authority Bronze" />
                 <div className="w-12 h-12 bg-[#E2E8F0] rounded-sm shadow-sm" title="Ice Grey" />
              </div>
           </div>
        </div>

        {/* Section 3: Tech Settings */}
        <div className="section mb-20">
           <h2 className="font-display text-xl border-l-[6px] border-slate-900 pl-4 mb-8 uppercase">03. Configurações Técnicas</h2>
           <div className="bg-slate-900 text-white p-6 font-mono text-[0.65rem] leading-loose rounded-sm">
              &gt; PIXEL_EVENT: PURCHASE_VALIDATED <br />
              &gt; BID_STRATEGY: COST_CAP (MARGEM_SEGURANCA: 12%) <br />
              &gt; ATTRIBUTION: 7-DAY_CLICK_1-DAY_VIEW <br />
              &gt; AUDIENCE_REFINEMENT: B2B_BUSINESS_OWNERS + HIGH_INTENT_KEYWORDS
           </div>
        </div>

        {/* Footer Sign-off */}
        <div className="border-t border-slate-100 pt-12 flex justify-between items-end">
           <div className="font-mono text-[0.5rem] text-slate-300 tracking-[0.3em]">
              CERTIFIED_BY_LASTRO_AI_ORCHESTRATOR
           </div>
           <button 
             className="px-8 py-3 bg-slate-900 text-white font-mono text-xs hover:bg-slate-800 transition-colors"
             onClick={() => window.print()}
           >
              [IMPRIMIR_BRIEFING_PDF]
           </button>
        </div>

        {/* Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none -rotate-45">
           <span className="text-[20rem] font-display">LASTRO</span>
        </div>
      </div>

      <div className="max-w-[850px] mx-auto mt-12 flex justify-center">
         <button onClick={() => navigate(-1)} className="text-slate-400 font-mono text-xs hover:text-slate-900 transition-colors uppercase tracking-widest">
            ← Retornar ao Cockpit
         </button>
      </div>
    </div>
  );
}
