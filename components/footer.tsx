import { Mail } from 'lucide-react'

import { siteConfig } from '@/config/site'

import { Icons } from './icons'

export function Footer() {
  return (
    <footer>
      <div className="mt-14 mb-6 flex flex-col items-center">
        <div className="flex space-x-4">
          <a
            target="_blank"
            rel="noreferrer"
            href={`mailto:${siteConfig.email}`}
          >
            <span className="sr-only">Mail</span>
            <Mail className="h-6 w-6" />
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            <span className="sr-only">GitHub</span>
            <Icons.github className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  )
}
