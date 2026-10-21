import type { Scene, SceneNode, TreeEntry } from '@graphlearning/flow'

// The IDE frame every course from 3 on is built from: the explorer on the left, then one or more
// editor columns (each an editor with its terminal docked underneath), then an optional side pane
// for what the terminal cannot show. Panes sit edge to edge (`gap: 'tight'`) and the explorer runs
// the full height (`stretch`). Code and terminal text come from spine/ via `?raw` imports, so a
// frame can only show what scripts/spine.py has replayed.

export interface Pane {
  file: string
  code: string
  show?: [number, number][]
  highlight?: number[]
  pattern?: SceneNode['pattern']
  terminal?: string
  title?: string
}

export const trim = (text: string) => text.replace(/\n+$/, '')

export interface Layout {
  stack?: boolean
  sideBelow?: boolean
}

// A short file makes a wide, shallow frame that 16:9 letterboxes. `sideBelow` moves the side pane
// under the terminal; `stack` puts several editor columns one above the other instead of side by
// side. Both trade width for height, which is what a frame of small files needs.
export function ideFrame(id: string, project: string, tree: TreeEntry[], panes: Pane[], side?: SceneNode, layout: Layout = {}): Scene {
  const pane = (p: Pane, i: number): SceneNode[] => [
    { id: `${id}-editor${i}`, kind: 'code', filename: p.title ?? p.file, label: trim(p.code), show: p.show, highlight: p.highlight, pattern: p.pattern ?? 'storage' },
    ...(p.terminal ? [{ id: `${id}-terminal${i}`, kind: 'terminal' as const, filename: `Terminal — ${project}`, label: trim(p.terminal), span: 'all' as const }] : []),
  ]
  const below = side && layout.sideBelow ? [{ ...side, span: 'all' as const }] : []
  const columns: SceneNode[] = layout.stack
    ? [{ id: `${id}-col`, label: 'editors', bare: true, gap: 'tight', children: [...panes.flatMap(pane), ...below] }]
    : panes.map((p, i) => ({
        id: `${id}-col${i}`,
        label: p.file,
        bare: true,
        gap: 'tight' as const,
        children: [...pane(p, i), ...(i === panes.length - 1 ? below : [])],
      }))
  return {
    id,
    padding: 0.04,
    flow: 'LR',
    align: 'start',
    stretch: true,
    gap: 'tight',
    nodes: [{ id: `${id}-explorer`, kind: 'tree', label: project, tree }, ...columns, ...(side && !layout.sideBelow ? [side] : [])],
    edges: [],
  }
}
