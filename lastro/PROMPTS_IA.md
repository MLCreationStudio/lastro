# Lastro — Prompts da Anthropic API

**Status:** A construir — próxima ação prioritária
**Versão:** 0.1 (rascunho estrutural)

---

## Os 4 prompts necessários

O produto chama a API do Claude para processar 4 respostas abertas do módulo 1.
Cada prompt recebe uma resposta em linguagem natural e retorna JSON estruturado.

---

## Prompt 1 — Extração de nicho e categoria (Pergunta 1)

**Entrada:** Resposta aberta da P1 ("O que você vende e qual problema resolve?")
**Saída esperada:**
```json
{
  "nicho": "string",           // ex: "imobiliaria", "clinica_odonto", "academia"
  "subnicho": "string",        // ex: "odonto_estetica", "studio_fitness_high_ticket"
  "categoria": "string",       // "servico" | "produto" | "infoproduto" | "saas"
  "modelo_negocio": "string",  // "b2b" | "b2c" | "b2b2c"
  "ticket_estimado": "string", // "baixo" (<200) | "medio" (200-1000) | "alto" (>1000)
  "confianca": 0-100           // o quanto a IA tem certeza do nicho identificado
}
```

**Rascunho do prompt:**
```
Você é um especialista em marketing brasileiro com 10 anos de experiência em campanhas para pequenas e médias empresas.

Analise a descrição abaixo de um negócio brasileiro e extraia as informações em JSON.

Descrição: {produto_desc}

Retorne APENAS um JSON válido com os campos: nicho, subnicho, categoria, modelo_negocio, ticket_estimado, confianca.

Nichos válidos: imobiliaria, clinica_medica, clinica_odontologica, academia, studio_fitness, ecommerce, perfumaria, agencia_mkt, infoproduto, credito_consignado, saas, consultoria, advocacia, outro

Para subnicho, seja específico quando relevante (ex: odonto_geral vs odonto_estetica).
Quando não conseguir identificar com clareza, use confianca abaixo de 60.
```

---

## Prompt 2 — Score de clareza do ICP (Pergunta 2)

**Entrada:** Resposta aberta da P2 ("Quem é seu cliente hoje?")
**Saída esperada:**
```json
{
  "icp_score": 0-100,
  "nivel": "especifico" | "parcial" | "vago",
  "dimensoes": {
    "demografica": 0-100,    // idade, gênero, localização, renda
    "comportamental": 0-100, // como compra, quando, onde pesquisa
    "dor": 0-100             // problema específico que o produto resolve
  },
  "flag": "especifico" | "parcial" | "vago",
  "observacao": "string"     // o que falta para o ICP ficar mais claro
}
```

**Rascunho do prompt:**
```
Você é um especialista em marketing e estratégia de produto brasileiro.

Avalie a clareza do ICP (cliente ideal) descrito abaixo para um negócio brasileiro.
Um ICP claro permite criar campanhas eficientes. Um ICP vago desperdiça budget.

Descrição do cliente: {icp_desc}

Avalie em 3 dimensões (0 a 100 cada):
- Demográfica: o cliente tem perfil específico de idade, gênero, localização, renda?
- Comportamental: sabemos como, quando e onde essa pessoa compra?
- Dor: o problema específico que essa pessoa tem está claro?

ICP score = média das 3 dimensões.
- 80–100: específico — campanhas segmentadas serão eficientes
- 50–79: parcial — dá para trabalhar mas vai desperdiçar algum budget
- 0–49: vago — anúncios para "todo mundo" têm CAC 3x maior

Retorne APENAS JSON válido com: icp_score, nivel, dimensoes (demografica, comportamental, dor), flag, observacao.
```

---

## Prompt 3 — Score de diferencial competitivo (Pergunta 4)

**Entrada:** Resposta aberta da P4 ("Quem são seus concorrentes e por que escolheriam você?")
**Saída esperada:**
```json
{
  "diferencial_score": 0-100,
  "tem_diferencial": true | false,
  "tipo_diferencial": "preco" | "qualidade" | "especializacao" | "atendimento" | "localizacao" | "nenhum",
  "defensabilidade": "alta" | "media" | "baixa",
  "observacao": "string"
}
```

**Rascunho do prompt:**
```
Você é um especialista em posicionamento de marca e estratégia competitiva para empresas brasileiras.

Analise o diferencial competitivo descrito abaixo.

Descrição: {concorrentes_desc}

Avalie:
1. Existe um diferencial real e específico? (não apenas "melhor qualidade" ou "melhor preço")
2. Esse diferencial é defensável no longo prazo?
3. Um cliente consegue explicar por que escolheria esse negócio em vez do concorrente?

Score:
- 80–100: diferencial claro e defensável — campanhas vão converter bem
- 50–79: diferencial existe mas é fraco ou comum
- 0–49: sem diferencial real — competirá só por preço, CAC será 2x maior

Retorne APENAS JSON válido com: diferencial_score, tem_diferencial, tipo_diferencial, defensabilidade, observacao.
```

---

## Prompt 4 — Extração de histórico de marketing (Pergunta 6)

**Entrada:** Resposta aberta da P6 ("Já tentou marketing? O que funcionou e não funcionou?")
**Saída esperada:**
```json
{
  "tem_historico": true | false,
  "canais_tentados": [
    {
      "canal": "string",
      "resultado": "funcionou" | "nao_funcionou" | "parcial",
      "motivo_percebido": "string",
      "flag": "ja_tentado"
    }
  ],
  "padroes_identificados": "string",
  "recomendacao_historico": "string"
}
```

**Rascunho do prompt:**
```
Você é um especialista em marketing digital brasileiro com experiência em diagnóstico de campanhas.

Analise o histórico de marketing descrito abaixo e extraia informações estruturadas.

Histórico: {historico_marketing}

Identifique:
1. Quais canais foram tentados (Meta Ads, Google Ads, Instagram orgânico, WhatsApp, etc.)
2. Se cada canal funcionou, não funcionou ou teve resultado parcial
3. Qual foi o motivo percebido pelo empresário para o resultado
4. Padrões relevantes para a estratégia futura

Canais a identificar: meta_ads, google_ads, instagram_organico, tiktok, youtube, whatsapp, email, seo, indicacao, outbound, influencer, outro

Para canais que não funcionaram: adicione flag "ja_tentado" — eles não serão bloqueados no plano, mas receberão alerta de "já tentado sem sucesso".

Retorne APENAS JSON válido com: tem_historico, canais_tentados (array com canal, resultado, motivo_percebido, flag), padroes_identificados, recomendacao_historico.
```

---

## Notas para implementação

### Chamada da API
- Todos os 4 prompts são chamados em paralelo após o usuário finalizar o módulo 1
- Temperatura: 0.2 (respostas mais determinísticas)
- Max tokens: 500 por prompt (JSON é pequeno)
- Se a resposta não for JSON válido: retry uma vez, depois usar valores default

### Versionamento
- Cada prompt tem uma versão (v1, v2, etc.)
- Guardar no banco qual versão do prompt gerou cada diagnóstico
- Mudança de prompt = nova versão, não sobrescreve a anterior

### Testes antes de integrar
- Testar cada prompt com 10 casos reais da agência
- Validar se o nicho extraído bate com a tabela de CAC
- Validar se o ICP score reflete o que você esperaria de cada descrição
