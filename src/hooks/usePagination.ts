'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type UsePaginationProps = {
  totalPages: number;
  defaultPage?: number;
  scrollToTop?: boolean;
};

export function usePagination({
  totalPages,
  defaultPage = 1,
  scrollToTop = false,
}: UsePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = useMemo(() => {
    const pageParam = searchParams.get('page');
    const page = pageParam ? Number(pageParam) : defaultPage;

    return Math.min(Math.max(1, page), Math.max(1, totalPages));
  }, [searchParams, defaultPage, totalPages]);

  const setPage = useCallback(
    (page: number) => {
      const validPage = Math.min(Math.max(1, page), Math.max(1, totalPages));

      const params = new URLSearchParams(searchParams.toString());

      if (validPage > 1) {
        params.set('page', String(validPage));
      } else {
        params.delete('page');
      }

      const newUrl = `?${params.toString()}`;
      router.replace(newUrl, { scroll: scrollToTop });
    },
    [searchParams, router, totalPages, scrollToTop]
  );

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  }, [currentPage, totalPages, setPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  }, [currentPage, setPage]);

  const firstPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const lastPage = useCallback(() => {
    setPage(totalPages);
  }, [setPage, totalPages]);

  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  return {
    currentPage,
    totalPages,
    setPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    canGoNext,
    canGoPrev,

    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    hasMultiplePages: totalPages > 1,
  };
}

export function useFilterPagination({
  totalPages,
  defaultPage = 1,
  resetPageOnFilterChange = true,
}: UsePaginationProps & { resetPageOnFilterChange?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = useMemo(() => {
    const pageParam = searchParams.get('page');
    const page = pageParam ? Number(pageParam) : defaultPage;
    return Math.min(Math.max(1, page), Math.max(1, totalPages));
  }, [searchParams, defaultPage, totalPages]);

  const setParam = useCallback(
    (
      key: string,
      value: string | null,
      resetPage = resetPageOnFilterChange
    ) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      if (resetPage && key !== 'page') {
        params.delete('page');
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, resetPageOnFilterChange]
  );

  const setPage = useCallback(
    (page: number) => {
      setParam('page', page > 1 ? String(page) : null, false);
    },
    [setParam]
  );

  return {
    currentPage,
    totalPages,
    setPage,
    setParam,
    searchParams,

    resetFilters: useCallback(() => {
      router.replace(window.location.pathname, { scroll: false });
    }, [router]),
  };
}
