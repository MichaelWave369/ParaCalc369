import { useEffect, useMemo, useRef, useState } from 'react';
import { FAVORITES_KEY, HISTORY_KEY, historyToCsv, itemId, makeExportPackage, normalizeFavorites, normalizeHistory, parseExportPackage } from './historyVault.js';
import { TOOL_EVENTS } from './toolDockEvents.js';

function readStored(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

function saveTextFile(filename, text, type) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function HistoryVault() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [status, setStatus] = useState('Ready');
  const fileRef = useRef(null);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);
  const favoriteItems = useMemo(() => history.filter((item) => favoriteSet.has(itemId(item))), [history, favoriteSet]);

  function load() {
    setHistory(normalizeHistory(readStored(HISTORY_KEY, [])));
    setFavorites(normalizeFavorites(readStored(FAVORITES_KEY, [])));
  }

  useEffect(() => { if (open) load(); }, [open]);

  useEffect(() => {
    const openFromDock = () => setOpen(true);
    window.addEventListener(TOOL_EVENTS.history, openFromDock);
    return () => window.removeEventListener(TOOL_EVENTS.history, openFromDock);
  }, []);

  function toggleFavorite(item) {
    const id = itemId(item);
    const next = favoriteSet.has(id) ? favorites.filter((x) => x !== id) : [id, ...favorites];
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    setStatus(favoriteSet.has(id) ? 'Removed favorite.' : 'Added favorite.');
  }

  async function copyItem(item) {
    try {
      await navigator.clipboard.writeText(`${item.expr} = ${item.value}`);
      setStatus('Copied history item.');
    } catch {
      setStatus('Copy unavailable in this browser.');
    }
  }

  function exportJson() {
    const payload = makeExportPackage(history, favorites);
    saveTextFile('paracalc369-history.json', JSON.stringify(payload, null, 2), 'application/json');
    setStatus('Exported JSON history.');
  }

  function exportCsv() {
    saveTextFile('paracalc369-history.csv', historyToCsv(history, favorites), 'text/csv');
    setStatus('Exported CSV history.');
  }

  async function importJson(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = parseExportPackage(await file.text());
      localStorage.setItem(HISTORY_KEY, JSON.stringify(parsed.history));
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(parsed.favorites));
      setHistory(parsed.history);
      setFavorites(parsed.favorites);
      setStatus('History restored. Reload to sync the main panel.');
    } catch {
      setStatus('Could not restore that file.');
    } finally {
      event.target.value = '';
    }
  }

  function clearVault() {
    localStorage.removeItem(HISTORY_KEY);
    localStorage.removeItem(FAVORITES_KEY);
    setHistory([]);
    setFavorites([]);
    setStatus('History and favorites cleared.');
  }

  return (
    <>
      <button className="history-fab" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open} aria-label="Open History Vault">H</button>
      {open ? (
        <div className="history-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section className="history-dialog" role="dialog" aria-modal="true" aria-labelledby="history-vault-title" onMouseDown={(e) => e.stopPropagation()}>
            <header>
              <div>
                <p className="eyebrow">History Vault</p>
                <h2 id="history-vault-title">History tools</h2>
              </div>
              <button onClick={() => setOpen(false)}>Close</button>
            </header>

            <div className="history-tools">
              <button onClick={load}>Refresh</button>
              <button onClick={exportJson} disabled={!history.length}>Export JSON</button>
              <button onClick={exportCsv} disabled={!history.length}>Export CSV</button>
              <button onClick={() => fileRef.current?.click()}>Restore JSON</button>
              <button onClick={clearVault} disabled={!history.length && !favorites.length}>Clear</button>
              <button onClick={() => window.location.reload()}>Reload app</button>
              <input ref={fileRef} className="sr-only" type="file" accept="application/json,.json" onChange={importJson} />
            </div>

            <section className="vault-section">
              <h3>Favorites</h3>
              {favoriteItems.length ? <HistoryList items={favoriteItems} favoriteSet={favoriteSet} toggleFavorite={toggleFavorite} copyItem={copyItem} /> : <p>No favorites yet.</p>}
            </section>

            <section className="vault-section">
              <h3>Recent history</h3>
              {history.length ? <HistoryList items={history} favoriteSet={favoriteSet} toggleFavorite={toggleFavorite} copyItem={copyItem} /> : <p>No calculations saved yet.</p>}
            </section>

            <p className="history-status">{status}</p>
          </section>
        </div>
      ) : null}
    </>
  );
}

function HistoryList({ items, favoriteSet, toggleFavorite, copyItem }) {
  return (
    <div className="vault-list">
      {items.map((item, index) => {
        const favorite = favoriteSet.has(itemId(item));
        return (
          <article className="vault-item" key={`${item.expr}-${item.value}-${index}`}>
            <div>
              <span>{item.expr}</span>
              <strong>{item.value}</strong>
            </div>
            <button onClick={() => toggleFavorite(item)}>{favorite ? '★' : '☆'}</button>
            <button onClick={() => copyItem(item)}>Copy</button>
          </article>
        );
      })}
    </div>
  );
}
