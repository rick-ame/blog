import { type FC, type PropsWithChildren } from 'react'

import { Badge } from '@/components/ui/badge'

export const Tag: FC<PropsWithChildren> = ({ children }) => {
  return <Badge className="bg-green-600">{children}</Badge>
}
