import "zx/globals";

async function main() {
	await $`rm -rf dist`;
	await $`tsc --build tsconfig.build.json`;

	const flags = ["--bundle", "--platform=node", "--minify"];

	await $`esbuild src/cjs/index.cjs --outfile=dist/index.cjs ${flags}`;
	await $`esbuild src/index.ts --format=esm --outfile=dist/index.mjs ${flags}`;

	await $`cp src/fetch.d.ts dist/fetch.d.ts`;
	await $`rm -rf dist/mocks`;
	await $`rm dist/headers.js dist/index.js dist/request.js dist/timeout.js`;
	await $`rm dist/headers.d.ts dist/request.d.ts dist/timeout.d.ts`;
}

main();
