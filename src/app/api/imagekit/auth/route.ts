import { imagekit } from '@/config/imagekit';

export async function POST() {
  const authenticationParameters = imagekit.getAuthenticationParameters();

  return Response.json(authenticationParameters)
}