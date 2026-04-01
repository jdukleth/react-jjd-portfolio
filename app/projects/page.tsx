'use client'

import { PageTitle } from '@/components/PageTitle'
import { ProjectsBlocks } from '@/components/ProjectsBlocks'
import { TopLoadingBar } from '@/components/TopLoadingBar'
import { IconHammer } from '@/components/icons'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

const ProjectsPage = () => {
  const projects = usePortfolioStore((s) => s.projects)
  const loadState = usePortfolioStore((s) => s.loadState)

  if (loadState === 'error') {
    return <p style={{ textAlign: 'center', padding: '2rem' }}>Could not load content.</p>
  }

  if (!projects) {
    return <TopLoadingBar />
  }

  return (
    <div style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-1rem' }}>
        <PageTitle icon={<IconHammer size={44} />}>PROJECTS</PageTitle>
      </div>
      <ProjectsBlocks projects={projects} />
    </div>
  )
}

export default ProjectsPage
