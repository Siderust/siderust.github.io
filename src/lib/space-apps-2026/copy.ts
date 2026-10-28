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
    'Comparing lunar landing sites and dates needs Sun and Earth directions relative to a lunar location, illumination geometry, and careful time handling. Siderust provides lunar-surface geometric Alt/Az in Rust and Python, plus selenocentric ephemerides and typed centre/frame transforms.',
  clpsBullets: [
    'Lunar-surface geometric Alt/Az for the Sun and Earth from a selenographic site',
    'Lunar reference centres (Selenocentric) and MoonIauMeanEarth orientation',
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
      name: 'Lunar & Earth Alt/Az',
      detail: 'Geometric horizon angles for Earth observers and lunar surface sites (Sun, Earth, ICRS directions).',
    },
    {
      name: 'Rust + Python',
      detail: `siderust ${VERSIONS.rust} on crates.io · siderust ${VERSIONS.python} on PyPI.`,
    },
  ],
  lunarHeading: 'Where is the Sun in the lunar sky?',
  lunarIntro:
    'CLPS-style tools need the apparent direction of the Sun or Earth from a fixed lunar site. Siderust v0.16.0 (Rust) and siderust-py 0.7.0 provide the complete geometric pipeline: define a typed lunar site, transform the target to the Moon-fixed frame, and project it into the local horizontal system.',
  lunarStepsTitle: 'Three conceptual steps',
  lunarSteps: [
    {
      title: '1. Define a lunar surface observer',
      detail:
        'Selenographic longitude (east-positive), planetocentric latitude, and height on the IAU mean sphere. In Rust use SurfaceSite::<Moon>; in Python use LunarObserver. Poles need a defined azimuth convention.',
    },
    {
      title: '2. Obtain the target with an ephemeris',
      detail:
        'Place the Sun or Earth in a common centre (typically Selenocentric) at the observation epoch using VSOP87-based models. Python helpers observe_earth / observe_sun do this for you.',
    },
    {
      title: '3. Project into the local lunar horizon',
      detail:
        'Build a local east–north–up basis at the site and report azimuth and geometric altitude. This is geometric altitude above a reference horizon — not topographic visibility or terrain shadowing.',
    },
  ],
  lunarLimitTitle: 'Lunar surface Alt/Az',
  lunarLimitBody:
    'Rust: SurfaceSite::<Moon> with the body-surface horizontal API (siderust 0.16). Python: LunarObserver with observe_direction / observe_position / observe_earth / observe_sun (siderust 0.7). Finite-distance targets use topocentric parallax; direction-only targets never invent a distance. Results are geometric Alt/Az — no refraction, aberration, light-time, or terrain masking.',
  lunarConventions:
    'Any lunar Alt/Az result must state latitude/longitude convention, azimuth origin (usually north through east), local vertical, epoch (Julian Date TT), and that altitude is geometric — not terrain-occulted. Orientation uses MoonIauMeanEarth (NAIF IAU_MOON Mean-Earth), not JPL DE MOON_PA.',
  examplesHeading: 'Executable examples',
  examplesIntro:
    'Beginner-friendly examples for Earth observers, lunar-surface Alt/Az, and mission-style distances. Samples use reproducible fixed epochs.',
  tabRust: 'Rust',
  tabPython: 'Python',
  exEarthTitle: 'Sun Alt/Az from Earth',
  exEarthBody:
    'Start with your own longitude, latitude, and height. Change the coordinates to explore the sky above any Earth location.',
  exLunarTitle: 'Sun & Earth Alt/Az from the Moon',
  exLunarBody:
    'Geometric altitude and azimuth from a lunar surface site — the CLPS illumination and Earth-visibility primitive. Python LunarObserver wraps the same Rust pipeline.',
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
    'Comparar llocs i dates d’aterratge lunar exigeix direccions del Sol i de la Terra, geometria d’il·luminació i un tractament cuós del temps. Siderust ofereix Alt/Az geomètric de superfície lunar en Rust i Python, a més d’efemèrides selenocèntriques i transformacions tipades.',
  clpsBullets: [
    'Alt/Az geomètric de superfície lunar per al Sol i la Terra des d’un lloc selenogràfic',
    'Centres lunars (Selenocentric) i orientació MoonIauMeanEarth',
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
      name: 'Alt/Az lunar i terrestre',
      detail: 'Angles horitzontals geomètrics per a observadors a la Terra i llocs a la superfície lunar (Sol, Terra, direccions ICRS).',
    },
    {
      name: 'Rust + Python',
      detail: `siderust ${VERSIONS.rust} a crates.io · siderust ${VERSIONS.python} a PyPI.`,
    },
  ],
  lunarHeading: 'On és el Sol al cel lunar?',
  lunarIntro:
    'Les eines a l’estil CLPS necessiten la direcció aparent del Sol o de la Terra des d’un lloc lunar. Siderust v0.16.0 (Rust) i siderust-py 0.7.0 ofereixen el pipeline geomètric complet: defineix un lloc lunar tipat, transforma l’objectiu al sistema fix de la Lluna i projecta’l al sistema horitzontal local.',
  lunarStepsTitle: 'Tres passos conceptuals',
  lunarSteps: [
    {
      title: '1. Defineix un observador a la superfície lunar',
      detail:
        'Longitud selenogràfica (est-positiva), latitud planetocèntrica i altura sobre l’esfera mitjana IAU. En Rust: SurfaceSite::<Moon>; en Python: LunarObserver. Als pols cal una convenció d’azimut.',
    },
    {
      title: '2. Obté l’objectiu amb una efemèride',
      detail:
        'Situa el Sol o la Terra en un centre comú (típicament Selenocentric) a l’època d’observació amb models VSOP87. Els helpers Python observe_earth / observe_sun ho fan per tu.',
    },
    {
      title: '3. Projecta al horitzó lunar local',
      detail:
        'Construeix una base local est–nord–zenit i reporta azimut i altitud geomètrica. Això no és visibilitat topogràfica ni ombres del terreny.',
    },
  ],
  lunarLimitTitle: 'Alt/Az de superfície lunar',
  lunarLimitBody:
    'Rust: SurfaceSite::<Moon> amb l’API horitzontal de superfícies corporals (siderust 0.16). Python: LunarObserver amb observe_direction / observe_position / observe_earth / observe_sun (siderust 0.7). Els objectius a distància finita inclouen la paral·laxi topocèntrica; els objectius només com a direcció no inventen cap distància. El resultat és Alt/Az geomètric — sense refracció, aberració, temps de vol ni màscara del terreny.',
  lunarConventions:
    'Qualsevol Alt/Az lunar ha d’especificar convenció de latitud/longitud, origen de l’azimut, vertical local, època (data juliana TT), i que l’altitud és geomètrica — no ocultada pel terreny. L’orientació usa MoonIauMeanEarth (NAIF IAU_MOON Mean-Earth), no JPL DE MOON_PA.',
  examplesHeading: 'Exemples executables',
  examplesIntro:
    'Exemples introductoris per a observadors terrestres, Alt/Az de superfície lunar i distàncies d’estil missió. Els exemples utilitzen èpoques fixes reproduïbles.',
  tabRust: 'Rust',
  tabPython: 'Python',
  exEarthTitle: 'Alt/Az del Sol des de la Terra',
  exEarthBody:
    'Comença amb la teva longitud, latitud i altura. Canvia les coordenades per explorar el cel des de qualsevol lloc terrestre.',
  exLunarTitle: 'Alt/Az del Sol i la Terra des de la Lluna',
  exLunarBody:
    'Altitud i azimut geomètrics des d’un lloc a la superfície lunar — la primitiva CLPS d’il·luminació i visibilitat de la Terra. LunarObserver en Python encapsula el mateix pipeline Rust.',
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
