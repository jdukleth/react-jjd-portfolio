'use client'

import { useEffect, useRef } from 'react'
import styles from './Gallery.module.css'

const isGif = (filename: string) => filename.toLowerCase().includes('gif')

type GalleryProps = {
  images: string[]
  activeIndex: number
}

export const Gallery = ({ images, activeIndex }: GalleryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const pic = images[activeIndex]

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = 0
  }, [activeIndex])

  if (!pic) return null

  const src = `/images/projects/${pic}`

  return (
    <div ref={scrollRef} className={styles.root} id="Gallery">
      <div className={styles.slide}>
        <div className={styles.imageBlock}>
          <img
            className={isGif(pic) ? styles.imageGif : styles.image}
            src={src}
            alt=""
            loading={activeIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      </div>
    </div>
  )
}
