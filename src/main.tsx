import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';
import { Buffer } from 'buffer';

// Polyfills para TON
window.Buffer = Buffer;

// Inicializar Telegram WebApp
WebApp.ready();

// Ya que tienes GitHub Pages funcionando, forzamos a la app local
// a usar el manifiesto oficial de tu entorno de producción para 
// engañar a la wallet y evitar el error de localhost.
const manifestUrl = 'https://kuromi04.github.io/stablecoinSkill/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>,
);
