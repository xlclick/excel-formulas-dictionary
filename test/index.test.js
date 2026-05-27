import { describe, it, expect } from 'vitest';
import {
  getFormula,
  getAll,
  search,
  getByTag,
  getByCategory,
  getByDifficulty,
  getRandom,
  count,
} from '../src/index.js';

// ── getFormula ────────────────────────────────────────────────────────────

describe('getFormula', () => {
  it('finds a formula by exact name', () => {
    const f = getFormula('VLOOKUP');
    expect(f).toBeDefined();
    expect(f.name).toBe('VLOOKUP');
    expect(f.category).toBe('lookup');
  });

  it('is case-insensitive', () => {
    expect(getFormula('vlookup')).toBeDefined();
    expect(getFormula('VlOoKuP')).toBeDefined();
  });

  it('returns undefined for unknown names', () => {
    expect(getFormula('NOTREAL')).toBeUndefined();
    expect(getFormula('')).toBeUndefined();
  });
});

// ── getAll ────────────────────────────────────────────────────────────────

describe('getAll', () => {
  it('returns at least 55 formulas', () => {
    expect(getAll().length).toBeGreaterThanOrEqual(55);
  });

  it('has no duplicate ids', () => {
    const ids = getAll().map(f => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('returns a fresh copy each call', () => {
    expect(getAll()).not.toBe(getAll());
  });
});

// ── Formula shape ─────────────────────────────────────────────────────────

describe('Formula shape', () => {
  it('every formula has all required fields', () => {
    const required = ['id', 'name', 'syntax', 'description', 'example', 'tags', 'category', 'difficulty'];
    for (const f of getAll()) {
      for (const field of required) {
        expect(f[field], `${f.id} is missing: ${field}`).toBeDefined();
      }
      expect(Array.isArray(f.tags)).toBe(true);
      expect(f.tags.length).toBeGreaterThan(0);
      expect(f.example.input).toBeTruthy();
      expect(f.example.output).toBeTruthy();
      expect(f.example.explanation).toBeTruthy();
    }
  });
});

// ── search ────────────────────────────────────────────────────────────────

describe('search', () => {
  it('returns results sorted by score (highest first)', () => {
    const results = search('lookup');
    expect(results.length).toBeGreaterThan(0);
    for (let i = 1; i < results.length; i++) {
      expect(results[i].score).toBeLessThanOrEqual(results[i - 1].score);
    }
  });

  it('returns all formulas for an empty query', () => {
    expect(search('').length).toBe(count());
  });

  it('respects the limit option', () => {
    expect(search('date', { limit: 3 }).length).toBeLessThanOrEqual(3);
  });

  it('returns 0 results for a nonsense query', () => {
    expect(search('zzzzz_fake_zzzzz').length).toBe(0);
  });

  it('finds XLOOKUP when searching xlookup', () => {
    expect(search('xlookup')[0].formula.name).toBe('XLOOKUP');
  });
});

// ── getByTag ──────────────────────────────────────────────────────────────

describe('getByTag', () => {
  it('returns formulas that have the tag', () => {
    const results = getByTag('dynamic');
    expect(results.length).toBeGreaterThan(0);
    results.forEach(f => expect(f.tags).toContain('dynamic'));
  });

  it('is case-insensitive', () => {
    expect(getByTag('DYNAMIC').length).toBe(getByTag('dynamic').length);
  });

  it('returns empty array for unknown tag', () => {
    expect(getByTag('__no_such_tag__')).toHaveLength(0);
  });
});

// ── getByCategory ─────────────────────────────────────────────────────────

describe('getByCategory', () => {
  it('returns only formulas of that category', () => {
    const results = getByCategory('financial');
    expect(results.length).toBeGreaterThan(0);
    results.forEach(f => expect(f.category).toBe('financial'));
  });
});

// ── getByDifficulty ───────────────────────────────────────────────────────

describe('getByDifficulty', () => {
  it('returns only formulas at that difficulty', () => {
    for (const level of ['beginner', 'intermediate', 'advanced']) {
      const results = getByDifficulty(level);
      expect(results.length).toBeGreaterThan(0);
      results.forEach(f => expect(f.difficulty).toBe(level));
    }
  });

  it('all three levels together cover every formula', () => {
    const total =
      getByDifficulty('beginner').length +
      getByDifficulty('intermediate').length +
      getByDifficulty('advanced').length;
    expect(total).toBe(count());
  });
});

// ── getRandom ─────────────────────────────────────────────────────────────

describe('getRandom', () => {
  it('returns a valid formula object', () => {
    const f = getRandom();
    expect(f).toBeDefined();
    expect(f.name).toBeTruthy();
    expect(f.id).toBeTruthy();
  });

  it('produces different results over many calls', () => {
    const names = new Set(Array.from({ length: 20 }, () => getRandom().name));
    expect(names.size).toBeGreaterThan(1);
  });
});

// ── count ─────────────────────────────────────────────────────────────────

describe('count', () => {
  it('equals getAll().length', () => {
    expect(count()).toBe(getAll().length);
  });

  it('is at least 55', () => {
    expect(count()).toBeGreaterThanOrEqual(55);
  });
});
