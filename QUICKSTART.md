# 🚀 Quick Start - Comece em 30 Min

Guia rápido para botar o projeto rodar em tempo mínimo.

## ⚡ 5 Passos Essenciais

### 1️⃣ Configurar Variáveis (5 min)

Edite `config/settings.json`:

```bash
# Abra o arquivo
code config/settings.json

# Procure e complete essas seções:
# - business.consultor_nome: Seu nome
# - business.empresa_name: Nome da empresa
# - business.showroom.telefone: Seu número
# - api.claude.api_key: Sua Claude API Key
# - api.evolution.api_key: Sua Evolution API Key
```

### 2️⃣ Iniciar Evolution API (5 min)

Se não está rodando:

```bash
# No seu terminal
cd evolution-api
docker-compose up -d

# Verificar se tá ok
curl http://localhost:8080/api/health
```

### 3️⃣ Conectar WhatsApp (5 min)

1. Abra: `http://localhost:8080`
2. Faça login com API Key
3. Clique "New Instance"
4. Escaneie QR Code com seu WhatsApp
5. Pronto!

### 4️⃣ Configurar n8n Webhook (10 min)

Abra n8n: `http://localhost:5678`

1. New Workflow
2. Adicione nó **Webhook**:
   - Method: POST
   - Path: `/webhook/lead-qualificacao`
   - Clique "Test" e copie a URL

3. Registre webhook no Evolution:
```bash
curl -X POST http://localhost:8080/api/instance/webhook/lead-seller \
  -H "Authorization: Bearer $EVOLUTION_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "http://seu-ip:5678/webhook/lead-qualificacao",
    "events": ["MESSAGES_UPSERT"]
  }'
```

### 5️⃣ Testar com Mensagem (5 min)

Envie uma mensagem de teste via WhatsApp para seu número. 

​Se receber resposta automática → ✅ **Tá funcionando!**

---

## 🧪 Testar Manualmente (sem WhatsApp)

```bash
# Copie isso em um arquivo test.sh
#!/bin/bash

curl -X POST http://localhost:5678/webhook/lead-qualificacao \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "instanceName": "meu-numero",
      "messages": [{
        "key": {
          "remoteJid": "5511987654321@c.us",
          "fromMe": false,
          "id": "TEST-123"
        },
        "message": {
          "conversation": "Oi, preciso de um sofá pra meu apartamento novo"
        },
        "messageTimestamp": '$(date +%s)',
        "pushName": "João Teste"
      }]
    }
  }'

# Executar:
bash test.sh
```

Verifique em n8n → Executions se apareceu

---

## 📊 Estrutura Criada

```
✅ README.md                        - Visão geral
✅ prompts/system_prompt.md         - Prompt da IA
✅ prompts/qualification_rules.md   - Regras de score
✅ config/settings.json             - Configurações
✅ config/classification_rules.json - Regras de classificação
✅ examples/conversations.json      - Exemplos de conversas
✅ docs/API_SETUP.md               - Setup Evolution
✅ docs/N8N_WORKFLOW.md            - Criar workflow n8n
✅ docs/PROMPT_GUIDE.md            - Otimizar prompt
```

---

## 🎯 Próximas Ações

### Hoje
- [ ] Configurar variáveis em `settings.json`
- [ ] Testar mensagem manual

### Amanhã
- [ ] Criar completo o workflow do n8n
- [ ] Coletar 10 conversas reais
- [ ] Validar classificações

### Próxima Semana
- [ ] Ajustar scores baseado em feedback
- [ ] Criar dashboard de leads
- [ ] Integrar notificação ao consultor

---

## ❓ Dúvidas Comuns

**P: Preciso hospedar a Evolution?**
A: Não pro teste. Local funciona. Depois considera hosting.

**P: Quanto custa?**
A: Evolution (grátis), n8n (grátis self-hosted), Claude API (pay-as-you-go, ~$0.01 por message).

**P: Posso usar em produção assim?**
A: Não, adicione: HTTPS, backup BD, alertas de erro, rate limiting no n8n.

**P: E se cair algum serviço?**
A: Messages ficarão na fila do Evolution até reconnect.

---

## 🆘 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| n8n não carrega | Reinicie: `docker restart n8n` |
| Evolution não conecta | Escaneie QR novamente |
| Resposta não chega | Verifique logs do n8n → Executions |
| Claude API error | Verifique saldo e API Key |

---

## 📞 Stack Rodando

Verificar tudo online:

```bash
# Terminal 1 - n8n
n8n start

# Terminal 2 - Evolution (ou docker)
docker-compose up evolution-api

# Terminal 3 - Seu teste
curl http://localhost:5678/api/health
curl http://localhost:8080/api/health
```

---

## 🎉 Parabéns!

Você tem um sistema de IA qualificando leads pelo WhatsApp!

Próximo: Ir para `docs/PROMPT_GUIDE.md` para otimizar.
