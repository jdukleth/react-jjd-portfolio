'use client'

import { PageTitle } from '@/components/PageTitle'
import { SkillsMasonry } from '@/components/SkillsMasonry'
import { TopLoadingBar } from '@/components/TopLoadingBar'
import { IconCodeTags } from '@/components/icons'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

const SkillsPage = () => {
  const skills = usePortfolioStore((s) => s.skills)
  const loadState = usePortfolioStore((s) => s.loadState)

  if (loadState === 'error') {
    return <p style={{ textAlign: 'center', padding: '2rem' }}>Could not load content.</p>
  }

  if (!skills) {
    return <TopLoadingBar />
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-1rem' }}>
        <PageTitle icon={<IconCodeTags size={44} />}>SKILLS</PageTitle>
      </div>
      <SkillsMasonry skills={skills} />
    </div>
  )
}

export default SkillsPage
