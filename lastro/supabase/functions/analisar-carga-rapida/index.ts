import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { url, diagnostico_id } = await req.json();

    if (!url) {
      throw new Error('URL is required');
    }

    console.log(`[Carga Rápida] Iniciando análise para: ${url} (Diag: ${diagnostico_id || 'novo'})`);

    // 1. Tentar Scraping básico (Pode falhar por CORS/Forbidden em muitos cases)
    let scrapedText = '';
    try {
      const resp = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } });
      if (resp.ok) {
        const fullText = await resp.text();
        scrapedText = fullText.replace(/<[^>]*>/g, ' ').substring(0, 5000); // Remove tags e limita tokens
      }
    } catch (err: any) {
      console.log(`[Carga Rápida] Falha no scrape direto (CORS/Blocked): ${err.message}`);
    }

    // 2. Chamar IA (via LLMService) para analisar Site + Texto ou apenas URL
    const { LLMService } = await import('../_shared/llm-service.ts');
    const llm = new LLMService();

    const prompt = `Você é um Consultor de Estratégia GTM Sênior (Persona Morgan PM). 
Analise a URL e o conteúdo de texto abaixo sob a ótica dos "20 Pilares de GTM, Marketing e Branding".

URL: ${url}
CONTEÚDO SCRAPED (resumo): ${scrapedText || 'Não foi possível extrair o texto, baseie-se apenas na URL.'}

Sua missão é identificar:
1. O "Círculo Dourado" (Pilar 2): A empresa comunica um 'PORQUÊ' (propósito) ou apenas 'O QUE' (funcionalidade)?
2. Design de Categoria (Pilar 3): Ela se posiciona em uma categoria existente ou tenta criar uma nova?
3. Diagnóstico de Terreno (Pilar 1): Qual o problema central que ela resolve?

Retorne APENAS um JSON válido seguindo exatamente este formato:
{
  "nicho": "Nome do Nicho",
  "subnicho": "Nome do Subnicho específico",
  "categoria": "Serviço/Produto/Software",
  "modelo_negocio": "B2B/B2C",
  "produto_desc": "Breve frase descritiva sobre o que a empresa faz",
  "icp_desc": "Breve frase sobre o perfil do cliente ideal",
  "concorrentes_desc": "Breve frase sobre o diferencial vs concorrentes",
  "start_with_why": "Resumo do propósito detectado (ou se é apenas funcional)",
  "category_status": "Categoria Existente / Nova Categoria",
  "intro_nicho": "Uma frase humana e consultiva confirmando o nicho (Ex: 'Notei que vocês são referência em [Subnicho], ajudando [Público] a [Resultado]. É isso mesmo?')",
  "intro_icp": "Uma frase humana confirmando o público (Ex: 'Pelo que vi, vocês focam muito em [ICP]. Esse é o perfil que mais traz retorno hoje?')",
  "intro_diferencial": "Uma frase humana sobre o diferencial (Ex: 'O que me chamou atenção foi o [Diferencial]. É esse o argumento que vocês mais usam pra fechar negócio?')"
}

Responda em PORTUGUÊS. Seja preciso e estratégico.`;

    const dados = await llm.call({
      prompt,
      diagnosticoId: diagnostico_id || '00000000-0000-0000-0000-000000000000', // Fallback se anônimo
      actionType: 'analysis',
      temperature: 0.3,
      jsonMode: true
    });

    return new Response(JSON.stringify({ 
      success: true, 
      dados 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
