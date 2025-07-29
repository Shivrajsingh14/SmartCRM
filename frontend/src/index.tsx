import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Global error handler for chunk loading errors
window.addEventListener('error', (event) => {
  if (event.error && event.error.name === 'ChunkLoadError') {
    console.warn('Chunk loading failed, reloading the page...', event.error);
    window.location.reload();
  }
});

// Handle unhandled promise rejections that might be related to chunk loading
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && typeof event.reason === 'object' && event.reason.name === 'ChunkLoadError') {
    console.warn('Chunk loading promise rejected, reloading the page...', event.reason);
    event.preventDefault(); // Prevent the default unhandled rejection behavior
    window.location.reload();
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
