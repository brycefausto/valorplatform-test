import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-label"
import { useForm } from "react-hook-form"
import { Link, useSubmit } from "react-router"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { cn } from "~/lib/utils"
import ErrorText from "./error-text"

const formSchema = z.object({
  email: z.string().email().max(50),
  name: z.string().min(2).max(50),
  password: z.string().min(6).max(25),
  confirmPassword: z.string().min(6).max(25),
  phone: z.string().max(25),
  address: z.string().max(50),
})
  .required()
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type FormData = z.infer<typeof formSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const submit = useSubmit()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })
  const { register, handleSubmit, formState } = form
  const onSubmit = (values: FormData) => {
    console.log(values)
    submit(values, { method: "POST" })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
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
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                <ErrorText name="password" formState={formState} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
                <ErrorText name="confirmPassword" formState={formState} />
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
                Register
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
