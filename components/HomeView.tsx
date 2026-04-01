import { Children } from 'react'
import styles from './HomeView.module.css'

export const HomeView = ({ children }: { children: React.ReactNode }) => {
  const items = Children.toArray(children)

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.logoCol}>{items[0]}</div>
        <div className={styles.textCol}>{items[1]}</div>
      </div>
    </div>
  )
}
