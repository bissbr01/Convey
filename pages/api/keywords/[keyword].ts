import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ddbDocClient } from '../../../lib/ddbDocClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { Items } = await ddbDocClient.send(
        new QueryCommand({
          TableName: process.env.TABLE_NAME,
          Limit: 20,
          IndexName: 'Inverted-Index',
          KeyConditionExpression:
            'SK = :keyword and begins_with(PK, :sortKeyPrefix)',
          ExpressionAttributeValues: {
            ':keyword': `Keyword#${req.query.keyword}`,
            ':sortKeyPrefix': 'Illustration#',
          },
        })
      );
      return res.status(200).json(Items);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}
