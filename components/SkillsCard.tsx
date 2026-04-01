'use client'

import Image from 'next/image'
import styles from './SkillsCard.module.css'
import { SkillsItem } from './SkillsItem'
import type { Skill } from '@/stores/usePortfolioStore'
import { gradientTextClass, skillRevealClass } from '@/lib/themeGradientClasses'

export const SkillsCard = ({ data }: { data: Skill }) => {
  const revealCls = skillRevealClass(data.themeClass)
  const textClass = gradientTextClass(data.themeClass)
  const logoPath = `/images/skills-logos/${data.logo}`
  const logoSvg = data.logo.endsWith('.svg')

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <Image
          className={styles.logo}
          src={logoPath}
          alt={data.name}
          width={200}
          height={135}
          unoptimized={logoSvg}
        />
        <div className={`${styles.reveal} ${revealCls}`}>
          <ul>
            {data.uses.map((use, i) => (
              <li key={i}>{use}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.body}>
        <h3 className={`${styles.skillTitle} ${textClass}`}>{data.name}</h3>
        {data.years ? <p className={styles.years}>{data.years}</p> : null}
        <div className={styles.listWrap}>
          {data.skillItems.map((item, index) => (
            <SkillsItem key={index} item={item} />
          ))}
        </div>
      </div>
    </article>
  )
}
