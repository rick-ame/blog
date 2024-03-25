'use client'

import { ThemeProvider } from 'next-themes'
import { type FC, type PropsWithChildren } from 'react'

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
