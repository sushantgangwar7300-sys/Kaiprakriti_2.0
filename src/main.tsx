import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Clean up any Netlify injected badges/drawer if inserted dynamically
const purgeNetlifyBadges = () => {
  try {
    const selectors = [
      '#netlify-badge',
      '.netlify-badge',
      '[data-netlify-badge]',
      '[data-netlify-drawer]',
      'div[class*="netlify-badge"]',
      'div[id*="netlify-badge"]',
      'div[class*="netlify-feedback"]',
      'iframe[src*="netlify"]',
      'iframe[title*="Netlify"]',
      'a[href*="netlify.com"]',
    ];
    document.querySelectorAll(selectors.join(',')).forEach((el) => {
      el.remove();
    });
  } catch (_) {}
};

purgeNetlifyBadges();
if (typeof window !== 'undefined') {
  window.addEventListener('load', purgeNetlifyBadges);
  const observer = new MutationObserver(() => purgeNetlifyBadges());
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

