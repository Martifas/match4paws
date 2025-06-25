import { NextRequest } from "next/server";
import {
  addFavorite,
  removeFavorite,
  getUserFavoritedPets,
} from "@/lib/queries/favorites";
import {
  getUserFromSession,
  createErrorResponse,
  createSuccessResponse,
  validateJsonBody,
} from "@/lib/utils/apiUtils";

type FavoriteRequestBody = {
  petId: string;
};

export async function GET() {
  try {
    const userId = await getUserFromSession();
    if (!userId) {
      return createErrorResponse("Unauthorized", 401);
    }

    const favoritedPets = await getUserFavoritedPets(userId);

    return createSuccessResponse({ pets: favoritedPets });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return createErrorResponse("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const bodyOrError = await validateJsonBody<FavoriteRequestBody>(req, [
      "petId",
    ]);
    if (bodyOrError instanceof Response) {
      return bodyOrError;
    }

    const { petId } = bodyOrError;

    const userId = await getUserFromSession();
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

    const userId = await getUserFromSession();
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
