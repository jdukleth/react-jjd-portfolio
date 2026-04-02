import type { Project } from '@/stores/usePortfolioStore'

export const isProjectCoverJpg = (filename: string) =>
  /\.(jpe?g|png|webp)$/i.test(filename)

export const isProjectCoverSvg = (filename: string) =>
  filename.toLowerCase().endsWith('.svg')

export const isProjectCoverGif = (filename: string) =>
  filename.toLowerCase().includes('gif')

export const resolveGalleryImages = (data: Project): string[] => {
  if (data.gallery?.length) return data.gallery
  const pic = data.cover.pic
  if (
    isProjectCoverJpg(pic) ||
    isProjectCoverGif(pic) ||
    isProjectCoverSvg(pic)
  ) {
    return [pic]
  }
  return []
}
