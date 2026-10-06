#!/usr/bin/env bash
# Installs every Manner registry item into a fresh copy of the consumer fixture
# with the real shadcn CLI, then typechecks the result. Run after
# `npm run prepare:system`. Needs network access to the npm registry.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
port=4174
work="$(mktemp -d)"
trap 'kill "${server_pid:-0}" 2>/dev/null || true; rm -rf "${work}"' EXIT

cp -R "${root}/tests/fixtures/consumer/." "${work}/"
cd "${work}"

# The fixture's components.json points @manner at http://127.0.0.1:4174/r/{name}.json.
# Where ui.shadcn.com is unreachable, set SHADCN_MIRROR to a directory holding
# a copy of its /r files (e.g. r/colors/neutral.json); it is served alongside.
served="${work}/.served"
mkdir -p "${served}"
cp -R "${root}/public/." "${served}/"
if [[ -n "${SHADCN_MIRROR:-}" ]]; then
  cp -R "${SHADCN_MIRROR}/." "${served}/"
  export REGISTRY_URL="http://127.0.0.1:${port}/r"
fi
python3 -m http.server "${port}" --bind 127.0.0.1 --directory "${served}" >/dev/null 2>&1 &
server_pid=$!
for _ in $(seq 1 20); do curl -sf "http://127.0.0.1:${port}/r/index.json" >/dev/null && break; sleep 0.5; done

npm install --no-audit --no-fund --silent typescript@5.9.3 @types/react@19.2.14 @types/react-dom@19.2.3 tailwindcss@4.2.1 >/dev/null

items="$(node -e '
  const registry = require(process.argv[1])
  console.log(registry.items.filter((item) => item.type !== "registry:file").map((item) => "@manner/" + item.name).join(" "))
' "${root}/registry.json")"

# shellcheck disable=SC2086
npx --yes shadcn@latest add ${items} --yes --overwrite --silent

cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "isolatedModules": true,
    "paths": { "@/*": ["./*"] }
  },
  "include": ["components/**/*.tsx", "components/**/*.ts", "hooks/**/*.ts", "lib/**/*.ts"],
  "exclude": [".served", "node_modules"]
}
JSON

if grep -rqE 'var\(--(canvas|ink|surface)\b|className="[^"]*\bmanner-' components; then
  echo "Installed source still depends on 0.1 tokens or site-only classes." >&2
  exit 1
fi
grep -q -- "--brand:" app/globals.css || { echo "manner-theme did not write --brand into globals.css" >&2; exit 1; }

npx tsc -p tsconfig.json
echo "consumer smoke test passed: $(find components -name '*.tsx' | wc -l | tr -d ' ') files installed and typechecked"
