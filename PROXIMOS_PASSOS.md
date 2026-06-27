# ⚡ PRÓXIMAS AÇÕES - Faça Agora!

## 1️⃣ Criar arquivo .env.local (2 min)

```bash
# Abra seu editor favorito e crie o arquivo:
# C:\Users\lucas\lead-ai\.env.local

# Copie e preencha com SEUS dados:
CLAUDE_API_KEY=sk-ant-v7-... (copy de https://console.anthropic.com)
EVOLUTION_API_KEY=qualquer-chave-para-teste-123
CONSULTOR_WHATSAPP=5511987654321
```

**Onde encontrar:**
- **Claude API Key**: https://console.anthropic.com/keys (create new key)
- **WhatsApp**: Seu número com +55 (ex: 5511987654321)

---

## 2️⃣ Aguarde n8n Instalar

A instalação do n8n está em andamento (background).

```
⏳ Isso pode levar 5-10 minutos...
   - n8n é ~500MB
   - Primeira vez instala tudo
   - Semelhante a instalar VSCode
```

Enquanto aguarda, leia [README.md](./README.md)

---

## 3️⃣ Confirme a Instalação (Quando estiver pronto)

```bash
# Verifique se n8n foi instalado
npm list n8n

# Deve mostrar algo como:
# lead-ai@1.0.0 /c/Users/lucas/lead-ai
# └── n8n@*.*.*
```

---

## 4️⃣ Abra 3 Terminais

Quando a instalação terminar, abra 3 janelas do PowerShell/CMD:

### Terminal 1️⃣ (SIMULADOR)
```bash
cd C:\Users\lucas\lead-ai
node simulador.js
```

**Esperado:**
```
🚀 EVOLUTION API SIMULATOR rodando em http://localhost:8080
Webhook para n8n: http://localhost:5678/webhook/lead-qualificacao

📝 Comandos disponíveis:
   - Para testar lead QUENTE: node simulador.js test quente
   - Para testar lead FRIO: node simulador.js test frio
```

### Terminal 2️⃣ (n8n)
```bash
cd C:\Users\lucas\lead-ai
npm run n8n
```

**Esperado (primeira vez):**
```
⁇ Enter a username for the admin user [admin]: admin
⁇ Enter a password for the admin user: (seu password)

Time to create some n8n magic! ✨
Open: http://localhost:5678
```

Quando ver essas linhas, pode abrir o navegador.

### Terminal 3️⃣ (TESTES - depois que 1 e 2 estiverem rodando)
```bash
cd C:\Users\lucas\lead-ai
npm run test:quente
```

**Esperado:**
```
🧪 Testando conversa: QUENTE
   Lead: João Silva (5511987654321)
   Mensagens: 5

📨 [1/5] João Silva: "Olá! Tô reformando..."
📨 [2/5] João Silva: "Sou o João..."
...
✅ Teste 'quente' concluído!
```

---

## 5️⃣ Verificar Resultados

### No n8n (http://localhost:5678)

1. Faça login com credenciais que criou
2. Clique em menu (hamburger icon) → **Executions**
3. Deve mostrar as 5 mensagens que o simulador enviou
4. Clique em uma para ver detalhes

### No Simulador (Terminal 1)

Vai mostrar algo como:

```
📤 [EVOLUTION] Enviando para 5511987654321:
   "Oi! 👋 Bem-vindo! Sou consultora de vendas..."

✅ n8n respondeu com status 200
```

---

## 🐛 Se Algo Deu Errado

### "n8n: command not found"
```bash
# Instale manualmente
npm install -g n8n
```

### "CLAUDE_API_KEY is not set"
- Verifique se .env.local existe
- Verifique se tem a chave correta

### "localhost:8080 refused connection"
- Terminal 1 (simulador) não está rodando
- Retorne ao Terminal 1 e execute `node simulador.js`

### n8n está lento
- Primeira inicialização é lenta
- Aguarde 2-3 minutos
- Segunda inicialização é rápida

---

## 🎯 Timeline

```
Agora              → Criar .env.local (2 min)
                   → Aguardar n8n instalar (5-10 min)
                   
Quando terminar    → Abrir 3 terminais
                   → Rodar simulador (Terminal 1)
                   → Rodar n8n (Terminal 2)
                   → Rodar teste (Terminal 3)
                   → Ver resultados
                   
Total: ~20-30 min
```

---

## 📝 Checklist

- [ ] .env.local criado e preenchido
- [ ] n8n terminou de instalar
- [ ] Terminal 1: Simulador rodando
- [ ] Terminal 2: n8n rodando
- [ ] Consegui acessar http://localhost:5678
- [ ] Terminal 3: Testes executados
- [ ] Vi resultados no n8n → Executions

---

## 🎉 Quando Tudo Estiver Funcionando

1. Você terá um lead notificado no seu WhatsApp (do simulador)
2. Claude terá respondido a 5 mensagens diferentes
3. Score será calculado (~105 = QUENTE 🔥)
4. Sistema pronto para WhatsApp real!

---

## 🚀 Próximas Etapas Depois

1. Testar com `npm run test:frio`
2. Customizar prompt (veja `docs/PROMPT_GUIDE.md`)
3. Testar com Evolution API real + WhatsApp verdadeiro

---

**Dúvida?** Leia os arquivos de doc:
- `README.md` - Visão geral
- `SETUP_RAPIDO.md` - Passo-a-passo
- `docs/N8N_WORKFLOW.md` - Detalhes do workflow
