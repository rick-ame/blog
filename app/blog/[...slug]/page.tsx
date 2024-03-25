import './_components/mdx.css'

import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Tag } from '@/components/tag'
import { siteConfig } from '@/config/site'
import { posts } from '#site/content'

import { MDXContent } from './_components/mdx-content'

interface Props {
  params: {
    slug: string[]
  }
}
async function getPostFromParams(params: Props['params']) {
  const slug = params.slug?.join('/')
  return posts.find((post) => post.slugAsParams === slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
  }
}

export async function generateStaticParams(): Promise<Props['params'][]> {
  return posts.map((post) => ({ slug: post.slugAsParams.split('/') }))
}

export default async function Page({ params }: Props) {
  const post = await getPostFromParams(params)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <article className="container prose mx-auto max-w-3xl py-6 dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>
      <div className="mb-2 flex gap-2">
        {post.tags?.map((tag) => <Tag tag={tag} key={tag} />)}
      </div>
      {post.description ? (
        <p className="mt-0 text-xl text-muted-foreground">{post.description}</p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  )
}
