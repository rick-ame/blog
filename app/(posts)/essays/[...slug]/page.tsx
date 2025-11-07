import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { essays, Post } from '@/.velite'

import { PostContent } from '../../_components/post-content'

interface SlugProps {
  params: Promise<{
    slug: string[]
  }>
}

const getPostFromParams = async (
  params: SlugProps['params'],
  posts: Post[],
) => {
  const slug = (await params).slug?.join('/')
  if (!slug) {
    return undefined
  }
  return posts.find((post) => post.slugAsParams === decodeURI(slug))
}

export async function generateMetadata({
  params,
}: SlugProps): Promise<Metadata> {
  const post = await getPostFromParams(params, essays)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams() {
  return essays.map((post) => ({ slug: post.slug.split('/') }))
}

export default async function Page({ params }: SlugProps) {
  const post = await getPostFromParams(params, essays)

  if (!post || !post.published) {
    notFound()
  }

  return <PostContent post={post} />
}
