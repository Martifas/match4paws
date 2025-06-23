import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId, name, phone, gender, preferredAnimalTypes } =
      await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const now = new Date();

    await db
      .updateTable("users")
      .set({
        onboardingCompleted: true,
        onboardingCompletedAt: now,
        name,
        phone,
        gender,
        preferredAnimalTypes: JSON.stringify(preferredAnimalTypes),
      })
      .where("auth0Id", "=", userId)
      .execute();

    return NextResponse.json({ success: true });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error }, { status: 500 });
  }
}
