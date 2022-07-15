let idTimeout: NodeJS.Timeout;

export async function delay(ms: number) {
	return new Promise((resolve) => {
		idTimeout = setTimeout(resolve, ms);
	});
}

export function cancelDelay() {
	clearTimeout(idTimeout);
}
