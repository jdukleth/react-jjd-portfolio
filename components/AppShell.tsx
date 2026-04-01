'use client'

import styles from './AppShell.module.css'
import { Fullscreen } from '@/components/Fullscreen'
import { Navbar } from '@/components/Navbar'
import { NavigationProgressProvider } from '@/components/NavigationProgress'
import { PortfolioProvider } from '@/components/PortfolioProvider'
import { Stars } from '@/components/Stars'

export const AppShell = ({ children }: { children: React.ReactNode }) => (
  <PortfolioProvider>
    <NavigationProgressProvider>
      <Stars />
      <div className={styles.shell}>
        <Fullscreen />
        <main className={styles.page}>{children}</main>
        <Navbar />
      </div>
    </NavigationProgressProvider>
  </PortfolioProvider>
)
