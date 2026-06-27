const OPS = {
  '+': [2, 'l', 2, (a, b) => a + b],
  '-': [2, 'l', 2, (a, b) => a - b],
  '*': [3, 'l', 2, (a, b) => a * b],
  '/': [3, 'l', 2, (a, b) => { if (b === 0) throw Error('Cannot divide by zero.'); return a / b; }],
  mod: [3, 'l', 2, (a, b) => { if (b === 0) throw Error('Cannot modulo by zero.'); return a % b; }],
  'u-': [4, 'r', 1, (a) => -a],
  '^': [5, 'r', 2, (a, b) => a ** b],
  '%': [6, 'l', 1, (a) => a / 100, true],
  '!': [6, 'l', 1, factorial, true],
};

const FUN = {
  sin: (x, m) => Math.sin(rad(x, m)),
  cos: (x, m) => Math.cos(rad(x, m)),
  tan: (x, m) => {
    const r = rad(x, m);
    if (Math.abs(Math.cos(r)) < 1e-14) throw Error('tan is undefined for this angle.');
    return Math.tan(r);
  },
  asin: (x, m) => out(Math.asin(x), m),
  acos: (x, m) => out(Math.acos(x), m),
  atan: (x, m) => out(Math.atan(x), m),
  sqrt: (x) => guard(x >= 0, 'sqrt needs a non-negative number.', Math.sqrt(x)),
  ln: (x) => guard(x > 0, 'ln needs a positive number.', Math.log(x)),
  log: (x) => guard(x > 0, 'log needs a positive number.', Math.log10(x)),
  exp: Math.exp,
  abs: Math.abs,
};

const rad = (x, m) => (m === 'deg' ? (x * Math.PI) / 180 : x);
const out = (x, m) => (m === 'deg' ? (x * 180) / Math.PI : x);
const guard = (ok, msg, value) => { if (!ok) throw Error(msg); return value; };

function factorial(n) {
  if (!Number.isFinite(n) || n < 0 || !Number.isInteger(n)) throw Error('factorial needs a non-negative whole number.');
  if (n > 170) throw Error('factorial is too large.');
  let r = 1;
  for (let i = 2; i <= n; i += 1) r *= i;
  return r;
}

function clean(s) {
  return s.replace(/×/g, '*').replace(/÷/g, '/').replace(/π/g, 'pi').replace(/√/g, 'sqrt').replace(/−/g, '-').replace(/\s+/g, '');
}

function canEnd(t) {
  return t && (t.t === 'n' || t.t === 'v' || t.v === ')' || (t.t === 'o' && OPS[t.v]?.[4]));
}

function canStart(t) {
  return t && (t.t === 'n' || t.t === 'v' || t.t === 'f' || t.v === '(');
}

export function tokenize(expr) {
  const s = clean(expr);
  const raw = [];
  for (let i = 0; i < s.length;) {
    const c = s[i];
    if (/\d|\./.test(c)) {
      const m = s.slice(i).match(/^(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/i);
      if (!m) throw Error('Invalid number.');
      raw.push({ t: 'n', v: Number(m[0]) });
      i += m[0].length;
    } else if (/[a-z]/i.test(c)) {
      const w = s.slice(i).match(/^[a-z]+/i)[0];
      const k = w.toLowerCase();
      if (k === 'ans') raw.push({ t: 'v', v: 'Ans' });
      else if (k === 'x') raw.push({ t: 'v', v: 'x' });
      else if (k === 'pi') raw.push({ t: 'n', v: Math.PI });
      else if (k === 'e') raw.push({ t: 'n', v: Math.E });
      else if (k === 'mod') raw.push({ t: 'o', v: 'mod' });
      else if (FUN[k]) raw.push({ t: 'f', v: k });
      else throw Error(`Unknown token: ${w}`);
      i += w.length;
    } else if ('()+-*/^%!'.includes(c)) {
      raw.push({ t: c === '(' || c === ')' ? 'p' : 'o', v: c });
      i += 1;
    } else throw Error(`Unsupported character: ${c}`);
  }
  return raw.flatMap((t, i) => (i && canEnd(raw[i - 1]) && canStart(t) ? [{ t: 'o', v: '*' }, t] : [t]));
}

export function toRpn(tokens) {
  const outQ = [];
  const stack = [];
  let prev;
  for (let t of tokens) {
    if (t.t === 'n' || t.t === 'v') outQ.push(t);
    else if (t.t === 'f') stack.push(t);
    else if (t.v === '(') stack.push(t);
    else if (t.v === ')') {
      while (stack.length && stack.at(-1).v !== '(') outQ.push(stack.pop());
      if (!stack.length) throw Error('Mismatched parentheses.');
      stack.pop();
      if (stack.at(-1)?.t === 'f') outQ.push(stack.pop());
    } else if (t.t === 'o') {
      if (t.v === '-' && (!prev || (prev.t === 'o' && !OPS[prev.v]?.[4]) || prev.v === '(' || prev.t === 'f')) t = { t: 'o', v: 'u-' };
      if (OPS[t.v]?.[4] && !canEnd(prev)) throw Error(`${t.v} needs a value before it.`);
      const [p, assoc] = OPS[t.v] || [];
      if (!p) throw Error(`Unknown operator: ${t.v}`);
      while (stack.at(-1)?.t === 'o') {
        const [topP] = OPS[stack.at(-1).v];
        if ((assoc === 'l' && p <= topP) || (assoc === 'r' && p < topP)) outQ.push(stack.pop());
        else break;
      }
      stack.push(t);
    }
    prev = t;
  }
  while (stack.length) {
    const t = stack.pop();
    if (t.v === '(') throw Error('Mismatched parentheses.');
    outQ.push(t);
  }
  return outQ;
}

export function evaluateRpn(rpn, { angleMode = 'deg', ans = 0, variables = {} } = {}) {
  const st = [];
  for (const t of rpn) {
    if (t.t === 'n') st.push(t.v);
    else if (t.t === 'v') {
      if (t.v === 'Ans') st.push(ans);
      else if (Object.prototype.hasOwnProperty.call(variables, t.v)) st.push(variables[t.v]);
      else throw Error(`Missing value for ${t.v}.`);
    }
    else if (t.t === 'f') st.push(finite(FUN[t.v](st.pop(), angleMode)));
    else if (t.t === 'o') {
      const [, , arity, fn] = OPS[t.v];
      if (st.length < arity) throw Error('Incomplete expression.');
      st.push(finite(fn(...st.splice(-arity))));
    }
  }
  if (st.length !== 1) throw Error('Incomplete expression.');
  return Math.abs(st[0]) < 1e-14 ? 0 : st[0];
}

function finite(n) {
  if (!Number.isFinite(n)) throw Error('Result is not finite.');
  return Object.is(n, -0) ? 0 : n;
}

export function calculate(expr, opts = {}) {
  if (!expr.trim()) throw Error('Enter an expression first.');
  return evaluateRpn(toRpn(tokenize(expr)), opts);
}

export function fmt(n) {
  if (!Number.isFinite(n)) return String(n);
  const a = Math.abs(n);
  return a && (a >= 1e12 || a < 1e-9) ? n.toExponential(10).replace(/(?:\.0+|0+)e/, 'e') : Number(n.toPrecision(12)).toString();
}
