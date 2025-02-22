"use client"

import ErrorText from "@/components/ErrorText"
import { AppUser } from "@/model/user"
import { Button, Input } from "@heroui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { updateUserSchema } from "./UpdateUserSchema"
import { updateUserAction } from "./actions"

export interface EditUserFormProps {
  user: AppUser
}

export default function EditUserForm({ user }: EditUserFormProps) {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,
    }
  })

  const handleFormSubmit = handleSubmit(async (data) => {
    setLoading(true)
    const resultState = await updateUserAction(user.id, data)
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
  })

  return (
    <div className="flex w-full pt-20 items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <p className="pb-4 text-left text-3xl font-semibold">
          Edit User
        </p>
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
  )
}
