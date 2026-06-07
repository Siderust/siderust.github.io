#!/usr/bin/env npx tsx
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const contract = readFileSync(join(root, 'PACKAGE_REPOSITORY_CONTRACT.md'), 'utf8');
const en = readFileSync(join(root, 'src/i18n/locales/en.json'), 'utf8');
const ca = readFileSync(join(root, 'src/i18n/locales/ca.json'), 'utf8');

const errors: string[] = [];

if (!/direct-download\s+artifact folders/.test(contract)) {
  errors.push('PACKAGE_REPOSITORY_CONTRACT.md must define apt/ and rpm/ as direct-download folders.');
}

if (!/"downloadDeb"\s*:\s*"Download \.deb"/.test(en)) {
  errors.push('English UI must describe .deb links as downloads.');
}

if (!/"downloadRpm"\s*:\s*"Download \.rpm"/.test(en)) {
  errors.push('English UI must describe .rpm links as downloads.');
}

if (!/"downloadDeb"\s*:\s*"Descarregar \.deb"/.test(ca)) {
  errors.push('Catalan UI must describe .deb links as downloads.');
}

if (!/"downloadRpm"\s*:\s*"Descarregar \.rpm"/.test(ca)) {
  errors.push('Catalan UI must describe .rpm links as downloads.');
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(error);
  }
  process.exit(1);
}

console.log('Package publishing contract is explicit and UI copy matches direct-download semantics.');
