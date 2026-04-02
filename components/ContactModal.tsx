'use client'

import { useEffect, useId, useRef } from 'react'
import styles from './ContactModal.module.css'

type ContactModalProps = {
  open: boolean;
  titleHtml: string;
  body: string;
  onClose: () => void;
};

const TITLE_ID = 'contact-modal-title'

export const ContactModal = ({
  open,
  titleHtml,
  body,
  onClose,
}: ContactModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const bodyId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    queueMicrotask(() => closeRef.current?.focus())
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby={TITLE_ID}
      aria-describedby={body ? bodyId : undefined}
      onClick={onClose}
    >
      <div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          id={TITLE_ID}
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
        <div id={bodyId} className={styles.body}>
          {body}
        </div>
        <button
          ref={closeRef}
          type="button"
          className={`${styles.close} glassInteractive`}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <span>OK</span>
        </button>
      </div>
    </div>
  )
}
