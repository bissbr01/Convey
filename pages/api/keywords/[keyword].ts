import type { NextApiRequest, NextApiResponse } from 'next';
import { loadByKeyword } from '../../../lib/loadIllustrations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const result = await loadByKeyword(
        req.query.lastItem,
        req.query.keyword,
        req.query.pageSize
      );
      if (result && 'Items' in result) {
        return res
          .status(200)
          .json({ items: result.Items, lastItem: result.LastEvaluatedKey });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        res.status(400).json(error.message);
      }
    }
  }
}
