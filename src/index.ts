import http from 'http';
import https from 'https';
import { URL } from 'url';
import type { RequestOptions } from 'https';
import type { OutgoingHttpHeaders } from 'http';

import { fromRawHeaders } from './headers';

export type { Response, BodyInit, HeadersInit } from './fetch.d';

export type FetchOptions = {
  body: BodyInit;
  headers: HeadersInit;
  method: string;
};

export default async function fetch<T>(
  url: string,
  options?: Partial<FetchOptions>
): Promise<Response> {
  const { protocol, hostname, pathname, port, search } = new URL(url);
  const { method = 'GET', headers, body } = options || {};

  const engine = protocol === 'http:' ? http : https;

  const reqOptions: RequestOptions = {
    headers: headers as OutgoingHttpHeaders,
    hostname,
    method,
    path: [pathname, search].filter(Boolean).join(''),
  };

  if (port) {
    reqOptions.port = Number(port);
  }

  return new Promise((resolve, reject) => {
    const req = engine.request(reqOptions, (res) => {
      const chunks: Buffer[] = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const { statusMessage, rawHeaders } = res;
        const statusCode = Number(res.statusCode);
        const buffer = Buffer.concat(chunks);
        const data = buffer.toString();

        const response = {
          headers: fromRawHeaders(rawHeaders),
          json: () => Promise.resolve(JSON.parse(data)) as Promise<T>,
          text: () => Promise.resolve(data),
          ok: statusCode >= 200 && statusCode < 300,
          redirected: false,
          status: statusCode,
          statusText: statusMessage || '',
          type: 'default',
          url,
        };

        resolve(response as unknown as Response);
      });

      res.on('error', reject);
    });

    req.on('error', reject);

    if (body) {
      req.write(body);
    }

    req.end();
  });
}
