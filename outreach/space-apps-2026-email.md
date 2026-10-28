# Space Apps 2026 — outreach email for Local Leads

Ready-to-forward text for Local Leads. Landing page (once deployed):
**https://siderust.org/en/space-apps-2026**

Siderust is an independent open-source project. Do not present it as an official NASA Space Apps resource, Global Collaborator, or NASA endorsement.

---

## English

**Subject:** Open-source astronomy tools (Rust & Python) for Space Apps 2026 lunar / mission challenges

Hello,

For teams working on **CLPS Lunar Mission Browser**, **Space Mission Design Game**, or other astronomy-related challenges at NASA Space Apps Challenge 2026 (14–15 November), the Siderust project offers a free, independent open-source toolkit for ephemerides, coordinate transforms, and observation geometry in **Rust** and **Python**.

It can compute lunar-site geometric Alt/Az for the Sun and Earth, as well as lunar-related geometry building blocks and educational orbital-mechanics calculations. The participant page includes copy-ready examples for the published Siderust v0.16.0 (Rust) and siderust-py v0.7.0 (Python `LunarObserver`) APIs.

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

Puede calcular Alt/Az geométrico desde un lugar lunar para el Sol y la Tierra, además de ofrecer bloques de geometría lunar y cálculos educativos de mecánica orbital. La página para participantes incluye ejemplos listos para copiar de las APIs publicadas en Siderust v0.16.0 (Rust) y siderust-py v0.7.0 (Python `LunarObserver`).

Guía para participantes: **https://siderust.org/en/space-apps-2026**  
(versión en catalán: https://siderust.org/ca/space-apps-2026)

Consultas durante la hackatón: **help@siderust.org** (según disponibilidad) · GitHub: https://github.com/Siderust/siderust

Siderust se distribuye bajo AGPL-3.0 y no está afiliado ni respaldado por la NASA.

Un saludo,  
El equipo de Siderust

---

## Published lunar Alt/Az API

Siderust v0.16.0 provides lunar-surface geometric Alt/Az through a typed
`SurfaceSite<Moon>` and the body-surface horizontal pipeline. siderust-py
v0.7.0 exposes the same capability as `LunarObserver` with
`observe_direction` / `observe_position` / `observe_earth` / `observe_sun`.

Finite-distance targets include topocentric parallax; direction-only targets
do not invent a distance. Results use the north-through-east azimuth
convention and geometric altitude, without refraction or terrain masking.
Orientation is MoonIauMeanEarth (NAIF `IAU_MOON` Mean-Earth), not JPL DE
`MOON_PA`. Epochs are Julian Date TT.
