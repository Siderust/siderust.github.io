# Space Apps 2026 — outreach email for Local Leads

Ready-to-forward text for Local Leads. Landing page (once deployed):
**https://siderust.org/en/space-apps-2026**

Siderust is an independent open-source project. Do not present it as an official NASA Space Apps resource, Global Collaborator, or NASA endorsement.

---

## English

**Subject:** Open-source astronomy tools (Rust & Python) for Space Apps 2026 lunar / mission challenges

Hello,

For teams working on **CLPS Lunar Mission Browser**, **Space Mission Design Game**, or other astronomy-related challenges at NASA Space Apps Challenge 2026 (14–15 November), the Siderust project offers a free, independent open-source toolkit for ephemerides, coordinate transforms, and observation geometry in **Rust** and **Python**.

It can help with lunar-related geometry building blocks (e.g. Sun/Earth positions relative to the Moon) and educational orbital-mechanics calculations. Some advanced lunar-site Alt/Az helpers are still evolving; the participant page documents what is published today, with copy-ready examples.

Participant guide: **https://siderust.org/en/space-apps-2026**

Questions during the hackathon: **help@siderust.org** (best-effort) · GitHub: https://github.com/Siderust/siderust

Siderust is AGPL-3.0 and is not affiliated with or endorsed by NASA.

Best regards,  
The Siderust maintainers

---

## Español

**Asunto:** Herramientas abiertas de astronomía (Rust y Python) para retos lunares / de misión en Space Apps 2026

Hola,

Para equipos que trabajen en **CLPS Lunar Mission Browser**, **Space Mission Design Game** u otros retos de astronomía del NASA Space Apps Challenge 2026 (14–15 de noviembre), el proyecto Siderust ofrece un conjunto de herramientas independientes de código abierto para efemérides, transformaciones de coordenadas y geometría de observación en **Rust** y **Python**.

Puede ayudar con bloques de geometría lunar (p. ej. posiciones del Sol y la Tierra respecto a la Luna) y con cálculos educativos de mecánica orbital. Algunas ayudas avanzadas de Alt/Az en la superficie lunar siguen en evolución; la página para participantes documenta lo que hay publicado hoy, con ejemplos listos para copiar.

Guía para participantes: **https://siderust.org/en/space-apps-2026**  
(versión en catalán: https://siderust.org/ca/space-apps-2026)

Consultas durante la hackatón: **help@siderust.org** (según disponibilidad) · GitHub: https://github.com/Siderust/siderust

Siderust se distribuye bajo AGPL-3.0 y no está afiliado ni respaldado por la NASA.

Un saludo,  
El equipo de Siderust

---

## Upstream follow-up (maintainers)

Full lunar-surface Alt/Az (selenographic site → local ENU → geometric altitude/azimuth for Sun/Earth) is **not** a first-class public API in siderust 0.15.1 / siderust-py 0.6.0.

Recommended upstream work (separate repos, not the website):

1. **siderust:** lunar-site observer type + horizon projection using Moon principal axes / selenocentric positions; pole azimuth convention; geometric vs topographic altitude documentation; validation against an independent lunar ephemeris / orientation reference.
2. **siderust-py:** expose selenocentric helpers and lunar Alt/Az once the Rust API is stable.

Until then, the landing page advertises only verified capabilities and shows working Earth Alt/Az plus selenocentric (Rust) / geocentric Moon (Python) examples.
