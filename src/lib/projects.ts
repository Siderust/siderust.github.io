import { config } from './config';
import { fetchProjectData, type ProjectData } from './github';

let cache: ProjectData[] | null = null;

export const getProjects = async (): Promise<ProjectData[]> => {
  if (cache) return cache;
  const projects = await Promise.all(
    config.projects.map((project) => fetchProjectData(project.repo)),
  );
  cache = projects;
  return projects;
};

export const getProjectBySlug = async (slug: string) => {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
};
