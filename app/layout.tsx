import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Writer',
  description: 'My Personal blog about writing',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
