#!/usr/bin/env npx tsx
/**
 * i18n Validation Script
 *
 * Compares translation JSON files to find missing, extra, or type-mismatched keys.
 * Usage: npx tsx scripts/validate-i18n.ts
 */

import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const LOCALES_DIR = join(import.meta.dirname ?? __dirname, '..', 'src', 'i18n', 'locales');

// ── helpers ──────────────────────────────────────────────────────────

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function flattenKeys(obj: Record<string, JsonValue>, prefix = ''): Map<string, string> {
  const map = new Map<string, string>();
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      for (const [k, v] of flattenKeys(value as Record<string, JsonValue>, fullKey)) {
        map.set(k, v);
      }
    } else {
      map.set(fullKey, Array.isArray(value) ? 'array' : typeof value);
    }
  }
  return map;
}

// ── load locale files ────────────────────────────────────────────────

const files = readdirSync(LOCALES_DIR).filter((f) => f.endsWith('.json')).sort();

if (files.length < 2) {
  console.log('⚠  Found fewer than 2 locale files – nothing to compare.');
  process.exit(0);
}

const locales = new Map<string, Map<string, string>>();
for (const file of files) {
  const raw = readFileSync(join(LOCALES_DIR, file), 'utf-8');
  const json = JSON.parse(raw);
  const name = basename(file, '.json');
  locales.set(name, flattenKeys(json));
}

// Use the first locale as the reference
const [refName, refKeys] = [...locales.entries()][0];
let errors = 0;

console.log(`\n🌐  i18n Validation, reference locale: ${refName} (${refKeys.size} keys)\n`);

for (const [name, keys] of locales) {
  if (name === refName) continue;

  const missing: string[] = [];
  const extra: string[] = [];
  const typeMismatch: string[] = [];

  for (const [key, type] of refKeys) {
    if (!keys.has(key)) {
      missing.push(key);
    } else if (keys.get(key) !== type) {
      typeMismatch.push(`${key} (${refName}=${type}, ${name}=${keys.get(key)})`);
    }
  }

  for (const key of keys.keys()) {
    if (!refKeys.has(key)) {
      extra.push(key);
    }
  }

  if (missing.length === 0 && extra.length === 0 && typeMismatch.length === 0) {
    console.log(`✅  ${name}: ${keys.size} keys, all match ${refName}`);
  } else {
    if (missing.length) {
      errors += missing.length;
      console.log(`❌  ${name}: ${missing.length} missing key(s):`);
      missing.forEach((k) => console.log(`      - ${k}`));
    }
    if (extra.length) {
      errors += extra.length;
      console.log(`⚠   ${name}: ${extra.length} extra key(s):`);
      extra.forEach((k) => console.log(`      + ${k}`));
    }
    if (typeMismatch.length) {
      errors += typeMismatch.length;
      console.log(`⚠   ${name}: ${typeMismatch.length} type mismatch(es):`);
      typeMismatch.forEach((m) => console.log(`      ~ ${m}`));
    }
  }
}

console.log('');
if (errors > 0) {
  console.log(`Found ${errors} issue(s). Please fix the translation files.\n`);
  process.exit(1);
} else {
  console.log('All locale files are in sync. ✔\n');
}
