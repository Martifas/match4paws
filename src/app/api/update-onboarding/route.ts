import { NextRequest } from "next/server";
import { updateUserOnboarding } from "@/lib/queries/users";
import { UpdateOnboardingRequest } from "@/lib/types/onboarding";
import {
  createErrorResponse,
  createSuccessResponse,
  validateJsonBody,
} from "@/lib/utils/apiUtils";

export async function POST(req: NextRequest) {
  try {
    const bodyOrError = await validateJsonBody<UpdateOnboardingRequest>(req, [
      "userId",
    ]);
    if (bodyOrError instanceof Response) {
      return bodyOrError;
    }

    await updateUserOnboarding(bodyOrError);

    return createSuccessResponse();
  } catch (error) {
    console.error("Error updating onboarding:", error);
    return createErrorResponse("Failed to complete onboarding", 500);
  }
}
