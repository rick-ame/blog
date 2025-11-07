import { FC } from 'react'

import { Post } from '@/.velite'
import { Tag } from '@/components/tag'

import { MDXContent } from './mdx/mdx-content'

interface Props {
  post: Post
}
export const PostContent: FC<Props> = ({ post }) => {
  return (
    <article className="prose dark:prose-invert container max-w-3xl!">
      <h1 className="mb-4 text-3xl">{post.title}</h1>
      <div className="mb-2 flex gap-2">
        {post.tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      {post.description ? (
        <p className="text-muted-foreground mt-0">{post.description}</p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  )
}
