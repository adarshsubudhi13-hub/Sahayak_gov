import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { StateProvider } from './context/StateContext.jsx';
import { App } from './App.jsx';
import './index.css';

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
