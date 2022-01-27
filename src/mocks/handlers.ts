import { rest } from 'msw';

import { handler } from './helpers';

export const handlers = [
  rest.get('http://localhost/json', handler),
  rest.post('http://localhost/json', handler),
  rest.head('http://localhost/head', handler),
];
