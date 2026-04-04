'use client'

import { memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
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

const STAR_DENSITY_DIVISOR = 2625
const STAR_COUNT_SCALE = 0.7

const starCountForViewport = (w: number, h: number): number => {
  const area = Math.max(0, w) * Math.max(0, h)
  const n = Math.floor(area / STAR_DENSITY_DIVISOR)
  const capped = Math.min(1360, Math.max(288, n))
  return Math.max(1, Math.floor(capped * STAR_COUNT_SCALE))
}

const PERSPECTIVE_PX = 360

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uProjFactor;
uniform float uReducedMotion;

attribute vec2 aPlane;
attribute float aZ0;
attribute float aZ1;
attribute float aDuration;
attribute float aDelay;
attribute float aPeakO;
attribute float aPointSize;
attribute float aGlowA;
attribute float aGlowPx;
attribute float aLightness;

varying float vAlpha;
varying float vLightness;
varying float vGlowA;
varying float vCoreR;

void main() {
  float dur = max(aDuration, 0.0001);
  float k = uTime + aDelay;
  float m = mod(k, dur);
  if (m < 0.0) m += dur;
  float t = m / dur;
  float z = uReducedMotion > 0.5 ? -400.0 : mix(aZ0, aZ1, t);

  float o;
  if (uReducedMotion > 0.5) {
    o = aPeakO;
  } else if (t < 0.06) {
    o = aPeakO * (t / 0.06);
  } else if (t < 0.88) {
    o = aPeakO;
  } else {
    o = aPeakO * (1.0 - (t - 0.88) / 0.12);
  }

  vAlpha = o;
  vLightness = aLightness;
  vGlowA = aGlowA;
  float span = max(aPointSize + aGlowPx * 2.5, 0.0001);
  vCoreR = aPointSize / span;

  vec4 mvPosition = modelViewMatrix * vec4(aPlane.x, aPlane.y, z, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float dist = max(-mvPosition.z, 1.0);
  gl_PointSize = span * uPixelRatio * uProjFactor / dist;
}
`

const fragmentShader = /* glsl */ `
precision highp float;

varying float vAlpha;
varying float vLightness;
varying float vGlowA;
varying float vCoreR;

void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float rad = length(p);
  if (rad > 1.0) discard;

  float core = smoothstep(vCoreR + 0.22, max(vCoreR - 0.12, 0.0), rad);
  float halo = exp(-pow(rad / max(vCoreR, 0.08), 2.0) * 2.4) * vGlowA * 1.35;
  float edgeGlow = (1.0 - smoothstep(0.65, 1.0, rad)) * vGlowA * 0.45;
  float a = clamp(core * 0.92 + halo + edgeGlow, 0.0, 1.0) * vAlpha;
  if (a < 0.003) discard;

  gl_FragColor = vec4(vec3(vLightness), a);
}
`

const fillStarGeometry = (
  geometry: THREE.BufferGeometry,
  configs: StarConfig[],
  w: number,
  h: number,
): void => {
  const n = configs.length
  const plane = new Float32Array(n * 2)
  const z0 = new Float32Array(n)
  const z1 = new Float32Array(n)
  const duration = new Float32Array(n)
  const delay = new Float32Array(n)
  const peakO = new Float32Array(n)
  const pointSize = new Float32Array(n)
  const glowA = new Float32Array(n)
  const glowPx = new Float32Array(n)
  const lightness = new Float32Array(n)

  for (let i = 0; i < n; i++) {
    const s = configs[i]!
    plane[i * 2] = (s.leftPct / 100 - 0.5) * w
    plane[i * 2 + 1] = (0.5 - s.topPct / 100) * h
    z0[i] = s.z0Px
    z1[i] = s.z1Px
    duration[i] = s.durationSec
    delay[i] = s.delaySec
    peakO[i] = s.peakO
    pointSize[i] = s.sizePx
    glowA[i] = s.glowA
    glowPx[i] = s.glowPx
    lightness[i] = Number.parseFloat(s.light) / 100
  }

  geometry.setAttribute('aPlane', new THREE.BufferAttribute(plane, 2))
  geometry.setAttribute('aZ0', new THREE.BufferAttribute(z0, 1))
  geometry.setAttribute('aZ1', new THREE.BufferAttribute(z1, 1))
  geometry.setAttribute('aDuration', new THREE.BufferAttribute(duration, 1))
  geometry.setAttribute('aDelay', new THREE.BufferAttribute(delay, 1))
  geometry.setAttribute('aPeakO', new THREE.BufferAttribute(peakO, 1))
  geometry.setAttribute('aPointSize', new THREE.BufferAttribute(pointSize, 1))
  geometry.setAttribute('aGlowA', new THREE.BufferAttribute(glowA, 1))
  geometry.setAttribute('aGlowPx', new THREE.BufferAttribute(glowPx, 1))
  geometry.setAttribute('aLightness', new THREE.BufferAttribute(lightness, 1))
  geometry.setDrawRange(0, n)
}

const StarsInner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 20000)
    camera.position.set(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const geometry = new THREE.BufferGeometry()
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uProjFactor: { value: 1 },
        uReducedMotion: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })

    const points = new THREE.Points(geometry, material)
    // No `position` attribute (we use aPlane); default bounding sphere is invalid and can cull all points.
    points.frustumCulled = false
    scene.add(points)

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncReducedMotion = () => {
      material.uniforms.uReducedMotion!.value = mq.matches ? 1 : 0
    }
    syncReducedMotion()
    mq.addEventListener('change', syncReducedMotion)

    let resizeT: ReturnType<typeof setTimeout> | undefined
    let raf = 0

    const applySize = (w: number, h: number) => {
      const pr = Math.min(window.devicePixelRatio, 2)
      renderer.setPixelRatio(pr)
      renderer.setSize(w, h, false)

      const fovDeg =
        (2 * Math.atan(Math.max(h, 1) / (2 * PERSPECTIVE_PX)) * 180) / Math.PI
      camera.aspect = w / Math.max(h, 1)
      camera.fov = fovDeg
      camera.updateProjectionMatrix()

      material.uniforms.uPixelRatio!.value = pr
      // Match THREE.Points size attenuation: gl_PointSize *= (height * 0.5) / (-mvPosition.z)
      material.uniforms.uProjFactor!.value = h * 0.5
    }

    const rebuildStars = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      applySize(w, h)
      const count = starCountForViewport(w, h)
      const configs = buildStarConfigs(count)
      fillStarGeometry(geometry, configs, w, h)
      Object.values(geometry.attributes).forEach((a) => {
        a.needsUpdate = true
      })
    }

    rebuildStars()

    const onResize = () => {
      if (resizeT) clearTimeout(resizeT)
      resizeT = setTimeout(() => rebuildStars(), 120)
    }
    window.addEventListener('resize', onResize, { passive: true })

    const t0 = performance.now() / 1000
    const tick = () => {
      material.uniforms.uTime!.value = performance.now() / 1000 - t0
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      mq.removeEventListener('change', syncReducedMotion)
      if (resizeT) clearTimeout(resizeT)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className={styles.root} aria-hidden>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.overlay} />
    </div>
  )
}

StarsInner.displayName = 'Stars'

export const Stars = memo(StarsInner)
