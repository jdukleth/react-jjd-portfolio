import { ContactButtons } from './ContactButtons'
import styles from './Nameplate.module.css'
import type { Nameplate as NameplateData } from '@/stores/usePortfolioStore'

export const Nameplate = ({ data }: { data: NameplateData }) => {
  return (
    <div className={styles.root}>
      <h1 className={styles.name}>{data.name}</h1>
      <div className={styles.jobTitle}>{data.jobTitle}</div>
      <hr className={styles.divider} />
      <div className={styles.taglines}>
        <div className={styles.supplemental}>{data.tagline1}</div>
        <div className={styles.supplemental}>{data.tagline2}</div>
      </div>
      <ContactButtons nameplate={data} />
    </div>
  )
}
