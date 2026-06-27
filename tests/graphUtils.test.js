import { describe, expect, it } from 'vitest';
import { graphCaption, niceRange, resolveYRange } from '../src/graphUtils.js';

describe('graph utilities', () => {
  it('creates a padded nice range from finite values', () => {
    const [min, max] = niceRange([0, 5, 10]);
    expect(min).toBeLessThan(0);
    expect(max).toBeGreaterThan(10);
  });

  it('falls back when there are no finite values', () => {
    expect(niceRange([NaN, Infinity])).toEqual([-10, 10]);
  });

  it('uses manual y range when both bounds are valid', () => {
    expect(resolveYRange([1, 2, 3], '-5', '5')).toEqual({ range: [-5, 5], mode: 'manual' });
  });

  it('rejects invalid manual y ranges', () => {
    expect(() => resolveYRange([1, 2, 3], '5', '-5')).toThrow('Use valid y min');
  });

  it('builds an export caption', () => {
    const caption = graphCaption({ fn: 'sin(x)', xMin: '-6.28', xMax: '6.28', yMin: '-1', yMax: '1', angleMode: 'rad' });
    expect(caption).toContain('sin(x)');
    expect(caption).toContain('RAD');
  });
});
