/**
 * Basic usage example
 * Run: node examples/basic-usage.js
 */

import { getFormula, getAll, getByCategory, getByDifficulty, count } from '../src/index.js';

// 1. Look up a formula by name
const xlookup = getFormula('XLOOKUP');
console.log('=== XLOOKUP ===');
console.log('Name:       ', xlookup.name);
console.log('Category:   ', xlookup.category);
console.log('Difficulty: ', xlookup.difficulty);
console.log('Syntax:     ', xlookup.syntax);
console.log('Example:    ', xlookup.example.input, '→', xlookup.example.output);
console.log();

// 2. Case-insensitive — all three work the same
console.log('getFormula("vlookup"):', getFormula('vlookup')?.name);
console.log('getFormula("VLOOKUP"):', getFormula('VLOOKUP')?.name);
console.log();

// 3. Unknown name returns undefined (no crash)
console.log('getFormula("FAKE"):', getFormula('FAKE')); // undefined
console.log();

// 4. Total formula count
console.log('Total formulas:', count());
console.log();

// 5. All formulas — print just name and category
const all = getAll();
console.log('=== All formulas ===');
all.forEach(f => console.log(' ', f.name.padEnd(15), `[${f.category}]`));
console.log();

// 6. Filter by category
const financial = getByCategory('financial');
console.log(`=== Financial formulas (${financial.length}) ===`);
financial.forEach(f => console.log(' ', f.name));
console.log();

// 7. Filter by difficulty
const beginners = getByDifficulty('beginner');
console.log(`=== Beginner formulas (${beginners.length}) ===`);
beginners.forEach(f => console.log(' ', f.name));
