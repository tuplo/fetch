/* eslint-disable no-underscore-dangle */
import type {
	DefaultBodyType,
	MockedResponse,
	ResponseComposition,
	RestContext,
	RestRequest,
} from "msw";
import { rest } from "msw";

import { cancelDelay, delay } from "./helpers/delay";
import { getHeaders, getQuery } from "./helpers/request";

interface IRequestData {
	body?: string;
	headers: Record<string, string>;
	method: string;
	query: Record<string, string>;
}

export function handler(
	req: RestRequest<DefaultBodyType>,
	res: ResponseComposition<DefaultBodyType>,
	ctx: RestContext
): MockedResponse<DefaultBodyType> | Promise<MockedResponse<DefaultBodyType>> {
	const { method, url } = req;
	const { pathname } = url;
	const headers = getHeaders(req);
	const query = getQuery(req);

	const dec = new TextDecoder("utf-8");
	// @ts-expect-error _body is typed private
	const body = dec.decode(req._body as Uint8Array);

	const data: IRequestData = {
		headers,
		method,
		query,
	};

	if (body) {
		data.body = body;
	}

	if (pathname === "/delay" && query.ms) {
		return delay(Number(query.ms)).then(() => res(ctx.json(data)));
	}
	if (pathname === "/cancel-delay") {
		cancelDelay();
	}

	return res(ctx.json(data));
}

export const handlers = [
	rest.get("http://localhost/json", handler),
	rest.post("http://localhost/json", handler),
	rest.head("http://localhost/head", handler),
	rest.get("http://localhost/delay", handler),
	rest.get("http://localhost/cancel-delay", handler),
];
