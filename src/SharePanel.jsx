import { useState } from 'react';
import { buildShareUrl, clearShareParams, hasSharedState } from './shareState.js';

function valueOf(selector, fallback = '') {
  return document.querySelector(selector)?.value || fallback;
}

function currentWorkspaceState() {
  const graphInputs = [...document.querySelectorAll('.graph input')];
  const unitSelects = [...document.querySelectorAll('.converter select')];
  return {
    expr: valueOf('[aria-label="Expression"]'),
    graph: {
      fn: graphInputs[0]?.value || '',
      min: graphInputs[1]?.value || '',
      max: graphInputs[2]?.value || '',
    },
    unit: {
      category: unitSelects[0]?.value || '',
      value: valueOf('.converter input'),
      fromUnit: unitSelects[1]?.value || '',
      toUnit: unitSelects[2]?.value || '',
    },
  };
}

export default function SharePanel() {
  const [status, setStatus] = useState(hasSharedState() ? 'Loaded shared workspace.' : 'Ready to share.');

  async function copyShareUrl() {
    const url = buildShareUrl(currentWorkspaceState());
    window.history.replaceState({}, '', url);
    try {
      await navigator.clipboard.writeText(url);
      setStatus('Share URL copied.');
    } catch {
      setStatus('URL updated in address bar.');
    }
  }

  function clearUrl() {
    const url = clearShareParams();
    window.history.replaceState({}, '', url);
    setStatus('Share params cleared.');
  }

  return (
    <section className="share-float" aria-label="Share workspace" aria-live="polite">
      <span>{status}</span>
      <button onClick={copyShareUrl}>Share</button>
      <button onClick={clearUrl}>Clear</button>
    </section>
  );
}
