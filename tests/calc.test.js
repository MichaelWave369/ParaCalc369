import { describe, expect, it } from 'vitest';
import { calculate, fmt } from '../src/calc.js';

const close = (a, b) => expect(a).toBeCloseTo(b, 10);

describe('ParaCalc369 engine', () => {
  it('handles arithmetic and grouping', () => {
    expect(calculate('2+3*4')).toBe(14);
    expect(calculate('(2+3)*4')).toBe(20);
  });

  it('handles scientific operations', () => {
    close(calculate('sin(90)', { angleMode: 'deg' }), 1);
    close(calculate('cos(pi)', { angleMode: 'rad' }), -1);
    expect(calculate('sqrt(81)')).toBe(9);
    expect(calculate('log(1000)')).toBe(3);
    close(calculate('ln(e)'), 1);
  });

  it('handles powers, unary minus, modulo, percent, factorial, and Ans', () => {
    expect(calculate('2^3^2')).toBe(512);
    expect(calculate('-2^2')).toBe(-4);
    expect(calculate('10 mod 3')).toBe(1);
    expect(calculate('50%')).toBe(0.5);
    expect(calculate('5!')).toBe(120);
    expect(calculate('Ans+5', { ans: 7 })).toBe(12);
  });

  it('handles implicit multiplication and formatting', () => {
    close(calculate('2π'), 2 * Math.PI);
    expect(calculate('2(3+4)')).toBe(14);
    expect(fmt(1000 / 3)).toBe('333.333333333');
  });

  it('supports x variables for graphing', () => {
    expect(calculate('x^2 + 2x + 1', { variables: { x: 3 } })).toBe(16);
    close(calculate('sin(x)', { angleMode: 'rad', variables: { x: Math.PI / 2 } }), 1);
  });

  it('requires variable values when variables are present', () => {
    expect(() => calculate('x+1')).toThrow('Missing value for x.');
  });
});
