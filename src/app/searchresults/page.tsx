import { Suspense } from 'react';
import SearchResults from '@/components/search/SearchResults';

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;

  const filters = {
    type: resolvedSearchParams.type as string | undefined,
    gender: resolvedSearchParams.gender as string | undefined,
    size: resolvedSearchParams.size as string | undefined,
    age: resolvedSearchParams.age as string | undefined,
  };

  return (
    <>
      <Suspense fallback={<p className="text-center py-10">Loading…</p>}>
        <SearchResults {...filters} />
      </Suspense>
    </>
  );
}
