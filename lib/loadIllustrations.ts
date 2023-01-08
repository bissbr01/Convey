import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { NextApiRequest } from 'next';
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
  const limitSize = isString(pageSize) ? Number(pageSize) : 20;

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
