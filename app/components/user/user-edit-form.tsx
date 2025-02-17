import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-label"
import { useForm } from "react-hook-form"
import { useSubmit } from "react-router"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { cn } from "~/lib/utils"
import type { User } from "~/model/user"
import ErrorText from "../error-text"

const formSchema = z.object({
  email: z.string().email().max(50),
  name: z.string().min(2).max(50),
  phone: z.string().max(25),
  address: z.string().max(50),
})
  .required()

type FormData = z.infer<typeof formSchema>;

export interface UserEditFormProps extends React.ComponentPropsWithoutRef<"div"> {
  user: User
}

export function UserEditForm({
  className,
  user,
  ...props
}: UserEditFormProps) {
  const submit = useSubmit()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,
    }
  })
  const { register, handleSubmit, formState } = form
  const onSubmit = (values: FormData) => {
    console.log(values)
    submit(values, { method: "POST" })
  }

  return (
    <div className={cn("flex flex-col max-w-md gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Edit User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                <ErrorText name="email" formState={formState} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name"
                  {...register("name")}
                />
                <ErrorText name="name" formState={formState} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="Phone">Phone</Label>
                </div>
                <Input
                  id="phone"
                  placeholder="Phone"
                  {...register("phone")}
                />
                <ErrorText name="phone" formState={formState} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="address">Address</Label>
                </div>
                <Input
                  id="address"
                  placeholder="Address"
                  {...register("address")}
                />
                <ErrorText name="address" formState={formState} />
              </div>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
