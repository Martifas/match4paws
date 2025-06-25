import { NextRequest } from "next/server";
import {
  createErrorResponse,
  createSuccessResponse,
  getUserFromSession,
} from "@/lib/utils/apiUtils";
import { 
  deletePet, 
  updatePet,
  getPetById 
} from "@/lib/queries/pets";

type Params = {
  params: {
    petId: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const userId = await getUserFromSession();
    if (!userId) {
      return createErrorResponse("Unauthorized", 401);
    }

    const pet = await getPetByIdForOwner(params.petId, userId);
    if (!pet) {
      return createErrorResponse("Pet not found", 404);
    }

    return createSuccessResponse({ pet });
  } catch (error) {
    console.error("Error fetching pet:", error);
    return createErrorResponse("Internal server error", 500);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const userId = await getUserFromSession();
    if (!userId) {
      return createErrorResponse("Unauthorized", 401);
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
      status: body.status,
    };

    await updatePet(params.petId, userId, petData);

    // Handle new image URLs if any
    const imageUrls = body.imageUrls || [];
    if (imageUrls.length > 0) {
      await savePetImageUrls(params.petId, imageUrls);
    }

    return createSuccessResponse();
  } catch (error) {
    console.error("Error updating pet:", error);
    return createErrorResponse("Internal server error", 500);
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const userId = await getUserFromSession();
    if (!userId) {
      return createErrorResponse("Unauthorized", 401);
    }

    await deletePet(params.petId, userId);
    return createSuccessResponse();
  } catch (error) {
    console.error("Error deleting pet:", error);
    return createErrorResponse("Internal server error", 500);
  }