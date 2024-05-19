import Image from 'next/image'
import { type FC } from 'react'
import * as runtime from 'react/jsx-runtime'

import { Callout } from './callout'
import { Tag } from './tag'

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

const components = {
  Image,
  Callout,
  Tag,
}

interface Props {
  code: string
}
export const MDXContent: FC<Props> = ({ code }) => {
  const Component = useMDXComponent(code)
  return <Component components={components} />
}
