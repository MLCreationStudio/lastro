import { useNavigate } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page terminal-bg select-none">
      <div className="landing-hero container max-w-[1000px] mx-auto min-h-screen flex flex-col justify-center items-center px-6 py-20">
        
        {/* Superior Rail: Authority Header */}
        <div className="fixed top-0 left-0 w-full p-8 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-md z-50">
           <div className="font-mono text-[0.6rem] tracking-[0.5em] text-white/30 uppercase">
              REPARTIÇÃO_DEFESA_ESTRATÉGICA // PROTOCOLO_LASTRO
           </div>
           <div className="font-mono text-[0.6rem] tracking-[0.3em] text-emerald-500/60 uppercase">
              STATUS: SECURE_LINK_ACTIVE
           </div>
        </div>

        <div className="manifesto-content stack gap-12 items-center text-center max-w-[800px]">
           <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="terminal-text px-4 py-1.5 border border-accent-gold/20 text-accent-gold rounded-sm text-[0.55rem] font-mono">
                 CLASSIFICADO: USO_RESTRITO_CMO
              </span>
           </div>

           <h1 className="text-6xl lg:text-9xl font-display leading-[0.9] text-white fade-in-up" style={{ animationDelay: '0.3s' }}>
              A Ciência Contra <br />
              <span className="text-emerald-500 italic opacity-90">a Intuição.</span>
           </h1>

           <p className="text-xl lg:text-2xl font-mono text-white/40 leading-relaxed max-w-[600px] fade-in-up uppercase tracking-tighter" style={{ animationDelay: '0.5s' }}>
              O Lastro não é marketing. É matemática aplicada. <br />
              <span className="text-[0.6rem] block mt-4 tracking-[0.4em] opacity-30 uppercase">Engenharia de Go-To-Market de Alta Precisão</span>
           </p>

           <div className="w-full max-w-[400px] mt-12 fade-in-up" style={{ animationDelay: '0.7s' }}>
              <button
                className="lastro-btn lastro-btn-primary w-full justify-center group h-[72px] font-mono text-sm border-auth !bg-emerald-600 !text-black"
                onClick={() => navigate('/diagnostico')}
              >
                <span className="tracking-[0.3em] font-bold">[INICIAR_DEFESA_ESTRATEGICA]</span>
                <span className="ml-4 group-hover:translate-x-2 transition-transform opacity-50">_</span>
              </button>
              <p className="mt-6 text-[0.5rem] font-mono text-white/10 uppercase tracking-[0.5em]">
                 A matemática não tem sentimentos.
              </p>
           </div>
        </div>

        {/* Bottom Rail: Infrastructure Meta */}
        <div className="fixed bottom-0 left-0 w-full p-8 flex justify-between items-center text-[0.5rem] font-mono text-white/10 tracking-[0.4em] uppercase">
           <div>DATA_SOVEREIGNTY: VERIFIED</div>
           <div>EST. 2024 // LASTRO_CORE_V3.5</div>
        </div>

      </div>
    </div>
  );
}
