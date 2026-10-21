# python-ct

**Python — from first program to production.** A GraphL concept app: one path from absolute
beginner to working professional, built around one spine application (`roastery`). Each section is a
`(scene, narration)` pair — one full-screen frame — that is one segment of the course video. Built
from `content-repo-template`. The content was reset on 2026-10-21; the new plan is at outline stage.

Scope, audience, teaching method and every section title are in [`PYTHON-COURSE-PLAN.md`](PYTHON-COURSE-PLAN.md).
Authoring status per chapter is tracked in [`CLAUDE.md`](CLAUDE.md).

## Run it

```sh
npm install
npm run dev          # http://localhost:5173  ·  routes are #/<course>-<section>
```

## Verify a change

```sh
npm run build && npx tsc --noEmit && npm run check
```

These are a floor, not proof — open the section's route in the browser.

## Layout

```
src/content/<course>/    one file per section + the course index
src/scenes/<course>/     declarative scenes (nodes, edges, nesting — never x/y)
src/theme.css            --brand / --brand-hover / --accent-2
public/audio/<course>/   narration wavs (Colab + Chatterbox only)
scripts/                 check-content, concept.json, titles.json
```
