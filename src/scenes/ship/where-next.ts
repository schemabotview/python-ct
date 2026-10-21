import type { Scene, SceneNode } from '@graphlearning/flow'

// A concept frame: there is no file of ours to show. It maps each part of roastery-etl onto the tool that does
// the same job at a larger scale; nothing on it is a measurement.
const tool = (id: string, label: string, sub: string, icon: string, pattern: SceneNode['pattern']): SceneNode =>
  ({ id, label, sub, icon, pattern })

export const whereNext: Scene = {
  id: 'ship-where-next',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  framed: true,
  header: 'band',
  nodes: [
    {
      id: 'ours',
      label: 'What you built',
      sub: 'roastery-etl 1.0.0, standard library only',
      pattern: 'group',
      icon: 'none',
      gap: 'tight',
      children: [
        tool('n-extract', 'Extract', 'csv, json, generators', 'file', 'storage'),
        tool('n-transform', 'Transform', 'dicts, Counter, groupby', 'sigma', 'service'),
        tool('n-load', 'Load', 'sqlite3, atomic CSV files', 'database', 'network'),
        tool('n-schedule', 'Schedule', 'cron and exit codes', 'clock', 'user'),
      ],
    },
    {
      id: 'next',
      label: 'The same pipeline, at scale',
      sub: 'every idea carries over; only the tool changes',
      pattern: 'group',
      icon: 'none',
      cols: 2,
      children: [
        tool('pandas', 'pandas', 'whole tables in memory: groupby in one line', 'pandas', 'service'),
        tool('polars', 'Polars', 'the same, lazy and multi-core', 'table', 'service'),
        tool('duckdb', 'DuckDB', 'SQL straight over CSV and Parquet files', 'duckdb', 'storage'),
        tool('parquet', 'Parquet', 'columnar files instead of CSV', 'parquet', 'storage'),
        tool('spark', 'PySpark', 'the job spread over many machines', 'spark', 'network'),
        tool('airflow', 'Airflow', 'schedules, retries and alerts, instead of cron', 'airflow', 'user'),
      ],
    },
    {
      id: 'keep',
      kind: 'list',
      icon: 'star',
      label: 'What stays the same',
      pattern: 'user',
      items: [
        'Money as Decimal, never float',
        'Validate every row; report the rejects',
        'Stream instead of holding everything',
        'Idempotent loads, atomic writes',
        'Tests, types and a linter before shipping',
        'Measure before optimising',
      ],
    },
  ],
  edges: [
    { source: 'ours', target: 'next', label: 'grows into' },
    { source: 'next', target: 'keep' },
  ],
}
