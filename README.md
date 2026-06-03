# Siderust Organization Website

A modern, fast, and beautiful website for the Siderust organization and its Rust crates. Built with Astro and Tailwind CSS.

## Features

- **Modern Design** - Clean aesthetic with subtle gradients, soft shadows, and consistent typography
- **Dark Mode** - System-aware with manual toggle and persistent preference
- **Responsive** - Mobile-first design that works beautifully on all devices
- **Fast** - Static site generation with minimal JavaScript
- **SEO Optimized** - Open Graph, Twitter cards, sitemap, and robots.txt included
- **Accessible** - Proper ARIA labels, keyboard navigation, and color contrast
- **GitHub Integration** - Automatically fetches repository metadata via GitHub API
- **Benchmark Transparency** - Public benchmark pages now distinguish speed-focused `IAU 2000B` and full-fidelity `IAU 2006A` horizontal transform variants

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe development

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Local Development

```bash
# Clone the repository
git clone https://github.com/Siderust/siderust.github.io.git
cd siderust.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`.

Repository submodules are grouped by language:

- `rust/` for the Rust libraries
- `cpp/` for the C++ wrappers used to generate Doxygen docs
- `js/` for the JavaScript and WebAssembly bindings
- `lab/` remains at the repository root and owns benchmark/accuracy data
  generation and the versioned latest benchmark bundle consumed by the public
  dashboard.

### Benchmark dashboard (`/ca/benchmarks`, `/en/benchmarks`)

The public benchmark dashboard is rendered by Astro and only shows the
**latest published Lab run**. Historical runs, run comparison, and `/lab`
aliases are no longer part of the public site.

Data flow:

1. The `lab/` submodule generates and exports JSON artifacts under
   `lab/latest_results/` (`scorecard.json`, `manifest.json`,
   `experiments/<id>.json`).
2. The Astro page `src/pages/[locale]/benchmarks.astro` reads those files at
   build time and renders a localized dashboard.

The previous React SPA viewer is no longer served by this repository. If the
React frontend lives inside the `lab/` submodule for internal use, it must not
publish anything under `public/lab/` of this repository.

### Building for Production

```bash
# Build the site
npm run build

# Preview the built site
npm run preview
```

The built site will be in the `dist/` directory.

### Generating C++ Documentation

The checked-in Doxygen HTML is generated from the C++ submodules under `cpp/`.

```bash
git submodule sync --recursive
git submodule update --init --recursive cpp/qtty-cpp cpp/tempoch-cpp cpp/siderust-cpp
bash doxygen/generate_doxygen.sh
```

## Project Structure

```
/
├── public/                 # Static assets
│   ├── manifest.json      # PWA manifest
│   └── robots.txt         # Search engine directives
├── src/
│   ├── components/        # Reusable Astro components
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── LanguageSwitcher.astro
│   │   ├── ProjectCard.astro
│   │   ├── SEO.astro
│   │   ├── SponsorSection.astro
│   │   └── ThemeToggle.astro
│   ├── i18n/              # Internationalisation
│   │   ├── index.ts       # Core helpers (t, localePath, …)
│   │   └── locales/       # One JSON file per locale
│   │       ├── ca.json    # Catalan (default)
│   │       └── en.json    # English
│   ├── layouts/           # Page layouts
│   │   └── Layout.astro
│   ├── lib/               # Utilities and API integrations
│   │   ├── github.ts      # GitHub API client
│   │   └── lab/           # Lab "latest" loader, types and formatters
│   ├── pages/             # Route pages
│   │   ├── index.astro    # Root → /ca/ redirect
│   │   ├── 404.astro      # Not-found page
│   │   └── [locale]/      # All locale-prefixed pages
│   │       ├── index.astro
│   │       ├── about.astro
│   │       ├── benchmarks.astro  # Latest Lab benchmark dashboard
│   │       ├── sponsor.astro
│   │       └── projects/
│   │           ├── index.astro
│   │           └── [slug].astro
│   ├── styles/
│   │   └── global.css     # Global styles
│   └── site.config.ts     # Site configuration
├── scripts/
│   └── validate-i18n.ts   # Check locale files are in sync
├── products/
│   ├── cpp/               # C++ submodules
│   ├── js/                # JavaScript / WASM submodules
│   └── rust/              # Rust submodules
├── lab/                   # Benchmark workspace
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## Configuration

### Site Configuration (`src/site.config.ts`)

All site content and project data is configured in `src/site.config.ts`:

```typescript
const siteConfig: SiteConfig = {
  name: 'Siderust',
  org: 'Siderust',
  orgUrl: 'https://github.com/Siderust',
  tagline: 'Building robust Rust libraries...',
  description: 'Siderust is an open-source organization...',
  siteUrl: 'https://siderust.github.io',
  
  // Optional
  mission: 'Our mission statement...',
  values: ['Value 1', 'Value 2'],
  maintainers: [
    { name: 'Name', github: 'username', role: 'Maintainer' }
  ],
  
  // Projects
  projects: [
    {
      repo: 'siderust',
      name: 'Siderust',           // Optional display name
      description: 'Custom desc', // Optional override
      status: 'active',           // active|experimental|stable|maintenance|deprecated
      featured: true,             // Show on home page
      features: ['Feature 1'],    // Key features list
      purpose: 'Why it exists',   // Detailed explanation
      gettingStarted: '...',      // Code snippet
      tags: ['rust', 'core'],     // For filtering
      docsUrl: 'https://...',     // Override docs.rs URL
      crateUrl: 'https://...',    // Override crates.io URL
    },
    // More projects...
  ],
};
```

### Adding a New Project

1. Open `src/site.config.ts`
2. Add a new entry to the `projects` array:

```typescript
{
  repo: 'new-project',        // Required: GitHub repo name
  name: 'New Project',        // Optional: Display name
  description: 'Description', // Optional: Override GitHub description
  status: 'experimental',     // Optional: Project status
  featured: true,             // Optional: Feature on home page
}
```

3. The site will automatically:
   - Fetch stars, forks, language, and other metadata from GitHub
   - Generate links to docs.rs and crates.io (for Rust projects)
   - Create a project detail page at `/projects/new-project`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | GitHub personal access token for higher API rate limits | No |

## Deployment

### GitHub Pages (Automatic)

The site automatically deploys to GitHub Pages when you push to `main`:

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to `main` branch
4. The workflow will build and deploy automatically

### Manual Deployment

```bash
# Build the site
npm run build

# The dist/ folder can be deployed to any static host
```

### Base Path Configuration

For organization sites (`username.github.io`), no base path is needed.

For project sites (`username.github.io/repo-name`), update `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repo-name',
  // ...
});
```

## Customization

### Styling

- **Colors**: Edit `tailwind.config.mjs` to change brand colors
- **Typography**: Update font families in `tailwind.config.mjs`
- **Components**: Modify styles in component files or `src/styles/global.css`

### Adding Pages

Create a new `.astro` file in `src/pages/[locale]/`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import { t, getLocaleStaticPaths, type Locale } from '../../i18n/index';

export const getStaticPaths = getLocaleStaticPaths;

const locale = Astro.params.locale as Locale;
---

<Layout title={t(locale, 'myPage.title')} locale={locale}>
  <section class="py-16">
    <div class="container-custom">
      <h1>{t(locale, 'myPage.heading')}</h1>
    </div>
  </section>
</Layout>
```

## Internationalisation (i18n)

The site ships with **Catalan** (`ca`, default) and **English** (`en`).  
Every page lives under `src/pages/[locale]/` and is generated for both locales via `getStaticPaths()`.

### URL scheme

| URL | Description |
|-----|-------------|
| `/` | Redirects to `/ca/` |
| `/ca/` | Home page (Catalan) |
| `/en/` | Home page (English) |
| `/ca/projects/siderust` | Project detail (Catalan) |
| `/en/projects/siderust` | Project detail (English) |

### Core API (`src/i18n/index.ts`)

| Export | Purpose |
|--------|---------|
| `t(locale, key, params?)` | Translate a key with optional `{param}` interpolation |
| `tArray(locale, key)` | Return an array value from translations |
| `localePath(locale, path)` | Prefix a path with the locale segment |
| `switchLocalePath(path, newLocale)` | Swap the locale in a URL |
| `getLocaleStaticPaths()` | Return `[{ params: { locale } }]` for every locale |
| `stripLocale(path)` | Remove the locale prefix from a URL |

### Adding a new language

1. **Create the translation file**, copy `src/i18n/locales/en.json` to `src/i18n/locales/<code>.json` and translate all values.
2. **Register the locale**, in `src/i18n/index.ts`:
   - Add the code to `locales` (`['ca', 'en', '<code>']`)
   - Add entries to `localeLabels`, `localeNames`, and `localeBcp47`
   - Import the new JSON in the `translations` map
3. **Validate**, run `npx tsx scripts/validate-i18n.ts` to check all keys match.
4. **Build**, `npm run build` will generate pages for every locale automatically.

## API Rate Limits

The site fetches GitHub API data at build time. Without a token, you're limited to 60 requests/hour. For higher limits:

1. Create a [GitHub personal access token](https://github.com/settings/tokens)
2. Add it as `GITHUB_TOKEN` secret in your repository
3. The workflow will automatically use it

## License

This project is open source. See the repository for license details.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

Built with [Astro](https://astro.build) & [Tailwind CSS](https://tailwindcss.com)
