# python-ct

**Python — from first program to production.** A GraphL concept app: one path from absolute
beginner to working professional, built around one application, `roastery-etl` — a coffee
roastery's order pipeline, built from an empty folder to a scheduled, tested, packaged job. Each
section is a `(scene, narration)` pair — one full-screen frame — that is one segment of the course
video. Scenes render with `@graphlearning/graphl-flow`; the app shell is `@graphlearning/shell`.

**v2 is being authored** (re-authoring began 2026-10-26): 12 courses, 91 sections, on Python 3.15.
Scope, the spine's growth, the side-pane diagram for every section and the build order are in
[`PYTHON-COURSE-PLAN.md`](PYTHON-COURSE-PLAN.md); status per course is in [`CLAUDE.md`](CLAUDE.md).

## Run it

```sh
npm install
npm run dev          # http://localhost:5173  ·  routes are #/<course>-<section>
```

## Verify a change

```sh
npm run build && npx tsc --noEmit && npm run check   # check: content + 4K render
npm run check:spine                                   # needs Python 3.15.1 first on PATH as `python`
```

These are a floor, not proof — capture the section at 4K and look at it.

## Layout

```
src/content/<course>/    one file per section + the course index
src/scenes/<course>/     declarative scenes (groups, items, tables, code, plots — never x/y)
src/scenes/ide.ts        the one IDE frame template every IDE section uses
src/scenes/map.ts        the pipeline map: the full scene and the side-pane column
spine/<course>/<step>/   roastery-etl as real files, one cumulative snapshot per step
src/theme.css            --brand
public/audio/<course>/   narration wavs (Colab + Chatterbox only)
scripts/                 spine.py, check-content, check-render, registry, concept.json, titles.json
```
