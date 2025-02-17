import { Link, useLoaderData } from 'react-router'
import { Button } from '~/components/ui/button'
import UserTable from '~/components/user/user-table'
import { deleteUser, users } from '~/service/user.service';
import type { Route } from './+types/user-page';

export function loader() {
  return users
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const id = formData.get("id") as string | null
  if (id && request.method == "DELETE") {
    await deleteUser(id)
  }
}

export default function UserPage() {
  const users = useLoaderData<typeof loader>()
  return (
    <div className="container p-5">
      <div className="overflow-x-auto">
        <div className="flex p-5">
          <div className="flex">
            <span className="text-2xl font-bold">Users</span>
          </div>
          <div className="flex flex-auto">
          </div>
        </div>
        <UserTable users={users} />
      </div>
    </div>
  )
}
