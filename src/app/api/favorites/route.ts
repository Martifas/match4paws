import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth0 } from "@/lib/auth0";

export async function POST(req: NextRequest) {
  const { petId } = (await req.json()) as { petId: string };
  const session = await auth0.getSession();
  const userId = session.user.sub;

  if (!userId)
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  if (!petId)
    return NextResponse.json({ error: "missing petId" }, { status: 400 });

  await db
    .insertInto("favourites")
    .values({ userId: userId, petId })
    .onConflict((oc) => oc.columns(["userId", "petId"]).doNothing())
    .execute();

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { petId } = (await req.json()) as { petId: string };
  const session = await auth0.getSession();

  if (!session)
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  await db
    .deleteFrom("favourites")
    .where("userId", "=", session.user.id)
    .where("petId", "=", petId)
    .execute();

  return NextResponse.json({ ok: true });
}
