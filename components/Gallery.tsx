'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Gallery.module.css'

const isGif = (filename: string) => filename.toLowerCase().includes('gif')

export const Gallery = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const pic = images[index]

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = 0
  }, [index])

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
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={`${styles.control} glassInteractive`}
            onClick={() =>
              setIndex((i) => (i - 1 + images.length) % images.length)
            }
            disabled={images.length < 2}
          >
            <span>Prev</span>
          </button>
          <span className={styles.counter}>
            {index + 1} / {images.length}
          </span>
          <button
            type="button"
            className={`${styles.control} glassInteractive`}
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            disabled={images.length < 2}
          >
            <span>Next</span>
          </button>
        </div>
      </div>
    </div>
  )
}
