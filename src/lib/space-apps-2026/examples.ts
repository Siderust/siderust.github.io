/**
 * Verified Space Apps 2026 code samples.
 *
 * Reference epoch: MJD 60000.5 (JD 2460001.0), Roque de los Muchachos.
 * Values checked against siderust 0.15.1 and siderust (PyPI) 0.6.0.
 */

export const VERSIONS = {
  rust: '0.15.1',
  python: '0.6.0',
} as const;

export const REFERENCE = {
  mjd: 60000.5,
  jd: 2460001.0,
  site: 'Roque de los Muchachos',
  sunAltDeg: 46.868,
  sunAzDeg: 148.121,
  moonAltDeg: 11.406,
  moonAzDeg: 76.789,
  earthSelenoKm: 385046,
  marsGeoAu: 1.109577,
  marsEarthSepAu: 1.109577,
} as const;

export const rustInstall = `cargo add siderust@${VERSIONS.rust}`;

export const pythonInstall = `pip install siderust==${VERSIONS.python}`;

/** Earth observer Alt/Az — works in published Rust and Python APIs. */
export const rustEarthAltAz = `use siderust::bodies::solar_system::Sun;
use siderust::catalogs::observatories::ROQUE_DE_LOS_MUCHACHOS;
use siderust::event::altitude::AltitudeProvider;
use siderust::event::azimuth::AzimuthProvider;
use siderust::qtty::Degree;
use siderust::time::ModifiedJulianDate;

fn main() {
    let site = ROQUE_DE_LOS_MUCHACHOS.geodetic();
    let mjd = ModifiedJulianDate::new(60_000.5); // ~2023-02-25 12:00

    let alt = Sun.altitude_at(&site, mjd);
    let az = Sun.azimuth_at(&site, mjd);

    println!("Sun altitude: {:.3}°", alt.to::<Degree>().value());
    println!("Sun azimuth:  {:.3}°", az.to::<Degree>().value());
    // Expected ≈ altitude 46.868°, azimuth 148.121°
}`;

export const pythonEarthAltAz = `from siderust import Body, Observer

site = Observer.roque_de_los_muchachos()
mjd = 60000.5  # ~2023-02-25 12:00

print(f"Sun altitude: {Body.Sun.altitude_at(site, mjd):.3f}°")
print(f"Sun azimuth:  {Body.Sun.azimuth_at(site, mjd):.3f}°")
# Expected ≈ altitude 46.868°, azimuth 148.121°`;

/**
 * Lunar geometry building block available today:
 * Sun and Earth positions relative to the Moon's centre (selenocentric),
 * mean ecliptic J2000. This is NOT lunar-surface Alt/Az.
 */
export const rustLunarGeometry = `use siderust::bodies::solar_system::{Earth, Sun};
use siderust::coordinates::cartesian::Position;
use siderust::coordinates::centers::Selenocentric;
use siderust::coordinates::frames::EclipticMeanJ2000;
use siderust::coordinates::transform::TransformCenter;
use siderust::qtty::{AstronomicalUnit, Kilometer};
use siderust::time::{JulianDate, ModifiedJulianDate};

fn main() {
    let mjd = ModifiedJulianDate::new(60_000.5);
    let jd = JulianDate::new(mjd.value() + 2_400_000.5);

    // Target positions referred to the Moon's centre of mass.
    let sun: Position<Selenocentric, EclipticMeanJ2000, AstronomicalUnit> =
        Sun::vsop87e(jd).to_center(jd);
    let earth: Position<Selenocentric, EclipticMeanJ2000, AstronomicalUnit> =
        Earth::vsop87a(jd).to_center(jd);

    println!("Sun–Moon range:   {:.0} km", sun.distance().to::<Kilometer>().value());
    println!("Earth–Moon range: {:.0} km", earth.distance().to::<Kilometer>().value());
    // Expected ≈ Earth–Moon 385046 km (geometric, no topographic horizon)
}`;

/** Mission-design style relative distance (Rust). */
export const rustMissionDistance = `use siderust::bodies::solar_system::Mars;
use siderust::coordinates::cartesian::Position;
use siderust::coordinates::centers::Geocentric;
use siderust::coordinates::frames::EclipticMeanJ2000;
use siderust::coordinates::transform::TransformCenter;
use siderust::qtty::AstronomicalUnit;
use siderust::time::JulianDate;

fn main() {
    let jd = JulianDate::new(2_460_001.0);
    let mars_geo: Position<Geocentric, EclipticMeanJ2000, AstronomicalUnit> =
        Mars::vsop87a(jd).to_center(jd);
    println!("Mars geocentric range: {:.6} AU", mars_geo.distance().value());
    // Expected ≈ 1.109577 AU
}`;

/** Mission-design style relative distance (Python). */
export const pythonMissionDistance = `from siderust import Body

jd = 2460001.0
earth = Body.Earth.track(jd)
mars = Body.Mars.track(jd)

# Barycentric tracks → mutual separation (≈ geocentric Mars range).
sep_au = earth.position.distance_to(mars.position)
print(f"Earth–Mars separation: {sep_au:.6f} AU")
# Expected ≈ 1.109577 AU

moon = Body.Moon.track(jd)  # geocentric ecliptic, kilometres
print(f"Geocentric Moon range: {moon.position.distance():.0f} km")
# Expected ≈ 385046 km`;
