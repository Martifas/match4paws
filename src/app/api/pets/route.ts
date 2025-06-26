import { NextRequest } from 'next/server';
import {
  createErrorResponse,
  createSuccessResponse,
  getUserFromSession,
} from '@/lib/utils/apiUtils';
import { createPet, getUserPets, savePetImageUrls } from '@/lib/queries/pets';

export async function GET() {
  try {
    const userId = await getUserFromSession();
    if (!userId) {
      return createErrorResponse('Unauthorized', 401);
    }

    const pets = await getUserPets(userId);
    return createSuccessResponse({ pets });
  } catch (error) {
    console.error('Error fetching pets:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserFromSession();
    if (!userId) {
      return createErrorResponse('Unauthorized', 401);
    }

    const body = await req.json();

    const petData = {
      name: body.name,
      type: body.type,
      breed: body.breed || null,
      gender: body.gender,
      size: body.size,
      ageGroup: body.ageGroup,
      description: body.description || null,
    };

    if (
      !petData.name ||
      !petData.type ||
      !petData.gender ||
      !petData.size ||
      !petData.ageGroup
    ) {
      return createErrorResponse('Missing required fields', 400);
    }

    const petId = await createPet(userId, petData);

    const imageUrls = body.imageUrls || [];
    if (imageUrls.length > 0) {
      await savePetImageUrls(petId, imageUrls);
    }

    return createSuccessResponse({ petId });
  } catch (error) {
    console.error('Error creating pet:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
