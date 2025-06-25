import { NextRequest } from "next/server";
import { addFavorite, removeFavorite } from "@/lib/queries/favorites";
import {
  getUserFromSession,
  createErrorResponse,
  createSuccessResponse,
  validateJsonBody,
} from "@/lib/utils/apiUtils";

type FavoriteRequestBody = {
  petId: string;
};

export async function POST(req: NextRequest) {
  try {
    const bodyOrError = await validateJsonBody<FavoriteRequestBody>(req, [
      "petId",
    ]);
    if (bodyOrError instanceof Response) {
      return bodyOrError;
    }

    const { petId } = bodyOrError;

    const userId = await getUserFromSession(req);
    if (!userId) {
      return createErrorResponse("Unauthorized", 401);
    }

    await addFavorite(userId, petId);

    return createSuccessResponse();
  } catch (error) {
    console.error("Error adding favorite:", error);
    return createErrorResponse("Internal server error", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const bodyOrError = await validateJsonBody<FavoriteRequestBody>(req, [
      "petId",
    ]);
    if (bodyOrError instanceof Response) {
      return bodyOrError;
    }

    const { petId } = bodyOrError;

    const userId = await getUserFromSession(req);
    if (!userId) {
      return createErrorResponse("Unauthorized", 401);
    }

    await removeFavorite(userId, petId);

    return createSuccessResponse();
  } catch (error) {
    console.error("Error removing favorite:", error);
    return createErrorResponse("Internal server error", 500);
  }
}
