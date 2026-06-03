/**
 * Formatting helpers for Lab metrics.
 *
 * Goals:
 * - Show numbers with appropriate precision per magnitude (huge ranges).
 * - Treat 0, null, NaN explicitly so the table never says "NaN".
 * - Detect rows that should be excluded from charts (skipped, failed, missing).
 */

import type { ScorecardRow } from './types';

export function fmtNumber(value: number | null | undefined, fallback = '—'): string {
  if (value == null || Number.isNaN(value)) return fallback;
  const abs = Math.abs(value);
  if (abs === 0) return '0';
  if (abs >= 1_000_000 || abs < 0.000_001) return value.toExponential(2);
  if (abs < 1) return Number(value.toFixed(6).replace(/\.?0+$/, '')).toString();
  if (abs < 1000) return Number(value.toFixed(3).replace(/\.?0+$/, '')).toString();
  return Math.round(value).toLocaleString('en-US');
}

export function fmtNs(value: number | null | undefined, fallback = '—'): string {
  if (value == null || Number.isNaN(value)) return fallback;
  const abs = Math.abs(value);
  if (abs === 0) return '0';
  if (abs < 100) return value.toFixed(1);
  if (abs < 1000) return value.toFixed(0);
  return Math.round(value).toLocaleString('en-US');
}

export function fmtPct(value: number | null | undefined, fallback = '—'): string {
  if (value == null || Number.isNaN(value)) return fallback;
  if (Math.abs(value) < 1) return `${value.toFixed(2)}%`;
  if (Math.abs(value) < 100) return `${value.toFixed(1)}%`;
  return `${Math.round(value).toLocaleString('en-US')}%`;
}

export function fmtDate(iso: string | null | undefined, locale = 'en-US'): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString(locale, {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
    });
  } catch { return iso; }
}

export function isAccuracyChartable(row: ScorecardRow): boolean {
  return (
    row.status === 'ok' &&
    row.rankable_accuracy === true &&
    typeof row.p99 === 'number' &&
    Number.isFinite(row.p99) &&
    row.p99 >= 0
  );
}

export function isPerfChartable(row: ScorecardRow): boolean {
  return (
    row.status === 'ok' &&
    row.perf_valid === true &&
    typeof row.ns_per_op === 'number' &&
    Number.isFinite(row.ns_per_op) &&
    row.ns_per_op > 0
  );
}

export function rowExclusionReason(row: ScorecardRow): string | null {
  if (row.status === 'skipped') return row.skip_reason || 'Skipped';
  if (row.status === 'failed') return row.failure_reason || 'Failed';
  if (!row.rankable_accuracy) return row.rank_exclusion_reason;
  return null;
}

export const LIB_COLORS: Record<string, string> = {
  siderust: '#e8590c',
  erfa: '#6b7280',
  anise: '#0f766e',
  astropy: '#3b82f6',
  libnova: '#8b5cf6',
};

export function colorFor(library: string): string {
  return LIB_COLORS[library] ?? '#9ca3af';
}
