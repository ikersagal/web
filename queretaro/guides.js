/* Preserve campaign attribution within the dedicated advisory journey. */
(() => {
  const params = new URLSearchParams(location.search);
  document.querySelectorAll('a[data-guide]').forEach(link => {
    const url = new URL(link.href);
    if (url.origin !== location.origin) return;
    for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) {
      const value = params.get(key);
      if (value) url.searchParams.set(key,value.slice(0,160));
    }
    link.href = url.href;
  });
})();
