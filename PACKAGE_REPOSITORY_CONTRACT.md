# Package repository contract

This document defines how Linux packages are published on [siderust.org](https://siderust.org) and how the website must describe them.

## Direct-download artifact folders

The repository root contains two **direct-download artifact folders**:

- `apt/` — Debian `.deb` packages copied verbatim into the static site at `/apt/`.
- `rpm/` — RPM packages copied verbatim into the static site at `/rpm/`.

These directories may also contain repository metadata (`Packages.gz`, `repodata/`) used by release automation and smoke tests. The public website does **not** advertise them as APT or DNF/YUM repositories.

## Website semantics

Project pages link to the latest matching `.deb` or `.rpm` file for projects that declare a `packageName` in `src/site.config.ts`. Links must:

- point at `/apt/<filename>` or `/rpm/<filename>`;
- use the `download` attribute so browsers treat them as file downloads;
- use UI copy that says **Download .deb** / **Download .rpm** (and localized equivalents), not “add repository”, “apt install”, or “dnf install”.

`scripts/validate-package-contract.ts` enforces this contract against the locale files and this document.

## Release workflow

C++ binding releases (for example `siderust-cpp`, `qtty-cpp`, `tempoch-cpp`) build `.deb` and `.rpm` artifacts in their own CI, then commit updated binaries into this site's `apt/` and `rpm/` directories. The GitHub Pages deploy workflow copies those folders into `dist/` after `astro build`.

## Filename conventions

The site selects the newest package file per project using these patterns:

- Debian: `<packageName>_<version>_<arch>.deb` (example: `siderust-cpp_0.8.0-rc_amd64.deb`)
- RPM: `<packageName>-<version>-<release>.<arch>.rpm` (example: `siderust-cpp-0.8.0_rc-1.x86_64.rpm`)

Versions are compared with the same logic as `findLatestPackageFile` in `src/pages/[locale]/projects/[slug].astro`.
