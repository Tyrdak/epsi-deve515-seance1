/**
 * formatPrice(n) : formate un nombre en euros à la française.
 *   formatPrice(19.9)  → "19,90 €"
 *   formatPrice(1234)  → "1 234,00 €"
 * Indice : Intl.NumberFormat fait tout le travail.
 */
const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export function formatPrice(n) {
  return euros.format(n);
}

/**
 * productLine(product) : "Nom du produit — 19,90 €"
 * (tiret cadratin —, U+2014)
 */
export function productLine({ title, price }) {
  return `${title} — ${formatPrice(price)}`;
}
