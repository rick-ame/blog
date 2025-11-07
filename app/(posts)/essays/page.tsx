import { type Metadata } from 'next'

import { essays } from '@/.velite'

import { Posts } from '../_components/posts'

export const metadata: Metadata = {
  title: '随笔',
  description: '对于生活的一些思考',
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
      posts={essays}
      currentPage={currentPage}
    />
  )
}
