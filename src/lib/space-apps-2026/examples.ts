/**
 * Space Apps 2026 introductory code samples.
 *
 * Earth examples use custom observing sites and fixed epochs so their output
 * is reproducible.
 * Examples target the published releases listed below.
 */

export const VERSIONS = {
  rust: '0.16.0',
  python: '0.7.0',
} as const;

export const REFERENCE = {
  jd: 2460001.0,
  earthSelenoKm: 385046,
  marsGeoAu: 1.109577,
  /** Deterministic NCP Alt/Az at J2000 TT for lon=20°, lat=-3.5° (IAU Moon). */
  ncpAltDeg: 17.765928422857,
  ncpAzDeg: 12.045094675187,
} as const;

export const rustInstall = `cargo add siderust@${VERSIONS.rust}`;

export const pythonInstall = `pip install siderust==${VERSIONS.python}`;

/** Earth observer Alt/Az — works in published Rust and Python APIs. */
export const rustEarthAltAz = `use siderust::{
    bodies::solar_system::Sun,
    coordinates::{centers::Geodetic as Site, frames::ECEF},
    qtty::{AstronomicalUnit, DEG, M},
};

fn main() {
    // Seville: longitude east-positive, latitude north-positive.
    let site = Site::<ECEF>::new(-5.9845 * DEG, 37.3891 * DEG, 7.0 * M);

    // The result is already topocentric and horizontal.
    let sun = Sun::get_horizontal::<AstronomicalUnit>(siderust::J2000, site);

    println!("Sun horizontal position: {sun:?}");
    // Altitude is geometric (no refraction); azimuth is north through east.
}`;

export const pythonEarthAltAz = `from siderust import Body as B, Observer as Site

# Seville: longitude east-positive, latitude north-positive.
site = Site(lon_deg=-5.9845, lat_deg=37.3891, height_m=7.0)

# A fixed epoch makes the output reproducible (MJD, TT).
mjd = 60000.5

print(f"Sun altitude: {B.Sun.altitude_at(site, mjd):.2f}°")
print(f"Sun azimuth:  {B.Sun.azimuth_at(site, mjd):.2f}°")
# Altitude is geometric; azimuth is measured north through east.`;

/**
 * Lunar-surface geometric Alt/Az (Rust).
 * Condensed from examples 21 / 22 in siderust 0.16.
 */
export const rustLunarSurfaceAltAz = `use siderust::{
    bodies::solar_system::Moon,
    coordinates::{
        cartesian::Position,
        centers::Selenocentric,
        frames::EclipticMeanJ2000 as Ecl,
        surface::SurfaceSite,
        transform::{AstroContext, SurfaceHorizontalExt, TransformCenter},
    },
    ephemeris::{Ephemeris, Vsop87Ephemeris},
    qtty::{AstronomicalUnit, DEG, Kilometer, M},
    time::JulianDate,
};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Lunar site on the IAU mean sphere (lon east, lat planetocentric).
    let site = SurfaceSite::<Moon>::new(20.0 * DEG, (-3.5) * DEG, 0.0 * M)?;
    let jd = JulianDate::new(2_460_000.5); // TT
    let ctx: AstroContext = AstroContext::default();

    // Earth from the Moon centre = −Moon(geocentric), then local Alt/Az.
    let moon_geo = Vsop87Ephemeris::moon_geocentric(jd);
    let earth_sel = Position::<Selenocentric, Ecl, Kilometer>::new(
        -moon_geo.x(), -moon_geo.y(), -moon_geo.z(),
    );
    let earth = site.observe_position(&earth_sel, &jd, &ctx)?;

    let sun_bary = Vsop87Ephemeris::sun_barycentric(jd);
    let sun_sel: Position<Selenocentric, Ecl, AstronomicalUnit> =
        TransformCenter::to_center_with(&sun_bary, (), jd, &ctx);
    let sun = site.observe_position(&sun_sel, &jd, &ctx)?;

    println!("Earth: alt={}, az={}, range={}", earth.alt(), earth.az(), earth.range());
    println!("Sun:   alt={}, az={}, range={}", sun.alt(), sun.az(), sun.range());
    // Geometric only; azimuth north→east. No refraction or terrain.
    Ok(())
}`;

/**
 * Lunar-surface geometric Alt/Az (Python, siderust 0.7).
 * Mirrors examples/14_lunar_surface_altaz.py.
 */
export const pythonLunarSurfaceAltAz = `from siderust import LunarObserver
from siderust.direction import ICRS

# Lunar site on the IAU mean sphere (R = 1737.4 km).
# Longitude east-positive; latitude planetocentric; height above the sphere.
site = LunarObserver(lon_deg=20.0, lat_deg=-3.5, height_m=0.0)

# Direction-only: north celestial pole at J2000 TT (no invented parallax).
ncp = ICRS(ra_deg=0.0, dec_deg=90.0)
hz = site.observe_direction(ncp, jd_tt=2451545.0)
print(f"NCP: alt={hz.alt_deg:.6f}°, az={hz.az_deg:.6f}°")
# Expected ≈ alt=17.765928°, az=12.045095° (N=0°, E=90°)

# Finite-distance Earth and Sun from the lunar site (ephemeris + transform).
jd = 2460000.5  # Julian Date TT
earth = site.observe_earth(jd)
sun = site.observe_sun(jd)
print(f"Earth: alt={earth.alt_deg:.4f}°, az={earth.az_deg:.4f}°, range={earth.range:.3f} {earth.range_unit}")
print(f"Sun:   alt={sun.alt_deg:.4f}°, az={sun.az_deg:.4f}°, range={sun.range:.6f} {sun.range_unit}")
# Geometric only: no refraction, aberration, light-time, or terrain.`;

/** Mission-design style relative distance (Rust). */
export const rustMissionDistance = `use siderust::{
    bodies::solar_system::Mars,
    coordinates::{
        cartesian::Position,
        centers::Geocentric,
        frames::EclipticMeanJ2000 as Ecl,
        transform::TransformCenter,
    },
    qtty::AstronomicalUnit,
    time::JulianDate,
};

fn main() {
    type Ecliptic = Position<Geocentric, Ecl, AstronomicalUnit>;

    let jd = JulianDate::new(2_460_001.0);
    let mars_geo: Ecliptic = Mars::vsop87a(jd).to_center(jd);
    println!("Mars geocentric range: {}", mars_geo.distance());
    // Expected ≈ 1.109577 AU
}`;

/** Mission-design style relative distance (Python). */
export const pythonMissionDistance = `from siderust import Body as B

jd = 2460001.0
earth = B.Earth.track(jd)
mars = B.Mars.track(jd)

# Barycentric tracks → mutual separation (≈ geocentric Mars range).
sep_au = earth.position.distance_to(mars.position)
print(f"Earth–Mars separation: {sep_au:.6f} AU")
# Expected ≈ 1.109577 AU

moon = B.Moon.track(jd)  # geocentric ecliptic, kilometres
print(f"Geocentric Moon range: {moon.position.distance():.0f} km")
# Expected ≈ 385046 km`;
