/**
 * Internationalization (i18n) Module
 *
 * Provides locale definitions, a translation lookup function `t()`,
 * URL helpers for locale-aware routing, and static-path generators
 * for Astro dynamic routes.
 *
 * ## Adding a new locale
 * 1. Add the locale code to the `locales` tuple below.
 * 2. Create `src/i18n/locales/<code>.json` with the same key structure as `en.json`.
 * 3. Import and register it in `translations`.
 * 4. Every `[locale]` page will automatically pick it up via `getLocaleStaticPaths()`.
 */

import ca from './locales/ca.json';
import en from './locales/en.json';

// ─── Locale definitions ──────────────────────────────────────────────

export const locales = ['ca', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ca';

/** Human-readable labels for each locale (used in the language switcher). */
export const localeLabels: Record<Locale, string> = {
  ca: 'CA',
  en: 'EN',
};

/** Full native names for each locale (used in aria-labels / SEO). */
export const localeNames: Record<Locale, string> = {
  ca: 'Català',
  en: 'English',
};

/** BCP 47 tags for `<html lang>` and `hreflang`. */
export const localeBcp47: Record<Locale, string> = {
  ca: 'ca',
  en: 'en',
};

// ─── Translation registry ────────────────────────────────────────────

type TranslationTree = Record<string, unknown>;
const translations: Record<Locale, TranslationTree> = { ca, en };

// ─── Core helpers ────────────────────────────────────────────────────

/**
 * Traverse a nested object by dot-separated key path.
 *
 * @example getNestedValue({ a: { b: 'hello' } }, 'a.b') → 'hello'
 */
function getNestedValue(obj: unknown, path: string): string | undefined {
  let current: unknown = obj;
  for (const segment of path.split('.')) {
    if (current === null || current === undefined || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[segment];
  }
  return typeof current === 'string' ? current : undefined;
}

/**
 * Translate a key for the given locale.
 *
 * - Supports dot-separated nested keys: `t(locale, 'nav.home')`
 * - Falls back to `defaultLocale` when the key is missing in `locale`.
 * - Falls back to the raw key when missing in both locales.
 * - Supports `{param}` interpolation: `t(locale, 'greeting', { name: 'Ada' })`
 */
export function t(
  locale: Locale,
  key: string,
  params?: Record<string, string | number>,
): string {
  let value =
    getNestedValue(translations[locale], key) ??
    getNestedValue(translations[defaultLocale], key) ??
    key;

  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return value;
}

/**
 * Return an *array* value from the translations (e.g. site.values).
 * Falls back exactly like `t()`.
 */
export function tArray(locale: Locale, key: string): string[] {
  const resolve = (loc: Locale): unknown => {
    let current: unknown = translations[loc];
    for (const segment of key.split('.')) {
      if (current === null || current === undefined || typeof current !== 'object') return undefined;
      current = (current as Record<string, unknown>)[segment];
    }
    return current;
  };
  const val = resolve(locale) ?? resolve(defaultLocale);
  return Array.isArray(val) ? (val as string[]) : [];
}

// ─── URL helpers ─────────────────────────────────────────────────────

/**
 * Build a locale-prefixed path.
 *
 * @example localePath('en', '/projects') → '/en/projects'
 * @example localePath('ca', '/')         → '/ca'
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path.replace(/^\/(ca|en)(\/|$)/, '/').replace(/\/+$/, '') || '/';
  const suffix = clean === '/' ? '' : clean;
  return `/${locale}${suffix}`;
}

/**
 * Switch the locale segment in an existing URL path.
 *
 * @example switchLocalePath('/en/projects/siderust', 'ca') → '/ca/projects/siderust'
 */
export function switchLocalePath(currentPath: string, newLocale: Locale): string {
  // Strip any existing locale prefix, then prepend newLocale
  const stripped = currentPath.replace(/^\/(ca|en)(\/|$)/, '/');
  const clean = stripped.replace(/\/+$/, '') || '/';
  const suffix = clean === '/' ? '' : clean;
  return `/${newLocale}${suffix}`;
}

/**
 * Extract the locale from a URL pathname. Returns `defaultLocale` when
 * the first segment is not a recognized locale code.
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  return locales.includes(first as Locale) ? (first as Locale) : defaultLocale;
}

/**
 * Strip the locale prefix from a pathname, returning the "bare" route.
 *
 * @example stripLocale('/en/about') → '/about'
 * @example stripLocale('/ca')       → '/'
 */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/(ca|en)(\/|$)/, '/');
  return stripped || '/';
}

// ─── Astro static-paths generators ───────────────────────────────────

/**
 * Returns the `params` array for `getStaticPaths()` in `[locale]` pages.
 *
 * @example
 * export function getStaticPaths() { return getLocaleStaticPaths(); }
 */
export function getLocaleStaticPaths() {
  return locales.map((locale) => ({ params: { locale } }));
}

/**
 * Validates that a locale param is a recognized locale.
 * Use in frontmatter to bail early with a 404 if the param is invalid.
 */
export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.includes(value as Locale);
}
