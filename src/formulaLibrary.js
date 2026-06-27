export const FORMULA_SECTIONS = [
  {
    id: 'geometry',
    label: 'Geometry',
    formulas: [
      { name: 'Rectangle area', formula: 'A = w × h', example: '12*8', note: 'Width times height.' },
      { name: 'Triangle area', formula: 'A = 0.5 × b × h', example: '0.5*10*6', note: 'Half base times height.' },
      { name: 'Circle area', formula: 'A = πr²', example: 'π*5^2', note: 'Use radius, not diameter.' },
      { name: 'Circle circumference', formula: 'C = 2πr', example: '2*π*5', note: 'Distance around a circle.' },
      { name: 'Pythagorean theorem', formula: 'c = √(a² + b²)', example: 'sqrt(3^2+4^2)', note: 'Right triangle hypotenuse.' },
      { name: 'Sphere volume', formula: 'V = 4/3 × πr³', example: '(4/3)*π*3^3', note: 'Volume of a sphere.' },
    ],
  },
  {
    id: 'physics',
    label: 'Physics basics',
    formulas: [
      { name: 'Speed', formula: 'v = d / t', example: '120/2', note: 'Distance divided by time.' },
      { name: 'Force', formula: 'F = m × a', example: '10*9.80665', note: 'Mass times acceleration.' },
      { name: 'Kinetic energy', formula: 'KE = 0.5 × m × v²', example: '0.5*80*12^2', note: 'Motion energy.' },
      { name: 'Potential energy', formula: 'PE = m × g × h', example: '80*9.80665*10', note: 'Near Earth surface.' },
      { name: 'Ohm law', formula: 'V = I × R', example: '2*12', note: 'Voltage from current and resistance.' },
      { name: 'Electrical power', formula: 'P = V × I', example: '120*2.5', note: 'Basic DC/ideal power relation.' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    formulas: [
      { name: 'Simple interest', formula: 'A = P × (1 + r × t)', example: '1000*(1+0.05*3)', note: 'r is annual rate as decimal.' },
      { name: 'Compound interest', formula: 'A = P × (1 + r/n)^(n×t)', example: '1000*(1+0.05/12)^(12*3)', note: 'n compounding periods per year.' },
      { name: 'Percent change', formula: 'Δ% = (new - old) / old × 100', example: '((125-100)/100)*100', note: 'Positive means increase.' },
      { name: 'Markup', formula: 'price = cost × (1 + markup)', example: '25*(1+0.4)', note: 'Markup as decimal.' },
      { name: 'Discount', formula: 'sale = price × (1 - discount)', example: '80*(1-0.25)', note: 'Discount as decimal.' },
    ],
  },
  {
    id: 'unit_helpers',
    label: 'Unit helpers',
    formulas: [
      { name: 'Fahrenheit to Celsius', formula: 'C = (F - 32) × 5/9', example: '(72-32)*5/9', note: 'Temperature conversion.' },
      { name: 'Celsius to Fahrenheit', formula: 'F = C × 9/5 + 32', example: '22*9/5+32', note: 'Temperature conversion.' },
      { name: 'Miles to kilometers', formula: 'km = mi × 1.609344', example: '26.2*1.609344', note: 'Length conversion.' },
      { name: 'Pounds to kilograms', formula: 'kg = lb × 0.45359237', example: '180*0.45359237', note: 'Mass conversion.' },
      { name: 'Gallons to liters', formula: 'L = gal × 3.785411784', example: '5*3.785411784', note: 'US liquid gallon.' },
    ],
  },
];

export const CONSTANTS = [
  { symbol: 'π', name: 'Pi', value: 'π', numeric: Math.PI, note: 'Circle constant.' },
  { symbol: 'e', name: 'Euler number', value: 'e', numeric: Math.E, note: 'Natural growth constant.' },
  { symbol: 'g', name: 'Earth gravity', value: '9.80665', numeric: 9.80665, note: 'Standard gravity in m/s².' },
  { symbol: 'c', name: 'Speed of light', value: '299792458', numeric: 299792458, note: 'Meters per second.' },
  { symbol: 'φ', name: 'Golden ratio', value: '1.61803398875', numeric: 1.61803398875, note: 'Approximate golden ratio.' },
];

export function allFormulas() {
  return FORMULA_SECTIONS.flatMap((section) => section.formulas.map((formula) => ({ ...formula, section: section.label })));
}

export function searchFormulas(query) {
  const q = query.trim().toLowerCase();
  if (!q) return allFormulas();
  return allFormulas().filter((item) => [item.name, item.formula, item.note, item.section].join(' ').toLowerCase().includes(q));
}

export function findConstant(symbol) {
  return CONSTANTS.find((constant) => constant.symbol === symbol || constant.name.toLowerCase() === symbol.toLowerCase());
}
