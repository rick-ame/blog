import { type FC } from 'react'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface Props {
  size?: 'lg' | 'sm'
}
export const MyAvatar: FC<Props> = ({ size = 'lg' }) => {
  return (
    <Avatar
      className={cn({
        'size-48': size === 'lg',
        'size-24': size === 'sm',
      })}
    >
      <AvatarImage src={siteConfig.avatar} alt={siteConfig.author} />
      <AvatarFallback>Rick</AvatarFallback>
    </Avatar>
  )
}
