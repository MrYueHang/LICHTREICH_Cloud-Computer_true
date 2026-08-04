#!/bin/bash
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
PROJECT="${BOOKLAB_PROJECT:-$HOME/LICHTREICH/OFFENER_KREIS}"
INPUT="${1:-${BOOKLAB_INPUT:-$HOME/Downloads/OFFENER_KREIS_INPUT}}"

mkdir -p "$PROJECT"
python3 "$HERE/booklab.py" init --project "$PROJECT"

if [ -e "$INPUT" ]; then
  python3 "$HERE/booklab.py" import --project "$PROJECT" --source "$INPUT"
else
  echo "Kein Eingabeordner gefunden: $INPUT"
  echo "Lege ZIPs/Dateien dort ab oder ziehe einen Ordner auf start.command."
fi

python3 "$HERE/booklab.py" audit --project "$PROJECT"
python3 "$HERE/booklab.py" serve --project "$PROJECT" --open
