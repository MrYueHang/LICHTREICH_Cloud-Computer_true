#!/usr/bin/env bash
# Loop-Übergabe: holt AI-Studios Frontend vom 'studio'-Branch nach 'main',
# OHNE Claudes Docs/Specs zu löschen (selektiver Merge — bulletproof).
# Nutzung:  bash loop-merge-studio.sh
set -euo pipefail
cd "$(dirname "$0")"

echo "→ fetch…"
git fetch origin --quiet

echo "→ main aktualisieren…"
git checkout main --quiet
git pull --ff-only origin main --quiet || true

# Nur Frontend-/Studio-Pfade aus dem studio-Branch übernehmen.
# (Claudes docs/ specs/ schemas/ handoffs/ *.md bleiben unangetastet — sie stehen hier NICHT drin.)
FRONTEND_PATHS="src public index.html package.json package-lock.json pnpm-lock.yaml tsconfig.json tsconfig.node.json vite.config.ts tailwind.config.js postcss.config.js metadata.json AGENTS.md CLAUDE_SYNC.txt"

echo "→ Studio-Frontend aus origin/studio übernehmen…"
CHANGED=0
for p in $FRONTEND_PATHS; do
  if git cat-file -e "origin/studio:$p" 2>/dev/null; then
    git checkout origin/studio -- "$p" && CHANGED=1 && echo "   ✓ $p"
  fi
done

if [ "$CHANGED" -eq 0 ]; then
  echo "→ nichts Neues von Studio. Fertig."; exit 0
fi

git add -A
if git diff --cached --quiet; then
  echo "→ keine Änderungen. Fertig."; exit 0
fi

git -c user.name="Claude (Terminal)" -c user.email="noreply@anthropic.com" \
  commit -q -m "loop: Studio-Frontend nach main gemergt (Docs/Specs unangetastet)"
git push origin main --quiet

echo "→ studio-Branch auf main zurücksetzen (nächster Export startet frisch)…"
git push origin main:studio --quiet || git push origin main:studio --force-with-lease

echo "✅ Merge fertig. main hat: Studios Frontend + Claudes Docs."
