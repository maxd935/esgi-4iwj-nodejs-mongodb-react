/**
 * Scrapper la page "https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP"
 * et ressortir un objet indexé par le code HTTP et pour valeur le message associé.
 *  Résultat attendu:
 *    {
 *      ...,
 *      200: "OK",
 *      201: "Created",
 *      ...
 *    }
 *
 * Reprendre la classe Scrapper et la modifier pour gérer le HTML
 *
 * Pro tips: utiliser la lib jsdom
 *  Commande : npm install --save jsdom
 */
const Scrapper = require("./Scrapper");

new Scrapper({
  url: "https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP",
  processData: function (document) {
    // JS way
    return Array.from(
      document.querySelectorAll("table tr:not(:first-child)")
    ).reduce((acc, tr) => {
      const elems = tr.querySelectorAll("th,td:first-of-type");
      const code = elems[0].textContent.trim();
      const message = elems[1].textContent.trim();
      acc[code] = message;
      return acc;
    }, {});

    // Optimization
    let result = {};
    document
      .querySelectorAll("table tr:not(:first-child) th")
      .forEach((elem, index) => {
        result[elem.textContent.trim()] =
          elem.nextElementSibling.textContent.trim();
      });
    return result;
  },
})
  .getData()
  .then(console.log);
