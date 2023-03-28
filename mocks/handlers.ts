import { rest } from 'msw';
import { collegeKeyword } from './collegeKeyword';

export const handlers = [
  rest.post('https://dynamodb.us-east-1.amazonaws.com/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(collegeKeyword));
  }),

  rest.get('/api/keywords/:keyword', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const { keyword } = req.params;
    if (keyword === 'college') {
      return res(ctx.status(200), ctx.json(collegeKeyword));
    }
    return res(ctx.status(400));
  }),
];
