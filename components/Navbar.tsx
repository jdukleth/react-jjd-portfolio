'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type CSSProperties } from 'react'
import styles from './Navbar.module.css'
import { useNavigationIntent } from '@/components/NavigationProgress'
import {
  IconAccountCard,
  IconBriefcase,
  IconCodeTags,
  IconHammer,
} from '@/components/icons'

const tabs = [
  {
    href: '/',
    label: 'Nameplate',
    Icon: IconAccountCard,
    tintVar: '--accent-4' as const,
  },
  {
    href: '/skills',
    label: 'Skills',
    Icon: IconCodeTags,
    tintVar: '--accent-3' as const,
  },
  {
    href: '/projects',
    label: 'Projects',
    Icon: IconHammer,
    tintVar: '--accent-2' as const,
  },
  {
    href: '/resume',
    label: 'Resume',
    Icon: IconBriefcase,
    tintVar: '--accent-1' as const,
  },
]

const isActive = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export const Navbar = () => {
  const pathname = usePathname() || '/'
  const onNavIntent = useNavigationIntent()
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const [navPending, setNavPending] = useState<{
    from: string
    to: string
  } | null>(null)

  const activeTabHref =
    tabs.find((t) => isActive(pathname, t.href))?.href ?? '/'

  const pendingEmphasis =
    navPending !== null &&
    pathname === navPending.from &&
    !isActive(pathname, navPending.to)
      ? navPending.to
      : null

  const emphasizedHref = hoveredHref ?? pendingEmphasis ?? activeTabHref

  return (
    <nav
      className={styles.bar}
      aria-label="Primary"
      onMouseLeave={() => setHoveredHref(null)}
      suppressHydrationWarning
    >
      {tabs.map(({ href, label, Icon, tintVar }) => {
        const routeActive = isActive(pathname, href)
        const emphasized = href === emphasizedHref

        return (
          <Link
            key={href}
            href={href}
            prefetch
            suppressHydrationWarning
            style={
              { '--tab-glass-tint': `var(${tintVar})` } as CSSProperties
            }
            aria-current={routeActive ? 'page' : undefined}
            onClick={() => {
              if (!routeActive) {
                setNavPending({ from: pathname, to: href })
                onNavIntent()
              }
              queueMicrotask(() => {
                document.getElementById('main-scroll')?.focus({
                  preventScroll: true,
                })
              })
            }}
            onMouseEnter={() => setHoveredHref(href)}
            className={`${styles.tab} ${emphasized ? styles.tabEmphasized : styles.tabInactive} ${routeActive && emphasized ? styles.routeEmphasized : ''}`}
          >
            <span className={styles.tabCluster}>
              <Icon size={22} />
              <span className={styles.tabLabel}>{label}</span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
