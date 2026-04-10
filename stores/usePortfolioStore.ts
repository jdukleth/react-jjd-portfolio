import { create } from 'zustand'
import { nameplate } from '@/lib/db/nameplate'
import { projects } from '@/lib/db/projects'
import { resume } from '@/lib/db/resume'
import { skills } from '@/lib/db/skills'

export type Nameplate = typeof nameplate;
export type Skill = (typeof skills)[number];
export type Project = (typeof projects)[number];
export type Resume = typeof resume;

export type LoadState = 'idle' | 'loading' | 'ready' | 'error';

type PortfolioState = {
  nameplate: Nameplate | null;
  skills: Skill[] | null;
  projects: Project[] | null;
  resume: Resume | null;
  loadState: LoadState;
  error: string | null;
  hydrate: () => Promise<void>;
};

export const usePortfolioStore = create<PortfolioState>((set) => ({
  nameplate: nameplate,
  skills: skills,
  projects: projects,
  resume: resume,
  loadState: 'ready',
  error: null,

  hydrate: async () => {
    set({ loadState: 'ready' })
  },
}))
