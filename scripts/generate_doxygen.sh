#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DOXYGEN_DIR="${REPO_ROOT}/doxygen"

for project in siderust-cpp tempoch-cpp qtty-cpp; do
    case "${project}" in
        siderust-cpp) PROJECT_DIR="${REPO_ROOT}/products/siderust-cpp" ;;
        tempoch-cpp)  PROJECT_DIR="${REPO_ROOT}/products/siderust-cpp/tempoch-cpp" ;;
        qtty-cpp)     PROJECT_DIR="${REPO_ROOT}/products/siderust-cpp/tempoch-cpp/qtty-cpp" ;;
    esac
    TEMPLATE="${PROJECT_DIR}/docs/Doxyfile.in"

    if [ ! -f "${TEMPLATE}" ]; then
        echo "Warning: No Doxyfile.in found for ${project}, skipping."
        continue
    fi

    OUTPUT_DIR="${DOXYGEN_DIR}/${project}"
    mkdir -p "${OUTPUT_DIR}"

    DOXYFILE="${OUTPUT_DIR}/Doxyfile"

    sed \
        -e "s|@CMAKE_CURRENT_SOURCE_DIR@|${PROJECT_DIR}|g" \
        -e "s|@CMAKE_CURRENT_BINARY_DIR@/docs/doxygen|${OUTPUT_DIR}|g" \
        -e "s|@CMAKE_CURRENT_BINARY_DIR@|${OUTPUT_DIR}|g" \
        -e "s|@PROJECT_VERSION@|0.0.0|g" \
        "${TEMPLATE}" > "${DOXYFILE}"

    echo "Generating Doxygen docs for ${project}..."
    doxygen "${DOXYFILE}"
    echo "Done: ${OUTPUT_DIR}/html"
done
