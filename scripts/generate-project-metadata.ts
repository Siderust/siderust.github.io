#!/usr/bin/env npx tsx
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outputPath = join(root, 'generated', 'projects.generated.json');
const checkOnly = process.argv.includes('--check');
const crateNames = ['affn', 'cheby', 'qtty', 'siderust', 'tempoch'].sort();
const userAgent = 'siderust-website metadata generator (https://siderust.org)';

interface CrateMetadata {
  version: string;
  source: 'crates.io';
  url: string;
}

interface GeneratedProjects {
  generatedAt: string;
  sources: {
    crates: string;
  };
  crates: Record<string, CrateMetadata>;
}

async function fetchCrateVersion(crateName: string): Promise<CrateMetadata> {
  const response = await fetch(`https://crates.io/api/v1/crates/${crateName}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': userAgent,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${crateName} from crates.io: HTTP ${response.status}`);
  }

  const body = await response.json() as {
    crate?: {
      max_stable_version?: string | null;
      max_version?: string | null;
    };
  };
  const version = body.crate?.max_stable_version || body.crate?.max_version;
  if (!version) {
    throw new Error(`crates.io response for ${crateName} did not include a version`);
  }

  return {
    version,
    source: 'crates.io',
    url: `https://crates.io/crates/${crateName}`,
  };
}

function stableJson(value: GeneratedProjects): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

async function main() {
  const entries = await Promise.all(
    crateNames.map(async (crateName) => [crateName, await fetchCrateVersion(crateName)] as const),
  );

  const generated: GeneratedProjects = {
    generatedAt: new Date().toISOString(),
    sources: {
      crates: 'https://crates.io/api/v1/crates/{crate}',
    },
    crates: Object.fromEntries(entries),
  };

  const next = stableJson(generated);

  if (checkOnly) {
    const current = JSON.parse(readFileSync(outputPath, 'utf8')) as GeneratedProjects;
    const normalizedCurrent = stableJson({
      ...current,
      generatedAt: generated.generatedAt,
    });

    if (normalizedCurrent !== next) {
      console.error('generated/projects.generated.json is stale. Run npm run generate:projects.');
      process.exit(1);
    }
    console.log('generated/projects.generated.json matches current package registry metadata.');
    return;
  }

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, next);
  console.log(`Wrote ${outputPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
