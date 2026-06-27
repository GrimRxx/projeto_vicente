# 🚀 SETUP RÁPIDO - 45 Minutos

Seu sistema está pronto! Siga estes passos para rodar tudo.

## 📋 O que foi criado

- ✅ **simulador.js** - Emula Evolution API (para testar sem WhatsApp real)
- ✅ **Workflow n8n** - Pipeline completo de qualificação
- ✅ **Scripts npm** - Comando rápidos para tudo

## ⚡ Passo 1: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
echo "CLAUDE_API_KEY=sua_chave_ai_aqui" > .env.local
echo "EVOLUTION_API_KEY=sua_chave_evolution_aqui" >> .env.local
echo "CONSULTOR_WHATSAPP=5511987654321" >> .env.local
```

**Onde conseguir:**
- Claude API Key: https://console.anthropic.com
- Evolution API Key: http://localhost:8080 (depois de conectar)
- Seu WhatsApp: Seu número com +55

## 🎮 Passo 2: Iniciar os Serviços (3 Terminais)

### Terminal 1 - Simulador Evolution API
```bash
cd /c/Users/lucas/lead-ai
node simulador.js
```

Deve mostrar:
```
🚀 EVOLUTION API SIMULATOR rodando em http://localhost:8080
```

### Terminal 2 - n8n
```bash
cd /c/Users/lucas/lead-ai
npm run n8n
```

**IMPORTANTE**: Primeira vez que rodar, n8n vai pedir email/senha. Configure.
Depois acesse: `http://localhost:5678`

Deve mostrar:
```
Time to create some n8n magic! ✨
Open: http://localhost:5678
```

### Terminal 3 - Monitor (opcional, para visualizar logs)
```bash
cd /c/Users/lucas/lead-ai
tail -f logs/lead-ai.log  # Se existir
```

---

## 🧪 Passo 3: Importar Workflow no n8n

1. Abra n8n: http://localhost:5678
2. Menu → **Import from file**
3. Selecione: `workflows/n8n_lead_workflow.json`
4. Clique **Import**
5. O workflow aparecerá

---

## 📝 Passo 4: Configurar Variáveis de Ambiente no n8n

1. Menu → **Settings** → **Variables**
2. Criar 4 variáveis:

| Nome | Valor | Exemplo |
|------|-------|---------|
| `CLAUDE_API_KEY` | Sua chave Claude | `sk-ant-...` |
| `EVOLUTION_API_KEY` | Token evolution | `seu-token` |
| `CONSULTOR_WHATSAPP` | Seu WhatsApp | `5511987654321` |
| `WEBHOOK_ID` | (deixar vazio por enquanto) | ` ` |

Salve!

---

## 🧪 Passo 5: Testar o Fluxo Completo

### Teste 1: Lead QUENTE (simples)
```bash
npm run test:quente
```

Vai enviar 5 mensagens simulando um lead de alta qualidade:
- "Reformando apartamento"
- "Preciso em 2 semanas"
- "Tenho 8k"

**Esperado:**
- n8n processa cada mensagem
- Claude responde inteligentemente
- Score = ~105 (QUENTE 🔥)
- Consultor notificado

### Teste 2: Lead FRIO
```bash
npm run test:frio
```

Vai enviar 3 mensagens de um lead casual:
- "Só explorando"
- "Talvez no final do ano"

**Esperado:**
- Score = ~10 (MUITO_FRIO ❄️)
- Sem notificação

### Teste 3: Mensagem Customizada
```bash
npm run test:custom "Olá, procuro um sofá moderno"
```

---

## 📊 Verificar Resultados

1. **No n8n**: Menu → **Executions**
   - Ver todas as requisições processadas
   - Clicar em uma para ver detalhes

2. **No Simulador**: Verá log das respostas enviadas
   ```
   📤 [EVOLUTION] Enviando para 5511987654321:
      "Oi! 👋 Bem-vindo..."
   ```

3. **Score Calculado**: No último node "Log Final"

---

## ❓ Troubleshooting

### "n8n command not found"
```bash
npm install n8n -g  # Instalar globalmente
```

### "Claude API error"
- Verifique CLAUDE_API_KEY em `.env.local`
- Verifique saldo de créditos em https://console.anthropic.com

### "localhost:8080 recusou conexão"
- Verifique se simulador.js está rodando no Terminal 1

### "n8n não recebe requisição"
- Verifique se n8n está escutando em http://localhost:5678
- Confirme que webhook tem path `/webhook/lead-qualificacao`

### Workflow não processa?
- Confirme que todas as variáveis estão em Settings → Variables
- Clique em "Test" no webhook para testar manual

---

## 📱 Próximo: Testes com WhatsApp Real

Depois de validar com simulador, integre com Evolution API real:

1. Instale Evolution API com Docker (veja `docs/API_SETUP.md`)
2. Conecte seu número WhatsApp
3. Mude simulador para Evolution real
4. Mensagens de leads reais → n8n → Claude → Seu número

---

## 🎯 Resumo do Fluxo

```
Mensagem → Simulador/Evolution → n8n Webhook
                                    ↓
                            Claude API (responde)
                                    ↓
                         Calcula Score/Classifica
                                    ↓
                        É QUENTE? → Notifica + Envia
                        É FRIO?  → Só Envia Resposta
```

---

## ⏱️ Timeline Esperado

- Passo 1 (Variáveis): 2 min
- Passo 2 (Iniciar): 5 min
- Passo 3 (Importar workflow): 3 min
- Passo 4 (Variáveis n8n): 3 min
- Passo 5 (Testes): 20-30 min
- **Total: ~45 minutos**

---

## 🎉 Pronto!

Você tem um **sistema de IA qualificando leads automaticamente**!

### Próximas otimizações:
- Ajustar threshold de scoring
- Customizar prompt (docs/PROMPT_GUIDE.md)
- Adicionar histó...

Precisa de ajuda? Rode os testes!
