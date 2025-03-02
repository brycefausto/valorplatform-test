import { BASE_USERS_IMAGE_URL } from '@/config/env'
import { Avatar, AvatarProps } from '@heroui/react'
import { useMemo } from 'react'

export interface ProfileAvatarProps extends AvatarProps {
  name?: string
  image?: string | null
}

const DEFAULT_PROFILE_IMAGE = "/images/avatar_placeholder.png"

export default function ProfileAvatar({ name, image, src, ...props }: ProfileAvatarProps) {
  const imageSrc = useMemo(() => src ? src : (image ? BASE_USERS_IMAGE_URL + image : ""), [image, src])
  return (
    <Avatar
      {...props}
      name={name}
      src={imageSrc || DEFAULT_PROFILE_IMAGE}
    />
  )
}
