/**
 * seo.js — keeps document title, meta description, OG/Twitter tags and the
 * JSON-LD structured data in sync with your .env-driven profile data.
 * This means updating .env updates SEO without editing index.html.
 */
import { profile } from '../data/profile.js';
import { social } from '../data/social.js';

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function initSEO() {
  const { seo, fullName, title, website } = profile;

  document.title = seo.title;
  setMeta('meta[name="description"]', 'content', seo.description);
  setMeta('meta[name="author"]', 'content', fullName);
  setMeta('link[rel="canonical"]', 'href', website);

  // Open Graph
  setMeta('meta[property="og:title"]', 'content', seo.title);
  setMeta('meta[property="og:description"]', 'content', seo.description);
  setMeta('meta[property="og:url"]', 'content', website);

  // Twitter
  setMeta('meta[name="twitter:title"]', 'content', seo.title);
  setMeta('meta[name="twitter:description"]', 'content', seo.description);

  // JSON-LD
  const ld = document.getElementById('ld-json');
  if (ld) {
    ld.textContent = JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: fullName,
        jobTitle: title,
        url: website,
        email: profile.email,
        worksFor: { '@type': 'Organization', name: profile.currentCompany },
        address: { '@type': 'PostalAddress', addressCountry: profile.location },
        sameAs: social
          .filter((s) => ['LinkedIn', 'GitHub', 'Website'].includes(s.name))
          .map((s) => s.url),
        description: seo.description,
      },
      null,
      2
    );
  }
}
