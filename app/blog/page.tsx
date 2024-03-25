import { type Metadata } from 'next'
import Link from 'next/link'

import { Tag } from '@/components/tag'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllTags, sortPosts, sortTagsByCount } from '@/lib/utils'
import { posts } from '#site/content'

import { PostItem } from './_components/post-item'
import { QueryPagination } from './_components/query-pagination'

export const metadata: Metadata = {
  title: 'My blog',
  description: 'My personal blog',
}

const POSTS_PER_PAGE = 5

interface Props {
  searchParams: {
    page?: string
  }
}
export default async function Page({ searchParams }: Props) {
  const currentPage = Number(searchParams?.page) || 1
  const sortedPosts = sortPosts(posts.filter((post) => post.published))
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage,
  )

  const tags = getAllTags(posts)
  const sortedTags = sortTagsByCount(tags)

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-black lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">
            My ramblings on all things.
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-12 gap-2">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr className="mt-8" />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((post) => {
                const { slug, date, title, description, tags } = post
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={date}
                      title={title}
                      description={description}
                      tags={tags}
                    />
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>Nothing to see here yet</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="mt-4 justify-end"
          />
        </div>
        <Card className="col-span-12 h-fit sm:col-span-4 sm:col-start-9">
          <CardHeader>
            <CardTitle>
              <Link href="/tags">Tags</Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags.map((tag) => (
              <Tag tag={tag} key={tag} count={tags[tag]} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
