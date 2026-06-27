# Evolution API Setup

Guia de configuração da Evolution API para integração com WhatsApp.

## 📱 O que é Evolution API?

A Evolution API é um wrapper para protocolo WhatsApp (não oficial) que permite:
- Receber mensagens do WhatsApp
- Enviar mensagens via WhatsApp
- Webhooks para integração
- Múltiplas instâncias de números
- Autenticação QR Code

## 🚀 Instalação Local

### Pré-requisitos
- Docker e Docker Compose
- Node.js 16+
- FFmpeg (para processamento de mídia)

### Passo 1: Clone o repositório

```bash
git clone https://github.com/EvolutionAPI/evolution-api.git
cd evolution-api
```

### Passo 2: Configure o `.env`

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite com suas configurações
nano .env
```

**Variáveis importantes:**

```env
# API
API_HOST=0.0.0.0
API_PORT=8080
API_KEY=sua_chave_api_secreta_aqui

# Banco de dados
DATABASE_URL=postgresql://user:password@db:5432/evolution

# Redis (para fila de mensagens)
REDIS_URL=redis://redis:6379

# Webhook (seu n8n receberá aqui)
WEBHOOK_API_URL=http://seu-ip:8080

# Logs
LOG_LEVEL=debug
```

### Passo 3: Inicie com Docker Compose

```bash
docker-compose up -d
```

Aguarde 2-3 minutos para a API inicializar.

### Passo 4: Verifique se está rodando

```bash
curl http://localhost:8080/api/health
```

Deve retornar:
```json
{
  "status": "OK",
  "uptime": 123.45
}
```

## 📲 Conectar Número WhatsApp

### Via Interface Web

1. Acesse: `http://localhost:8080`
2. Faça login com `API_KEY` definida
3. Clique em "New Instance"
4. Escaneie o QR Code com seu WhatsApp
5. Pronto! Número conectado

### Via API (cURL)

```bash
# Criar instância
curl -X POST http://localhost:8080/api/instance/create \
  -H "Authorization: Bearer sua_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "lead-seller",
    "token": "seu_token_unico"
  }'

# Gerar QR Code
curl -X GET http://localhost:8080/api/instance/qrcode/lead-seller \
  -H "Authorization: Bearer sua_api_key"
```

## 🔗 Configurar Webhook

Para que o n8n receba as mensagens, configure o webhook:

```bash
curl -X POST http://localhost:8080/api/instance/webhook/lead-seller \
  -H "Authorization: Bearer sua_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "http://seu-ip-ou-dominio:5678/webhook/lead-qualificacao",
    "events": [
      "QRCODE_UPDATED",
      "MESSAGES_UPSERT",
      "MESSAGES_UPDATE",
      "MESSAGES_DELETE"
    ]
  }'
```

## 📤 Enviar Mensagem via Evolution API

Exemplo para n8n enviar resposta da IA:

```javascript
// Request HTTP POST
const url = 'http://localhost:8080/api/message/sendText/lead-seller';

const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sua_api_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    number: '5511987654321', // Número do lead com +55
    text: 'Olá! Obrigada por entrar em contato! 👋'
  })
});

const body = await response.json();
console.log(body);
```

## 🔔 Webhook Payload

Quando uma mensagem chega, o Evolution API envia um POST para seu webhook:

```json
{
  "data": {
    "instanceName": "lead-seller",
    "messages": [
      {
        "key": {
          "remoteJid": "5511987654321@c.us",
          "fromMe": false,
          "id": "3EB0FBE56AC8C9F4"
        },
        "message": {
          "conversation": "Oi, tudo bem?"
        },
        "messageTimestamp": 1685098800,
        "pushName": "João Silva"
      }
    ]
  }
}
```

## 🐛 Troubleshooting

### QR Code não aparece
```bash
# Reinicie a instância
curl -X DELETE http://localhost:8080/api/instance/logout/lead-seller \
  -H "Authorization: Bearer sua_api_key"
```

### Webhook não recebe mensagens
1. Verifique se a URL está correta (acessível do servidor)
2. Verifique logs: `docker logs evolution-api`
3. Teste manualmente: `curl webhook_url -X POST -d '{"test": true}'`

### Performance lenta
- Aumente recursos de Docker
- Use Redis para fila de mensagens
- Configure database pooling

## 📚 Referências

- [Evolution API Docs](https://github.com/EvolutionAPI/evolution-api)
- [Postman Collection](https://www.postman.com/EvolutionAPI)
- [Suporte](https://discord.gg/evolution-api)

## Próxima Etapa

Depois de configurar Evolution API, vá para [N8N_WORKFLOW.md](./N8N_WORKFLOW.md) para criar o workflow de roteamento das mensagens.
