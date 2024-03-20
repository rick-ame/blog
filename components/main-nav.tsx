'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { Icons } from './icons'

export const MainNav: FC = () => {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="me-6 flex items-center space-x-2">
        <Icons.logo className="size-6" />
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      <Link
        href="/blog"
        className={cn(
          'hidden text-sm font-medium transition-colors hover:text-primary sm:inline-flex',
          pathname === '/blog' ? 'text-foreground' : 'text-foreground/60',
        )}
      >
        Blog
      </Link>
      <Link
        href="/about"
        className={cn(
          'hidden text-sm font-medium transition-colors hover:text-primary sm:inline-flex',
          pathname === '/about' ? 'text-foreground' : 'text-foreground/60',
        )}
      >
        About
      </Link>
    </nav>
  )
}
