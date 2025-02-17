import { createCookieSessionStorage } from "react-router";
import { COOKIE_SECRET } from "./config";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: "__session",
        httpOnly: true,
        maxAge: 3600,
        path: "/",
        secrets: [COOKIE_SECRET],
      },
    }
  );

const getSessionFromRequest = async (request: Request) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  return session
}

export { commitSession, destroySession, getSessionFromRequest as getSession };
