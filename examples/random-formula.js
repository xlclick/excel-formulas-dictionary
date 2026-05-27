/**
 * Random formula — "Formula of the Day" demo
 * Run: node examples/random-formula.js
 */

import { getRandom } from '../src/index.js';

function printCard() {
  const f = getRandom();
  const line = '─'.repeat(55);

  console.log(`\n┌${line}┐`);
  console.log(`│  📊 FORMULA OF THE DAY`.padEnd(56) + '│');
  console.log(`├${line}┤`);
  console.log(`│  ${f.name}  (${f.category} · ${f.difficulty})`.padEnd(56) + '│');
  console.log(`├${line}┤`);
  console.log(`│  ${f.syntax}`.padEnd(56) + '│');
  console.log(`├${line}┤`);

  // Word-wrap description
  const words = f.description.split(' ');
  let line_ = '  ';
  for (const word of words) {
    if ((line_ + word).length > 53) {
      console.log(`│${line_.padEnd(55)}│`);
      line_ = '  ' + word + ' ';
    } else {
      line_ += word + ' ';
    }
  }
  if (line_.trim()) console.log(`│${line_.padEnd(55)}│`);

  console.log(`├${line}┤`);
  console.log(`│  Input:  ${f.example.input}`.padEnd(56) + '│');
  console.log(`│  Output: ${f.example.output}`.padEnd(56) + '│');
  console.log(`├${line}┤`);
  console.log(`│  Tags: ${f.tags.join(', ')}`.padEnd(56) + '│');
  console.log(`└${line}┘`);
}

// Print 3 random cards
printCard();
printCard();
printCard();
