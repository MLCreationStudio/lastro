# Lastro — Prompt 1 Lovable
## Escopo: Autenticação (login + cadastro)

---

Cole esse prompt no Lovable para iniciar o projeto.
Substitua os dois valores entre colchetes pelas suas credenciais do Supabase.

---

## PROMPT PARA COLAR NO LOVABLE

---

Crie um web app chamado **Lastro** conectado ao Supabase.

**Credenciais Supabase:**
- Project URL: [cole sua Project URL aqui]
- Anon Key: [cole sua anon public key aqui]

---

### Identidade visual — aplique em todas as telas

- Background de todas as telas: `#0D1F1A`
- Cor principal / destaque: `#1D9E75`
- Texto principal: `#F5F0E8`
- Texto secundário: `rgba(245, 240, 232, 0.5)`
- Fonte: Georgia (serif) para títulos e textos principais
- Zero elementos decorativos — sem cards com bordas visíveis, sem sombras, sem ícones
- Inputs: linha simples, fundo transparente, borda inferior sutil em `rgba(245,240,232,0.2)`, texto em `#F5F0E8`
- Botão principal: fundo `#1D9E75`, texto `#0D1F1A`, fonte Georgia, sem borda arredondada exagerada — `border-radius: 6px`
- Botão secundário: fundo transparente, borda `0.5px solid rgba(245,240,232,0.2)`, texto `rgba(245,240,232,0.5)`

---

### Tela 1 — Landing / Entrada

Tela de entrada do app. Fundo `#0D1F1A` em tela cheia.

Conteúdo centralizado vertical e horizontalmente:

1. Nome da marca em destaque:
   - Texto: **Lastro**
   - Fonte: Georgia
   - Tamanho: 64px
   - Cor: `#1D9E75`
   - Peso: 500

2. Tagline logo abaixo:
   - Texto: *Marketing com base real.*
   - Fonte: Georgia
   - Tamanho: 18px
   - Cor: `rgba(245, 240, 232, 0.6)`
   - Itálico

3. Dois botões abaixo da tagline, centralizados, com espaço entre eles:
   - Botão 1 (primário): "Começar diagnóstico" — ao clicar, vai para a Tela 2
   - Botão 2 (secundário): "Já tenho conta" — ao clicar, vai para a Tela 3

Nenhum outro elemento. Sem menu, sem navbar, sem footer, sem logo adicional.

---

### Tela 2 — Cadastro

Fundo `#0D1F1A`. Conteúdo centralizado.

1. Texto no topo:
   - "Crie sua conta"
   - Georgia, 24px, `#F5F0E8`

2. Subtexto abaixo:
   - "Seu diagnóstico fica salvo. Sempre."
   - Georgia, 14px, `rgba(245,240,232,0.5)`, itálico

3. Formulário com dois campos:
   - Campo 1: E-mail — placeholder "seu@email.com"
   - Campo 2: Senha — placeholder "senha" — tipo password

4. Botão primário: "Criar conta"
   - Ao clicar: criar usuário no Supabase Auth com e-mail e senha
   - Se sucesso: redirecionar para `/dashboard` (página em branco por enquanto com texto "Em breve" em `#F5F0E8`)
   - Se erro: mostrar mensagem de erro abaixo do botão em `rgba(229, 83, 75, 0.8)`, fonte Georgia 13px

5. Link abaixo do botão:
   - "Já tenho conta → entrar"
   - Ao clicar: vai para Tela 3

---

### Tela 3 — Login

Fundo `#0D1F1A`. Conteúdo centralizado.

1. Texto no topo:
   - "Entrar"
   - Georgia, 24px, `#F5F0E8`

2. Formulário com dois campos:
   - Campo 1: E-mail — placeholder "seu@email.com"
   - Campo 2: Senha — placeholder "senha" — tipo password

3. Botão primário: "Entrar"
   - Ao clicar: autenticar no Supabase Auth
   - Se sucesso: redirecionar para `/dashboard`
   - Se erro: mostrar mensagem "E-mail ou senha incorretos" abaixo do botão

4. Link abaixo:
   - "Ainda não tenho conta → criar"
   - Ao clicar: vai para Tela 2

---

### Tela 4 — Dashboard (placeholder)

Fundo `#0D1F1A`. Conteúdo centralizado.

Apenas dois elementos:
1. Texto: "Olá, [email do usuário logado]"
   - Georgia, 18px, `#F5F0E8`

2. Botão secundário: "Sair"
   - Ao clicar: fazer logout no Supabase Auth e redirecionar para a Tela 1

---

### Regras de roteamento

- `/` → Tela 1 (landing)
- `/cadastro` → Tela 2
- `/login` → Tela 3
- `/dashboard` → Tela 4 (protegida — se não estiver logado, redireciona para `/login`)

---

### O que NÃO fazer

- Não adicionar navbar, header ou menu
- Não usar cores fora da paleta definida
- Não usar fonte sans-serif nos textos principais — só Georgia
- Não adicionar animações por enquanto
- Não criar nenhuma outra tela além das 4 definidas
- Não conectar ao banco de dados ainda — só autenticação via Supabase Auth

---

### Resultado esperado

Ao final desse prompt, o Lovable deve ter gerado:
- 4 telas funcionais com a identidade visual do Lastro
- Cadastro e login funcionando via Supabase Auth
- Roteamento correto entre as telas
- Dashboard protegido redirecionando não-logados para login
- Zero funcionalidade de diagnóstico — só autenticação

O próximo prompt vai adicionar a estrutura de navegação do app.
