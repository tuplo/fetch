import type { Response, FetchOptions, HttpMethod } from './fetch.d';
import { request } from './request';
import { timeout } from './timeout';

export type { Response, FetchOptions, HttpMethod };

export default async function fetch<T = unknown>(
  url: string,
  options?: Partial<FetchOptions>
): Promise<Response<T>> {
  if (!options?.timeout) {
    return request<T>(url, options);
  }

  const controller = new AbortController();
  const reqOptions = {
    ...options,
    signal: controller.signal,
  };

  const result = await Promise.race([
    request<T>(url, reqOptions),
    timeout(controller, options?.timeout || 30_000),
  ]);

  // @ts-expect-error Object is of type 'unknown'.
  if (result?.timeout) {
    throw new Error(`@tuplo/fetch: request timed out, ${url}}`);
  }

  controller.abort();

  return result as Response<T>;
}
