'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Gallery } from './Gallery'
import styles from './GalleryOverlay.module.css'
import type { Project } from '@/stores/usePortfolioStore'
import { IconClose, IconGallery } from '@/components/icons'
import { resolveGalleryImages } from '@/lib/projectGallery'

const themeToT: Record<string, 't1' | 't2' | 't3' | 't4'> = {
  gradient1: 't1',
  gradient2: 't2',
  gradient3: 't3',
  gradient4: 't4',
}

type GalleryOverlayProps = {
  data: Project
  themeClass: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const GalleryOverlay = ({
  data,
  themeClass,
  open: openProp,
  onOpenChange,
}: GalleryOverlayProps) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const controlled = onOpenChange !== undefined
  const open = controlled ? Boolean(openProp) : internalOpen

  const setOpen = useCallback(
    (next: boolean) => {
      onOpenChange?.(next)
      if (!controlled) setInternalOpen(next)
    },
    [controlled, onOpenChange],
  )

  const t = themeToT[themeClass] ?? 't1'

  const images = useMemo(() => resolveGalleryImages(data), [data])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!images.length) return null

  return (
    <>
      <button
        type="button"
        className={`${styles.openButton} ${styles[t]} glassInteractive glassInteractiveOutline`}
        onClick={() => setOpen(true)}
      >
        <IconGallery size={28} />
        <span>View Project Gallery</span>
      </button>
      {open ? (
        <div className={styles.overlay}>
          <header className={styles.toolbar}>
            <span className={styles.toolbarTitle}>Scroll Down on Images</span>
            <button
              type="button"
              className={`${styles.iconBtn} glassInteractive glassInteractiveRound`}
              aria-label="Close gallery"
              onClick={() => setOpen(false)}
            >
              <IconClose size={28} />
            </button>
          </header>
          <Gallery images={images} />
        </div>
      ) : null}
    </>
  )
}
