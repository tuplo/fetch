import http from 'http';
import https from 'https';
import { URL } from 'url';
import type { RequestOptions } from 'https';
import type { OutgoingHttpHeaders } from 'http';

import { fromRawHeaders } from './headers';
import type { Response, FetchOptions } from './fetch.d';

export async function request<T = unknown>(
  url: string,
  options?: Partial<FetchOptions>
): Promise<Response<T>> {
  const { method = 'GET', headers, body } = options || {};
  const { protocol, hostname, pathname, port, search } = new URL(url);
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

        const response: Response<T> = {
          headers: fromRawHeaders(rawHeaders),
          ok: statusCode >= 200 && statusCode < 300,
          status: statusCode,
          statusText: statusMessage || '',
          text: async () => data,
          json: async () => JSON.parse(data),
          url: res.url,
        };

        resolve(response);
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
