import { NextRequest } from 'next/server';
import {
  createErrorResponse,
  createSuccessResponse,
  getUserFromSession,
} from '@/lib/utils/apiUtils';

import { getUserById, updateUserProfile } from '@/lib/queries/users';

export async function GET() {
  try {
    const userId = await getUserFromSession();
    if (!userId) return createErrorResponse('Unauthorized', 401);

    const user = await getUserById(userId);
    if (!user) return createErrorResponse('User not found', 404);

    return createSuccessResponse({ user });
  } catch (e) {
    console.error('Error fetching user profile:', e);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const userId = await getUserFromSession();
    if (!userId) return createErrorResponse('Unauthorized', 401);

    const { name, phone, address } = await req.json();

    await updateUserProfile(userId, { name, phone, address });
    return createSuccessResponse();
  } catch (e) {
    console.error('Error updating profile:', e);
    return createErrorResponse('Internal server error', 500);
  }
}
