# CLAUDE.md — python-ct

> The workspace-level `CLAUDE.md` (one level up, in `graphl-workspace`) holds the invariants that
> span every repo. This file is only what is true *here*.

## What this repo is

A GraphL concept app for **Python — from first program to production**: one course path from
absolute beginner to working professional, built around one spine application (`roastery`, a coffee
roastery's order service) shown in real code. A **section** is `(scene, narration)` — one full-screen
frame and one segment of the course video. Sections are **scene-only** (no `slide`): the frame
carries the code, its result and the mental model side by side.

`PYTHON-COURSE-PLAN.md` is the source of truth for scope, audience, courses, sections and the spine.
Author from it; do not drift from its section lists.

The render engine is `@graphlearning/flow`; the app shell is `@graphlearning/shell`. Both are
**published packages pinned by version** (flow ^2.0.0, shell ^0.12.0). This repo's own surface is
`src/content/`, `src/scenes/`, `src/main.tsx` and `src/theme.css` — nothing else.

## Route contract

`#/` is the catalog. A section is `#/<courseId>-<sectionId>`, e.g. `#/how-python-runs-names-point-to-objects`.
`?capture=1` and `window.__scene.plan()` are the recorders' hooks and come from the shell.

## Course arc and status

**Reset on 2026-10-21** and restarted from `PYTHON-COURSE-PLAN.md`: 12 courses, 89 sections, built
around one ETL pipeline (`roastery-etl`); courses are named by what we build. Concept frames for
Courses 1–2, IDE frames (`@graphlearning/flow` ^2.1.0: tree, terminal, folded code) from Course 3.

| # | Course id | Course | Sections | Status |
| --- | --- | --- | --- | --- |
| 1 | `why-python` | Why Python | 5 | authored, awaiting owner review (no narration audio yet) |
| 2 | `how-python-runs` | How Python runs your code | 9 | authored, awaiting owner review (no narration audio yet) |
| 3–12 | | see the plan | 75 | not started |

Every number on a Course 1 frame was produced here on CPython 3.13 (x86-64, 4 CPUs): the
`import this` text, the `timeit` pair, and the sample day's report. History dates and the 3.11
speed-up are from the CPython docs and PEPs, not measured.

Course 2's code and terminal panes are the scripts in `demos/how-python-runs/`, run on CPython 3.13
(GIL build): tokens, AST, `dis` output, `__pycache__`, `inspect.stack()`, ids, ref counts, the
traceback. Bytecode is version-specific and ids and timings change every run; the GIL timing varies
0.89–1.11 s either way across runs, so the narration claims only "no real speed-up". The
free-threaded build was not available and is described, not measured.

Source layout per course: `src/content/<course>/NN-<section-id>.ts` plus `index.ts`;
`src/scenes/<course>/` plus `index.ts` exporting `<course>Scenes`; `public/audio/<course>/`.

## Verification notes (read before trusting a number)

- **Every code snippet and printed output is run before it is written down**, on the pinned Python
  version. If that version is not installed, say which one the code was run on — never present an
  unrun output.
- **Timings, races and profiles are not deterministic.** Round them, tie them to the build they were
  measured on, and make no universal speedup claim. Free-threaded behaviour that was not measured is
  labelled as documentation, not measurement.
- **No narration audio exists.** `.wav` files come only from the Colab + Chatterbox pass.

## Authoring conventions

- Teaching method per section: objective → mental model → annotated code and its real result →
  failure/alternative contrast → bridge. Explain a term before relying on it.
- Python version claims are pinned to the **current stable release at authoring time** (decided in
  `PYTHON-COURSE-PLAN.md`); label CPython-specific behaviour and GIL-enabled versus free-threaded
  builds. Never present a version-specific fact as a language guarantee.
- **Author wide, not tall.** A section has the whole 16:9 frame, but a scene is fitted to it, so a
  tall stack is height-limited and gains nothing from the width. Lay frames out left to right
  (code → result → model) with `flow: 'LR'` or columns.
- **Fill the frame with content, not spacing.** Scenes show real detail — the actual code, outputs
  and worked failures — rather than bare labels. What a slide used to say goes into tables, lists,
  pills and notes in the scene, or into the narration.
- **One idea per frame.** To walk a big picture, reuse one scene across consecutive sections with a
  different `focus` each.
- Narration is flowing prose and never reads code aloud line by line. Code shown must run on the
  pinned version with exactly the output shown.

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

`npm run check` (`check-content.mjs` + `check-render.mjs`) catches silent failures — each builds green and
breaks only on screen. Its comments carry the measured constants; the short version:

- **Text that leaves its node is caught by rendering, not modelling.** The old 210×96 leaf and
  slide-height models were removed with Course 1: under flow 2.x cards grow to fit their text.
  `check-render.mjs` measures the real frame instead. Unbreakable tokens are still the thing to
  watch — `_`, `.` and `/` are **not** break opportunities in CSS.
- **A `focus:` that names no node in its scene is a silent no-op** — nothing lights up.
- **`icon:` names are NOT guarded.** A wrong name type-checks, passes `check`, builds, and renders
  the pattern's default glyph. The engine's `icon-gallery` fixture lists every valid key (AWS, Azure,
  brand marks such as `python`, `git`, `github`, `docker`, and ~75 lucide glyphs). Avoid `monitor`
  and `users`: Azure tiles shadow those lucide names.
- **A section with no wav narrates silence** and records a silent segment. Audio resolves purely by
  convention: `public/audio/<course>/<section-id>.wav`.

What `check` does *not* model: an edge label landing on top of a card. Look at the route.

## Guards before handing over

```sh
npm run build && npx tsc --noEmit && npm run check
```

`check` is two scripts: `check-content.mjs` (scene-only, narration, `focus`, wavs) and
`check-render.mjs`, which boots vite and measures every section at 3840×2160 under `?capture=1` for
text leaving its node. All three are a **floor, not proof** — they pass on frames that are visually wrong. The rendered
route is the real bar, and the owner reviews it.

## Working agreement

- **Author the whole unit, then hand over the route.** Scenes and narration together.
- **No ASCII sketches of scenes.** A sketch cannot show what the layout engine will do, which is the
  only thing worth looking at.
- **No silent scaffolding**, no work outside the ask. Say plainly what was built, what was verified,
  and what was left out.
