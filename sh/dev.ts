import * as shell from "@tuplo/shell";

async function main() {
	const $ = shell.$({ verbose: true });

	await $`rm -rf dist`;
	await $`tsc --build tsconfig.build.json`;

	const flags = [
		"--bundle",
		"--platform=node",
		"--format=esm",
		"--outfile=dist/index.mjs.js",
		"--watch",
	];

	await $`esbuild src/index.ts ${flags}`;
}

main();
