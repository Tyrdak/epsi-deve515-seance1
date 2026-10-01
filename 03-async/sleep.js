/**
 * sleep(ms) : renvoie une promesse qui se résout après `ms` millisecondes.
 * C'est la "promisification" de setTimeout : on transforme une API à callback
 * en API à promesse, utilisable avec await.
 *
 *   await sleep(500);
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
