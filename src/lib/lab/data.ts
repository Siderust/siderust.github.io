/**
 * Server-side loaders for the Lab "latest" export bundle.
 *
 * Reads JSON files directly from `benches/latest_results/` at build time.
 * If any artifact is missing or malformed we return `null` from `loadLabBundle()`
 * so the page can render a controlled fallback instead of crashing the build.
 */

import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import type {
  ExperimentDetail,
  LabBundle,
  ManifestCompleteness,
  ManifestConfig,
  ManifestMetadata,
  Manifest,
  Scorecard,
} from './types';

const LATEST_DIR = path.join(process.cwd(), 'benches', 'latest_results');

type RawManifest = Partial<Manifest> & {
  git_sha?: string;
  timestamp?: string | null;
  machine?: string | null;
  metadata?: Partial<ManifestMetadata>;
  config?: Partial<ManifestConfig>;
  completeness?: Partial<ManifestCompleteness>;
};

function normalizeManifest(scorecard: Scorecard, rawManifest: RawManifest): Manifest {
  const manifestConfig: Partial<ManifestConfig> = rawManifest.config ?? {};
  const experiments = manifestConfig.experiments ?? scorecard.families.flatMap(family =>
    family.experiments.map(experiment => experiment.experiment)
  );
  const requested = rawManifest.completeness?.requested ?? experiments.length;
  const completed = rawManifest.completeness?.completed ?? scorecard.families.reduce(
    (count, family) => count + family.experiments.length,
    0,
  );
  const timestamp = scorecard.timestamp ?? rawManifest.timestamp ?? new Date().toISOString();
  const gitShas = rawManifest.metadata?.git_shas
    ?? scorecard.git_shas
    ?? (rawManifest.git_sha ? { lab: rawManifest.git_sha } : {});

  return {
    run_id: rawManifest.run_id ?? scorecard.run_id ?? 'latest',
    config: {
      experiments,
      n: manifestConfig.n ?? 0,
      seed: manifestConfig.seed ?? 0,
      perf_enabled: manifestConfig.perf_enabled ?? false,
      perf_rounds: manifestConfig.perf_rounds ?? 0,
      ci_mode: manifestConfig.ci_mode ?? false,
      adapters: manifestConfig.adapters ?? [],
      siderust_profiles: manifestConfig.siderust_profiles ?? [],
      horizons_use_cache: manifestConfig.horizons_use_cache ?? true,
      horizons_allow_network: manifestConfig.horizons_allow_network ?? false,
    },
    metadata: {
      date: rawManifest.metadata?.date ?? timestamp,
      git_shas: gitShas,
      git_branch: rawManifest.metadata?.git_branch ?? 'unknown',
      cpu: rawManifest.metadata?.cpu ?? rawManifest.machine ?? scorecard.machine ?? 'unknown',
      cpu_count: rawManifest.metadata?.cpu_count ?? 0,
      os: rawManifest.metadata?.os ?? 'unknown',
      platform_detail: rawManifest.metadata?.platform_detail ?? 'unknown',
      toolchain: rawManifest.metadata?.toolchain ?? { python: 'unknown' },
      cpu_model: rawManifest.metadata?.cpu_model ?? rawManifest.machine ?? scorecard.machine ?? 'unknown',
      adapter_binaries: rawManifest.metadata?.adapter_binaries,
    },
    completeness: {
      requested,
      completed,
      missing: rawManifest.completeness?.missing ?? [],
      completed_experiments: rawManifest.completeness?.completed_experiments
        ?? scorecard.families.flatMap(family => family.experiments.map(experiment => experiment.experiment)),
      libraries: rawManifest.completeness?.libraries ?? scorecard.references,
      per_experiment: rawManifest.completeness?.per_experiment,
    },
    experiment_count: rawManifest.experiment_count ?? scorecard.families.reduce(
      (count, family) => count + family.experiments.length,
      0,
    ),
    total_results: rawManifest.total_results ?? scorecard.families.reduce(
      (count, family) => count + family.experiments.reduce((experimentCount, experiment) => experimentCount + experiment.rows.length, 0),
      0,
    ),
  };
}

function readJson<T>(filePath: string): T | null {
  try {
    if (!existsSync(filePath)) return null;
    return JSON.parse(readFileSync(filePath, 'utf8')) as T;
  } catch (err) {
    console.warn(`[lab] failed to read ${filePath}:`, (err as Error).message);
    return null;
  }
}

export function loadLabBundle(): LabBundle | null {
  const scorecard = readJson<Scorecard>(path.join(LATEST_DIR, 'scorecard.json'));
  const manifest = readJson<RawManifest>(path.join(LATEST_DIR, 'manifest.json'));
  if (!scorecard || !manifest) return null;

  const experiments: Record<string, ExperimentDetail | null> = {};
  for (const family of scorecard.families) {
    for (const exp of family.experiments) {
      const file = path.join(LATEST_DIR, 'experiments', `${exp.experiment}.json`);
      experiments[exp.experiment] = readJson<ExperimentDetail>(file);
    }
  }

  return { scorecard, manifest: normalizeManifest(scorecard, manifest), experiments };
}
