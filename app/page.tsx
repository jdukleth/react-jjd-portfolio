'use client'

import { HomeView } from '@/components/HomeView'
import { Logo } from '@/components/Logo'
import { Nameplate } from '@/components/Nameplate'
import { TopLoadingBar } from '@/components/TopLoadingBar'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

const HomePage = () => {
  const nameplate = usePortfolioStore((s) => s.nameplate)
  const loadState = usePortfolioStore((s) => s.loadState)

  if (loadState === 'error') {
    return <p style={{ textAlign: 'center', padding: '2rem' }}>Could not load content.</p>
  }

  if (!nameplate) {
    return <TopLoadingBar />
  }

  return (
    <HomeView>
      <Logo />
      <Nameplate data={nameplate} />
    </HomeView>
  )
}

export default HomePage
