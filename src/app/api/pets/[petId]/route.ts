import { NextRequest } from 'next/server';
import {
  createErrorResponse,
  createSuccessResponse,
  getUserFromSession,
} from '@/lib/utils/apiUtils';

import {
  deletePet,
  updatePet,
  getPetByIdForOwner,
  savePetImageUrls,
} from '@/lib/queries/pets';

interface Params {
  params: Promise<{ petId: string }>;
}

type Body = {
  name?: string;
  type?: string;
  breed?: string | null;
  gender?: string;
  size?: string;
  ageGroup?: string;
  description?: string | null;
  status?: string;
  imageUrls?: string[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function owner(req: NextRequest) {
  const uid = await getUserFromSession();
  if (!uid) throw new Error('401');
  return uid;
}

async function updatePetAndImages(petId: string, ownerId: string, body: Body) {
  const {
    imageUrls = [],
    name,
    type,
    breed,
    gender,
    size,
    ageGroup,
    description,
    status,
  } = body;

  const petData = {
    ...(name !== undefined && { name }),
    ...(type !== undefined && { type }),
    ...(breed !== undefined && { breed }),
    ...(gender !== undefined && { gender }),
    ...(size !== undefined && { size }),
    ...(ageGroup !== undefined && { ageGroup }),
    ...(description !== undefined && { description }),
    ...(status !== undefined && { status }),
  };

  if (Object.keys(petData).length) {
    await updatePet(petId, ownerId, petData);
  }

  await savePetImageUrls(petId, imageUrls);
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const userId = await owner(_req);
    const resolvedParams = await params;
    const pet = await getPetByIdForOwner(resolvedParams.petId, userId);
    if (!pet) return createErrorResponse('Pet not found', 404);

    return createSuccessResponse({ pet });
  } catch (e) {
    return e.message === '401'
      ? createErrorResponse('Unauthorized', 401)
      : createErrorResponse('Internal server error', 500);
  }
}

export async function PUT(req: NextRequest, ctx: Params) {
  return PATCH(req, ctx);
}
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const ownerId = await owner(req);
    const body: Body = await req.json();
    const resolvedParams = await params;

    await updatePetAndImages(resolvedParams.petId, ownerId, body);

    return createSuccessResponse();
  } catch (e) {
    return e.message === '401'
      ? createErrorResponse('Unauthorized', 401)
      : createErrorResponse('Internal server error', 500);
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const ownerId = await owner(req);
    const resolvedParams = await params;
    await deletePet(resolvedParams.petId, ownerId);
    return createSuccessResponse();
  } catch (e) {
    return e.message === '401'
      ? createErrorResponse('Unauthorized', 401)
      : createErrorResponse('Internal server error', 500);
  }
}
