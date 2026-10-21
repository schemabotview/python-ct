# Python — from first program to production

**Status: outline for review.** Courses, sections, frame types and the spine application. Scene
designs, narration and code come after this outline is approved — one course at a time, each
reviewed by the owner on its rendered routes before the next begins.

## Who it is for

One path from absolute beginner to working professional; an experienced developer can drop in at
any part.

| Part | For | Leaves you able to |
| --- | --- | --- |
| 0 — The picture | everyone | say why Python exists and what happens when it runs your code |
| I — Foundations | someone who has never programmed | read and write small, correct programs |
| II — Building programs | someone who can write a script | structure a real program: files, errors, modules, classes |
| III — Pythonic depth | a working developer new to Python's internals | use the data model, functions as objects and types the way Python intends |
| IV — Professional Python | someone shipping Python | test it, run it concurrently, package and serve it |

## Three kinds of frame

Every section is **one full-screen frame and one narration** (90–180 s), no slide.

1. **Concept frame** — a diagram: timelines, the interpreter pipeline, the call stack, the heap.
   Part 0 is made of these, and later courses use one where the idea has no file to show.
2. **IDE frame** — the default from Course 3 on, and the one the course is built around:
   the **explorer** (the project tree) on the left, the **editor** with one file, and the
   **terminal** docked under the editor showing the real command and its real output.
   - The tree grows as the course does: a file appears when the concept that needs it arrives,
     marked `NEW`; the open file is highlighted.
   - A file under ~30 lines is shown whole. A longer one shows the lines this section adds or
     changes, **highlighted**, with untouched runs collapsed to `··· N lines` and real line numbers.
   - The terminal shows the run, the traceback, or `pytest` output — whatever proves the step.
3. **IDE + model frame** — the IDE frame with a third pane on the right for what the terminal cannot
   show: names and objects in memory, the call stack at a breakpoint, a generator's state, a table.

The sample IDE frame is the `ide-frame` study in `ui-flow`.

## How a section teaches

- **Code is real.** It lives in the repo as an actual project (see *Code is executed* below), runs
  on the pinned Python version, and the terminal shows exactly what it printed.
- **One step per section.** A section makes one change to the project and shows its effect.
- **Failure is taught, not hidden.** Many sections run the wrong version first and show the real
  traceback, then fix it.
- **Narration explains; the frame shows.** The narration never reads code aloud line by line.

## The spine: `roastery`

One project grows across the whole course: the order service of a small coffee roastery. A customer
orders bags of beans; the service prices the order (weight, roast, discounts), checks stock, records
it, and produces invoices and reports. It stays honest at every level — a bag's price is a
multiplication for a beginner and a concurrent supplier lookup for a professional. Money is a
`Decimal` from the moment it appears, and the course says why.

The finished project, toured in Course 3 and built from an empty folder from there on:

```
roastery-shop/
  .venv/                 the project's own Python                    (3)
  main.py                the program a beginner runs                 (3 → 7)
  data/                  orders.csv, catalogue.json                  (8)
  roastery/              the package                                 (9)
    __init__.py
    catalogue.py         products and prices                         (9)
    pricing.py           totals, discounts, pricing rules            (9 → 12)
    models.py            Product, LineItem, Order, Customer          (10)
    inventory.py         stock levels and reservations               (10)
    io.py                CSV / JSON import and validation            (8 → 11)
    reports.py           invoices and daily summaries                (11)
    suppliers.py         concurrent price fetching                   (14)
    cli.py               the command line                            (16)
    api.py               the HTTP API                                (16)
  tests/                 the pytest suite                            (15)
  pyproject.toml         the project and its dependencies            (9 → 16)
```

## Code is executed, not pasted

The spine is kept in this repo as real files, one snapshot of `roastery-shop/` per section that
changes it. Scenes import the file text from the snapshot, never a copy. A check runs every snapshot
and fails when the terminal pane a scene shows differs from what the code actually prints. That turns
"every snippet runs, every output is real" from a promise into a build failure — the only way it
holds across ~90 IDE frames.

## The courses — 16 courses, 110 sections

### Part 0 — The picture (concept frames)

**1. `why-python` · Why Python · 5 sections**
1. What Python is, and where it runs — scripting, web, data, ML, automation
2. A short history, 1991 to today — `evolution` timeline: 1.0, 2.0, 3.0, the 2→3 break, yearly releases
3. The design philosophy — readability counts, batteries included, one obvious way
4. The trade-offs — what Python is slow at, what it is fast to write, when to pick something else
5. What we will build — `roastery`, shown finished

**2. `how-python-runs` · How Python runs your code · 9 sections**
1. What happens when you type `python main.py` — the whole pipeline in one picture
2. Source to bytecode — compiling, `.pyc` files and `__pycache__`, reading `dis`
3. The virtual machine — a stack machine running one bytecode instruction at a time
4. Frames and the call stack — what a function call pushes and a return pops
5. Names and namespaces — assignment binds a name to an object; it never copies
6. Objects on the heap — identity, type and value; `==` versus `is`
7. Reference counting and garbage collection — when an object goes away
8. The GIL and the free-threaded build — one thread running bytecode at a time, and what changes without it
9. Reading a traceback — the call stack, unwound, bottom line first

### Part I — Foundations (IDE frames begin)

**3. `the-project` · Your first Python project · 5 sections**
1. The finished project, toured — every folder and file, and what it is for
2. A new project — an empty folder, `python -m venv .venv`, activating it
3. `main.py` — the first program, run from the terminal
4. The REPL beside the editor — trying a line before writing it down
5. When the first run fails — a `SyntaxError` and a `NameError`, read and fixed

**4. `values` · Values, types and expressions · 7 sections**
1. Integers and floats — and why `0.1 + 0.2` is not `0.3`
2. `Decimal` for money — pricing the first bag correctly
3. Strings — text, indexing, slicing, immutability
4. Booleans, `None` and truthiness
5. Expressions and statements — operators, precedence, what produces a value
6. Converting between types — `int()`, `str()`, `Decimal()` and where they fail
7. Formatting output — f-strings and a printed receipt

**5. `collections` · Collections · 8 sections**
1. Lists — an order as an ordered, changeable list of bags
2. Tuples — fixed records and unpacking
3. Dictionaries — a catalogue keyed by SKU
4. Sets — membership and uniqueness (which roasts are in stock)
5. Nesting — an order as a dict of line items
6. Aliasing and copying — shallow versus deep (IDE + model frame)
7. Slicing and unpacking — `*rest`, swapping, star expressions
8. Choosing a collection — lookup cost, order, mutability, side by side

**6. `control-flow` · Decisions and loops · 7 sections**
1. `if` / `elif` / `else` — the discount rules
2. `match` — dispatching on the shape of an order
3. `for` loops — `range`, `enumerate`, `zip`
4. `while`, `break`, `continue` — and the loop `else`
5. Comprehensions — list, dict and set, and when not to use them
6. Loop patterns — accumulate, filter, find, group
7. Pricing a whole order — the first complete program in `main.py`

**7. `functions` · Functions · 8 sections**
1. Defining and calling — `def`, parameters, `return`
2. Arguments — positional, keyword, defaults, `*args`, `**kwargs`, keyword-only
3. The mutable default trap — what really happens at `def` time (IDE + model frame)
4. Scope — local, enclosing, global, built-in (LEGB)
5. Docstrings and type hints — the function's contract
6. Pure functions and side effects — why `price()` should not print
7. Decomposing `main.py` — one long script becomes small functions
8. Functions as keys — `sorted`, `min`, `max` with `key=` and `lambda`

### Part II — Building programs

**8. `errors-files` · Errors and files · 8 sections**
1. Exceptions — what is raised, what is caught, the hierarchy
2. `try` / `except` / `else` / `finally` — handling one failure well
3. Raising and defining your own exceptions — `OutOfStock`, `InvalidOrder`
4. Files and `with` — `data/` appears; reading and writing safely
5. Text and encodings — bytes versus str, UTF-8
6. `pathlib` — paths that work on every OS
7. CSV and JSON — loading `orders.csv` and `catalogue.json`
8. Validating input — rejecting bad rows without losing good ones

**9. `modules` · Modules, packages and environments · 6 sections**
1. Modules and `import` — `pricing.py` leaves `main.py`; what importing executes
2. Packages — the `roastery/` folder and `__init__.py`
3. `if __name__ == "__main__"` — a module that is also a script
4. The standard library — what ships with Python
5. Installing dependencies — `pip` inside `.venv`, and why the venv exists
6. `pyproject.toml` — declaring the project and its dependencies

**10. `classes` · Classes and objects · 8 sections**
1. Classes and instances — `Product`, from a dict to a type; `models.py` appears
2. Attributes and lookup — instance, class, and the order Python searches
3. Methods — instance, `@classmethod`, `@staticmethod`
4. Properties and invariants — a `LineItem` that cannot have a negative quantity
5. Dataclasses — less boilerplate, same object
6. Composition — an `Order` has line items, a customer and a status
7. Inheritance and `super()` — and when it is the wrong tool
8. Protocols and abstract base classes — depending on behaviour, not ancestry

**11. `data-model` · The Python data model · 7 sections**
1. `__repr__` and `__str__` — objects that print usefully
2. Equality and hashing — `__eq__`, `__hash__`, objects as dict keys
3. Operators — `__add__` for combining orders
4. The container protocol — `__len__`, `__getitem__`, `__contains__`
5. The iteration protocol — iterables, iterators, `__iter__` and `__next__`
6. Generators — streaming a million-line order file in constant memory (IDE + model frame)
7. Context managers — `__enter__`, `__exit__` and `contextlib`

### Part III — Pythonic depth

**12. `functional` · Functions as objects · 6 sections**
1. First-class functions — passing pricing rules around
2. Closures — functions that remember (IDE + model frame)
3. Decorators — `@timed`, `@retry`, and how `@` desugars
4. `functools` — `partial`, `lru_cache`, `wraps`, `singledispatch`
5. `itertools` — pipelines without intermediate lists
6. A pricing-rules engine — composing small rules into one price

**13. `typing` · Types at scale · 5 sections**
1. Type hints in depth — unions, optionals, collections, `Self`
2. Generics — a typed repository
3. `Protocol` and `TypedDict` — structural types for real data
4. Checking types — mypy / pyright in the terminal, and what they catch
5. Validating at the boundary — parsing untrusted input into typed objects

**14. `concurrency` · Concurrency · 8 sections**
1. CPU-bound versus I/O-bound — the question that picks the tool
2. Threads — and what the GIL does and does not stop
3. The free-threaded build — what changes without the GIL
4. Processes — `multiprocessing` and `concurrent.futures`
5. `asyncio` — the event loop, coroutines, `await`
6. Async in practice — `gather`, timeouts, cancellation
7. Choosing a model — threads, processes or asyncio, side by side
8. Fetching supplier prices concurrently — `suppliers.py`

### Part IV — Professional Python

**15. `quality` · Testing and quality · 7 sections**
1. `pytest` — `tests/` appears; the first test of `price()`
2. Fixtures and parametrisation — one test, many orders
3. Test doubles — mocking the supplier boundary, and only the boundary
4. What to test — coverage as a tool, not a target
5. Linting and formatting — ruff, and why style is automated
6. Logging — `logging` instead of `print`
7. Debugging and profiling — `pdb`, `cProfile`, finding the slow line

**16. `shipping` · Shipping Python · 6 sections**
1. A command-line interface — `cli.py`: `roastery price data/orders.csv`
2. Configuration and secrets — environment, files, never in code
3. An HTTP API — `api.py`: serving roastery over the network
4. Packaging — building a wheel and installing it clean
5. Performance — data structures first, then profiling, then native code
6. The finished roastery — the whole tree, every file built, and where to go next

## Decisions to confirm before authoring

1. **The spine.** `roastery` (coffee orders), or a different domain.
2. **The version pin.** Current stable at authoring time. Python 3.15 is scheduled for October 2026;
   if it has shipped, pin to it and re-check every free-threading and `typing` claim against it.
3. **The HTTP API in Course 16.** FastAPI — the one third-party dependency the course adds on purpose
   — or the standard library's `http.server` to stay dependency-free. Recommended: FastAPI.
4. **Course 13 (typing).** Kept separate because types change how a professional writes Python; it
   could fold into Courses 10 and 15 to save five sections.
5. **Folding.** Show a file whole under ~30 lines and fold beyond that (recommended), or always whole.
