import { type Metadata } from 'next'

import { MyAvatar } from '@/components/avatar'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Information about me',
}

export default async function Page() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block text-4xl font-black lg:text-5xl">
            About Me
          </h1>
        </div>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="flex max-w-48 min-w-48 flex-col gap-2">
          <MyAvatar />
          <h2 className="text-center text-2xl font-bold">
            {siteConfig.author}
          </h2>
          <p className="text-muted-foreground text-center wrap-break-word">
            Software Developer
          </p>
        </div>
        <ul className="text-muted-foreground py-4 text-lg">
          <li>👋 Hi, I am {siteConfig.author}</li>
          <li>👀 I&apos;m interested in web development</li>
        </ul>
      </div>
    </div>
  )
}
