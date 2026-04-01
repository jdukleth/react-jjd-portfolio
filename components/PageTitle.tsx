import styles from './PageTitle.module.css'

export const PageTitleRow = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.titleRow}>{children}</div>
)

export const PageTitle = ({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) => {
  return (
    <h1 className={styles.title}>
      <span className={styles.icon}>{icon}</span>
      <span>{children}</span>
    </h1>
  )
}
