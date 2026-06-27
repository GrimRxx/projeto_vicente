#!/usr/bin/env node

/**
 * Simulador de Evolution API
 * Emula o comportamento da Evolution API para testes locais
 * Envia webhooks para n8n quando "recebe" mensagens
 */

const http = require('http');

// Configuração
const EVOLUTION_PORT = 8081;
const N8N_WEBHOOK = 'http://localhost:5678/webhook/lead-qualificacao';

// Conversas de exemplo para testes
const TEST_CONVERSATIONS = {
  'quente': {
    name: 'João Silva',
    phone: '5511987654321',
    messages: [
      'Olá! Tô reformando meu apartamento e preciso urgente de um sofá',
      'Sou o João',
      'Quero um sofá cinza, moderno, grande mesmo',
      'Preciso em 2 semanas! Tá tudo sendo feito agora',
      'Tenho 8k para investir. Posso pagar à vista ou parcelar'
    ]
  },
  'frio': {
    name: 'Pedro Costa',
    phone: '5511996543210',
    messages: [
      'Oi, tô só curiosidade, que sofás vocês têm?',
      'Acho que só explorando mesmo, tá difícil de decidir',
      'Ah, sei lá, talvez no final do ano, mas ainda tá incerto'
    ]
  }
};

// ====================================
// HTTP Server (simula Evolution API)
// ====================================

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // Health check
  if (req.url === '/api/health' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'OK', simulator: true }));
    console.log('✅ Health check');
    return;
  }

  // Listar instâncias
  if (req.url === '/api/instance/list' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      instances: [
        {
          instanceName: 'lead-seller',
          status: 'connected',
          connected: true
        }
      ]
    }));
    console.log('✅ Instances list');
    return;
  }

  // Enviar mensagem (recebe do n8n)
  if (req.url === '/api/message/sendText/lead-seller' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log(`\n📤 [EVOLUTION] Enviando para ${data.number}:`);
        console.log(`   "${data.text}"\n`);
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, messageId: 'msg_' + Date.now() }));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(EVOLUTION_PORT, () => {
  console.log(`\n🚀 EVOLUTION API SIMULATOR rodando em http://localhost:${EVOLUTION_PORT}`);
  console.log(`   Webhook para n8n: ${N8N_WEBHOOK}`);
  console.log(`\n📝 Comandos disponíveis:`);
  console.log(`   - Para testar lead QUENTE: node simulador.js test quente`);
  console.log(`   - Para testar lead FRIO: node simulador.js test frio`);
  console.log(`   - Para teste customizado: node simulador.js send "seu texto aqui"\n`);
});

// ====================================
// Função para enviar webhook para n8n
// ====================================

function sendWebhookToN8n(name, phone, message) {
  const payload = {
    data: {
      instanceName: 'lead-seller',
      messages: [
        {
          key: {
            remoteJid: `${phone}@c.us`,
            fromMe: false,
            id: 'msg_' + Date.now()
          },
          message: {
            conversation: message
          },
          messageTimestamp: Math.floor(Date.now() / 1000),
          pushName: name
        }
      ]
    }
  };

  const options = {
    hostname: 'localhost',
    port: 5678,
    path: '/webhook/lead-qualificacao',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(payload))
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`✅ n8n respondeu com status ${res.statusCode}`);
    });
  });

  req.on('error', (error) => {
    console.error(`❌ Erro ao conectar com n8n: ${error.message}`);
    console.error(`   Verifique se n8n está rodando em http://localhost:5678`);
  });

  req.write(JSON.stringify(payload));
  req.end();
}

// ====================================
// CLI para testes
// ====================================

const args = process.argv.slice(2);

if (args[0] === 'test' && args[1]) {
  const type = args[1]; // 'quente' ou 'frio'

  if (!TEST_CONVERSATIONS[type]) {
    console.error(`❌ Tipo inválido. Use: quente ou frio`);
    process.exit(1);
  }

  const convo = TEST_CONVERSATIONS[type];
  console.log(`\n🧪 Testando conversa: ${type.toUpperCase()}`);
  console.log(`   Lead: ${convo.name} (${convo.phone})`);
  console.log(`   Mensagens: ${convo.messages.length}\n`);

  // Enviar mensagens sequencialmente com intervalo
  convo.messages.forEach((msg, index) => {
    setTimeout(() => {
      console.log(`📨 [${index + 1}/${convo.messages.length}] ${convo.name}: "${msg}"`);
      sendWebhookToN8n(convo.name, convo.phone, msg);
    }, index * 3000); // 3 segundos entre mensagens
  });

  setTimeout(() => {
    console.log(`\n✅ Teste '${type}' concluído!`);
    console.log(`   Verifique o histórico de execução no n8n\n`);
    process.exit(0);
  }, convo.messages.length * 3000 + 2000);

} else if (args[0] === 'send' && args[1]) {
  const message = args.slice(1).join(' ');
  console.log(`\n📨 Enviando mensagem de teste:`);
  console.log(`   "${message}"\n`);
  sendWebhookToN8n('Teste User', '5511987654321', message);

  setTimeout(() => {
    process.exit(0);
  }, 2000);
}
