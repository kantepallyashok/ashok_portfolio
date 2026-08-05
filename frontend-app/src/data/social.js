/**
 * social.js
 * ----------------------------------------------------------------------------
 * Social / contact links. URLs come from .env (placeholders for now — update
 * VITE_LINKEDIN / VITE_GITHUB / VITE_WEBSITE / VITE_EMAIL / VITE_PHONE later).
 *
 * `icon` values are Lucide icon names.
 */

const env = import.meta.env;

export const social = [
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    url:
      env.VITE_LINKEDIN ||
      'https://www.linkedin.com/in/kantepally-venkata-ashok-1678bb22b',
    handle: 'linkedin.com/in/kantepally-venkata-ashok-1678bb22b',
    primary: true,
  },
  {
    name: 'Phone',
    icon: 'phone',
    url: env.VITE_GITHUB || '+91 81214 13523',
    handle: '+91 81214 13523',
    primary: true,
  },
  {
    name: 'Email',
    icon: 'mail',
    url: `mailto:${env.VITE_EMAIL || 'ashok.kantepally@gmail.com'}`,
    handle: env.VITE_EMAIL || 'ashok.kantepally@gmail.com',
    primary: true,
  },
  {
    name: 'Phone',
    icon: 'phone',
    url: `tel:${(env.VITE_PHONE || '+918121413523').replace(/\s+/g, '')}`,
    handle: env.VITE_PHONE || '+91 81214 13523',
    primary: false,
  },
  {
    name: 'Website',
    icon: 'globe',
    url: env.VITE_WEBSITE || 'https://your-domain.com',
    handle: (env.VITE_WEBSITE || 'your-domain.com').replace(/^https?:\/\//, ''),
    primary: false,
  },
];
