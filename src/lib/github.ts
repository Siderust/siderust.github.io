import { config, orgHandle, projectOverridesMap } from './config';
import { deriveStatus } from './status';
import type { ProjectStatus } from './config';

const GITHUB_API = 'https://api.github.com';
const DEFAULT_HEADERS = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'siderust-org-site',
};

type ReleaseInfo = {
  tag: string;
  url: string;
  publishedAt: string;
};

export type ProjectData = {
  repo: string;
  slug: string;
  displayName: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  latestRelease: ReleaseInfo | null;
  docsUrl?: string;
  crateUrl?: string;
  status: ProjectStatus;
  why: string;
  features: string[];
  gettingStarted: string;
  contributing: string;
  license: string;
};

const safeFetchJson = async <T>(url: string): Promise<T | null> => {
  try {
    const response = await fetch(url, { headers: DEFAULT_HEADERS });
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as T;
  } catch (error) {
    return null;
  }
};

const decodeBase64 = (value?: string) => {
  if (!value) return '';
  return Buffer.from(value, 'base64').toString('utf-8');
};

const truncateLines = (text: string, maxLines = 10, maxChars = 700) => {
  const lines = text.split('\n').filter(Boolean);
  const clipped = lines.slice(0, maxLines).join('\n').trim();
  return clipped.length > maxChars ? `${clipped.slice(0, maxChars - 1).trim()}...` : clipped;
};

const extractSection = (markdown: string, headings: string[]) => {
  if (!markdown) return '';
  const lines = markdown.split('\n');
  const target = headings.map((heading) => heading.toLowerCase());

  let startIndex = -1;
  let startLevel = 0;

  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(/^(#{1,3})\s+(.+)/);
    if (!match) continue;
    const [, hashes, title] = match;
    if (target.includes(title.trim().toLowerCase())) {
      startIndex = i + 1;
      startLevel = hashes.length;
      break;
    }
  }

  if (startIndex === -1) return '';

  const sectionLines: string[] = [];
  for (let i = startIndex; i < lines.length; i += 1) {
    const headingMatch = lines[i].match(/^(#{1,3})\s+(.+)/);
    if (headingMatch && headingMatch[1].length <= startLevel) {
      break;
    }
    sectionLines.push(lines[i]);
  }

  return truncateLines(sectionLines.join('\n').trim());
};

const fetchRelease = async (repo: string): Promise<ReleaseInfo | null> => {
  const release = await safeFetchJson<{
    tag_name: string;
    html_url: string;
    published_at: string;
  }>(`${GITHUB_API}/repos/${orgHandle}/${repo}/releases/latest`);

  if (!release) return null;
  return {
    tag: release.tag_name,
    url: release.html_url,
    publishedAt: release.published_at,
  };
};

const fetchReadme = async (repo: string) => {
  const readme = await safeFetchJson<{ content?: string }>(
    `${GITHUB_API}/repos/${orgHandle}/${repo}/readme`,
  );
  return decodeBase64(readme?.content);
};

const fetchCrateInfo = async (crateName: string) => {
  const crate = await safeFetchJson<{ crate?: { id: string } }>(
    `https://crates.io/api/v1/crates/${crateName}`,
  );
  if (!crate?.crate?.id) return null;
  return {
    crateUrl: `https://crates.io/crates/${crateName}`,
    docsUrl: `https://docs.rs/${crateName}`,
  };
};

export const fetchProjectData = async (repo: string): Promise<ProjectData> => {
  const override = projectOverridesMap.get(repo);
  const repoData = await safeFetchJson<{
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    pushed_at: string;
    updated_at: string;
    license?: { spdx_id?: string; name?: string } | null;
  }>(`${GITHUB_API}/repos/${orgHandle}/${repo}`);

  const [release, readme, crateInfo] = await Promise.all([
    fetchRelease(repo),
    fetchReadme(repo),
    override?.docsUrl || override?.crateUrl ? Promise.resolve(null) : fetchCrateInfo(override?.crate ?? repo),
  ]);

  const description =
    override?.description ??
    repoData?.description ??
    `A Rust crate in the ${config.org.name} organization.`;

  const displayName = override?.displayName ?? repoData?.name ?? repo;
  const updatedAt = repoData?.pushed_at ?? repoData?.updated_at ?? new Date().toISOString();
  const language = repoData?.language ?? 'Rust';
  const status = deriveStatus({ override: override?.status, latestRelease: release, updatedAt });

  const gettingStarted =
    override?.gettingStarted ||
    extractSection(readme, ['Getting Started', 'Quickstart', 'Usage', 'Installation']) ||
    'Check the README for setup steps, examples, and usage guides.';

  const contributing =
    override?.contributing ||
    extractSection(readme, ['Contributing', 'Contribution Guide']) ||
    'We welcome issues and pull requests. Start with a good first issue and share your context.';

  const license =
    override?.license ||
    extractSection(readme, ['License']) ||
    repoData?.license?.spdx_id ||
    'See repository for license details.';

  return {
    repo,
    slug: repo,
    displayName,
    description,
    url: repoData?.html_url ?? `${config.org.url}/${repo}`,
    stars: repoData?.stargazers_count ?? 0,
    forks: repoData?.forks_count ?? 0,
    language,
    updatedAt,
    latestRelease: release,
    docsUrl: override?.docsUrl ?? crateInfo?.docsUrl,
    crateUrl: override?.crateUrl ?? crateInfo?.crateUrl,
    status,
    why:
      override?.why ??
      `The ${displayName} crate exists to make building reliable Rust systems more approachable.`,
    features: override?.features ?? [],
    gettingStarted,
    contributing,
    license,
  };
};
