import type { SceneModel } from '@graphlearning/graphl-flow'

// §5 — the finished pipeline: the pipeline map once more, every stage now named by the classes and
// functions that do it (Course 9 on), with the command and schedule that start it and the checks
// that guard it. A full frame, like picture §5.
export const shipFinished: SceneModel = {
  title: 'roastery-etl, finished',
  sub: 'from an empty folder to a tested, packaged, scheduled pipeline: every box is code you wrote',
  dir: 'col',
  nodes: [
    {
      type: 'group', id: 'start', title: 'What starts it', icon: 'clock', tone: 'source', dir: 'row', children: [
        { type: 'item', id: 'cron', title: 'cron and run.sh', sub: '06:05 on the 1st; exit 1 leaves an alert', icon: 'clock' },
        { type: 'item', id: 'cli', title: 'roastery-etl run --month', sub: 'argparse, Config, a wheel with an entry point', icon: 'terminal' },
        { type: 'item', id: 'pipe', title: 'Pipeline(source, sinks).run()', sub: 'parts composed, @timed, a clock you can swap', icon: 'workflow' },
      ],
    },
    {
      type: 'group', id: 'stages', title: 'The pipeline', sub: 'five stages, each a few classes and functions', icon: 'workflow', tone: 'ingest', dir: 'row', children: [
        { type: 'item', id: 'extract', title: 'Extract', icon: 'file', bullets: ['CsvDays', 'ApiSource (asyncio)', 'read_text, iter_rows'] },
        { type: 'item', id: 'validate', title: 'Validate', icon: 'check', bullets: ['parse_row', 'Orders.from_rows', 'PipelineError family'] },
        { type: 'item', id: 'transform', title: 'Transform', icon: 'workflow', bullets: ['LineItem', 'Money', 'DiscountRule ×3'] },
        { type: 'item', id: 'aggregate', title: 'Aggregate', icon: 'chart', bullets: ['summarise', 'Summary', 'Counter, groupby'] },
        { type: 'item', id: 'load', title: 'Load', icon: 'database', bullets: ['CsvReport', 'JsonSummary', 'SqliteWarehouse'] },
      ],
    },
    {
      type: 'group', id: 'sinks', title: 'What it writes', icon: 'database', tone: 'store', dir: 'row', children: [
        { type: 'item', id: 'report', title: 'daily_report.csv', sub: 'for people', icon: 'table' },
        { type: 'item', id: 'summary', title: 'summary.json', sub: 'for programs, money as strings', icon: 'code' },
        { type: 'item', id: 'warehouse', title: 'warehouse.db', sub: 'SQLite, upserts, safe to re-run', icon: 'database' },
      ],
    },
    {
      type: 'group', id: 'checks', title: 'What guards it, on every change', tone: 'serve', dir: 'row', children: [
        { type: 'item', id: 'pytest', title: 'pytest', sub: 'fixtures, parametrize, fakes', icon: 'check' },
        { type: 'item', id: 'mypy', title: 'mypy', sub: 'every hint, every path', icon: 'search' },
        { type: 'item', id: 'ruff', title: 'ruff', sub: 'lint and format', icon: 'filter' },
        { type: 'item', id: 'logs', title: 'logging', sub: 'levels, one handler', icon: 'terminal' },
      ],
    },
  ],
  edges: [
    { from: 'start', to: 'stages' },
    { from: 'extract', to: 'validate' },
    { from: 'validate', to: 'transform' },
    { from: 'transform', to: 'aggregate' },
    { from: 'aggregate', to: 'load' },
    { from: 'stages', to: 'sinks' },
  ],
}
