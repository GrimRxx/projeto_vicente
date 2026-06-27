# Prompt Engineering Guide

Guia prático para otimizar o prompt da IA e melhorar a qualificação de leads.

## 🎯 Estrutura do Prompt Ideal

Um bom prompt possui 5 elementos:

```
1. CONTEXTO     → Quem você é (persona)
2. OBJETIVO     → O que fazer (missão)
3. DADOS        → Informações importantes (variáveis)
4. RESTRIÇÕES   → Limites e regras (do's and don'ts)
5. FORMATO      → Como responder (estrutura esperada)
```

## 📋 Versões do Prompt

### Versão 1 - Básico (Inicio)

```markdown
Você é um consultor de vendas de móveis. 
Quando um cliente contactar, cumprimente, faça perguntas sobre suas necessidades, 
e sempre tente agendar uma visita.
```

**Problemas**:
- Muito genérico
- Sem contexto da marca
- Sem qualificação clara

### Versão 2 - Intermediária (Recomendada para Começar)

Usada em `prompts/system_prompt.md` - já tem mais estrutura e cobertura.

### Versão 3 - Avançada (Otimizada)

```markdown
# Prompt Avançado para IA de Qualificação de Leads

## Contexto
Você é {{consultor_nome}}, consultora de vendas da empresa {{empresa_name}},
especializada em móveis de alto padrão.

Você trabalha em um WhatsApp, então:
- Seja cordial mas conciso (máx 3 frases por mensagem)
- Use emojis para engajar
- Respeite o tom coloquial do WhatsApp

## Sua Missão em 3 Etapas

### 1️⃣ RECEBER (1-2 mensagens)
- Cumprimento caloroso
- Validar que entendeu o interesse inicial
- Introduzir seu diferencial

### 2️⃣ QUALIFICAR (3-4 mensagens)
Obter informações em PRIORIDADE:
- **CRÍTICA**: Timeline (quando precisa?) + Orçamento
- **IMPORTANTE**: Tipo de projeto + Localização
- **DESEJÁVEL**: Estilo preferido + Decisor

### 3️⃣ CONVERTER (1-2 mensagens)
- Resumir o encontrado
- Oferecer próximo passo (visita, chamada, catalogo)
- Deixar contato para dúvidas

## Regras Rígidas

✅ SEMPRE:
- Pergunte timeline e orçamento (separadamente)
- Valide entendimento ("Então você quer...")
- Feche com ação clara ("Posso agendar?")
- Seja respeitoso com indecisão

❌ NUNCA:
- Pressione para compra
- Fale de preço sem entender projeto
- Peça múltiplas informações ao mesmo tempo
- Ignore objeções

## Informações da Empresa
- Showroom: {{showroom_endereco}}
- Telefone: {{telefone}}
- Atendimento: Seg-Sex 9h-18h, Sab 10h-14h
- Diferencial: Design exclusivo, customização, consultoria

## Exemplo de Conversa Ideal

**Lead**: "Tem sofá?"
**Você**: "Oi! 👋 Claro! Temos sofás modernos de excelente qualidade. Qual é seu nome?"

**Lead**: "Sou João"
**Você**: "Prazer, João! 😊 Quando você está pensando em comprar?"

**Lead**: "Daqui a 2 semanas"
**Você**: "Ótimo! Tempo certo para escolher bem. Qual é seu orçamento?"

**Lead**: "Uns 8 mil"
**Você**: "Perfeito! Com 8k temos excelentes opções. Como você vê a possibilidade de vir ao showroom?ócio"

Após 4 mensagens: Lead é QUENTE → Notificar Consultor
```

## 🧪 Testando Versões de Prompt

### Teste A/B

1. **Versão A (Controle)**: Prompt atual
2. **Versão B (Teste)**: Prompt com mudanças

```
Métrica: Taxa de conversão (Quentes / Total de conversas)

Semana 1: Use Versão A - Registre quantos leads ficaram QUENTES
Semana 2: Use Versão B - Registre quantos leads ficaram QUENTES

Vencedor: Aquele com melhor taxa
```

### Exemplo de Teste

**Mudança**: Adicionar "Vou ser rápido" para respeitar tempo do lead

```markdown
Teste: "Entendo, João! Vou ser rápido. Qual é seu orçamento?"
          vs
Controle: "Qual é seu orçamento?"
```

**Resultado esperado**: Versão com empatia gera mais abertura

## 🔧 Otimizações Comuns

### Problema: Conversas muito longas

**Solução**:
```markdown
# Adicionar isso ao prompt:

Máximo de mensagens: 6
Se não conseguir qualificar em 6 mensagens:
  → Ofereça agendar primeira consulta
  → Passe para consultor humano
```

### Problema: IA não pede informações críticas

**Solução**:
```markdown
# Adicionar ordem explícita:

PRIMEIRA PERGUNTA: "Quando você pretende comprar?"
SEGUNDA PERGUNTA: "Qual é seu orçamento?"
NUNCA pule essas duas.
```

### Problema: IA é muito agressiva em vender

**Solução**:
```markdown
# Reframing:

ANTES: "Você tem que vir ao showroom!"
DEPOIS: "Você toparia conhecer nossas opções?"

Trocar imperativos por convites educados.
```

### Problema: IA esquece contexto (conversas longas)

**Solução**:
```markdown
# No n8n, manter histórico:

Sistema: [contexto]
Histórico anterior:
  - Lead: "Oi"
  - IA: "Olá!"
  - Lead: "Quero sofá"
  - IA: "Que tipo?"
  
Próxima mensagem do lead: [...]

Isso vai em cada request da Claude API
```

## 📊 Métricas para Monitorar

```
KPI | Fórmula | Target | Frequência
----|---------|--------|----------
Taxa de Qualificação | (Quentes + Mornos) / Total | >40% | Diária
Engajamento | Mensagens por lead | 4-6 | Diária
Conversão Quente | Quentes que visitam | >60% | Semanal
Satisfação | Rating (1-5) | >4 | Semanal
Tempo Médio | Min por conversa | 3-5 min | Diária
```

## 🚀 Evoluição Incrementa

### Mês 1 - Baseline
- Use Versão 2 (Intermediária)
- Observe padrões naturais das conversas
- Registre o que funciona / o que não

### Mês 2 - Otimização
- Incorpore learnings do Mês 1
- Teste Versão 3 (Avançada) se pronto
- Ajuste pesos de qualificação

### Mês 3+
- Versão personalizada baseada em dados
- Testes A/B contínuos
- Integração com CRM

## 🧠 Prompt Avançado - Técnicas

### Technicat 1: Few-Shot Learning

Adicionar exemplos no prompt:

```markdown
EXEMPLOS DE LEADS QUALIFICADOS:

[Exemplo 1]
Cliente: "Preciso de sofá em 2 semanas, tenho 8k"
Classificação: QUENTE
Razão: Urgência + Orçamento claro

[Exemplo 2]
Cliente: "Estou explorando opções"
Classificação: MUITO FRIO
Razão: Sem urgência, sem projeto
```

### Technique 2: Chain-of-Thought

Pedir que a IA ''pense'' antes de responder:

```markdown
Antes de responder ao cliente:
1. Identifique qual estado da conversa estamos (Receber/Qualificar/Converter)
2. Que informação crítica falta coletada?
3. Qual pergunta vai mais ajudar?
4. Então responda amigavelmente
```

### Technique 3: JSON Structured Output

Requisitar resposta estruturada:

```markdown
Responda SEMPRE nesse formato JSON:

{
  "response": "Sua resposta ao lead aqui",
  "intent": "greeting|question|objection|ready_to_buy",
  "info_collected": {
    "budget": null,
    "timeline": null,
    "furniture_type": null
  },
  "next_stage": "still_qualifying",
  "confidence": 0.95
}
```

## 📝 Versionamento

Mantenha histórico de prompts:

```
prompts/
├── system_prompt.md (atual)
├── archives/
│   ├── v1_basico.md (data)
│   ├── v2_intermediaria.md (data)
│   └── v3_avancada.md (data)
└── experiments/
    ├── exp_shorter_responses.md
    └── exp_with_examples.md
```

Para cada versão, documente:
- Data
- Mudanças principais
- Resultado (Taxa de qualificação)
- Insights

## 🎓 Aprendizado Contínuo

1. **Revise conversas toda semana**
   - Vá no histórico
   - Identifique leads "surpresa" (esperava Frio, era Quente)
   - Entenda o padrão

2. **Feedback do Consultor**
   - Ele vê os leads qualificados
   - Pergunte: "Essa classificação estava correta?"
   - Ajuste pesos de score

3. **A/B Testing Estruturado**
   - Teste 1 mudança por vez
   - Mínimo 20-30 conversas por versão
   - Compare metrics objetivas

## 📞 Template Final Recomendado

Use este como base e adapte:

```markdown
[Veja: prompts/system_prompt.md - já está otimizado]
```

---

**Próximos Passos:**
1. Usar prompt da versão intermediária (já criado)
2. Coletar 30 conversas como baseline
3. Após 1 semana, revisar e otimizar
4. Comunicar resultados ao consultor
