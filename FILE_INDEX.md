# 📚 Índice de Arquivos - Lead AI

Guia de navegação para entender e usar o projeto.

## 🎯 Comece Aqui

1. **[README.md](./README.md)** ← **LEIA PRIMEIRO**
   - Visão geral do projeto
   - Objetivo e fluxo
   - Estrutura do código

2. **[QUICKSTART.md](./QUICKSTART.md)** ← **Se quer começar em 30 min**
   - 5 passos essenciais
   - Setup rápido
   - Teste manual

## 📖 Documentação Principal

### Para Configurar o Projeto
- **[config/settings.json](./config/settings.json)** - Variáveis de configuração (EDITE AQUI!)
- **[config/classification_rules.json](./config/classification_rules.json)** - Regras de scoring
- **[config/furniture_catalog.json](./config/furniture_catalog.json)** - Catálogo de móveis

### Para Entender a IA
- **[prompts/system_prompt.md](./prompts/system_prompt.md)** - Instruções da IA (IMPORTANTE!)
- **[prompts/qualification_rules.md](./prompts/qualification_rules.md)** - Regras de qualificação
- **[docs/PROMPT_GUIDE.md](./docs/PROMPT_GUIDE.md)** - Como otimizar o prompt

### Para Integrar APIs
- **[docs/API_SETUP.md](./docs/API_SETUP.md)** - Como configurar Evolution API
- **[docs/N8N_WORKFLOW.md](./docs/N8N_WORKFLOW.md)** - Como criar workflow no n8n

### Exemplos e Referência
- **[examples/conversations.json](./examples/conversations.json)** - Exemplos de conversas
- **[examples/lead_samples.json](./examples/lead_samples.json)** - Exemplos de leads qualificados

## 🔄 Fluxo Recomendado de Tarefas

### Dia 1 - Setup
1. Leia [README.md](./README.md)
2. Siga [QUICKSTART.md](./QUICKSTART.md)
3. Configure [config/settings.json](./config/settings.json)
4. Testar mensagem manual

### Dia 2 - Entender a IA
1. Leia [prompts/system_prompt.md](./prompts/system_prompt.md)
2. Leia [prompts/qualification_rules.md](./prompts/qualification_rules.md)
3. Estude [examples/conversations.json](./examples/conversations.json)

### Dia 3 - Integração
1. Siga [docs/API_SETUP.md](./docs/API_SETUP.md)
2. Siga [docs/N8N_WORKFLOW.md](./docs/N8N_WORKFLOW.md)
3. Testar fluxo completo

### Semana 2 - Otimização
1. Leia [docs/PROMPT_GUIDE.md](./docs/PROMPT_GUIDE.md)
2. Coletar 10-20 conversas reais
3. Ajustar scoring baseado em feedback

## 📁 Estrutura de Pastas

```
lead-ai/
│
├── 📄 README.md              # Visão geral (LEIA!)
├── 📄 QUICKSTART.md          # Setup rápido (30 min)
├── 📄 FILE_INDEX.md          # Este arquivo
├── .gitignore                # Arquivos a ignorar no git
│
├── 📁 prompts/               # IA e qualificação
│   ├── system_prompt.md      # Instruções da IA
│   └── qualification_rules.md # Regras de scoring
│
├── 📁 config/                # Configurações
│   ├── settings.json         # ⚙️ EDITE COM SEUS DADOS
│   ├── classification_rules.json
│   └── furniture_catalog.json
│
├── 📁 docs/                  # Documentação
│   ├── API_SETUP.md          # Evolution API
│   ├── N8N_WORKFLOW.md       # Workflow n8n
│   ├── PROMPT_GUIDE.md       # Otimizar prompt
│   └── FILE_INDEX.md         # Este arquivo
│
├── 📁 examples/              # Exemplos
│   ├── conversations.json    # Conversas exemplo
│   └── lead_samples.json     # Leads exemplo + Schema BD
│
├── 📁 workflows/             # (Será criado) Workflows n8n exportados
│   └── n8n_lead_workflow.json
│
├── 📁 data/                  # (Será criado) Dados locais
│   ├── leads.db              # BD SQLite local
│   └── leads_backup.db
│
└── 📁 logs/                  # (Será criado) Logs de execução
    └── lead-ai.log
```

## 🔗 Relações Entre Arquivos

```
settings.json ← Valores variáveis (EDITE!)
     ↓
system_prompt.md ← Usa valores de settings.json
     ↓
qualification_rules.json ← Regras de scoring
     ↓
n8n_workflow ← Integra tudo
     ↓
Evolution API ← Envia respostas
     ↓
lead_samples.json ← Armazena resultado
```

## 💡 Dicas de Uso

### Para Configurar
- Sempre comece por `config/settings.json`
- Substitua valores de exemplo pelos seus dados
- Guarde API Keys em variáveis de ambiente (não no git!)

### Para Entender a Lógica
- `qualification_rules.json` define como calcular o score
- `system_prompt.md` define como a IA deve se comportar
- `examples/conversations.json` mostra casos reais

### Para Customizar
- Modificar prompt? → `prompts/system_prompt.md`
- Mudar regras de scoring? → `config/classification_rules.json`
- Adicionar tipos de móveis? → `config/furniture_catalog.json`

### Para Debugar
- Verificar conversas? → `examples/lead_samples.json`
- Ver histórico completo? → Banco de dados `data/leads.db`
- Rastrear erros? → `logs/lead-ai.log`

## 🚀 Próximas Etapas por Objetivo

### Quer começar já?
→ Vá para [QUICKSTART.md](./QUICKSTART.md)

### Quer customizar a IA?
→ Leia [docs/PROMPT_GUIDE.md](./docs/PROMPT_GUIDE.md)

### Quer integrar mais APIs?
→ Veja [docs/API_SETUP.md](./docs/API_SETUP.md)

### Quer otimizar scoring?
→ Estude [prompts/qualification_rules.md](./prompts/qualification_rules.md)

### Quer ver exemplos?
→ Abra [examples/conversations.json](./examples/conversations.json)

---

**Última atualização:** 27 de Maio de 2026
**Versão:** 1.0.0
**Status:** Pronto para uso local
