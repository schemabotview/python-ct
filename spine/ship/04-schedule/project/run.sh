#!/usr/bin/env bash
# The monthly job, for cron: last month unless a month is given. Output goes
# to logs/roastery.log; a failure also leaves a line in logs/ALERT.
cd "$(dirname "$0")" || exit 1
month="${1:-$(date -d "last month" +%Y-%m)}"
mkdir -p logs
if ! .venv/bin/roastery-etl run --month "$month" >> logs/roastery.log 2>&1
then
    echo "$(date -I) roastery-etl failed for $month" >> logs/ALERT
    exit 1
fi
