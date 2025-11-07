import { slug } from 'github-slugger'
import { type Metadata } from 'next'
import Link from 'next/link'

import { posts } from '@/.velite'
import { PostItem } from '@/components/post-item'
import { Tag } from '@/components/tag'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from '@/lib/utils'

interface Props {
  params: Promise<{
    tag: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params

  return {
    title: tag,
    description: `Posts on the topic of ${tag}`,
  }
}

export function generateStaticParams() {
  const tags = getAllTags(posts)
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }))
  return paths
}

export default async function Page({ params }: Props) {
  const { tag: currentTag } = await params
  const title = currentTag.replaceAll('-', ' ')

  const displayPosts = getPostsByTagSlug(posts, currentTag)
  const tags = getAllTags(posts)
  const sortedTags = sortTagsByCount(tags)

  return (
    <div className="container">
      <h1 className="text-3xl font-black capitalize lg:text-4xl">{title}</h1>
      <div className="mt-4 grid grid-cols-12 gap-4">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr className="my-6" />
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
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>
              <Link href="/tags">Tags</Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags.map((tag) => (
              <Tag
                tag={tag}
                key={tag}
                count={tags[tag]}
                current={slug(tag) === currentTag}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
