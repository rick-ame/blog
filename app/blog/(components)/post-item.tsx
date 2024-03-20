import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { type FC } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn, formatDate } from '@/lib/utils'

interface Props {
  slug: string
  title: string
  description?: string
  date: string
}
export const PostItem: FC<Props> = ({ slug, title, description, date }) => {
  return (
    <article className="flex flex-col gap-2 border-b border-border py-3">
      <div>
        <h2 className="text-2xl font-bold">
          <Link href={slug}>{title}</Link>
        </h2>
      </div>
      <div className="max-w-none text-muted-foreground">{description}</div>
      <div className="flex items-center justify-between">
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="flex items-center gap-1 text-sm font-medium sm:text-base">
            <Calendar className="size-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
        </dl>
        <Link
          href={slug}
          className={cn(buttonVariants({ variant: 'link' }), 'py-0')}
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}
