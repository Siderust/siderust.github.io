#!/usr/bin/env npx tsx
import generatedProjects from '../generated/projects.generated.json';
import siteConfig from '../src/site.config';
import { getProjectGettingStarted } from '../src/lib/projectMetadata';

const cargoDependencyPattern = /^([a-zA-Z0-9_-]+)\s*=\s*"([^"]+)"/gm;

let errors = 0;

for (const project of siteConfig.projects) {
  const snippet = getProjectGettingStarted(project);
  if (!snippet) {
    continue;
  }

  for (const match of snippet.matchAll(cargoDependencyPattern)) {
    const [, crateName, displayedVersion] = match;
    const generated = generatedProjects.crates[crateName as keyof typeof generatedProjects.crates];
    if (!generated) {
      continue;
    }

    if (displayedVersion !== generated.version) {
      console.error(
        `${project.repo}: ${crateName} displays ${displayedVersion}, generated metadata says ${generated.version}`,
      );
      errors += 1;
    }
  }
}

if (errors > 0) {
  console.error(`Found ${errors} stale install snippet version(s).`);
  process.exit(1);
}

console.log('Project install snippets match generated package metadata.');
