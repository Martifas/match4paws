import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth0 } from '@/lib/auth0';

async function getUserUuid(auth0Id: string | undefined) {
  if (!auth0Id) return null;
  const row = await db
    .selectFrom('users')
    .select(['id'])
    .where('auth0Id', '=', auth0Id)
    .executeTakeFirst();
  return row?.id ?? null;
}

export async function POST(req: NextRequest) {
  const { petId } = (await req.json()) as { petId: string };
  const session = await auth0.getSession();
  const userUuid = await getUserUuid(session?.user?.sub);

  if (!userUuid)
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  if (!petId)
    return NextResponse.json({ error: 'missing petId' }, { status: 400 });

  await db
    .insertInto('favourites')
    .values({ userId: userUuid, petId })
    .onConflict(oc => oc.columns(['userId', 'petId']).doNothing())
    .execute();

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { petId } = (await req.json()) as { petId: string };
  const session = await auth0.getSession();
  const userUuid = await getUserUuid(session?.user?.sub);

  if (!userUuid)
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  await db
    .deleteFrom('favourites')
    .where('userId', '=', userUuid)
    .where('petId', '=', petId)
    .execute();

  return NextResponse.json({ ok: true });
}
