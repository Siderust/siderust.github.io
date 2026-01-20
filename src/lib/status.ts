import type { ProjectStatus } from './config';

type StatusInput = {
  override?: ProjectStatus;
  latestRelease?: { tag: string } | null;
  updatedAt?: string | null;
};

export const deriveStatus = ({ override, latestRelease, updatedAt }: StatusInput): ProjectStatus => {
  if (override) return override;

  const updated = updatedAt ? new Date(updatedAt).getTime() : 0;
  const daysSinceUpdate = updated ? (Date.now() - updated) / (1000 * 60 * 60 * 24) : Infinity;

  if (latestRelease) {
    return daysSinceUpdate <= 180 ? 'active' : 'stable';
  }

  return daysSinceUpdate <= 90 ? 'experimental' : 'experimental';
};

export const statusStyles: Record<ProjectStatus, { label: string; tone: string }> = {
  active: { label: 'Active', tone: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300' },
  stable: { label: 'Stable', tone: 'bg-blue-500/10 text-blue-600 dark:text-blue-300' },
  experimental: { label: 'Experimental', tone: 'bg-amber-500/10 text-amber-600 dark:text-amber-300' },
};
