'use client'

import Masonry from 'react-masonry-css'
import { SkillsCard } from './SkillsCard'
import styles from './SkillsMasonry.module.css'
import type { Skill } from '@/stores/usePortfolioStore'

const breakpointCols = {
  default: 7,
  2600: 6,
  2200: 5,
  1800: 4,
  1400: 3,
  1000: 2,
  640: 1,
}

export const SkillsMasonry = ({ skills }: { skills: Skill[] }) => {
  return (
    <Masonry
      breakpointCols={breakpointCols}
      className={styles.masonryGrid}
      columnClassName={styles.masonryColumn}
    >
      {skills.map((skill) => (
        <div key={skill.name} className={styles.item}>
          <SkillsCard data={skill} />
        </div>
      ))}
    </Masonry>
  )
}
