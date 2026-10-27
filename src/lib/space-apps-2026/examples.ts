/**
 * Space Apps 2026 introductory code samples.
 *
 * Earth examples use custom observing sites. Rust samples convert UTC "now"
 * to the TT time scale; deterministic Python/mission examples use JD 2460001.0.
 * Update versions and verify every snippet against the eventual releases
 * before this page is deployed. Lunar surface Alt/Az is tracked upstream.
 */

export const VERSIONS = {
  rust: '0.15.1',
  python: '0.6.0',
} as const;

export const REFERENCE = {
  jd: 2460001.0,
  earthSelenoKm: 385046,
  marsGeoAu: 1.109577,
} as const;

export const rustInstall = `cargo add siderust@${VERSIONS.rust}`;

export const pythonInstall = `pip install siderust==${VERSIONS.python}`;

/** Earth observer Alt/Az — works in published Rust and Python APIs. */
export const rustEarthAltAz = `use siderust::bodies::solar_system::Sun;
use siderust::coordinates::centers::Geodetic;
use siderust::coordinates::frames::ECEF;
use siderust::event::altitude::AltitudeProvider;
use siderust::event::azimuth::AzimuthProvider;
use siderust::qtty::{Degree, Degrees, Meters};
use siderust::time::{ModifiedJulianDate, MJD, TT, Time, UTC};

fn main() {
    // Your own location: longitude (east positive), latitude (north positive), height.
    let site = Geodetic::<ECEF>::new(
        Degrees::new(-6.14),  // longitude: Jerez de la Frontera
        Degrees::new(36.68),  // latitude
        Meters::new(50.0),   // height above WGS84 ellipsoid
    );

    // Convert the current UTC instant to the TT timescale used by Siderust.
    let mjd: ModifiedJulianDate = Time::<UTC>::from_chrono(
        siderust::chrono::Utc::now(),
    ).to::<TT>().to::<MJD>();

    let alt = Sun.altitude_at(&site, mjd);
    let az = Sun.azimuth_at(&site, mjd);

    println!("Sun altitude: {:.2}°", alt.to::<Degree>().value());
    println!("Sun azimuth:  {:.2}°", az.to::<Degree>().value());
    // Altitude is geometric (no refraction); azimuth is north through east.
}`;

export const pythonEarthAltAz = `from siderust import Body, Observer

# Custom Earth location: longitude east-positive, latitude north-positive.
site = Observer(lon_deg=-6.14, lat_deg=36.68, height_m=50.0)

# A fixed epoch makes the output reproducible (MJD, TT).
mjd = 60000.5

print(f"Sun altitude: {Body.Sun.altitude_at(site, mjd):.2f}°")
print(f"Sun azimuth:  {Body.Sun.azimuth_at(site, mjd):.2f}°")
# Altitude is geometric; azimuth is measured north through east.`;

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
use siderust::time::{JulianDate, JD, TT, Time, UTC};

fn main() {
    // Astronomical Julian date (TT) for the current UTC instant.
    let jd: JulianDate = Time::<UTC>::from_chrono(
        siderust::chrono::Utc::now(),
    ).to::<TT>().to::<JD>();

    // Target positions referred to the Moon's centre of mass.
    let sun: Position<Selenocentric, EclipticMeanJ2000, AstronomicalUnit> =
        Sun::vsop87e(jd).to_center(jd);
    let earth: Position<Selenocentric, EclipticMeanJ2000, AstronomicalUnit> =
        Earth::vsop87a(jd).to_center(jd);

    println!("Sun–Moon range:   {:.0} km", sun.distance().to::<Kilometer>().value());
    println!("Earth–Moon range: {:.0} km", earth.distance().to::<Kilometer>().value());
    // Geometric distance; this is NOT a lunar surface altitude/azimuth.
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
