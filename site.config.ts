export type ProjectStatus = 'active' | 'experimental' | 'stable';

export type ProjectOverride = {
  repo: string;
  displayName?: string;
  description?: string;
  status?: ProjectStatus;
  why?: string;
  features?: string[];
  docsUrl?: string;
  crate?: string;
  crateUrl?: string;
  gettingStarted?: string;
  contributing?: string;
  license?: string;
};

const siteConfig = {
  org: {
    name: 'Siderust',
    url: 'https://github.com/Siderust',
    tagline: 'Rust-native building blocks for resilient systems.',
    description:
      'Siderust is an open-source organization focused on high-performance Rust crates that make systems work simpler, safer, and more observable.',
  },
  siteUrl: 'https://siderust.github.io',
  links: {
    issuesUrl: 'https://github.com/Siderust/siderust/issues',
    discussionsUrl: 'https://github.com/orgs/Siderust/discussions',
    licenseUrl: 'https://github.com/Siderust/siderust/blob/main/LICENSE',
  },
  projects: [
    {
      repo: 'siderust',
      description:
        'Core building blocks for Siderust applications with opinionated defaults.',
      status: 'active',
      why: 'Provide a solid foundation for Rust services with ergonomic, battle-tested primitives.',
      features: ['Predictable defaults', 'Extensible architecture', 'Production-minded tooling'],
    },
    {
      repo: 'qtty',
      description:
        'Terminal-native UI components for modern Rust CLIs and TUI experiences.',
      status: 'experimental',
      why: 'Make rich terminal interfaces as delightful and composable as web UIs.',
      features: ['Composable widgets', 'Keyboard-first UX', 'Themeable design system'],
    },
    {
      repo: 'affn',
      description:
        'Vector search and similarity primitives for high-performance Rust workloads.',
      status: 'experimental',
      why: 'Unlock fast similarity search and retrieval with Rust-first ergonomics.',
      features: ['Approximate NN', 'Streaming-friendly', 'Embeddable API'],
    },
  ],
};

export default siteConfig;
