import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { registerServiceWorker } from './registerServiceWorker.js';
import './styles.css';
import './graph.css';
import './unit.css';
import './pwa.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

registerServiceWorker();
