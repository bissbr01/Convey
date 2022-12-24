import { Group, Loader } from '@mantine/core';
import useSWR from 'swr';
import InfiniteScroll from 'react-infinite-scroller';
import { IllustrationMeta } from '../types/types';
import Portrait from './Portrait';

interface PortraitsProps {
  keyword: string;
}

export default function Portraits({ keyword }: PortraitsProps) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: illustrations, error } = useSWR<[IllustrationMeta]>(
    `/api/keywords/${keyword}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!illustrations) return <Loader />;
  return (
    <>
      <Group position="center">
        {/* <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={true || false}
          loader={<Loader />}
        > */}
        {illustrations.map((meta) => (
          <Portrait key={meta.link} meta={meta} />
        ))}
        {/* </InfiniteScroll> */}
      </Group>
    </>
  );
}
