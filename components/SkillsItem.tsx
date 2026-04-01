import Image from 'next/image'
import styles from './SkillsItem.module.css'
import type { Skill } from '@/stores/usePortfolioStore'

export const SkillsItem = ({ item }: { item: Skill['skillItems'][number] }) => {
  return (
    <div className={styles.row}>
      <div className={styles.icon}>
        <Image
          src={`/images/skills-logos/${item.logo}`}
          alt=""
          width={40}
          height={40}
        />
      </div>
      <div className={styles.label}>{item.name}</div>
    </div>
  )
}
