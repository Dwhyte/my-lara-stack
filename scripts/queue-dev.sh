#!/usr/bin/env bash
set -euo pipefail
echo "[queue] Laravel queue listener started (--timeout=360 --tries=1)."
exec php artisan queue:listen --tries=1 --timeout=360 -v "$@"
