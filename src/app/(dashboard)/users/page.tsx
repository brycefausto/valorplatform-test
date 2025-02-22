import { userService } from '@/service/user.service'
import UserList from './UserList'

export default async function UsersPage() {
  const users = await userService.getUsers()

  return (
    <UserList users={users} />
  )
}
