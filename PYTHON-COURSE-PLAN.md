# Python — from first program to production

**Status: outline for review.** Courses, sections and the spine application only. Scene designs,
narration and code come after this outline is approved — one course at a time, each reviewed on its
rendered routes before the next begins.

## Who it is for

One path that takes an absolute beginner to a working professional, and lets an experienced
developer drop in at any course. Four parts, each with its own entry level:

| Part | For | Leaves you able to |
| --- | --- | --- |
| I — Foundations | someone who has never programmed | read and write small, correct programs |
| II — Building programs | someone who can write a script | structure a real program: files, errors, modules, classes |
| III — Pythonic depth | a working developer new to Python's internals | use the data model, functions as objects and types the way Python intends |
| IV — Professional Python | someone shipping Python | test it, run it concurrently, package and serve it |

## How a section teaches

Every section is **one full-screen frame and one narration**, no slide. The frame carries what a
slide used to: the code, what it prints or leaves in memory, and the mental model that explains it,
side by side across the full width.

- **Code is real.** A `kind: 'code'` card holds roastery code that runs on the pinned Python
  version, and its output is shown as it actually prints. Every snippet is run before it is written
  down.
- **Wide, not tall.** Frames are laid out left to right (code → result → model). A tall stack is
  fitted by the frame's height and wastes the width the scene-only layout gave us.
- **One idea per frame.** If a frame needs two ideas, it is two sections. A section that wants to
  walk a big picture reuses ONE scene across consecutive sections with a different `focus` each.
- **Narration explains; the frame shows.** The narration never reads the code aloud line by line.
- **Failure is taught, not hidden.** Most sections show the wrong version next to the right one,
  with the real traceback or wrong output.

Target length: 90–180 seconds of narration per section.

## The spine: `roastery`

One application grows across the whole course: the order service of a small coffee roastery. A
customer orders bags of beans; the service prices the order (by weight, roast and discounts),
checks stock, records it, and produces invoices and reports.

It is chosen because it stays honest at every level:

- **Beginner**: a bag's price is a multiplication; an order is a list; a discount is an `if`.
- **Intermediate**: orders arrive as CSV and JSON with bad rows; the code splits into modules;
  `Order`, `LineItem` and `Product` become classes.
- **Advanced**: a large order file streams through generators; pricing rules become first-class
  functions and decorators; types catch mistakes before they run.
- **Professional**: supplier prices are fetched concurrently; the service is tested, given a CLI and
  an HTTP API, and packaged.

Money is a `Decimal` from the moment it appears (Course 3), and the course says why.

Where it ends up — the map each course opens on, with the part being built lit:

```
roastery/
  models.py      Product, LineItem, Order, Customer        (Course 9)
  pricing.py     prices, discounts, pricing rules           (3 → 6 → 11)
  inventory.py   stock levels, reservations                 (5, 9)
  io.py          CSV / JSON import, validation              (7, 10)
  suppliers.py   concurrent price fetching                  (13)
  reports.py     invoices, daily summaries                  (6, 10)
  cli.py         command line                               (15)
  api.py         HTTP API                                   (15)
tests/           pytest suite                               (14)
pyproject.toml   packaging                                  (8, 15)
```

## The courses — 15 courses, 103 sections

### Part I — Foundations

**1. `why-python` · Why Python · 5 sections**
The course opener: what you are about to learn and why it is worth it.
1. What Python is, and where it runs — the landscape: scripting, web, data, ML, automation
2. A short history, 1991 to today — `evolution` timeline: 1.0, 2.0, 3.0, the 2→3 break, the yearly releases
3. The design philosophy — readability counts, batteries included, one obvious way
4. The trade-offs — what Python is slow at, what it is fast to write, when to pick something else
5. Meet `roastery` — the application we build, shown finished

**2. `how-python-runs` · How Python runs your code · 7 sections**
The mental model everything later depends on: names point to objects.
1. The interpreter, the REPL and a script — three ways to run the same line
2. Source → bytecode → virtual machine — what `python order.py` actually does (`dis`)
3. Names point to objects — assignment binds, it never copies
4. Every object has an identity, a type and a value — `id`, `type`, `==` versus `is`
5. Mutable and immutable — why changing a list is visible through every name
6. Reading a traceback — bottom line first, then up the stack
7. Statements and expressions — what produces a value and what only does something

**3. `values` · Values, types and operators · 7 sections**
1. Integers and floats — and why `0.1 + 0.2` is not `0.3`
2. `Decimal` for money — pricing the first bag correctly
3. Strings — text, indexing, slicing, immutability
4. Booleans, `None` and truthiness
5. Operators and precedence — reading an expression the way Python does
6. Converting between types — `int()`, `str()`, `float()` and where they fail
7. Formatting output — f-strings, alignment, and a printed receipt

**4. `collections` · Collections · 8 sections**
1. Lists — an order as an ordered, changeable list of bags
2. Tuples — fixed records and unpacking
3. Dictionaries — a product catalogue keyed by SKU
4. Sets — membership and uniqueness (which roasts are in stock)
5. Nesting — an order as a dict of line items
6. Aliasing and copying — shallow versus deep, drawn in memory
7. Slicing and unpacking — `*rest`, swapping, star expressions
8. Choosing a collection — lookup cost, order, mutability, at a glance

**5. `control-flow` · Decisions and loops · 7 sections**
1. `if` / `elif` / `else` — the discount rules
2. `match` — dispatching on the shape of an order
3. `for` loops — `range`, `enumerate`, `zip`
4. `while`, `break`, `continue` — and the loop `else`
5. Comprehensions — list, dict and set, and when not to use them
6. Loop patterns — accumulate, filter, find, group
7. Pricing a whole order — the first complete roastery program

**6. `functions` · Functions · 8 sections**
1. Defining and calling — `def`, parameters, `return`
2. Arguments — positional, keyword, defaults, `*args`, `**kwargs`, keyword-only
3. The mutable default trap — what really happens at `def` time
4. Scope — local, enclosing, global, built-in (LEGB)
5. Docstrings and type hints — the function's contract
6. Pure functions and side effects — why `price()` should not print
7. Decomposing the order pipeline — from one long script to small functions
8. Functions as keys — `sorted`, `min`, `max` with `key=` and `lambda`

### Part II — Building programs

**7. `errors-files` · Errors and files · 8 sections**
1. Exceptions — what is raised, what is caught, the hierarchy
2. `try` / `except` / `else` / `finally` — handling one failure well
3. Raising and defining your own exceptions — `OutOfStock`, `InvalidOrder`
4. Files and `with` — opening, reading, writing, closing for certain
5. Text and encodings — bytes versus str, UTF-8
6. `pathlib` — paths that work on every OS
7. CSV and JSON — loading `orders.csv` and `catalogue.json`
8. Validating input — rejecting bad rows without losing good ones

**8. `modules` · Modules, packages and environments · 6 sections**
1. Modules and `import` — what importing actually executes
2. Packages — turning roastery into a folder of modules
3. `if __name__ == "__main__"` — a module that is also a script
4. The standard library tour — what ships with Python
5. Virtual environments and `pip` — isolating dependencies
6. `pyproject.toml` — declaring a project and its dependencies

**9. `classes` · Classes and objects · 8 sections**
1. Classes and instances — `Product` from a dict to a type
2. Attributes and lookup — instance, class, and the order Python searches
3. Methods — instance, `@classmethod`, `@staticmethod`
4. Properties and invariants — a `LineItem` that cannot have negative quantity
5. Dataclasses — less boilerplate, same object
6. Composition — an `Order` has line items, a customer and a status
7. Inheritance and `super()` — and when it is the wrong tool
8. Protocols and abstract base classes — depending on behaviour, not ancestry

**10. `data-model` · The Python data model · 7 sections**
1. `__repr__` and `__str__` — objects that print usefully
2. Equality and hashing — `__eq__`, `__hash__`, using objects as dict keys
3. Operators — `__add__` for adding two orders
4. The container protocol — `__len__`, `__getitem__`, `__contains__`
5. The iteration protocol — iterables, iterators, `__iter__` and `__next__`
6. Generators — streaming a million-line order file in constant memory
7. Context managers — `__enter__`, `__exit__` and `contextlib`

### Part III — Pythonic depth

**11. `functional` · Functions as objects · 6 sections**
1. First-class functions — passing pricing rules around
2. Closures — functions that remember
3. Decorators — `@timed`, `@retry`, and how `@` desugars
4. `functools` — `partial`, `lru_cache`, `wraps`, `singledispatch`
5. `itertools` — pipelines without intermediate lists
6. A pricing-rules engine — composing small rules into one price

**12. `typing` · Types at scale · 5 sections**
1. Type hints in depth — unions, optionals, collections, `Self`
2. Generics and `TypeVar` — a typed repository
3. `Protocol` and `TypedDict` — structural types for real data
4. Checking types — mypy / pyright and what they catch
5. Validating at the boundary — parsing untrusted input into typed objects

**13. `concurrency` · Concurrency · 8 sections**
1. CPU-bound versus I/O-bound — the question that picks the tool
2. Threads — and what the GIL does and does not stop
3. The free-threaded build — what changes without the GIL
4. Processes — `multiprocessing` and `concurrent.futures`
5. `asyncio` — the event loop, coroutines, `await`
6. Async in practice — `gather`, timeouts, cancellation
7. Choosing a model — threads, processes or asyncio, side by side
8. Fetching supplier prices concurrently — roastery's `suppliers.py`

### Part IV — Professional Python

**14. `quality` · Testing and quality · 7 sections**
1. `pytest` — the first test of `price()`
2. Fixtures and parametrisation — one test, many orders
3. Test doubles — mocking the supplier boundary, and only the boundary
4. What to test — coverage as a tool, not a target
5. Linting and formatting — ruff, and why style is automated
6. Logging — `logging` instead of `print`
7. Debugging and profiling — `pdb`, `cProfile`, finding the slow line

**15. `shipping` · Shipping Python · 6 sections**
1. A command-line interface — `argparse` for `roastery price orders.csv`
2. Configuration and secrets — environment, files, never in code
3. An HTTP API — serving roastery over the network
4. Packaging — building a wheel and installing it clean
5. Performance — data structures first, then profiling, then native code
6. The finished roastery — a tour of everything built, and where to go next

## Decisions to confirm before authoring

1. **The spine.** `roastery` (coffee orders) as above, or a different domain.
2. **The version pin.** Current stable at authoring time. Python 3.15 is scheduled for October 2026;
   if it has shipped, pin to it and re-check every free-threading and `typing` claim against it.
3. **The HTTP API in Course 15.** A third-party framework (FastAPI) is what professionals use; the
   standard library's `http.server` keeps the course dependency-free. Recommended: FastAPI, named as
   the one third-party dependency the course adds on purpose.
4. **Course 12 (typing).** Kept separate because types change how a professional writes Python; it
   could fold into Courses 9 and 14 to save five sections.
