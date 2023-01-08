import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { NextApiRequest } from 'next';
import { ddbDocClient } from './ddbDocClient';

function isString(data: any): data is string {
  return typeof data === 'string';
}

export const loadByKeyword = async (req: NextApiRequest) => {
  const startKey =
    'lastItem' in req.query && isString(req.query.lastItem)
      ? JSON.parse(decodeURIComponent(req.query.lastItem))
      : undefined;
  const keyword =
    'keyword' in req.query && isString(req.query.keyword)
      ? req.query.keyword
      : '';
  const pageSize =
    'pageSize' in req.query && isString(req.query.pageSize)
      ? Number(req.query.pageSize)
      : 20;

  try {
    const params = {
      TableName: process.env.TABLE_NAME,
      Limit: pageSize,
      IndexName: 'Inverted-Index',
      KeyConditionExpression:
        'SK = :keyword and begins_with(PK, :sortKeyPrefix)',
      ExpressionAttributeValues: {
        ':keyword': `Keyword#${keyword}`,
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
