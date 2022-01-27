import type { Headers } from './fetch.d';

export function fromRawHeaders(rawHeaders: string[]): Headers {
  const headers = rawHeaders.reduce((acc, _, index, array) => {
    if (index % 2 === 0) {
      const entry = array.slice(index, index + 2);
      acc.push(entry);
    }

    return acc;
  }, [] as string[][]);

  return new URLSearchParams(headers) as Headers;
}
