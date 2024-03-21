import { slug } from 'github-slugger'
import { type Metadata } from 'next'

import { PostItem } from '@/app/blog/(components)/post-item'
import { Tag } from '@/components/tag'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from '@/lib/utils'
import { posts } from '#site/content'

interface Props {
  params: {
    tag: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = params

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

export default function Page({ params }: Props) {
  const { tag: currentTag } = params
  const title = currentTag.replaceAll('-', ' ')

  const displayPosts = getPostsByTagSlug(posts, currentTag)
  const tags = getAllTags(posts)
  const sortedTags = sortTagsByCount(tags)

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-black capitalize lg:text-5xl">
            {title}
          </h1>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-12 gap-3">
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
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
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
