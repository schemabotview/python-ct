import type { Edge, Group, Item, SceneModel } from '@graphlearning/graphl-flow'

// The pipeline map — the course's one picture of the application it builds (PYTHON-COURSE-PLAN.md,
// "The pipeline map"). Two drawings of the same stages:
//
//   pipelineMap   the full concept scene: sources over five stages over outputs, each stage with the
//                 course that builds it and the Python it is built from, and Part II as a rail
//                 underneath (introduced in picture §5)
//   mapPane(at)   a compact column for an IDE side pane with the stage `at` lit — every course's FIRST
//                 section opens with it, so a learner always knows where in the application they are
//
// The stage list is shared, so the two cannot disagree about what the pipeline is. Stage cards keep
// their icon on the left: a stacked card centres its bullets' text but not their markers. The full map
// flows TOP to bottom (sources → stages → outputs, stages left to right inside): a single left-to-right
// strip was 4:1 and left two thirds of the 16:9 frame empty.

export type Stage = 'extract' | 'validate' | 'transform' | 'aggregate' | 'load'

const STAGES: { id: Stage; title: string; icon: string; course: string; python: string[] }[] = [
  { id: 'extract', title: 'Extract', icon: 'file', course: 'Course 5', python: ['open and with', 'pathlib', 'csv and json', 'generators'] },
  { id: 'validate', title: 'Validate', icon: 'shield', course: 'Courses 4–5', python: ['if and match', 'exceptions', 'InvalidOrder', 'keep the good rows'] },
  { id: 'transform', title: 'Transform', icon: 'workflow', course: 'Course 4', python: ['Decimal', 'functions', 'loops', 'comprehensions'] },
  { id: 'aggregate', title: 'Aggregate', icon: 'chart', course: 'Course 6', python: ['dicts and Counter', 'sorted and key=', 'datetime', 'itertools'] },
  { id: 'load', title: 'Load', icon: 'database', course: 'Course 7', python: ['csv.writer', 'f-strings', 'sqlite3', 'atomic writes'] },
]

const SOURCES: Item[] = [
  { type: 'item', id: 'src-days', title: 'orders-2026-10-DD.csv', sub: 'one file a day, from the shop', icon: 'file' },
  { type: 'item', id: 'src-catalogue', title: 'catalogue.json', sub: 'products and prices', icon: 'file' },
  { type: 'item', id: 'src-api', title: 'the orders API', sub: 'read concurrently in Course 11', icon: 'globe' },
]

const SINKS: Item[] = [
  { type: 'item', id: 'out-report', title: 'daily_report.csv', sub: 'for people', icon: 'table' },
  { type: 'item', id: 'out-summary', title: 'summary.json', sub: 'for programs', icon: 'code' },
  { type: 'item', id: 'out-warehouse', title: 'warehouse.db', sub: 'SQLite, safe to re-run', icon: 'database' },
]

const RAIL: Item[] = [
  { type: 'item', id: 'rail-structure', title: 'A package', sub: 'Course 8', icon: 'package', bullets: ['modules', 'type hints'] },
  { type: 'item', id: 'rail-model', title: 'Objects', sub: 'Course 9', icon: 'boxes', bullets: ['Money, Order', 'protocols'] },
  { type: 'item', id: 'rail-trust', title: 'Tested', sub: 'Course 10', icon: 'check', bullets: ['pytest', 'logging'] },
  { type: 'item', id: 'rail-speed', title: 'Fast', sub: 'Course 11', icon: 'zap', bullets: ['profiled', 'concurrent'] },
  { type: 'item', id: 'rail-ship', title: 'Shipped', sub: 'Course 12', icon: 'clock', bullets: ['a command', 'on a schedule'] },
]

const chain = (ids: string[]): Edge[] => ids.slice(1).map((to, i) => ({ from: ids[i], to }))

export const pipelineMap: SceneModel = {
  title: 'roastery-etl',
  sub: "a coffee roastery's orders, from raw files to a warehouse — built from an empty folder",
  dir: 'col',
  nodes: [
    { type: 'group', id: 'sources', title: 'Sources', icon: 'folder', tone: 'source', dir: 'row', children: SOURCES },
    {
      type: 'group', id: 'stages', title: 'The pipeline', sub: 'every stage is plain Python — the standard library only', icon: 'workflow', tone: 'ingest', dir: 'row',
      children: STAGES.map((s): Item => ({ type: 'item', id: s.id, title: s.title, sub: s.course, icon: s.icon, bullets: s.python })),
    },
    { type: 'group', id: 'sinks', title: 'Outputs', icon: 'database', tone: 'store', dir: 'row', children: SINKS },
    { type: 'group', id: 'rail', title: 'Then it is made real', sub: 'Part II — the same pipeline, structured, modelled, tested, sped up and shipped', tone: 'serve', dir: 'row', children: RAIL },
  ],
  // Sources feed the pipeline GROUP and the group writes the outputs: an edge into `extract` itself
  // has to cross the group's heading to reach it (the first build did, through "The pipeline").
  edges: [
    { from: 'sources', to: 'stages' },
    ...chain(STAGES.map((s) => s.id)),
    { from: 'stages', to: 'sinks' },
  ],
}

/**
 * The map as a column for an IDE side pane: every stage a card with its icon and course, the stage
 * `at` lit in its own tone and the rest muted; sources and outputs are chips at either end. Returns the group and its edges; ids are prefixed `map-` so the
 * pane's own diagram can sit beside it.
 */
export function mapPane(at?: Stage): { node: Group; edges: Edge[] } {
  const ids = ['map-sources', ...STAGES.map((s) => `map-${s.id}`), 'map-sinks']
  const chip = (id: string, title: string): Item => ({ type: 'item', id, title, chip: true, tone: 'neutral' })
  return {
    node: {
      type: 'group', id: 'map', title: 'The pipeline', icon: 'workflow', tone: 'neutral', children: [
        chip('map-sources', 'sources'),
        // The lit stage sits in its own toned group: a group that sets its OWN tone draws its tint and
        // coloured border (graphl-flow's `data-toned`), where a toned item only recolours its icon.
        ...STAGES.map((s): Item | Group => {
          const card: Item = { type: 'item', id: `map-${s.id}`, title: s.title, sub: s.course, icon: s.icon, tone: 'neutral' }
          return s.id === at
            ? { type: 'group', id: `map-${s.id}-here`, title: 'you are here', tone: 'store', children: [{ ...card, tone: 'store' }] }
            : card
        }),
        chip('map-sinks', 'outputs'),
      ],
    },
    // The chain runs through the lit stage's GROUP, so the arrows meet its frame, not the card inside.
    edges: chain(ids.map((id) => (id === `map-${at}` ? `map-${at}-here` : id))),
  }
}
