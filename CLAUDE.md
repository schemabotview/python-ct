# CLAUDE.md — python-ct

> The workspace-level `CLAUDE.md` (one level up, in `graphl-workspace`) holds the invariants that
> span every repo. This file is only what is true *here*.

## What this repo is

A GraphL concept app for **Python — from first program to production**: one course path from
absolute beginner to working professional, built around one application, `roastery-etl` (a coffee
roastery's order pipeline), shown in real, executed code. A **section** is `(scene, narration)` —
one full-screen 16:9 frame and one segment of the course video. Sections are scene-only.

`PYTHON-COURSE-PLAN.md` (v2) is the source of truth for the courses, every section, the spine's
growth and the diagram each section's side pane carries. Author from it; do not drift from it.

The render engine is `@graphlearning/graphl-flow` (^0.2.0); the app shell is `@graphlearning/shell`
(^1.0.0). Both are published packages pinned by version. This repo's own surface is `src/content/`,
`src/scenes/`, `spine/`, `src/main.tsx` and `src/theme.css`.

## Status

**v2 re-authoring, 2026-10-26.** v1 (12 courses, 90 sections on `@graphlearning/flow` + shell 0.14,
Python 3.14) was removed whole — content, scenes, spine and wavs; it is in git history before the
v2 infra commit. Done: the plan (approved), the **infra step** (Python 3.15.1, graphl-flow + shell
1.0, the IDE template, the pipeline map, the cumulative spine check, the v2 checks) and the **pilot**,
Course 2 `start` — authored, replayed, rendered and captured, awaiting the owner's review. The
infra step's temporary template course is gone.

`pipelineMap` is registered as scene `pipeline-map` with no section yet: picture §5 will use it.

| # | Course id | Course | Sections | Status |
| --- | --- | --- | --- | --- |
| 1 | `picture` | The picture: why Python, and how it runs your code | 11 | authored, awaiting owner review; no audio yet |
| 2 | `start` | Start the project | 5 | pilot authored, awaiting owner review; no audio yet |
| 3 | `hold` | Hold the data | 9 | authored, awaiting owner review; no audio yet |
| 4 | `process` | Process the data | 11 | not started |
| 5 | `extract` | Read the data | 7 | not started |
| 6 | `transform` | Transform and aggregate | 7 | not started |
| 7 | `load` | Write the results | 6 | not started |
| 8 | `structure` | Structure the pipeline | 5 | not started |
| 9 | `model` | Model the domain | 10 | not started |
| 10 | `trust` | Make it trustworthy | 7 | not started |
| 11 | `speed` | Make it fast | 7 | not started |
| 12 | `ship` | Ship it | 6 | not started |

Each course is authored, replayed, rendered and captured, then the owner reviews its routes before
the next begins. Narration audio comes after a course's frames are approved.

## Route contract

`#/` is the catalog. A section is `#/<courseId>-<sectionId>`. `?capture=1` and
`window.__scene.plan()` are the recorders' hooks and come from the shell.

## Python: 3.15.1, and every output is run

Every banner, traceback, timing and printed value in the course is produced on **CPython 3.15.1**
(x86-64), and `3.15.1t` (free-threaded) where threads are measured. 3.15.0 shipped 2026-10-09;
3.15.2 (2026-10-25) had no python-build-standalone build yet when this was set up, so 3.15.1 is the
pin — move it deliberately, and re-replay the whole spine when you do.

Install: `uv python install 3.15.1 3.15.1+freethreaded --install-dir <dir>` with a uv new enough to
list them (0.13.5 does; 0.11.32 stopped at 3.15.0b4), copy each tree into `/usr/local`, and link
`/usr/local/bin/python` → `python3.15`, so a venv's `pyvenv.cfg` reads `home = /usr/local/bin` as on a
learner's machine. uv also links `python3.15` into `~/.local/bin`, AHEAD of `/usr/local/bin` on PATH —
delete those links (a replay once wrote a scratch path into pyvenv.cfg through one). `scripts/spine.py`
refuses to run unless `python`, `python3.15` and `python3.15t` are all 3.15.1 from `/usr/local`.

Verified on 3.15.1 at setup, so a section may rely on them: UTF-8 mode on by default (PEP 686),
`frozendict` (item assignment raises `TypeError`), `sentinel('MISSING')`, unpacking in
comprehensions (`[*xs for xs in …]`), `lazy import` (the module is not in `sys.modules` until first
use), and `sys._is_gil_enabled()` False on `python3.15t`. Anything else about 3.15 is run before it is
written down.

- **Timings, races and profiles are not deterministic.** Round them, tie them to the build they were
  measured on, make no universal speed-up claim. Unmeasured free-threaded behaviour is labelled
  documentation.
- CPython-specific behaviour (refcounts, `id()` as an address, the GIL) is labelled CPython.

## The spine: cumulative, executed, checked

`spine/<course>/<NN-step>/` holds `project/` (a snapshot of `roastery-etl/` at that step),
`session.txt` (the terminal transcript) and `step.json`. Scenes import these files with Vite's `?raw`,
so a frame can only show what was replayed. `npm run check:spine` (`scripts/spine.py`) replays every
step in a fresh copy — one bash per step so `cd` and `activate` carry over, REPL and pdb lines typed
into a real pty — and fails on any difference; `--write` regenerates the transcripts. Paths are
normalised to `/home/ana/roastery-etl`.

**The chain is checked, not trusted.** Every `step.json` has exactly one of:

- `"first": true` — starts the chain (2.1, an empty folder);
- `"from": "<course>/<step>"` + `"changes": [paths]` — the previous step plus exactly these
  changes. A file that differs from the parent but is not listed FAILS; a listed path that did not
  change fails too, so `changes` is the section's real diff. A directory entry covers everything
  under it. A failure branch (run the wrong version, then the fix) is two steps with the same `from`;
- `"lab": true` — a standalone lab outside the chain (Course 1 only: the project does not exist yet).

This is what v1 lacked: its Courses 4–5 rewrote one `main.py` from scratch every step. **Experiments
go in the REPL** (in the session), never into `main.py`; `main.py` only gains pipeline code.

Other `step.json` keys: `venv`, `start: "home"`, `capture`, `project`, `volatile` (digits masked),
`setup` — documented in `scripts/spine.py`. From Course 8 on, steps `pip install` pinned dev tools,
so the replay needs network access.

## Frames

### The IDE template (`src/scenes/ide.ts`)

ONE fixed frame for every IDE section: explorer (280) | editor (787 × 603) over terminal (364) |
side pane (649, fixed). Measured on graphl-flow 0.2: 15px/1.6 Plex Mono, a 9.0px advance and 24px
rows, so the editor is **80 columns × 23 rows** (PEP 8's limit) and the terminal **13 lines**. The
frame is 1736 × 977 — 16:9, derived from the shell's `SCENE_ASPECT` — and the fit is 2.03×, so code
is ~30px in the 4K frame. Fixed ids: `explorer`, `editor`, `terminal`, `side`, so a `focus` can
name `editor.L12` or any side-pane id.

- **Panes have floors, so content can grow them**, and a grown pane moves the whole template. So
  check-content fails an editor showing more than 23 rows (fold with `show`), a line wider than 80
  columns, or a session longer than 13 lines — with a message naming the pane — and check-render
  fails any IDE frame not on the same fit and pane pixels as the others.
- **No edge between panes**: it widens the gap it crosses and moves every pane (confirmed: one
  cross-pane edge shifted the editor 22px). The editor points with `highlight`; edges live INSIDE
  the side pane.
- `terminal()` marks a traceback (from `Traceback (most recent call last):`, or the `  File "…"` a
  SyntaxError starts with, through the exception line) with graphl-flow's `! ` error prefix, so
  errors read red while `session.txt` stays the raw replay.
- Two versions of a file are two sections, never two editors in one frame.

### The side pane is a diagram

The v1 gap the owner named: side panes were 79 bullet lists and one edge in 90 sections, a few cards
at the top of an empty column. In v2 every IDE side pane carries a diagram — memory (names table →
object tables, edges from rows), stack, flow, class, plot, or result table (PYTHON-COURSE-PLAN.md
lists which per section). Enforced:

- check-content: a side pane with no edge, plot or table fails; a bulleted card there is a caption
  (≤ 3 bullets).
- check-render: the side pane's content must span ≥ 2/3 of its height (`SIDE_FILL`). Fill it with
  content — another state of the diagram, the REPL answers as a table — not with spacing.

Authoring notes from the template frames:

- graphl-flow has **no obstacle avoidance**. Lay a pointer's target BESIDE its row; an arrow that
  must pass a third card will cross it (check-render fails it). Before/after states are separate
  small diagrams, not one tangle.
- An edge into a node inside a titled group crosses the group's heading — edge to the GROUP
  (check-render fails a heading crossing). The pipeline map feeds `stages`, not `extract`.
- A toned item only recolours its icon; a group that sets its OWN tone draws a tinted, bordered box.
  Use that to light something.
- A stacked item (`stack: true`) centres its bullets' text but not their markers: keep bulleted
  cards icon-left.
- **Never converge three or more arrows on one node across one gap.** The channel slots share the
  32px gap, the last run shrinks below graphl-flow's 6px HEAD_TRIM, and the arrowhead FLIPS (0.2 bug,
  raised with the owner; check-render fails it). A breakdown of parts is a table, not a fan-in.
- There is no error glyph in graphl-flow's icon set: `shield` draws a TICK, so an error card uses
  `bell`.
- Table rows are addressable as `<table>.<row>` when the first cell is a plain word; give a row an
  `id` when it is not (`"ETH-250"`).
- An `icon` key graphl-flow does not know draws NOTHING, silently — check-render fails it. Valid keys
  are graphl-flow's `src/icons.tsx` (lucide `file`, `memory`, `workflow`…, brands `python`, `git`…).

### The pipeline map (`src/scenes/map.ts`)

`pipelineMap` is the full concept scene (sources → five stages, each with its course and the Python
it is built from → outputs, Part II as a rail), shown in picture §5, load §6 and ship §5. It is NOT a
side-pane column in each course's first section (owner's call, 2026-10-26): every side pane carries
its own section's diagram.

## Checks — before handing over

```sh
npm run build && npx tsc --noEmit && npm run check   # check = check-content + check-render
npm run check:spine                                   # Python 3.15.1 as `python`
npm run shots -- <slug or course>                     # 4K PNGs in out/shots/ — then LOOK
```

Both checks read the real registries (`scripts/registry.mjs` bundles `src/content` + `src/scenes`
with esbuild, `?raw` included) — never regexes over source.

- **check-content**: scene-only, narrated, scene registered; unique node ids; the side-pane diagram
  rule; IDE edges inside the side pane; pane capacity; every wav once a course has audio.
- **check-render** (playwright, 3840×2160 at deviceScaleFactor 1, `?capture=1`, waits for
  `.gf-scene[data-fit="ready"]`): console/page errors; fit moving after ready; content outside the
  frame; text leaving its node; overflow; plot text clipped; body text < 24px or item icons < 32px
  at 4K; edges off-face / not orthogonal / < 24px / crossing a node or a heading / labels colliding;
  icons that drew nothing; a `focus` that marked nothing; IDE same-fit and same-pane-pixels; side
  pane fill. graphl-flow's own check, ported, plus this repo's rules.
- Each check loads every section in a FRESH page. ui-shell 1.0.0 rendered `<Scene>` without a `key`,
  so hash navigation reused one Scene: the new scene was measured under the previous one's fit (a
  sub-pixel drift that failed the face check) and `data-fit` read `ready` before it settled. Fixed in
  shell 1.0.1 (keyed by scene id); the fresh page stays so a check never depends on it.

All are a **floor, not proof**: the first map passed every check with an arrow through a heading.
When a capture shows a defect a check missed, add the assertion and confirm it FAILS on the old
frame before trusting it (done for the heading crossing, the crossing arrow, unknown icons, focus
misses, cross-pane edges, list-only side panes and the flipped arrowhead).

## Authoring conventions

- Teaching method per section: objective → mental model (the side pane) → the code and its real
  result → failure or alternative → bridge. Explain a term before relying on it.
- **One step per section**; every IDE section is a spine step. Failure is taught: run the wrong
  version (its own step), show the real traceback, then fix it.
- **Author wide, fill the frame with content.** A concept scene is fitted to 16:9: a flat strip
  wastes the frame (the map's first build was 4:1, two thirds empty) — stack rows.
- **One idea per frame.** Reuse a scene with a different `focus` to walk a big picture.
- Narration is flowing prose, never reads code line by line, and may refer to the side pane's
  diagram by what it shows ("the arrow from alias").

## Invariants — do not break

- **Never write `x` or `y`.** Scenes are declarative; graphl-flow exports no layout.
- **Do not reimplement the shell.** The route contract holds only if every repo composes it
  identically.
- **`SiteHeader` goes on the catalog page only** — never on a section.
- **Three stylesheets, in cascade order**, imported in `main.tsx`: graphl-flow's `styles.css` (node
  styles, IBM Plex Sans and Mono), the shell's (`--bg`, which graphl-flow's theme matches), then
  `./theme.css` (`--brand`) LAST, or the brand loses.
- **`file:` installs of the engine or the shell must never be committed.** CI has no sibling checkout.
- **Narration is never hand-produced.** `.tts` → `.wav` via Colab + Chatterbox only. Chatterbox is
  not deterministic: re-generate only sections whose narration changed.
- Audio resolves by convention: `public/audio/<course>/<section-id>.wav`. A section with no wav
  records silence.

## Working agreement

- **Author the whole unit, then hand over the route.** Scenes, spine and narration together.
- **No ASCII sketches of scenes.** Render it and look.
- **No silent scaffolding**, no work outside the ask. Say plainly what was built, what was verified,
  and what was left out.
