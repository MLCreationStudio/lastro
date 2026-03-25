# Lastro — Tabela de CAC por Nicho v1.0

**Fonte:** Memória da ML Creation Studio (anos de agência) + benchmarks BR ajustados
**Ajuste 2026:** +12,15% sobre Meta Ads (novo imposto repassado aos anunciantes desde jan/2026)
**Confiança:** Alta = memória real de campanha · Média = benchmark ajustado · Baixa = estimativa

---

## Tabela principal

| Nicho | Subnicho | CPL estimado | CAC estimado | Canal principal | Ciclo médio | Confiança |
|-------|----------|-------------|-------------|----------------|-------------|-----------|
| Imobiliária / corretor | Geral | R$80–R$350 | R$1.500–R$8.000 | Meta Ads, Google, portais | 30–90 dias | Alta |
| Imobiliária / corretor | Alto padrão | R$150–R$600 | R$3.000–R$15.000 | Google, portais premium | 60–180 dias | Média |
| Clínica médica | Geral / especialidades | R$25–R$90 | R$80–R$400 | Meta Ads, Google | 7–21 dias | Alta |
| Clínica médica | Estética médica | R$50–R$180 | R$200–R$800 | Meta Ads | 7–30 dias | Alta |
| Clínica odontológica | Geral | R$30–R$80 | R$100–R$300 | Meta Ads, Google | 7–21 dias | Alta |
| Clínica odontológica | Estética dental | R$60–R$200 | R$300–R$1.200 | Meta Ads | 14–45 dias | Alta |
| Crédito consignado | Servidor público / INSS | R$15–R$60 | R$60–R$250 | Meta Ads, WhatsApp | 1–7 dias | Alta |
| Academia | Convencional | R$10–R$40 | R$30–R$120 | Meta Ads, orgânico local | 1–14 dias | Alta |
| Studio fitness | High ticket (pilates, funcional) | R$40–R$150 | R$150–R$600 | Meta Ads, indicação | 7–21 dias | Alta |
| E-commerce | Geral | R$8–R$45 | R$25–R$120 | Meta Ads, Google Shopping | 1–3 dias | Média |
| E-commerce | Nicho específico | R$12–R$60 | R$35–R$180 | Meta Ads | 1–7 dias | Média |
| Perfumaria | Revenda / marca própria | R$6–R$25 | R$18–R$80 | Meta Ads, influencer | 1–7 dias | Média |
| Agência de marketing | B2B | R$60–R$200 | R$400–R$2.000 | Indicação, LinkedIn, conteúdo | 30–90 dias | Alta |
| Ebook / infoproduto | Geral | R$5–R$30 | R$15–R$90 | Meta Ads, YouTube | 1–3 dias | Média |
| Ebook / infoproduto | Nicho premium | R$15–R$60 | R$40–R$180 | Meta Ads, email | 1–7 dias | Média |

---

## Nichos a adicionar (pesquisa futura)

- Advocacia / jurídico
- Consultoria B2B
- SaaS B2B early-stage
- Escola / cursos presenciais
- Pet shop / veterinário
- Restaurante / delivery
- Contabilidade

---

## Insights críticos da tabela

### Maior armadilha
**Imobiliária com budget pequeno.** CAC de R$1.500 a R$8.000 com R$500/mês de budget é matematicamente impossível. Caso mais frequente na agência. O Lastro vai identificar antes de qualquer campanha.

### Melhor relação CAC/ticket
**Crédito consignado.** Ciclo curto, CAC baixo, comissão alta. Com R$500 de budget gera resultado real.

### Maior variação interna
**Odontologia.** Geral (CAC ~R$200) vs estética dental (CAC ~R$800) — 4x de diferença. O produto precisa perguntar o foco antes do lookup.

### Canal mais subestimado
**Indicação.** Studio fitness, agência, odonto estética, clínica especializada — todos têm indicação como canal de menor CAC. Mas nenhum cliente chegava com processo estruturado. Módulo 2 sempre recomenda indicação antes de qualquer anúncio para negócios de serviço com ticket > R$500.

---

## Como essa tabela vive no produto

1. **Lookup automático:** Quando a IA extrai o nicho da P1, busca o CAC estimado nessa tabela
2. **Input no score:** CAC estimado entra na dimensão "Viabilidade financeira" (peso 40%)
3. **Subnicho:** Para odonto e clínica estética, a IA tenta identificar o subnicho na P1
4. **Atualização:** Cada CAC real registrado no módulo 3 alimenta essa tabela — com 50 casos por nicho, o dado próprio substitui o estimado
5. **Transparência:** O produto exibe o nível de confiança de cada estimativa para o usuário

---

## Regra de budget mínimo por canal (derivada do CAC)

| Canal | Budget mínimo de mídia | Justificativa |
|-------|----------------------|---------------|
| Meta Ads | R$600/mês | Mínimo de 3 CACs para o algoritmo aprender |
| Google Ads | R$800/mês | CPCs mais altos + tempo de indexação |
| LinkedIn Ads | R$3.000/mês | CPC mais caro do mercado |
| Orgânico | R$0 | Sem custo de mídia — só tempo |
| Indicação | R$0 | Sem custo de mídia — só processo |
| Outbound | R$0 | Sem custo de mídia — só tempo e ferramenta |

**Nota:** Budget mínimo = `budget_midia` (56% do budget total declarado), não o budget total.
