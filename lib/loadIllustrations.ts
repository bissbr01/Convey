import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './ddbDocClient';

function isString(data: any): data is string {
  return typeof data !== 'undefined' && data && typeof data === 'string';
}

type NextAPIGeneralArg = string | string[] | undefined | null;

export const loadByKeyword = async (
  lastItem: NextAPIGeneralArg,
  keyword: NextAPIGeneralArg,
  pageSize: NextAPIGeneralArg
) => {
  const startKey = isString(lastItem)
    ? JSON.parse(decodeURIComponent(lastItem))
    : undefined;
  const key = isString(keyword) ? keyword : '';

  // Clamp the client-supplied page size to a sane range so a caller can't drive
  // up DynamoDB read costs with an arbitrarily large Limit (cost-amplification).
  const DEFAULT_PAGE_SIZE = 20;
  const MAX_PAGE_SIZE = 100;
  const parsedPageSize = isString(pageSize) ? Number(pageSize) : NaN;
  const limitSize =
    Number.isFinite(parsedPageSize) && parsedPageSize > 0
      ? Math.min(Math.floor(parsedPageSize), MAX_PAGE_SIZE)
      : DEFAULT_PAGE_SIZE;

  try {
    const params = {
      TableName: process.env.TABLE_NAME,
      Limit: limitSize,
      IndexName: 'Inverted-Index',
      KeyConditionExpression:
        'SK = :keyword and begins_with(PK, :sortKeyPrefix)',
      ExpressionAttributeValues: {
        ':keyword': `Keyword#${key}`,
        ':sortKeyPrefix': 'Illustration#',
      },
      ExclusiveStartKey: startKey,
    };
    const result = await ddbDocClient.send(new QueryCommand(params));
    return result;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return e;
    }
  }
};
