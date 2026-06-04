#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DOXYGEN_DIR="${REPO_ROOT}/doxygen"

project_version() {
    local cmake_file="$1"
    sed -nE 's/^[[:space:]]*project\([^)]*VERSION[[:space:]]+([^[:space:])]+).*$/\1/p' "${cmake_file}" | head -n1
}

for project in siderust-cpp tempoch-cpp qtty-cpp; do
    case "${project}" in
        siderust-cpp) PROJECT_DIR="${REPO_ROOT}/products/cpp/siderust-cpp" ;;
        tempoch-cpp)  PROJECT_DIR="${REPO_ROOT}/products/cpp/tempoch-cpp" ;;
        qtty-cpp)     PROJECT_DIR="${REPO_ROOT}/products/cpp/qtty-cpp" ;;
    esac
    TEMPLATE="${PROJECT_DIR}/docs/Doxyfile.in"

    if [ ! -d "${PROJECT_DIR}" ]; then
        echo "Warning: Project directory not found for ${project}: ${PROJECT_DIR}, skipping."
        continue
    fi

    if [ ! -f "${TEMPLATE}" ]; then
        echo "Warning: No Doxyfile.in found for ${project} at ${TEMPLATE}, skipping."
        continue
    fi

    OUTPUT_DIR="${DOXYGEN_DIR}/${project}"
    mkdir -p "${OUTPUT_DIR}"

    DOXYFILE="${OUTPUT_DIR}/Doxyfile"
    VERSION="$(project_version "${PROJECT_DIR}/CMakeLists.txt")"
    if [ -z "${VERSION}" ]; then
        VERSION="unknown"
    fi

    sed \
        -e "s|@CMAKE_CURRENT_SOURCE_DIR@|${PROJECT_DIR}|g" \
        -e "s|@CMAKE_CURRENT_BINARY_DIR@/docs/doxygen|${OUTPUT_DIR}|g" \
        -e "s|@CMAKE_CURRENT_BINARY_DIR@|${OUTPUT_DIR}|g" \
        -e "s|@PROJECT_VERSION@|${VERSION}|g" \
        -e "s|@REPO_ROOT@|${REPO_ROOT}|g" \
        "${TEMPLATE}" > "${DOXYFILE}"

    echo "Generating Doxygen docs for ${project}..."
    doxygen "${DOXYFILE}"
    echo "Done: ${OUTPUT_DIR}/html"
done
