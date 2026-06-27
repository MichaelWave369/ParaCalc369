import { describe, expect, it } from 'vitest';
import { CONSTANTS, FORMULA_SECTIONS, allFormulas, findConstant, searchFormulas } from '../src/formulaLibrary.js';

describe('formula library', () => {
  it('contains core formula sections', () => {
    const labels = FORMULA_SECTIONS.map((section) => section.label);
    expect(labels).toContain('Geometry');
    expect(labels).toContain('Physics basics');
    expect(labels).toContain('Finance');
    expect(labels).toContain('Unit helpers');
  });

  it('flattens formulas with section labels', () => {
    const formulas = allFormulas();
    expect(formulas.length).toBeGreaterThan(15);
    expect(formulas.every((item) => item.section)).toBe(true);
  });

  it('searches formulas by name and note', () => {
    expect(searchFormulas('circle').some((item) => item.name === 'Circle area')).toBe(true);
    expect(searchFormulas('interest').some((item) => item.section === 'Finance')).toBe(true);
  });

  it('finds constants', () => {
    expect(CONSTANTS.length).toBeGreaterThan(3);
    expect(findConstant('π')?.value).toBe('π');
    expect(findConstant('golden ratio')?.symbol).toBe('φ');
  });
});
