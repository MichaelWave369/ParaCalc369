export const HISTORY_KEY = 'paracalc369.history.v1';
export const FAVORITES_KEY = 'paracalc369.history.favorites.v1';

export function itemId(item) {
  return `${item.expr || ''}=>${item.value || ''}`;
}

export function normalizeHistory(value) {
  return Array.isArray(value)
    ? value.filter((item) => item && typeof item.expr === 'string' && typeof item.value === 'string').slice(0, 200)
    : [];
}

export function normalizeFavorites(value) {
  return Array.isArray(value) ? [...new Set(value.filter((item) => typeof item === 'string'))] : [];
}

export function makeExportPackage(history, favorites) {
  return {
    app: 'ParaCalc369',
    version: 1,
    exportedAt: new Date().toISOString(),
    history: normalizeHistory(history),
    favorites: normalizeFavorites(favorites),
  };
}

export function parseExportPackage(value) {
  const payload = typeof value === 'string' ? JSON.parse(value) : value;
  return {
    history: normalizeHistory(payload?.history),
    favorites: normalizeFavorites(payload?.favorites),
  };
}

function csvEscape(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

export function historyToCsv(history, favorites = []) {
  const favs = new Set(favorites);
  const rows = [['favorite', 'expression', 'result']];
  for (const item of normalizeHistory(history)) rows.push([favs.has(itemId(item)) ? 'yes' : 'no', item.expr, item.value]);
  return rows.map((row) => row.map(csvEscape).join(',')).join('\n');
}
