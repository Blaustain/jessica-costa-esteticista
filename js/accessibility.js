/* Recursos de acessibilidade da interface */
(() => {
  const root = document.documentElement;
  const body = document.body;
  const key = 'jc-a11y-preferences';
  let fontScale = 1;
  const load = () => {
    try {
      const prefs = JSON.parse(localStorage.getItem(key) || '{}');
      fontScale = Math.min(1.5, Math.max(.9, Number(prefs.fontScale) || 1));
      body.classList.toggle('a11y-high-contrast', !!prefs.contrast);
      body.classList.toggle('a11y-grayscale', !!prefs.grayscale);
      applyFont();
      document.querySelector('#a11y-contrast').setAttribute('aria-pressed', String(!!prefs.contrast));
      document.querySelector('#a11y-grayscale').setAttribute('aria-pressed', String(!!prefs.grayscale));
    } catch (_) {}
  };
  const save = () => localStorage.setItem(key, JSON.stringify({
    fontScale,
    contrast: body.classList.contains('a11y-high-contrast'),
    grayscale: body.classList.contains('a11y-grayscale')
  }));
  function applyFont() {
    root.style.setProperty('--a11y-font-scale', fontScale);
    body.style.fontSize = `${fontScale * 100}%`;
  }
  document.querySelector('#a11y-font-increase').addEventListener('click', () => {
    fontScale = Math.min(1.5, +(fontScale + .1).toFixed(2)); applyFont(); save();
  });
  document.querySelector('#a11y-font-decrease').addEventListener('click', () => {
    fontScale = Math.max(.9, +(fontScale - .1).toFixed(2)); applyFont(); save();
  });
  document.querySelector('#a11y-contrast').addEventListener('click', e => {
    body.classList.toggle('a11y-high-contrast');
    e.currentTarget.setAttribute('aria-pressed', String(body.classList.contains('a11y-high-contrast'))); save();
  });
  document.querySelector('#a11y-grayscale').addEventListener('click', e => {
    body.classList.toggle('a11y-grayscale');
    e.currentTarget.setAttribute('aria-pressed', String(body.classList.contains('a11y-grayscale'))); save();
  });
  document.querySelector('#a11y-reset').addEventListener('click', () => {
    fontScale = 1; body.classList.remove('a11y-high-contrast','a11y-grayscale');
    applyFont();
    document.querySelector('#a11y-contrast').setAttribute('aria-pressed','false');
    document.querySelector('#a11y-grayscale').setAttribute('aria-pressed','false');
    localStorage.removeItem(key);
  });
  load();
})();
