import { imagekit } from '@/config/imagekit';

type Params = Promise<{
  name: string
}> 

export async function DELETE(request: Request, { params }: { params: Params }) {
  const { name } = await params
  const result = await imagekit.listFiles({
    searchQuery : `name="${name}"`
  })
  
  if (result.length > 0 && "fileId" in result[0]) {
    await imagekit.deleteFile(result[0].fileId)
  } else {
    return Response.json("Image Not Found", { status: 404 })
  }

  return Response.json("success")
}