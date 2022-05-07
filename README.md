# @tuplo/fetch

Simplistic HTTP(s) request library.

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

MIT
