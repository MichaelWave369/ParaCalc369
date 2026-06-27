import { useEffect, useMemo, useRef, useState } from 'react';
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

const GRAPH_PRESETS = [
  { label: 'sin', fn: 'sin(x)', min: -10, max: 10 },
  { label: 'x²', fn: 'x^2', min: -10, max: 10 },
  { label: 'wave', fn: 'sin(x)+cos(2x)', min: -10, max: 10 },
  { label: 'cubic', fn: 'x^3 - 4x', min: -4, max: 4 },
  { label: 'log', fn: 'log(x)', min: 0.1, max: 10 },
  { label: 'sqrt', fn: 'sqrt(x)', min: 0, max: 10 },
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

function niceRange(values) {
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

function drawGraph(canvas, points, yRange, theme) {
  const ctx = canvas.getContext('2d');
  const width = canvas.clientWidth || 640;
  const height = canvas.clientHeight || 320;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const isLight = theme === 'light';
  const grid = isLight ? 'rgba(31,41,75,.12)' : 'rgba(255,255,255,.10)';
  const axis = isLight ? 'rgba(31,41,75,.32)' : 'rgba(255,255,255,.24)';
  const line = isLight ? '#526dff' : '#9d74ff';
  const text = isLight ? 'rgba(17,24,39,.62)' : 'rgba(226,235,255,.68)';

  ctx.fillStyle = isLight ? 'rgba(255,255,255,.62)' : 'rgba(255,255,255,.035)';
  ctx.fillRect(0, 0, width, height);

  const xMin = points[0]?.x ?? -10;
  const xMax = points.at(-1)?.x ?? 10;
  const [yMin, yMax] = yRange;
  const xToPx = (x) => ((x - xMin) / (xMax - xMin)) * width;
  const yToPx = (y) => height - ((y - yMin) / (yMax - yMin)) * height;

  ctx.lineWidth = 1;
  ctx.strokeStyle = grid;
  for (let i = 1; i < 10; i += 1) {
    const x = (width * i) / 10;
    const y = (height * i) / 10;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }

  ctx.strokeStyle = axis;
  if (xMin <= 0 && xMax >= 0) { const x0 = xToPx(0); ctx.beginPath(); ctx.moveTo(x0, 0); ctx.lineTo(x0, height); ctx.stroke(); }
  if (yMin <= 0 && yMax >= 0) { const y0 = yToPx(0); ctx.beginPath(); ctx.moveTo(0, y0); ctx.lineTo(width, y0); ctx.stroke(); }

  ctx.strokeStyle = line;
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  let open = false;
  for (const p of points) {
    if (!Number.isFinite(p.y) || p.y < yMin || p.y > yMax) { if (open) ctx.stroke(); open = false; continue; }
    const x = xToPx(p.x);
    const y = yToPx(p.y);
    if (!open) { ctx.beginPath(); ctx.moveTo(x, y); open = true; }
    else ctx.lineTo(x, y);
  }
  if (open) ctx.stroke();

  ctx.fillStyle = text;
  ctx.font = '700 12px system-ui, sans-serif';
  ctx.fillText(`x ${fmt(xMin)} → ${fmt(xMax)}`, 12, height - 14);
  ctx.fillText(`y ${fmt(yMin)} → ${fmt(yMax)}`, 12, 22);
}

function GraphPanel({ angleMode, ans, theme }) {
  const canvasRef = useRef(null);
  const [fn, setFn] = useState('sin(x)');
  const [xMin, setXMin] = useState('-10');
  const [xMax, setXMax] = useState('10');
  const [graphStatus, setGraphStatus] = useState('Ready to plot.');
  const [points, setPoints] = useState([]);
  const [yRange, setYRange] = useState([-1, 1]);

  function plot(expression = fn, minValue = Number(xMin), maxValue = Number(xMax)) {
    try {
      const min = Number(minValue);
      const max = Number(maxValue);
      if (!Number.isFinite(min) || !Number.isFinite(max) || min >= max) throw Error('Use a valid x range.');
      const samples = 560;
      const next = [];
      for (let i = 0; i < samples; i += 1) {
        const x = min + ((max - min) * i) / (samples - 1);
        let y = NaN;
        try { y = calculate(expression, { angleMode, ans, variables: { x } }); } catch { y = NaN; }
        next.push({ x, y });
      }
      const finiteYs = next.map((p) => p.y).filter(Number.isFinite);
      if (!finiteYs.length) throw Error('No plottable points in this range.');
      const yr = niceRange(finiteYs);
      setPoints(next);
      setYRange(yr);
      setGraphStatus(`Plotted ${finiteYs.length}/${samples} points.`);
    } catch (e) {
      setGraphStatus(e.message);
      setPoints([]);
    }
  }

  function applyPreset(preset) {
    setFn(preset.fn);
    setXMin(String(preset.min));
    setXMax(String(preset.max));
    plot(preset.fn, preset.min, preset.max);
  }

  function zoom(factor) {
    const min = Number(xMin);
    const max = Number(xMax);
    if (!Number.isFinite(min) || !Number.isFinite(max) || min >= max) return setGraphStatus('Use a valid x range first.');
    const center = (min + max) / 2;
    const half = ((max - min) * factor) / 2;
    const nextMin = center - half;
    const nextMax = center + half;
    setXMin(fmt(nextMin));
    setXMax(fmt(nextMax));
    plot(fn, nextMin, nextMax);
  }

  function resetRange() {
    setXMin('-10');
    setXMax('10');
    plot(fn, -10, 10);
  }

  function exportPng() {
    if (!canvasRef.current || !points.length) return setGraphStatus('Plot a graph before exporting.');
    const link = document.createElement('a');
    link.download = `paracalc369-${fn.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'graph'}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    setGraphStatus('Graph exported as PNG.');
  }

  useEffect(() => { plot(); }, []);
  useEffect(() => { if (canvasRef.current && points.length) drawGraph(canvasRef.current, points, yRange, theme); }, [points, yRange, theme]);
  useEffect(() => {
    const resize = () => { if (canvasRef.current && points.length) drawGraph(canvasRef.current, points, yRange, theme); };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [points, yRange, theme]);

  return (
    <section className="card graph" aria-label="Graphing calculator">
      <header>
        <div>
          <p className="eyebrow">Graph Mode</p>
          <h2>Plot y = f(x)</h2>
        </div>
        <button onClick={() => plot()}>Plot</button>
      </header>
      <label>
        <span>Function</span>
        <input value={fn} onChange={(e) => setFn(e.target.value)} placeholder="sin(x), x^2, log(x)" />
      </label>
      <div className="preset-row" aria-label="Graph presets">
        {GRAPH_PRESETS.map((preset) => <button key={preset.label} onClick={() => applyPreset(preset)}>{preset.label}</button>)}
      </div>
      <div className="range-row">
        <label><span>x min</span><input value={xMin} onChange={(e) => setXMin(e.target.value)} /></label>
        <label><span>x max</span><input value={xMax} onChange={(e) => setXMax(e.target.value)} /></label>
      </div>
      <div className="graph-tools" aria-label="Graph tools">
        <button onClick={() => zoom(0.5)}>Zoom +</button>
        <button onClick={() => zoom(2)}>Zoom -</button>
        <button onClick={resetRange}>Reset</button>
        <button onClick={exportPng}>PNG</button>
      </div>
      <canvas ref={canvasRef} role="img" aria-label={`Graph of ${fn}`} />
      <p className="graph-status">{graphStatus}</p>
    </section>
  );
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
    const map = { '*': '×', '/': '÷', p: 'π', P: 'π', Enter: '=', Escape: 'AC', Backspace: '⌫' };
    const onKey = (e) => {
      if (e.target?.tagName === 'INPUT') return;
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
        <p className="eyebrow">MIT • free • scientific • graphing • GitHub Pages</p>
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

      <aside className="side-stack">
        <GraphPanel angleMode={mode} ans={ans} theme={theme} />
        <section className="card history">
          <header><h2>History</h2><button onClick={() => setHistory([])} disabled={!history.length}>Clear</button></header>
          {history.length ? history.map((h, i) => (
            <button key={`${h.expr}-${i}`} onClick={() => loadHistory(h)}>
              <span>{h.expr}</span><strong>{h.value}</strong>
            </button>
          )) : <p>No calculations yet.</p>}
        </section>
      </aside>
    </main>
  );
}
