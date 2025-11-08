import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { type FC } from 'react'

import { Tag } from '@/components/tag'
import { buttonVariants } from '@/components/ui/button'
import { cn, formatDate } from '@/lib/utils'

const MAX_DESCRIPTION_LENGTH = 150

interface Props {
  slug: string
  title: string
  description?: string
  date: string
  tags?: string[]
}
export const PostItem: FC<Props> = ({
  slug,
  title,
  description,
  date,
  tags,
}) => {
  return (
    <article className="border-border flex flex-col gap-2 border-b py-4">
      <div>
        <h2 className="text-2xl font-bold">
          <Link href={'/' + slug}>{title}</Link>
        </h2>
      </div>
      <div className="flex gap-2">
        {tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      {description && (
        <p className="text-muted-foreground">
          {description.length > MAX_DESCRIPTION_LENGTH
            ? description.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
            : description}
        </p>
      )}
      <div className="flex items-center justify-between">
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="flex items-center gap-1 text-sm font-medium sm:text-base">
            <Calendar className="size-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
        </dl>
        <Link
          href={'/' + slug}
          className={cn(buttonVariants({ variant: 'link' }))}
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}
