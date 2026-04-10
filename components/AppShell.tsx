'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import styles from './AppShell.module.css'
import { Fullscreen } from '@/components/Fullscreen'
import { Navbar } from '@/components/Navbar'
import { NavigationProgressProvider } from '@/components/NavigationProgress'
import { PortfolioProvider } from '@/components/PortfolioProvider'
import dynamic from 'next/dynamic'

const Stars = dynamic(() => import('@/components/Stars').then((m) => m.Stars), {
  ssr: false,
})

const MainScrollPane = ({ children }: { children: React.ReactNode }) => {
  const mainRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  const focusMain = useCallback(() => {
    const el = mainRef.current
    if (el) el.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    focusMain()
  }, [pathname, focusMain])

  return (
    <main
      ref={mainRef}
      id="main-scroll"
      tabIndex={-1}
      className={styles.page}
    >
      {children}
    </main>
  )
}

export const AppShell = ({ children }: { children: React.ReactNode }) => (
  <PortfolioProvider>
    <NavigationProgressProvider>
      <Stars />
      <div className={styles.shell}>
        <Fullscreen />
        <MainScrollPane>{children}</MainScrollPane>
        <Navbar />
      </div>
    </NavigationProgressProvider>
  </PortfolioProvider>
)
