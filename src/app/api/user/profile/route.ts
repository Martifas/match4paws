import {
  createErrorResponse,
  createSuccessResponse,
  getUserFromSession,
} from "@/lib/utils/apiUtils";
import { getUserById } from "@/lib/queries/users";

export async function GET() {
  try {
    const userId = await getUserFromSession();
    if (!userId) {
      return createErrorResponse("Unauthorized", 401);
    }

    const user = await getUserById(userId);
    if (!user) {
      return createErrorResponse("User not found", 404);
    }

    return createSuccessResponse({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return createErrorResponse("Internal server error", 500);
  }
}
