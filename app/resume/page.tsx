'use client'

import styles from './resume.module.css'
import { PageTitle } from '@/components/PageTitle'
import { TopLoadingBar } from '@/components/TopLoadingBar'
import { IconBriefcase } from '@/components/icons'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

const ResumePage = () => {
  const resume = usePortfolioStore((s) => s.resume)
  const loadState = usePortfolioStore((s) => s.loadState)

  if (loadState === 'error') {
    return <p style={{ textAlign: 'center', padding: '2rem' }}>Could not load content.</p>
  }

  if (!resume) {
    return <TopLoadingBar />
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.titleRow}>
        <PageTitle icon={<IconBriefcase size={44} />}>RESUME</PageTitle>
      </div>
      <div className={styles.btnRow}>
        <a
          className={`${styles.download} glassInteractive glassInteractiveOutline`}
          href={`/${resume.path}`}
          download
        >
          <span>Download Resume</span>
        </a>
      </div>
    </div>
  )
}

export default ResumePage
