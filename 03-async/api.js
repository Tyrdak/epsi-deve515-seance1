/**
 * api.js – accès à l'API dummyjson.com
 *
 * Chaque fonction accepte un paramètre `fetchImpl` qui vaut `fetch` par
 * défaut. Les tests injectent un faux fetch : votre code n'a donc jamais
 * besoin du réseau pour être testé. Utilisez TOUJOURS `fetchImpl`, jamais
 * `fetch` directement.
 */

export const BASE_URL = "https://dummyjson.com";

async function getJson(url, fetchImpl, init) {
  const res = await fetchImpl(url, init);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/**
 * GET {BASE_URL}/products?limit=10
 * Renvoie le TABLEAU de produits (data.products), pas l'objet complet.
 * Si la réponse n'est pas OK (status 4xx/5xx), lève une Error dont le
 * message contient le status, par exemple "HTTP 404".
 */
export async function getProducts(fetchImpl = fetch) {
  const data = await getJson(`${BASE_URL}/products?limit=10`, fetchImpl);
  return data.products;
}

/**
 * GET {BASE_URL}/products/category-list
 * Renvoie le tableau de catégories (des chaînes).
 * Même règle d'erreur que getProducts.
 */
export async function getCategories(fetchImpl = fetch) {
  return getJson(`${BASE_URL}/products/category-list`, fetchImpl);
}

/**
 * Charge produits ET catégories EN PARALLÈLE, puis renvoie
 * { products, categories }.
 */
export async function loadCatalog(fetchImpl = fetch) {
  const [products, categories] = await Promise.all([
    getProducts(fetchImpl),
    getCategories(fetchImpl),
  ]);
  return { products, categories };
}

/**
 * POST {BASE_URL}/products/add avec un body JSON.
 * Renvoie l'objet créé renvoyé par l'API (qui contient un `id`).
 */
export async function createProduct(product, fetchImpl = fetch) {
  return getJson(`${BASE_URL}/products/add`, fetchImpl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}

/**
 * BONUS – comme getProducts, mais abandonne la requête après `ms` ms
 * (AbortController) et lève alors une Error dont le message contient "timeout".
 */
export async function getProductsWithTimeout(ms, fetchImpl = fetch) {
  // TODO
}
