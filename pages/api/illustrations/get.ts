import { GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ddbDocClient } from '../../../lib/ddbDocClient';

export interface IllustrationGetResponse {
  PK: string;
  SK: string;
  date: string;
  image: string;
  keywords: Set<string>;
  text: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      let snippet = req.query.snippet as string;
      snippet = decodeURIComponent(snippet);
      // snippet.replace('\\\\', '\\');
      console.log(req.query);

      const { Item } = await ddbDocClient.send(
        new GetCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            PK: `Illustration#${snippet}`,
            SK: `Meta#${req.query.source}`,
          },
        })
      );
      return res.status(200).json(Item);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}
