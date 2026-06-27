import { describe, expect, it } from 'vitest';
import { FORMULA_SECTIONS, allFormulas, searchFormulas } from '../src/formulaLibrary.js';

describe('expanded formula library', () => {
  it('includes the v2.4 learning sections', () => {
    const ids = FORMULA_SECTIONS.map((section) => section.id);
    expect(ids).toContain('algebra');
    expect(ids).toContain('trigonometry');
    expect(ids).toContain('statistics');
    expect(ids).toContain('electricity');
  });

  it('adds searchable tags to formulas', () => {
    expect(searchFormulas('ohm').some((item) => item.section === 'Electricity')).toBe(true);
    expect(searchFormulas('variance').some((item) => item.section === 'Statistics')).toBe(true);
    expect(searchFormulas('quadratic').some((item) => item.section === 'Algebra')).toBe(true);
  });

  it('keeps formula examples calculator-ready', () => {
    expect(allFormulas().every((item) => typeof item.example === 'string' && item.example.length > 0)).toBe(true);
  });
});
