import generatedProjects from '../../generated/projects.generated.json';
import type { ProjectConfig } from '../site.config';

type GeneratedProjects = typeof generatedProjects;

export function getGeneratedProjects(): GeneratedProjects {
  return generatedProjects;
}

export function renderProjectTemplate(template: string): string {
  return template.replace(/\{\{\s*crates\.([a-zA-Z0-9_-]+)\.version\s*\}\}/g, (match, crateName: string) => {
    const crate = generatedProjects.crates[crateName as keyof typeof generatedProjects.crates];
    if (!crate) {
      throw new Error(`Missing generated crate metadata for placeholder ${match}`);
    }
    return crate.version;
  });
}

export function getProjectGettingStarted(projectConfig: ProjectConfig | undefined): string | null {
  if (!projectConfig) {
    return null;
  }

  if (projectConfig.gettingStartedTemplate) {
    return renderProjectTemplate(projectConfig.gettingStartedTemplate);
  }

  return projectConfig.gettingStarted ?? null;
}
