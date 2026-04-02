'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { GalleryOverlay } from './GalleryOverlay'
import styles from './ProjectBlock.module.css'
import type { Project } from '@/stores/usePortfolioStore'
import {
  isProjectCoverGif,
  isProjectCoverJpg,
  isProjectCoverSvg,
  resolveGalleryImages,
} from '@/lib/projectGallery'
import { gradientTextClass } from '@/lib/themeGradientClasses'

export const ProjectBlock = ({
  data,
  orientation,
  themeClass,
  isFirstBlock = false,
}: {
  data: Project;
  orientation: 'first' | 'last';
  themeClass: string;
  isFirstBlock?: boolean;
}) => {
  const pic = data.cover.pic
  const textClass = gradientTextClass(themeClass)
  const layoutClass =
    orientation === 'first' ? styles.layoutFirst : styles.layoutLast

  const images = useMemo(() => resolveGalleryImages(data), [data])
  const hasGallery = images.length > 0
  const [galleryOpen, setGalleryOpen] = useState(false)

  const gifUncropped = isFirstBlock && isProjectCoverGif(pic)

  const media = (() => {
    if (
      !isProjectCoverJpg(pic) &&
      !isProjectCoverGif(pic) &&
      !isProjectCoverSvg(pic)
    ) {
      return (
        <iframe
          className={styles.iframe}
          title={data.name}
          src="https://www.youtube.com/embed/vrVV0RzeSTk"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
    }
    if (isProjectCoverGif(pic)) {
      return (
        <img
          className={`${styles.gifCover} ${gifUncropped ? styles.gifCoverUncropped : ''}`}
          src={`/images/projects/${pic}`}
          alt=""
          style={
            gifUncropped ? undefined : { objectPosition: data.cover.position }
          }
        />
      )
    }
    if (isProjectCoverSvg(pic)) {
      return (
        <img
          className={styles.gifCover}
          src={`/images/projects/${pic}`}
          alt=""
          style={{ objectPosition: data.cover.position }}
        />
      )
    }
    return (
      <Image
        className={styles.coverImg}
        src={`/images/projects/${pic}`}
        alt=""
        fill
        sizes="(min-width: 960px) 42vw, 100vw"
        style={{ objectPosition: data.cover.position }}
        priority={false}
      />
    )
  })()

  const openGallery = () => {
    if (hasGallery) setGalleryOpen(true)
  }

  const onCoverKeyDown = (e: React.KeyboardEvent) => {
    if (!hasGallery) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setGalleryOpen(true)
    }
  }

  return (
    <section className={`${styles.row} ${layoutClass}`}>
      <div className={styles.cover}>
        <div
          className={`${styles.coverInner} ${gifUncropped ? styles.coverInnerGifUncropped : ''} ${hasGallery ? styles.coverInnerClickable : ''}`}
          role={hasGallery ? 'button' : undefined}
          tabIndex={hasGallery ? 0 : undefined}
          onClick={hasGallery ? openGallery : undefined}
          onKeyDown={hasGallery ? onCoverKeyDown : undefined}
          aria-label={
            hasGallery ? `Open image gallery for ${data.name}` : undefined
          }
        >
          {media}
        </div>
      </div>
      <div className={styles.detail}>
        <div className={styles.inner}>
          <h3 className={`${styles.title} ${textClass}`}>{data.name}</h3>
          <h4 className={styles.sub}>{data.developedFor}</h4>
          {Array.isArray(data.description) ? (
            <ul className={styles.descriptionList}>
              {data.description.map((line, i) => (
                <li key={i} className={styles.descriptionListItem}>
                  {line}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.description}>{data.description}</p>
          )}
          <div className={styles.chips}>
            {data.skills.map((skill) => (
              <div key={`${skill.name}-${skill.logo}`} className={styles.chip}>
                <span className={styles.chipIcon}>
                  <Image
                    src={`/images/skills-logos/${skill.logo}`}
                    alt=""
                    fill
                    sizes="32px"
                    className={styles.chipIconImg}
                    unoptimized={skill.logo.endsWith('.svg')}
                  />
                </span>
                <span className={styles.chipLabel}>{skill.name}</span>
              </div>
            ))}
          </div>
          <GalleryOverlay
            data={data}
            themeClass={themeClass}
            open={galleryOpen}
            onOpenChange={setGalleryOpen}
          />
        </div>
      </div>
    </section>
  )
}
