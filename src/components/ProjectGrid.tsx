import React, { useState, useMemo } from 'react';
import type { ProjectData } from '../utils/github';
import { Star, GitFork, Calendar, Search } from 'lucide-react';

interface Props {
  projects: ProjectData[];
}

export default function ProjectGrid({ projects }: Props) {
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('All');
  
  const languages = ['All', ...Array.from(new Set(projects.map(p => p.language).filter(Boolean)))];

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                            (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
      const matchesLang = langFilter === 'All' || p.language === langFilter;
      return matchesSearch && matchesLang;
    });
  }, [projects, search, langFilter]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={langFilter}
          onChange={(e) => setLangFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {languages.map(lang => (
            <option key={lang} value={lang as string}>{lang}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <a key={project.name} href={`/projects/${project.name}`} className="block group">
            <div className="h-full p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>
                {project.language && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {project.language}
                  </span>
                )}
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 min-h-[2.5rem]">
                {project.description || 'No description available.'}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  <span>{project.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  <span>{project.forks_count}</span>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(project.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
