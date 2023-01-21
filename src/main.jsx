import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import App from './App';
import { AuthProvider } from './context/AuthProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PayPalScriptProvider
        options={{
          'client-id': import.meta.env
            .VITE_PAYPAL_CLIENT_ID,
        }}
      >
        <Router>
          <App />
        </Router>
      </PayPalScriptProvider>
    </AuthProvider>
  </React.StrictMode>
);
