'use client'

import {
  startTransition,
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
} from 'react'
import styles from './Stars.module.css'

type StarConfig = {
  id: string
  leftPct: number
  topPct: number
  sizePx: number
  glowPx: number
  glowA: number
  light: string
  z0Px: number
  z1Px: number
  peakO: number
  durationSec: number
  delaySec: number
}

const buildStarConfigs = (count: number): StarConfig[] => {
  const words = Math.max(256, count * 12)
  const buf = new Uint32Array(words)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(buf)
  } else {
    for (let k = 0; k < buf.length; k++) {
      buf[k] = (Math.random() * 2 ** 32) >>> 0
    }
  }

  let r = 0
  const u = (): number => {
    if (r >= buf.length) r = 0
    return buf[r++]! / 2 ** 32
  }
  const rb = (a: number, b: number): number => a + u() * (b - a)

  return Array.from({ length: count }, (_, idx) => {
    const mark = r
    const durationSec = rb(2.2, 7.8)
    const z0Px = Math.round(rb(-2400, -520))
    const z1Px = Math.round(rb(260, 620))

    return {
      id: `${idx}-${mark}`,
      leftPct: u() * 100,
      topPct: u() * 100,
      sizePx: rb(0.85, 3.2),
      glowPx: rb(0.8, 4.8),
      glowA: rb(0.25, 0.72),
      light: `${rb(72, 100).toFixed(1)}%`,
      z0Px,
      z1Px,
      peakO: rb(0.55, 1),
      durationSec,
      delaySec: rb(-durationSec, 0),
    }
  })
}

const starCountForViewport = (w: number, h: number): number => {
  const area = Math.max(0, w) * Math.max(0, h)
  const n = Math.floor(area / 5250)
  return Math.min(680, Math.max(144, n))
}

export const Stars = () => {
  const [stars, setStars] = useState<StarConfig[]>([])

  const readStars = useCallback((urgent: boolean) => {
    const count = starCountForViewport(window.innerWidth, window.innerHeight)
    const next = buildStarConfigs(count)
    if (urgent) setStars(next)
    else startTransition(() => setStars(next))
  }, [])

  useEffect(() => {
    queueMicrotask(() => readStars(true))

    let t: ReturnType<typeof setTimeout> | undefined
    const onResize = () => {
      if (t) clearTimeout(t)
      t = setTimeout(() => readStars(false), 120)
    }

    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('resize', onResize)
      if (t) clearTimeout(t)
    }
  }, [readStars])

  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.scene}>
        <div className={styles.field}>
          {stars.map((s) => (
            <span
              key={s.id}
              className={styles.star}
              style={
                {
                  left: `${s.leftPct}%`,
                  top: `${s.topPct}%`,
                  width: s.sizePx,
                  height: s.sizePx,
                  '--light': s.light,
                  '--glow': `${s.glowPx}px`,
                  '--glow-a': s.glowA,
                  '--z0': `${s.z0Px}px`,
                  '--z1': `${s.z1Px}px`,
                  '--peak-o': s.peakO,
                  animationDuration: `${s.durationSec}s`,
                  animationDelay: `${s.delaySec}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>
      <div className={styles.overlay} />
    </div>
  )
}
