# @tuplo/fetch

HTTP(s) request library.

<p>
  <img src="https://img.shields.io/npm/v/@tuplo/fetch">
  <a href="https://codeclimate.com/github/tuplo/fetch/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/4957420a5b17db4bb85b/maintainability" />
  </a>
  <a href="https://codeclimate.com/github/tuplo/fetch/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/4957420a5b17db4bb85b/test_coverage" />
  </a>
  <img src="https://github.com/tuplo/fetch/workflows/Build/badge.svg">
</p>

- [x] ESM/CJS compatible
- [x] No dependencies
- [x] TypeScript
- [ ] Same API as `fetch`

## Usage

```typescript
import fetch from '@tuplo/fetch';

const data = await fetch('https://foo.com/page.json').then((res) => res.json());
```

## Install

```bash
$ npm install @tuplo/fetch

# or with yarn
$ yarn add @tuplo/fetch
```

### Contribute

Contributions are always welcome!

### License

> The MIT License (MIT)
>
> Copyright (c) 2021 Tuplo.
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
