import styles from './loading.module.css'

const Loading = () => (
  <>
    <div
      className={styles.bar}
      role="progressbar"
      aria-busy="true"
      aria-label="Loading page"
    />
    <span className={styles.srOnly}>Loading page</span>
  </>
)

export default Loading
