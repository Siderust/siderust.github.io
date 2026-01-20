# Siderust Organization Website

This is the source code for the Siderust organization website, built with **Astro** and **Tailwind CSS**.
It is designed to be deployed to **GitHub Pages**.

## Tech Stack

*   **Framework:** [Astro](https://astro.build)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com)
*   **Icons:** [Lucide React](https://lucide.dev)
*   **Deployment:** GitHub Pages via GitHub Actions

## Project Structure

```
/
├── public/             # Static assets (robots.txt, favicon, etc.)
├── src/
│   ├── components/     # Reusable UI components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Astro pages (file-based routing)
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions (e.g. GitHub API fetcher)
├── site.config.ts      # Site configuration and project list
├── astro.config.mjs    # Astro configuration
└── tailwind.config.mjs # Tailwind configuration
```

## Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm

### Local Development

1.  **Install dependencies:**

    ```bash
    npm install --legacy-peer-deps
    ```

    *Note: `--legacy-peer-deps` is currently needed due to a minor version conflict between Astro's tailwind integration and the latest Tailwind CSS.*

2.  **Start the dev server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:4321](http://localhost:4321) in your browser.

### Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist/` directory.

### Adding a New Project

1.  Open `site.config.ts`.
2.  Add a new entry to the `projects` array:

    ```typescript
    {
      repo: 'your-new-repo-name',
      description: 'Optional manual description override.',
    }
    ```

3.  The site automatically fetches metadata (stars, description, language, etc.) from GitHub during the build.

## Deployment

The site is deployed automatically to GitHub Pages via GitHub Actions.

1.  Push changes to the main branch (or the configured branch in `.github/workflows/deploy.yml`).
2.  The workflow will build the site and deploy the `dist/` folder.

**Important:** Ensure GitHub Pages is enabled in the repository settings and set to deploy from "GitHub Actions".

## License

MIT
