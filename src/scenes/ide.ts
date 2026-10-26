import type { Code, Edge, Group, SceneModel, SceneNode, Tree, TreeEntry } from '@graphlearning/graphl-flow'
import { SCENE_ASPECT } from '@graphlearning/shell'

// The IDE frame every course from 2 on is built from — ONE fixed template, so every pane sits at the
// same pixels in every section and a viewer always knows where to look:
//
//   explorer (EXPLORER_W) | editor (EDITOR_W × EDITOR_H)    | side pane (SIDE_W, fixed)
//                         | terminal docked under it (TERMINAL_H)
//
// Every pane has FLOORS (minW / minH) and the side pane is a FIXED column (`w`): content wider than
// it overflows (check-render fails it) instead of moving the frame. graphl-flow's fit is a pure
// function of the natural box, so equal boxes mean equal zoom — check-render asserts every IDE
// section lands on the same fit, to the pixel. A file longer than the editor is folded with `show`,
// never allowed to grow the pane.
//
// The sizes are MEASURED on graphl-flow 0.2 (15px/1.6 Plex Mono, 9.0px advance, 24px rows):
//   EDITOR_W  80 columns — PEP 8's limit — × 9.0px, plus the 49px line-number gutter, the line's 16px
//             right padding and the 1px border each side: 720 + 49 + 16 + 2 = 787
//   EDITOR_H  EDITOR_ROWS rows of 24px plus CHROME (33px tab bar, 8px body padding top and bottom, the
//             borders): 23 × 24 + 51 = 603
//   TERMINAL_ROWS  what the terminal's height holds. check-content fails a frame whose editor shows
//             more rows, or whose session has more lines, than its pane holds: a pane's FLOOR lets
//             content grow it, and a grown pane moves the whole template.
// The width is the frame's: explorer + editor + side, and the height follows from SCENE_ASPECT (the
// shell's — a section frame is the scene alone, 16:9), so the template fills the frame edge to edge.
// The side pane takes what is left: v2 puts the lesson's diagram there, so it is as wide as the
// 16:9 frame allows with an 80-column editor beside it.

const ROW = 24 // a code or terminal row
const CHROME = 51 // a code pane's tab bar, body padding and borders
export const EXPLORER_W = 280
export const EDITOR_COLS = 80
export const EDITOR_W = 787
export const EDITOR_ROWS = 23
export const EDITOR_H = EDITOR_ROWS * ROW + CHROME
export const SIDE_W = 649
const GAP = 10 // graphl-flow's GAP between siblings
export const FRAME_W = EXPLORER_W + EDITOR_W + SIDE_W + 2 * GAP
export const FRAME_H = Math.round(FRAME_W / SCENE_ASPECT)
export const TERMINAL_H = FRAME_H - GAP - EDITOR_H
export const TERMINAL_ROWS = Math.floor((TERMINAL_H - CHROME) / ROW)

export const trim = (text: string) => text.replace(/\n+$/, '')

/**
 * A spine session.txt as a terminal pane. graphl-flow draws `$ cmd` as a command and `! text` as an
 * error; the replay (scripts/spine.py) writes plain output, so a traceback is marked here: from its
 * header — `Traceback (most recent call last):`, or the `  File "…", line N` a SyntaxError starts
 * with — through the exception line that ends it.
 */
export function terminal(session: string): string {
  const out: string[] = []
  let inError = false
  for (const line of trim(session).split('\n')) {
    if (line.startsWith('$ ') || line.startsWith('>>> ') || line.startsWith('... ')) inError = false
    else if (!inError && (line === 'Traceback (most recent call last):' || /^ {2}File ".*", line \d+/.test(line))) inError = true
    if (inError) {
      out.push(`! ${line}`)
      if (/^[A-Za-z_][\w.]*(Error|Exception|Warning|Interrupt|Exit)\b/.test(line)) inError = false
    } else out.push(line)
  }
  return out.join('\n')
}

export interface Editor {
  /** The tab label — the file's path in the project. */
  file: string
  /** The file's text, imported from the spine with `?raw`. */
  code: string
  show?: [number, number][]
  highlight?: number[]
  lang?: Code['lang']
}

export interface IdeFrame {
  /** The explorer's heading: the project folder. */
  project?: string
  tree: TreeEntry[]
  editor: Editor
  /** The step's session.txt, raw — marked for the terminal pane by `terminal()`. */
  session: string
  /** The side pane: a diagram (check-content fails a side pane with no edge, plot or table). */
  side: SceneNode[]
  /** Edges between nodes INSIDE the side pane. An edge between panes would widen a gap and move them. */
  edges?: Edge[]
}

// Fixed ids: a section's `focus` can name `editor.L12`, `terminal`, or any id in the side pane.
export const IDE_IDS = { explorer: 'explorer', editor: 'editor', terminal: 'terminal', side: 'side' } as const

export function ideFrame({ project = 'roastery-etl', tree, editor, session, side, edges = [] }: IdeFrame): SceneModel {
  const explorer: Tree = { type: 'tree', id: IDE_IDS.explorer, title: project, entries: tree, fill: true, minW: EXPLORER_W }
  const code: Code = {
    type: 'code', id: IDE_IDS.editor, filename: editor.file, lang: editor.lang ?? 'python', code: trim(editor.code),
    show: editor.show, highlight: editor.highlight, tone: 'ingest', fill: true, minW: EDITOR_W, minH: EDITOR_H,
  }
  const term: Code = {
    type: 'code', id: IDE_IDS.terminal, terminal: true, filename: `terminal — ${project}`, code: terminal(session),
    fill: true, minW: EDITOR_W, minH: TERMINAL_H,
  }
  const pane: Group = { type: 'group', id: IDE_IDS.side, bare: true, w: SIDE_W, minH: FRAME_H, children: side }
  return {
    dir: 'row',
    nodes: [explorer, { type: 'group', id: 'workbench', bare: true, children: [code, term] }, pane],
    edges,
  }
}
