# 🚀 Ashok DevOps Portfolio

A modern, production-ready DevOps portfolio website built to showcase cloud, automation, infrastructure, CI/CD, and containerization expertise.

**Author:** Kantepally Venkata Ashok  
**Role:** Senior DevOps Engineer  
**Experience:** 7.5+ Years

---

## 🌐 Features

- Responsive modern UI
- Dark enterprise-grade design
- AWS & Azure themed branding
- Dynamic profile configuration
- Skills showcase
- Experience timeline
- Certifications section
- Projects showcase
- DevOps architecture visualization
- Contact section
- SEO optimized
- Dockerized deployment
- Nginx production hosting

---

## 🛠 Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- Vite

### Styling

- Tailwind CSS
- Glassmorphism
- Responsive Design

### Libraries

- AOS (Animate On Scroll)
- Typed.js
- Lucide Icons

### DevOps

- Docker
- Nginx
- Git
- GitHub

---

## 🚢 Render Auto-Deploy (new service per push)

Each push creates a **brand-new** Render web service, waits for the build, health-checks the live site, then asks you what to delete.

### One-time setup

1. Create an API key: https://dashboard.render.com/settings#api-keys
2. Copy `.env.render.example` to `.env.render` and paste your key:
   ```
   RENDER_API_KEY=rnd_xxxxxxxx
   ```
   (`.env.render` is git-ignored, your key stays local)
3. Make sure your Render account has access to the GitHub repo (`kantepallyashok/ashok_portfolio`).

### Deploy

```bash
./deploy.sh
```

This will:

1. Commit pending changes (asks first) and `git push`
2. Create a new service on Render: `portfolio-preview-<timestamp>`
3. Wait for the Docker build & deploy to finish
4. Health-check the site (HTTP 200 + page content check)
5. Ask: **Delete previous service(s)?** → yes deletes old ones, no keeps them
6. Ask: **Delete the new service?** → yes removes it, no keeps it running

### Other commands

```bash
python3 scripts/render_deploy.py --check   # list existing preview services only
```

Settings (service name prefix, region, plan, content marker) are at the top of `scripts/render_deploy.py`.

---

## 📂 Project Structure

```text
frontend-app/
│
├── public/
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── resume.pdf
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── assets/
│   ├── css/
│   ├── data/
│   ├── js/
│   └── sections/
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── Dockerfile
├── nginx.conf
└── README.md
VITE_FULL_NAME=Kantepally Venkata Ashok
VITE_TITLE=Senior DevOps Engineer
VITE_CURRENT_COMPANY=Coforge
