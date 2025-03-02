import Image, { ImageProps } from 'next/image'
import React from 'react'

interface ImageHolderProps extends Omit<ImageProps, "src" | "alt"> {
  imageName: string
}

const placeholder = '/images/placeholder.svg'

export default function ImageHolder({ imageName, ...props }: ImageHolderProps) {
  let src = placeholder

  if (imageName != '') {
    src = imageName
  }

  return (
    <Image src={src} placeholder="blur" blurDataURL={placeholder} alt={imageName} {...props} />
  )
}
