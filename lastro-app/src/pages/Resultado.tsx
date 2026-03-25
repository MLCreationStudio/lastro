import { useLocation, useNavigate } from 'react-router-dom';
import { ScoreCounter, DimensionBar, Badge, XPBar, GlassPanel } from '../components/ui';
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
    <div className="resultado-hud terminal-bg">
      <div className="hud-container stack gap-12">
        
        {/* Top Rail: XP & Meta */}
        <div className="hud-top-rail grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border-emerald-500/20">
          <GlassPanel className="p-6 terminal-border-glow">
            <XPBar current={scoreData.score * 12} target={1200} />
          </GlassPanel>
          <div className="text-right hidden lg:block font-mono">
             <p className="text-[0.6rem] text-emerald-500/40 uppercase tracking-[0.4em]">SESSAO_DATA_LOG // ID-{diagnosticoId?.slice(0,8) || 'RUN_CMD_01'}</p>
             <p className="text-[0.5rem] text-white/10 mt-1">ENCRYPTION_ACTIVE // BCRYPT_V2</p>
          </div>
        </div>

        {/* Main Display: Score & Zona */}
        <div className="hud-main grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-12 xl:col-span-5 flex justify-center">
            <div className="score-circle scale-125 terminal-border-glow !border-emerald-500/50">
               <ScoreCounter target={scoreData.score} />
               <div className="score-ring-outer !border-emerald-500/20" />
               <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] text-emerald-500">LASTRO_SCORE_UNIT</div>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7 stack gap-6">
            <div className="font-mono text-[0.7rem] text-emerald-500/40 tracking-[0.5em] mb-2 uppercase">FINAL_DIAGNOSTIC_REPORT</div>
            <h2 className="text-5xl lg:text-7xl leading-tight font-display">
               <span className="text-emerald-500">{zona.label}</span>
            </h2>
            <p className="text-white/60 text-xl font-mono leading-relaxed max-w-[600px]">
              &gt; {zona.desc}
            </p>
            <div className="flex gap-4">
               {badges.map(b => (
                 <div key={b.name} className="flex flex-col gap-1">
                    <Badge {...b} />
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Bottom HUD: Dimensions & CTA */}
        <div className="hud-bottom grid grid-cols-1 lg:grid-cols-12 gap-12">
           <GlassPanel className="lg:col-span-7 p-8 terminal-border-glow">
              <h3 className="text-[0.6rem] font-mono uppercase tracking-[0.3em] text-emerald-500/40 mb-8 border-b border-white/5 pb-2">DATA_MATRIX // ACSD_ANALYSIS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <DimensionBar label="FINANCE_FEASIBILITY" value={scoreData.dimensoes.viabilidade} delay={400} />
                <DimensionBar label="ICP_ACCURACY" value={scoreData.dimensoes.icp} delay={600} />
                <DimensionBar label="TIMELINE_ALIGN" value={scoreData.dimensoes.prazo} delay={800} />
                <DimensionBar label="MARKET_MATURITY" value={scoreData.dimensoes.mercado} delay={1000} />
              </div>
           </GlassPanel>

           <GlassPanel className="lg:col-span-5 p-8 flex flex-col justify-between terminal-border-glow !bg-emerald-950/20">
              <div>
                <h3 className="text-[0.6rem] font-mono uppercase tracking-[0.3em] text-emerald-500 mb-6">NEXT_PHASE_SEQUENCE</h3>
                <p className="text-sm font-mono text-white/50 mb-8">
                  {scoreData.score >= 40 
                    ? "SISTEMA: Módulo 2 liberado. Protocolo de escala matemática disponível para execução imediata."
                    : "ALERTA: Protocolo de investimento bloqueado por inconsistência de dados. Re-calibração sugerida."}
                </p>
              </div>
              
              <button 
                className={`lastro-btn ${scoreData.score >= 40 ? 'lastro-btn-primary' : 'lastro-btn-secondary'} w-full justify-center group h-[64px] font-mono text-sm`}
                onClick={() => scoreData.score >= 40 
                  ? navigate('/transicao-gtm', { state: { score: scoreData.score, diagnosticoId, respostas } })
                  : navigate('/diagnostico')}
              >
                <span>[{scoreData.score >= 40 ? "RESUME_MISSION: MAPA_CANAIS" : "REBOOT_SYSTEM: CALIBRATE"}]</span>
                <span className="group-hover:translate-x-2 transition-transform ml-2">_</span>
              </button>
           </GlassPanel>
        </div>

      </div>
    </div>
  );
}
