import { Group } from '@mantine/core';
import useSWRInfinite, {
  SWRInfiniteKeyLoader,
  unstable_serialize,
} from 'swr/infinite';
import { useSWRConfig } from 'swr';
import { IllustrationMeta, KeywordPage } from '../types/types';
import { PAGE_SIZE } from '../lib/keywordPage';
import Portrait from './Portrait';
import { useCallback, useEffect, useRef, useState } from 'react';
import LoadingCircle from './LoadingCircle';

interface PortraitsProps {
  keyword: string;
  firstPage?: KeywordPage;
}

type PageData = {
  items: IllustrationMeta[];
  lastItem: Record<string, unknown> | null;
};

async function fetcher(url: string): Promise<PageData> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${res.status}`);
  return res.json();
}

function upsertByPk(pages: PageData[]): IllustrationMeta[] {
  const indexByPk = new Map<string, number>();
  const items: IllustrationMeta[] = [];
  for (const page of pages) {
    if (!Array.isArray(page?.items)) continue;
    for (const item of page.items) {
      const existing = indexByPk.get(item.PK);
      if (existing === undefined) {
        indexByPk.set(item.PK, items.length);
        items.push(item);
      } else {
        items[existing] = item;
      }
    }
  }
  return items;
}

export default function Portraits({ keyword, firstPage }: PortraitsProps) {
  const { mutate: seedPage } = useSWRConfig();
  const page0Key = `/api/keywords/${keyword}?pageSize=${PAGE_SIZE}`;

  const getKey: SWRInfiniteKeyLoader<PageData> = (
    pageIndex,
    previousPageData
  ) => {
    if (
      previousPageData &&
      (previousPageData.items.length === 0 || previousPageData.lastItem == null)
    ) {
      return null;
    }
    if (pageIndex === 0) return page0Key;
    if (!previousPageData) return null;
    return `/api/keywords/${keyword}?pageSize=${PAGE_SIZE}&lastItem=${encodeURIComponent(
      JSON.stringify(previousPageData.lastItem)
    )}`;
  };

  // fallbackData does not fill the per-page cache setSize reads. An empty
  // $inf$ entry makes that call revalidate every page, including page 0.
  const [seededKey, setSeededKey] = useState<string | null>(null);
  if (firstPage && seededKey !== page0Key) {
    setSeededKey(page0Key);
    void seedPage(page0Key, firstPage, { revalidate: false });
    void seedPage(unstable_serialize(getKey), [firstPage], {
      revalidate: false,
    });
  }

  const {
    data: illustrationRequests,
    error,
    mutate,
    setSize,
    isValidating,
  } = useSWRInfinite<PageData>(
    getKey,
    fetcher,
    firstPage
      ? {
          fallbackData: [firstPage],
          revalidateOnMount: false,
          revalidateIfStale: false,
          revalidateFirstPage: false,
        }
      : undefined
  );

  const intersectingRef = useRef(false);
  const pendingRef = useRef(false);
  const wasValidatingRef = useRef(false);
  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);

  const loadMore = useCallback((): void => {
    if (isValidating || pendingRef.current) return;
    if (!illustrationRequests || illustrationRequests.length === 0 || error) {
      return;
    }
    const lastPage = illustrationRequests[illustrationRequests.length - 1];
    if (!lastPage || lastPage.items.length === 0 || lastPage.lastItem == null) {
      return;
    }
    pendingRef.current = true;
    setSize((current) => current + 1);
  }, [error, illustrationRequests, isValidating, setSize]);

  const loadMoreRef = useRef(loadMore);
  useEffect(() => {
    loadMoreRef.current = loadMore;
  }, [loadMore]);

  useEffect(() => {
    const currentElement = lastElement;
    if (!currentElement) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        intersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) loadMoreRef.current();
      },
      { threshold: 1 }
    );
    observer.observe(currentElement);
    return () => {
      observer.disconnect();
    };
  }, [lastElement]);

  useEffect(() => {
    const finished = wasValidatingRef.current && !isValidating;
    wasValidatingRef.current = isValidating;
    if (!finished) return;
    pendingRef.current = false;
    if (intersectingRef.current) loadMoreRef.current();
  }, [isValidating]);

  if (error && !illustrationRequests) return <div>Failed to load</div>;
  if (!illustrationRequests) {
    return (
      <div data-testid="loader">
        <LoadingCircle />
      </div>
    );
  }

  const illustrations = upsertByPk(illustrationRequests);

  return (
    <>
      <Group justify="center" gap="md" data-testid="portraits">
        {illustrations.map((meta) => (
          <Portrait key={meta.PK} meta={meta} />
        ))}
        <div
          style={{ width: 300, height: 300 }}
          ref={(node) => setLastElement(node)}
        />
      </Group>
      {error ? (
        <button
          type="button"
          onClick={() => {
            void mutate();
          }}
        >
          Failed to load
        </button>
      ) : null}
    </>
  );
}
