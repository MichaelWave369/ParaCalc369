import { useEffect, useState } from 'react';

export default function PwaStatus() {
  const [prompt, setPrompt] = useState(null);
  const [message, setMessage] = useState(navigator.onLine ? 'Install-ready when supported.' : 'Offline mode active.');
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    const beforeInstall = (event) => {
      event.preventDefault();
      setPrompt(event);
      setMessage('ParaCalc369 can be installed.');
    };
    const online = () => setMessage('Back online.');
    const offline = () => setMessage('Offline mode active.');
    const update = () => {
      setUpdateReady(true);
      setMessage('New version ready.');
    };
    window.addEventListener('beforeinstallprompt', beforeInstall);
    window.addEventListener('online', online);
    window.addEventListener('offline', offline);
    window.addEventListener('paracalc:update-ready', update);
    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstall);
      window.removeEventListener('online', online);
      window.removeEventListener('offline', offline);
      window.removeEventListener('paracalc:update-ready', update);
    };
  }, []);

  async function install() {
    if (!prompt) return;
    prompt.prompt();
    await prompt.userChoice;
    setPrompt(null);
    setMessage('Install prompt handled.');
  }

  return (
    <div className="pwa-status" aria-live="polite">
      <span>{message}</span>
      {prompt ? <button onClick={install}>Install app</button> : null}
      {updateReady ? <button onClick={() => window.location.reload()}>Refresh</button> : null}
    </div>
  );
}
