'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
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
    activeText: 'nameplateActive' as const,
  },
  {
    href: '/skills',
    label: 'Skills',
    Icon: IconCodeTags,
    activeText: 'skillsActive' as const,
  },
  {
    href: '/projects',
    label: 'Projects',
    Icon: IconHammer,
    activeText: 'projectsActive' as const,
  },
  {
    href: '/resume',
    label: 'Resume',
    Icon: IconBriefcase,
    activeText: 'resumeActive' as const,
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

  const activeTabHref =
    tabs.find((t) => isActive(pathname, t.href))?.href ?? '/'
  const emphasizedHref = hoveredHref ?? activeTabHref

  return (
    <nav
      className={styles.bar}
      aria-label="Primary"
      onMouseLeave={() => setHoveredHref(null)}
    >
      {tabs.map(({ href, label, Icon }) => {
        const routeActive = isActive(pathname, href)
        const emphasized = href === emphasizedHref
        const glowTab = tabs.find((t) => t.href === emphasizedHref)
        const glowClass =
          emphasized && glowTab ? styles[glowTab.activeText] : ''

        return (
          <Link
            key={href}
            href={href}
            prefetch
            aria-current={routeActive ? 'page' : undefined}
            onClick={() => {
              if (!routeActive) onNavIntent()
            }}
            onMouseEnter={() => setHoveredHref(href)}
            className={`${styles.tab} ${emphasized ? styles.tabEmphasized : styles.tabInactive} ${glowClass} ${routeActive && emphasized ? styles.routeEmphasized : ''}`}
          >
            {emphasized ? (
              <span className={styles.nebulaRoot} aria-hidden>
                <span className={styles.nebulaLayer} />
                <span className={styles.nebulaLayer} />
                <span className={styles.nebulaLayer} />
                <span className={styles.nebulaLayer} />
              </span>
            ) : null}
            {emphasized ? (
              <span className={styles.tabGlass} aria-hidden />
            ) : null}
            <span className={styles.tabLabel}>{label}</span>
            <Icon size={22} />
          </Link>
        )
      })}
    </nav>
  )
}
