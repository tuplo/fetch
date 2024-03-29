import type { RequestOptions } from "node:http";
import type { URLSearchParams } from "node:url";

export type Headers = URLSearchParams;

export type HttpMethod = "GET" | "POST" | "DELETE" | "PUT" | "HEAD" | "PATCH";

export type HeadersInit = Record<string, string>;

export type FetchOptions = RequestOptions & {
	body?: BodyInit | null;
	headers: HeadersInit;
	method: HttpMethod;
};

export type Response<T = unknown> = {
	headers: Headers;
	json: () => Promise<T>;
	ok: boolean;
	status: number;
	statusText: string;
	text: () => Promise<string>;
	url: string | undefined;
};
