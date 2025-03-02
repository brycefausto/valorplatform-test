import { imagekit } from "@/config/imagekit"
import { NextResponse } from "next/server"

export async function uploadImage(file?: File | null, fileName?: string | null, folder?: string | null) {
    if (!file || !fileName || !folder) {
      return NextResponse.json("Image Not Found", { status: 404 })
    }
  
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
  
    const res = await imagekit.upload({
      file: buffer,
      fileName,
      folder
    })
  
    console.log("Uploaded image")
  
    return NextResponse.json(res)
}

export async function deleteImage(name: string) {
  const result = await imagekit.listFiles({
    searchQuery : `name="${name}"`
  })
  
  if (result.length > 0 && "fileId" in result[0]) {
    await imagekit.deleteFile(result[0].fileId)
  } else {
    return NextResponse.json("Image Not Found", { status: 404 })
  }

  return NextResponse.json("success")
}