import Link from 'next/link'
import { type FC } from 'react'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { Icons } from './icons'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'
import { ThemeToggle } from './theme-toggle'
import { buttonVariants } from './ui/button'

export const Header: FC = () => {
  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-10 w-full border-b backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center p-0!">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'hidden w-10 px-0 sm:inline-flex',
                )}
              >
                <Icons.github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
