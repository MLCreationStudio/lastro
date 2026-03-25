import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Tracker.css';

interface SemanaData {
  semana: number;
  foco: string;
  meta_leads: number;
  meta_vendas: number;
  investimento_meta: number;
  real_leads?: number;
  real_vendas?: number;
  real_investimento?: number;
  status?: 'no_prazo' | 'atencao' | 'revisao';
}

export default function Tracker() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;
  const diagnosticoId = state?.diagnosticoId;
  const planData = state?.planData;

  const [semanas, setSemanas] = useState<SemanaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSemana, setSelectedSemana] = useState<SemanaData | null>(null);
  const [inputValue, setInputValue] = useState({ leads: '', invest: '' });
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchRealData = async () => {
    if (!diagnosticoId || !planData) return;
    
    const initialSemanas: SemanaData[] = planData.plano_90_dias.map((s: any) => ({
      semana: s.semana,
      foco: s.foco,
      meta_leads: s.metricas_meta.leads,
      meta_vendas: s.metricas_meta.vendas,
      investimento_meta: s.metricas_meta.investimento_semana
    }));

    const { data, error } = await supabase
      .from('resultado_semanal')
      .select('*')
      .eq('diagnostico_id', diagnosticoId);

    if (!error && data) {
      const merged = initialSemanas.map(s => {
        const real = data.find(d => d.semana === s.semana);
        if (real) {
          return {
            ...s,
            real_leads: real.resultado_real,
            real_investimento: real.investimento_real,
            status: real.status,
            feedback: real.correcao_sugerida
          };
        }
        return s;
      });
      setSemanas(merged);
    } else {
      setSemanas(initialSemanas);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!diagnosticoId || !planData) {
      navigate('/');
      return;
    }
    fetchRealData();
  }, [diagnosticoId, planData, navigate]);

  const handleSave = async () => {
    if (!selectedSemana || !diagnosticoId) return;
    setSaving(true);

    try {
      // 1. Salvar no Supabase
      const { error: upsertError } = await supabase
        .from('resultado_semanal')
        .upsert({
          diagnostico_id: diagnosticoId,
          semana: selectedSemana.semana,
          investimento_real: parseFloat(inputValue.invest),
          resultado_real: parseInt(inputValue.leads),
          user_id: (await supabase.auth.getUser()).data.user?.id // Fallback local logic may need adjustment for anonymous
        }, { onConflict: 'diagnostico_id, semana' });

      if (upsertError) throw upsertError;

      // 2. Chamar IA Coaching (Edge Function calcular-desvio)
      const { data: auditData } = await supabase.functions.invoke('calcular-desvio', {
        body: { 
          diagnostico_id: diagnosticoId, 
          semana: selectedSemana.semana,
          investimento_real: parseFloat(inputValue.invest),
          resultado_real: parseInt(inputValue.leads)
        }
      });

      setFeedback(auditData?.correcao_sugerida || 'Dados salvos com sucesso. Continue assim!');
      await fetchRealData();
    } catch (err) {
      console.error('Erro ao salvar:', err);
      alert('Erro ao salvar dados. Verifique sua conexão.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="tracker-loading">Carregando seu progresso...</div>;

  return (
    <div className="tracker-page">
      <div className="tracker-container fade-in-up">
        <header className="tracker-header">
          <h1>Tracker de Resultados: Plano de 90 Dias</h1>
          <p>Acompanhe o desvio entre sua meta matemática e a execução real.</p>
        </header>

        <div className="tracker-grid">
          {semanas.map((s) => (
            <div key={s.semana} className={`semana-card ${s.status || ''} ${s.real_leads !== undefined ? 'completed' : ''}`}>
              <div className="semana-number">Semana {s.semana}</div>
              <div className="semana-foco">{s.foco}</div>
              
              <div className="semana-stats">
                <div className="stat-row">
                  <span>Leads:</span>
                  <span className="stat-values">
                    <span className="meta">{s.meta_leads}</span>
                    {s.real_leads !== undefined && (
                      <span className={`real ${s.real_leads >= s.meta_leads ? 'ok' : 'critico'}`}>
                         / {s.real_leads}
                      </span>
                    )}
                  </span>
                </div>
                <div className="stat-row">
                  <span>Invest:</span>
                  <span className="stat-values">
                    <span className="meta">R${s.investimento_meta}</span>
                    {s.real_investimento !== undefined && (
                      <span className="real"> / R${s.real_investimento}</span>
                    )}
                  </span>
                </div>
              </div>

              <button 
                className="btn-update"
                onClick={() => {
                  setSelectedSemana(s);
                  setInputValue({ 
                    leads: s.real_leads?.toString() || '', 
                    invest: s.real_investimento?.toString() || '' 
                  });
                  setFeedback(null);
                }}
              >
                {s.real_leads !== undefined ? 'Ver / Editar' : 'Lançar Dados'}
              </button>
            </div>
          ))}
        </div>

        {/* Modal de Input (Simples MVP) */}
        {selectedSemana && (
          <div className="tracker-modal-overlay">
            <div className="tracker-modal fade-in-up">
              <h2>Semana {selectedSemana.semana} — Reportar Real</h2>
              <div className="modal-inputs">
                <div className="input-group">
                  <label>Quanto você investiu de verdade? (R$)</label>
                  <input 
                    type="number" 
                    value={inputValue.invest} 
                    onChange={e => setInputValue({...inputValue, invest: e.target.value})}
                    placeholder={`Meta: R$${selectedSemana.investimento_meta}`}
                  />
                </div>
                <div className="input-group">
                  <label>Quantos Leads/Vendas gerou?</label>
                  <input 
                    type="number" 
                    value={inputValue.leads} 
                    onChange={e => setInputValue({...inputValue, leads: e.target.value})}
                    placeholder={`Meta: ${selectedSemana.meta_leads}`}
                  />
                </div>
              </div>

              {feedback && (
                <div className="modal-feedback fade-in">
                  <h4>IA Coaching:</h4>
                  <p>{feedback}</p>
                </div>
              )}

              <div className="modal-actions">
                <button className="lastro-btn lastro-btn-secondary" onClick={() => setSelectedSemana(null)}>Fechar</button>
                <button 
                  className="lastro-btn lastro-btn-primary" 
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Analisando...' : 'Salvar e Auditar'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="tracker-summary">
          <h3>Soberania de Dados ACSD Ativa</h3>
          <p>Seus dados reais alimentam o algoritmo para garantir que o próximo diagnóstico seja 100% calibrado.</p>
        </div>
      </div>
    </div>
  );
}

