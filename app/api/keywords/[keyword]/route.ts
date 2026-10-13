import { loadByKeyword } from '../../../../lib/loadIllustrations';

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

export async function GET(
  request: Request,
  context: { params: Promise<{ keyword: string }> }
) {
  const { keyword } = await context.params;
  const url = new URL(request.url); // request-time. Read this before any query.
  try {
    const result = await loadByKeyword(
      url.searchParams.get('lastItem'),
      keyword,
      url.searchParams.get('pageSize')
    );
    if (result && 'Items' in result) {
      const body: { items: unknown; lastItem?: unknown } = { items: result.Items };
      if (result.LastEvaluatedKey !== undefined) body.lastItem = result.LastEvaluatedKey;
      return Response.json(body);
    }
    throw result instanceof Error ? result : new Error('Query failed');
  } catch (error) {
    console.error('GET /api/keywords/[keyword] failed:', error);
    return Response.json({ error: 'Failed to load illustrations' }, { status: 500 });
  }
}
