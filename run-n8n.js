#!/usr/bin/env node

/**
 * Script para rodar n8n localmente
 * Inicia o n8n em http://localhost:5678
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('\n🚀 Iniciando n8n...\n');

// Rodar n8n
const n8n = spawn('npx', ['n8n'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true
});

n8n.on('error', (error) => {
  console.error(`❌ Erro ao iniciar n8n: ${error.message}`);
  process.exit(1);
});

n8n.on('close', (code) => {
  console.log(`\n⚠️  n8n foi encerrado com código ${code}`);
  process.exit(code);
});

// Captura sinais para encerrar gracefully
process.on('SIGINT', () => {
  console.log('\n\n👋 Encerrando n8n...');
  n8n.kill();
  process.exit(0);
});
