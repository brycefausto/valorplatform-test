import { AppUser } from '@/model/user'
import { Avatar, AvatarProps } from '@heroui/react'

export interface ProfileAvatarProps extends AvatarProps {
  user: AppUser | null | undefined
}

const DEFAULT_PROFILE_IMAGE = "/images/avatar_placeholder.png"

export default function ProfileAvatar({ user, ...props }: ProfileAvatarProps) {
  return (
    <Avatar
      {...props}
      name={user?.name}
      src={user?.image || DEFAULT_PROFILE_IMAGE}
    />
  )
}
