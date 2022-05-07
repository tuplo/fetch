/* eslint-disable no-param-reassign */
export async function timeout(controller: AbortController, delay: number) {
  return new Promise((resolve) => {
    const idTimeout = setTimeout(() => {
      controller.signal.onabort = null;
      controller.abort();
      resolve({ timeout: true });
    }, delay);

    controller.signal.onabort = () => {
      clearTimeout(idTimeout);
    };
  });
}
