# Lead AI - Sistema de Qualificação Automática de Leads

Sistema de IA para atendimento automático, qualificação e classificação de leads em WhatsApp usando Evolution API + n8n + Claude API.

## 🎯 Objetivo

Automatizar o primeiro atendimento de leads de vendas de móveis de alto padrão, qualificando-os como **quentes** ou **frios** e notificando o consultor em tempo real.

## 🏗️ Estrutura do Projeto

```
lead-ai/
├── README.md                 # Este arquivo
├── prompts/
│   ├── system_prompt.md      # Instruções do sistema para a IA
│   └── qualification_rules.md # Regras de qualificação
├── config/
│   ├── settings.json         # Configurações gerais
│   ├── furniture_catalog.json # Catálogo de móveis
│   └── classification_rules.json # Regras de classificação
├── logic/
│   ├── qualifier.js          # Lógica de qualificação
│   ├── classifier.py         # Classificador de leads
│   └── notification.js       # Sistema de notificações
├── examples/
│   ├── conversations.json    # Exemplos de conversas
│   └── lead_samples.json     # Exemplos de leads classificados
├── docs/
│   ├── API_SETUP.md          # Configuração da Evolution API
│   ├── N8N_WORKFLOW.md       # Setup do n8n
│   └── PROMPT_GUIDE.md       # Guia de prompt engineering
└── workflows/
    └── n8n_lead_workflow.json # Workflow exportado do n8n
```

## 🚀 Primeiros Passos

1. **Configurar variáveis** → `config/settings.json`
2. **Definir prompt da IA** → `prompts/system_prompt.md`
3. **Criar regras de qualificação** → `config/classification_rules.json`
4. **Testar conversas** → `examples/conversations.json`
5. **Integrar com n8n** → `workflows/n8n_lead_workflow.json`

## 📋 Fluxo da Conversa

```
WhatsApp Lead
    ↓
Evolution API
    ↓
n8n (webhook receiver)
    ↓
Claude API (system_prompt)
    ↓
Qualification Engine
    ↓
Classification (Quente/Frio)
    ↓
Notification (se Quente)
    ↓
Lead armazenado no histórico
```

## 📝 Exemplo de Classificação

- **QUENTE**: Orçamento próximo, interesse imediato, disponibilidade compatível
- **FRIO**: Pesquisando, sem urgência, sem orçamento definido

## 🔧 Stack

- **Chat**: Evolution API (WhatsApp)
- **Orquestração**: n8n (workflows)
- **IA**: Claude API (Claude 3.5 Sonnet)
- **Configuração**: JSON + Markdown
- **Execução**: Node.js / Python (local)

## 📬 Contato

Consultor de vendas: [A definir]
