import { Button, Group, Loader } from '@mantine/core';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import { IllustrationMeta } from '../types/types';
import Portrait from './Portrait';
import { useEffect, useRef, useState } from 'react';
import { TransactGetCommand } from '@aws-sdk/lib-dynamodb';

interface PortraitsProps {
  keyword: string;
}
const PAGE_SIZE = 20;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Portraits({ keyword }: PortraitsProps) {
  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && typeof previousPageData.lastItem === 'undefined')
      return;
    if (previousPageData && previousPageData.length === 0) return null;
    if (pageIndex === 0)
      return `/api/keywords/${keyword}?pageSize=${PAGE_SIZE}`;
    return `/api/keywords/${keyword}?pageSize=${PAGE_SIZE}&lastItem=${encodeURIComponent(
      JSON.stringify(previousPageData.lastItem)
    )}`;
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

  const prevPos = useRef(-1);
  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);

  const loadMore = (): void => {
    if (
      !illustrationRequests ||
      !size ||
      (!illustrationRequests.length && isValidating)
    )
      return;
    setSize((size) => size + 1);
  };

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const pos = firstEntry.boundingClientRect['y'];
        if (prevPos.current > pos || prevPos.current === -1) {
          setTimeout(() => loadMore(), 100);
        }
        prevPos.current = pos;
      },
      { threshold: 1 }
    );
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return (): void => {
      if (currentElement) {
        currentObserver.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastElement]);

  if (error) return <div>Failed to load</div>;
  if (!illustrationRequests)
    return (
      <div data-testid="loader">
        <Loader />
      </div>
    );

  const illustrations = illustrationRequests.reduce<IllustrationMeta[]>(
    (prev, illustrationRequest) => prev.concat(illustrationRequest.items),
    []
  );

  return (
    <>
      <Group position="center" spacing="md">
        {illustrations.map((meta, i) => (
          <Portrait key={meta.link} meta={meta} />
        ))}
        <div
          style={{ width: 300, height: 300 }}
          ref={(ref) => setLastElement(ref)}
        />
      </Group>
    </>
  );
}
