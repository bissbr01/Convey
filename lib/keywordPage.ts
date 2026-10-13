import { cacheLife, cacheTag } from 'next/cache';
import type { KeywordPage } from '../types/types';
import { PAGE_SIZE } from './pageSize';

// First page only. A cursor here would cache one caller's slice for everyone.
// Imported in the call so evaluating this module does not construct the Dynamo client.
export async function loadFirstPage(keyword: string): Promise<KeywordPage> {
  'use cache';
  cacheLife('hours');
  cacheTag('keyword:' + keyword);
  const { loadByKeyword } = await import('./loadIllustrations');
  const result = await loadByKeyword(undefined, keyword, String(PAGE_SIZE));
  // null before stringify. JSON.stringify drops undefined, and the client
  // stop condition treats a missing lastItem as "keep going".
  if (!result || !('Items' in result)) {
    throw result instanceof Error ? result : new Error('Query failed');
  }
  return JSON.parse(
    JSON.stringify({
      items: result.Items ?? [],
      lastItem: result.LastEvaluatedKey ?? null,
    })
  ) as KeywordPage;
}
