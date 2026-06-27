import { describe, expect, it } from 'vitest';
import { historyToCsv, itemId, makeExportPackage, normalizeFavorites, normalizeHistory, parseExportPackage } from '../src/historyVault.js';

describe('history vault helpers', () => {
  const history = [
    { expr: '2+2', value: '4' },
    { expr: 'sqrt(81)', value: '9' },
    { bad: true },
  ];

  it('normalizes history and favorites', () => {
    expect(normalizeHistory(history)).toEqual([{ expr: '2+2', value: '4' }, { expr: 'sqrt(81)', value: '9' }]);
    expect(normalizeFavorites(['a', 'a', 7, 'b'])).toEqual(['a', 'b']);
  });

  it('creates stable item ids', () => {
    expect(itemId({ expr: '2+2', value: '4' })).toBe('2+2=>4');
  });

  it('exports and parses history packages', () => {
    const payload = makeExportPackage(history, ['2+2=>4']);
    const parsed = parseExportPackage(JSON.stringify(payload));
    expect(parsed.history.length).toBe(2);
    expect(parsed.favorites).toEqual(['2+2=>4']);
  });

  it('exports CSV with favorites', () => {
    const csv = historyToCsv(history, ['2+2=>4']);
    expect(csv).toContain('"favorite","expression","result"');
    expect(csv).toContain('"yes","2+2","4"');
    expect(csv).toContain('"no","sqrt(81)","9"');
  });
});
