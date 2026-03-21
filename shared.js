// shared.js — Chargement nav + footer + mobile menu
// Simule Épargne · Source unique de vérité

async function loadComponent(selector, url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return;
    const html = await res.text();
    const el = document.querySelector(selector);
    if (el) el.outerHTML = html;
  } catch(e) {
    console.warn('Component load failed:', url, e);
  }
}

// Détecte la profondeur pour construire le bon chemin
const depth = window.location.pathname.split('/').filter(Boolean).length;
const base = depth <= 1 ? '/' : '/';

async function initComponents() {
  await loadComponent('#nav-placeholder', base + 'components/nav.html');
  await loadComponent('#footer-placeholder', base + 'components/footer.html');
  initMobileMenu();
  highlightActiveNav();
}

function initMobileMenu() {
  const btn = document.getElementById('nav-mobile-btn');
  const panel = document.getElementById('nav-mobile-panel');
  if (!btn || !panel) return;
  btn.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    btn.querySelector('svg').innerHTML = isOpen
      ? '<line x1="3" y1="6" x2="21" y2="18"/><line x1="3" y1="18" x2="21" y2="6"/>'
      : '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
  });
  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

function highlightActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (path.includes('articles') && href.includes('articles')) {
      a.classList.add('nav-active');
    }
  });
}

document.addEventListener('DOMContentLoaded', initComponents);