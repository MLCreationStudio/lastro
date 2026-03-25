import { GlassPanel } from '../components/ui';
import './Tracker.css';

export default function Tracker() {
  return (
    <div className="tracker-page terminal-bg select-none">
      <div className="tracker-container container max-w-[1400px] mx-auto pt-32 pb-20 px-6 stack gap-12">
        
        {/* Superior Rail */}
        <div className="fixed top-0 left-0 w-full p-8 flex justify-between items-center border-b border-accent-alert/20 bg-black/40 backdrop-blur-md z-50">
           <div className="font-mono text-[0.6rem] tracking-[0.5em] text-accent-alert uppercase animate-pulse">
              SALA_DE_GUERRA // STATUS: REVISAO_URGENTE
           </div>
           <div className="font-mono text-[0.6rem] tracking-[0.3em] text-white/30 uppercase">
              LASTRO_TRACKER_V1.0
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Alertas Críticos */}
           <div className="lg:col-span-12">
              <div className="bg-accent-alert/5 border border-accent-alert/30 p-6 flex items-center justify-between rounded-sm">
                 <div className="flex items-center gap-6">
                    <div className="w-3 h-3 bg-accent-alert animate-ping rounded-full" />
                    <div className="stack gap-1">
                       <h2 className="font-display text-white text-xl">Parecer Analítico: Desvio de CAC Detectado</h2>
                       <p className="font-mono text-[0.6rem] text-accent-alert uppercase">Alvo: R$ 45.00 // Real: R$ 68.12 (Delta: +51%)</p>
                    </div>
                 </div>
                 <button className="lastro-btn !bg-accent-alert !text-white font-mono text-[0.6rem] border-none px-6">
                    [ACIONAR_MICRO_PIVO]
                 </button>
              </div>
           </div>

           {/* Métricas de Painel */}
           <div className="lg:col-span-3">
              <GlassPanel className="p-6 border-white/5 !bg-black/40 h-full">
                 <h3 className="font-mono text-[0.55rem] text-white/20 tracking-[0.4em] uppercase mb-4">BUDGET_DISPONIVEL</h3>
                 <p className="font-display text-4xl text-white">R$ 12.450</p>
                 <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[65%]" />
                 </div>
              </GlassPanel>
           </div>
           
           <div className="lg:col-span-3">
              <GlassPanel className="p-6 border-white/5 !bg-black/40 h-full">
                 <h3 className="font-mono text-[0.55rem] text-white/20 tracking-[0.4em] uppercase mb-4">CUSTO_POR_LID</h3>
                 <p className="font-display text-4xl text-white">R$ 14,20</p>
                 <span className="font-mono text-[0.5rem] text-emerald-500">-12% VS ONTEM</span>
              </GlassPanel>
           </div>

           <div className="lg:col-span-6">
              <GlassPanel className="p-6 border-white/5 !bg-black/40 h-full overflow-x-auto">
                 <h3 className="font-mono text-[0.55rem] text-white/20 tracking-[0.4em] uppercase mb-6">EXECUCAO_AD_SPEND</h3>
                 <table className="w-full font-mono text-[0.6rem] text-left">
                    <thead>
                       <tr className="border-b border-white/5 text-white/40">
                          <th className="pb-3">CANAL</th>
                          <th className="pb-3">SPEND_REAL</th>
                          <th className="pb-3">ALVO</th>
                          <th className="pb-3">ROAS</th>
                       </tr>
                    </thead>
                    <tbody className="text-white/80">
                       <tr className="border-b border-white/5">
                          <td className="py-4">Meta Ads</td>
                          <td className="py-4 font-bold">R$ 4.200</td>
                          <td className="py-4 text-white/30">R$ 4.000</td>
                          <td className="py-4 text-emerald-500">4.2x</td>
                       </tr>
                       <tr>
                          <td className="py-4">Google Search</td>
                          <td className="py-4 font-bold text-accent-alert">R$ 1.800</td>
                          <td className="py-4 text-white/30">R$ 1.200</td>
                          <td className="py-4 text-accent-alert">1.8x</td>
                       </tr>
                    </tbody>
                 </table>
              </GlassPanel>
           </div>
        </div>

      </div>
    </div>
  );
}
