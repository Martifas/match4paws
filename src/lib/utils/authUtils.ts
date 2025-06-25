import { auth0 } from "@/lib/auth0";
import {
  createUser,
  updateLastLogin,
  getUserOnboardingStatus,
} from "@/lib/queries/users";

export async function getAuthenticatedUser() {
  const session = await auth0.getSession();
  return session?.user || null;
}

export async function ensureUserExists(auth0Id: string) {
  await createUser(auth0Id);
}

export async function handleUserSession(auth0Id: string) {
  await Promise.all([ensureUserExists(auth0Id), updateLastLogin(auth0Id)]);

  return await getUserOnboardingStatus(auth0Id);
}
