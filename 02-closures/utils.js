/**
 * utils.js – petits utilitaires à écrire.
 * Chaque fonction est décrite dans CONSIGNES.md et précisée par utils.test.js.
 */

/**
 * Appelle `log(i)` pour i = 0, 1, 2, chacun dans un setTimeout.
 * 🐛 Tel quel, ce code affiche 3, 3, 3. Corrigez-le de DEUX façons différentes
 * (gardez la seconde en commentaire) et soyez capables d'expliquer pourquoi.
 */
export function scheduleLogs(log) {
  // avec let ca marche car i est different a chaque tour
  for (let i = 0; i < 3; i++) {
    setTimeout(function () {
      log(i);
    }, 0);
  }

  // autre facon de faire :
  // for (var i = 0; i < 3; i++) {
  //   (function (j) {
  //     setTimeout(function () {
  //       log(j);
  //     }, 0);
  //   })(i);
  // }
}

/**
 * Renvoie un compteur { increment(), decrement(), value() } dont la valeur
 * courante est PRIVÉE : impossible de la lire ou de la modifier autrement
 * que par ces trois méthodes.
 */
export function createCounter(start = 0) {
  let count = start;
  return {
    increment: function () {
      count++;
    },
    decrement: function () {
      count--;
    },
    value: function () {
      return count;
    },
  };
}

/**
 * Renvoie une fonction qui n'exécute `fn` qu'au premier appel, puis renvoie
 * toujours le résultat de ce premier appel.
 */
export function once(fn) {
  let dejaAppele = false;
  let resultat;
  return function (...args) {
    if (dejaAppele == false) {
      resultat = fn(...args);
      dejaAppele = true;
    }
    return resultat;
  };
}

/**
 * Renvoie une version "temporisée" de `fn` : `fn` n'est appelée qu'une fois
 * que `ms` millisecondes se sont écoulées sans nouvel appel, avec les
 * DERNIERS arguments reçus. La fonction renvoyée expose aussi `.cancel()`.
 */
export function debounce(fn, ms) {
  // TODO
}

/**
 * BONUS – renvoie une version de `fn` qui mémorise ses résultats :
 * un même jeu d'arguments ne provoque qu'un seul appel réel de `fn`.
 */
export function memoize(fn) {
  // TODO
}
