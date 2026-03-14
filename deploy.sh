#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
BUILD_DIR=$(mktemp -d)
PROJECT_NAME="humza-website"

echo "→ Building minified site into $BUILD_DIR"

# Copy directory structure
find "$PROJECT_DIR" -name "*.html" | while read -r file; do
  rel="${file#$PROJECT_DIR/}"
  mkdir -p "$BUILD_DIR/$(dirname "$rel")"
  html-minifier-terser \
    --collapse-whitespace \
    --remove-comments \
    --minify-css true \
    --minify-js true \
    "$file" -o "$BUILD_DIR/$rel"
  orig=$(wc -c < "$file" | tr -d ' ')
  mini=$(wc -c < "$BUILD_DIR/$rel" | tr -d ' ')
  echo "  ✓ $rel  ${orig}B → ${mini}B"
done

echo "→ Deploying to Cloudflare Pages..."
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN:?Set CLOUDFLARE_API_TOKEN}" \
CLOUDFLARE_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-9f7eb5d8779c6286d8203d49e5c8de44}" \
wrangler pages deploy "$BUILD_DIR" --project-name "$PROJECT_NAME"

rm -rf "$BUILD_DIR"
echo "✓ Done"
