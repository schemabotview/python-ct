import type { SceneModel } from '@graphlearning/graphl-flow'

// §6 — where next: the same five stages at a scale this course never needed, each with the tools
// that take it there. A concept frame: nothing here is run, so it claims only what each tool is for.
export const shipWhereNext: SceneModel = {
  title: 'Where next',
  sub: 'the same pipeline, at a bigger scale: every stage you built has a tool built for millions of rows',
  dir: 'col',
  nodes: [
    {
      type: 'table', id: 'map', title: 'Our stage, and its tool at scale', tone: 'ingest', columns: ['stage', 'we wrote', 'at scale'], rows: [
        ['Extract', 'csv.DictReader, one row at a time', 'pandas.read_csv, Polars, DuckDB read whole folders, Parquet'],
        ['Validate', 'parse_row and PipelineError', 'schema checks on whole columns: pandera, Great Expectations'],
        ['Transform, aggregate', 'dicts, Counter, groupby', 'DataFrames and SQL: pandas, Polars, DuckDB; Spark across machines'],
        ['Load', 'CSV, JSON, SQLite', 'Parquet files, a data warehouse'],
        ['Schedule', 'cron and run.sh', 'Airflow or Dagster: retries, dependencies, a dashboard'],
      ],
    },
    {
      type: 'group', id: 'tools', title: 'The names you will meet', tone: 'store', dir: 'row', children: [
        { type: 'item', id: 'pandas', title: 'pandas', sub: 'DataFrames on one machine', icon: 'pandas', stack: true },
        { type: 'item', id: 'duckdb', title: 'DuckDB', sub: 'SQL over files, in-process', icon: 'duckdb', stack: true },
        { type: 'item', id: 'spark', title: 'Spark', sub: 'one job, many machines', icon: 'spark', stack: true },
        { type: 'item', id: 'airflow', title: 'Airflow', sub: 'pipelines as scheduled graphs', icon: 'airflow', stack: true },
      ],
    },
    { type: 'note', id: 'same', tone: 'ingest', text: 'The ideas do not change: stream what you can, keep money exact, refuse bad rows with a reason, make every run safe to repeat, and test it all.' },
  ],
  edges: [{ from: 'map', to: 'tools' }],
}
