import { Button, ImageProps, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { Icon } from '@iconify/react'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import ImageHolder from './ImageHolder'


export interface ImageSelectorProps extends Omit<ImageProps, "src"> {
  baseUrl: string
  image?: string,
  required?: boolean,
  onChangeFile?: (file: File) => void
  onDeleteFile?: (image: string) => void
}

export default function ImageSelector({ baseUrl, image, required, onChangeFile, onDeleteFile, ...props }: ImageSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const imageUrl = useMemo(() => (image ? baseUrl + image : "") || "", [image, baseUrl])
  const [imagePreview, setImagePreview] = useState((image ? baseUrl + image : "") || "")

  useEffect(() => setImagePreview(imageUrl), [imageUrl])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files.length) {
      const file = files[0]
      const fileUrl = URL.createObjectURL(file)

      setImagePreview(fileUrl)
      onChangeFile?.(file)
    }
    buttonRef.current?.click()
  }
  const handleDelete = () => {
    setImagePreview("")
    if (image) {
      onDeleteFile?.(image)
    }
  }

  return (
    <div className="group relative" style={{ width: props.width, height: props.height }}>
      <ImageHolder src={imagePreview} {...props} />
      <Popover showArrow offset={10} placement="bottom">
        <PopoverTrigger>
          <Button ref={buttonRef} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" color="primary" radius="full" isIconOnly><Icon icon="mdi:camera" width="20" height="20" /></Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px]">
          {() => (
            <div className="px-1 py-2 w-full">
              <div className="mt-2 flex flex-col gap-2 w-full">
                <Button color="primary" onPress={() => inputRef.current?.click()}>Choose Profile Picture</Button>
                {(!required && (image || imagePreview)) && <Button variant="bordered" color="danger" onPress={handleDelete}>Delete Profile Picture</Button>}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
      <input key={imagePreview} className="hidden" type="file" ref={inputRef} onChange={handleChange} accept="image/*" />
    </div>
  )
}
