const KEYS = ['expr', 'gfn', 'gmin', 'gmax', 'ucat', 'uval', 'ufrom', 'uto'];

export function readSharedState(search = window.location.search) {
  const params = new URLSearchParams(search);
  const state = {
    expr: params.get('expr') || '',
    graph: {
      fn: params.get('gfn') || '',
      min: params.get('gmin') || '',
      max: params.get('gmax') || '',
    },
    unit: {
      category: params.get('ucat') || '',
      value: params.get('uval') || '',
      fromUnit: params.get('ufrom') || '',
      toUnit: params.get('uto') || '',
    },
  };
  return state;
}

export function hasSharedState(search = window.location.search) {
  const params = new URLSearchParams(search);
  return KEYS.some((key) => params.has(key));
}

export function buildShareUrl(state, base = window.location.href) {
  const url = new URL(base);
  for (const key of KEYS) url.searchParams.delete(key);

  const expr = state?.expr?.trim();
  const graph = state?.graph || {};
  const unit = state?.unit || {};

  if (expr) url.searchParams.set('expr', expr);
  if (graph.fn?.trim()) url.searchParams.set('gfn', graph.fn.trim());
  if (String(graph.min || '').trim()) url.searchParams.set('gmin', String(graph.min).trim());
  if (String(graph.max || '').trim()) url.searchParams.set('gmax', String(graph.max).trim());
  if (unit.category) url.searchParams.set('ucat', unit.category);
  if (String(unit.value || '').trim()) url.searchParams.set('uval', String(unit.value).trim());
  if (unit.fromUnit) url.searchParams.set('ufrom', unit.fromUnit);
  if (unit.toUnit) url.searchParams.set('uto', unit.toUnit);

  return url.toString();
}

export function clearShareParams(base = window.location.href) {
  const url = new URL(base);
  for (const key of KEYS) url.searchParams.delete(key);
  return url.toString();
}
