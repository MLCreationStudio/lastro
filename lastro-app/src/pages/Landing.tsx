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
    <div className="landing-page">
      <div className="landing-hero stack items-center text-center">
        <h1 className="hero-logo fade-in-up">
           Lastro<span className="text-emerald-500">.</span>
        </h1>
        
        <div className="hero-tagline fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="tag-line">A Ciência Contra a Intuição no GTM</span>
        </div>

        <GlassPanel className="landing-cta-panel p-8 mt-12 w-full max-w-[600px]">
          <p className="text-sm text-white/40 mb-8 uppercase tracking-[0.3em]">Módulo de Diagnóstico — v2.4</p>
          
          <div className="flex flex-col gap-6">
            <div className="input-group relative">
              <input 
                type="text" 
                className="lastro-input-v2" 
                placeholder="Insira o domínio ou Instagram..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              />
              <div className="input-glow" />
            </div>

            <button
              className="lastro-btn lastro-btn-primary w-full justify-center group h-[56px]"
              onClick={handleStart}
            >
              <span className="btn-text">
                {url.trim() ? 'Executar Carga Rápida' : 'Iniciar Diagnóstico Manual'}
              </span>
              <span className="btn-icon group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <p className="mt-8 text-[0.65rem] text-white/30 uppercase tracking-[0.2em]">
            Algoritmo de Contexto e Soberania de Dados (ACSD) Ativo
          </p>
        </GlassPanel>

        <footer className="landing-footer fade-in" style={{ animationDelay: '1s' }}>
           <p className="text-xs text-white/30 italic">"Seus números não mentem. Sua intuição, sim."</p>
        </footer>
      </div>
    </div>
  );
}
