import { useEffect, useRef, useState } from 'react';
import { TOOL_EVENTS } from './toolDockEvents.js';

const SHORTCUTS = [
  ['/', 'Focus the main calculator input'],
  ['?', 'Open or close this help panel'],
  ['Escape', 'Close help or clear focus'],
  ['Enter', 'Solve when calculator buttons are focused'],
  ['0–9 . + - ^ % ( )', 'Type directly into calculator inputs'],
  ['Backspace', 'Delete one character from calculator input'],
  ['P', 'Type π when calculator input is not focused'],
];

function focusExpression() {
  const input = document.querySelector('[data-shortcut-target="calculator-input"], [aria-label="Expression"]');
  if (input) {
    input.focus();
    input.select?.();
  }
}

export default function KeyboardHelp() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    const openFromDock = () => setOpen(true);
    window.addEventListener(TOOL_EVENTS.help, openFromDock);
    return () => window.removeEventListener(TOOL_EVENTS.help, openFromDock);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      const tag = event.target?.tagName;
      const typing = tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA';
      if (event.key === '?' && !typing) {
        event.preventDefault();
        setOpen((v) => !v);
      }
      if (event.key === '/' && !typing) {
        event.preventDefault();
        focusExpression();
      }
      if (event.key === 'Escape' && open) {
        event.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <>
      <button className="help-fab" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open} aria-keyshortcuts="?" aria-label="Open keyboard shortcuts">?</button>
      {open ? (
        <div className="help-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section className="help-dialog" role="dialog" aria-modal="true" aria-labelledby="keyboard-help-title" onMouseDown={(e) => e.stopPropagation()}>
            <header>
              <div>
                <p className="eyebrow">Keyboard Power Mode</p>
                <h2 id="keyboard-help-title">Shortcuts</h2>
              </div>
              <button ref={closeRef} onClick={() => setOpen(false)}>Close</button>
            </header>
            <div className="shortcut-list">
              {SHORTCUTS.map(([key, action]) => (
                <div className="shortcut-row" key={key}>
                  <kbd>{key}</kbd>
                  <span>{action}</span>
                </div>
              ))}
            </div>
            <p className="help-note">Tip: calculator, graph, and unit fields are normal inputs, so browser text editing shortcuts still work.</p>
          </section>
        </div>
      ) : null}
    </>
  );
}
