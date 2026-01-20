# Siderust Organization Website

A modern, fast, and beautiful website for the Siderust organization and its Rust crates. Built with Astro and Tailwind CSS.

## Features

- **Modern Design** — Clean aesthetic with subtle gradients, soft shadows, and consistent typography
- **Dark Mode** — System-aware with manual toggle and persistent preference
- **Responsive** — Mobile-first design that works beautifully on all devices
- **Fast** — Static site generation with minimal JavaScript
- **SEO Optimized** — Open Graph, Twitter cards, sitemap, and robots.txt included
- **Accessible** — Proper ARIA labels, keyboard navigation, and color contrast
- **GitHub Integration** — Automatically fetches repository metadata via GitHub API

## Tech Stack

- [Astro](https://astro.build/) — Static site generator
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development

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

### Building for Production

```bash
# Build the site
npm run build

# Preview the built site
npm run preview
```

The built site will be in the `dist/` directory.

## Project Structure

```
/
├── public/                 # Static assets
│   ├── favicon.svg        # Site favicon
│   ├── manifest.json      # PWA manifest
│   └── robots.txt         # Search engine directives
├── src/
│   ├── components/        # Reusable Astro components
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── ProjectCard.astro
│   │   ├── SEO.astro
│   │   └── ThemeToggle.astro
│   ├── layouts/           # Page layouts
│   │   └── Layout.astro
│   ├── lib/               # Utilities and API integrations
│   │   └── github.ts      # GitHub API client
│   ├── pages/             # Route pages
│   │   ├── index.astro    # Home page
│   │   ├── about.astro    # About page
│   │   └── projects/
│   │       ├── index.astro      # Projects listing
│   │       └── [slug].astro     # Project detail pages
│   ├── styles/
│   │   └── global.css     # Global styles
│   └── site.config.ts     # Site configuration
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
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

Create a new `.astro` file in `src/pages/`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Page Title" description="Page description">
  <section class="py-16">
    <div class="container-custom">
      <h1>New Page</h1>
    </div>
  </section>
</Layout>
```

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
