import { slug } from 'github-slugger'
import Link from 'next/link'
import { type FC } from 'react'

import { badgeVariants } from './ui/badge'

interface Props {
  tag: string
  current?: boolean
  count?: number
}
export const Tag: FC<Props> = ({ tag, current, count }) => {
  return (
    <Link
      href={`/tags/${slug(tag)}`}
      className={badgeVariants({
        variant: current ? 'default' : 'secondary',
        className: 'rounded-md no-underline',
      })}
    >
      {tag}
    </Link>
  )
}
