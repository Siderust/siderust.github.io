#!/usr/bin/env bash
# Build and serve the site locally as it will be published.
#
# This intentionally serves the static `dist/` output instead of running
# `astro dev`, so generated assets such as the Demo WASM vendor bundle are
# exercised the same way they are on GitHub Pages.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PORT:-4321}"
HOST="${HOST:-127.0.0.1}"

cd "$ROOT"

if [ ! -d node_modules ]; then
  echo "> Installing npm dependencies"
  npm ci
fi

if ! command -v wasm-pack >/dev/null 2>&1; then
  echo "✗ wasm-pack is required to build the Demo assets."
  echo "  Install it with:"
  echo "    curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh"
  exit 1
fi

echo "> Building Demo WASM assets"
npm run build:wasm-demo

echo "> Building static site"
npm run build

echo "> Serving published output"
echo "  URL: http://$HOST:$PORT/"
echo "  Demo: http://$HOST:$PORT/ca/demo/"
exec npx --yes serve@latest dist --listen "tcp://$HOST:$PORT"
