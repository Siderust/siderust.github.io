#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────
# build-wasm-demo.sh, Vendor browser WASM packages into public/vendor/
#
# Sources browser packages from the published npm tarball installed at:
#   node_modules/siderust-js
#
# The npm package ships the browser wrapper sources, but not the generated
# wasm-bindgen pkg/ outputs. This script builds pkg/ in node_modules on demand
# and then copies the browser package files into public/vendor/.
#
# Usage:
#   ./scripts/build-wasm-demo.sh
# ──────────────────────────────────────────────────────────────────
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VENDOR="$ROOT/public/vendor"
NPM_ROOT="$ROOT/node_modules/siderust-js"

if [ ! -d "$NPM_ROOT" ]; then
  echo "✗ npm package not found at $NPM_ROOT"
  echo "  Run: npm install"
  exit 1
fi

# ── Package definitions ─────────────────────────────────────────
declare -A PKG_DIRS=(
  [qtty-web]="qtty-js/qtty-web"
  [tempoch-web]="tempoch-js/tempoch-web"
  [siderust-web]="siderust-web"
)

# Order matters: qtty-web first (no deps), then tempoch-web, then siderust-web
ORDERED_PKGS=(qtty-web tempoch-web siderust-web)

echo "🔧 Vendoring WASM demo assets…"

for pkg in "${ORDERED_PKGS[@]}"; do
  dir="$NPM_ROOT/${PKG_DIRS[$pkg]}"
  dest="$VENDOR/$pkg"

  echo ""
  echo "── $pkg ──────────────────────────────────────"

  # Check for actual WASM artifacts, not just the directory (may exist but be empty)
  if [ -z "$(find "$dir/pkg" -name "*.wasm" 2>/dev/null | head -1)" ]; then
    echo "  → Building pkg/ in $dir"
    (
      cd "$dir"
      wasm-pack build --target web --out-dir pkg --release --scope siderust
    )
  fi

  rm -rf "$dest"
  mkdir -p "$dest"

  echo "  → Copying to $dest"
  cp "$dir/index.js" "$dest/"
  [ -f "$dir/index.d.ts" ] && cp "$dir/index.d.ts" "$dest/"
  cp -r "$dir/lib" "$dest/"
  cp -r "$dir/pkg" "$dest/"
  rm -f "$dest/pkg/.gitignore"

  echo "  ✓ $pkg vendored"
done

echo ""
echo "✅ All WASM demo assets vendored into public/vendor/"
