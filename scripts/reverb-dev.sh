#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${REPO_ROOT}"

PORT="${REVERB_SERVER_PORT:-8080}"

read_env_var() {
    local key="$1"
    local default="${2:-}"

    if [[ -f .env ]]; then
        local line
        line="$(grep -E "^${key}=" .env | tail -1 || true)"
        if [[ -n "${line}" ]]; then
            local value="${line#*=}"
            value="${value%$'\r'}"
            value="${value#\"}"
            value="${value%\"}"
            value="${value#\'}"
            value="${value%\'}"
            echo "${value}"
            return
        fi
    fi

    echo "${default}"
}

SCHEME="$(read_env_var REVERB_SCHEME http)"
HOSTNAME="$(read_env_var REVERB_HOST localhost)"

if lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN >/dev/null 2>&1; then
    occupant_cwd=""
    occupant_pid="$(lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN -t 2>/dev/null | head -1 || true)"
    if [[ -n "${occupant_pid}" ]]; then
        occupant_cwd="$(lsof -nP -p "${occupant_pid}" -a -d cwd -Fn 2>/dev/null | awk '/^n/ { print substr($0, 2) }' | head -1 || true)"
    fi

    if [[ "${occupant_cwd}" == "${REPO_ROOT}" ]]; then
        echo "[reverb] Port ${PORT} already has this app's Reverb. Skipping a second start."
        echo "[reverb] Stop the other \`pnpm dev\` (or the process on :${PORT}) if you want a fresh server."
    elif [[ "${occupant_cwd}" == *"/Herd/services/reverb"* ]] || [[ "${occupant_cwd}" == *"/Shared/Herd/services/reverb"* ]]; then
        echo "[reverb] Port ${PORT} is in use (Herd Reverb on plain WS)."
        echo "[reverb] This site uses HTTPS — Echo needs WSS. Stop Herd → Services → Reverb,"
        echo "[reverb] then restart with \`pnpm dev\` (not dev:herd) so this app starts secure Reverb."
    elif [[ "${SCHEME}" == "https" ]]; then
        echo "[reverb] Port ${PORT} is in use (${occupant_cwd:-unknown process})."
        echo "[reverb] This site uses HTTPS — Echo needs WSS. Free :${PORT}, then restart \`pnpm dev\`."
    else
        echo "[reverb] Port ${PORT} already in use. Skipping embedded start."
    fi
    exec tail -f /dev/null
fi

echo "[reverb] Starting Reverb on port ${PORT} (hostname: ${HOSTNAME}, tls: ${SCHEME})..."
if [[ "${SCHEME}" == "https" ]]; then
    exec php artisan reverb:start --host="0.0.0.0" --hostname="${HOSTNAME}" --port="${PORT}"
fi

exec php artisan reverb:start --port="${PORT}"
