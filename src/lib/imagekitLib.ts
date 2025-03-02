import axios from "axios";

export async function uploadImage(file: File, folder: string, oldImageName?: string) {
  const formData = new FormData()
  formData.set('file', file)
  formData.set('fileName', file.name)
  formData.set('folder', folder)
  if (oldImageName) {
    formData.set('oldImageName', oldImageName)
  }
  const { data } = await axios.post('/api/imagekit/upload', formData)

  return data
}

export async function deleteImage(name: string) {
  console.log("Deleting image")
  const { data } = await axios.delete(`/api/imagekit/delete/${name}`) as { data: string }

  return data
}
