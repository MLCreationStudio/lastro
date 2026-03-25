import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassPanel } from '../components/ui';
import { supabase } from '../lib/supabase'; // Assumindo que existe um cliente supabase exportado
import './Diagnostico.css';

export default function Diagnostico() {
  const navigate = useNavigate();
  
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const processingSteps = [
    "Iniciando varredura na URL alvo...",
    "Acionando LLM-Router (Model: Claude-3.5-Sonnet)...",
    "Extraindo posicionamento e diferenciais de mercado...",
    "Mapeando ICP (Ideal Customer Profile) nos canais digitais...",
    "Sincronizando com o Lastro Index (Benchmark 2026 BR)...",
    "Finalizando Carga Rápida: Gerando contexto de diagnóstico..."
  ];

  useEffect(() => {
    let interval: any;
    if (isProcessing && loadingStep < processingSteps.length) {
      // Avança os passos visuais enquanto a função roda em paralelo ou simulada
      interval = setTimeout(() => {
        setLoadingStep((prev) => prev + 1);
      }, 2000); 
    }
    return () => clearTimeout(interval);
  }, [isProcessing, loadingStep, processingSteps.length]);

  const handleStartAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    
    setIsProcessing(true);
    setError(null);

    try {
      // Chamada real para a Edge Function do Supabase
      const { data, error: funcError } = await supabase.functions.invoke('analisar-carga-rapida', {
        body: { url: urlInput.trim() }
      });

      if (funcError) throw funcError;

      // Espera o carregamento visual terminar (ou acelera se já tiver o dado)
      setTimeout(() => {
        navigate('/conversa', { state: { cargaRapida: { isPreenchido: true, dados: data.dados } } });
      }, 4000); // Garante que o usuário veja pelo menos uns 2 s do terminal se for muito rápido

    } catch (err: any) {
      console.error('Erro na Carga Rápida:', err);
      setError("Falha na varredura automatizada. Redirecionando para diagnóstico manual...");
      setTimeout(() => {
        navigate('/conversa');
      }, 3000);
    }
  };

  return (
    <div className="diagnostico-page terminal-bg fade-in">
      <div className="diagnostico-container container max-w-[800px] mx-auto min-h-screen flex items-center justify-center px-6">
        
        {!isProcessing ? (
          <div className="input-phase w-full text-center stack gap-8">
            <div className="terminal-header mb-4">
               <span className="terminal-text px-3 py-1 border border-emerald-500/30 rounded">PROTOCOLO: CARGA_RAPIDA_V1.0</span>
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-display leading-tight text-white mb-4">
              A verdade sobre o <span className="text-emerald-500">seu negócio.</span>
            </h1>
            
            <p className="text-white/40 text-lg font-mono tracking-tight max-w-[600px] mx-auto mb-8 uppercase text-[0.7rem]">
              Insira a URL do produto. A IA fará a engenharia reversa do seu posicionamento em segundos.
            </p>

            <form onSubmit={handleStartAnalysis} className="diagnostico-form stack gap-6 w-full max-w-[500px] mx-auto">
              <div className="input-group relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-mono">&gt;</span>
                <input 
                  type="url" 
                  placeholder="https://seu-site.com.br"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="lastro-input-v2 !pl-10 font-mono !bg-black/40 terminal-border-glow"
                  required
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="lastro-btn lastro-btn-primary w-full justify-center group font-mono">
                <span>[INICIAR_VARREDURA]</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">_</span>
              </button>
            </form>
            
            <p className="text-[0.55rem] font-mono text-white/10 uppercase tracking-[0.4em] mt-12">
               Encryption: AES-256 // Lastro Core Protocol Active
            </p>
          </div>
        ) : (
          <div className="processing-phase w-full max-w-[600px]">
            <GlassPanel className="p-8 terminal-border-glow !bg-black/60 relative overflow-hidden">
               <div className="scanning-line" />
               <div className="flex items-center gap-4 mb-8">
                  <div className="terminal-spinner" />
                  <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-emerald-500">Analise_Em_Andamento...</h2>
               </div>

               <div className="terminal-log-window space-y-4">
                  {processingSteps.slice(0, loadingStep + 1).map((step, index) => (
                    <div 
                      key={index} 
                      className={`font-mono text-[0.65rem] border-l-2 pl-4 py-1 transition-all duration-500 ${index === loadingStep ? 'border-emerald-500 text-emerald-400' : 'border-white/5 text-white/20'}`}
                    >
                      <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString().slice(3)}]</span>
                      &gt; {step}
                    </div>
                  ))}
               </div>

               {error && (
                 <div className="mt-8 pt-4 border-t border-red-900/30 text-red-500 font-mono text-[0.6rem] animate-pulse">
                    ERROR_DB: {error}
                 </div>
               )}
            </GlassPanel>
          </div>
        )}

      </div>
    </div>
  );
}
