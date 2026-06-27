import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import PwaStatus from './PwaStatus.jsx';
import KeyboardHelp from './KeyboardHelp.jsx';
import SharePanel from './SharePanel.jsx';
import FormulaLibrary from './FormulaLibrary.jsx';
import { registerServiceWorker } from './registerServiceWorker.js';
import './styles.css';
import './graph.css';
import './unit.css';
import './pwa.css';
import './share.css';
import './formula.css';
import './accessibility.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <PwaStatus />
    <SharePanel />
    <FormulaLibrary />
    <KeyboardHelp />
  </React.StrictMode>,
);

registerServiceWorker();
