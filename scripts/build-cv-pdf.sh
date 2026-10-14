#!/usr/bin/env bash
# Build public/humza-khan-resume.pdf from public/cv.html and check that it parses cleanly.
#
# Usage: start the dev server (pnpm dev), then run
#   CHROME=/path/to/chrome scripts/build-cv-pdf.sh [url]
# Needs a Chromium-based browser and uv (for pypdf / pdfminer.six).
set -euo pipefail

URL="${1:-http://127.0.0.1:5173/cv.html}"
OUT="public/humza-khan-resume.pdf"
CHROME="${CHROME:-$(command -v chromium || command -v google-chrome || command -v chrome-headless-shell || true)}"
[ -n "$CHROME" ] || { echo "Set CHROME to a Chromium-based browser binary" >&2; exit 1; }

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

# Tagged PDF + outline give screen readers and parsers a real document structure.
"$CHROME" --headless --no-sandbox --disable-gpu --no-pdf-header-footer \
  --export-tagged-pdf --generate-pdf-document-outline \
  --virtual-time-budget=8000 --print-to-pdf="$WORK/raw.pdf" "$URL" 2>/dev/null

cat > "$WORK/finish.py" <<'PY'
import re, sys
from pypdf import PdfReader, PdfWriter
from pdfminer.high_level import extract_text

raw, out = sys.argv[1], sys.argv[2]

writer = PdfWriter(clone_from=raw)
writer.add_metadata({
    "/Title": "Humza Khan — Resume",
    "/Author": "Humza Khan",
    "/Subject": "Resume: product engineer, AI safety and security for agents, LLM evaluation",
    "/Keywords": "AI safety, AI control, adversarial robustness, LLM evaluation, prompt injection, fine-tuning, Python",
})
with open(out, "wb") as f:
    writer.write(f)

reader = PdfReader(out)
problems = []
if len(reader.pages) != 1:
    problems.append(f"expected 1 page, got {len(reader.pages)}")
if "/StructTreeRoot" not in reader.trailer["/Root"]:
    problems.append("PDF is not tagged")
for name, text in (("pypdf", reader.pages[0].extract_text()), ("pdfminer", extract_text(out))):
    # Letter-spaced words ("S U M M A R Y") mean a parser will misread a heading.
    if re.search(r"\b(?:[A-Z] ){3,}[A-Z]\b", text):
        problems.append(f"{name}: letter-spaced text")
    for must in ("SUMMARY", "EXPERIENCE", "Humza Khan", "hello@humza.io"):
        if must not in text:
            problems.append(f"{name}: missing {must!r}")

if problems:
    sys.exit("PDF check failed:\n  " + "\n  ".join(problems))
print(f"{out}: 1 page, tagged, text extracts cleanly")
PY

uv run -q --no-project --with pypdf --with pdfminer.six python -I "$WORK/finish.py" "$WORK/raw.pdf" "$OUT"
