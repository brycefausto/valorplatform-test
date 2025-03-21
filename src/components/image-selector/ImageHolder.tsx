import { Image, ImageProps } from '@heroui/react'
import React from 'react'

const placeholder = '/images/placeholder.svg'

export default function ImageHolder({ src: srcProp, alt, ...props }: ImageProps) {
  const src = srcProp || placeholder

  return (
    <Image src={src} placeholder="blur" alt={alt} radius="none" {...props} />
  )
}
