import { useEffect, useMemo, useState } from 'react';
import { calculate, fmt } from './calc.js';

const SCI = ['sin(', 'cos(', 'tan(', 'asin(', 'acos(', 'atan(', 'sqrt(', 'ln(', 'log(', 'exp(', 'abs(', '!'];
const OPS = ['(', ')', '^', '÷', '×', '-', '+', '%', 'mod'];
const NUM = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', 'π'];
const STORE = 'paracalc369.history.v1';

function savedHistory() {
  try { return JSON.parse(localStorage.getItem(STORE)) || []; } catch { return []; }
}

function klass(k) {
  if (k === '=') return 'key equals wide';
  if (['AC', 'C', '⌫'].includes(k)) return 'key danger';
  if (['MC', 'MR', 'M+', 'M-'].includes(k)) return 'key memory';
  if ([...SCI, ...OPS, 'e', 'Ans'].includes(k)) return 'key op';
  return 'key';
}

export default function App() {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('0');
  const [ans, setAns] = useState(0);
  const [mode, setMode] = useState('deg');
  const [mem, setMem] = useState(0);
  const [err, setErr] = useState('');
  const [history, setHistory] = useState(savedHistory);

  const preview = useMemo(() => {
    try { return expr.trim() ? fmt(calculate(expr, { angleMode: mode, ans })) : ''; }
    catch { return ''; }
  }, [expr, mode, ans]);

  useEffect(() => localStorage.setItem(STORE, JSON.stringify(history.slice(0, 20))), [history]);

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
    setExpr((s) => (s === '0' && /[0-9.π]/.test(token) ? token : s + token));
  }

  function run(target = expr) {
    try {
      const value = calculate(target, { angleMode: mode, ans });
      const shown = fmt(value);
      setAns(value);
      setResult(shown);
      setExpr(shown);
      setErr('');
      setHistory((h) => [{ expr: target, value: shown }, ...h].slice(0, 20));
    } catch (e) { setErr(e.message); }
  }

  function memory(sign) {
    try {
      const value = expr.trim() ? calculate(expr, { angleMode: mode, ans }) : Number(result);
      setMem((m) => m + sign * value);
      setErr('');
    } catch (e) { setErr(e.message); }
  }

  function press(k) {
    setErr('');
    if (k === 'AC') return void (setExpr(''), setResult('0'));
    if (k === 'C') return void setExpr('');
    if (k === '⌫') return void setExpr((s) => s.slice(0, -1));
    if (k === '=') return run();
    if (k === 'DEG/RAD') return void setMode((m) => (m === 'deg' ? 'rad' : 'deg'));
    if (k === 'MC') return void setMem(0);
    if (k === 'MR') return push(fmt(mem));
    if (k === 'M+') return memory(1);
    if (k === 'M-') return memory(-1);
    push(k);
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
          <div className="status"><span>{mode.toUpperCase()}</span><span>MEM {fmt(mem)}</span></div>
          <input value={expr} onChange={(e) => (setExpr(e.target.value), setErr(''))} placeholder="0" aria-label="Expression" />
          <div className="status"><span>{err || (preview ? `≈ ${preview}` : 'Ready')}</span><strong>{result}</strong></div>
        </div>
        <div className="grid">
          {['AC', 'C', '⌫', 'DEG/RAD', 'MC', 'MR', 'M+', 'M-', ...SCI, ...OPS, ...NUM, 'e', 'Ans', '='].map((k) => (
            <button key={k} className={klass(k)} onClick={() => press(k)}>{k.replace('sqrt(', '√(')}</button>
          ))}
        </div>
      </section>

      <aside className="card history">
        <header><h2>History</h2><button onClick={() => setHistory([])} disabled={!history.length}>Clear</button></header>
        {history.length ? history.map((h, i) => (
          <button key={`${h.expr}-${i}`} onClick={() => (setExpr(h.expr), setResult(h.value))}>
            <span>{h.expr}</span><strong>{h.value}</strong>
          </button>
        )) : <p>No calculations yet.</p>}
      </aside>
    </main>
  );
}
