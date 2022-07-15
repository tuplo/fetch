<br />
<div align="center">
  <img src="logo.png" alt="Logo" width="120" height="120">
  <h1 align="center">fetch</h3>
  <p align="center">Tiny HTTP request library for NodeJS (WHATWG Fetch API compatible)</p>
  <p align="center">
    <img src="https://img.shields.io/npm/v/@tuplo/fetch">
    <img src="https://img.shields.io/bundlephobia/minzip/@tuplo/fetch">
  	 <a href="https://codeclimate.com/github/tuplo/fetch/test_coverage">
      <img src="https://api.codeclimate.com/v1/badges/4957420a5b17db4bb85b/test_coverage" /></a>
  	 <img src="https://github.com/tuplo/fetch/actions/workflows/build.yml/badge.svg">
  </p>
</div>


## Usage

WHATWG Fetch API compliant

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

### License

MIT
