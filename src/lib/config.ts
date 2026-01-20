import siteConfig from '../../site.config';
import type { ProjectOverride, ProjectStatus } from '../../site.config';

export type { ProjectOverride, ProjectStatus };

export const config = siteConfig;

export const projectOverrides = siteConfig.projects;

export const projectOverridesMap = new Map(
  projectOverrides.map((project) => [project.repo, project]),
);

export const orgHandle = (() => {
  try {
    return new URL(siteConfig.org.url).pathname.replace(/\//g, '') || siteConfig.org.name;
  } catch (error) {
    return siteConfig.org.name;
  }
})();
