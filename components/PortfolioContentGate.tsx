'use client'

import styles from './PortfolioContentGate.module.css'
import type { LoadState } from '@/stores/usePortfolioStore'
import { TopLoadingBar } from '@/components/TopLoadingBar'

export const PortfolioContentGate = ({
  loadState,
  ready,
  children,
}: {
  loadState: LoadState;
  ready: boolean;
  children: React.ReactNode;
}) => {
  if (loadState === 'error') {
    return (
      <p className={styles.message} suppressHydrationWarning>
        Could not load content.
      </p>
    )
  }
  if (!ready) {
    return <TopLoadingBar />
  }
  return children
}
