# CP3 · Modules, promesses, async/await (50 min · fermeture T+2:50)

## Le contexte

Un framework front, c'est 80 % d'appels réseau et de code asynchrone. Cet atelier vous fait écrire, module par module, la couche d'accès à l'API que vous réutiliserez avec le framework. On travaille sur la vraie API [dummyjson.com](https://dummyjson.com/docs/products).

## Démarrage

```bash
npm run watch:3
```

Le code est déjà découpé en modules ESM (`"type": "module"` dans le package.json) : `sleep.js`, `format.js`, `api.js`, `main.js`. Regardez comment `main.js` importe les autres.

## Les étapes, dans l'ordre

1. **`sleep(ms)`** – transformez `setTimeout` (callback) en promesse. C'est le pont entre l'ancien monde et `await`.
2. **`formatPrice` et `productLine`** – `Intl.NumberFormat("fr-FR", …)`. Regardez le test : il y a une subtilité sur les espaces.
3. **`getProducts`** – `async/await` + `fetchImpl`. Piège majeur : **`fetch` ne rejette PAS sur une 404**. À vous de tester `res.ok` et de lever une erreur avec le status.
4. **`getCategories`** – même logique. Factorisez si vous voyez une répétition.
5. **`loadCatalog`** – les deux requêtes doivent partir **en même temps**. Le test le vérifie vraiment. `Promise.all` est votre ami ; deux `await` à la suite ne passeront pas.
6. **`createProduct`** – un `POST` avec `method`, `headers` et `body` JSON.
7. **`main.js`** – complétez le TODO n°4, lancez `npm run demo:3` et **notez vos mesures ci-dessous**.

## Vos mesures (à remplir, demandées à la validation)

| Mode | Temps mesuré sur votre machine |
|---|---|
| séquentiel | 394 ms |
| parallèle | 130 ms |
| id renvoyé par `createProduct` | 195 |

## Bonus (+5)

`getProductsWithTimeout(ms)` avec `AbortController`. N'oubliez pas d'annuler le timer quand la réponse arrive à temps, sinon votre processus attend pour rien.

## Validation du checkpoint

`npm run test:3` tout vert, `npm run demo:3` exécuté devant le formateur, le tableau des mesures rempli, puis une question. Exemples : « Que se passe-t-il si l'API renvoie 500 avec ton code ? », « Pourquoi `Promise.all` est plus rapide ici, et dans quel cas serait-ce une mauvaise idée ? », « Dans quel ordre s'affichent 1, 2, 3, 4 dans le snippet du quiz, et pourquoi ? ».
