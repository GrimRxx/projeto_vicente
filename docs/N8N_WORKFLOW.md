# N8N Workflow Setup

Guia para criar o workflow de orquestração das mensagens WhatsApp COM a Claude API.

## 🏗️ Arquitetura do Workflow

```
WhatsApp Lead
    ↓
Evolution API Webhook
    ↓
[n8n] Webhook Trigger
    ↓
[n8n] Parse Mensagem
    ↓
[n8n] Claude AI (system_prompt)
    ↓
[n8n] Calcular Score
    ↓
[n8n] Classificar Lead
    ↓
[n8n] Decisão (Quente?)
    ├→ SIM: Notificar Consultor + Enviar Resposta IA
    └→ NÃO: Salvar BD + Enviar Resposta IA
    ↓
Evolution API (Enviar resposta)
```

## 📋 Pré-requisitos

1. **n8n instalado e rodando** em `http://localhost:5678`
2. **Evolution API rodando** em `http://localhost:8080`
3. **Claude API Key** configurada em variáveis de ambiente
4. **Arquivos do lead-ai** em `/c/Users/lucas/lead-ai`

## 🚀 Criando o Workflow

### Etapa 1: Criar Webhook Trigger

1. Abra n8n e clique em **"New Workflow"**
2. Adicione nó **"Webhook"**
3. Configure:
   - **HTTP Method**: POST
   - **Path**: `/webhook/lead-qualificacao`
   - **Test the connection** e copie a URL completa

4. Esta URL será usada em `config/settings.json` e registrada no Evolution API

### Etapa 2: Parse do Payload

Adicione um nó **"Function"** para extrair dados:

```javascript
// Parse Evolution API payload
const msg = $input.first().json.data;
const instanceName = msg.instanceName;
const message = msg.messages[0];

// Extrair informações
const leadPhone = message.key.remoteJid.replace('@c.us', '');
const leadText = message.message.conversation || '';
const leadName = message.pushName;
const timestamp = new Date(message.messageTimestamp * 1000);

return {
  leadPhone,
  leadText,
  leadName,
  timestamp,
  instanceName,
  isFromMe: message.key.fromMe
};
```

### Etapa 3: Chamar Claude API

Adicione nó **"HTTP Request"**:

```
Method: POST
URL: https://api.anthropic.com/v1/messages
Headers:
  - Content-Type: application/json
  - x-api-key: ${CLAUDE_API_KEY}
  - anthropic-version: 2023-06-01

Body:
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 1024,
  "system": "<leia do file system_prompt.md>",
  "messages": [
    {
      "role": "user",
      "content": "{{ $node.\"Function - Parse\".json.leadText }}"
    }
  ]
}
```

### Etapa 4: Extrair Resposta da IA

Nó **"Function - Extract Response"**:

```javascript
const response = $input.first().json;
const iaResponse = response.content[0].text;

return {
  iaResponse,
  usage: response.usage
};
```

### Etapa 5: Calcular Score de Qualificação

Nó **"Function - Calculate Score"**:

```javascript
// Importar regras de classificação
const iaResponse = $input.first().json.iaResponse;
const leadText = $node["Function - Parse"].json.leadText;

// Função auxiliar para contar palavras-chave
function countKeywords(text, keywords) {
  return keywords.filter(kw => 
    text.toLowerCase().includes(kw.toLowerCase())
  ).length;
}

// Regras de qualificação (simplificadas - usar JSON completo em produção)
let score = 0;

// Urgência
if (leadText.match(/urgente|preciso|já|semana que vem/i)) score += 40;
else if (leadText.match(/mês que vem|próximas semanas/i)) score += 30;
else if (leadText.match(/próximos 3 meses/i)) score += 15;
else if (leadText.match(/final do ano|sem data/i)) score += 5;

// Orçamento
if (leadText.match(/\\d{4,5}.*reais|tenho.*orçamento/i)) score += 35;
else if (leadText.match(/em torno de|aprox/i)) score += 25;
else if (leadText.match(/tenho recursos|tenho grana/i)) score += 15;

// Projeto
if (leadText.match(/reforma|construindo|obra|em andamento/i)) score += 15;
else if (leadText.match(/pro home office|meu quarto|sala/i)) score += 10;

// Comportamento
if (leadText.match(/quanto custa|preço|agendar|marcar/i)) score += 15;
else if (leadText.match(/qual material|que cores|qual tamanho/i)) score += 10;

// Experience
if (leadText.match(/já comprei|já vi|indicação|meu amigo/i)) score += 5;

// Classificação
let classification = '';
let shouldNotify = false;

if (score >= 90) {
  classification = '🔥 QUENTE';
  shouldNotify = true;
} else if (score >= 60) {
  classification = '🟠 MORNO';
} else if (score >= 30) {
  classification = '🟡 FRIO';
} else {
  classification = '❄️ MUITO FRIO';
}

return {
  score,
  classification,
  shouldNotify
};
```

### Etapa 6: Decisão Condicional

Adicione nó **"IF"**:

```
Condition: 
  - shouldNotify = true

Então: Notificar Consultor
Senão: Apenas Enviar Resposta
```

### Etapa 7: Notificar Consultor (Ramo DO IF - Verdadeiro)

Nó **"HTTP Request - Notify WhatsApp"**:

```
Method: POST
URL: http://localhost:8080/api/message/sendText/lead-seller

Headers:
  - Authorization: Bearer ${EVOLUTION_API_KEY}

Body:
{
  "number": "${consultor_whatsapp}",
  "text": "🔥 LEAD QUENTE! 🔥\n\n👤 Nome: {{ $node.\"Function - Parse\".json.leadName }}\n💬 Mensagem: {{ $node.\"Function - Parse\".json.leadText }}\n📊 Score: {{ $node.\"Function - Calculate Score\".json.score }}/120\n⏰ Horário: {{ $node.\"Function - Parse\".json.timestamp }}\n\n→ Entrar em contato ASAP!"
}
```

### Etapa 8: Enviar Resposta da IA

Nó **"HTTP Request - Send IA Response"** (fim de ambos os ramos):

```
Method: POST
URL: http://localhost:8080/api/message/sendText/lead-seller

Headers:
  - Authorization: Bearer ${EVOLUTION_API_KEY}

Body:
{
  "number": "{{ $node.\"Function - Parse\".json.leadPhone }}",
  "text": "{{ $node.\"Function - Extract Response\".json.iaResponse }}"
}
```

### Etapa 9: Salvar no Banco de Dados

Nó **"SQLite"** (opcional, para histórico local):

```sql
INSERT INTO leads (
  phone, name, message, classification, score, created_at, ia_response
) VALUES (
  $1, $2, $3, $4, $5, $6, $7
)
```

Parameters:
```
$1: {{ $node.\"Function - Parse\".json.leadPhone }}
$2: {{ $node.\"Function - Parse\".json.leadName }}
$3: {{ $node.\"Function - Parse\".json.leadText }}
$4: {{ $node.\"Function - Calculate Score\".json.classification }}
$5: {{ $node.\"Function - Calculate Score\".json.score }}
$6: {{ $node.\"Function - Parse\".json.timestamp }}
$7: {{ $node.\"Function - Extract Response\".json.iaResponse }}
```

## 🔐 Variáveis de Ambiente no n8n

Crie as seguintes variáveis em n8n:

1. **N8N_VARIABLES**:
   - `CLAUDE_API_KEY`: Sua chave da Claude API
   - `EVOLUTION_API_KEY`: API Key do Evolution
   - `CONSULTOR_WHATSAPP`: Número do consultor (ex: 5511987654321)
   - `SYSTEM_PROMPT`: Conteúdo do system_prompt.md

## 📱 Testando o Workflow

1. **Ativar teste**:
   - Clique em **"Listen"**no webhook
   - O n8n esperará por requisições

2. **Enviar mensagem de teste**:
   ```bash
   curl -X POST http://localhost:5678/webhook/lead-qualificacao \
     -H "Content-Type: application/json" \
     -d '{
       "data": {
         "instanceName": "lead-seller",
         "messages": [{
           "key": {
             "remoteJid": "5511987654321@c.us",
             "fromMe": false,
             "id": "TEST-123"
           },
           "message": {
             "conversation": "Oi, tudo bem? Quero um sofá cinza grande"
           },
           "messageTimestamp": '$(date +%s)',
           "pushName": "João Teste"
         }]
       }
     }'
   ```

3. **Verificar execução**:
   - Vá para "Executions"
   - Verá o log da execução

## 🚨 Troubleshooting

### Webhook não dispara
- Verifique que n8n está rodando em `http://localhost:5678`
- Teste a URL manualmente com curl
- Verifique logs: `n8n start`

### Claude API retorna erro
- Verifique `CLAUDE_API_KEY` configurada
- Verifique limite de créditos
- Reduza `max_tokens` se necessário

### Evolution não envia resposta
- Evolution API Key incorreta
- Número do lead formato errado (precisa +55)
- Instância não conectada (faça login novamente)

## 📊 Próximos Passos

1. ✅ Testar com exemplos do arquivo `examples/conversations.json`
2. ✅ Ajustar thresholds de score conforme feedback real
3. ✅ Adicionar histórico de conversas (SQLite)
4. ✅ Criar dashboard de leads (UI adicional)
5. ✅ Integrar com CRM (opcional)

## 📤 Exportar Workflow

Para compartilhar ou fazer backup:
1. Menu principal → "Download"
2. Salve em `workflows/n8n_lead_workflow.json`
3. Depois pode importar em outro n8n: "Upload"
