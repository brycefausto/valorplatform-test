import { NextRequest } from 'next/server'
import { deleteImage, uploadImage } from '../actions'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as File
  const fileName = data.get('fileName') as string
  const folder = data.get('folder') as string
  const oldImageName = data.get('oldImageName') as string

  if (oldImageName) {
    const deleteRes = await deleteImage(oldImageName)

    if (!deleteRes.ok) {
      console.log(await deleteRes.text())
    }
  }

  const uploadRes = await uploadImage(file, fileName, folder)

  return uploadRes
}