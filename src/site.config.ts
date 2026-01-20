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
  /** Logo image path */
  logo?: string;
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
  tagline: 'Precision astronomy & orbit analysis libraries for embedded and research systems',
  description: 'Siderust builds mission-critical astronomical computation and physical modeling libraries in pure Rust. From embedded spacecraft flight software to research-grade pipelines, validated against authoritative ephemerides, zero unsafe code, zero hidden allocations.',
  siteUrl: 'https://siderust.github.io',
  ogImage: '/og-image.svg',
  logo: '/logo.webp',
  
  mission: 'Siderust aims to be the reference ephemeris and orbit‑analysis library for embedded flight‑software as well as research‐grade pipelines. Every algorithm ships with validation tests against authoritative data (JPL Horizons, IMCCE, SOFA). No unsafe blocks, no hidden allocations.',
  
  values: [
    'Correctness first — every algorithm validated against JPL Horizons, IMCCE, and SOFA',
    'Zero unsafe code, zero hidden allocations — suitable for bare-metal and real-time systems',
    'Type-level guarantees — reference frames and units encoded in the type system',
    'Reproducible science — deterministic builds and comprehensive benchmarks',
    'Documentation as a first-class citizen',
  ],

  projects: [
    {
      repo: 'siderust',
      name: 'Siderust',
      description: 'Precision ephemeris and celestial mechanics library for embedded flight software and research pipelines.',
      status: 'active',
      featured: true,
      purpose: 'Siderust provides validated astronomical computations for spacecraft navigation, observatory planning, and scientific research. Every algorithm is tested against JPL Horizons, IMCCE, and SOFA data.',
      features: [
        'VSOP87 & ELP2000 planetary/lunar ephemerides',
        'Type-safe coordinate systems (ICRS, Ecliptic, Topocentric)',
        'No unsafe blocks, no hidden allocations',
        'Validated against authoritative data',
      ],
      gettingStarted: `# Add to your Cargo.toml
[dependencies]
siderust = "0.1"

# Compute Mars position
use siderust::{
    bodies::Mars,
    astro::JulianDate,
};
use chrono::Utc;

let jd = JulianDate::from_utc(Utc::now());
let mars = Mars::vsop87e(jd);
println!("{}", mars.position);`,
      tags: ['astronomy', 'ephemeris', 'celestial-mechanics', 'space', 'rust'],
    },
    {
      repo: 'qtty',
      name: 'qtty',
      description: 'Strongly typed physical quantities with compile-time dimensional analysis.',
      status: 'stable',
      featured: true,
      purpose: 'qtty provides dimensional quantities (Length, Angle, Mass, Time, Velocity, etc.) with operator overloading and compile-time unit checking. Powers Siderust\'s physical computations.',
      features: [
        'Compile-time dimensional analysis',
        'Zero-cost abstractions',
        'SI and astronomical units',
        'No-std compatible',
      ],
      gettingStarted: `# Add to your Cargo.toml
[dependencies]
qtty = "0.1"

# Use physical quantities
use qtty::{AU, KM, DAY};

let distance = 1.523 * AU;  // Mars semi-major axis
let period = 686.97 * DAY;
let speed = distance / period;  // Compiler validates dimensions`,
      tags: ['units', 'physics', 'dimensional-analysis', 'astronomy', 'rust'],
    },
    {
      repo: 'affn',
      name: 'affn',
      description: 'Compile-time safe affine coordinate transformations with reference frame tracking.',
      status: 'stable',
      featured: true,
      purpose: 'affn powers Siderust\'s coordinate system, encoding reference frames and centers in the type system. Prevents mixing incompatible coordinate systems at compile time.',

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
