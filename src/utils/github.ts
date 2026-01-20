import { Octokit } from '@octokit/rest';
import { siteConfig } from '../../site.config';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Optional: only needed for higher rate limits
});

export interface ProjectData {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  license: { name: string; url: string | null } | null;
  topics: string[];
  latestRelease?: {
    tag_name: string;
    published_at: string;
    html_url: string;
  };
  readme?: string;
}

export async function fetchProjectData(repoName: string): Promise<ProjectData | null> {
  try {
    const { data: repo } = await octokit.repos.get({
      owner: siteConfig.org,
      repo: repoName,
    });

    let latestRelease = null;
    try {
      const { data: release } = await octokit.repos.getLatestRelease({
        owner: siteConfig.org,
        repo: repoName,
      });
      latestRelease = {
        tag_name: release.tag_name,
        published_at: release.published_at,
        html_url: release.html_url,
      };
    } catch (e) {
      // No releases found or error
    }

    let readme = null;
    try {
        const { data: readmeData } = await octokit.repos.getReadme({
            owner: siteConfig.org,
            repo: repoName,
            mediaType: {
                format: 'raw',
            },
        });
        readme = readmeData as unknown as string;
    } catch (e) {
        // No readme found
    }

    return {
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language,
      updated_at: repo.updated_at,
      license: repo.license ? { name: repo.license.name, url: repo.license.url } : null,
      topics: repo.topics || [],
      latestRelease,
      readme
    };
  } catch (error) {
    console.error(`Error fetching data for ${repoName}:`, error);
    // Return mock data if fetch fails (e.g. during dev without token)
    return {
        name: repoName,
        description: 'Project description unavailable (fetch failed).',
        html_url: `https://github.com/${siteConfig.org}/${repoName}`,
        homepage: null,
        stargazers_count: 0,
        forks_count: 0,
        language: 'Rust',
        updated_at: new Date().toISOString(),
        license: null,
        topics: [],
    };
  }
}

export async function fetchAllProjects() {
  const promises = siteConfig.projects.map(p => fetchProjectData(p.repo));
  return Promise.all(promises);
}
