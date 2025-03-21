import { userService } from '@/service/user.service'
import UserList from './UserList'
import { ParamsWithQuery } from '@/types'

export default async function UsersPage({ searchParams }: ParamsWithQuery) {
  const { page = 0, search = "" } = await searchParams
  const data = await userService.findAll({ page, search })

  return (
    <UserList data={data} page={page} search={search} />
  )
}
