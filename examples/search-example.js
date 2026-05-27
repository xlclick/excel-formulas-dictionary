/**
 * Search example
 * Run: node examples/search-example.js
 */

import { search, getByTag } from '../src/index.js';

function printResults(label, results) {
  console.log(`\n=== ${label} (${results.length} results) ===`);
  results.forEach(({ formula, score }) => {
    console.log(`  [score: ${String(score).padStart(3)}]  ${formula.name.padEnd(15)} [${formula.category}]`);
  });
}

// Search by keyword — results sorted by relevance score
printResults('search("lookup")',  search('lookup'));
printResults('search("finance")', search('finance'));
printResults('search("date")',    search('date'));
printResults('search("text")',    search('text'));

// Limit results
printResults('search("sum", { limit: 3 })', search('sum', { limit: 3 }));

// Tag-based retrieval
const dynamic = getByTag('dynamic');
console.log(`\n=== getByTag("dynamic") (${dynamic.length}) ===`);
dynamic.forEach(f => console.log(' ', f.name));

const cleaning = getByTag('data-cleaning');
console.log(`\n=== getByTag("data-cleaning") (${cleaning.length}) ===`);
cleaning.forEach(f => console.log(' ', f.name));
