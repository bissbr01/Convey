'use client';

import { Group } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { SetStateAction, useState } from 'react';
import { KeywordAndWeight } from '../types/types';
import Keywords from './Keywords';
import SearchBar from './SearchBar';
import keywordsReduced from '../public/keywords/keywords_w_weights_reduced.json';

interface KeywordSearchProps {
  keyword: string;
}

export default function KeywordSearch({ keyword }: KeywordSearchProps) {
  const router = useRouter();
  const [keywords, setKeywords] = useState<KeywordAndWeight[]>(
    keywordsReduced as KeywordAndWeight[]
  );

  const setKeyword = (next: SetStateAction<string>) => {
    const value = typeof next === 'function' ? next(keyword) : next;
    router.replace('/?q=' + encodeURIComponent(value));
  };

  return (
    <>
      <Group justify="center">
        <SearchBar setKeywords={setKeywords} keywords={keywords} />
      </Group>
      <Keywords keyword={keyword} setKeyword={setKeyword} keywords={keywords} />
    </>
  );
}
