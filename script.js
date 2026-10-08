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
/* Brand marks stay inside the native links, including all property CTAs. */
(() => {
  const marks = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor"/>',
    tiktok: '<path fill="currentColor" d="M16.6 2h-3.4v13.7a3.1 3.1 0 1 1-2.7-3.1V9.2a6.5 6.5 0 1 0 6.1 6.5V8.8a8.2 8.2 0 0 0 4.8 1.5V6.9A4.8 4.8 0 0 1 16.6 2Z"/>',
    whatsapp: '<path fill="currentColor" d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.46 0 .1 5.36.1 11.95c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.95 11.95 0 0 0 5.8 1.48h.01C18.65 23.84 24 18.48 24 11.9a11.8 11.8 0 0 0-3.48-8.42ZM12.06 21.83a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.87 9.87 0 0 1-1.52-5.27c0-5.48 4.46-9.94 9.94-9.94a9.86 9.86 0 0 1 7.03 2.91 9.86 9.86 0 0 1 2.91 7.03c0 5.48-4.46 9.88-9.94 9.88Zm5.45-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.62.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z"/>'
  };
  document.querySelectorAll('a[data-whatsapp], a[href*="instagram.com/ikersagal"], a[href*="tiktok.com/@ikersagal"]').forEach(link => {
    const brand = link.hasAttribute('data-whatsapp') ? 'whatsapp' : link.href.includes('instagram.com') ? 'instagram' : 'tiktok';
    if (link.querySelector('.brand-icon')) return;
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('width', '22');
    icon.setAttribute('height', '22');
    icon.setAttribute('class', 'brand-icon');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('focusable', 'false');
    icon.innerHTML = marks[brand];
    link.prepend(icon);
  });
})();
