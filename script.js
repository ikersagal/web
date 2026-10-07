/* No analytics vendor or advertising pixel is enabled by default. */
(() => {
  'use strict';
  window.dataLayer = window.dataLayer || [];
  const params = new URLSearchParams(window.location.search);
  const campaign = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const value = params.get(key);
    if (value) campaign[key] = value.slice(0, 160);
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    link.addEventListener('click', () => {
      const payload = {
        event: 'whatsapp_click',
        cta_location: link.dataset.whatsapp,
        intent: link.dataset.intent || 'consulta',
        page_path: window.location.pathname,
        ...campaign
      };
      window.dataLayer.push(payload);
      window.dispatchEvent(new CustomEvent('sagal:whatsapp_click', { detail: payload }));
      // Navigation is native and does not depend on a tracker succeeding.
    });
  });
})();
