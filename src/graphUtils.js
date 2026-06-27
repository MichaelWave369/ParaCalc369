export function niceRange(values) {
  const finite = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!finite.length) return [-10, 10];
  const lowIndex = Math.floor(finite.length * 0.02);
  const highIndex = Math.ceil(finite.length * 0.98) - 1;
  const min = finite[Math.max(0, lowIndex)];
  const max = finite[Math.min(finite.length - 1, highIndex)];
  if (!Number.isFinite(min) || !Number.isFinite(max) || min === max) return [min - 1, max + 1];
  const pad = Math.max((max - min) * 0.12, 1e-6);
  return [min - pad, max + pad];
}

export function resolveYRange(values, yMinText = '', yMaxText = '') {
  const minText = String(yMinText ?? '').trim();
  const maxText = String(yMaxText ?? '').trim();
  if (minText || maxText) {
    const min = Number(minText);
    const max = Number(maxText);
    if (!Number.isFinite(min) || !Number.isFinite(max) || min >= max) {
      throw Error('Use valid y min and y max, or leave both blank for auto y range.');
    }
    return { range: [min, max], mode: 'manual' };
  }
  return { range: niceRange(values), mode: 'auto' };
}

export function graphCaption({ fn, xMin, xMax, yMin, yMax, angleMode }) {
  return `y = ${fn || 'f(x)'} | x ${xMin} to ${xMax} | y ${yMin} to ${yMax} | ${String(angleMode || 'rad').toUpperCase()}`;
}
