import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { StateProvider } from './context/StateContext.jsx';
import { App } from './App.jsx';
import './index.css';

// ── PWA: register service worker ─────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// ── PWA: inject manifest link dynamically ────────────────────────────────────
if (!document.querySelector('link[rel="manifest"]')) {
  const link = document.createElement('link');
  link.rel = 'manifest';
  link.href = '/manifest.json';
  document.head.appendChild(link);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <StateProvider>
          <App />
        </StateProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
