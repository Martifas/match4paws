import { db } from '@/lib/db';
import { UpdateOnboardingRequest } from '@/lib/types/onboarding';

export type User = {
  id: string;
  auth0Id: string;
  name?: string;
  email?: string;
  phone?: string;
  userType?: string;
  onboardingCompleted: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
};

export async function getUserByAuth0Id(
  auth0Id: string
): Promise<{ id: string } | null> {
  return (
    (await db
      .selectFrom('users')
      .select(['id'])
      .where('auth0Id', '=', auth0Id)
      .executeTakeFirst()) || null
  );
}

export async function getUserById(id: string): Promise<User | null> {
  return (
    (await db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst()) || null
  );
}

export async function createUser(auth0Id: string): Promise<void> {
  await db
    .insertInto('users')
    .values({ auth0Id })
    .onConflict(oc => oc.column('auth0Id').doNothing())
    .execute();
}

export async function updateLastLogin(auth0Id: string): Promise<void> {
  await db
    .updateTable('users')
    .set({ lastLoginAt: new Date() })
    .where('auth0Id', '=', auth0Id)
    .execute();
}

export async function getUserOnboardingStatus(
  auth0Id: string
): Promise<boolean> {
  const result = await db
    .selectFrom('users')
    .select(['onboardingCompleted'])
    .where('auth0Id', '=', auth0Id)
    .executeTakeFirst();

  return result?.onboardingCompleted ?? false;
}

export async function updateUserOnboarding(
  data: UpdateOnboardingRequest
): Promise<void> {
  const { userId, ...updateData } = data;

  await db
    .updateTable('users')
    .set({
      onboardingCompleted: true,
      onboardingCompletedAt: new Date(),
      ...updateData,
    })
    .where('auth0Id', '=', userId)
    .execute();
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Pick<User, 'name' | 'email' | 'phone'>>
): Promise<void> {
  await db.updateTable('users').set(updates).where('id', '=', userId).execute();
}
