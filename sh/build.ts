import "zx/globals";

async function main() {
	await $`rm -rf dist`;
	await $`tsc --build tsconfig.build.json`;

	const formats = ["cjs", "esm"];
	for await (const format of formats) {
		const flags = [
			"--bundle",
			"--platform=node",
			`--format=${format}`,
			`--minify`,
			`--outfile=dist/index.${format}.js`,
		];

		await $`esbuild src/index.ts ${flags}`;
	}

	await $`cp src/fetch.d.ts dist/fetch.d.ts`;
	await $`rm -rf dist/mocks`;
	await $`rm dist/headers.js dist/index.js dist/request.js dist/timeout.js`;
	await $`rm dist/headers.d.ts dist/request.d.ts dist/timeout.d.ts`;
}

main();
