# CLAUDE.md — python-ct

> The workspace-level `CLAUDE.md` (one level up, in `graphl-workspace`) holds the invariants that
> span every repo. This file is only what is true *here*.

## What this repo is

A GraphL concept app for **Python — From Programming Foundations to Advanced Application**, a
beginner course on Python 3.14. One concept, 11 courses (one per chapter), 86 sections. A **section** is
`(scene, slide, narration)` and is one segment of the course video. One section = one slide.

`PYTHON-COURSE-PLAN.md` is the source of truth for scope, audience, teaching method, section titles,
worked illustrations, outcomes and bridges. Author from it; do not drift from its section lists.

The render engine is `@graphlearning/flow`; the app shell is `@graphlearning/shell`. Both are
**published packages pinned by version**. This repo's own surface is `src/content/`, `src/scenes/`,
`src/main.tsx` and `src/theme.css` — nothing else.

## Route contract

`#/` is the catalog. A section is `#/<courseId>-<sectionId>`, e.g. `#/foundations-names-objects-and-types`.
`?capture=1` and `window.__scene.plan()` are the recorders' hooks and come from the shell.

## Course arc and status

Chapters are authored one at a time, each reviewed by the owner on its rendered routes before the
next begins. A course is registered in `src/content/index.ts` / `src/scenes/index.ts` only once authored.

| # | Course id | Chapter | Sections | Status |
| --- | --- | --- | --- | --- |
| 1 | `foundations` | Programs, Values, and Execution | 6 | authored, awaiting owner review (no narration audio yet) |
| 2 | `collections` | Collections and Data Transformation | 9 | not started |
| 3 | `control-flow` | Decisions, Loops, and Problem Decomposition | 7 | not started |
| 4 | `functions` | Functions, Scope, and Contracts | 9 | not started |
| 5 | `files-errors` | Files, Structured Data, and Failure Handling | 10 | not started |
| 6 | `modules` | Modules, Environments, and Dependencies | 6 | not started |
| 7 | `classes` | Classes and Domain Modelling | 8 | not started |
| 8 | `data-model` | Iteration, Context, and the Python Data Model | 9 | not started |
| 9 | `composition` | Functions as Objects and Advanced Composition | 6 | not started |
| 10 | `concurrency` | Concurrency and Execution Trade-offs | 8 | not started |
| 11 | `quality-packaging` | Reliable, Efficient, and Distributable Programs | 8 | not started |

Source layout per course: `src/content/<course>/NN-<section-id>.ts` plus `index.ts`;
`src/scenes/<course>/` plus `index.ts` exporting `<course>Scenes`; `public/audio/<course>/`.

## Authoring conventions

- Teaching method per section: objective → mental model → annotated code and expected result →
  failure/alternative contrast → summary → bridge. Explain a term before relying on it.
- Python version claims are pinned to **3.14**; label CPython-specific behaviour and GIL-enabled
  versus free-threaded builds. Never present a version-specific fact as a language guarantee.
- Slides are terse; narration is flowing prose. Code shown must be correct Python 3.14 with the
  stated expected output.

## Invariants — do not break


- **Never write `x` or `y`.** Scenes are declarative: nodes, edges, nesting. `computeLayout` is not
  exported, so there is no way around this, and that is the point — reproducible frames.
- **Do not reimplement the shell.** `SectionView`, `CourseIndex`, `SlidePanel` and the hooks are
  withheld on purpose. The route contract (`#/<courseId>-<sectionId>`, `?capture=1`,
  `window.__scene.plan()`) is what every recorder drives, and it holds only if every repo composes
  the pieces identically.
- **`SiteHeader` goes on the catalog page only** — never on a section. A section is a video frame.
- **Three stylesheets, in cascade order**, imported in `main.tsx`. The order is load-bearing:
  1. `@graphlearning/flow/styles.css` — react-flow plus the IBM Plex faces the engine is
     *calibrated* to. `codeMetrics` sizes code nodes from a measured 9.02px glyph advance, so a
     different monospace face mis-sizes every code card. Carries the `.tok-*` colours.
  2. `@graphlearning/shell/styles.css` — the shell paints the canvas (`--bg: #1a1d23`; SceneView
     draws its dots at `#2a2f38` assuming a dark surface).
  3. `./theme.css` — this repo's three brand tokens. **Last, or the brand loses to the defaults.**
- **`file:../ui-flow` / `file:../ui-shell` must never be committed.** Local engine work only; CI has
  no sibling checkout.
- **Narration is never hand-produced.** `.tts` → `.wav` via Colab + Chatterbox only.

## Layout rules the frames actually care about

`npm run check` (`scripts/check-content.mjs`) models four silent failures — each builds green and
breaks only on screen. Its comments carry the measured constants; the short version:

- **Leaf cards are a fixed 210×96** with a ~134px text column. Only containers grow to fit. Keep the
  `label` to 2 wrapped lines; 2 label lines + 2 sub lines fits. Watch unbreakable tokens — `_`, `.`
  and `/` are **not** break opportunities in CSS, so `snake_case` and paths overflow sideways in a
  way the height model cannot see.
- **Slides do not scale to fit.** Type size is fixed by the frame (`zoom = paneWidth / 806`,
  width-proportional only), so an over-long slide **clips at the bottom** with no error. Budget
  ~1000 design px of modelled height. Bullets cost far more than prose of the same length.
- **A `focus:` that names no node in its scene is a silent no-op** — nothing lights up.
- **`icon:` names are NOT guarded.** The engine's lucide registry is `Record<string, LucideIcon>`
  and does not enumerate its keys, so a wrong name type-checks, passes `check`, builds, and renders
  a card with no glyph. There are ~75 valid keys; copy one off an existing scene rather than
  guessing a lucide name (`volume`, `move`, `maximize` and `git` are all absent, for instance).
- **A section with no wav narrates silence** and records a silent segment. Audio resolves purely by
  convention: `public/audio/<course>/<section-id>.wav`.

What `check` does *not* model: an edge label landing on top of a card. Look at the route.

## Guards before handing over

```sh
npm run build && npx tsc --noEmit && npm run check
```

All three are a **floor, not proof** — they pass on frames that are visually wrong. The rendered
route is the real bar, and the owner reviews it.

## Working agreement

- **Author the whole unit, then hand over the route.** Scenes, slides and narration together.
- **No ASCII sketches of scenes.** A sketch cannot show what the layout engine will do, which is the
  only thing worth looking at.
- **No silent scaffolding**, no work outside the ask. Say plainly what was built, what was verified,
  and what was left out.
