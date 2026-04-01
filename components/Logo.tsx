import Image from 'next/image'
import styles from './Logo.module.css'

export const Logo = () => {
  return (
    <Image
      className={styles.img}
      src="/images/db-takeoff.png"
      alt="Portfolio logo"
      width={300}
      height={300}
      priority
    />
  )
}
