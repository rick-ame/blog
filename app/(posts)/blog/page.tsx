import { type Metadata } from 'next'

import { posts } from '@/.velite'

import { Posts } from '../_components/posts'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'My ramblings on all things.',
}

interface Props {
  searchParams: Promise<{
    page?: string
  }>
}
export default async function Page({ searchParams }: Props) {
  const currentPage = Number((await searchParams)?.page) || 1

  return (
    <Posts
      title={metadata.title as string}
      description={metadata.description as string}
      posts={posts}
      currentPage={currentPage}
    />
  )
}
