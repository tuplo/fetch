import { rest } from 'msw';
import type {
	RestRequest,
	DefaultBodyType,
	ResponseComposition,
	RestContext,
	MockedResponse,
} from 'msw';

import { getHeaders, getQuery } from './helpers/request';
import { delay, cancelDelay } from './helpers/delay';

export function handler(
	req: RestRequest<DefaultBodyType>,
	res: ResponseComposition<DefaultBodyType>,
	ctx: RestContext
): MockedResponse<DefaultBodyType> | Promise<MockedResponse<DefaultBodyType>> {
	const { body, method, url } = req;
	const { pathname } = url;
	const headers = getHeaders(req);
	const query = getQuery(req);

	const data = {
		body,
		headers,
		method,
		query,
	};

	if (pathname === '/delay' && query.ms) {
		return delay(Number(query.ms)).then(() => res(ctx.json(data)));
	}
	if (pathname === '/cancel-delay') {
		cancelDelay();
	}

	return res(ctx.json(data));
}

export const handlers = [
	rest.get('http://localhost/json', handler),
	rest.post('http://localhost/json', handler),
	rest.head('http://localhost/head', handler),
	rest.get('http://localhost/delay', handler),
	rest.get('http://localhost/cancel-delay', handler),
];
