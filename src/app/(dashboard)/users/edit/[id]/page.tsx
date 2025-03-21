import FormLayout from '@/components/layouts/FormLayout'
import { userService } from '@/service/user.service'
import { ParamsWithId } from '@/types'
import { notFound } from 'next/navigation'
import EditUserForm from './EditUserForm'

export default async function EditUserPage({ params }: ParamsWithId) {
  const { id } = await params
  const user = await userService.findOne(id)

  if (!user) {
    notFound()
  }

  return (
    <FormLayout>
      <EditUserForm user={user} />
    </FormLayout>
  )
}
