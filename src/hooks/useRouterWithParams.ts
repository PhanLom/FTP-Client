'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export interface SetQueryOptions {
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean; // kept for possible future extension
}

type QueryValue = string | number | boolean | null | undefined;
type PartialQuery = Record<string, QueryValue>;

export function useRouterWithParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const query = useMemo(() => {
    const obj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }, [searchParams]);

  const buildUrl = useCallback(
    (next: PartialQuery) => {
      const sp = new URLSearchParams(searchParams.toString());
      Object.entries(next).forEach(([k, v]) => {
        if (v === undefined || v === null || v === '') sp.delete(k);
        else sp.set(k, String(v));
      });
      const qs = sp.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [searchParams, pathname],
  );

  const setQuery = useCallback(
    (partial: PartialQuery, options?: SetQueryOptions) => {
      const url = buildUrl(partial);
      if (options?.replace) router.replace(url, { scroll: options.scroll });
      else router.push(url, { scroll: options?.scroll });
    },
    [buildUrl, router],
  );

  const replaceQuery = useCallback(
    (partial: PartialQuery, options?: Omit<SetQueryOptions, 'replace'>) => {
      setQuery(partial, { ...options, replace: true });
    },
    [setQuery],
  );

  return { router, query, setQuery, replaceQuery };
}
