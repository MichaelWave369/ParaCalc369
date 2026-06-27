import { describe, expect, it } from 'vitest';
import { buildShareUrl, clearShareParams, hasSharedState, readSharedState } from '../src/shareState.js';

describe('share state helpers', () => {
  it('reads shared state from query params', () => {
    const state = readSharedState('?expr=2%2B2&gfn=x%5E2&gmin=-5&gmax=5&ucat=length&uval=12&ufrom=ft&uto=m');
    expect(state.expr).toBe('2+2');
    expect(state.graph).toEqual({ fn: 'x^2', min: '-5', max: '5' });
    expect(state.unit).toEqual({ category: 'length', value: '12', fromUnit: 'ft', toUnit: 'm' });
  });

  it('detects shared state', () => {
    expect(hasSharedState('?expr=7')).toBe(true);
    expect(hasSharedState('?hello=world')).toBe(false);
  });

  it('builds a share URL while preserving unrelated params', () => {
    const url = buildShareUrl({
      expr: 'sin(90)',
      graph: { fn: 'sin(x)', min: '-10', max: '10' },
      unit: { category: 'temperature', value: '32', fromUnit: 'F', toUnit: 'C' },
    }, 'https://example.com/ParaCalc369/?theme=dark');
    expect(url).toContain('theme=dark');
    expect(url).toContain('expr=sin%2890%29');
    expect(url).toContain('gfn=sin%28x%29');
    expect(url).toContain('ucat=temperature');
  });

  it('clears share params but keeps unrelated params', () => {
    const url = clearShareParams('https://example.com/?expr=2&theme=dark&gfn=x');
    expect(url).toBe('https://example.com/?theme=dark');
  });
});
