import { http, HttpResponse } from "msw";

import { cancelDelay, delay } from "./helpers/delay";

interface IRequestData {
	body?: string;
	headers: Record<string, string>;
	method: string;
	query: Record<string, string>;
}

async function handler(args: { request: Request }) {
	const { request } = args;
	const { url, method } = request;

	const uri = new URL(url);
	const body = await request.text();
	const query = Object.fromEntries(uri.searchParams.entries());
	const headers: Record<string, string> = {};
	request.headers.forEach((value, key) => {
		headers[key] = value;
	});

	const data: IRequestData = {
		headers,
		method,
		query,
	};

	if (body) {
		data.body = body;
	}

	if (uri.pathname === "/delay" && uri.searchParams.get("ms")) {
		const ms = Number(uri.searchParams.get("ms"));
		return delay(ms).then(() => HttpResponse.json(data));
	}

	if (uri.pathname === "/cancel-delay") {
		cancelDelay();
	}

	return HttpResponse.json(data);
}

export const handlers = [
	http.get("http://localhost/json", handler),
	http.post("http://localhost/json", handler),
	http.head("http://localhost/head", handler),
	http.get("http://localhost/delay", handler),
	http.get("http://localhost/cancel-delay", handler),
];
