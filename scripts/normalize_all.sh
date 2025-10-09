"scripts": {
  "dev": "next dev",
  "cockpit:dev": "next dev --port 3000 & sleep 3 && open http://localhost:3000/cockpit",
  "vault:dev": "next dev --port 3000 & sleep 3 && open http://localhost:3000/vault",
  "ride:street": "next dev --port 3000 & sleep 3 && open http://localhost:3000/ride/street",
  "ride:soul": "next dev --port 3000 & sleep 3 && open http://localhost:3000/ride/soul",
  "ride:spirit": "next dev --port 3000 & sleep 3 && open http://localhost:3000/ride/spirit",
  "hollywood": "next dev --port 3000 & sleep 3 && open http://localhost:3000/cockpit && open http://localhost:3000/vault && open http://localhost:3000/ride/street && open http://localhost:3000/ride/soul && open http://localhost:3000/ride/spirit",
  "hollywood:prod": "next build && next start --port 3000 & sleep 3 && open http://localhost:3000/cockpit && open http://localhost:3000/vault && open http://localhost:3000/ride/street && open http://localhost:3000/ride/soul && open http://localhost:3000/ride/spirit",
  "reset": "rm -rf .next node_modules/.cache && next build && next start --port 3000 & sleep 3 && open http://localhost:3000/cockpit",
  "matrix": "sh scripts/normalize_all.sh && rm -rf .next node_modules/.cache && next build && next start --port 3000 & sleep 3 && open http://localhost:3000/cockpit && open http://localhost:3000/vault && open http://localhost:3000/ride/street && open http://localhost:3000/ride/soul && open http://localhost:3000/ride/spirit",
  "matrix:status": "tail -n 5 scripts/matrix_log.txt || echo 'No Matrix log entries yet.'",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "normalize": "sh scripts/normalize_all.sh"
}
