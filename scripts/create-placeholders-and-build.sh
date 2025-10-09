#!/usr/bin/env bash
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

echo "== creating temporary placeholders (if missing) =="

mkdir -p app/backgrounds
mkdir -p src/config

create_if_missing() {
  local path="$1"
  local content="$2"
  if [ -f "$path" ]; then
    printf "exists: %s\n" "$path"
  else
    printf "create: %s\n" "$path"
    printf "%s\n" "$content" > "$path"
  fi
}

create_if_missing "app/backgrounds/IndigoNebula.tsx" "export default function IndigoNebula(){return null;}"
create_if_missing "app/backgrounds/EmeraldGoldVeil.tsx" "export default function EmeraldGoldVeil(){return null;}"
create_if_missing "app/backgrounds/CelestialDustField.tsx" "export default function CelestialDustField(){return null;}"
create_if_missing "app/backgrounds/VoidHorizon.tsx" "export default function VoidHorizon(){return null;}"
create_if_missing "src/config/rooms.ts" "// temporary placeholder for rooms config\nexport const rooms = [];\nexport default rooms;"

# If any files were created, stage & commit them.
if git status --porcelain | grep -q '^A'; then
  echo "== staging new placeholder files =="
  git add -A
  git commit -m "chore: add temporary placeholders to satisfy build"
else
  echo "== no new placeholder files added =="
fi

# Try build; prefer pnpm if available, else npm.
if command -v pnpm >/dev/null 2>&1; then
  pnpm -w -s build || { echo 'pnpm build failed; attempting pnpm dev'; pnpm dev || true; }
else
  npm run build || { echo 'npm build failed; attempting npm dev'; npm run dev || true; }
fi

echo "== done (placeholders created & build attempted) =="
