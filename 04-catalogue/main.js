/**
 * main.js – CP4 · Mini-catalogue en vanilla JS
 *
 * Phase 1 : faites-le marcher, en impératif, comme vous voulez.
 * Phase 2 : le formateur ajoute des exigences.
 * Phase 3 : tout passe par `state` + `render(state)` + `setState(patch)`.
 *
 * Réutilisez ce que vous avez écrit au CP3 : copiez api.js et format.js
 * (ou importez-les) plutôt que de réécrire fetch à la main.
 */

const BASE_URL = "https://dummyjson.com";
const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

// Raccourcis DOM
const $ = (selector) => document.querySelector(selector);
const listEl = $("#products");
const statusEl = $("#status");
const searchEl = $("#search");
const sortEl = $("#sort");
const cartToggleEl = $("#cart-toggle");
const cartCountEl = $("#cart-count");
const cartEl = $("#cart");
const cartItemsEl = $("#cart-items");
const cartTotalEl = $("#cart-total");

const el = (tag, props) => Object.assign(document.createElement(tag), props);

async function loadProducts() {
  const res = await fetch(`${BASE_URL}/products?limit=20`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.products;
}

let state = { products: [], query: "", cart: [], cartOpen: false, sort: "", status: "Chargement…" };

function setState(patch) {
  state = { ...state, ...patch };
  render(state);
}

function visibleProducts({ products, query, sort }) {
  const needle = query.trim().toLowerCase();
  const found = products.filter((product) => product.title.toLowerCase().includes(needle));
  if (sort === "asc") return found.toSorted((a, b) => a.price - b.price);
  if (sort === "desc") return found.toSorted((a, b) => b.price - a.price);
  return found;
}

function productCard(product, added) {
  const card = el("li", { className: "card" });
  card.append(
    el("img", { src: product.thumbnail, alt: "", loading: "lazy" }),
    el("h3", { textContent: product.title }),
    el("p", { className: "price", textContent: euros.format(product.price) }),
    el("button", {
      type: "button",
      className: added ? "added" : "",
      textContent: added ? "Ajouté" : "Ajouter",
      disabled: added,
      onclick: () => setState({ cart: [...state.cart, product] }),
    }),
  );
  return card;
}

function cartItem(product) {
  const item = el("li");
  item.append(
    el("span", { textContent: product.title }),
    el("span", { textContent: euros.format(product.price) }),
  );
  return item;
}

function render(state) {
  statusEl.textContent = state.status;
  statusEl.hidden = !state.status;
  searchEl.value = state.query;
  sortEl.value = state.sort;
  listEl.replaceChildren(
    ...visibleProducts(state).map((product) => productCard(product, state.cart.includes(product))),
  );
  cartCountEl.textContent = state.cart.length;
  cartEl.hidden = !state.cartOpen;
  cartItemsEl.replaceChildren(...state.cart.map(cartItem));
  cartTotalEl.textContent = euros.format(state.cart.reduce((sum, product) => sum + product.price, 0));
}

searchEl.addEventListener("input", (event) => setState({ query: event.target.value }));
sortEl.addEventListener("change", (event) => setState({ sort: event.target.value }));
cartToggleEl.addEventListener("click", () => setState({ cartOpen: !state.cartOpen }));

render(state);

try {
  setState({ products: await loadProducts(), status: "" });
} catch (err) {
  setState({ status: `Erreur : ${err.message}` });
}
