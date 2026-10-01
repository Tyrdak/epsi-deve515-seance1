/**
 * main.js – démonstration à exécuter : `npm run demo:3`
 * Ce script utilise le vrai réseau. Complétez les TODO puis notez vos
 * mesures dans CONSIGNES.md (elles sont demandées à la validation).
 */
import { getProducts, getCategories, loadCatalog, createProduct } from "./api.js";
import { productLine } from "./format.js";
import { sleep } from "./sleep.js";

console.log("⏳ patience...");
await sleep(500);

// 1. Chargement séquentiel : deux await l'un après l'autre
console.time("séquentiel");
const products = await getProducts();
const categories = await getCategories();
console.timeEnd("séquentiel");

// 2. Chargement parallèle : Promise.all
console.time("parallèle");
const catalog = await loadCatalog();
console.timeEnd("parallèle");

console.log(`\n${products.length} produits, ${categories.length} catégories`);
console.log(catalog.products.slice(0, 3).map(productLine).join("\n"));

// 3. Création d'un produit (l'API simule l'insertion et renvoie un id)
const created = await createProduct({ title: "Autocollants JS", price: 0 });
console.log("\nProduit créé avec l'id :", created.id);

// 4. TODO : appelez getProducts avec un faux fetch qui renvoie une 404,
//    attrapez l'erreur avec try/catch et affichez son message.

const notFoundFetch = async () => ({ ok: false, status: 404, json: async () => ({}) });
try {
  await getProducts(notFoundFetch);
} catch (err) {
  console.log("\nErreur attrapée :", err.message);
}
