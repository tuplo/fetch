import fetch from './index';

describe('fetch (http)', () => {
  describe('json', () => {
    const url = 'http://localhost/json';

    describe('get', () => {
      it('plain request', async () => {
        const result = await fetch(url).then((res) => res.json());

        const expected = {
          body: '',
          headers: {},
          method: 'GET',
          query: {},
        };
        expect(result).toStrictEqual(expected);
      });

      it('with query parameters', async () => {
        const result = await fetch(`${url}?foo=bar`).then((res) => res.json());

        const expected = {
          body: '',
          headers: {},
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
          },
        };
        const result = await fetch(url, reqOptions).then((res) => res.json());

        const expected = {
          body: '',
          headers: {
            authentication: 'Bearer xxx',
            'content-type': 'application/json',
          },
          method: 'GET',
          query: {},
        };
        expect(result).toStrictEqual(expected);
      });
    });

    describe('post', () => {
      it('plain request', async () => {
        const reqOptions = {
          method: 'POST',
        };
        const result = await fetch(url, reqOptions).then((res) => res.json());

        const expected = {
          body: '',
          headers: {},
          method: 'POST',
          query: {},
        };
        expect(result).toStrictEqual(expected);
      });

      it('with query parameters', async () => {
        const reqOptions = {
          method: 'POST',
        };
        const result = await fetch(`${url}?foo=bar`, reqOptions).then((res) =>
          res.json()
        );

        const expected = {
          body: '',
          headers: {},
          method: 'POST',
          query: { foo: 'bar' },
        };
        expect(result).toStrictEqual(expected);
      });

      it('with headers', async () => {
        const reqOptions = {
          method: 'POST',
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
          },
          method: 'POST',
          query: {},
        };
        expect(result).toStrictEqual(expected);
      });

      it('with body', async () => {
        const reqOptions = {
          method: 'POST',
          body: 'foo=bar',
        };
        const result = await fetch(url, reqOptions).then((res) => res.json());

        const expected = {
          body: 'foo=bar',
          headers: {},
          method: 'POST',
          query: {},
        };
        expect(result).toStrictEqual(expected);
      });
    });
  });
});
