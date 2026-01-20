/**
 * GitHub API Integration
 * 
 * Fetches repository metadata from the GitHub API with graceful fallbacks.
 */

import siteConfig, { type ProjectConfig } from '../site.config';

/**
 * Decode base64 string (works in both Node.js and browser)
 */
function decodeBase64(str: string): string {
  // For Node.js environment
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64').toString('utf-8');
  }
  // For browser environment
  return decodeURIComponent(escape(atob(str)));
}

/**
 * Get environment variable (works in both Node.js and browser)
 */
function getEnvVar(name: string): string | undefined {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name];
  }
  return undefined;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  license: {
    key: string;
    name: string;
    spdx_id: string;
  } | null;
  updated_at: string;
  pushed_at: string;
  created_at: string;
  open_issues_count: number;
  default_branch: string;
  archived: boolean;
  disabled: boolean;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  prerelease: boolean;
  draft: boolean;
}

export interface GitHubReadme {
  content: string;
  encoding: string;
}

export interface RepoMetadata {
  // Basic info
  name: string;
  displayName: string;
  description: string;
  repoUrl: string;
  
  // Stats
  stars: number;
  forks: number;
  openIssues: number;
  
  // Metadata
  language: string | null;
  topics: string[];
  license: string | null;
  
  // Timestamps
  lastUpdated: string;
  createdAt: string;
  
  // Release info
  latestRelease: string | null;
  releaseUrl: string | null;
  releaseDate: string | null;
  
  // External links
  docsUrl: string | null;
  crateUrl: string | null;
  demoUrl: string | null;
  
  // Status (from config or heuristic)
  status: 'active' | 'experimental' | 'stable' | 'maintenance' | 'deprecated';
  
  // Config overrides
  features: string[];
  purpose: string | null;
  gettingStarted: string | null;
  tags: string[];
  
  // README content (if fetched)
  readme: string | null;
  
  // Flags
  hasDocs: boolean;
  hasReleases: boolean;
  isArchived: boolean;
}

// Cache for API responses during build
const repoCache = new Map<string, GitHubRepo>();
const releaseCache = new Map<string, GitHubRelease | null>();
const readmeCache = new Map<string, string | null>();

/**
 * Fetches repository data from GitHub API
 */
async function fetchRepo(repo: string): Promise<GitHubRepo | null> {
  if (repoCache.has(repo)) {
    return repoCache.get(repo) || null;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${siteConfig.org}/${repo}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Siderust-Website',
          // Add GitHub token if available for higher rate limits
          ...(getEnvVar('GITHUB_TOKEN') && {
            'Authorization': `token ${getEnvVar('GITHUB_TOKEN')}`,
          }),
        },
      }
    );

    if (!response.ok) {
      console.warn(`Failed to fetch repo ${repo}: ${response.status}`);
      return null;
    }

    const data: GitHubRepo = await response.json();
    repoCache.set(repo, data);
    return data;
  } catch (error) {
    console.warn(`Error fetching repo ${repo}:`, error);
    return null;
  }
}

/**
 * Fetches the latest release for a repository
 */
async function fetchLatestRelease(repo: string): Promise<GitHubRelease | null> {
  if (releaseCache.has(repo)) {
    return releaseCache.get(repo) || null;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${siteConfig.org}/${repo}/releases/latest`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Siderust-Website',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
      }
    );

    if (!response.ok) {
      releaseCache.set(repo, null);
      return null;
    }

    const data: GitHubRelease = await response.json();
    releaseCache.set(repo, data);
    return data;
  } catch (error) {
    console.warn(`Error fetching release for ${repo}:`, error);
    releaseCache.set(repo, null);
    return null;
  }
}

/**
 * Fetches README content for a repository
 */
async function fetchReadme(repo: string): Promise<string | null> {
  if (readmeCache.has(repo)) {
    return readmeCache.get(repo) || null;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${siteConfig.org}/${repo}/readme`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Siderust-Website',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
      }
    );

    if (!response.ok) {
      readmeCache.set(repo, null);
      return null;
    }

    const data: GitHubReadme = await response.json();
    const content = data.encoding === 'base64' 
      ? decodeBase64(data.content)
      : data.content;
    
    readmeCache.set(repo, content);
    return content;
  } catch (error) {
    console.warn(`Error fetching README for ${repo}:`, error);
    readmeCache.set(repo, null);
    return null;
  }
}

/**
 * Determines project status heuristically based on repo data
 */
function determineStatus(
  repo: GitHubRepo | null,
  release: GitHubRelease | null,
  configStatus?: ProjectConfig['status']
): RepoMetadata['status'] {
  // Config override takes precedence
  if (configStatus) {
    return configStatus;
  }

  if (!repo) {
    return 'experimental';
  }

  if (repo.archived) {
    return 'deprecated';
  }

  // Check last activity
  const lastPush = new Date(repo.pushed_at);
  const now = new Date();
  const daysSinceUpdate = (now.getTime() - lastPush.getTime()) / (1000 * 60 * 60 * 24);

  // If no releases, likely experimental
  if (!release) {
    return daysSinceUpdate > 365 ? 'maintenance' : 'experimental';
  }

  // Parse version to determine stability
  const version = release.tag_name.replace(/^v/, '');
  const major = parseInt(version.split('.')[0], 10);

  if (major >= 1) {
    return daysSinceUpdate > 180 ? 'maintenance' : 'stable';
  }

  return 'experimental';
}

/**
 * Checks if docs.rs documentation exists for a crate
 */
function getDocsRsUrl(repo: string, configUrl?: string): string | null {
  if (configUrl) return configUrl;
  // Assume Rust crates have docs.rs pages
  return `https://docs.rs/${repo}`;
}

/**
 * Gets crates.io URL for a crate
 */
function getCratesIoUrl(repo: string, configUrl?: string): string | null {
  if (configUrl) return configUrl;
  // Assume crate name matches repo name
  return `https://crates.io/crates/${repo}`;
}

/**
 * Fetches complete metadata for a repository
 */
export async function getRepoMetadata(
  repo: string,
  fetchReadmeContent = false
): Promise<RepoMetadata> {
  const projectConfig = siteConfig.projects.find(p => p.repo === repo);
  
  // Fetch GitHub data in parallel
  const [repoData, releaseData, readmeContent] = await Promise.all([
    fetchRepo(repo),
    fetchLatestRelease(repo),
    fetchReadmeContent ? fetchReadme(repo) : Promise.resolve(null),
  ]);

  const status = determineStatus(repoData, releaseData, projectConfig?.status);
  const isRustProject = repoData?.language === 'Rust' || projectConfig?.tags?.includes('rust');

  return {
    // Basic info
    name: repo,
    displayName: projectConfig?.name || repo,
    description: projectConfig?.description || repoData?.description || 'A Siderust project',
    repoUrl: repoData?.html_url || `${siteConfig.orgUrl}/${repo}`,

    // Stats
    stars: repoData?.stargazers_count ?? 0,
    forks: repoData?.forks_count ?? 0,
    openIssues: repoData?.open_issues_count ?? 0,

    // Metadata
    language: repoData?.language || 'Rust',
    topics: repoData?.topics || projectConfig?.tags || [],
    license: repoData?.license?.spdx_id || null,

    // Timestamps
    lastUpdated: repoData?.pushed_at || new Date().toISOString(),
    createdAt: repoData?.created_at || new Date().toISOString(),

    // Release info
    latestRelease: releaseData?.tag_name || null,
    releaseUrl: releaseData?.html_url || null,
    releaseDate: releaseData?.published_at || null,

    // External links (only for Rust projects)
    docsUrl: isRustProject ? getDocsRsUrl(repo, projectConfig?.docsUrl) : projectConfig?.docsUrl || null,
    crateUrl: isRustProject ? getCratesIoUrl(repo, projectConfig?.crateUrl) : projectConfig?.crateUrl || null,
    demoUrl: projectConfig?.demoUrl || null,

    // Status
    status,

    // Config data
    features: projectConfig?.features || [],
    purpose: projectConfig?.purpose || null,
    gettingStarted: projectConfig?.gettingStarted || null,
    tags: projectConfig?.tags || repoData?.topics || [],

    // README
    readme: readmeContent,

    // Flags
    hasDocs: isRustProject || !!projectConfig?.docsUrl,
    hasReleases: !!releaseData,
    isArchived: repoData?.archived ?? false,
  };
}

/**
 * Fetches metadata for all configured projects
 */
export async function getAllRepoMetadata(fetchReadme = false): Promise<RepoMetadata[]> {
  const repos = siteConfig.projects.map(p => p.repo);
  const metadata = await Promise.all(
    repos.map(repo => getRepoMetadata(repo, fetchReadme))
  );
  return metadata;
}

/**
 * Formats a date string for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Formats a relative time string (e.g., "2 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Gets status badge color based on project status
 */
export function getStatusColor(status: RepoMetadata['status']): string {
  const colors = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    experimental: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    stable: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    maintenance: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
    deprecated: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };
  return colors[status];
}

/**
 * Gets status label for display
 */
export function getStatusLabel(status: RepoMetadata['status']): string {
  const labels = {
    active: 'Active',
    experimental: 'Experimental',
    stable: 'Stable',
    maintenance: 'Maintenance',
    deprecated: 'Deprecated',
  };
  return labels[status];
}
