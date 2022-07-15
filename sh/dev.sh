#!/usr/bin/env bash
set -euo pipefail

main() {
  rm -rf dist
  tsc --build tsconfig.build.json

  esbuild src/index.ts \
    --bundle \
    --platform=node \
    --format=esm \
    --outfile=dist/index.mjs.js \
    --watch
}

main
