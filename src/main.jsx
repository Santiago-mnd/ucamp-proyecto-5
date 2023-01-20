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
          'client-id':
            'AfZlsdqtQwKlUlinZyELHKSYblb28GOIjYoMOVg7gi88RCoMm90M8WL9kprtwQv4Uz6uBPInkBKRhbiW',
        }}
      >
        <Router>
          <App />
        </Router>
      </PayPalScriptProvider>
    </AuthProvider>
  </React.StrictMode>
);
