import { type FC, type PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

interface Props {
  type?: 'default' | 'warning' | 'danger'
}
export const Callout: FC<PropsWithChildren<Props>> = ({
  children,
  type = 'default',
  ...props
}) => {
  return (
    <div
      className={cn(
        'my-6 w-full items-start rounded-md border border-l-4 p-4 dark:max-w-none',
        {
          'dark:prose border-red-900 bg-red-50': type === 'danger',
          'dark:prose border-yellow-900 bg-yellow-50': type === 'warning',
        },
      )}
      {...props}
    >
      <div>{children}</div>
    </div>
  )
}
