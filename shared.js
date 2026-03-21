// shared.js — Nav + Footer injection directe
// Simule Épargne · Injection synchrone, pas de fetch

const NAV_HTML = `<nav role="navigation" aria-label="Navigation principale">
  <a class="nav-brand" href="/index.html">Simule<span> Épargne</span></a>
  <div class="nav-links">
    <a href="/index.html#simulateur">Simulateur</a>
    <a href="/index.html#budget">50/30/20</a>
    <a href="/index.html#enveloppes">Où placer ?</a>
    <a href="/index.html#faq">Questions</a>
    <a href="/articles/index.html" class="nav-articles">Articles</a>
  </div>
  <button class="nav-mobile-btn" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-mobile-panel" id="nav-mobile-btn">
    <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  </button>
  <a class="nav-cta" href="/index.html#simulateur">Simuler</a>
</nav>
<div class="nav-mobile-panel" id="nav-mobile-panel" role="navigation" aria-label="Menu mobile">
  <a href="/index.html#simulateur">Simulateur</a>
  <a href="/index.html#budget">50/30/20</a>
  <a href="/index.html#enveloppes">Où placer ?</a>
  <a href="/index.html#faq">Questions</a>
  <a href="/articles/index.html">Articles →</a>
</div>`;

const FOOTER_HTML = `<footer role="contentinfo">
  <div class="foot-inner">
    <div class="foot-brand">Simule<span> Épargne</span></div>
    <p class="foot-tagline">Comprendre l'épargne, gratuitement, pour tous</p>
    <p class="foot-about">Simule Épargne est un projet indépendant. On n'est pas conseillers financiers — on partage ce qu'on a appris sur l'épargne, en langage simple.</p>
    <nav class="foot-nav" aria-label="Navigation footer">
      <a href="/index.html#simulateur">Simulateur</a>
      <a href="/index.html#budget">50/30/20</a>
      <a href="/index.html#enveloppes">Où placer ?</a>
      <a href="/articles/index.html">Articles</a>
    </nav>
    <p class="foot-disc">Ce site est éducatif et ne constitue pas un conseil en investissement. Les simulations sont données à titre indicatif. Pour toute décision financière, consultez un professionnel agréé.</p>
    <p class="foot-copy">© 2026 Simule Épargne — <a href="/mentions-legales.html">Mentions légales</a> · <a href="/politique-cookies.html">Politique cookies</a></p>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  const navEl = document.getElementById('nav-placeholder');
  if (navEl) navEl.outerHTML = NAV_HTML;

  const footEl = document.getElementById('footer-placeholder');
  if (footEl) footEl.outerHTML = FOOTER_HTML;

  // Mobile menu — délai pour s'assurer que le DOM est injecté
  setTimeout(() => {
    const btn = document.getElementById('nav-mobile-btn');
    const panel = document.getElementById('nav-mobile-panel');
    if (btn && panel) {
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
  }, 0);
});
