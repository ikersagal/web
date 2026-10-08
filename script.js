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
        property_id: link.dataset.property || null,
        page_path: window.location.pathname,
        ...campaign
      };
      window.dataLayer.push(payload);
      window.dispatchEvent(new CustomEvent('sagal:whatsapp_click', { detail: payload }));
      // Navigation is native and does not depend on a tracker succeeding.
    });
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    document.querySelectorAll('.card[data-kind]').forEach(card => {
      card.hidden = button.dataset.filter !== 'Todas' && card.dataset.kind !== button.dataset.filter;
      if (!card.hidden) count++;
    });
    document.getElementById('results').textContent = `${count} propiedades`;
  }));
  document.querySelectorAll('a[href*="propiedades/"]').forEach(link => {
    const url = new URL(link.href);
    if (url.origin !== location.origin) return;
    Object.entries(campaign).forEach(([key, value]) => url.searchParams.set(key, value));
    link.href = url.href;
  });
})();

