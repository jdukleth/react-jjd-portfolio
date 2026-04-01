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
  { href: '/', label: 'Nameplate', Icon: IconAccountCard },
  { href: '/skills', label: 'Skills', Icon: IconCodeTags },
  { href: '/projects', label: 'Projects', Icon: IconHammer },
  { href: '/resume', label: 'Resume', Icon: IconBriefcase },
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
      suppressHydrationWarning
    >
      {tabs.map(({ href, label, Icon }) => {
        const routeActive = isActive(pathname, href)
        const emphasized = href === emphasizedHref

        return (
          <Link
            key={href}
            href={href}
            prefetch
            suppressHydrationWarning
            aria-current={routeActive ? 'page' : undefined}
            onClick={() => {
              if (!routeActive) onNavIntent()
            }}
            onMouseEnter={() => setHoveredHref(href)}
            className={`${styles.tab} ${emphasized ? styles.tabEmphasized : styles.tabInactive} ${routeActive && emphasized ? styles.routeEmphasized : ''}`}
          >
            <span className={styles.tabLabel}>{label}</span>
            <Icon size={22} />
          </Link>
        )
      })}
    </nav>
  )
}
