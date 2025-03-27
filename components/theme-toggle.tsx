'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { type FC } from 'react'

import { Button } from './ui/button'

export const ThemeToggle: FC = () => {
  const { setTheme, theme, themes } = useTheme()

  return (
    <Button
      variant="ghost"
      className="w-10 px-0"
      onClick={() => {
        if (theme === themes[0]) {
          setTheme(themes[1])
        } else {
          setTheme(themes[0])
        }
      }}
    >
      <Sun className="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  )
}
