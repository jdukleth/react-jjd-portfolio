'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Gallery } from './Gallery'
import styles from './GalleryOverlay.module.css'
import type { Project } from '@/stores/usePortfolioStore'
import {
  IconChevronLeft,
  IconChevronRight,
  IconClose,
  IconGallery,
} from '@/components/icons'
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
  const [activeSlide, setActiveSlide] = useState(0)
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
  const galleryLength = images.length
  const canPrev = galleryLength > 0 && activeSlide > 0
  const canNext = galleryLength > 0 && activeSlide < galleryLength - 1
  const slideLabel =
    galleryLength < 1 ? 0 : Math.min(activeSlide + 1, galleryLength)

  useEffect(() => {
    if (!open) return
    // Reset slide when the modal opens (sync with `open` prop).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- dialog must start at slide 0 without flash
    setActiveSlide(0)
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setActiveSlide((s) => (s > 0 ? s - 1 : s))
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setActiveSlide((s) =>
          galleryLength > 0 && s < galleryLength - 1 ? s + 1 : s,
        )
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, galleryLength])

  if (!images.length) return null

  return (
    <>
      <button
        type="button"
        className={`${styles.openButton} ${styles[t]} glassInteractive glassInteractiveOutline glassInteractiveRadius8`}
        onClick={() => setOpen(true)}
      >
        <IconGallery size={28} />
        <span>View Project Gallery</span>
      </button>
      {open ? (
        <div className={styles.overlay}>
          <header className={styles.toolbar}>
            <span className={styles.toolbarTitle}>
              Scroll Down on Images
            </span>
            <span className={styles.toolbarSpacer} aria-hidden />
            <div className={styles.toolbarPagination}>
              <button
                type="button"
                className={`${styles.iconBtn} glassInteractive glassInteractiveRound`}
                aria-label="Previous image"
                disabled={!canPrev}
                onClick={() => canPrev && setActiveSlide((s) => s - 1)}
              >
                <IconChevronLeft size={28} />
              </button>
              <span className={styles.toolbarCount}>
                {slideLabel} / {galleryLength}
              </span>
              <button
                type="button"
                className={`${styles.iconBtn} glassInteractive glassInteractiveRound`}
                aria-label="Next image"
                disabled={!canNext}
                onClick={() => canNext && setActiveSlide((s) => s + 1)}
              >
                <IconChevronRight size={28} />
              </button>
            </div>
            <span className={styles.toolbarSpacer} aria-hidden />
            <button
              type="button"
              className={`${styles.iconBtn} glassInteractive glassInteractiveRound`}
              aria-label="Close gallery"
              onClick={() => setOpen(false)}
            >
              <IconClose size={28} />
            </button>
          </header>
          <Gallery images={images} activeIndex={activeSlide} />
        </div>
      ) : null}
    </>
  )
}
