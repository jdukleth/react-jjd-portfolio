'use client'

import { useEffect } from 'react'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {
  const hydrate = usePortfolioStore((s) => s.hydrate)

  useEffect(() => {
    void hydrate()
  }, [hydrate])

  return children
}
