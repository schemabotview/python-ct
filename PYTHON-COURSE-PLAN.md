# Python — from first program to production

**Status: Course 1 in authoring; the rest is an approved outline.** Courses are authored one at a
time, each reviewed by the owner on its rendered routes before the next begins.

## The idea

The course builds **one application — a data pipeline — from an empty folder to a scheduled,
tested, packaged job**, and every Python feature is taught at the moment the pipeline first needs it.
Courses are named by **what we build**, not by language feature, so the whole course is one story a
learner can hold in their head:

> *Why Python → how it runs → start the project → hold the data → process it → read it from files →
> aggregate it → write the results → structure the code → make it trustworthy → make it fast →
> ship it.*

| Part | For | Leaves you able to |
| --- | --- | --- |
| 0 — The picture (Courses 1–2) | everyone | say why Python exists and what happens when it runs your code |
| I — Build it (Courses 3–8) | someone who has never programmed | write a working ETL script, from raw files to a database |
| II — Make it real (Courses 9–12) | someone who can write a script | structure, test, speed up and ship it like a professional |

## The spine: `roastery-etl`

A small coffee roastery's shop writes one CSV of orders per day. The pipeline **extracts** those
files and the product catalogue, **validates** every row (keeping the good, reporting the bad),
**transforms** them into priced order lines, **aggregates** revenue by product, day and customer,
and **loads** the result into a SQLite database and a daily report.

- **Beginner**: a bag's price is a multiplication; an order is a dict; a bad row is an `if`.
- **Intermediate**: real files with bad rows and odd encodings; the script becomes a package with
  `Order` objects.
- **Professional**: a month of files streams through generators, sources are read concurrently, and
  the job is tested, logged, packaged and run on a schedule.

Money is a `Decimal` from the moment it appears, and the course says why.

The finished project, toured in Course 3 and built from an empty folder from there on:

```
roastery-etl/
  .venv/                     the project's own Python                       (3)
  main.py                    the script a beginner runs                     (3 → 8)
  data/
    raw/orders-2026-10-01.csv   one file per day, written by the shop        (6)
    raw/catalogue.json       products and prices                            (6)
    out/daily_report.csv     the report                                     (8)
    out/warehouse.db         the SQLite database                            (8)
  pipeline/                  the package                                    (9)
    __init__.py
    models.py                Order, LineItem, Product                       (9)
    extract.py               reading and validating sources                 (6 → 9)
    transform.py             pricing and aggregation                        (5, 7 → 9)
    load.py                  report and database writers                    (8 → 9)
    config.py                paths and settings                             (12)
  tests/                     the pytest suite                               (10)
  pyproject.toml             the project, its dependencies, its command     (9 → 12)
```

## Three kinds of frame

Every section is **one full-screen frame and one narration** (90–180 s), no slide.

1. **Concept frame** — a diagram: the landscape, a timeline, the interpreter pipeline, the call
   stack, the heap. Courses 1–2 are made of these; later courses use one where an idea has no file.
2. **IDE frame** — the default from Course 3 on, and ONE fixed template so every panel sits at the
   same place in every section: the **explorer** (the project tree) on the left, the **editor** with
   one file in the centre, the **terminal** docked under it with the real command and its real
   output, and a **side pane** on the right for the lesson's key points (the `ide-frame` study in
   `ui-flow`; `src/scenes/ide.ts` here). One file per frame — two versions of a file are two sections.
   - The tree grows with the course: a file appears, marked `NEW`, when the step that needs it
     arrives; the open file is highlighted.
   - A file under ~30 lines is shown whole; a longer one shows this section's lines highlighted, the
     rest collapsed to `··· N lines` with real line numbers.
3. **IDE + model frame** — the same template, with the side pane holding what the terminal cannot
   show: names and objects in memory, the call stack, a generator's state, a table of rows.

## How a section teaches

- **One step per section.** A section makes one change to the pipeline and shows its effect.
- **Code is executed, not pasted.** The spine lives in this repo as real snapshots of
  `roastery-etl/`, one per section that changes it. Scenes import the file text from the snapshot,
  and a check fails when a terminal pane differs from what the code actually prints.
- **Failure is taught, not hidden.** Many sections run the wrong version first, show the real
  traceback, then fix it.
- **Narration explains; the frame shows.** It never reads code aloud line by line.

## The courses — 12 courses, 90 sections

### Part 0 — The picture (concept frames)

**1. `why-python` · Why Python · 5 sections**
1. What Python is, and where it runs — one language across web, data, ML, automation and pipelines
2. Where Python came from — 1989 to today, in three eras
3. The philosophy — the Zen of Python, readability, batteries included
4. Strengths and limits — what Python is fast at, what it is slow at, and why
5. What we will build — the `roastery-etl` pipeline, and the course as its map

**2. `how-python-runs` · How Python runs your code · 9 sections**
1. What happens when you type `python main.py` — the whole pipeline in one picture
2. Source to bytecode — compiling, `.pyc` files and `__pycache__`, reading `dis`
3. The virtual machine — a stack machine running one instruction at a time
4. Frames and the call stack — what a call pushes and a return pops
5. Names and namespaces — assignment binds a name to an object; it never copies
6. Objects on the heap — identity, type and value; `==` versus `is`
7. Reference counting and garbage collection — when an object goes away
8. The GIL and the free-threaded build — one thread running bytecode at a time, and what changes without it
9. Reading a traceback — the call stack, unwound, bottom line first

### Part I — Build it (IDE frames)

**3. `start` · Start the project · 6 sections**
1. The finished project, toured — every folder and file, and what it is for
2. A new project — an empty folder, `python -m venv .venv`, activating it
3. `main.py` — the first line of the pipeline, run from the terminal
4. The REPL beside the editor — trying a line before writing it down
5. A `SyntaxError` — found by the parser, before anything runs
6. A `NameError` — found while it runs, after earlier lines already ran

**4. `hold` · Hold the data · 10 sections**
1. Names and objects — a variable is a name for an object (IDE + model)
2. Numbers — `int`, `float`, and why `0.1 + 0.2` is not `0.3`
3. `Decimal` for money — pricing the first bag correctly
4. Strings — SKUs, names, indexing and slicing
5. Booleans and `None` — a value that may be missing
6. Lists — a day's orders as a list of rows
7. Tuples — a fixed record, and unpacking it
8. Dictionaries — one order as a record; the catalogue keyed by SKU
9. Sets — unique customers, and membership checks
10. Nesting, aliasing and copying — an order of line items in memory (IDE + model)

**5. `process` · Process the data · 11 sections**
1. Expressions and operators — computing a line total
2. Decisions — `if` / `elif` / `else` for the discount rules
3. `match` — dispatching on the shape of a row
4. `for` loops — pricing every order of the day
5. `while`, `break` and `continue` — stopping and skipping
6. Comprehensions — a list of totals in one line, and when not to
7. Functions — `price_line()`: name a step and reuse it
8. Arguments — positional, keyword, defaults, and the mutable-default trap (IDE + model)
9. Scope — where a name is found (LEGB)
10. Exceptions — a bad row raises; catching it keeps the run alive
11. Raising your own — `InvalidOrder`, and why a clear error beats a wrong answer

**6. `extract` · Read the data · 7 sections**
1. Files and `with` — reading the day's file, closed for certain
2. Text and encodings — bytes versus str, and a file that is not UTF-8
3. `pathlib` — finding every day's file in `data/raw/`
4. CSV — `csv.DictReader` turns lines into order records
5. JSON — loading `catalogue.json`
6. Validating rows — keep the good, report the bad, never stop silently
7. Generators — streaming a month of files one row at a time (IDE + model)

**7. `aggregate` · Aggregate it · 7 sections**
1. Grouping with a dict — revenue per product
2. `Counter` and `defaultdict` — the same, in less code
3. Sorting — `sorted`, `key=` and `lambda`: top products
4. `math` and `statistics` — averages, medians, and what to round when
5. Dates and times — `datetime`, daily and weekly totals
6. `itertools` — `groupby`, `chain`, `islice` without intermediate lists
7. The transform step — one function from rows to a daily summary

**8. `load` · Write the results · 6 sections**
1. Writing a CSV report — `csv.writer` and `data/out/`
2. Formatting — f-strings for a readable report
3. Writing JSON — a machine-readable summary
4. `sqlite3` — loading rows into a database, with transactions
5. Safe re-runs — idempotent loads, and atomic writes via a temp file
6. The whole script — extract, transform, load in `main.py`, end to end

### Part II — Make it real

**9. `structure` · Structure the pipeline · 9 sections**
1. Modules — `extract.py` leaves `main.py`; what `import` executes
2. Packages — the `pipeline/` folder and `__init__.py`
3. `if __name__ == "__main__"` — a module that is also a script
4. Classes — `Order` from a dict to a type
5. Dataclasses — less boilerplate, same object
6. Methods and properties — a `LineItem` that cannot have a negative quantity
7. The data model — `__repr__`, `__eq__`, `__iter__`: objects that behave
8. Type hints — the pipeline's contracts, checked by mypy
9. Dependencies — `pip`, `.venv` and `pyproject.toml`

**10. `trust` · Make it trustworthy · 7 sections**
1. `pytest` — `tests/` appears; the first test of `price_line()`
2. Fixtures and parametrisation — one test, many bad rows
3. Test doubles — faking the clock and the file system, and only those
4. Logging — `logging` instead of `print`
5. Decorators and closures — `@retry` and `@timed`, and how `@` works
6. Debugging — `breakpoint()` and `pdb`
7. Linting and formatting — ruff, and why style is automated

**11. `speed` · Make it fast · 7 sections**
1. Measure first — `timeit` and `cProfile` find the slow line
2. The right data structure — a set lookup instead of a list scan
3. Memory — generators and `itertools` keep a month of data flat
4. CPU-bound versus I/O-bound — the question that picks the tool
5. Threads, the GIL, and the free-threaded build
6. Processes — `concurrent.futures` across many files
7. `asyncio` — reading many sources concurrently

**12. `ship` · Ship it · 6 sections**
1. A command-line interface — `argparse`: `roastery-etl run --date 2026-10-01`
2. Configuration and secrets — environment, files, never in code
3. Packaging — a wheel, an entry point, a clean install
4. Running on a schedule — cron, exit codes and alerts
5. The finished pipeline — the whole tree, every file built
6. Where next — pandas, Polars, Spark, Airflow: the same pipeline at scale

## Decisions (resolved)

1. **Spine**: `roastery-etl` — an ETL pipeline over coffee-roastery orders.
2. **Version**: Python 3.14, the current stable release we can verify; re-check against 3.15 if it
   has shipped before Part I is authored. Code in this repo has so far been run on 3.13 (the version
   installed where it was authored), and says so.
3. **Third-party dependencies**: none until Course 9 (ruff, mypy, pytest are dev tools); the pipeline
   itself stays standard-library only — `csv`, `json`, `sqlite3`, `pathlib`, `datetime`.
4. **Typing**: folded into Course 9 (one section) and used throughout from there.
5. **Folding**: show a file whole under ~30 lines, fold beyond that.
