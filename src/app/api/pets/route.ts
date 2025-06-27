import { NextRequest } from 'next/server';
import {
  createErrorResponse,
  createSuccessResponse,
  getUserFromSession,
} from '@/lib/utils/apiUtils';
import { createPet, getUserPets, savePetImageUrls } from '@/lib/queries/pets';

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserFromSession();
    if (!userId) {
      return createErrorResponse('Unauthorized', 401);
    }

    const url = new URL(req.url);
    const search = url.searchParams;

    const page = Math.max(1, Number(search.get('page') ?? '1'));
    const limit = Math.max(1, Number(search.get('limit') ?? '9'));
    const chips = (search.get('filters') ?? '')
      .split(',')
      .filter(Boolean)
      .map(c => c.toLowerCase());

    const allPets = await getUserPets(userId);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matchesChipSet = (pet: any) => {
      if (chips.length === 0) return true;

      return chips.every(f => {
        switch (f) {
          case 'cat':
          case 'dog':
            return pet.type?.toLowerCase() === f;
          case 'female':
          case 'male':
            return pet.gender?.toLowerCase() === f;
          case 'small':
          case 'medium':
          case 'large':
            return pet.size?.toLowerCase() === f;
          case 'baby':
          case 'young':
          case 'adult':
          case 'senior':
            return pet.ageGroup?.toLowerCase() === f;
          default:
            return true;
        }
      });
    };

    const filtered = allPets.filter(matchesChipSet);
    const totalCount = filtered.length;

    const start = (page - 1) * limit;
    const pets = filtered.slice(start, start + limit);

    return createSuccessResponse({ pets, totalCount });
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
