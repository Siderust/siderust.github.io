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
  /** Optional language override for display/filtering */
  language?: string;
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
  /** Getting started snippet with generated package metadata placeholders */
  gettingStartedTemplate?: string;
  /** Tags for filtering */
  tags?: string[];
  /** Package name used to find .deb/.rpm files in apt/ and rpm/ directories */
  packageName?: string;
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
  /** Sponsorship configuration */
  sponsorship?: SponsorshipConfig;
}

export interface SponsorshipTier {
  name: string;
  priceLabel: string;
  bulletPoints: string[];
  recommended?: boolean;
}

export interface SponsorshipConfig {
  enabled: boolean;
  githubSponsorsUrl?: string;
  contactEmail?: string;
  tiers?: SponsorshipTier[];
  licensingNote?: string;
}

const siteConfig: SiteConfig = {
  name: 'Siderust',
  org: 'Siderust',
  orgUrl: 'https://github.com/Siderust',
  tagline: 'Precision astronomy & orbit analysis libraries for embedded and research systems',
  description: 'Siderust builds mission-critical astronomical computation and physical modeling libraries in pure Rust. From embedded spacecraft flight software to research-grade pipelines, validated against authoritative ephemerides, zero unsafe code, zero hidden allocations. ',
  siteUrl: 'https://siderust.org',
  ogImage: '/og-image.svg',
  logo: '/logo.webp',
  
  mission: 'We build astronomy libraries for people who need trustworthy results, from embedded systems to research tools. The goal is simple: make the math explicit, validate it against solid references, and keep the code practical to use.',
  
  values: [
    'Check the numbers: validate algorithms against JPL Horizons, IMCCE, and SOFA',
    'Keep behavior predictable: no unsafe code and no hidden allocations',
    'Make mistakes harder: keep units and reference frames in the type system',
    'Prefer work you can reproduce: deterministic builds and published benchmarks',
    'Write docs people can actually use',
  ],

  projects: [
    {
      repo: 'siderust',
      name: 'Siderust',
      description: 'Astronomy and celestial-mechanics library for Rust, built for real observation and orbit work.',
      status: 'active',
      featured: true,
      purpose: 'Siderust collects the pieces you need for ephemerides, observers, coordinates, and event searches. We keep the library close to the underlying models and validate the results against established references.',
      features: [
        'VSOP87 & ELP2000 planetary/lunar ephemerides',
        'Type-safe coordinate systems (ICRS, Ecliptic, Topocentric)',
        'No unsafe blocks, no hidden allocations',
        'Validated against authoritative data',
      ],
      gettingStartedTemplate: `# Add to your Cargo.toml
[dependencies]
siderust = "{{ crates.siderust.version }}"

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
      description: 'Units and physical quantities for Rust, with dimensional checks at compile time.',
      status: 'stable',
      featured: true,
      purpose: 'qtty keeps units explicit in code, so conversions and arithmetic stay readable and harder to misuse. It is used across the Siderust crates, but it is useful on its own too.',
      features: [
        'Compile-time dimensional analysis',
        'Zero-cost abstractions',
        'SI and astronomical units',
        'No-std compatible',
      ],
      gettingStartedTemplate: `# Add to your Cargo.toml
[dependencies]
qtty = "{{ crates.qtty.version }}"

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
      description: 'Affine transforms with compile-time tracking of reference frames.',
      status: 'stable',
      featured: true,
      purpose: 'affn exists to make coordinate transforms harder to misuse. It carries frame information in types so mixed-frame bugs show up at compile time instead of later.',

      features: [
        'SIMD-optimized operations',
        'Const-friendly APIs',
        'Serde support',
        'No-std compatible',
      ],
      gettingStartedTemplate: `# Add to your Cargo.toml
[dependencies]
affn = "{{ crates.affn.version }}"

# Transform some points
use affn::{Point2, Transform2};

let transform = Transform2::rotate(45.0_f32.to_radians())
    .then_translate(10.0, 5.0);
let point = Point2::new(1.0, 0.0);
let transformed = transform.apply(point);`,
      tags: ['math', 'graphics', 'geometry', 'rust'],
    },
    {
      repo: 'tempoch',
      name: 'tempoch',
      description: 'Astronomical time types for Rust: Julian Date, MJD, UTC, TAI, GPS, and related conversions.',
      status: 'active',
      featured: true,
      purpose: 'tempoch keeps time scales explicit, so you do not have to guess what a timestamp means later. It provides the time layer shared across the Siderust crates.',
      features: [
        'Generic Time<S> instants by time-scale',
        'Built-in UTC ↔ TT/MJD conversion via chrono',
        'Automatic ΔT = TT − UT handling',
        'Period intervals with intersection / complement',
        'No-std compatible',
      ],
      gettingStartedTemplate: `# Add to your Cargo.toml
[dependencies]
tempoch = "{{ crates.tempoch.version }}"

# Convert UTC to Julian Date
use chrono::Utc;
use tempoch::{JulianDate, MJD, Time};

let now_jd = JulianDate::from_utc(Utc::now());
let now_mjd: Time<MJD> = now_jd.to::<MJD>();
println!("JD(TT): {now_jd}");
println!("MJD(TT): {now_mjd}");`,
      tags: ['time', 'astronomy', 'julian-date', 'utc', 'rust'],
    },
    {
      repo: 'cheby',
      name: 'cheby',
      description: 'Chebyshev interpolation tools for scientific and numerical work.',
      status: 'active',
      featured: true,
      purpose: 'cheby makes it easier to build and evaluate Chebyshev approximations without a lot of surrounding boilerplate. It is handy for ephemerides and other piecewise numerical kernels.',
      features: [
        'Node generation on [-1, 1] and mapped intervals',
        'DCT-based coefficient fitting',
        'Stable Clenshaw evaluation (value + derivative)',
        'Uniform piecewise segment tables with O(1) lookup',
        'Generic over ChebyScalar (works with qtty quantities)',
      ],
      gettingStartedTemplate: `# Add to your Cargo.toml
[dependencies]
cheby = "{{ crates.cheby.version }}"

# Interpolate sin(x) with Chebyshev polynomials
use cheby::{evaluate, fit_coeffs, nodes};

const N: usize = 9;
let xi: [f64; N] = nodes();
let values: [f64; N] = std::array::from_fn(|k| xi[k].sin());
let coeffs = fit_coeffs(&values);

let tau = 0.42;
let approx = evaluate(&coeffs, tau);
println!("sin({tau}) ~= {approx}");`,
      tags: ['math', 'interpolation', 'chebyshev', 'numerics', 'rust'],
    },
    {
      repo: 'qtty-js',
      name: 'qtty-js',
      language: 'JavaScript',
      description: 'JavaScript and WebAssembly bindings for qtty, for units and conversions in Node and the browser.',
      status: 'active',
      featured: false,
      purpose: 'qtty-js brings the qtty unit model to JavaScript without changing how the conversions work. You get matching Node and browser packages with a straightforward JS and TypeScript API.',
      features: [
        'Node package: @siderust/qtty',
        'Browser/WASM package: @siderust/qtty-web',
        'Typed Quantity and DerivedQuantity APIs',
        'Unit factories and TypeScript declarations',
        'Shared conversion semantics from vendored qtty',
      ],
      docsUrl: 'https://github.com/Siderust/qtty-js#readme',
      gettingStarted: `npm install @siderust/qtty

const { Quantity, Unit, convert } = require('@siderust/qtty');

const distance = new Quantity(1500, Unit.Meter);
console.log(distance.to(Unit.Kilometer).value);
console.log(convert(2, Unit.Hour, Unit.Minute));`,
      tags: ['javascript', 'wasm', 'node', 'browser', 'units', 'bindings'],
    },
    {
      repo: 'tempoch-js',
      name: 'tempoch-js',
      language: 'JavaScript',
      description: 'JavaScript and WebAssembly bindings for astronomical time types, periods, and UTC conversions.',
      status: 'active',
      featured: false,
      purpose: 'tempoch-js brings the same time model used in Rust to JavaScript. The Node and browser packages stay aligned, so Julian dates, UTC, and periods behave the same in both places.',
      features: [
        'Node package: @siderust/tempoch',
        'Browser/WASM package: @siderust/tempoch-web',
        'JulianDate, ModifiedJulianDate, and Period APIs',
        'Interop with qtty-js quantity objects',
        'TypeScript declarations for both targets',
      ],
      docsUrl: 'https://github.com/Siderust/tempoch-js#readme',
      gettingStarted: `npm install @siderust/tempoch @siderust/qtty

const { JulianDate } = require('@siderust/tempoch');
const { Hours } = require('@siderust/qtty/units');

const jd = JulianDate.j2000();
const later = jd.add(Hours(6));
console.log(later.toDate().toISOString());`,
      tags: ['javascript', 'wasm', 'node', 'browser', 'time', 'astronomy', 'bindings'],
    },
    {
      repo: 'siderust-js',
      name: 'siderust-js',
      language: 'JavaScript',
      description: 'JavaScript and WebAssembly bindings for Siderust astronomy: observers, ephemerides, transforms, and event searches.',
      status: 'active',
      featured: false,
      purpose: 'siderust-js lets JavaScript projects use the same astronomy building blocks as the Rust crates. It keeps the boundaries explicit by sharing quantity and time types with qtty-js and tempoch-js.',
      features: [
        'Node package: @siderust/siderust',
        'Browser/WASM package: @siderust/siderust-web',
        'Observer models, ephemerides, and transforms',
        'Altitude, azimuth, crossing, and culmination search',
        'Strict interop with qtty-js and tempoch-js types',
      ],
      docsUrl: 'https://github.com/Siderust/siderust-js#readme',
      gettingStarted: `npm install @siderust/siderust @siderust/qtty @siderust/tempoch

const { Quantity } = require('@siderust/qtty');
const { JulianDate } = require('@siderust/tempoch');
const { Observer, bodyAltitudeAt } = require('@siderust/siderust');

const observer = new Observer(
  new Quantity(-17.8925, 'Degree'),
  new Quantity(28.7543, 'Degree'),
  new Quantity(2396, 'Meter'),
);

const altitude = bodyAltitudeAt('Sun', observer, new JulianDate(2451545.0).toModifiedJulianDate());
console.log(altitude.value, altitude.unit);`,
      tags: ['javascript', 'wasm', 'node', 'browser', 'astronomy', 'ephemeris', 'bindings'],
    },
    {
      repo: 'siderust-cpp',
      name: 'siderust-cpp',
      description: 'Header-only C++17 wrapper for Siderust: ephemerides, coordinates, sky events, and observatory helpers.',
      status: 'active',
      featured: false,
      packageName: 'siderust-cpp',
      purpose: 'siderust-cpp is the C++ entry point to the Siderust stack. It wraps the Rust FFI layer in ordinary C++ value types so time, coordinates, bodies, and event searches feel natural on the C++ side.',
      features: [
        'VSOP87 & ELP2000 ephemeris (Sun, Moon, planets)',
        'Typed coordinate systems (geodetic, spherical, Cartesian)',
        'Sun/Moon/Star altitude, crossings, and culminations',
        'Built-in named observatories (Paranal, Mauna Kea, …)',
        'CMake integration with automatic Rust FFI build',
      ],
      docsUrl: 'https://siderust.org/doxygen/siderust-cpp/html/index.html',
      gettingStarted: `// CMakeLists.txt
find_package(siderust_cpp REQUIRED)
target_link_libraries(myapp PRIVATE siderust::siderust_cpp)

// main.cpp
#include <siderust/siderust.hpp>
using namespace siderust;

auto obs = ROQUE_DE_LOS_MUCHACHOS;
auto jd  = JulianDate::from_utc({2026, 7, 15, 22, 0, 0});
auto alt = sun::altitude_at(obs, MJD::from_jd(jd));`,
      tags: ['cpp', 'c++17', 'astronomy', 'ffi', 'bindings'],
    },
    {
      repo: 'qtty-cpp',
      name: 'qtty-cpp',
      description: 'Header-only C++17 library for unit-safe physical quantities, backed by qtty through C FFI.',
      status: 'active',
      featured: false,
      packageName: 'qtty-cpp',
      purpose: 'qtty-cpp gives C++ projects typed units, literals, and conversions without hiding what is happening underneath. It uses the same conversion engine as qtty, so the rules stay consistent across languages.',
      features: [
        'Strong types per unit to prevent dimension mixing',
        'Unit conversion via Quantity::to<T>()',
        'User-defined literals (10.0_km, 5.0_s)',
        'Generated headers from qtty-ffi definitions',
        'CMake target for easy integration',
      ],
      docsUrl: 'https://siderust.org/doxygen/qtty-cpp/html/index.html',
      gettingStarted: `// CMakeLists.txt
add_subdirectory(path/to/qtty-cpp)
target_link_libraries(myapp PRIVATE qtty_cpp)

// main.cpp
#include "qtty/qtty.hpp"
using namespace qtty;

auto distance = 100.0_km;
auto time = 2.0_h;
auto speed = distance / time;
Meter m = distance.to<Meter>();`,
      tags: ['cpp', 'c++17', 'units', 'physics', 'bindings'],
    },
    {
      repo: 'tempoch-cpp',
      name: 'tempoch-cpp',
      description: 'Header-only C++17 wrapper for tempoch: Julian Date, MJD, UTC, and Period types for astronomical time.',
      status: 'active',
      featured: false,
      packageName: 'tempoch-cpp',
      purpose: 'tempoch-cpp brings the tempoch time model into C++ as ordinary value types. It covers Julian dates, MJD, UTC, and periods without forcing C++ users to think in FFI terms.',
      features: [
        'JulianDate and MJD strongly-typed value wrappers',
        'UTC civil date-time with nanosecond precision',
        'Period intervals with intersection operations',
        'Exception-based error model (typed C++ exceptions)',
        'CMake integration with automatic Rust FFI build',
      ],
      docsUrl: 'https://siderust.org/doxygen/tempoch-cpp/html/index.html',
      gettingStarted: `// CMakeLists.txt
find_package(tempoch_cpp REQUIRED)
target_link_libraries(myapp PRIVATE tempoch::tempoch_cpp)

// main.cpp
#include <tempoch/tempoch.hpp>
using namespace tempoch;

auto jd = JulianDate::from_utc({2026, 1, 1, 0, 0, 0});
auto mjd = MJD::from_jd(jd);
auto utc = jd.to_utc();`,
      tags: ['cpp', 'c++17', 'time', 'astronomy', 'bindings'],
    },
  ],

  sponsorship: {
    enabled: true,
    githubSponsorsUrl: 'https://github.com/sponsors/Siderust',
    contactEmail: 'sponsors@siderust.org',
    tiers: [
      {
        name: 'Individual',
        priceLabel: '$5+ / month',
        bulletPoints: [
          'Support ongoing open-source maintenance',
          'Early visibility into roadmap topics',
          'Community acknowledgement (optional)',
        ],
      },
      {
        name: 'Supporter',
        priceLabel: '$50+ / month',
        bulletPoints: [
          'Best-effort priority issue triage',
          'Input on roadmap focus areas',
          'Name or logo listed on the site (optional)',
        ],
        recommended: true,
      },
      {
        name: 'Company',
        priceLabel: '$500+ / month',
        bulletPoints: [
          'Best-effort response for critical issues',
          'Maintenance and security focus alignment',
          'Quarterly sponsor updates',
        ],
      },
      {
        name: 'Strategic / Custom',
        priceLabel: 'Let’s talk',
        bulletPoints: [
          'Custom work discussions (if appropriate)',
          'Joint roadmap planning on a best-effort basis',
          'Commercial licensing conversations',
        ],
      },
    ],
    licensingNote: `Our open-source code is released under the **GNU AGPL** by default.
If you are sponsoring work and need different terms for a specific deliverable or use case, we can talk about that separately.
Any alternative license would be handled **case by case** in a written agreement.`,
  },
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
