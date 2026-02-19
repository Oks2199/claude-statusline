#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

const homeDir = os.homedir();
const claudeDir = path.join(homeDir, '.claude');
const settingsPath = path.join(claudeDir, 'settings.json');
const destPath = path.join(claudeDir, 'statusline.js');
const srcPath = path.join(__dirname, 'statusline.js');

// Colors
const G = '\x1b[32m', C = '\x1b[36m', Y = '\x1b[33m', R = '\x1b[0m';

console.log(`\n${C}Claude Statusline Installer${R}\n`);

// Ensure ~/.claude exists
if (!fs.existsSync(claudeDir)) {
  fs.mkdirSync(claudeDir, { recursive: true });
  console.log(`${G}Created${R} ${claudeDir}`);
}

// Copy statusline.js
fs.copyFileSync(srcPath, destPath);
console.log(`${G}Copied${R} statusline.js -> ${destPath}`);

// Update settings.json
let settings = {};
if (fs.existsSync(settingsPath)) {
  settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
}

// Use forward slashes for cross-platform compatibility
const scriptPath = destPath.replace(/\\/g, '/');

settings.statusLine = {
  type: 'command',
  command: `node ${scriptPath}`,
  padding: 0
};

fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n');
console.log(`${G}Updated${R} ${settingsPath}`);

console.log(`\n${G}Done!${R} Restart Claude Code to see your statusline.`);
console.log(`\n${Y}Features:${R}`);
console.log(`  - Model name, git repo:branch, commit info`);
console.log(`  - Context bricks visualization (30 blocks)`);
console.log(`  - Token usage percentage, free tokens`);
console.log(`  - Session duration and cost`);
console.log(`  - Lines added/removed\n`);
