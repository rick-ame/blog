import { type Metadata } from 'next'

import { posts } from '@/.velite'
import { Tag } from '@/components/tag'
import { getAllTags, sortTagsByCount } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Tags',
  description: "Topic I've written about",
}

export default async function Page() {
  const tags = getAllTags(posts)
  const sortedTags = sortTagsByCount(tags)

  return (
    <div className="container">
      <h1 className="text-3xl font-black lg:text-4xl">Tags</h1>
      <hr className="my-6" />
      <div className="flex flex-wrap gap-3">
        {sortedTags.map((tag) => (
          <Tag tag={tag} count={tags[tag]} key={tag} />
        ))}
      </div>
    </div>
  )
}
