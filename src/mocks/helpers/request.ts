import type { DefaultBodyType, RestRequest } from "msw";

type Request = RestRequest<DefaultBodyType>;

type Headers = Record<string, string>;
export function getHeaders(req: Request) {
	return Array.from(req.headers.entries()).reduce((acc, [key, value]) => {
		if (key === "x-msw-request-id") return acc;
		if (value === "") return acc;

		acc[key] = value;
		return acc;
	}, {} as Headers);
}

export function getQuery(req: Request) {
	const { url } = req;
	const { searchParams } = url as URL;

	return Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
		acc[key] = value;
		return acc;
	}, {} as Record<string, string>);
}
