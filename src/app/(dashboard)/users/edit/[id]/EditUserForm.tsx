"use client"

import ErrorText from "@/components/ErrorText"
import { AppUser } from "@/model/user"
import { Button, Input, Select, SelectItem } from "@heroui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { UpdateUserData, updateUserSchema } from "./UpdateUserSchema"
import { updateUserAction } from "./actions"
import { deleteImage, uploadImage } from "@/lib/imagekitLib"
import { BASE_USERS_IMAGE_FOLDER } from "@/config/env"
import ProfileAvatarSelector from "@/components/ui/profile-avatar/ProfileAvatarSelector"
import { useUserContext } from "@/store/user.store"
import { useRouter } from "next/navigation"
import Loader from "@/components/Loader"
import { userRoles } from "@/model/user"

export interface EditUserFormProps {
  user: AppUser
}

export default function EditUserForm({ user }: EditUserFormProps) {
  const { user: appUser, setUser } = useUserContext((s) => s)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | undefined | null>()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      address: user.address,
    }
  })

  const handleFormSubmit = handleSubmit(async (data: UpdateUserData) => {
    setLoading(true)
    try {
      if (imageFile) {
        const result = await uploadImage(imageFile, BASE_USERS_IMAGE_FOLDER, user.image)
        data.image = result.name
      }

      if (imageFile === null && user.image) {
        data.image = undefined
        await deleteImage(user.image)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message, {
        position: "bottom-center",
        hideProgressBar: true,
        theme: "colored",
      })
    }
    const resultState = await updateUserAction(user.id, data)
    if (appUser?.id == user.id) {
      setUser({ ...user, ...data })
    }
    if (resultState.message) {
      toast.success(resultState.message, {
        position: "bottom-center",
        hideProgressBar: true,
        theme: "colored",
      })
    } else if (resultState.error) {
      toast.error(resultState.error, {
        position: "bottom-center",
        hideProgressBar: true,
        theme: "colored",
      })
    }
    setLoading(false)
    router.back()
  })

  const handleDeleteImage = async () => {
    setImageFile(null)
  }

  return (
    <Loader loading={loading}>
      <div className="flex w-full pt-20 items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
          <p className="pb-4 text-left text-3xl font-semibold">
            Edit User
          </p>
          <div className="flex items-center gap-4 p-4">
            <ProfileAvatarSelector name={user?.name} image={user?.image} className="h-32 w-32" size="lg" isBordered onChangeFile={setImageFile} onDeleteFile={handleDeleteImage} />
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            <Input
              isRequired
              label="Name"
              labelPlacement="outside"
              placeholder="Enter your name"
              type="text"
              variant="bordered"
              {...register("name")}
            />
            {errors.name && (
              <ErrorText>{errors.name?.message}</ErrorText>
            )}
            <Input
              isRequired
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
              {...register("email")}
            />
            {errors.email && (
              <ErrorText>{errors.email?.message}</ErrorText>
            )}
            <Select variant={"bordered"} label="Role" labelPlacement="outside" placeholder="Role" isRequired {...register("role")}>
              {userRoles.map(value => (
                <SelectItem key={value}>{value}</SelectItem>
              ))}
            </Select>
            {errors.role && (
              <ErrorText>{errors.role?.message}</ErrorText>
            )}
            <Input
              label="Phone"
              labelPlacement="outside"
              placeholder="Enter your phone number"
              type="text"
              variant="bordered"
              {...register("phone")}
            />
            {errors.phone && (
              <ErrorText>{errors.phone?.message}</ErrorText>
            )}
            <Input
              label="Address"
              labelPlacement="outside"
              placeholder="Enter your address"
              type="text"
              variant="bordered"
              {...register("address")}
            />
            {errors.address && (
              <ErrorText>{errors.address?.message}</ErrorText>
            )}
            <Button color="primary" type="submit" disabled={loading}>
              Save
            </Button>
          </form>
        </div>
      </div>
    </Loader>
  )
}
