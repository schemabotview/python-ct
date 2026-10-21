import type { Scene, SceneNode, TreeEntry } from '@graphlearning/flow'

// The IDE frame every course from 3 on is built from — ONE fixed template, so every panel sits at the
// same pixels in every section and a viewer always knows where to look:
//
//   explorer (EXPLORER_W, full height) | editor (EDITOR_COLS × EDITOR_H)  | side (SIDE_W, full height)
//                                       80 columns: PEP 8's line limit, so a well-formatted line always fits
//                                       | terminal docked underneath (TERMINAL_H)
//
// The sizes are floors (minW / minH): a file longer than the editor must be folded with `show`, not
// allowed to grow the pane — check-render.mjs fails any IDE frame whose panels move. Code and terminal
// text come from spine/ via `?raw`, so a frame can only show what scripts/spine.py has replayed.

export const EXPLORER_W = 290
export const EDITOR_COLS = 80
export const EDITOR_W = 792
export const EDITOR_H = 500
export const TERMINAL_H = 280
export const SIDE_W = 520
const GAP = 10

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

export function ideFrame(id: string, project: string, tree: TreeEntry[], pane: Pane | SceneNode, side: SceneNode): Scene {
  const centre: SceneNode =
    'code' in pane
      ? {
          id: `${id}-centre`,
          label: pane.file,
          bare: true,
          gap: 'tight',
          children: [
            {
              id: `${id}-editor`, kind: 'code', filename: pane.title ?? pane.file, label: trim(pane.code), show: pane.show,
              highlight: pane.highlight, pattern: pane.pattern ?? 'storage', minCols: EDITOR_COLS, minH: EDITOR_H,
            },
            { id: `${id}-terminal`, kind: 'terminal', filename: `Terminal — ${project}`, label: trim(pane.terminal ?? ''), span: 'all', minH: TERMINAL_H },
          ],
        }
      : { ...pane, minW: EDITOR_W, minH: EDITOR_H + GAP + TERMINAL_H }
  return {
    id,
    padding: 0.04,
    flow: 'LR',
    align: 'start',
    stretch: true,
    gap: 'tight',
    nodes: [
      { id: `${id}-explorer`, kind: 'tree', label: project, tree, minW: EXPLORER_W },
      centre,
      { id: `${id}-side`, label: 'side', bare: true, framed: true, minW: SIDE_W, children: [{ ...side, minW: SIDE_W }] },
    ],
    edges: [],
  }
}
