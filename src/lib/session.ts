import "server-only"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { userService } from "@/service/user.service"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
  const sessionCookies = await cookies()

  sessionCookies.set("session", session, {
    httpOnly: true,
    secure: false,
    expires: expiresAt,
  })
}

export async function deleteSession() {
  (await cookies()).delete("session")
}

type SessionPayload = {
  userId: string
  expiresAt: Date
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch {
    console.log("Failed to verify session")
  }
}

export async function getUserFromSession(session: string | undefined = "") {
  try {
    const payload = await decrypt(session)

    if (payload) {
      const id = payload.userId as string | undefined

      if (id) {
        const user = await userService.findUser(id)

        return user
      }
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("JWT Error: " + error.message)
  }
}
