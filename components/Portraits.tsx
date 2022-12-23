import { Group, Loader } from '@mantine/core';
import useSWR from 'swr';
import { IllustrationMeta } from '../types/types';
import Portrait from './Portrait';

interface PortraitsProps {
  keyword: string;
}

export default function Portraits({ keyword }: PortraitsProps) {
  const fetcher = () => fetch(keyword).then((res) => res.json());
  const {
    data: illustrations,
    error,
    isLoading,
  } = useSWR<[IllustrationMeta]>('/api/keywords/', fetcher);

  if (!illustrations) return <Loader />;
  return (
    <>
      <Group>
        {illustrations.map((meta) => (
          <Portrait key={meta.SK} meta={meta} />
        ))}
      </Group>
    </>
  );
}
