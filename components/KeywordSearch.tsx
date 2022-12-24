import { Dispatch, SetStateAction } from 'react';
import Keywords from './Keywords';
import { SearchBar } from './SearchBar';

interface KeywordSearchProps {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

export default function KeywordSearch({
  keyword,
  setKeyword,
}: KeywordSearchProps) {
  return (
    <>
      <SearchBar />
      <Keywords keyword={keyword} setKeyword={setKeyword} />
    </>
  );
}
