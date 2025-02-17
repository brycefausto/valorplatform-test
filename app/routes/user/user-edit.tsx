import { data } from 'react-router';
import FormLayout from '~/components/form-layout';
import { UserEditForm } from '~/components/user/user-edit-form';
import { editUser, findUser } from '~/service/user.service';
import type { UserDto } from '~/types/user-types';
import type { Route } from './+types/user-edit';

export async function loader({ params }: Route.LoaderArgs) {
  const userId = params.id
  const user = await findUser(userId)

  if (!user) {
    throw data("User Not Found", { status: 404 });
  }

  return { user }
}

export async function action({
  params,
  request,
}: Route.ActionArgs) {
  const userId = params.id
  let formData = await request.formData()
  let editUserDto = Object.fromEntries(formData.entries()) as UserDto
  const user = await editUser(userId, editUserDto)

  if (!user) {
    throw data("User Not Found", { status: 404 });
  }

  return user
}

export default function UserEdit({ loaderData }: Route.ComponentProps) {
  return (
    <FormLayout backUrl="/users">
      <UserEditForm user={loaderData.user} />
    </FormLayout>
  )
}
