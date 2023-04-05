import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  //StrictMode executa duas vezes no modo desenvolvimento, mas não na produção
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
