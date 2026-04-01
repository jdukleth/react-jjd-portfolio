import { SkillsCard } from './SkillsCard'
import styles from './SkillsMasonry.module.css'
import type { Skill } from '@/stores/usePortfolioStore'

export const SkillsMasonry = ({ skills }: { skills: Skill[] }) => {
  return (
    <div className={styles.grid}>
      {skills.map((skill, index) => (
        <div key={index} className={styles.cell}>
          <SkillsCard data={skill} />
        </div>
      ))}
    </div>
  )
}
