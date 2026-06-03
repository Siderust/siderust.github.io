# Siderust products

Canonical Rust crates live in [`rust/`](rust/). Language bindings mirror the dependency chain (`siderust` → `tempoch` → `qtty`) as **nested modules**; published releases use **crates.io** and distribution packages (PyPI, npm, apt/deb).

## Layout

```
products/
  rust/
  siderust-cpp/
    tempoch-cpp/
      qtty-cpp/
  siderust-py/
    tempoch-py/
      qtty-py/
  siderust-js/
    tempoch-js/
      qtty-js/
```

Clone with nested binding submodules:

```bash
git submodule update --init --recursive products/siderust-cpp products/siderust-py products/siderust-js
```

## Dev workspaces

| Path | Purpose |
|------|---------|
| [`rust/`](rust/) | Source of truth for `siderust`, `tempoch`, `qtty`, and `*-ffi` crates |
| [`siderust-cpp/`](siderust-cpp/) | C++ dev entry point (auto-detects nested deps + `../rust/`) |
| [`siderust-py/`](siderust-py/) | Cargo workspace with `[patch.crates-io]` → `../rust/` |
| [`siderust-js/`](siderust-js/) | Cargo + npm workspaces with the same patches |

### C++

```bash
cd siderust-cpp
cmake -B build && cmake --build build
```

### Python

```bash
cd siderust-py
cargo build -p qtty-py -p tempoch-py
```

### JavaScript

```bash
cd siderust-js
npm install
cargo build -p qtty-node
```

## Publishing `*-ffi` to crates.io

From [`rust/scripts/publish-ffi.sh`](rust/scripts/publish-ffi.sh) (order: `qtty-ffi` → `tempoch-ffi` → `siderust-ffi`):

```bash
cd rust
./scripts/publish-ffi.sh
```

## Notes

- **siderust-py** and **siderust-js** binding sources may still need API updates for `siderust` 0.9 / `tempoch` 0.6; `qtty-py` and `tempoch-py` are aligned in this tree.
- C++ release builds use nested git submodules (`tempoch-cpp` → `qtty-cpp`) and link `*-ffi` from crates.io via each binding's `rust/` wrapper.
