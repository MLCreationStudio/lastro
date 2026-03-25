/**
 * LLM Service - Orquestrador de Provedores de IA para Lastro
 * Suporta OpenAI, Anthropic e Google (Gemini)
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export type LLMProvider = 'openai' | 'anthropic' | 'google';

interface LLMRequest {
  prompt: string;
  diagnosticoId: string; // Obrigatório para débito de créditos
  actionType?: 'suggestion' | 'resolution' | 'analysis' | 'churn_insight';
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
}

const CREDIT_COSTS = {
  suggestion: 0.5,
  resolution: 1.0,
  analysis: 2.0,
  churn_insight: 5.0,
};

export class LLMService {
  private provider: LLMProvider;
  private supabase;

  constructor() {
    this.provider = (Deno.env.get('LLM_PROVIDER') as LLMProvider) || 'openai';
    this.supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
  }

  async call(params: LLMRequest): Promise<Record<string, any>> {
    let result: Record<string, any>;
    let model: string;
    let costEstimated: number;

    switch (this.provider) {
      case 'anthropic':
        model = Deno.env.get('ANTHROPIC_MODEL') || 'claude-3-haiku-20240307';
        result = await this.callAnthropic(params, model);
        break;
      case 'google':
        model = Deno.env.get('GOOGLE_MODEL') || 'gemini-1.5-flash';
        result = await this.callGoogle(params, model);
        break;
      case 'openai':
      default:
        model = Deno.env.get('OPENAI_MODEL') || 'gpt-4o-mini';
        result = await this.callOpenAI(params, model);
        break;
    }

    // Débito de créditos após sucesso
    await this.processCreditDebit(params, model);

    return result;
  }

  private async processCreditDebit(params: LLMRequest, model: string) {
    const creditsToDebit = CREDIT_COSTS[params.actionType || 'suggestion'] || 0.5;
    
    // Estimativa de custo em R$ (Baseada no estudo March/2026)
    const costBrl = creditsToDebit * 0.006; 

    try {
      const { error } = await this.supabase.rpc('debitar_creditos', {
        p_diag_id: params.diagnosticoId,
        p_amount: creditsToDebit,
        p_action: params.actionType || 'suggestion',
        p_model: model,
        p_cost: costBrl
      });

      if (error) console.error('[LLMService] Erro ao debitar créditos:', error);
    } catch (err) {
      console.error('[LLMService] Falha crítica no ledger:', err);
    }
  }

  private async callOpenAI(params: LLMRequest, model: string) {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) throw new Error('OPENAI_API_KEY não configurada');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: Deno.env.get('OPENAI_MODEL') || 'gpt-4o-mini',
        messages: [
          ...(params.systemPrompt ? [{ role: 'system', content: params.systemPrompt }] : []),
          { role: 'user', content: params.prompt }
        ],
        temperature: params.temperature ?? 0.3,
        response_format: params.jsonMode ? { type: "json_object" } : undefined
      }),
    });

    if (!response.ok) throw new Error(`OpenAI error: ${response.status}`);
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    return params.jsonMode ? JSON.parse(content) : { content };
  }

  private async callAnthropic(params: LLMRequest) {
    const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY não configurada');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: Deno.env.get('ANTHROPIC_MODEL') || 'claude-3-haiku-20240307',
        max_tokens: params.maxTokens ?? 1024,
        system: params.systemPrompt,
        messages: [{ role: 'user', content: params.prompt }],
        temperature: params.temperature ?? 0.3,
      }),
    });

    if (!response.ok) throw new Error(`Anthropic error: ${response.status}`);
    const data = await response.json();
    const content = data.content?.[0]?.text || '';
    return params.jsonMode ? JSON.parse(content) : { content };
  }

  private async callGoogle(params: LLMRequest) {
    const apiKey = Deno.env.get('GOOGLE_API_KEY');
    if (!apiKey) throw new Error('GOOGLE_API_KEY não configurada');

    const model = Deno.env.get('GOOGLE_MODEL') || 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${params.systemPrompt ? params.systemPrompt + '\n\n' : ''}${params.prompt}` }]
        }],
        generationConfig: {
          temperature: params.temperature ?? 0.3,
          maxOutputTokens: params.maxTokens ?? 1024,
          responseMimeType: params.jsonMode ? "application/json" : "text/plain"
        }
      }),
    });

    if (!response.ok) throw new Error(`Google Gemini error: ${response.status}`);
    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return params.jsonMode ? JSON.parse(content) : { content };
  }
}
