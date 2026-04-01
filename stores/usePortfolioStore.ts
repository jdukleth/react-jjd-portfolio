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

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  nameplate: null,
  skills: null,
  projects: null,
  resume: null,
  loadState: 'idle',
  error: null,

  hydrate: async () => {
    if (get().loadState === 'ready' || get().loadState === 'loading') return
    set({ loadState: 'loading', error: null })
    try {
      const [np, sk, pr, re] = await Promise.all([
        fetch('/api/nameplate').then((r) => r.json()),
        fetch('/api/skills').then((r) => r.json()),
        fetch('/api/projects').then((r) => r.json()),
        fetch('/api/resume').then((r) => r.json()),
      ])
      set({
        nameplate: np,
        skills: sk,
        projects: pr,
        resume: re,
        loadState: 'ready',
      })
    } catch (e) {
      set({
        loadState: 'error',
        error: e instanceof Error ? e.message : 'Failed to load',
      })
    }
  },
}))
