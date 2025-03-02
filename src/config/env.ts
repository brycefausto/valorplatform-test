export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "App Name"

export const IMAGE_KIT_PUBLIC_KEY = process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY || ''
export const IMAGE_KIT_PRIVATE_KEY = process.env.PRIVATE_KEY || ''
export const IMAGE_KIT_URL = process.env.NEXT_PUBLIC_IMAGE_KIT_URL || ''
export const IMAGE_KIT_FOLDER = process.env.NEXT_PUBLIC_IMAGE_KIT_FOLDER || ''
export const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_KIT_URL + IMAGE_KIT_FOLDER || ''
export const BASE_USERS_IMAGE_FOLDER = IMAGE_KIT_FOLDER + "/users/"
export const BASE_ITEMS_IMAGE_FOLDER = IMAGE_KIT_FOLDER + "/items/"
export const BASE_USERS_IMAGE_URL = BASE_IMAGE_URL + "/users/"
export const BASE_ITEMS_IMAGE_URL = BASE_IMAGE_URL + "/items/"
