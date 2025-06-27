import { NextRequest } from 'next/server';
import { searchPetsSlice } from '@/lib/queries/pets';

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;

  const page = Number(p.get('page') ?? '1');
  const limit = Number(p.get('limit') ?? '12');

  const filters = {
    type: p.get('type') ?? undefined,
    gender: p.get('gender') ?? undefined,
    size: p.get('size') ?? undefined,
    age: p.get('age') ?? undefined,
  };

  const { pets, totalCount } = await searchPetsSlice(filters, page, limit);
  return Response.json({ pets, totalCount });
}
