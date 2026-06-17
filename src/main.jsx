import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Dynamic Google Analytics 4 (GA4) Injection
const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID
if (trackingId && trackingId.trim() !== '') {
  // Create script tag for Google Tag Manager (gtag.js)
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
  document.head.appendChild(script)

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', trackingId, {
    send_page_view: true // Automatically send page_view on load
  })
} else {
  // Development Mock Logger Fallback
  window.dataLayer = window.dataLayer || []
  window.gtag = function (...args) {
    console.log('[Analytics Event]', ...args)
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
