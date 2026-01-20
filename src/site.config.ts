/**
 * Site Configuration
 * 
 * This file contains all configuration for the Siderust organization website.
 * Modify this file to customize organization details, projects, and their metadata.
 */

export interface ProjectConfig {
  /** GitHub repository name (e.g., 'siderust') */
  repo: string;
  /** Optional custom display name (defaults to repo name) */
  name?: string;
  /** Optional custom description (overrides GitHub description) */
  description?: string;
  /** Project status: 'active', 'experimental', 'stable', 'maintenance', 'deprecated' */
  status?: 'active' | 'experimental' | 'stable' | 'maintenance' | 'deprecated';
  /** Whether this project is featured on the home page */
  featured?: boolean;
  /** Key features to highlight */
  features?: string[];
  /** Custom docs URL (if different from docs.rs) */
  docsUrl?: string;
  /** Custom crates.io URL (if different from standard) */
  crateUrl?: string;
  /** Interactive demo URL */
  demoUrl?: string;
  /** Short "why it exists" explanation */
  purpose?: string;
  /** Getting started code snippet or instructions */
  gettingStarted?: string;
  /** Tags for filtering */
  tags?: string[];
}

export interface SiteConfig {
  /** Organization name */
  name: string;
  /** Organization GitHub username */
  org: string;
  /** Organization GitHub URL */
  orgUrl: string;
  /** Short tagline shown in hero */
  tagline: string;
  /** Longer description for SEO and about page */
  description: string;
  /** Base URL of the deployed site */
  siteUrl: string;
  /** Twitter/X handle (without @) */
  twitter?: string;
  /** Default Open Graph image path */
  ogImage?: string;
  /** List of projects/crates */
  projects: ProjectConfig[];
  /** Organization mission statement */
  mission?: string;
  /** Organization values */
  values?: string[];
  /** Maintainers info */
  maintainers?: Array<{
    name: string;
    github: string;
    role?: string;
  }>;
}

const siteConfig: SiteConfig = {
  name: 'Siderust',
  org: 'Siderust',
  orgUrl: 'https://github.com/Siderust',
  tagline: 'Building robust Rust libraries for the modern developer',
  description: 'Siderust is an open-source organization dedicated to creating high-quality, well-documented Rust crates that solve real problems. Our libraries focus on performance, safety, and developer experience.',
  siteUrl: 'https://siderust.github.io',
  ogImage: '/og-image.svg',
  
  mission: 'To advance the Rust ecosystem by building reliable, performant, and ergonomic libraries that empower developers to build better software.',
  
  values: [
    'Quality over quantity - we ship when it\'s ready',
    'Documentation as a first-class citizen',
    'Performance without sacrificing usability',
    'Open source and community-driven',
    'Semantic versioning and stability guarantees',
  ],

  projects: [
    {
      repo: 'siderust',
      name: 'Siderust',
      description: 'Reference ephemeris and orbit-analysis library for embedded flight-software and research-grade pipelines.',
      status: 'active',
      featured: true,
      purpose: 'Siderust aims to be the reference ephemeris and orbit-analysis library for embedded flight-software as well as research-grade pipelines. Every algorithm ships with validation tests against authoritative data (JPL Horizons, IMCCE, SOFA). No unsafe blocks, no hidden allocations.',
      features: [
        'Validated against JPL Horizons, IMCCE, and SOFA standards',
        'Flight-software ready with no unsafe blocks',
        'Zero hidden allocations for embedded use',
        'Research-grade precision for scientific applications',
      ],
      demoUrl: '/demo',
      gettingStarted: `# Add to your Cargo.toml
[dependencies]
siderust = "0.1"

# In your code
use siderust::prelude::*;

// Compute planetary positions
let jd = JulianDate::from_utc(2024, 6, 15, 12, 0, 0.0);
let mars = planets::mars_position(jd);`,
      tags: ['ephemeris', 'orbit', 'astrodynamics', 'rust'],
    },
    {
      repo: 'qtty',
      name: 'qtty',
      description: 'A modern, type-safe terminal UI library for building beautiful command-line applications in Rust.',
      status: 'experimental',
      featured: true,
      purpose: 'qtty aims to make building terminal user interfaces in Rust as pleasant as building web UIs, with a focus on type safety and ergonomics.',
      features: [
        'Declarative UI components',
        'Cross-platform support',
        'Rich styling options',
        'Async-first design',
      ],
      gettingStarted: `# Add to your Cargo.toml
[dependencies]
qtty = "0.1"

# Build a simple TUI
use qtty::prelude::*;

fn main() -> Result<()> {
    let app = App::new()
        .title("My App")
        .build()?;
    app.run()
}`,
      tags: ['tui', 'terminal', 'ui', 'rust'],
    },
    {
      repo: 'affn',
      name: 'affn',
      description: 'Affine transformations and geometric primitives for Rust, optimized for graphics and game development.',
      status: 'stable',
      featured: true,
      purpose: 'affn provides efficient, ergonomic APIs for working with 2D and 3D transformations, making graphics programming in Rust more accessible.',
      features: [
        'SIMD-optimized operations',
        'Const-friendly APIs',
        'Serde support',
        'No-std compatible',
      ],
      gettingStarted: `# Add to your Cargo.toml
[dependencies]
affn = "0.1"

# Transform some points
use affn::{Point2, Transform2};

let transform = Transform2::rotate(45.0_f32.to_radians())
    .then_translate(10.0, 5.0);
let point = Point2::new(1.0, 0.0);
let transformed = transform.apply(point);`,
      tags: ['math', 'graphics', 'geometry', 'rust'],
    },
  ],
};

export default siteConfig;

// Helper function to get project by repo name
export function getProject(repo: string): ProjectConfig | undefined {
  return siteConfig.projects.find(p => p.repo === repo);
}

// Helper function to get featured projects
export function getFeaturedProjects(): ProjectConfig[] {
  return siteConfig.projects.filter(p => p.featured);
}

// Helper function to get all project repos
export function getAllProjectRepos(): string[] {
  return siteConfig.projects.map(p => p.repo);
}
