'use client'

import { usePathname } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { TopLoadingBar } from '@/components/TopLoadingBar'

const MIN_MS = 750

type NavigationIntentValue = {
  onNavIntent: () => void
} | null

const NavigationIntentContext = createContext<NavigationIntentValue>(null)

export const useNavigationIntent = () => {
  const ctx = useContext(NavigationIntentContext)
  return ctx?.onNavIntent ?? (() => {})
}

export const NavigationProgressProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname() ?? '/'
  const prevPath = useRef(pathname)
  const isFirstPathEffect = useRef(true)
  const navStartRef = useRef<number | null>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [visible, setVisible] = useState(false)

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current != null) {
      clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isFirstPathEffect.current) {
      isFirstPathEffect.current = false
      prevPath.current = pathname
      return
    }
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    clearHideTimer()
    queueMicrotask(() => {
      setVisible(true)
    })

    const start = navStartRef.current ?? Date.now()
    navStartRef.current = start
    const elapsed = Date.now() - start
    const wait = Math.max(0, MIN_MS - elapsed)

    hideTimerRef.current = setTimeout(() => {
      setVisible(false)
      navStartRef.current = null
      hideTimerRef.current = null
    }, wait)

    return clearHideTimer
  }, [pathname, clearHideTimer])

  const onNavIntent = useCallback(() => {
    setVisible(true)
    navStartRef.current = Date.now()
  }, [])

  useEffect(() => () => clearHideTimer(), [clearHideTimer])

  return (
    <NavigationIntentContext.Provider value={{ onNavIntent }}>
      {visible ? <TopLoadingBar /> : null}
      {children}
    </NavigationIntentContext.Provider>
  )
}
