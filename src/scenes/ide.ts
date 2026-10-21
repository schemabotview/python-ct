import type { Scene, SceneNode, TreeEntry } from '@graphlearning/flow'

// The IDE frame every course from 3 on is built from — ONE fixed template, so every panel sits at the
// same pixels in every section and a viewer always knows where to look:
//
//   explorer (EXPLORER_W, full height) | editor (EDITOR_COLS × EDITOR_H)  | side (SIDE_W, full height)
//                                       80 columns: PEP 8's line limit, so a well-formatted line always fits
//                                       | terminal docked underneath (TERMINAL_H)
//
// The sizes are floors (minW / minH): a file longer than the editor must be folded with `show`, not
// allowed to grow the pane — check-render.mjs fails any IDE frame whose panels move.
//
// The proportions are the frame's: explorer + editor + side is 1632 wide and editor + terminal is
// 856 tall, 1.91:1 — the shape of the scene area under the section header at 16:9 (3840×2020 at 4K).
// A composition of that shape is fitted edge to edge; at the old 790 tall (2.07:1) the frame filled
// the width and left ~230px of slack split above and below it. EDITOR_H holds 21 code rows and
// TERMINAL_H 10 lines (22px each, plus 61px of chrome). Every side card is stretched to SIDE_W, so the
// column's right edge is a real edge rather than wherever the widest card happens to end. Code and terminal
// text come from spine/ via `?raw`, so a frame can only show what scripts/spine.py has replayed.

export const EXPLORER_W = 300
export const EDITOR_COLS = 80
export const EDITOR_W = 792
export const EDITOR_H = 544
export const TERMINAL_H = 302
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

// A bare side group is a column of cards: each one is stretched to the column, not the group.
const fill = (side: SceneNode): SceneNode =>
  side.bare && side.children ? { ...side, minW: SIDE_W, children: side.children.map((c) => ({ ...c, minW: SIDE_W })) } : { ...side, minW: SIDE_W }

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
      { id: `${id}-side`, label: 'side', bare: true, framed: true, minW: SIDE_W, children: [fill(side)] },
    ],
    edges: [],
  }
}
