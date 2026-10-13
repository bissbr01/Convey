import { cacheLife, cacheTag } from 'next/cache';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './ddbDocClient';

export interface StoryCard {
  image: string;
  date: string;
  text: string;
  sourceHref: string;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

// Strings only. The raw GetItem carries Set-typed fields that cannot cross to a client.
export async function loadStoryCard(
  snippet: string,
  source: string
): Promise<StoryCard | null> {
  'use cache';
  cacheLife('hours');
  cacheTag('illustration:' + snippet);
  let result;
  try {
    result = await ddbDocClient.send(
      new GetCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          PK: `Illustration#${snippet}`,
          SK: `Meta#${source}`,
        },
      })
    );
  } catch (error) {
    throw error instanceof Error ? error : new Error('Query failed');
  }
  if (!result || result instanceof Error) {
    throw result instanceof Error ? result : new Error('Query failed');
  }
  if (!result.Item) return null;
  const item = result.Item;
  const sk = asString(item.SK);
  return JSON.parse(
    JSON.stringify({
      image: asString(item.image),
      date: asString(item.date),
      text: asString(item.text),
      sourceHref: 'https://' + sk.slice(13),
    })
  ) as StoryCard;
}
