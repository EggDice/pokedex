import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { createApp } from './app';
import { httpGet } from './http';
import reportWebVitals from './reportWebVitals';

createApp({
  services: { httpGet },
  run: ({ listing }) => {
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    root.render(
      <React.StrictMode>
        <App services={{ listing }}/>
      </React.StrictMode>
    );
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
