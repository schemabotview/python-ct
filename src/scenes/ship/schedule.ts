import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, linesFrom } from '../ide'
import { codeTree, MODEL, PACKAGE } from '../structure/tree'
import code from '../../../spine/ship/04-schedule/project/run.sh?raw'
import session from '../../../spine/ship/04-schedule/session.txt?raw'

// §4 — running on a schedule: cron calls run.sh, the exit code decides, a failure leaves an alert.
// The runs, the alert (its date is the run's) and the log line are the session's.
export const shipSchedule: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, ...MODEL, 'pipeline/__main__.py', 'pipeline/cli.py', 'pipeline/decorators.py', 'bench/api.py', 'crontab.txt', 'roastery.toml', 'run.sh', 'tests/conftest.py', 'tests/test_cli.py', 'tests/test_decorators.py', 'tests/test_model.py', 'tests/test_pipeline.py', 'tests/test_transform.py', 'tests/test_validate.py', 'pyproject.toml'], { active: 'run.sh', fresh: ['crontab.txt', 'run.sh'], closed: ['bench'] }),
  editor: { file: 'run.sh', code, lang: 'shell', highlight: linesFrom(code, 'if ! .venv/bin/roastery-etl', 'exit 1') },
  session,
  side: [
    {
      type: 'group', id: 'flow', title: 'Every month, with nobody watching', icon: 'clock', tone: 'ingest', children: [
        { type: 'item', id: 'cron', title: 'cron: 5 6 1 * *', sub: '06:05 on the 1st: last month', icon: 'clock' },
        { type: 'item', id: 'script', title: 'run.sh', sub: 'roastery-etl run --month …, output to logs/', icon: 'terminal' },
        {
          type: 'group', id: 'ends', bare: true, dir: 'row', children: [
            { type: 'item', id: 'ok', title: 'exit 0', sub: 'done: the log has the details', icon: 'check', tone: 'store' },
            { type: 'item', id: 'bad', title: 'exit 1', sub: 'a line in logs/ALERT', icon: 'bell', tone: 'consume' },
          ],
        },
      ],
    },
    {
      type: 'table', id: 'fields', title: 'crontab.txt, field by field', tone: 'store', columns: ['minute', 'hour', 'day', 'month', 'weekday'], rows: [['5', '6', '1', '*', '*']],
    },
    { type: 'table', id: 'alert', title: 'The November run, which failed', tone: 'store', columns: ['file', 'line'], rows: [['logs/ALERT', '… roastery-etl failed for 2026-11'], ['logs/roastery.log', 'ERROR … no day files for 2026-11']] },
    { type: 'item', id: 'sc-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['cron runs it; the exit code says how it went', 'a failure must leave a trace someone will see'] },
  ],
  edges: [{ from: 'cron', to: 'script' }, { from: 'script', to: 'ends', label: 'exit code' }],
})
