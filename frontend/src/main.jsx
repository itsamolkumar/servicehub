import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import { UserProvider } from './UserContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <Router />
    </UserProvider>
  </React.StrictMode>
);
