import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Automatically register and activate service worker for offline caching
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('LinguaVocab: New update available, updating service worker...');
  },
  onOfflineReady() {
    console.log('LinguaVocab: App and vocabulary data ready to work offline!');
  },
});

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
