import { ProjectBlock } from './ProjectBlock'
import styles from './ProjectsBlocks.module.css'
import type { Project } from '@/stores/usePortfolioStore'

export const ProjectsBlocks = ({ projects }: { projects: Project[] }) => {
  return (
    <div className={styles.wrap}>
      {projects.map((project, index) => (
        <div
          key={`${project.name}-${project.developedFor}-${index}`}
          className={styles.block}
        >
          <ProjectBlock
            data={project}
            orientation={index % 2 ? 'last' : 'first'}
            themeClass={`gradient${(index % 4) + 1}`}
            isFirstBlock={index === 0}
          />
        </div>
      ))}
    </div>
  )
}
