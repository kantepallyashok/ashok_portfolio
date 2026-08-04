import { defineConfig } from 'vite';

// The `base` is configurable so the same build works on GitHub Pages
// (served from /<repo>/) as well as Azure Static Web Apps / S3 (served from /).
// Set VITE_BASE_PATH in your environment / CI to override. Defaults to '/'.
export default defineConfig(({ mode }) => {
  const base = process.env.VITE_BASE_PATH || '/';

  return {
    base,
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
    },
    server: {
      port: 5173,
      open: true,
    },
    preview: {
      port: 4173,
    },
  };
});
