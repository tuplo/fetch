import type {
  RestRequest,
  DefaultRequestBody,
  ResponseComposition,
  RestContext,
  MockedResponse,
} from 'msw';
import { URL } from 'url';

type Request = RestRequest<DefaultRequestBody>;

type Headers = Record<string, string>;
function getHeaders(req: Request) {
  return [...req.headers.entries()].reduce((acc, [key, value]) => {
    if (key === 'x-msw-request-id') return acc;
    if (value === '') return acc;

    acc[key] = value;
    return acc;
  }, {} as Headers);
}

function getQuery(req: Request) {
  const { url } = req;
  const { searchParams } = url as URL;

  return [...searchParams.entries()].reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
}

export function handler(
  req: RestRequest<DefaultRequestBody>,
  res: ResponseComposition<DefaultRequestBody>,
  ctx: RestContext
):
  | MockedResponse<DefaultRequestBody>
  | Promise<MockedResponse<DefaultRequestBody>> {
  const { body, method } = req;

  const headers = getHeaders(req);
  const query = getQuery(req);

  const data = {
    body,
    headers,
    method,
    query,
  };

  return res(ctx.json(data));
}
