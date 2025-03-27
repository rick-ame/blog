import Link from 'next/link'

import { MyAvatar } from '@/components/avatar'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn, sortPosts } from '@/lib/utils'
import { posts } from '#site/content'

import { PostItem } from './blog/_components/post-item'

export default function Home() {
  const latestPosts = sortPosts(posts.filter((post) => post.published)).slice(
    0,
    5,
  )

  return (
    <>
      <section className="space-y-6 pt-6 pb-8 md:mt-10 md:pb-12 lg:py-32">
        <div className="container flex flex-col gap-4 text-center">
          <h1 className="bg-gradient-to-br from-black to-blue-500 bg-clip-text text-3xl font-black text-balance text-transparent sm:text-5xl md:text-6xl lg:text-7xl dark:bg-blue-500 dark:bg-none">
            Hello, I&apos;m {siteConfig.author}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-[42rem] text-balance sm:text-xl">
            Welcome to my blog. Built using tailwind, shadcn, velite and Nextjs
            14.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/blog"
              className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-fit')}
            >
              View my blog
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'w-full sm:w-fit',
              )}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section className="mt-8 mb-16 flex justify-center md:mt-0">
        <MyAvatar size="sm" />
      </section>
      <section className="container flex max-w-4xl flex-col space-y-6 py-6 lg:py-10">
        <h2 className="text-center text-3xl font-black md:text-5xl">
          Latest Posts
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map((post) => (
            <li key={post.slug} className="first:border-border first:border-t">
              <PostItem
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
