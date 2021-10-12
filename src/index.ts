import http from 'http';
import https from 'https';
import { URL } from 'url';
import type { RequestOptions } from 'https';

type FetchOptions = {
  body: string;
  headers: Record<string, string>;
  method: string;
};

type FetchResponse<T> = {
  json: () => Promise<T>;
};

export default async function fetch<T>(
  url: string,
  options?: Partial<FetchOptions>
): Promise<FetchResponse<T>> {
  const { protocol, hostname, pathname, port, search } = new URL(url);
  const { method = 'GET', headers, body } = options || {};

  const engine = protocol === 'http:' ? http : https;

  const reqOptions: RequestOptions = {
    headers,
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
        const data = Buffer.concat(chunks).toString();

        resolve({
          json: () => Promise.resolve(JSON.parse(data)),
        });
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
