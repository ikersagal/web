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
        zone_id: link.dataset.zone || null,
        page_path: window.location.pathname,
        ...campaign
      };
      window.dataLayer.push(payload);
      window.dispatchEvent(new CustomEvent('sagal:whatsapp_click', { detail: payload }));
      // Navigation is native and does not depend on a tracker succeeding.
    });
  });
  let selectedKind = 'Todas';
  const zoneNames = {corregidora:'Corregidora','queretaro-moderno':'Querétaro Moderno',juriquilla:'Juriquilla'};
  let selectedZone = Object.hasOwn(zoneNames, params.get('zona')) ? params.get('zona') : 'Todas';
  function applyFilters() {
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.filter === selectedKind)));
    document.querySelectorAll('[data-zone-filter]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.zoneFilter === selectedZone)));
    let count = 0;
    document.querySelectorAll('.card[data-kind]').forEach(card => {
      card.hidden = (selectedKind !== 'Todas' && card.dataset.kind !== selectedKind) || (selectedZone !== 'Todas' && card.dataset.zone !== selectedZone);
      if (!card.hidden) count++;
    });
    const results = document.getElementById('results');
    if (results) results.textContent = `${count} ${count === 1 ? 'propiedad' : 'propiedades'}`;
    const empty = document.getElementById('empty-results');
    if (empty) empty.hidden = count > 0;
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    selectedKind = button.dataset.filter;
    applyFilters();
  }));
  document.querySelectorAll('[data-zone-filter]').forEach(button => button.addEventListener('click', () => {
    selectedZone = button.dataset.zoneFilter;
    applyFilters();
    const url = new URL(window.location.href);
    if (selectedZone === 'Todas') url.searchParams.delete('zona');
    else url.searchParams.set('zona', selectedZone);
    window.history.replaceState(null, '', url);
  }));
  applyFilters();
  document.querySelectorAll('a[href*="propiedades/"], a[href*="blog/"], a[href*="?zona="]').forEach(link => {
    const url = new URL(link.href);
    if (url.origin !== location.origin) return;
    Object.entries(campaign).forEach(([key, value]) => url.searchParams.set(key, value));
    link.href = url.href;
  });
})();

