import React from 'react'; // Mantenha apenas uma vez
import ReactDOM from 'react-dom/client'; // Importação correta
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
