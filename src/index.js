/**
 * excel-formulas-dictionary-by-xlclick
 *
 * Public API — import only what you need:
 *
 *   import { getFormula, search, getRandom } from './src/index.js'
 *
 * Available functions:
 *   getFormula(name)          → one formula or undefined
 *   getAll()                  → all formulas
 *   search(query, options)    → scored results
 *   getByTag(tag)             → formulas with that tag
 *   getByCategory(category)   → formulas in that category
 *   getByDifficulty(level)    → formulas at that level
 *   getRandom()               → one random formula
 *   count()                   → total number of formulas
 */

import formulas from './data/formulas.js';
import { filterAndScore } from './search.js';

// Build a Map for O(1) name lookups — created once when the module loads.
// Keys are lowercase formula ids (e.g. "vlookup").
const formulaMap = new Map(
  formulas.map(f => [f.id.toLowerCase(), f])
);

// ─── Public functions ──────────────────────────────────────────────────────

/**
 * Get a single formula by its name (case-insensitive).
 * Returns undefined if not found.
 *
 * @param {string} name  e.g. "VLOOKUP" or "vlookup"
 * @returns {object|undefined}
 *
 * @example
 * const f = getFormula('XLOOKUP')
 * console.log(f.syntax)
 */
function getFormula(name) {
  if (!name) return undefined;
  return formulaMap.get(name.toLowerCase());
}

/**
 * Get every formula in the dictionary.
 * Returns a new array each time (safe to mutate).
 *
 * @returns {object[]}
 */
function getAll() {
  return [...formulas];
}

/**
 * Search formulas by keyword. Results are sorted by relevance score.
 * An empty query returns all formulas.
 *
 * @param {string} query          - e.g. "lookup", "loan", "date"
 * @param {object} [options]
 * @param {number} [options.limit] - max number of results
 * @returns {{ formula: object, score: number }[]}
 *
 * @example
 * search('loan')               // all loan-related formulas
 * search('date', { limit: 3 }) // top 3 date-related formulas
 */
function search(query, options = {}) {
  return filterAndScore(formulas, query ?? '', options);
}

/**
 * Get all formulas that include a specific tag.
 *
 * @param {string} tag  e.g. "dynamic", "data-cleaning"
 * @returns {object[]}
 *
 * @example
 * getByTag('data-cleaning')  // TRIM, SUBSTITUTE, VALUE…
 */
function getByTag(tag) {
  if (!tag) return [];
  const t = tag.toLowerCase().trim();
  return formulas.filter(f => f.tags.some(ft => ft.toLowerCase() === t));
}

/**
 * Get all formulas in a given category.
 *
 * Valid categories: lookup, financial, text, date, logical,
 *                   math, statistical, array, information
 *
 * @param {string} category
 * @returns {object[]}
 *
 * @example
 * getByCategory('financial')  // PMT, FV, PV, NPV, IRR…
 */
function getByCategory(category) {
  if (!category) return [];
  return formulas.filter(f => f.category === category);
}

/**
 * Get all formulas at a specific difficulty level.
 *
 * @param {'beginner'|'intermediate'|'advanced'} difficulty
 * @returns {object[]}
 *
 * @example
 * getByDifficulty('beginner')  // IF, SUM, LEFT, TODAY…
 */
function getByDifficulty(difficulty) {
  if (!difficulty) return [];
  return formulas.filter(f => f.difficulty === difficulty);
}

/**
 * Get a single random formula from the dictionary.
 * Great for "Formula of the Day" features.
 *
 * @returns {object}
 */
function getRandom() {
  const index = Math.floor(Math.random() * formulas.length);
  return formulas[index];
}

/**
 * Get the total number of formulas in the dictionary.
 *
 * @returns {number}
 */
function count() {
  return formulas.length;
}

export {
  getFormula,
  getAll,
  search,
  getByTag,
  getByCategory,
  getByDifficulty,
  getRandom,
  count,
};
