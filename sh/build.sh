#!/usr/bin/env bash
set -euo pipefail

main() {
  rm -rf dist
  tsc --build tsconfig.build.json

  esbuild src/index.ts \
    --bundle \
    --platform=node \
    --minify \
    --outfile=dist/index.cjs.js

  esbuild src/index.ts \
    --bundle \
    --platform=node \
    --format=esm \
    --minify \
    --outfile=dist/index.esm.js

  cp src/fetch.d.ts dist/fetch.d.ts
  rm -rf dist/mocks
  rm dist/headers.js dist/index.js dist/request.js dist/timeout.js
  rm dist/headers.d.ts dist/request.d.ts dist/timeout.d.ts
}

main
