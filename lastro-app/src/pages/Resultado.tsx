import { useLocation, useNavigate } from 'react-router-dom';
import { ScoreCounter, DimensionBar, Badge, XPBar, GlassPanel } from '../components/ui';
import './Resultado.css';

const ZONA_LABELS: Record<string, { label: string; desc: string }> = {
  critico: { label: 'ALERTA: RISCO ESTRUTURAL', desc: 'O plano atual não tem viabilidade matemática. Ajuste budget ou ICP.' },
  ajuste: { label: 'POTENCIAL COM RESTRICÕES', desc: 'Viabilidade técnica detectada, mas exige calibração de canais.' },
  ressalvas: { label: 'OPERAÇÃO VIÁVEL', desc: 'O plano possui lastro. Execute com monitoramento de CAC.' },
  pronto: { label: 'SISTEMA PRONTO', desc: 'Soberania de dados confirmada. Plano pronto para escala.' },
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
  if (scoreData.score >= 80) badges.push({ name: 'Mestre GTM', icon: '🎯', desc: 'Estratégia de elite.' });
  if (scoreData.dimensoes.viabilidade >= 80) badges.push({ name: 'Matemática Pura', icon: '💸', desc: 'CAC perfeitamente calculado.' });
  if (scoreData.score >= 60) badges.push({ name: 'Soberania', icon: '🚀', desc: 'Pronto para dominar o nicho.' });

  return (
    <div className="resultado-hud">
      <div className="hud-container stack gap-12">
        
        {/* Top Rail: XP & Meta */}
        <div className="hud-top-rail grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <GlassPanel className="p-6">
            <XPBar current={scoreData.score * 12} target={1200} />
          </GlassPanel>
          <div className="text-right hidden lg:block">
             <p className="text-[0.6rem] text-white/20 uppercase tracking-[0.4em]">Sessão de Diagnóstico #ID-{diagnosticoId?.slice(0,8) || 'XYZ-2024'}</p>
          </div>
        </div>

        {/* Main Display: Score & Zona */}
        <div className="hud-main grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="score-circle scale-125">
               <ScoreCounter target={scoreData.score} />
               <div className="score-ring-outer" />
            </div>
          </div>

          <div className="lg:col-span-7 stack gap-6">
            <h2 className="text-4xl lg:text-5xl leading-tight">
               Diagnóstico: <span className="text-emerald-500">{zona.label}</span>
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed max-w-[600px]">
              {zona.desc}
            </p>
            <div className="flex gap-4">
               {badges.map(b => <Badge key={b.name} {...b} />)}
            </div>
          </div>
        </div>

        {/* Bottom HUD: Dimensions & CTA */}
        <div className="hud-bottom grid grid-cols-1 lg:grid-cols-12 gap-12">
           <GlassPanel className="lg:col-span-7 p-8">
              <h3 className="text-xs uppercase tracking-[0.3em] text-white/30 mb-8">Análise de Dimensões ACSD</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <DimensionBar label="Viabilidade Financeira" value={scoreData.dimensoes.viabilidade} delay={400} />
                <DimensionBar label="Clareza de ICP" value={scoreData.dimensoes.icp} delay={600} />
                <DimensionBar label="Alinhamento de Prazo" value={scoreData.dimensoes.prazo} delay={800} />
                <DimensionBar label="Maturidade de Mercado" value={scoreData.dimensoes.mercado} delay={1000} />
              </div>
           </GlassPanel>

           <GlassPanel className="lg:col-span-5 p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-white/30 mb-6">Próxima Fase</h3>
                <p className="text-sm text-white/70 mb-8">
                  {scoreData.score >= 40 
                    ? "Base estrutural sólida detectada. O Módulo 2 está liberado para mapeamento de canais."
                    : "Planilha de GTM bloqueada. Recomendamos recalibrar o modelo antes de prosseguir."}
                </p>
              </div>
              
              <button 
                className={`lastro-btn ${scoreData.score >= 40 ? 'lastro-btn-primary' : 'lastro-btn-secondary'} w-full justify-center group h-[56px]`}
                onClick={() => scoreData.score >= 40 
                  ? navigate('/transicao-gtm', { state: { score: scoreData.score, diagnosticoId, respostas } })
                  : navigate('/diagnostico')}
              >
                <span>{scoreData.score >= 40 ? "Acessar Mapa de Canais" : "Recalibrar Plano"}</span>
                <span className="group-hover:translate-x-1 transition-transform ml-2">→</span>
              </button>
           </GlassPanel>
        </div>

      </div>
    </div>
  );
}
