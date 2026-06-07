#!/usr/bin/env npx tsx
/**
 * i18n Validation Script
 *
 * Compares translation JSON files to find missing, extra, or type-mismatched keys.
 * Usage: npx tsx scripts/validate-i18n.ts
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const LOCALES_DIR = join(REPO_ROOT, 'src', 'i18n', 'locales');
const SOURCE_DIR = join(REPO_ROOT, 'src');

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

function listSourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      return listSourceFiles(fullPath);
    }
    return /\.(astro|ts|tsx|js|jsx)$/.test(entry.name) ? [fullPath] : [];
  });
}

function scanTranslationUsages(): Map<string, Set<string>> {
  const usages = new Map<string, Set<string>>();
  const usagePattern = /\bt\(\s*[^,\n]+,\s*(['"])([^'"]+)\1/g;

  for (const file of listSourceFiles(SOURCE_DIR)) {
    const source = readFileSync(file, 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/(^|[^:])\/\/.*$/gm, '$1');
    for (const match of source.matchAll(usagePattern)) {
      const key = match[2];
      if (!usages.has(key)) {
        usages.set(key, new Set());
      }
      usages.get(key)!.add(file.replace(`${REPO_ROOT}/`, ''));
    }
  }

  return usages;
}

const usages = scanTranslationUsages();
const missingUsages: Array<{ key: string; files: string[]; locales: string[] }> = [];
for (const [key, filesForKey] of usages) {
  const missingLocales = [...locales.entries()]
    .filter(([, keys]) => !keys.has(key))
    .map(([name]) => name);

  if (missingLocales.length > 0) {
    missingUsages.push({
      key,
      files: [...filesForKey].sort(),
      locales: missingLocales,
    });
  }
}

if (missingUsages.length > 0) {
  errors += missingUsages.length;
  console.log(`❌  ${missingUsages.length} t(locale, "...") usage(s) are missing from locale files:`);
  for (const usage of missingUsages) {
    console.log(`      - ${usage.key} missing in ${usage.locales.join(', ')} (${usage.files.join(', ')})`);
  }
}

console.log('');
if (errors > 0) {
  console.log(`Found ${errors} issue(s). Please fix the translation files.\n`);
  process.exit(1);
} else {
  console.log('All locale files are in sync. ✔\n');
}
