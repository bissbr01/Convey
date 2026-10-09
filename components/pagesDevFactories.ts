// Next.js 16.4 Turbopack dev seeds each Pages chunk group with /_app's
// availability. A module shared with /_app can be marked available together
// with page-only siblings, and those siblings are never emitted
// (https://github.com/vercel/next.js/issues/99789). Evaluating the dropped
// home-page modules from /_app registers their factories in a chunk / loads.
import {
  BackgroundImage,
  Center,
  Loader,
  Text,
} from '@mantine/core';
import useSWRInfinite from 'swr/infinite';
import KeywordSearch from './KeywordSearch';

export const pagesDevFactories = {
  BackgroundImage,
  Center,
  Loader,
  Text,
  useSWRInfinite,
  KeywordSearch,
};
