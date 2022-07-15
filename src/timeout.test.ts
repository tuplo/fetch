import fetch from './index';

describe('timeout', () => {
	it("doesn't timeout if no options.timeout is given", async () => {
		const url = 'http://localhost/delay?ms=1000';
		const result = await fetch(url).then((res) => res.json());

		const expected = {
			body: '',
			headers: { host: 'localhost' },
			method: 'GET',
			query: { ms: '1000' },
		};
		expect(result).toStrictEqual(expected);
	});

	it("doesn't cancel if request resolves before timeout", async () => {
		const url = 'http://localhost/delay?ms=1000';
		const result = await fetch(url, { timeout: 2_000 }).then((res) =>
			res.json()
		);

		const expected = {
			body: '',
			headers: { host: 'localhost' },
			method: 'GET',
			query: { ms: '1000' },
		};
		expect(result).toStrictEqual(expected);
	});

	it('cancels request after timeout', async () => {
		const url = 'http://localhost/delay?ms=3000';
		const fn = () => fetch(url, { timeout: 1_000 });

		const expected = `@tuplo/fetch: request timed out, ${url}}`;
		await expect(fn).rejects.toThrow(expected);
		await fetch(`http://localhost/cancel-delay`);
	});
});
