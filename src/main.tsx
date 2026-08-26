import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TonConnectUIProvider, THEME } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';
import { Buffer } from 'buffer';

// Polyfills para TON
window.Buffer = Buffer;

// Inicializar Telegram WebApp
WebApp.ready();

// Construimos un manifiesto dinámico basado en la ubicación actual de la app (soporta subdirectorios de GitHub Pages)
const manifestUrl = new URL('tonconnect-manifest.json', window.location.href).toString();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider 
      manifestUrl={manifestUrl}
      uiPreferences={{ theme: THEME.DARK }}
    >
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>,
);
