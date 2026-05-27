/**
 * search.js — relevance-scored keyword search
 *
 * How scoring works (higher = better match):
 *   name exact match   → 100 pts
 *   name starts with   →  60 pts
 *   name contains      →  30 pts
 *   tag exact match    →  40 pts
 *   tag contains       →  20 pts
 *   category contains  →  15 pts
 *   description match  →  10 pts
 */

/**
 * Score a single formula against a query string.
 * Returns 0 if there is no match at all.
 *
 * @param {object} formula
 * @param {string} query  - already lowercased by the caller
 * @returns {number}
 */
function scoreFormula(formula, query) {
  let score = 0;

  // Name
  const name = formula.name.toLowerCase();
  if (name === query)             score += 100;
  else if (name.startsWith(query)) score += 60;
  else if (name.includes(query))   score += 30;

  // Tags
  for (const tag of formula.tags) {
    const t = tag.toLowerCase();
    if (t === query)        score += 40;
    else if (t.includes(query)) score += 20;
  }

  // Category
  if (formula.category.includes(query)) score += 15;

  // Description
  if (formula.description.toLowerCase().includes(query)) score += 10;

  return score;
}

/**
 * Filter and sort formulas by relevance to a query.
 *
 * @param {object[]} formulas  - full dataset
 * @param {string}   query     - search string
 * @param {object}   [options]
 * @param {number}   [options.limit] - max results to return
 * @returns {{ formula: object, score: number }[]}
 */
function filterAndScore(formulas, query, options = {}) {
  const q = query.toLowerCase().trim();

  // Empty query → return everything with score 0
  if (!q) {
    const all = formulas.map(formula => ({ formula, score: 0 }));
    return options.limit ? all.slice(0, options.limit) : all;
  }

  const results = [];

  for (const formula of formulas) {
    const score = scoreFormula(formula, q);
    if (score > 0) {
      results.push({ formula, score });
    }
  }

  // Sort best match first
  results.sort((a, b) => b.score - a.score);

  return options.limit ? results.slice(0, options.limit) : results;
}

export { filterAndScore };
