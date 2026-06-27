# Regras de Qualificação de Leads

Sistema de pontuação para automatizar a classificação de leads como QUENTE ou FRIO.

## 📊 Sistema de Pontuação

Cada resposta do lead gera pontos. Ao final da conversa, o total determina a classificação.

### 1️⃣ Urgência / Timeline (máx 40 pontos)

| Critério | Pontos | Exemplos |
|----------|--------|----------|
| Urgência imediata (0-15 dias) | +40 | "Preciso urgente", "já está em reforma", "semana que vem" |
| Curto prazo (16-30 dias) | +30 | "Mês que vem", "em breve", "próximas semanas" |
| Médio prazo (31-90 dias) | +15 | "Próximos 3 meses", "Antes do inverno" |
| Longo prazo (91+ dias) | +5 | "No final do ano", "não tenho data certa", "daqui uns meses" |
| Indefinido/Pesquisando | +0 | "Ainda não sei", "estou vendo opções" |

### 2️⃣ Orçamento (máx 35 pontos)

| Critério | Pontos | Exemplos |
|----------|--------|----------|
| Orçamento definido e adequado | +35 | "Tenho 50k para gastar", "meu limite é..." |
| Orçamento aproximado | +25 | "Algo em torno de 30-40k", "uns 25k" |
| Tem orçamento mas não definiu | +15 | "Tenho grana", "temos recursos" |
| Sem orçamento | +5 | "Depende da qualidade", "vou ver depois" |
| Orçamento muito baixo | +0 | "Quanto sai mais barato?", valores não realistas |

### 3️⃣ Tipo de Projeto (máx 15 pontos)

| Critério | Pontos | Exemplos |
|----------|--------|----------|
| Projeto específico em andamento | +15 | "Estou reformando", "Construindo a casa nova" |
| Precisa do produto pra algo específico | +10 | "Pro home office", "Meu quarto novo" |
| É um desejo/necessidade geral | +5 | "Quero renovar", "já está velho" |

### 4️⃣ Comportamento (máx 15 pontos)

| Critério | Pontos | Exemplos |
|----------|--------|----------|
| Pediu orçamento ou agendamento | +15 | "Quanto custa?", "Posso agendar?", "Quer passar meu contato?" |
| Faz perguntas específicas | +10 | Pergunta sobre materiais, medidas, cores |
| Responde superficialmente | +5 | Respostas curtas, pouca informação |
| Não engaja | +0 | Mensagens vagas, desinteresse aparente |

### 5️⃣ Experiência Anterior (máx 5 pontos)

| Critério | Pontos | Exemplos |
|----------|--------|----------|
| Visitou showroom/conhece marcas | +5 | "Já vi na loja", "Sou cliente antigo" |
| Manda indicação de alguém | +3 | "Meu amigo recomendou" |
| Primeira vez vendo | +0 | "Não conheço a marca" |

---

## 🎯 Classificação Final

| Pontuação Total | Classificação | Ação |
|-----------------|---------------|------|
| **90-120** | 🔥 QUENTE | ⚡ NOTIFICAR IMEDIATAMENTE |
| **60-89** | 🟠 MORNO | 📧 Enviar follow-up em 24h |
| **30-59** | 🟡 FRIO | 📅 Agendar follow-up para 72h-1sem |
| **0-29** | ❄️ MUITO FRIO | 📋 Adicionar à lista de nurturing |

---

## 💾 Exemplo de Cálculo

### Lead 1: Maria Silva
- Timeline: "Preciso em 2 semanas" → +30
- Orçamento: "Tenho 45k" → +35
- Projeto: "Estou construindo" → +15
- Comportamento: "Quer agendar consulta" → +15
- Experiência: Primeira vez → +0
- **TOTAL: 95 → 🔥 QUENTE**

### Lead 2: Paulo Santos
- Timeline: "Estou vendo opções" → +0
- Orçamento: "Depende da qualidade" → +5
- Projeto: "Só explorando" → +0
- Comportamento: Respostas vagas → +5
- Experiência: Não conhece → +0
- **TOTAL: 10 → ❄️ MUITO FRIO**

---

## 🔄 Ajustes Dinâmicos

Alguns fatores podem modificar a pontuação:

### Bônus:
- **+10 pontos**: Lead menciona referência interna (indicação)
- **+10 pontos**: Executivo / tomador de decisão confirmado
- **+5 pontos**: Voltar rápido buscar informações

### Penalidades:
- **-10 pontos**: Comunicação superficial ou desinteresse óbvio
- **-5 pontos**: Timeline muito distante (6+ meses) mesmo com outros sinais

---

## 📱 Integração com n8n

Este arquivo será lido pelo workflow do n8n após a conversa com Claude.

```javascript
// Pseudocódigo do calculo no n8n
const calculateScore = (responses) => {
  let score = 0;
  score += calculateUrgency(responses.timeline);
  score += calculateBudget(responses.budget);
  score += calculateProject(responses.project);
  score += calculateBehavior(responses.behavior);
  score += calculateExperience(responses.experience);
  
  return {
    totalScore: score,
    classification: classifyLead(score),
    shouldNotify: score >= 90
  };
};
```

---

## Próximos Passos

1. Treinar modelo com exemplos de conversas
2. Validar regras com casos reais
3. Ajustar pesos conforme feedback
4. Implementar no n8n
