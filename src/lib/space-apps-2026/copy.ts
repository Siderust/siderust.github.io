import type { Locale } from '../../i18n/index';
import { VERSIONS } from './examples';

export type SpaceAppsCopy = {
  title: string;
  seo: string;
  eyebrow: string;
  dates: string;
  headline: string;
  tagline: string;
  intro: string;
  ctaStart: string;
  ctaExamples: string;
  ctaGithub: string;
  independence: string;
  whatIs: string;
  whatIsBody: string;
  whyHelp: string;
  challengesHeading: string;
  clpsTitle: string;
  clpsBody: string;
  clpsBullets: string[];
  missionTitle: string;
  missionBody: string;
  missionBullets: string[];
  challengeLink: string;
  clpsLinkLabel: string;
  missionLinkLabel: string;
  capabilities: string;
  features: { name: string; detail: string }[];
  lunarHeading: string;
  lunarIntro: string;
  lunarStepsTitle: string;
  lunarSteps: { title: string; detail: string }[];
  lunarLimitTitle: string;
  lunarLimitBody: string;
  lunarConventions: string;
  examplesHeading: string;
  examplesIntro: string;
  tabRust: string;
  tabPython: string;
  exEarthTitle: string;
  exEarthBody: string;
  exLunarTitle: string;
  exLunarBody: string;
  exMissionTitle: string;
  exMissionBody: string;
  expected: string;
  copyLabel: string;
  copiedLabel: string;
  getStarted: string;
  getStartedIntro: string;
  rustDocs: string;
  pythonDocs: string;
  cratesIo: string;
  docsRs: string;
  pypi: string;
  pyDocs: string;
  moreDocs: string;
  demo: string;
  help: string;
  helpText: string;
  contact: string;
  githubIssues: string;
  githubDiscussions: string;
  licenseLabel: string;
  licenseText: string;
  disclaimer: string;
  brandNote: string;
};

const en: SpaceAppsCopy = {
  title: 'Siderust for NASA Space Apps Challenge 2026',
  seo: 'Open-source astronomy and orbital mechanics in Rust and Python for NASA Space Apps Challenge 2026 participants. Independent community resource for lunar and mission-geometry challenges.',
  eyebrow: 'Independent open-source resource',
  dates: 'NASA Space Apps Challenge 2026 · November 14–15',
  headline: 'Open-source astronomy and orbital mechanics for your next space project.',
  tagline: 'Siderust — typed ephemerides, coordinates, and mission geometry in Rust and Python.',
  intro:
    'Siderust is an independent scientific software project. Use it to compute Solar System positions, transform reference frames, and build observation or mission-geometry prototypes during the hackathon — without starting from scratch.',
  ctaStart: 'Get Started',
  ctaExamples: 'Explore Examples',
  ctaGithub: 'View on GitHub',
  independence:
    'Not an official NASA Space Apps resource, Global Collaborator, NASA product, or NASA endorsement.',
  whatIs: 'What is Siderust?',
  whatIsBody:
    'A type-safe astronomy stack: a native Rust crate (siderust) and a Python package (siderust on PyPI) for ephemerides, coordinate centres and frames, astronomical time, and observation geometry. Physical units come from qtty; time scales from tempoch; affine geometry from affn.',
  whyHelp: 'How can it help with Space Apps challenges?',
  challengesHeading: 'Relevant 2026 challenges',
  clpsTitle: 'CLPS Lunar Mission Browser',
  clpsBody:
    'Comparing lunar landing sites and dates needs Sun and Earth directions relative to a lunar location, illumination geometry, and careful time handling. Siderust already provides selenocentric ephemerides, lunar body-fixed orientation models, and typed centre/frame transforms that teams can build on.',
  clpsBullets: [
    'Lunar reference centres (Selenocentric) and Moon principal-axes orientation models',
    'Sun and Earth positions relative to the Moon at a chosen epoch',
    'Coordinate and centre transformations with explicit units and frames',
    'Observation times via Julian / Modified Julian dates',
  ],
  missionTitle: 'Space Mission Design Game',
  missionBody:
    'Educational mission simulators need orbital geometry, ephemerides, and frame conversions more than they need a full flight-dynamics suite. Siderust can supply the astronomical backbone while power, mass, cost, and communications stay in your application layer.',
  missionBullets: [
    'Planetary and lunar ephemerides (VSOP87-based)',
    'Relative distances and centre shifts (e.g. Earth–Mars)',
    'Reference-frame conversions for visualization and scoring',
    'Keplerian / mission-geometry helpers in the Rust crate',
  ],
  challengeLink: 'Official 2026 challenges',
  clpsLinkLabel: 'CLPS Lunar Mission Browser (official listing)',
  missionLinkLabel: 'Space Mission Design Game (official listing)',
  capabilities: 'What you can rely on today',
  features: [
    {
      name: 'Ephemerides',
      detail: 'Planetary and lunar positions with documented models and limitations.',
    },
    {
      name: 'Typed coordinates',
      detail: 'Centres, frames, and physical units encoded in the type system (Rust) or runtime metadata (Python).',
    },
    {
      name: 'Earth observation geometry',
      detail: 'Published Alt/Az and event search for Earth-based observers.',
    },
    {
      name: 'Rust + Python',
      detail: `siderust ${VERSIONS.rust} on crates.io · siderust ${VERSIONS.python} on PyPI.`,
    },
  ],
  lunarHeading: 'Where is the Sun in the lunar sky?',
  lunarIntro:
    'CLPS-style tools need the apparent direction of the Sun or Earth from a fixed lunar site. Conceptually the calculation has three steps. Siderust publishes solid building blocks for steps 1–2; a ready-made lunar-surface Alt/Az helper is not yet part of the public API.',
  lunarStepsTitle: 'Three conceptual steps',
  lunarSteps: [
    {
      title: '1. Define a lunar surface observer',
      detail:
        'Selenographic latitude, longitude, and radius (or elevation) in a Moon-fixed frame such as Moon principal axes. Poles need a defined azimuth convention.',
    },
    {
      title: '2. Obtain the target with an ephemeris',
      detail:
        'Place the Sun or Earth in a common centre (typically Selenocentric) at the observation epoch using VSOP87-based models.',
    },
    {
      title: '3. Project into the local lunar horizon',
      detail:
        'Build a local east–north–up basis at the site and report azimuth and geometric altitude. This is geometric altitude above a reference horizon — not topographic visibility or terrain shadowing.',
    },
  ],
  lunarLimitTitle: 'Current limitation (please read)',
  lunarLimitBody:
    'Published siderust provides Selenocentric centre transforms and Moon principal-axes orientation models, but does not yet expose a first-class lunar-site Alt/Az API comparable to Earth Geodetic<ECEF> → Horizontal. Python bindings currently cover Earth observers and barycentric/geocentric tracks — not selenocentric helpers. Do not reuse Earth horizontal transforms for lunar observers. Full lunar Alt/Az belongs in upstream siderust / siderust-py, with scientific tests, not as ad-hoc website maths.',
  lunarConventions:
    'Any lunar Alt/Az result must state latitude/longitude convention, azimuth origin (usually north through east), local vertical, epoch, and that altitude is geometric — not terrain-occulted.',
  examplesHeading: 'Executable examples',
  examplesIntro:
    'Copy-ready snippets verified against the published packages. Values below use MJD 60000.5 at Roque de los Muchachos where applicable.',
  tabRust: 'Rust',
  tabPython: 'Python',
  exEarthTitle: 'Sun Alt/Az from Earth (works today)',
  exEarthBody:
    'Same numerical pipeline in Rust and Python. Useful for observation planning patterns and as a typed analogue of the horizon step you will later need on the Moon.',
  exLunarTitle: 'Sun & Earth relative to the Moon',
  exLunarBody:
    'Selenocentric ecliptic positions — the ephemeris/centre step of lunar illumination and Earth-visibility geometry. Not surface Alt/Az.',
  exMissionTitle: 'Earth–Mars separation',
  exMissionBody:
    'A compact mission-design primitive: relative distance between planets at a fixed epoch.',
  expected: 'Expected output',
  copyLabel: 'Copy',
  copiedLabel: 'Copied',
  getStarted: 'Getting started',
  getStartedIntro:
    'Install either ecosystem and run a minimal example. Links go to crates.io, docs.rs, PyPI, and the GitHub repositories.',
  rustDocs: 'Rust repository',
  pythonDocs: 'Python repository',
  cratesIo: 'crates.io',
  docsRs: 'docs.rs',
  pypi: 'PyPI',
  pyDocs: 'Python docs',
  moreDocs: 'Deeper documentation and examples',
  demo: 'Interactive web demo',
  help: 'Where can I get help?',
  helpText:
    'During the hackathon, maintainers may offer best-effort technical guidance. This is not a staffed mentoring desk and response times are not guaranteed.',
  contact: 'Email help@siderust.org',
  githubIssues: 'GitHub issues',
  githubDiscussions: 'GitHub discussions',
  licenseLabel: 'License',
  licenseText:
    'Siderust is AGPL-3.0-only. Check whether that license fits your team’s distribution and source-sharing plans before integrating it. Cite third-party models and data appropriately.',
  disclaimer:
    'Siderust is an independent open-source project contributing free technical resources to participants. It is not an official NASA Space Apps resource, Global Collaborator, NASA product, or NASA endorsement.',
  brandNote:
    'Event name and dates are referenced for outreach only. This page does not use the NASA insignia or claim Space Apps brand affiliation. Visuals are original Siderust artwork.',
};

const ca: SpaceAppsCopy = {
  title: 'Siderust per al NASA Space Apps Challenge 2026',
  seo: 'Astronomia i mecànica orbital de codi obert en Rust i Python per als participants del NASA Space Apps Challenge 2026. Recurs independent per a reptes lunars i de geometria de missions.',
  eyebrow: 'Recurs independent de codi obert',
  dates: 'NASA Space Apps Challenge 2026 · 14–15 de novembre',
  headline: 'Astronomia i mecànica orbital de codi obert per al teu proper projecte espacial.',
  tagline: 'Siderust — efemèrides, coordenades i geometria de missions tipades en Rust i Python.',
  intro:
    'Siderust és un projecte científic independent. Serveix per calcular posicions del Sistema Solar, transformar sistemes de referència i prototipar geometria d’observació o de missió durant la hackató.',
  ctaStart: 'Comença',
  ctaExamples: 'Explora exemples',
  ctaGithub: 'Veure a GitHub',
  independence:
    'No és un recurs oficial de NASA Space Apps, ni Global Collaborator, producte o aval de la NASA.',
  whatIs: 'Què és Siderust?',
  whatIsBody:
    'Una pila d’astronomia tipada: una biblioteca Rust nativa (siderust) i un paquet Python (siderust a PyPI) per a efemèrides, centres i sistemes de coordenades, temps astronòmic i geometria d’observació. Les unitats venen de qtty; el temps, de tempoch; la geometria afí, d’affn.',
  whyHelp: 'Com pot ajudar en els reptes de Space Apps?',
  challengesHeading: 'Reptes rellevants del 2026',
  clpsTitle: 'CLPS Lunar Mission Browser',
  clpsBody:
    'Comparar llocs i dates d’aterratge lunar exigeix direccions del Sol i de la Terra, geometria d’il·luminació i un tractament cuós del temps. Siderust ja ofereix efemèrides selenocèntriques, models d’orientació lunar i transformacions tipades.',
  clpsBullets: [
    'Centres lunars (Selenocentric) i models d’eixos principals de la Lluna',
    'Posicions del Sol i de la Terra relatives a la Lluna en una època donada',
    'Transformacions de centres i sistemes amb unitats explícites',
    'Temps d’observació amb dates julianes / julianes modificades',
  ],
  missionTitle: 'Space Mission Design Game',
  missionBody:
    'Un simulador educatiu de missions necessita geometria orbital, efemèrides i conversions de sistemes. Siderust pot ser l’esquelet astronòmic mentre potència, massa, cost i comunicacions queden a la vostra aplicació.',
  missionBullets: [
    'Efemèrides planetàries i lunars (basades en VSOP87)',
    'Distàncies relatives i canvis de centre (p. ex. Terra–Mart)',
    'Conversions de sistemes de referència per a visualització',
    'Ajudes keplerianes / de geometria de missió al crate Rust',
  ],
  challengeLink: 'Reptes oficials del 2026',
  clpsLinkLabel: 'CLPS Lunar Mission Browser (llistat oficial)',
  missionLinkLabel: 'Space Mission Design Game (llistat oficial)',
  capabilities: 'Què pots fer servir avui',
  features: [
    {
      name: 'Efemèrides',
      detail: 'Posicions planetàries i lunars amb models i limitacions documentades.',
    },
    {
      name: 'Coordenades tipades',
      detail: 'Centres, sistemes i unitats físiques al sistema de tipus (Rust) o metadades (Python).',
    },
    {
      name: 'Geometria d’observació terrestre',
      detail: 'Alt/Az i cerca d’esdeveniments publicats per a observadors a la Terra.',
    },
    {
      name: 'Rust + Python',
      detail: `siderust ${VERSIONS.rust} a crates.io · siderust ${VERSIONS.python} a PyPI.`,
    },
  ],
  lunarHeading: 'On és el Sol al cel lunar?',
  lunarIntro:
    'Les eines a l’estil CLPS necessiten la direcció aparent del Sol o de la Terra des d’un lloc lunar. Conceptualment hi ha tres passos. Siderust publica blocs sòlids per als passos 1–2; encara no hi ha una API pública d’Alt/Az lunar comparable a la terrestre.',
  lunarStepsTitle: 'Tres passos conceptuals',
  lunarSteps: [
    {
      title: '1. Defineix un observador a la superfície lunar',
      detail:
        'Latitud i longitud selenogràfiques i radi (o elevació) en un sistema fix a la Lluna. Als pols cal una convenció d’azimut.',
    },
    {
      title: '2. Obté l’objectiu amb una efemèride',
      detail:
        'Situa el Sol o la Terra en un centre comú (típicament Selenocentric) a l’època d’observació amb models VSOP87.',
    },
    {
      title: '3. Projecta al horitzó lunar local',
      detail:
        'Construeix una base local est–nord–zenit i reporta azimut i altitud geomètrica. Això no és visibilitat topogràfica ni ombres del terreny.',
    },
  ],
  lunarLimitTitle: 'Limitació actual (cal llegir-la)',
  lunarLimitBody:
    'El siderust publicat ofereix transformacions selenocèntriques i models d’orientació dels eixos principals de la Lluna, però encara no una API d’Alt/Az per a llocs lunars comparable a Geodetic<ECEF> → Horizontal a la Terra. Els enllaços Python cobreixen observadors terrestres i pistes bari/geocèntriques, no ajudes selenocèntriques. No reutilitzeu les transformacions horitzontals terrestres per a observadors lunars. L’Alt/Az lunar complet pertany a siderust / siderust-py, amb proves científiques.',
  lunarConventions:
    'Qualsevol Alt/Az lunar ha d’especificar convenció de latitud/longitud, origen de l’azimut, vertical local, època, i que l’altitud és geomètrica — no ocultada pel terreny.',
  examplesHeading: 'Exemples executables',
  examplesIntro:
    'Fragments verificats amb els paquets publicats. Els valors usen MJD 60000.5 a Roque de los Muchachos quan escau.',
  tabRust: 'Rust',
  tabPython: 'Python',
  exEarthTitle: 'Alt/Az del Sol des de la Terra (disponible avui)',
  exEarthBody:
    'El mateix pipeline numèric en Rust i Python. Útil com a patró d’observació i com a anàleg tipat del pas d’horitzó que després caldrà a la Lluna.',
  exLunarTitle: 'Sol i Terra relatius a la Lluna',
  exLunarBody:
    'Posicions eclíptiques selenocèntriques — el pas d’efemèride/centre de la geometria d’il·luminació i de visibilitat de la Terra. No és Alt/Az de superfície.',
  exMissionTitle: 'Separació Terra–Mart',
  exMissionBody:
    'Una primitiva compacta de disseny de missions: distància relativa entre planetes en una època fixa.',
  expected: 'Sortida esperada',
  copyLabel: 'Copia',
  copiedLabel: 'Copiat',
  getStarted: 'Comença',
  getStartedIntro:
    'Instal·la qualsevol dels dos ecosistemes i executa un exemple mínim. Enllaços a crates.io, docs.rs, PyPI i els repositoris.',
  rustDocs: 'Repositori Rust',
  pythonDocs: 'Repositori Python',
  cratesIo: 'crates.io',
  docsRs: 'docs.rs',
  pypi: 'PyPI',
  pyDocs: 'Docs Python',
  moreDocs: 'Documentació i exemples avançats',
  demo: 'Demostració web interactiva',
  help: 'On puc demanar ajuda?',
  helpText:
    'Durant la hackató, els mantenidors poden oferir orientació tècnica segons disponibilitat. No és un servei de mentoratge amb horari garantit.',
  contact: 'Escriu a help@siderust.org',
  githubIssues: 'Incidències a GitHub',
  githubDiscussions: 'Discussions a GitHub',
  licenseLabel: 'Llicència',
  licenseText:
    'Siderust es distribueix sota AGPL-3.0-only. Comproveu si aquesta llicència encaixa amb els plans de distribució del vostre equip abans d’integrar-la. Citeu correctament models i dades de tercers.',
  disclaimer:
    'Siderust és un projecte independent de codi obert que aporta recursos tècnics gratuïts als participants. No és un recurs oficial de NASA Space Apps, ni Global Collaborator, producte o aval de la NASA.',
  brandNote:
    'El nom i les dates de l’esdeveniment s’esmenten només amb finalitat divulgativa. Aquesta pàgina no utilitza la insígnia de la NASA ni reclama afiliació a la marca Space Apps. Les il·lustracions són originals de Siderust.',
};

export function getSpaceAppsCopy(locale: Locale): SpaceAppsCopy {
  return locale === 'ca' ? ca : en;
}
