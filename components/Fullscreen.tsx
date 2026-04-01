'use client'

import { useCallback, useState } from 'react'
import styles from './Fullscreen.module.css'
import { IconFullscreen, IconFullscreenExit } from '@/components/icons'

export const Fullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggle = useCallback(() => {
    const el = document.documentElement
    const fs =
      document.fullscreenEnabled ||
      (document as Document & { webkitFullscreenEnabled?: boolean })
        .webkitFullscreenEnabled ||
      (document as Document & { mozFullScreenEnabled?: boolean })
        .mozFullScreenEnabled ||
      (document as Document & { msFullscreenEnabled?: boolean })
        .msFullscreenEnabled

    if (!fs) return

    if (!isFullscreen) {
      if (el.requestFullscreen) void el.requestFullscreen()
      else if (
        (el as HTMLElement & { webkitRequestFullscreen?: () => void })
          .webkitRequestFullscreen
      )
        (el as HTMLElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen()
      else if (
        (el as HTMLElement & { mozRequestFullScreen?: () => void })
          .mozRequestFullScreen
      )
        (el as HTMLElement & { mozRequestFullScreen: () => void }).mozRequestFullScreen()
      else if (
        (el as HTMLElement & { msRequestFullscreen?: () => void })
          .msRequestFullscreen
      )
        (el as HTMLElement & { msRequestFullscreen: () => void }).msRequestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) void document.exitFullscreen()
      else if (
        (document as Document & { webkitExitFullscreen?: () => void })
          .webkitExitFullscreen
      )
        (document as Document & { webkitExitFullscreen: () => void }).webkitExitFullscreen()
      else if (
        (document as Document & { mozCancelFullScreen?: () => void })
          .mozCancelFullScreen
      )
        (document as Document & { mozCancelFullScreen: () => void }).mozCancelFullScreen()
      else if (
        (document as Document & { msExitFullscreen?: () => void })
          .msExitFullscreen
      )
        (document as Document & { msExitFullscreen: () => void }).msExitFullscreen()
      setIsFullscreen(false)
    }
  }, [isFullscreen])

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={`${styles.button} glassInteractive glassInteractiveRound`}
        onClick={toggle}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? (
          <IconFullscreenExit size={36} />
        ) : (
          <IconFullscreen size={36} />
        )}
      </button>
    </div>
  )
}
