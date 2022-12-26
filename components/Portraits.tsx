import { Group, Loader } from '@mantine/core';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import InfiniteScroll from 'react-infinite-scroller';
import { IllustrationMeta } from '../types/types';
import Portrait from './Portrait';
import { useCallback, useEffect, useRef } from 'react';

interface PortraitsProps {
  keyword: string;
}

export default function Portraits({ keyword }: PortraitsProps) {
  const PAGE_SIZE = 20;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    console.log('previous page data: ', previousPageData);
    if (previousPageData && !previousPageData.length) return null;
    if (!previousPageData)
      return `/api/keywords/${keyword}?pageSize=${PAGE_SIZE}`;
    return `/api/keywords/${keyword}?pageSize=${PAGE_SIZE}&lastItem=${previousPageData.lastItem}`;
  };
  const {
    data: illustrationRequests,
    error,
    mutate,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite<{
    items: IllustrationMeta[];
    lastItem: string;
  }>(getKey, fetcher);
  console.log('init size: ', size);

  const loader = useRef(null);
  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setSize(size + 1);
        console.log('size change: ', size);
      }
    },
    []
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  if (error) return <div>Failed to load</div>;
  if (!illustrationRequests) return <Loader />;
  return (
    <>
      <Group position="center" spacing="md">
        {illustrationRequests.map((illustrations) =>
          illustrations.items.map((meta) => (
            <Portrait key={meta.link} meta={meta} />
          ))
        )}
        <div ref={loader} />
      </Group>
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </>
  );
}
