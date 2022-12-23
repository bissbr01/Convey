import { Dispatch, SetStateAction } from 'react';
import Keywords from './Keywords';
import { SearchBar } from './SearchBar';

interface KeywordSearchProps {
  setKeyword: Dispatch<SetStateAction<string>>;
}

export default function KeywordSearch({ setKeyword }: KeywordSearchProps) {
  return (
    <>
      <SearchBar />
      <Keywords setKeyword={setKeyword} />
    </>
  );
}
