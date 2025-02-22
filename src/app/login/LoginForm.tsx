"use client"

import ErrorText from "@/components/ErrorText"
import { APP_NAME } from "@/config/env"
import { Button, Form, Input, Link } from "@heroui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { loginAction } from "./actions"
import { loginSchema } from "./loginSchema"

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleFormSubmit = handleSubmit(async (data) => {
    setLoading(true)
    const resultState = await loginAction(data)
    if (resultState.error) {
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
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">Log in to your account</h1>
          <p className="text-small text-default-500">to continue to {APP_NAME}</p>
        </div>

        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleFormSubmit}
        >
          <Input
            isRequired
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            {...register("email")}
          />
          {errors.email && (
            <ErrorText>{errors.email?.message}</ErrorText>
          )}
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            {...register("password")}
          />
          {errors?.password && (
            <ErrorText>{errors.password.message}</ErrorText>
          )}
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button className="w-full" color="primary" type="submit" disabled={loading}>
            Sign In
          </Button>
        </Form>
        {/* <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Continue with Google
          </Button>
          <Button
            startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
            variant="bordered"
          >
            Continue with Github
          </Button>
        </div> */}
      </div>
    </div>
  )
}
