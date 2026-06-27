import { useEffect, useMemo, useState } from 'react';
import { CATEGORIES, categoryNames, convert, formatConverted, unitsFor } from './converter.js';

function defaultUnit(category, index = 0) {
  return unitsFor(category)[index] || unitsFor(category)[0] || '';
}

function validCategory(category) {
  return CATEGORIES[category] ? category : 'length';
}

function validUnit(category, unit, fallbackIndex = 0) {
  const units = unitsFor(category);
  return units.includes(unit) ? unit : defaultUnit(category, fallbackIndex);
}

export default function UnitConverter({ initialState = {}, onStateChange = () => {} }) {
  const startCategory = validCategory(initialState.category || 'length');
  const [category, setCategory] = useState(startCategory);
  const [fromUnit, setFromUnit] = useState(validUnit(startCategory, initialState.fromUnit, 2));
  const [toUnit, setToUnit] = useState(validUnit(startCategory, initialState.toUnit, 5));
  const [value, setValue] = useState(initialState.value || '1');
  const [status, setStatus] = useState(initialState.category ? 'Loaded from shared URL' : 'Ready');

  const units = useMemo(() => unitsFor(category), [category]);
  const result = useMemo(() => {
    try { return formatConverted(convert(value, category, fromUnit, toUnit)); }
    catch { return '—'; }
  }, [value, category, fromUnit, toUnit]);

  useEffect(() => {
    onStateChange({ category, value, fromUnit, toUnit });
  }, [category, value, fromUnit, toUnit, onStateChange]);

  function chooseCategory(nextCategory) {
    const nextUnits = unitsFor(nextCategory);
    setCategory(nextCategory);
    setFromUnit(nextUnits[0]);
    setToUnit(nextUnits[1] || nextUnits[0]);
    setStatus(`${CATEGORIES[nextCategory].label} mode`);
  }

  function swap() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setStatus('Units swapped');
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(result);
      setStatus('Copied conversion');
    } catch {
      setStatus('Copy unavailable in this browser');
    }
  }

  return (
    <section className="card converter" aria-label="Unit converter">
      <header>
        <div>
          <p className="eyebrow">Unit Mode</p>
          <h2>Convert units</h2>
        </div>
        <button onClick={swap}>Swap</button>
      </header>

      <label>
        <span>Category</span>
        <select value={category} onChange={(e) => chooseCategory(e.target.value)}>
          {categoryNames().map((name) => <option key={name} value={name}>{CATEGORIES[name].label}</option>)}
        </select>
      </label>

      <label>
        <span>Value</span>
        <input value={value} onChange={(e) => (setValue(e.target.value), setStatus('Ready'))} inputMode="decimal" placeholder="Enter value" />
      </label>

      <div className="unit-row">
        <label>
          <span>From</span>
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {units.map((unit) => <option key={unit} value={unit}>{unit} · {CATEGORIES[category].units[unit].label}</option>)}
          </select>
        </label>
        <label>
          <span>To</span>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {units.map((unit) => <option key={unit} value={unit}>{unit} · {CATEGORIES[category].units[unit].label}</option>)}
          </select>
        </label>
      </div>

      <div className="conversion-result" aria-live="polite">
        <span>{value || '0'} {fromUnit}</span>
        <strong>{result} {toUnit}</strong>
      </div>

      <div className="converter-tools">
        <button onClick={() => setValue('1')}>1</button>
        <button onClick={() => setValue('10')}>10</button>
        <button onClick={() => setValue('100')}>100</button>
        <button onClick={copy}>Copy</button>
      </div>

      <p className="converter-status">{status}</p>
    </section>
  );
}
