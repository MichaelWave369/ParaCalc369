export const FORMULA_SECTIONS = [
  {
    id: 'geometry',
    label: 'Geometry',
    formulas: [
      { name: 'Rectangle area', formula: 'A = w × h', example: '12*8', note: 'Width times height.', tags: ['area', 'shape'] },
      { name: 'Triangle area', formula: 'A = 0.5 × b × h', example: '0.5*10*6', note: 'Half base times height.', tags: ['area', 'shape'] },
      { name: 'Circle area', formula: 'A = πr²', example: 'π*5^2', note: 'Use radius, not diameter.', tags: ['area', 'circle'] },
      { name: 'Circle circumference', formula: 'C = 2πr', example: '2*π*5', note: 'Distance around a circle.', tags: ['circle', 'perimeter'] },
      { name: 'Pythagorean theorem', formula: 'c = √(a² + b²)', example: 'sqrt(3^2+4^2)', note: 'Right triangle hypotenuse.', tags: ['triangle', 'distance'] },
      { name: 'Sphere volume', formula: 'V = 4/3 × πr³', example: '(4/3)*π*3^3', note: 'Volume of a sphere.', tags: ['volume', 'sphere'] },
    ],
  },
  {
    id: 'algebra',
    label: 'Algebra',
    formulas: [
      { name: 'Slope', formula: 'm = (y₂ - y₁) / (x₂ - x₁)', example: '(9-3)/(4-1)', note: 'Rate of change between two points.', tags: ['line', 'rate'] },
      { name: 'Line value', formula: 'y = m × x + b', example: '2*5+3', note: 'Slope-intercept form.', tags: ['line', 'linear'] },
      { name: 'Quadratic discriminant', formula: 'D = b² - 4ac', example: '5^2-4*1*6', note: 'Shows root type for ax²+bx+c.', tags: ['quadratic', 'roots'] },
      { name: 'Quadratic root plus', formula: 'x = (-b + √D) / 2a', example: '(-5+sqrt(5^2-4*1*6))/(2*1)', note: 'One root of a quadratic.', tags: ['quadratic', 'roots'] },
      { name: 'Average rate', formula: 'rate = change / time', example: '(100-40)/3', note: 'Useful for simple linear change.', tags: ['rate', 'change'] },
    ],
  },
  {
    id: 'trigonometry',
    label: 'Trigonometry',
    formulas: [
      { name: 'Sine ratio', formula: 'sin(θ) = opposite / hypotenuse', example: 'sin(30)', note: 'Uses calculator angle mode.', tags: ['sine', 'triangle'] },
      { name: 'Cosine ratio', formula: 'cos(θ) = adjacent / hypotenuse', example: 'cos(60)', note: 'Uses calculator angle mode.', tags: ['cosine', 'triangle'] },
      { name: 'Tangent ratio', formula: 'tan(θ) = opposite / adjacent', example: 'tan(45)', note: 'Uses calculator angle mode.', tags: ['tangent', 'triangle'] },
      { name: 'Radians from degrees', formula: 'rad = deg × π / 180', example: '90*π/180', note: 'Converts degrees to radians.', tags: ['angle', 'radians'] },
      { name: 'Degrees from radians', formula: 'deg = rad × 180 / π', example: 'π*180/π', note: 'Converts radians to degrees.', tags: ['angle', 'degrees'] },
    ],
  },
  {
    id: 'statistics',
    label: 'Statistics',
    formulas: [
      { name: 'Mean of three', formula: 'mean = (a + b + c) / 3', example: '(12+18+24)/3', note: 'Simple average of three values.', tags: ['average', 'mean'] },
      { name: 'Weighted average', formula: 'avg = Σ(value × weight) / Σ(weight)', example: '(90*0.4+75*0.6)/(0.4+0.6)', note: 'Average with weights.', tags: ['average', 'weight'] },
      { name: 'Range', formula: 'range = max - min', example: '98-63', note: 'Spread between largest and smallest values.', tags: ['spread', 'range'] },
      { name: 'Population variance of three', formula: 'σ² = Σ(x - μ)² / 3', example: '((2-4)^2+(4-4)^2+(6-4)^2)/3', note: 'Average squared distance from mean.', tags: ['variance', 'spread'] },
      { name: 'Population standard deviation', formula: 'σ = √variance', example: 'sqrt(((2-4)^2+(4-4)^2+(6-4)^2)/3)', note: 'Square root of variance.', tags: ['standard deviation', 'spread'] },
    ],
  },
  {
    id: 'physics',
    label: 'Physics basics',
    formulas: [
      { name: 'Speed', formula: 'v = d / t', example: '120/2', note: 'Distance divided by time.', tags: ['motion', 'rate'] },
      { name: 'Force', formula: 'F = m × a', example: '10*9.80665', note: 'Mass times acceleration.', tags: ['newton', 'motion'] },
      { name: 'Kinetic energy', formula: 'KE = 0.5 × m × v²', example: '0.5*80*12^2', note: 'Motion energy.', tags: ['energy', 'motion'] },
      { name: 'Potential energy', formula: 'PE = m × g × h', example: '80*9.80665*10', note: 'Near Earth surface.', tags: ['energy', 'gravity'] },
    ],
  },
  {
    id: 'electricity',
    label: 'Electricity',
    formulas: [
      { name: 'Ohm law voltage', formula: 'V = I × R', example: '2*12', note: 'Voltage from current and resistance.', tags: ['ohm', 'voltage'] },
      { name: 'Ohm law current', formula: 'I = V / R', example: '24/12', note: 'Current from voltage and resistance.', tags: ['ohm', 'current'] },
      { name: 'Ohm law resistance', formula: 'R = V / I', example: '24/2', note: 'Resistance from voltage and current.', tags: ['ohm', 'resistance'] },
      { name: 'Electrical power', formula: 'P = V × I', example: '120*2.5', note: 'Basic DC/ideal power relation.', tags: ['power', 'watts'] },
      { name: 'Power from current', formula: 'P = I² × R', example: '2^2*12', note: 'Power from current and resistance.', tags: ['power', 'resistance'] },
      { name: 'Energy use', formula: 'Wh = W × h', example: '60*8', note: 'Watt-hours from watts over hours.', tags: ['energy', 'watt-hour'] },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    formulas: [
      { name: 'Simple interest', formula: 'A = P × (1 + r × t)', example: '1000*(1+0.05*3)', note: 'r is annual rate as decimal.', tags: ['interest', 'money'] },
      { name: 'Compound interest', formula: 'A = P × (1 + r/n)^(n×t)', example: '1000*(1+0.05/12)^(12*3)', note: 'n compounding periods per year.', tags: ['interest', 'growth'] },
      { name: 'Percent change', formula: 'Δ% = (new - old) / old × 100', example: '((125-100)/100)*100', note: 'Positive means increase.', tags: ['percent', 'change'] },
      { name: 'Markup', formula: 'price = cost × (1 + markup)', example: '25*(1+0.4)', note: 'Markup as decimal.', tags: ['percent', 'price'] },
      { name: 'Discount', formula: 'sale = price × (1 - discount)', example: '80*(1-0.25)', note: 'Discount as decimal.', tags: ['percent', 'price'] },
    ],
  },
  {
    id: 'unit_helpers',
    label: 'Unit helpers',
    formulas: [
      { name: 'Fahrenheit to Celsius', formula: 'C = (F - 32) × 5/9', example: '(72-32)*5/9', note: 'Temperature conversion.', tags: ['temperature', 'conversion'] },
      { name: 'Celsius to Fahrenheit', formula: 'F = C × 9/5 + 32', example: '22*9/5+32', note: 'Temperature conversion.', tags: ['temperature', 'conversion'] },
      { name: 'Miles to kilometers', formula: 'km = mi × 1.609344', example: '26.2*1.609344', note: 'Length conversion.', tags: ['length', 'conversion'] },
      { name: 'Pounds to kilograms', formula: 'kg = lb × 0.45359237', example: '180*0.45359237', note: 'Mass conversion.', tags: ['mass', 'conversion'] },
      { name: 'Gallons to liters', formula: 'L = gal × 3.785411784', example: '5*3.785411784', note: 'US liquid gallon.', tags: ['volume', 'conversion'] },
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
  return FORMULA_SECTIONS.flatMap((section) => section.formulas.map((formula) => ({ ...formula, section: section.label, sectionId: section.id })));
}

export function searchFormulas(query) {
  const q = query.trim().toLowerCase();
  if (!q) return allFormulas();
  return allFormulas().filter((item) => [item.name, item.formula, item.note, item.section, ...(item.tags || [])].join(' ').toLowerCase().includes(q));
}

export function findConstant(symbol) {
  return CONSTANTS.find((constant) => constant.symbol === symbol || constant.name.toLowerCase() === symbol.toLowerCase());
}
