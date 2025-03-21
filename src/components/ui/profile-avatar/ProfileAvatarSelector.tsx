import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { Icon } from '@iconify/react'
import { ChangeEvent, useRef, useState } from 'react'
import ProfileAvatar, { ProfileAvatarProps } from './ProfileAvatar'
import { BASE_USERS_IMAGE_URL } from '@/config/env'

export interface ProfileAvatarSelectorProps extends ProfileAvatarProps {
  onChangeFile?: (file: File) => void
  onDeleteFile?: (image: string) => void
}

export default function ProfileAvatarSelector({ name, image, onChangeFile, onDeleteFile, ...props }: ProfileAvatarSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [imagePreview, setImagePreview] = useState((image ? BASE_USERS_IMAGE_URL + image : "") || "")
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
    <div className="relative">
      <ProfileAvatar {...props} name={name} src={imagePreview} />
      <Popover showArrow offset={10} placement="bottom">
        <PopoverTrigger>
          <Button ref={buttonRef} className="absolute bottom-1 right-1" color="primary" radius="full" isIconOnly><Icon icon="mdi:camera" width="20" height="20" /></Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px]">
          {() => (
            <div className="px-1 py-2 w-full">
              <div className="mt-2 flex flex-col gap-2 w-full">
                <Button color="primary" onPress={() => inputRef.current?.click()}>Choose Profile Picture</Button>
                {(image || imagePreview) && <Button variant="bordered" color="danger" onPress={handleDelete}>Delete Profile Picture</Button>}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
      <input key={imagePreview} className="hidden" type="file" ref={inputRef} onChange={handleChange} accept="image/*" />
    </div>
  )
}
