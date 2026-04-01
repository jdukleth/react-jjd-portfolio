'use client'

import styles from './ContactModal.module.css'

type ContactModalProps = {
  open: boolean;
  titleHtml: string;
  body: string;
  onClose: () => void;
};

export const ContactModal = ({
  open,
  titleHtml,
  body,
  onClose,
}: ContactModalProps) => {
  if (!open) return null

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
        <div className={styles.body}>{body}</div>
        <button
          type="button"
          className={`${styles.close} glassInteractive`}
          onClick={onClose}
        >
          <span>OK</span>
        </button>
      </div>
    </div>
  )
}
