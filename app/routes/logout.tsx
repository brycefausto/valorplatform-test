import { destroySession, getSession } from "~/sessions.server"
import type { Route } from "./+types/logout"
import { redirect } from "react-router"

export async function action({
  request,
}: Route.ActionArgs) {
  const session = await getSession(request)
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  })
}


export default function Logout() {
  return (
    <></>
  )
}
