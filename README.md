# Siderust — GitHub Pages Website

Modern, fast, and accessible marketing site for the **Siderust** open-source organization. The site is built with Astro + Tailwind CSS, deploys to GitHub Pages, and automatically fetches GitHub + crates.io metadata for the main projects.

**Organization:** https://github.com/Siderust  
**Projects:** `siderust`, `qtty`, `affn`

---

## ✨ Features

- Clean, responsive UI with light/dark mode (persisted)
- Home, Projects, Project Detail, and About pages
- Search + filter + sort on projects list
- Per-project metadata (stars, language, releases, last updated)
- Auto-detect docs.rs and crates.io pages when available
- SEO + OpenGraph/Twitter cards + sitemap/robots
- GitHub Actions deployment to GitHub Pages

---

## 🧱 Tech Stack

- **Astro** (static site)
- **Tailwind CSS** (styling)
- **GitHub API + crates.io API** (metadata)
- **GitHub Actions** (deployment)

---

## 🚀 Local Development

### 1) Install dependencies
```bash
npm install
```

### 2) Start the dev server
```bash
npm run dev
```

---

## 🏗️ Build

```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 🌍 Deploy (GitHub Pages)

The workflow at `.github/workflows/deploy.yml` builds and deploys to GitHub Pages.

- For project sites (e.g. `github.com/Siderust/website`), the base path is `/<repo-name>`.
- For org sites (e.g. `Siderust.github.io`), the base path is `/`.

The workflow automatically sets:

- `BASE_PATH`
- `SITE_URL`

If you need to override locally:

```bash
BASE_PATH=/your-repo SITE_URL=https://<org>.github.io/<repo> npm run build
```

---

## ⚙️ Configuration

Edit `site.config.ts` to control organization info and project overrides.

```ts
projects: [
  {
    repo: 'siderust',
    description: 'Optional override',
    status: 'active',
    docsUrl: 'https://docs.rs/siderust',
    crate: 'siderust',
    why: 'Why it exists...',
    features: ['Feature A', 'Feature B'],
  },
]
```

### Adding a new project

1. Add the repo name to `site.config.ts`:
   ```ts
   { repo: 'new-crate' }
   ```
2. (Optional) provide overrides for status, docs URL, crate name, etc.
3. Run `npm run dev` to verify the project appears on the site.

---

## 🧪 Metadata Fetching

At build time, the site fetches:

- GitHub repo description, stars, forks, language, releases, last update
- README sections for Getting Started / Contributing / License
- crates.io + docs.rs URLs (if available)

All requests are resilient with graceful fallbacks if metadata is missing.
