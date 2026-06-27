import { useState } from 'react';
import { buildShareUrl, clearShareParams } from './shareState.js';
import { openTool } from './toolDockEvents.js';

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

export default function ToolsDock() {
  const [status, setStatus] = useState('Tools ready.');

  async function share() {
    const url = buildShareUrl(currentWorkspaceState());
    window.history.replaceState({}, '', url);
    try {
      await navigator.clipboard.writeText(url);
      setStatus('Share URL copied.');
    } catch {
      setStatus('Share URL placed in address bar.');
    }
  }

  function clearUrl() {
    const url = clearShareParams();
    window.history.replaceState({}, '', url);
    setStatus('Share URL cleared.');
  }

  return (
    <nav className="tools-dock" aria-label="ParaCalc369 tools">
      <span>{status}</span>
      <button onClick={share}>Share</button>
      <button onClick={clearUrl}>Clear URL</button>
      <button onClick={() => openTool('formulas')}>Formulas</button>
      <button onClick={() => openTool('history')}>History</button>
      <button onClick={() => openTool('help')}>Help</button>
    </nav>
  );
}
