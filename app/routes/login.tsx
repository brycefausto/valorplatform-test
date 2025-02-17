import { LoginForm } from "~/components/login-form";
import type { Route } from "./+types/login";
import { loginUser } from "~/service/auth.service";
import type { LoginDto } from "~/types/auth-types";
import { commitSession, getSession } from "~/sessions.server";
import { data, redirect } from "react-router";

export async function action({
  request,
}: Route.ActionArgs) {
  let formData = await request.formData()
  let formDataObject = Object.fromEntries(formData.entries()) as LoginDto

  const user = await loginUser(formDataObject.email, formDataObject.password)
  const session = await getSession(request)

  if (user) {
    session.set("userId", user.id)

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    })
  } else {
    return data(
      {
        error: {
          message: "Invalid email or password",
        }
      }
    );
  }
}

export default function Login() {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-screen-md py-12 px-4 sm:px-6 md:max-w-screen-xl md:py-20 lg:py-32 md:px-8">
        <div className="md:pe-8 md:w-1/2 xl:pe-0 xl:w-5/12">
          <h1 className="text-3xl text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-neutral-200">
            Solving problems for every{" "}
            <span className="text-blue-600 dark:text-blue-500">team</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 dark:text-neutral-500">
            Built on standard web technology, teams use Preline to build beautiful
            cross-platform hybrid apps in a fraction of the time.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="hidden md:block md:absolute md:top-0 md:start-1/2 md:end-0 h-full bg-[url('https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')] bg-no-repeat bg-center bg-cover" />
    </div>
  )
}
