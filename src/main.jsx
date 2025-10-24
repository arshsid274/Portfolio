// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './Components/ErrorBoundary.jsx'
import diagnosticManager from './utils/DiagnosticManager.js'
import './utils/VercelDiagnostics.js' // Auto-runs diagnostics
import './utils/ScrollDiagnostics.js' // Auto-runs scroll diagnostics
import './utils/ViewportDiagnostics.js' // Auto-runs viewport diagnostics
import './utils/ViewportFix.js' // Auto-applies viewport fixes

// Initialize diagnostics for Vercel dev environment
if (import.meta.env.DEV || (typeof window !== 'undefined' && window.location.hostname.includes('vercel'))) {
  diagnosticManager.initialize().then(() => {
    console.log('🔍 Diagnostics initialized for Vercel dev environment');
    diagnosticManager.logDiagnosticReport();
  }).catch(error => {
    console.error('Failed to initialize diagnostics:', error);
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
