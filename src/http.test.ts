import type { FetchOptions } from './fetch.d';

import fetch from './index';

describe('fetch (http)', () => {
  describe('json', () => {
    const url = 'http://localhost/json';

    describe('get', () => {
      it('plain request', async () => {
        const result = await fetch(url).then((res) => res.json());

        const expected = {
          body: '',
          headers: {
            host: 'localhost',
          },
          method: 'GET',
          query: {},
        };
        expect(result).toStrictEqual(expected);
      });

      it('with query parameters', async () => {
        const result = await fetch(`${url}?foo=bar`).then((res) => res.json());

        const expected = {
          body: '',
          headers: {
            host: 'localhost',
          },
          method: 'GET',
          query: { foo: 'bar' },
        };
        expect(result).toStrictEqual(expected);
      });

      it('with headers', async () => {
        const reqOptions = {
          headers: {
            Authentication: 'Bearer xxx',
            'Content-type': 'application/json',
            host: 'localhost',
          },
        };
        const result = await fetch(url, reqOptions).then((res) => res.json());

        const expected = {
          body: '',
          headers: {
            authentication: 'Bearer xxx',
            'content-type': 'application/json',
            host: 'localhost',
          },
          method: 'GET',
          query: {},
        };
        expect(result).toStrictEqual(expected);
      });
    });

    describe('post', () => {
      const defaultReqOptions: Partial<FetchOptions> = {
        method: 'POST',
      };

      it('plain request', async () => {
        const result = await fetch(url, defaultReqOptions).then((res) =>
          res.json()
        );

        const expected = {
          body: '',
          headers: {
            host: 'localhost',
          },
          method: 'POST',
          query: {},
        };
        expect(result).toStrictEqual(expected);
      });

      it('with query parameters', async () => {
        const result = await fetch(`${url}?foo=bar`, defaultReqOptions).then(
          (res) => res.json()
        );

        const expected = {
          body: '',
          headers: {
            host: 'localhost',
          },
          method: 'POST',
          query: { foo: 'bar' },
        };
        expect(result).toStrictEqual(expected);
      });

      it('with headers', async () => {
        const reqOptions = {
          ...defaultReqOptions,
          headers: {
            Authentication: 'Bearer xxx',
            'Content-type': 'application/json',
          },
        };
        const result = await fetch(url, reqOptions).then((res) => res.json());

        const expected = {
          body: '',
          headers: {
            authentication: 'Bearer xxx',
            'content-type': 'application/json',
            host: 'localhost',
          },
          method: 'POST',
          query: {},
        };
        expect(result).toStrictEqual(expected);
      });

      it('with body', async () => {
        const reqOptions = {
          ...defaultReqOptions,
          body: 'foo=bar',
        };
        const result = await fetch(url, reqOptions).then((res) => res.json());

        const expected = {
          body: 'foo=bar',
          headers: {
            host: 'localhost',
          },
          method: 'POST',
          query: {},
        };
        expect(result).toStrictEqual(expected);
      });
    });
  });
});
