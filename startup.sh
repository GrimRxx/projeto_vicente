#!/bin/bash

# Script para iniciar todo o sistema lead-ai
# Uso: bash startup.sh

set -e

echo ""
echo "╔═══════════════════════════════════════╗"
echo "║  LEAD AI - Sistema de Qualificação   ║"
echo "║       Startup Script v1.0             ║"
echo "╚═══════════════════════════════════════╝"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificações pré-voo
echo "📋 Verificando pré-requisitos..."

# Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado${NC}"
    echo "   Instale em: https://nodejs.org"
    exit 1
fi
echo -e "${GREEN}✅ Node.js v$(node --version)${NC}"

# npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm não encontrado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm v$(npm --version)${NC}"

# Variáveis de ambiente
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}⚠️  Arquivo .env.local não encontrado${NC}"
    echo "   Criando a partir do template..."
    cp ENV_TEMPLATE .env.local
    echo -e "${YELLOW}   ⚠️  EDITE .env.local com seus dados antes de continuar!${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Arquivo .env.local encontrado${NC}"
fi

# Dependências
echo ""
echo "📦 Verificando dependências..."
if [ ! -d "node_modules" ]; then
    echo "   Instalando npm packages (primeira vez)..."
    npm install --silent
fi
echo -e "${GREEN}✅ Dependências OK${NC}"

echo ""
echo "🎮 Sistema pronto para iniciar!"
echo ""
echo "Instruções:"
echo "───────────────────────────────────────"
echo ""
echo "Terminal 1 - SIMULADOR EVOLUTION:"
echo "  $ node simulador.js"
echo ""
echo "Terminal 2 - n8n:"
echo "  $ npm run n8n"
echo ""
echo "Terminal 3 - TESTES (após ambos acima rodarem):"
echo "  $ npm run test:quente"
echo ""
echo "───────────────────────────────────────"
echo ""
echo "Endereços:"
echo "  • Simulador Evolution: http://localhost:8080/api/health"
echo "  • n8n: http://localhost:5678"
echo ""
echo -e "${GREEN}Tudo pronto! Abra 3 terminais e execute os comandos acima.${NC}"
echo ""
