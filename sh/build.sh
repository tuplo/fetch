#!/usr/bin/env bash
set -euo pipefail

main() {
  rm -rf dist
  tsc --build tsconfig.build.json

  esbuild src/cjs/index.cjs --bundle --platform=node --outfile=dist/index.cjs
  esbuild src/index.ts --bundle --platform=node --format=esm --outfile=dist/index.mjs

  cp src/fetch.d.ts dist/fetch.d.ts
}

main
