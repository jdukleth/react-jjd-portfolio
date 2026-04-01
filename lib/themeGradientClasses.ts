import theme from '@/components/theme.module.css'

const GRADIENT_TEXT: Record<string, string> = {
  gradient1: theme.gradient1,
  gradient2: theme.gradient2,
  gradient3: theme.gradient3,
  gradient4: theme.gradient4,
}

const GRADIENT_REVEAL: Record<string, string> = {
  gradient1: theme.reveal1,
  gradient2: theme.reveal2,
  gradient3: theme.reveal3,
  gradient4: theme.reveal4,
}

export const gradientTextClass = (themeClass: string) =>
  GRADIENT_TEXT[themeClass] ?? theme.gradient1

export const skillRevealClass = (themeClass: string) =>
  GRADIENT_REVEAL[themeClass] ?? theme.reveal1
