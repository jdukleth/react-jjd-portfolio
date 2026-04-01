import type { Project } from '@/stores/usePortfolioStore'

export const isProjectCoverJpg = (filename: string) =>
  filename.toLowerCase().includes('jpg')

export const isProjectCoverGif = (filename: string) =>
  filename.toLowerCase().includes('gif')

export const resolveGalleryImages = (data: Project): string[] => {
  if (data.gallery?.length) return data.gallery
  const pic = data.cover.pic
  if (isProjectCoverJpg(pic) || isProjectCoverGif(pic)) return [pic]
  return []
}
