import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Writer',
  description: 'My Personal blog about writing',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn('min-h-screen bg-background antialiased', font.className)}
      >
        <div className="relative flex min-h-dvh flex-col bg-background">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}
