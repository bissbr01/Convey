import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../../../../lib/ddbDocClient';

function methodNotAllowed() {
  return Response.json(
    { error: 'Method Not Allowed' },
    { status: 405, headers: { Allow: 'GET' } }
  );
}

// Next's automatic 405 is not the wire contract. The body and Allow are both required.
// These are not real handlers. Do not implement POST.
// HEAD and OPTIONS are exported for the same reason. The route.js page (16.4.0) says
// that if OPTIONS is not defined, Next implements it and sets Allow from the other
// exported methods. Those would be GET, POST, PUT, PATCH, and DELETE, so Allow would
// advertise the four methods that return 405, and the body would not be the JSON above.
export const HEAD = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const snippet = url.searchParams.get('snippet');
  const source = url.searchParams.get('source');
  if (snippet === null || source === null) {
    return Response.json(
      { error: 'snippet and source query params are required' },
      { status: 400 }
    );
  }
  try {
    const decodedSnippet = decodeURIComponent(snippet); // once, matching today's handler
    const { Item } = await ddbDocClient.send(
      new GetCommand({
        TableName: process.env.TABLE_NAME,
        Key: { PK: `Illustration#${decodedSnippet}`, SK: `Meta#${source}` },
      })
    );
    if (!Item) {
      return Response.json({ error: 'Illustration not found' }, { status: 404 });
    }
    return Response.json(Item);
  } catch (error) {
    console.error('GET /api/illustrations/get failed:', error);
    return Response.json({ error: 'Failed to load illustration' }, { status: 500 });
  }
}
