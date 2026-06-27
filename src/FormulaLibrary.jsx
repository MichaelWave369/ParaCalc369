import { useEffect, useMemo, useState } from 'react';
import { CONSTANTS, FORMULA_SECTIONS, searchFormulas } from './formulaLibrary.js';
import { TOOL_EVENTS } from './toolDockEvents.js';

export default function FormulaLibrary() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Ready');
  const results = useMemo(() => searchFormulas(query), [query]);

  useEffect(() => {
    const openFromDock = () => setOpen(true);
    window.addEventListener(TOOL_EVENTS.formulas, openFromDock);
    return () => window.removeEventListener(TOOL_EVENTS.formulas, openFromDock);
  }, []);

  async function copy(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(`${label} copied.`);
    } catch {
      setStatus('Copy unavailable in this browser.');
    }
  }

  return (
    <>
      <button className="formula-fab" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open} aria-label="Open formula library">f</button>
      {open ? (
        <div className="formula-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section className="formula-dialog" role="dialog" aria-modal="true" aria-labelledby="formula-title" onMouseDown={(e) => e.stopPropagation()}>
            <header>
              <div>
                <p className="eyebrow">Formula Mode</p>
                <h2 id="formula-title">Formula Library</h2>
              </div>
              <button onClick={() => setOpen(false)}>Close</button>
            </header>

            <label className="formula-search">
              <span>Search</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="geometry, force, interest, Celsius" />
            </label>

            <section className="constant-strip" aria-label="Constants">
              {CONSTANTS.map((constant) => (
                <button key={constant.symbol} onClick={() => copy(constant.value, constant.name)} title={constant.note}>
                  <strong>{constant.symbol}</strong>
                  <span>{constant.value}</span>
                </button>
              ))}
            </section>

            {query ? (
              <div className="formula-list">
                {results.map((item) => <FormulaCard key={`${item.section}-${item.name}`} item={item} copy={copy} />)}
              </div>
            ) : (
              FORMULA_SECTIONS.map((section) => (
                <section className="formula-section" key={section.id}>
                  <h3>{section.label}</h3>
                  <div className="formula-list">
                    {section.formulas.map((item) => <FormulaCard key={item.name} item={{ ...item, section: section.label }} copy={copy} />)}
                  </div>
                </section>
              ))
            )}

            <p className="formula-status">{status}</p>
          </section>
        </div>
      ) : null}
    </>
  );
}

function FormulaCard({ item, copy }) {
  const text = `${item.name}: ${item.formula}. Example: ${item.example}. ${item.note}`;
  return (
    <article className="formula-card">
      <div>
        <span>{item.section}</span>
        <h4>{item.name}</h4>
        <code>{item.formula}</code>
        <p>Example: <code>{item.example}</code></p>
        <p>{item.note}</p>
      </div>
      <button onClick={() => copy(text, item.name)}>Copy</button>
    </article>
  );
}
