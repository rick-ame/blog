import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { posts } from '@/.velite'
import { siteConfig } from '@/config/site'

import { PostContent } from '../../_components/post-content'

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

  return <PostContent post={post} />
}
