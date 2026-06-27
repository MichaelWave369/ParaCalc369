export const CATEGORIES = {
  length: {
    label: 'Length',
    base: 'm',
    units: {
      mm: { label: 'millimeter', factor: 0.001 },
      cm: { label: 'centimeter', factor: 0.01 },
      m: { label: 'meter', factor: 1 },
      km: { label: 'kilometer', factor: 1000 },
      in: { label: 'inch', factor: 0.0254 },
      ft: { label: 'foot', factor: 0.3048 },
      yd: { label: 'yard', factor: 0.9144 },
      mi: { label: 'mile', factor: 1609.344 },
    },
  },
  mass: {
    label: 'Mass',
    base: 'kg',
    units: {
      mg: { label: 'milligram', factor: 0.000001 },
      g: { label: 'gram', factor: 0.001 },
      kg: { label: 'kilogram', factor: 1 },
      oz: { label: 'ounce', factor: 0.028349523125 },
      lb: { label: 'pound', factor: 0.45359237 },
      st: { label: 'stone', factor: 6.35029318 },
      ton: { label: 'US ton', factor: 907.18474 },
    },
  },
  temperature: {
    label: 'Temperature',
    base: 'C',
    units: {
      C: { label: 'Celsius' },
      F: { label: 'Fahrenheit' },
      K: { label: 'Kelvin' },
    },
  },
  time: {
    label: 'Time',
    base: 's',
    units: {
      ms: { label: 'millisecond', factor: 0.001 },
      s: { label: 'second', factor: 1 },
      min: { label: 'minute', factor: 60 },
      h: { label: 'hour', factor: 3600 },
      day: { label: 'day', factor: 86400 },
      week: { label: 'week', factor: 604800 },
      year: { label: 'year', factor: 31557600 },
    },
  },
  data: {
    label: 'Data',
    base: 'B',
    units: {
      bit: { label: 'bit', factor: 0.125 },
      B: { label: 'byte', factor: 1 },
      KB: { label: 'kilobyte', factor: 1000 },
      MB: { label: 'megabyte', factor: 1000000 },
      GB: { label: 'gigabyte', factor: 1000000000 },
      TB: { label: 'terabyte', factor: 1000000000000 },
      KiB: { label: 'kibibyte', factor: 1024 },
      MiB: { label: 'mebibyte', factor: 1048576 },
      GiB: { label: 'gibibyte', factor: 1073741824 },
    },
  },
  speed: {
    label: 'Speed',
    base: 'm/s',
    units: {
      'm/s': { label: 'meter/sec', factor: 1 },
      'km/h': { label: 'kilometer/hour', factor: 1 / 3.6 },
      mph: { label: 'mile/hour', factor: 0.44704 },
      knot: { label: 'knot', factor: 0.514444444444 },
      'ft/s': { label: 'foot/sec', factor: 0.3048 },
    },
  },
  area: {
    label: 'Area',
    base: 'm²',
    units: {
      'mm²': { label: 'square mm', factor: 0.000001 },
      'cm²': { label: 'square cm', factor: 0.0001 },
      'm²': { label: 'square meter', factor: 1 },
      ha: { label: 'hectare', factor: 10000 },
      'km²': { label: 'square km', factor: 1000000 },
      'in²': { label: 'square inch', factor: 0.00064516 },
      'ft²': { label: 'square foot', factor: 0.09290304 },
      acre: { label: 'acre', factor: 4046.8564224 },
      'mi²': { label: 'square mile', factor: 2589988.110336 },
    },
  },
  volume: {
    label: 'Volume',
    base: 'L',
    units: {
      mL: { label: 'milliliter', factor: 0.001 },
      L: { label: 'liter', factor: 1 },
      'm³': { label: 'cubic meter', factor: 1000 },
      tsp: { label: 'US teaspoon', factor: 0.00492892159375 },
      tbsp: { label: 'US tablespoon', factor: 0.01478676478125 },
      cup: { label: 'US cup', factor: 0.2365882365 },
      pt: { label: 'US pint', factor: 0.473176473 },
      qt: { label: 'US quart', factor: 0.946352946 },
      gal: { label: 'US gallon', factor: 3.785411784 },
      'ft³': { label: 'cubic foot', factor: 28.316846592 },
    },
  },
  angle: {
    label: 'Angle',
    base: 'rad',
    units: {
      deg: { label: 'degree', factor: Math.PI / 180 },
      rad: { label: 'radian', factor: 1 },
      grad: { label: 'gradian', factor: Math.PI / 200 },
      turn: { label: 'turn', factor: Math.PI * 2 },
    },
  },
};

export function categoryNames() {
  return Object.keys(CATEGORIES);
}

export function unitsFor(category) {
  return Object.keys(CATEGORIES[category]?.units || {});
}

function toCelsius(value, unit) {
  if (unit === 'C') return value;
  if (unit === 'F') return (value - 32) * (5 / 9);
  if (unit === 'K') return value - 273.15;
  throw Error(`Unknown temperature unit: ${unit}`);
}

function fromCelsius(value, unit) {
  if (unit === 'C') return value;
  if (unit === 'F') return value * (9 / 5) + 32;
  if (unit === 'K') return value + 273.15;
  throw Error(`Unknown temperature unit: ${unit}`);
}

export function convert(value, category, fromUnit, toUnit) {
  const n = Number(value);
  if (!Number.isFinite(n)) throw Error('Enter a valid number.');
  const config = CATEGORIES[category];
  if (!config) throw Error('Unknown conversion category.');
  if (!config.units[fromUnit] || !config.units[toUnit]) throw Error('Unknown unit.');
  if (category === 'temperature') return fromCelsius(toCelsius(n, fromUnit), toUnit);
  const base = n * config.units[fromUnit].factor;
  return base / config.units[toUnit].factor;
}

export function formatConverted(value) {
  if (!Number.isFinite(value)) return String(value);
  const abs = Math.abs(value);
  if (abs !== 0 && (abs >= 1e12 || abs < 1e-8)) return value.toExponential(8).replace(/(?:\.0+|0+)e/, 'e');
  return Number(value.toPrecision(12)).toString();
}
