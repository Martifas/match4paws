import Header from "@/components/ui/containers/Header";

import { Suspense } from "react";
import SearchResults from "@/components/search/SearchResults";
import BackButton from "@/components/ui/buttons/BackButton";

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
      <Header
        left={<BackButton />}
        center={
          <h1 className="text-lg font-semibold tracking-wide select-none">
            Search results
          </h1>
        }
      />

      <Suspense fallback={<p className="text-center py-10">Loading…</p>}>
        <SearchResults {...filters} />
      </Suspense>
    </>
  );
}
