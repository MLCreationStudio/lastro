import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassPanel } from '../components/ui';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');

  const handleStart = () => {
    if (url.trim()) {
      navigate('/processando-carga', { state: { url: url.trim() } });
    } else {
      navigate('/diagnostico');
    }
  };

  return (
    <div className="landing-page terminal-bg">
      <div className="landing-hero stack items-center text-center">
        <div className="terminal-header fade-in mb-8">
           <span className="terminal-text px-3 py-1 border border-emerald-500/30 rounded">SYS_STATUS: OPERATIONAL // V2.4.0</span>
        </div>

        <h1 className="hero-logo fade-in-up">
           Lastro<span className="text-emerald-500">.</span>
        </h1>
        
        <div className="hero-tagline fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="tag-line font-mono tracking-[0.6em]">GTM_CORE_ALGORITHM</span>
        </div>

        <GlassPanel className="landing-cta-panel p-8 mt-12 w-full max-w-[620px] terminal-border-glow">
          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <p className="text-[0.6rem] text-white/40 uppercase tracking-[0.3em] font-mono">Input_Source_Required</p>
            <div className="flex gap-1">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="input-group relative">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-mono text-sm opacity-50">&gt;</span>
              <input 
                type="text" 
                className="lastro-input-v2 !pl-10 font-mono text-sm tracking-wider" 
                placeholder="insira_dominio_ou_social..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              />
              <div className="input-glow" />
            </div>

            <button
              className="lastro-btn lastro-btn-primary w-full justify-center group h-[56px] font-mono"
              onClick={handleStart}
            >
              <span className="btn-text">
                {url.trim() ? 'RUN_QUICK_SCAN (ACSD)' : 'START_MANUAL_DIAGNOSTIC'}
              </span>
              <span className="btn-icon group-hover:translate-x-1 transition-transform ml-2">_</span>
            </button>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[0.55rem] text-white/20 font-mono tracking-[0.2em]">
            <span>ENCRYPTION: AES-256</span>
            <span>SOBERANIA_DADOS: ATIVA</span>
          </div>
        </GlassPanel>

        <footer className="landing-footer fade-in" style={{ animationDelay: '1s' }}>
           <p className="text-[0.6rem] text-white/30 font-mono tracking-widest uppercase mb-2">Copyright © 2026 Lastro Engine</p>
           <p className="text-xs text-white/40 italic">"Dados são o novo petróleo. Lastro é o refino."</p>
        </footer>
      </div>
    </div>
  );
}
