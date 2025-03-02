import React, { ChangeEvent, useState } from 'react'
import ImageHolder from './ImageHolder'
import { Input } from '@heroui/react'


export interface ImageSelectorProps {
  name: string
  baseUrl: string
  imageName?: string,
  onChangeFile?: (file: File) => void
}

export default function ImageSelector({ name, baseUrl, imageName, onChangeFile }: ImageSelectorProps) {
  const imageUrl = imageName ? baseUrl + imageName : ''
  const [imagePreview, setImagePreview] = useState(imageUrl || '')
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files.length) {
      const file = files[0]
      const fileUrl = URL.createObjectURL(file)

      setImagePreview(fileUrl)
      onChangeFile?.(file)
    }
  }

  return (
    <div>
      <ImageHolder imageName={imagePreview} width={250} height={250} className='h-250 w-250' />
      <div className="mb-2 block">
        <label htmlFor="image">Upload image</label>
      </div>
      <Input name={name} type="file" id="imageUpload" accept="image/png, image/jpeg" onChange={handleChange} />
    </div>
  )
}
