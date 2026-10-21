#!/bin/sh
# Run by cron with no arguments, which processes last month:
#   17 6 2 * *  /home/ana/roastery-etl/deploy/run.sh
# Cron mails any output to MAILTO, so a quiet success sends nothing, and a
# failure sends exactly one line, with the exit code.
cd "$(dirname "$0")/.." || exit 1
mkdir -p logs
log=logs/run.log
.venv/bin/roastery-etl run "$@" >> "$log" 2>&1 || echo "roastery-etl failed: $?"
