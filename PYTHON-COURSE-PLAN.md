# Python — from first program to production (v2)

**Status: v2 plan, awaiting owner review (2026-10-26).** Nothing is authored against it yet. v1 (12
courses, 90 sections, narrated and rendered on `@graphlearning/flow` + shell 0.14) is replaced
whole: every course is re-authored, every narration rewritten, every wav regenerated.

## Why v2

Three gaps in v1, each measured in the repo before this plan was written:

1. **The right-hand pane was text.** Across 90 sections the side panes held 79 bullet lists, 61
   tables and 26 notes; ONE scene in the whole course drew an edge. Sections whose subject *is* a
   picture (names → objects, aliasing, the call stack, a generator's suspended frame, LEGB) showed it
   as a list. v2 is built on `@graphlearning/graphl-flow`, where a table row is an edge endpoint and a
   compact plot fits a side pane, and **every IDE section's side pane carries a diagram** (below).
2. **The spine was a scratch file for half the course.** In Courses 4–5 of v1 every one of 21 steps
   is a single `main.py` rewritten from scratch, full of demo lines (`print(Decimal(9.95))`); the
   project tree only appears in Course 6, and even the finished snapshot had lost its `data/out/`
   and most of its tests. A learner never saw one application grow. v2's spine is **cumulative and
   checked**: every step is the previous step plus one declared change.
3. **Object-oriented programming was four sections.** The finished pipeline had two dataclasses and
   two exception classes — no inheritance, no protocol, no polymorphism, no composition. v2 gives OOP
   its own course, built where the pipeline needs it.

And the course was padded: the GIL was taught twice (v1 2.8, 11.5), generators and itertools three
times, the finished tree toured twice, packaging split across two courses. v2 teaches each once.

## The idea (unchanged)

The course builds **one application — a data pipeline — from an empty folder to a scheduled,
tested, packaged job**, and every Python feature is taught at the moment the pipeline first needs it.
Courses are named by what we build:

> *The picture → start the project → hold the data → process it → read it → transform it → write
> it → structure it → model it → trust it → speed it up → ship it.*

| Part | Courses | For | Leaves you able to |
| --- | --- | --- | --- |
| 0 — The picture | 1 | everyone | say why Python exists and what happens when it runs your code |
| I — Build it | 2–7 | someone who has never programmed | write a working ETL script, from raw files to a database |
| II — Make it real | 8–12 | someone who can write a script | structure, model, test, speed up and ship it like a professional |

**12 courses, 91 sections.** Each course is one video of roughly 9–18 minutes (5–11 sections of
90–150 s). Denser courses were considered and rejected: a course is both a video and the owner's
review unit, and a 30-minute chapter is worse at both.

## Python version: 3.15

**Python 3.15.0 shipped on 2026-10-09; 3.15.2 (2026-10-25) is current.** The course is pinned to
**CPython 3.15.1** (and `3.15.1t`, the free-threaded build, where threads are measured): 3.15.2 had no
python-build-standalone build when the infra step ran, and the pin moves only deliberately, with a
full re-replay of the spine. `scripts/spine.py` refuses any other interpreter.

3.15 features the course uses — **each run on 3.15.1 in the infra step** (UTF-8 mode on by default,
`frozendict` refusing item assignment, `sentinel`, unpacking in comprehensions, `lazy import`
deferring the load, the GIL off on `3.15t`); what a section says about them is still run first:

| Feature | Where |
| --- | --- |
| UTF-8 as the default text encoding (PEP 686) | 5.2 — `open()` without `encoding=` is now UTF-8 everywhere; the Latin-1 file still fails, and why |
| `frozendict` built-in | 3.8 — the catalogue cannot be changed by accident |
| `sentinel` built-in | 3.4 — "no discount code" is not the same as `None` |
| Unpacking in comprehensions (PEP 798) | 4.6 — flattening order lines |
| Lazy imports (PEP 810) | 8.1 — what `import` executes, and how to defer it |
| Free-threaded build | 11.5 — measured on both builds, claims limited to what re-runs |

Anything not re-verified is labelled documentation, not measurement. CPython-specific behaviour
(refcounts, `id()` as an address, the GIL) is labelled CPython.

## The spine: `roastery-etl`

A small coffee roastery's shop writes one CSV of order lines per day. The pipeline **extracts** those
files and the product catalogue, **validates** every row (keeping the good, reporting the bad),
**transforms** them into priced order lines, **aggregates** revenue by product, day and customer,
and **loads** the result into a SQLite warehouse, a CSV report and a JSON summary.

The data is v1's, kept: `order_id,date,customer,sku,quantity` rows (an order with two products is two
rows sharing an `order_id`), a catalogue of four coffees (`ETH-250` 9.95, `COL-500` 17.50,
`KEN-1000` 31.00, `BRA-500` 16.25), a month of October 2026 files, and real bad rows — `three` for a
quantity, an unknown SKU, a negative quantity, a missing customer, and one file saved as Latin-1.
Discounts: 15 % wholesale at 10+ bags of one line, else 5 % on a line of 50.00 or more. Money is a
`Decimal` from the moment it appears, then a `Money` object (Course 9).

### The finished project

```
roastery-etl/
  .venv/                         the project's own Python                     (2)
  pyproject.toml                 project, dev tools, the command              (8 → 12)
  main.py                        the script a beginner runs                   (2 → 7, then a shim)
  data/
    raw/orders-2026-10-DD.csv    one file per day, written by the shop        (5)
    raw/catalogue.json           products and prices                          (5)
    out/daily_report.csv         the report                                   (7)
    out/summary.json             the machine-readable summary                 (7)
    out/warehouse.db             the SQLite warehouse                         (7)
  pipeline/
    __init__.py                                                               (8)
    models.py                    Product, LineItem, Order                     (9)
    money.py                     Money — a value object                       (9)
    rules.py                     DiscountRule and its three rules             (9)
    errors.py                    PipelineError → InvalidRow, UnknownProduct   (9)
    sources.py                   Source protocol: CsvDays, Catalogue, Api     (9, 11)
    sinks.py                     Sink protocol: CsvReport, JsonSummary, Sqlite (9)
    transform.py                 pricing and aggregation                      (4, 6 → 9)
    pipeline.py                  Pipeline — sources, rules, sinks, composed   (9)
    log.py, decorators.py        logging setup, @retry, @timed                (10)
    cli.py, config.py            the command and its settings                 (12)
  tests/                         the pytest suite                             (10 →)
  bench/                         measurements, never imported by the job      (11)
  deploy/run.sh                  the cron wrapper                             (12)
```

### How the spine grows — the rules

- **Cumulative.** `spine/<course>/<NN-step>/step.json` names the step it continues from (`from`) and
  the files it changes (`changes`). `npm run check:spine` replays every step and ALSO fails when a
  file the step does not declare differs from the previous step's. Nothing written for the pipeline
  is ever thrown away silently; a removal is a declared change, and the section shows it.
- **Experiments go in the REPL, not in `main.py`.** `0.1 + 0.2`, slicing, `is` versus `==`, a
  `Counter` tried out — these are typed into the terminal pane (`python -q`, replayed in a real pty,
  as v1 already does). `main.py` only ever gains pipeline code.
- **One step per section, every section a step** (Course 1 aside). The editor shows the file the
  step changed, with the changed lines highlighted; the tree marks new files `NEW`.
- **Failure is taught, not hidden.** A section may run the wrong version first; the wrong version is
  its own step (`NNa-…`) so the traceback in the terminal is real.
- Course 1 is the one exception: its runnable frames are standalone labs in `spine/picture/`, not
  part of the chain, because the project does not exist yet. The chain starts empty at 2.1.
- Paths normalised to `/home/ana/roastery-etl`, as in v1. Dev tools (mypy, pytest, ruff) are pinned,
  so replay from Course 8 on needs network access, as in v1.

| After course | `main.py` / the project holds |
| --- | --- |
| 2 Start | a banner and one priced bag; the venv |
| 3 Hold | `CATALOGUE` (a `frozendict` of `Decimal` prices) and one day's `ORDERS`, in code |
| 4 Process | `price_line()`, the discount rules, validation that raises `InvalidOrder`, a day total |
| 5 Read | the hard-coded data is gone: real files, `read_day()`, `read_catalogue()`, a month as a generator |
| 6 Transform | `summarise_day()` — revenue by product, customer and day; top products |
| 7 Write | report CSV, summary JSON, SQLite warehouse; safe re-runs. A complete ETL script (~180 lines) |
| 8 Structure | the `pipeline/` package, type-checked; `main.py` shrinks to a shim; `pyproject.toml` |
| 9 Model | `Money`, `LineItem`, `Order`, rules, sources, sinks, `Pipeline` — the dicts are gone |
| 10 Trust | `tests/` (unit, parametrised, with fakes), logging, `@retry`/`@timed`, ruff clean |
| 11 Speed | profiled; set lookups; streaming memory; files in a process pool; the API source async |
| 12 Ship | `roastery-etl run --month 2026-10`, config from env/TOML, a wheel, a cron job |

## Frames

Every section is **one full-screen 16:9 frame and one narration** (90–150 s), no slide.

1. **Concept frame** — a diagram with no file: Course 1, the pipeline map, where next.
2. **IDE frame** — ONE fixed template, rebuilt on graphl-flow (its `ide-frame` study is this course's
   template): **explorer** | **editor** over **terminal** | **side pane**. Every pane has floors and
   the side pane is a fixed column (`w`), so every pane sits at the same pixels in every IDE section
   and the check asserts they all land on the same fit. Sizes are re-measured for graphl-flow in the
   infra step (15px Plex Mono; no `minCols`): the editor holds 80 columns (PEP 8) and the **side pane
   is made as wide as the 16:9 frame allows — target ≥ 600** — because v2 puts the lesson there.
   - A file under ~30 lines is shown whole; longer files show this section's lines, the rest folded
     to `··· N lines` with real line numbers.
   - No edge crosses between panes (it would widen a gap and move every pane). The editor points
     with `highlight`; edges live INSIDE the side pane.
   - Terminal: `$` lines are commands; traceback lines are marked `!` by `ide.ts` (from the raw
     `session.txt`) so errors read red without touching the replay.

### The side pane is a diagram

Every IDE section's side pane carries one of these, chosen for what the section teaches. A bullet
list may appear only as a short caption under the diagram, never as the pane's content.
`check-content` fails an IDE section whose side pane holds no edge, plot or table.

| Kind | Drawn as | Used for |
| --- | --- | --- |
| **Memory** | a names table, object tables, edges from rows to objects | binding, aliasing, copying, mutability, refcounts |
| **Stack** | frame tables, newest on top, edges into the heap | calls, arguments, scope, exceptions unwinding, generators |
| **Flow** | items and edges, left to right or top to bottom | control flow, data flow (rows → good / rejected), import graphs |
| **Class** | tables of fields/methods, inheritance and composition edges | Course 9 throughout |
| **Plot** | a compact plot (420×280) | timings, distributions, revenue over the month |
| **Result** | a table with tagged / toned rows | the report, the warehouse rows, a profile |

### The pipeline map

One concept scene: **sources** (day CSVs, catalogue, later the API) → **extract** → **validate** →
**transform** → **aggregate** → **load** → **sinks** (report, summary, warehouse). It is introduced in
1.5, 7.6 lights every stage, and 12.5 shows the finished classes on it. It is NOT repeated in the
side pane of every course's first section (owner's call, 2026-10-26: the course names already say
where we are), so every side pane carries that section's own diagram.

## The courses — 12 courses, 91 sections

Columns: **Step** is what changes in the spine (Course 1: the lab shown); **Side pane** is the diagram.

### Part 0 — The picture

**1. `picture` · The picture: why Python, and how it runs your code · 11 sections**

| # | Section | Frame / step | Side pane / diagram |
| --- | --- | --- | --- |
| 1 | What Python is, and where it runs | concept | Python at the centre, edges out to web, data, ML, automation, pipelines — with a real tool on each |
| 2 | Where it came from | concept | timeline, 1989 → 3.15 in three eras, condensed from v1 |
| 3 | The philosophy | lab: `import this` in the REPL | Flow: the same price rule written twice, readable vs clever, edges to "what a reader must hold" |
| 4 | Strengths and limits | lab: the `timeit` pair | Plot: loop vs `sum()` vs C-backed builtin; what Python is slow at, and why |
| 5 | What we will build | concept | **the pipeline map**, first appearance, each stage tagged with its course |
| 6 | What happens when you run `python main.py` | concept | source → tokens → AST → bytecode → VM → output, one edge per stage |
| 7 | Source to bytecode | lab: `dis`, `__pycache__` | Flow: the AST of `price * quantity` as a tree, beside its bytecode |
| 8 | The virtual machine | lab: `dis` of `line_total` | Stack: the value stack after each instruction |
| 9 | Frames and the call stack | lab: `inspect.stack()` | Stack: three frames, edges into the objects they hold |
| 10 | Names, objects and the heap | lab: `id()`, `is`, `==` | Memory: two names → one object; equal values, different identities |
| 11 | Reference counting and garbage collection | lab: `sys.getrefcount`, a cycle | Memory: counts on each object, a cycle the collector finds |

(The GIL moves to 11.5; reading a traceback moves to 2.4–2.5, where the first real ones appear.)

### Part I — Build it

**2. `start` · Start the project · 5 sections**

| # | Section | Step | Side pane / diagram |
| --- | --- | --- | --- |
| 1 | An empty folder and a venv | `python3.15 -m venv .venv`, activate | Flow: system Python ← `.venv/bin/python`, separate `site-packages` |
| 2 | `main.py` | the banner and one priced bag; `python main.py` | Flow: file → interpreter → stdout, the terminal line it produced |
| 3 | The REPL beside the editor | try `9.95 * 3` in the REPL, then write the line down | Flow: read → evaluate → print → loop |
| 4 | A `SyntaxError` | a missing bracket; the traceback | Flow: the parser stops the file — every line greyed, none ran; traceback anatomy |
| 5 | A `NameError` | `prnt`; the traceback, last line first | Flow: lines 1–3 ran, line 4 raised; the namespaces searched |

**3. `hold` · Hold the data · 9 sections**

| # | Section | Step | Side pane / diagram |
| --- | --- | --- | --- |
| 1 | Names and objects | `SHOP`, `sku`, `quantity` in `main.py`; rebinding in the REPL | Memory: names → objects, a rebind moves an arrow |
| 2 | Numbers, and why money is a `Decimal` | `0.1 + 0.2` in the REPL; prices become `Decimal("9.95")` | Result: what `0.1` really stores vs `Decimal("0.1")`; `int` / `float` / `Decimal` side by side |
| 3 | Strings | the SKU's origin and size by slicing; a name, formatted | Memory: the string as indexed cells, a slice's edges |
| 4 | Booleans, `None` and sentinels | `discount_code = None` vs the `sentinel` for "not given" | Flow: three states of a value, three branches |
| 5 | Lists | the day's order lines as a list | Memory: a list object, its slots pointing at row objects |
| 6 | Tuples and unpacking | each line a tuple; `order_id, sku, qty = line` | Memory: one tuple, three names bound by unpacking |
| 7 | Dictionaries | the catalogue keyed by SKU; an order line as a dict | Memory: a hash table — keys hashed into buckets, edges to values |
| 8 | Sets and `frozendict` | unique customers; the catalogue frozen | Flow: `in` on a set (one hash) vs a list (a scan); a refused write |
| 9 | Nesting, aliasing and copying | orders of line items; `copy` vs `deepcopy` | Memory: two names, one list; shallow copy shares the rows; deep copy does not |

**4. `process` · Process the data · 11 sections**

| # | Section | Step | Side pane / diagram |
| --- | --- | --- | --- |
| 1 | Expressions and operators | a line total; precedence | Flow: the expression tree, evaluated bottom up |
| 2 | Decisions | `if` / `elif` / `else` discount rules | Flow: the decision chart, one path lit for a 12-bag line |
| 3 | `match` | dispatch on a row's shape | Flow: one row, the case patterns it is tried against, the one that matched |
| 4 | `for` loops | price every line of the day | Memory: the iterator's cursor moving down the list, the name rebound each pass |
| 5 | `while`, `break` and `continue` | skip a bad line, stop at a marker | Flow: the loop with its two exits drawn |
| 6 | Comprehensions | totals in one line; unpacking in comprehensions (3.15) | Flow: the comprehension and the loop it means, part to part |
| 7 | Functions | `price_line()` | Stack: the call pushes a frame, the return pops it |
| 8 | Arguments and the mutable default | keywords, defaults; the shared-list trap | Memory + Stack: two calls, one default list |
| 9 | Scope | LEGB, a global rate, `nonlocal` refused | Flow: nested namespaces, the lookup edges for one name |
| 10 | Exceptions | a bad line raises; `try` keeps the run alive | Stack: the exception travelling up, caught one frame up |
| 11 | Raising your own | `InvalidOrder` with a reason | Flow: line → validate → priced / rejected-with-reason |

**5. `extract` · Read the data · 7 sections**

| # | Section | Step | Side pane / diagram |
| --- | --- | --- | --- |
| 1 | Files and `with` | `data/raw/` appears; the hard-coded day is read from a file | Flow: open → read → close, `with` guaranteeing the close on an error |
| 2 | Text and encodings | 3.15 reads UTF-8 by default; the Latin-1 day fails, then is read correctly | Memory: bytes → decode → `str`, the byte `0xE9` two ways |
| 3 | `pathlib` | every day's file in `data/raw/` | Flow: a `Path`, its parts, the glob's matches |
| 4 | CSV | `csv.DictReader`: lines become records | Flow: header cells → dict keys, one line → one dict |
| 5 | JSON | `catalogue.json`, prices parsed as `Decimal` | Flow: JSON types → Python types, the price that must not become a float |
| 6 | Validating rows | keep the good, report the bad, never stop silently | Result: the day's rows, tagged ok / rejected with the reason |
| 7 | Generators | a month streamed one row at a time | Stack: the generator's frame suspended at `yield`, resumed by `next` |

**6. `transform` · Transform and aggregate · 7 sections**

| # | Section | Step | Side pane / diagram |
| --- | --- | --- | --- |
| 1 | Grouping with a dict | revenue per product | Flow: rows dropping into per-SKU buckets |
| 2 | `Counter` and `defaultdict` | the same, in less code | Memory: the missing key created on first touch |
| 3 | Sorting | `sorted`, `key=`, `lambda`: top products | Plot: revenue by product, bars in sorted order |
| 4 | `math` and `statistics` | mean and median order value; what to round, when | Plot: order values, mean and median marked |
| 5 | Dates and times | `datetime`: daily and weekly totals | Plot: revenue per day across October |
| 6 | `itertools` | `groupby`, `chain`, `islice` — no intermediate lists | Flow: a lazy chain, one row pulled through at a time |
| 7 | The transform step | `summarise_day()`: rows in, summary out | Flow: the function as a box — inputs, outputs, nothing else touched |

**7. `load` · Write the results · 6 sections**

| # | Section | Step | Side pane / diagram |
| --- | --- | --- | --- |
| 1 | Writing a CSV report | `csv.writer` into `data/out/` | Result: the report's first rows |
| 2 | Formatting | f-string format specs for a readable report | Result: one spec taken apart — fill, align, width, precision |
| 3 | Writing JSON | the summary, `Decimal` as a string | Flow: Python types → JSON, the one that needs a decision |
| 4 | `sqlite3` | the warehouse schema; loading in a transaction | Result: warehouse tables, a foreign-key edge from line to order |
| 5 | Safe re-runs | idempotent upserts; atomic temp-file writes | Flow: write temp → fsync → rename; the crash point that leaves no half file |
| 6 | The whole script | extract, transform, load — end to end | **the pipeline map, every stage lit**, each mapped to its function |

### Part II — Make it real

**8. `structure` · Structure the pipeline · 5 sections**

| # | Section | Step | Side pane / diagram |
| --- | --- | --- | --- |
| 1 | Modules | `extract.py` leaves `main.py`; what `import` executes; lazy imports (3.15) | Flow: the import graph and `sys.modules` |
| 2 | Packages | `pipeline/` and `__init__.py` | Flow: the package tree, import edges between modules |
| 3 | `if __name__ == "__main__"` | a module that is also a script | Flow: two ways in, one guard |
| 4 | Type hints | the pipeline's contracts written down | Flow: functions as boxes with typed in/out edges |
| 5 | Dependencies and a type checker | `pyproject.toml`, `pip install` mypy into `.venv`; mypy finds a real bug | Flow: project → `.venv` → mypy; the error it found, linked to its line |

**9. `model` · Model the domain · 10 sections** *(new)*

| # | Section | Step | Side pane / diagram |
| --- | --- | --- | --- |
| 1 | Classes | `Product`: from a dict to a type — `__init__`, `self` | Memory: instance → class, attributes on the instance, methods on the class |
| 2 | Dataclasses | `LineItem` as a dataclass | Class: what `@dataclass` generated, shown as methods on the class |
| 3 | Properties and invariants | a `LineItem` that cannot have a quantity below 1; `total` as a property | Flow: construction → `__post_init__` → accepted / `ValueError` |
| 4 | A value object | `Money`: frozen, `__add__`, `__mul__`, `__eq__`, `__hash__`, `__repr__` | Memory: `a + b` makes a new object; neither operand changes |
| 5 | Containers and alternate constructors | `Order` with `__len__`, `__iter__`, `__contains__`; `Order.from_rows()` | Flow: `len(order)` → `__len__`, `for … in order` → `__iter__`; rows → `from_rows` → `Order` |
| 6 | Inheritance and `super()` | `PipelineError` → `InvalidRow`, `UnknownProduct` | Class: the hierarchy, and which `except` catches which |
| 7 | Polymorphism | `DiscountRule` → `Wholesale`, `Bulk`, `NoDiscount`: the `if/elif` of 4.2 is gone | Class: one interface, three rules, the order picking its rule |
| 8 | Protocols and ABCs | `Source` and `Sink` protocols; `CsvDays`, `Catalogue`, `CsvReport`, `JsonSummary` | Class: structural typing — no base class, the protocol drawn dashed |
| 9 | Context managers | `SqliteWarehouse` with `__enter__` / `__exit__`: commit or roll back | Flow: enter → load → exit, both paths; the exception that triggers the rollback |
| 10 | Composition | `Pipeline(sources, rules, sinks)`; `main.py` builds one and runs it | Class: the composed pipeline — has-a edges, no inheritance |

**10. `trust` · Make it trustworthy · 7 sections**

| # | Section | Step | Side pane / diagram |
| --- | --- | --- | --- |
| 1 | `pytest` | `tests/`; the first tests of `Money` and the rules | Flow: test → unit under test → assert |
| 2 | Fixtures and parametrisation | one test, every bad row | Flow: the fixture graph; one test fanned out into cases |
| 3 | Test doubles | a fake `Source` (the protocol pays off) and a fixed clock — and only those | Class: the real and fake sources, both satisfying `Source` |
| 4 | Logging | `logging` instead of `print`; levels, one handler | Flow: logger → handler → formatter → file / stderr |
| 5 | Decorators and closures | `@retry` and `@timed`; how `@` works | Memory: the wrapper function and the closure cell holding the original |
| 6 | Debugging | `breakpoint()` and `pdb` on a real wrong total | Stack: the frames `pdb` walks with `up` / `down` |
| 7 | Linting and formatting | ruff; why style is automated | Result: ruff's findings, by rule |

**11. `speed` · Make it fast · 7 sections**

| # | Section | Step | Side pane / diagram |
| --- | --- | --- | --- |
| 1 | Measure first | `cProfile` on a month; the slow line | Result: the profile's top rows |
| 2 | The right data structure | a set lookup instead of a list scan | Plot: lookup time vs n, list vs set |
| 3 | Memory | `tracemalloc`: a list of the month vs a generator | Plot: peak memory, list vs streaming |
| 4 | CPU-bound vs I/O-bound | the question that picks the tool | Flow: where the time goes in each case |
| 5 | Threads, the GIL and the free-threaded build | CPU work on threads, on `python3.15` and `python3.15t` | Plot: wall time, both builds, 1 vs 4 threads (claims limited to what re-runs) |
| 6 | Processes | `concurrent.futures`: a process per file | Flow: the pool, the workers, results gathered |
| 7 | `asyncio` | `ApiSource`: many requests in flight on one thread | Flow: the event loop and its suspended tasks |

The API is a stdlib `http.server` stub the step starts locally, so the replay stays deterministic and
the pipeline stays dependency-free.

**12. `ship` · Ship it · 6 sections**

| # | Section | Step | Side pane / diagram |
| --- | --- | --- | --- |
| 1 | A command-line interface | `argparse`: `roastery-etl run --month 2026-10` | Flow: argv → parser → the call it makes |
| 2 | Configuration and secrets | env vars and a TOML file (`tomllib`); never in code | Flow: the precedence chain — default ← file ← env ← flag |
| 3 | Packaging | a wheel, an entry point, a clean install in a fresh venv | Flow: `pyproject.toml` → wheel → installed `roastery-etl` command |
| 4 | Running on a schedule | cron, exit codes, an alert on failure | Flow: cron → `run.sh` → exit code → alert / done |
| 5 | The finished pipeline | the whole tree, every file built | the pipeline map with the course's classes on each stage |
| 6 | Where next | pandas, Polars, Spark, Airflow — the same pipeline at scale | concept: each stage of our pipeline mapped to its tool at scale |

## How a section teaches

- **One step per section.** A section makes one change to the pipeline and shows its effect.
- Objective → mental model (the side pane) → the code and its real result → a failure or an
  alternative → the bridge to the next section.
- **Code is executed, not pasted**; outputs are replayed; ids and timings are `volatile` steps
  compared with digits masked, and narration claims only what survives re-running.
- **Narration explains; the frame shows.** Never reads code aloud line by line. It may refer to the
  side pane's diagram by what it shows ("the arrow from `b`"), since the template fixes where it is.
- Explain a term before relying on it.

## Build order

1. **Owner review of this plan.**
2. **Infra** *(done 2026-10-26)* — install a final 3.15.x; move to `@graphlearning/graphl-flow` + `@graphlearning/shell`
   ^1.0 (drop `@graphlearning/flow`, `react-markdown`, `remark-gfm`); rebuild `ide.ts` on graphl-flow
   and measure its panes; the pipeline-map scene; `spine.py` cumulative check; `check-content`
   side-pane rule; `check-render` on `data-fit="ready"`, same-fit across IDE frames, fail on
   `console.error`. v1 content, spine and wavs are removed per course as each v2 course replaces it.
3. **Course 2 (`start`) as the pilot** — authored, replayed, rendered, captured; routes to the owner.
4. **Course 1**, then **Courses 3–12** in order, one at a time, each reviewed on its rendered routes
   before the next begins.
5. Narration audio per course via Colab + Chatterbox once its frames are approved; then record.

Course ids change (`why-python` + `how-python-runs` → `picture`, `aggregate` → `transform`, new
`model`), so v1 routes stop resolving once v2 replaces them; v1 videos are re-recorded, not linked.

## Decisions (resolved)

1. **Spine**: `roastery-etl`, kept from v1 — now cumulative and checked.
2. **Version**: Python 3.15, pinned to 3.15.1 (final shipped 2026-10-09).
3. **Courses**: 12; Courses 1–2 of v1 merged into `picture`; OOP is its own course (`model`).
4. **Third-party dependencies**: the pipeline itself stays standard-library only; mypy, pytest and
   ruff are dev tools from Course 8 on.
5. **Folding**: show a file whole under ~30 lines, fold beyond that.
6. **Side pane**: a diagram in every IDE section; lists only as captions.
7. **Re-author all**: every scene, every narration, every wav.
