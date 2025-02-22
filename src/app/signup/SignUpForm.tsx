"use client";

import ErrorText from "@/components/ErrorText";
import { Button, Checkbox, Input, Link } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signUpAction } from "./actions";
import { signUpSchema } from "./signUpSchema";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema),
  })

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const handleFormSubmit = handleSubmit(async (data) => {
    setLoading(true)
    const resultState = await signUpAction(data)
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
        <p className="pb-4 text-left text-3xl font-semibold">
          Sign Up
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
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
            labelPlacement="outside"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            {...register("password")}
          />
          {errors.password && (
            <ErrorText>{errors.password?.message}</ErrorText>
          )}
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
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
            label="Confirm Password"
            labelPlacement="outside"
            placeholder="Confirm your password"
            type={isConfirmVisible ? "text" : "password"}
            variant="bordered"
            {...register("password")}
          />
          {errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword?.message}</ErrorText>
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
          <Checkbox isRequired className="py-4" size="sm">
            I agree with the&nbsp;
            <Link href="#" size="sm">
              Terms
            </Link>
            &nbsp; and&nbsp;
            <Link href="#" size="sm">
              Privacy Policy
            </Link>
          </Checkbox>
          <Button color="primary" type="submit" disabled={loading}>
            Sign Up
          </Button>
        </form>
        <p className="text-center text-small">
          <Link href="/" size="sm">
            Already have an account? Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
