import { Suspense } from "react";
import SearchResults from "@/components/search/SearchResults";

export default function SearchResultsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filters = {
    type: searchParams.type as string | undefined,
    gender: searchParams.gender as string | undefined,
    size: searchParams.size as string | undefined,
    age: searchParams.age as string | undefined,
  };

  return (
    <>
      <Suspense fallback={<p className="text-center py-10">Loading…</p>}>
        <SearchResults {...filters} />
      </Suspense>
    </>
  );
}
