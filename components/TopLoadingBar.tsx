import loadingStyles from '@/app/loading.module.css'

export const TopLoadingBar = () => (
  <>
    <div
      className={loadingStyles.bar}
      role="progressbar"
      aria-busy="true"
      aria-label="Page loading"
    />
    <span className={loadingStyles.srOnly}>Page loading</span>
  </>
)
