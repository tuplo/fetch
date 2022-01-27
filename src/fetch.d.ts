import type { URLSearchParams } from 'url';

export type Headers = URLSearchParams;

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'HEAD';

export type HeadersInit = Record<string, string>;

export type FetchOptions = Partial<{
  body: string;
  headers: HeadersInit;
  method: HttpMethod;
}>;

export type Response<T = unknown> = {
  headers: Headers;
  json: () => Promise<T>;
  ok: boolean;
  status: number;
  statusText: string;
  text: () => Promise<string>;
  url: string | undefined;
};
