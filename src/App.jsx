import { useEffect, useMemo, useState } from 'react';
import { calculate, fmt } from './calc.js';

const STORE = 'paracalc369.history.v1';
const THEME_STORE = 'paracalc369.theme.v1';

const KEYS = [
  ['AC', 'C', '⌫', 'Copy', 'DEG/RAD'],
  ['MC', 'MR', 'M+', 'M-', 'Theme'],
  ['sin(', 'cos(', 'tan(', 'sqrt(', '^'],
  ['asin(', 'acos(', 'atan(', 'ln(', 'log('],
  ['(', ')', 'π', 'e', 'Ans'],
  ['7', '8', '9', '÷', '%'],
  ['4', '5', '6', '×', 'mod'],
  ['1', '2', '3', '-', '!'],
  ['0', '.', '+', '='],
];

const DANGER = new Set(['AC', 'C', '⌫']);
const MEMORY = new Set(['MC', 'MR', 'M+', 'M-']);
const CONTROL = new Set(['Copy', 'DEG/RAD', 'Theme']);
const OPERATOR = new Set(['sin(', 'cos(', 'tan(', 'sqrt(', 'asin(', 'acos(', 'atan(', 'ln(', 'log(', '(', ')', '^', '÷', '×', '-', '+', '%', 'mod', '!', 'e', 'π', 'Ans']);

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

function savedHistory() {
  return readJson(STORE, []);
}

function savedTheme() {
  return readJson(THEME_STORE, 'dark');
}

function klass(k) {
  const names = ['key'];
  if (k === '=') names.push('equals', 'wide');
  if (DANGER.has(k)) names.push('danger');
  if (MEMORY.has(k)) names.push('memory');
  if (CONTROL.has(k)) names.push('control');
  if (OPERATOR.has(k)) names.push('op');
  return names.join(' ');
}

function label(k, mode, theme) {
  if (k === 'sqrt(') return '√(';
  if (k === 'DEG/RAD') return mode.toUpperCase();
  if (k === 'Theme') return theme === 'dark' ? 'Light' : 'Dark';
  return k;
}

export default function App() {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('0');
  const [ans, setAns] = useState(0);
  const [mode, setMode] = useState('deg');
  const [mem, setMem] = useState(0);
  const [status, setStatus] = useState('Ready');
  const [history, setHistory] = useState(savedHistory);
  const [theme, setTheme] = useState(savedTheme);

  const preview = useMemo(() => {
    try { return expr.trim() ? fmt(calculate(expr, { angleMode: mode, ans })) : ''; }
    catch { return ''; }
  }, [expr, mode, ans]);

  useEffect(() => localStorage.setItem(STORE, JSON.stringify(history.slice(0, 20))), [history]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORE, JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    const map = { '*': '×', '/': '÷', x: '×', X: '×', p: 'π', P: 'π', Enter: '=', Escape: 'AC', Backspace: '⌫' };
    const onKey = (e) => {
      const k = /^[0-9.]$/.test(e.key) || ['+', '-', '^', '%', '(', ')'].includes(e.key) ? e.key : map[e.key];
      if (k) { e.preventDefault(); press(k); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  function push(token) {
    setStatus('Ready');
    setExpr((s) => (s === '0' && /[0-9.π]/.test(token) ? token : s + token));
  }

  function run(target = expr) {
    try {
      const value = calculate(target, { angleMode: mode, ans });
      const shown = fmt(value);
      setAns(value);
      setResult(shown);
      setExpr(shown);
      setStatus('Solved');
      setHistory((h) => [{ expr: target, value: shown }, ...h].slice(0, 20));
    } catch (e) { setStatus(e.message); }
  }

  function memory(sign) {
    try {
      const value = expr.trim() ? calculate(expr, { angleMode: mode, ans }) : Number(result);
      setMem((m) => m + sign * value);
      setStatus(sign > 0 ? 'Added to memory' : 'Subtracted from memory');
    } catch (e) { setStatus(e.message); }
  }

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(result);
      setStatus('Copied result');
    } catch {
      setStatus('Copy unavailable in this browser');
    }
  }

  function clearAll() {
    setExpr('');
    setResult('0');
    setStatus('Ready');
  }

  function press(k) {
    if (k === 'AC') return clearAll();
    if (k === 'C') return void (setExpr(''), setStatus('Expression cleared'));
    if (k === '⌫') return void (setExpr((s) => s.slice(0, -1)), setStatus('Ready'));
    if (k === '=') return run();
    if (k === 'DEG/RAD') return void (setMode((m) => (m === 'deg' ? 'rad' : 'deg')), setStatus('Angle mode changed'));
    if (k === 'Theme') return void setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    if (k === 'Copy') return copyResult();
    if (k === 'MC') return void (setMem(0), setStatus('Memory cleared'));
    if (k === 'MR') return push(fmt(mem));
    if (k === 'M+') return memory(1);
    if (k === 'M-') return memory(-1);
    push(k);
  }

  function loadHistory(item) {
    setExpr(item.expr);
    setResult(item.value);
    setStatus('Loaded from history');
  }

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">MIT • free • scientific • GitHub Pages</p>
        <h1>ParaCalc369</h1>
        <p>A clean calculator for students, builders, and curious humans. No unsafe eval; expressions are parsed in-app.</p>
      </section>

      <section className="card calc" aria-label="Scientific calculator">
        <div className="display">
          <div className="display-top">
            <span>{mode.toUpperCase()}</span>
            <span>MEM {fmt(mem)}</span>
          </div>
          <input value={expr} onChange={(e) => (setExpr(e.target.value), setStatus('Ready'))} placeholder="Type or tap a calculation" aria-label="Expression" />
          <div className="preview" aria-live="polite">{preview ? `Preview ${preview}` : status}</div>
          <div className="result-row">
            <span>Result</span>
            <strong>{result}</strong>
          </div>
        </div>
        <div className="grid">
          {KEYS.flat().map((k) => (
            <button key={k} className={klass(k)} onClick={() => press(k)} aria-label={k === 'DEG/RAD' ? `Angle mode ${mode}` : k}>{label(k, mode, theme)}</button>
          ))}
        </div>
      </section>

      <aside className="card history">
        <header><h2>History</h2><button onClick={() => setHistory([])} disabled={!history.length}>Clear</button></header>
        {history.length ? history.map((h, i) => (
          <button key={`${h.expr}-${i}`} onClick={() => loadHistory(h)}>
            <span>{h.expr}</span><strong>{h.value}</strong>
          </button>
        )) : <p>No calculations yet.</p>}
      </aside>
    </main>
  );
}
