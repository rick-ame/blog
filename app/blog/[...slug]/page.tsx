import './_components/mdx.css'

import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Tag } from '@/components/tag'
import { siteConfig } from '@/config/site'
import { posts } from '#site/content'

import { MDXContent } from './_components/mdx-content'

interface Props {
  params: Promise<{
    slug: string[]
  }>
}
async function getPostFromParams(params: Props['params']) {
  const slug = (await params).slug?.join('/')
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

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slugAsParams.split('/') }))
}

export default async function Page({ params }: Props) {
  const post = await getPostFromParams(params)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <article className="prose dark:prose-invert container mx-auto max-w-3xl py-6">
      <h1 className="mb-2">{post.title}</h1>
      <div className="mb-2 flex gap-2">
        {post.tags?.map((tag) => <Tag tag={tag} key={tag} />)}
      </div>
      {post.description ? (
        <p className="text-muted-foreground mt-0 text-xl">{post.description}</p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  )
}
