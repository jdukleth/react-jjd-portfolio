'use client'

import styles from './PortfolioContentGate.module.css'
import type { LoadState } from '@/stores/usePortfolioStore'

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
    return <p className={styles.message}>Could not load content.</p>
  }
  if (!ready) {
    return <p className={styles.message}>Loading…</p>
  }
  return children
}
