import './mdx.css'

import Image from 'next/image'
import { type FC } from 'react'
import * as runtime from 'react/jsx-runtime'

import { Callout } from './callout'

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

const components = {
  Image,
  Callout,
}

interface Props {
  code: string
}
export const MDXContent: FC<Props> = ({ code }) => {
  const Component = useMDXComponent(code)
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={components} />
}
