import Image from 'next/image'
import styles from './SkillsItem.module.css'
import type { Skill } from '@/stores/usePortfolioStore'

const logoSrc = (logo: string) => `/images/skills-logos/${logo}`

export const SkillsItem = ({ item }: { item: Skill['skillItems'][number] }) => {
  const src = logoSrc(item.logo)
  const svg = item.logo.endsWith('.svg')

  return (
    <div className={styles.row}>
      <div className={styles.icon}>
        <Image
          src={src}
          alt=""
          width={40}
          height={40}
          unoptimized={svg}
        />
      </div>
      <div className={styles.label}>{item.name}</div>
    </div>
  )
}
