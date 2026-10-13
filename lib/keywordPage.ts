import type { KeywordPage } from '../types/types';

export const PAGE_SIZE = 20;

// First page only. A cursor here would cache one caller's slice for everyone.
// Loaded here so a client import of PAGE_SIZE does not construct the Dynamo client.
export async function loadFirstPage(keyword: string): Promise<KeywordPage> {
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
