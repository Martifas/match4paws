/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getUserByAuth0Id } from "@/lib/queries/users";

export async function getUserFromSession(
  req?: NextRequest
): Promise<string | null> {
  const session = await auth0.getSession(req);

  if (!session?.user?.sub) {
    return null;
  }

  const user = await getUserByAuth0Id(session.user.sub);
  return user?.id ?? null;
}

export function createErrorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function createSuccessResponse(data?: any) {
  return NextResponse.json({ success: true, ...data });
}

export async function validateJsonBody<T>(
  req: NextRequest,
  requiredFields: (keyof T)[]
): Promise<T | NextResponse> {
  try {
    const body = (await req.json()) as T;

    for (const field of requiredFields) {
      if (!body[field]) {
        return createErrorResponse(
          `Missing required field: ${String(field)}`,
          400
        );
      }
    }

    return body;
  } catch (error) {
    return createErrorResponse("Invalid JSON body", 400);
  }
}
