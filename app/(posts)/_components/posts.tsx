import Link from 'next/link'
import { type FC } from 'react'

import { Post } from '@/.velite'
import { PostItem } from '@/components/post-item'
import { Tag } from '@/components/tag'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, getAllTags, sortPosts, sortTagsByCount } from '@/lib/utils'

import { QueryPagination } from './query-pagination'

const POSTS_PER_PAGE = 5

interface Props {
  title: string
  description?: string
  posts?: Post[]
  currentPage: number
}
export const Posts: FC<Props> = async ({
  title,
  description,
  posts = [],
  currentPage,
}) => {
  const sortedPosts = sortPosts(posts.filter((post) => post.published))

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage,
  )

  const tags = getAllTags(posts)
  const sortedTags = sortTagsByCount(tags)

  return (
    <div className="container">
      <h1 className="text-3xl font-black lg:text-4xl">{title}</h1>
      <p className="text-muted-foreground mt-4 text-xl">{description}</p>
      <div className="mt-2 grid grid-cols-12 gap-4">
        <div
          className={cn(
            'col-span-12 col-start-1',
            sortedTags.length ? 'sm:col-span-8' : '',
          )}
        >
          <hr className="mt-4" />
          {displayPosts.length ? (
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
            <p className="mt-4">Nothing to see here yet</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="mt-4 justify-end"
          />
        </div>
        {sortedTags.length ? (
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
        ) : null}
      </div>
    </div>
  )
}
