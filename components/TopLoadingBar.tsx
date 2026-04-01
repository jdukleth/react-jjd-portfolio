import loadingStyles from '@/app/loading.module.css'

/** Gradient bar across the top of the viewport (shared with route `loading.tsx` and nav progress). */
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
