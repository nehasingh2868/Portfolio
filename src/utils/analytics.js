/**
 * Tracks a custom event in Google Analytics (GA4) or logs to console if GA4 is not initialized.
 * @param {string} eventName - Name of the tracking event
 * @param {Object} [params] - Optional custom event parameters
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      ...params,
      event_timestamp: new Date().toISOString()
    });
  }
};
