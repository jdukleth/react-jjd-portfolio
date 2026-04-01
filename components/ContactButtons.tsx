'use client'

import { useCallback, useState } from 'react'
import styles from './ContactButtons.module.css'
import { ContactModal } from './ContactModal'
import type { Nameplate } from '@/stores/usePortfolioStore'
import {
  IconEmail,
  IconGithub,
  IconLinkedin,
  IconPhone,
} from '@/components/icons'

const iconFor = (mdi: string) => {
  switch (mdi) {
    case 'mdi-github':
      return IconGithub
    case 'mdi-linkedin':
      return IconLinkedin
    case 'mdi-phone':
      return IconPhone
    case 'mdi-email':
      return IconEmail
    default:
      return IconGithub
  }
}

type ModalPayload = { titleHtml: string; body: string }

export const ContactButtons = ({ nameplate }: { nameplate: Nameplate }) => {
  const [modal, setModal] = useState<ModalPayload | null>(null)

  const close = useCallback(() => setModal(null), [])

  return (
    <div className={styles.row}>
      {nameplate.contactButtons.map((button, index) => {
        const Icon = iconFor(button.icon)
        if (button.type === 'link') {
          return (
            <a
              key={index}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} glassInteractive glassInteractiveRound`}
              aria-label={button.url}
            >
              <Icon size={32} />
            </a>
          )
        }
        if (button.type === 'phone') {
          const phoneNumber = button.phoneNumber
          const tagline = button.tagline ?? ''
          const payload: ModalPayload = {
            titleHtml: `<a href="tel:${phoneNumber}">${phoneNumber}</a>`,
            body: tagline,
          }
          return (
            <button
              key={index}
              type="button"
              className={`${styles.btn} glassInteractive glassInteractiveRound`}
              aria-label="Phone"
              onClick={() => setModal(payload)}
            >
              <Icon size={32} />
            </button>
          )
        }
        if (button.type === 'email') {
          const email = button.email
          const tagline = button.tagline ?? ''
          const payload: ModalPayload = {
            titleHtml: `<a href="mailto:${email}">${email}</a>`,
            body: tagline,
          }
          return (
            <button
              key={index}
              type="button"
              className={`${styles.btn} glassInteractive glassInteractiveRound`}
              aria-label="Email"
              onClick={() => setModal(payload)}
            >
              <Icon size={32} />
            </button>
          )
        }
        return null
      })}
      <ContactModal
        open={modal !== null}
        titleHtml={modal?.titleHtml ?? ''}
        body={modal?.body ?? ''}
        onClose={close}
      />
    </div>
  )
}
