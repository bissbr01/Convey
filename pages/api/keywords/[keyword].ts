import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { request } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ddbDocClient } from '../../../lib/ddbDocClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const pageSize = 'pageSize' in req.query ? Number(req.query.pageSize) : 20;
    const startKey =
      'lastItem' in req.query && req.query.lastItem
        ? JSON.parse(decodeURIComponent(req.query.lastItem as string))
        : undefined;

    try {
      const params = {
        TableName: process.env.TABLE_NAME,
        Limit: pageSize,
        IndexName: 'Inverted-Index',
        KeyConditionExpression:
          'SK = :keyword and begins_with(PK, :sortKeyPrefix)',
        ExpressionAttributeValues: {
          ':keyword': `Keyword#${req.query.keyword}`,
          ':sortKeyPrefix': 'Illustration#',
        },
        ExclusiveStartKey: startKey,
      };
      // @ts-ignore
      const result = await ddbDocClient.send(new QueryCommand(params));
      return res
        .status(200)
        .json({ items: result.Items, lastItem: result.LastEvaluatedKey });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}
