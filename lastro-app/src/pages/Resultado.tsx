import { useLocation, useNavigate } from 'react-router-dom';
import { DimensionBar, GlassPanel } from '../components/ui';
import './Resultado.css';

const ZONA_LABELS: Record<string, { label: string; desc: string }> = {
  critico: { label: 'CRITICAL_FAIL', desc: 'SISTEMA_INSTAVEL: Plano sem lastro matemático. Recomenda-se abortar execução.' },
  ajuste: { label: 'ADJUST_REQUIRED', desc: 'POTENCIAL_DETECTADO: Viabilidade técnica parcial. Calibração de canais necessária.' },
  ressalvas: { label: 'OPERATIONAL_READY', desc: 'SISTEMA_ESTAVEL: O plano possui lastro. Monitoramento de CAC ativado.' },
  pronto: { label: 'SYSTEM_SOVEREIGN', desc: 'SOBERANIA_CONFIRMADA: Dados validados. Pronto para escala agressiva.' },
};

export default function Resultado() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;
  const scoreData = state?.score || { score: 0, zona: 'critico', dimensoes: { viabilidade: 0, icp: 0, prazo: 0, mercado: 0 } };
  const zona = ZONA_LABELS[scoreData.zona] || ZONA_LABELS.critico;
  const diagnosticoId = state?.diagnosticoId;
  const respostas = state?.respostas;

  const badges = [];
  if (scoreData.score >= 80) badges.push({ name: 'MASTER_GTM', icon: '🎯', desc: 'Estratégia Sniper.' });
  if (scoreData.dimensoes.viabilidade >= 80) badges.push({ name: 'MATH_SOVEREIGN', icon: '💸', desc: 'CAC Ótimo.' });
  if (scoreData.score >= 60) badges.push({ name: 'ALFA_GROWTH', icon: '🚀', desc: 'Pronto para o topo.' });

  return (
    <div className="resultado-hud terminal-bg select-none">
      <div className="hud-container container max-w-[1200px] mx-auto pt-32 pb-20 px-6 stack gap-16">
        
        {/* Top Rail: Authority Meta */}
        <div className="fixed top-0 left-0 w-full p-8 flex justify-between items-center border-b border-white/5 bg-black/40 backdrop-blur-md z-50">
           <div className="font-mono text-[0.6rem] tracking-[0.5em] text-white/30 uppercase">
              PARECER_TECNICO // DIAGNOSTICO_#ID-{diagnosticoId?.slice(0,8) || 'UNIT_01'}
           </div>
           <div className="font-mono text-[0.6rem] tracking-[0.3em] text-accent-gold uppercase">
              [STATUS: ANALISE_CONFIRMADA]
           </div>
        </div>

        {/* Main Cockpit Section */}
        <div className="hud-main grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-12 xl:col-span-5 flex justify-center">
            <div className="score-cockpit relative">
               <div className="score-value-serif flex flex-col items-center">
                  <span className="text-[10rem] font-display leading-none text-accent-gold drop-shadow-2xl">{scoreData.score}</span>
                  <span className="font-mono text-xs tracking-[0.8em] text-white/20 -mt-4">UNIDADES_DE_LASTRO</span>
               </div>
               <div className="absolute -inset-20 border border-white/5 rounded-full animate-pulse pointer-events-none" />
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7 stack gap-8">
            <div className="badge-rail flex gap-4">
                {badges.map(b => (
                  <div key={b.name} className="px-3 py-1 border border-white/10 rounded-sm font-mono text-[0.5rem] tracking-widest text-white/40 uppercase">
                     [{b.name}]
                  </div>
                ))}
            </div>
            
            <h2 className="text-6xl lg:text-8xl font-display leading-[0.95] text-white">
               Resultado: <br />
               <span className={`${scoreData.score >= 60 ? 'text-emerald-500' : 'text-accent-alert'} italic`}>{zona.label}</span>
            </h2>
            
            <p className="text-lg font-mono text-white/40 leading-relaxed max-w-[600px] uppercase tracking-tight">
              &gt; {zona.desc}
            </p>
          </div>
        </div>

        {/* Matrix Analysis Cards */}
        <div className="hud-matrix grid grid-cols-1 lg:grid-cols-12 gap-8">
           <GlassPanel className="lg:col-span-8 p-10 border-white/5 !bg-black/40">
              <h3 className="text-xl font-display text-white mb-10 border-b border-white/5 pb-4">Matriz de Viabilidade ACSD</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                <DimensionBar label="EFICIENCIA_FINANCEIRA" value={scoreData.dimensoes.viabilidade} delay={400} />
                <DimensionBar label="PRECISAO_DE_ICP" value={scoreData.dimensoes.icp} delay={600} />
                <DimensionBar label="ALINHAMENTO_SAZONAL" value={scoreData.dimensoes.prazo} delay={800} />
                <DimensionBar label="MATURIDADE_CANAL" value={scoreData.dimensoes.mercado} delay={1000} />
              </div>
           </GlassPanel>

           <div className="lg:col-span-4 stack gap-8">
              <GlassPanel className="p-8 border-auth !bg-accent-gold/5 flex flex-col justify-between h-full">
                 <div>
                    <h3 className="text-[0.6rem] font-mono text-accent-gold tracking-[0.4em] uppercase mb-6">ORÁCULO_GTM // PRÓXIMO_PASSO</h3>
                    <p className="text-sm font-mono text-white/60 leading-relaxed">
                      {scoreData.score >= 40 
                        ? "SISTEMA: Direcional validado. O Módulo 2 (Mapa de Canais) está liberado para orquestração tática."
                        : "ALERTA: O plano atual é financeiramente inviável. Execute o comando [REBOOT] para recalibrar o budget."}
                    </p>
                 </div>
                 
                 <button 
                   className={`lastro-btn ${scoreData.score >= 40 ? '!bg-emerald-600 !text-black' : '!bg-accent-alert !text-white'} w-full justify-center group h-[72px] font-mono mt-8 border-auth`}
                   onClick={() => scoreData.score >= 40 
                     ? navigate('/transicao-gtm', { state: { score: scoreData.score, diagnosticoId, respostas } })
                     : navigate('/diagnostico')}
                 >
                   <span className="font-bold tracking-[0.2em]">{scoreData.score >= 40 ? "[LIBERAR_MAPA_CANAL]" : "[REBOOT_DIAGNOSTICO]"}</span>
                   <span className="ml-4 opacity-50 group-hover:translate-x-2 transition-transform">_</span>
                 </button>
              </GlassPanel>
           </div>
        </div>

      </div>
    </div>
  );
}
