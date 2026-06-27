import { describe, expect, it } from 'vitest';
import { categoryNames, convert, formatConverted, unitsFor } from '../src/converter.js';

const close = (a, b) => expect(a).toBeCloseTo(b, 10);

describe('ParaCalc369 unit converter', () => {
  it('lists categories and units', () => {
    expect(categoryNames()).toContain('length');
    expect(categoryNames()).toContain('temperature');
    expect(unitsFor('length')).toContain('ft');
    expect(unitsFor('data')).toContain('GiB');
  });

  it('converts length, mass, time, and speed', () => {
    close(convert(1, 'length', 'mi', 'ft'), 5280);
    close(convert(1, 'mass', 'kg', 'lb'), 2.20462262185);
    close(convert(2, 'time', 'h', 'min'), 120);
    close(convert(60, 'speed', 'mph', 'm/s'), 26.8224);
  });

  it('converts temperature with offsets', () => {
    close(convert(0, 'temperature', 'C', 'F'), 32);
    close(convert(212, 'temperature', 'F', 'C'), 100);
    close(convert(273.15, 'temperature', 'K', 'C'), 0);
  });

  it('converts data, area, volume, and angle', () => {
    close(convert(1, 'data', 'GiB', 'MiB'), 1024);
    close(convert(1, 'area', 'acre', 'ft²'), 43560);
    close(convert(1, 'volume', 'gal', 'L'), 3.785411784);
    close(convert(180, 'angle', 'deg', 'rad'), Math.PI);
  });

  it('formats converted values', () => {
    expect(formatConverted(1000 / 3)).toBe('333.333333333');
    expect(formatConverted(0.000000001)).toBe('1e-9');
  });
});
