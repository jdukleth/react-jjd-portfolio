import { Ubuntu } from 'next/font/google'
import type { Metadata } from 'next'
import { AppShell } from '@/components/AppShell'
import './globals.css'
import './glass-interactive.css'

const ubuntu = Ubuntu({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-ubuntu',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jason Dukleth | Web Development Portfolio',
  description:
    'Skills, projects & resume for Jason Dukleth Web Development Portfolio',
  icons: { icon: '/favicon.ico' },
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en" className={ubuntu.variable}>
    <body className={`${ubuntu.className} ${ubuntu.variable}`}>
      <AppShell>{children}</AppShell>
    </body>
  </html>
)

export default RootLayout
