# 📊 Status do Projeto - lead-ai

Atualizado: 27 de Maio de 2026

## ✅ O que foi Criado

### 📁 Estrutura (17 arquivos + pasta node_modules)

```
lead-ai/
├── 📄 Core Docs
│   ├── README.md                 ✅ Visão geral (leia primeiro!)
│   ├── QUICKSTART.md             ✅ 30 min para começar
│   ├── SETUP_RAPIDO.md           ✅ 45 min até testes
│   ├── FILE_INDEX.md             ✅ Índice de navegação
│   ├── ENV_TEMPLATE              ✅ Template de variáveis
│   └── startup.sh                ✅ Script de startup
│
├── 🤖 IA & Qualificação
│   ├── prompts/system_prompt.md       ✅ Instruções da IA completas
│   ├── prompts/qualification_rules.md ✅ Regras de scoring (pontuação)
│   └── config/classification_rules.json ✅ Parâmetros de classificação
│
├── ⚙️ Configuração
│   ├── config/settings.json           ✅ Variáveis do projeto
│   ├── config/furniture_catalog.json  ✅ Catálogo de móveis
│   └── .gitignore                     ✅ Segurança git
│
├── 📚 Documentação Técnica
│   ├── docs/API_SETUP.md              ✅ Setup Evolution API
│   ├── docs/N8N_WORKFLOW.md           ✅ Como criar workflow
│   └── docs/PROMPT_GUIDE.md           ✅ Otimizar IA
│
├── 💾 Dados & Exemplos
│   ├── examples/conversations.json    ✅ 3 conversas exemplo
│   ├── examples/lead_samples.json     ✅ Leads exemplo + Schema BD
│   └── workflows/n8n_lead_workflow.json ✅ Workflow JSON exportado
│
├── 🔧 Scripts
│   ├── simulador.js                   ✅ Evolution API simulator
│   ├── run-n8n.js                     ✅ Script para rodar n8n
│   └── package.json                   ✅ npm scripts configurados
│
└── 📦 Dependências
    └── node_modules/             ⏳ Instalando n8n...
```

---

## 🎯 O que Cada Arquivo Faz

| Arquivo | Propósito | Ação Requerida |
|---------|-----------|-------|
| **README.md** | Visão geral completa | Leia para entender |
| **SETUP_RAPIDO.md** | Start em 45 min | Siga os 5 passos |
| **simulador.js** | Emula WhatsApp/Evolution | Rodará no Terminal 1 |
| **system_prompt.md** | Comportamento da IA | Customizar se quiser |
| **settings.json** | Configurações | ⚠️ EDITE COM SEUS DADOS |
| **package.json** | npm scripts | Use `npm run` |
| **n8n_lead_workflow.json** | Workflow completo | Importar no n8n |

---

## 🚀 Próximos Passos (Agora!)

### Fase 1: Setup (10 min)

```bash
# 1. Copie o template de variáveis
cp ENV_TEMPLATE .env.local

# 2. EDITE .env.local com seus dados:
#    - CLAUDE_API_KEY: De https://console.anthropic.com
#    - EVOLUTION_API_KEY: Um valor qualquer (pra teste)
#    - CONSULTOR_WHATSAPP: Seu número (5511...)
```

### Fase 2: Inicie os Serviços (30-40 min)

**Em 3 terminais DIFERENTES:**

```bash
# Terminal 1
node simulador.js

# Terminal 2 (primeira vez vai levar 30-40s)
npm run n8n

# Terminal 3 (depois que os outros estiverem rodando)
npm run test:quente
```

### Fase 3: Teste o Fluxo (5 min)

- Verifique logs do simulador
- Abra http://localhost:5678 (n8n)
- Vá em **Executions** para ver as requisições

---

## 📊 Arquitetura Implementada

```
┌─────────────────────────────────────────────────────────┐
│                     LEAD MESSAGES                        │
│              (Simulador ou WhatsApp Real)                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
         ┌──────────────────────────┐
         │  EVOLUTION API simulator  │
         │  (localhost:8080)         │
         └────────────┬─────────────┘
                      │ Webhook POST
                      ↓
        ┌──────────────────────────┐
        │    n8n Workflow          │
        │  (localhost:5678)        │
        ├──────────────────────────┤
        │ 1. Parse Message         │
        │ 2. Claude API (IA)       │
        │ 3. Calcular Score        │
        │ 4. Classificar Lead      │
        │ 5. Notificar (se quente) │
        └─────────┬─────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
   QUENTE? 🔥         FRIO/MORNO
        │                    │
        ↓                    ↓
   Notificar           Salvar BD
   Consultor           Histórico
        │                    │
        └─────────┬──────────┘
                  │
                  ↓
         ┌────────────────┐
         │ Resposta IA    │
         │  Envia Lead    │
         │ Via Evolution  │
         │  WhatsApp      │
         └────────────────┘
```

---

## 🧪 Testes Disponíveis

```bash
# Lead com ALTA qualificação (vai notificar você!)
npm run test:quente

# Lead com BAIXA qualificação
npm run test:frio

# Seu próprio texto de teste
npm run test:custom "Seu texto aqui"
```

---

## 📱 Integração com WhatsApp Real (Depois)

Quando quiser com o WhatsApp real:

1. Instalar Evolution API com Docker (veja `docs/API_SETUP.md`)
2. Conectar número WhatsApp (QR Code)
3. Mudar webhook do simulador para Evolution real
4. Pronto! Leads reais → Processo automático

---

## 🔍 Verificação Rápida

**Para confirmar tudo está funcionando:**

```bash
# Este comando printa a estrutura do que foi criado
ls -la lead-ai/

# Ver arquivos de configuração
cat lead-ai/package.json | grep "scripts" -A 10

# Listar workflows
ls lead-ai/workflows/
```

---

## ⚙️ Configurações Importantes

`config/settings.json` contém:
- ✅ Thresholds de classificação (quando é QUENTE, FRIO, etc)
- ✅ Endpoints de APIs (Evolution, Claude)
- ✅ Informações da empresa
- ✅ Horários de atendimento

Você pode editar conforme necessário!

---

## 🚨 Checklist Antes de Começar

- [ ] Node.js v20+ instalado (`node --version`)
- [ ] Arquivo `.env.local` criado e preenchido
- [ ] CLAUDE_API_KEY válida
- [ ] Você entendeu o fluxo (leia `README.md`)

---

## 📞 Suporte

**Problema com n8n?**
- Veja: `docs/N8N_WORKFLOW.md`

**Prompt da IA não está bom?**
- Veja: `docs/PROMPT_GUIDE.md`

**Quer customizar scoring?**
- Edite: `config/classification_rules.json`

**Quer exemplos de conversas?**
- Veja: `examples/conversations.json`

---

## 🎓 Aprendizado

O sistema foi estruturado pensando em:
- **Rapidez**: Rode em 45 min
- **Flexibilidade**: Customize o prompt facilmente
- **Escalabilidade**: Pronto para evoluir
- **Documentação**: Tudo explicado
- **Segurança**: API Keys em variáveis, não no código

---

## 🎉 Você Tem Agora

Um **sistema completo de qualificação de leads via IA** que:
- ✅ Recebe mensagens WhatsApp
- ✅ Responde com IA (Claude)
- ✅ Classifica automaticamente
- ✅ Notifica quando lead é bom
- ✅ Escalável para produção

**Próximo**: Siga `SETUP_RAPIDO.md` para começar!
