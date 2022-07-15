import { fromRawHeaders } from './headers';

describe('helpers', () => {
	it('builds a Headers object', () => {
		const rawHeaders = [
			'x-powered-by',
			'msw',
			'content-type',
			'application/json',
		];
		const result = fromRawHeaders(rawHeaders);

		expect(result.get('x-powered-by')).toBe('msw');
		expect(result.get('content-type')).toBe('application/json');
	});
});
