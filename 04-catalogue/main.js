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
const cartCountEl = $("#cart-count");
const cartEl = $("#cart");
const cartItemsEl = $("#cart-items");
const cartTotalEl = $("#cart-total");

/** Fabrique une carte produit. À vous d'y brancher le bouton. */
function createCard(product) {
  const li = document.createElement("li");
  li.className = "card";
  li.dataset.id = product.id;
  li.innerHTML = `
    <img src="${product.thumbnail}" alt="" loading="lazy" />
    <h3>${product.title}</h3>
    <p class="price">${euros.format(product.price)}</p>
    <button type="button">Ajouter</button>
  `;
  return li;
}

async function loadProducts() {
  const res = await fetch(`${BASE_URL}/products?limit=20`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.products;
}

const cart = [];

function markAdded(button) {
  button.textContent = "Ajouté";
  button.classList.add("added");
}

function showCart() {
  cartCountEl.textContent = cart.length;
  cartItemsEl.replaceChildren(
    ...cart.map((product) => {
      const li = document.createElement("li");
      const title = document.createElement("span");
      const price = document.createElement("span");
      title.textContent = product.title;
      price.textContent = euros.format(product.price);
      li.append(title, price);
      return li;
    }),
  );
  cartTotalEl.textContent = euros.format(cart.reduce((sum, product) => sum + product.price, 0));
}

function showProducts(products) {
  listEl.replaceChildren(
    ...products.map((product) => {
      const card = createCard(product);
      const button = card.querySelector("button");
      if (cart.includes(product)) markAdded(button);
      button.addEventListener("click", () => {
        if (cart.includes(product)) return;
        cart.push(product);
        markAdded(button);
        showCart();
      });
      return card;
    }),
  );
}

$("#cart-toggle").addEventListener("click", () => {
  cartEl.hidden = !cartEl.hidden;
});

try {
  const products = await loadProducts();
  statusEl.hidden = true;
  showProducts(products);
  searchEl.addEventListener("input", () => {
    const query = searchEl.value.trim().toLowerCase();
    showProducts(products.filter((product) => product.title.toLowerCase().includes(query)));
  });
} catch (err) {
  statusEl.textContent = `Erreur : ${err.message}`;
}
